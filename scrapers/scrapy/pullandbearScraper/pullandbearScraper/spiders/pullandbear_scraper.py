import scrapy
from scrapy_splash import SplashRequest
from pullandbearScraper.items import Product

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path
import errno



class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class pullandbearSpider(scrapy.Spider):

    name = "pullandbear"

    #Name of the shop
    shop = "pullandbear"
    #Gender of the garments we are crawling mujer/hombre
    gender = "mujer"
    #Depends on the shop
    #affiliateTag for shop: BASE
    affiliateTag = ''

    dirToSave = "../../../dataset/"+gender+"/"

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #shop: pullandbear
    def assign_category(self, index):
        #Nombres de las categorias en pullandbear.es
        # 0.Abrigos y Chaquetas
        # 1.Vestidos
        # 2.Monos
        # 3.Camisas y blusas
        # 4.Camisetas
        # 5, 6.Tops y bodies
        # 7, 8.Sudaderas, Cardigans y jerseis
        # 9.Faldas
        # 10, 11.Pantalones largos
        # 12.Pantalones cortos

        #funciona como un switch
        if index == 0:
            categoriaNombre="abrigos_chaquetas"
        elif index == 1:
            categoriaNombre="vestidos"
        elif index == 2:
            categoriaNombre="monos"
        elif index == 3:
            categoriaNombre="camisas_blusas"
        elif index == 4:
            categoriaNombre="camisetas"
        elif index == 5 or index == 6:
            categoriaNombre="tops_bodies"
        elif index == 7 or index == 8:
            categoriaNombre="sudaderas_jerseis"
        elif index == 9:
            categoriaNombre="faldas"
        elif index == 10 or index == 11:
            categoriaNombre="pantalones_largos"
        elif index == 12:
            categoriaNombre="pantalones_cortos"

        return categoriaNombre


    def create_files(self, dirToProducts, current_products_dir, previous_products_dir):

        new_products_dir = dirToProducts+'new_products.json'

        if not os.path.exists(os.path.dirname(dirToProducts)):
            try:
                os.makedirs(os.path.dirname(dirToProducts))
            except OSError as exc: # Guard against race condition
                if exc.errno != errno.EEXIST:
                    raise                       

        if not os.path.isfile(current_products_dir):
            with open(current_products_dir, "w") as outfile:
                outfile.write("[]")
            with open(new_products_dir, "w") as outfile:
                outfile.write("[]")

        shutil.copy(current_products_dir, previous_products_dir)


    def start_requests(self):
        urls = [
            # 0.Abrigos y Chaquetas
            "https://www.pullandbear.com/es/mujer/ropa/abrigos-y-cazadoras-c1030009518.html",
            # 1.Vestidos
            "https://www.pullandbear.com/es/mujer/ropa/vestidos-c29016.html",
            # 2.Monos
            "https://www.pullandbear.com/es/mujer/ropa/petos-y-monos-c1073503.html",
            # 3.Camisas y blusas
            "https://www.pullandbear.com/es/mujer/ropa/blusas-y-camisas-c29019.html",
            # 4.Camisetas (En P&B hay que filtrar los tops y bodies de camisetas)
            "https://www.pullandbear.com/es/mujer/ropa/camisetas-c29020.html",
            # 5, 6.Tops y bodies (En P&B hay que filtar las camisetas de los tops y bodies)
            "https://www.pullandbear.com/es/mujer/ropa/camisetas-c29020.html",
            "https://www.pullandbear.com/es/mujer/ropa/bodies-c1010087522.html",
            # 7, 8.Sudaderas, Cardigans y jerseis
            "https://www.pullandbear.com/es/mujer/ropa/sudaderas-c29018.html",
            "https://www.pullandbear.com/es/mujer/ropa/jers%C3%A9is-y-c%C3%A1rdigans-c29017.html",
            # 9.Faldas
            "https://www.pullandbear.com/es/mujer/ropa/faldas-c29024.html",
            # 10, 11.Pantalones largos
            "https://www.pullandbear.com/es/mujer/ropa/pantalones-c29021.html",
            "https://www.pullandbear.com/es/mujer/ropa/jeans-c29022.html",
            # 12.Pantalones cortos
            "https://www.pullandbear.com/es/mujer/ropa/shorts-c29023.html"
        ]

        for index, url in enumerate(urls):

            category = self.assign_category(index) 

            dirToProducts = self.dirToSave +category+'/'+self.shop+'/products/'
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            #Here we avoid executing the same code several times
            #   when more than one url points to the same category.
            #   Here all the occurences that are not the first one for a category must avoid the following code
            #   Replace with the repeated ocurrences index.
            if(index != 6 and index != 8 and index != 11):
                self.create_files( dirToProducts, current_products_dir, previous_products_dir)                

            with open(previous_products_dir) as f:
                previous_products = json.load(f)

            yield SplashRequest(url, self.parse_category_page, dont_filter = True,
                args={
                    'wait': 0.5
                },
                meta={
                    'category': category,
                    'previous_products': previous_products
                },
            )

    def parse_category_page(self, response):

        #Extract product urls from category page 
        #Depends on the shop: pullandbear

        productLinks = response.css('a.grid_itemContainer::attr(href)').extract()     
        category = response.meta['category']

        for index, productLink in enumerate(productLinks):

            #Filtrar categorias depende de cada tienda
            #P&B
            if category == 'camisetas' and ( 
                'top-' in productLink 
                or 'body-' in productLink ):
                pass

            elif category == 'tops_bodies' and ( 'camiseta-' in productLink ):
                pass

            else:
                #Make Splash Request for parsing the product url
                yield SplashRequest(
                    productLink, 
                    self.parse_product_page,
                    meta={
                        'category': response.meta['category'],
                        'previous_products' : response.meta['previous_products'],
                    }
                )             

    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #P&B
        brand = ''

        #category of the product
        category = response.meta['category']
        #Product url
        productUrl = response.url
        #Title of the product
        #Depends on the shop: P&B
        title = response.css('h1.prodMainHead::text').extract_first().strip()
        #Color of the product
        #Depends on the shop: P&B
        color = response.css('div.product_color_chooser.active>div.product_color_chooser_preview::text').extract_first().strip()

        #Check if it has discount
        # and extract the product price
        #Depends on the shop: P&B
        discounted = False
        discount = response.css('div.product_price.new').extract_first()
        if discount is not None:
            #Get element containing product price
            discounted = True
            price = response.css('div.product_price.new::text').extract_first()
        else:
            price = response.css('div.product_price::text').extract_first()
        
        #Price end " €" so we need to remove last two characters
        #Depends on the shop: P&B
        price = price[:-2]
        price = price.replace(",",".")

        #Extract image src of the clothes with the model
        #Depends on the shop: P&B
        images = response.css('div#Product_ImagesContainer img::attr(src)').extract()
        try:
            #Need to replace part of the url to do it in big size, better quality
            #Depends on the shop: BASE
            modelImageUrl = images[0].replace('_2.','_3.')
            productImageUrl = images[-1].replace('_2.','_3.')
            download_image_url = productImageUrl.replace('_3.','_2.')
        except:
            return None
        
        #Obtain the name of the file where we will download the image
        #Depends on the shop: P&B
        begin_productImageFile = download_image_url.rfind('/')+1
        end_productImageFile = download_image_url.rfind('?')
        productImageFile = download_image_url[ begin_productImageFile : end_productImageFile ]
        #Obtain the product id from the image file name
        productId = productImageFile[:-4]

        #Compute the affiliate url from the affiliate tag
        #Depends on the shop: MISSGUIDED
        affiliateUrl = self.affiliateTag.replace('XXX', productUrl)    
        
        # get JSON data ready for writing into the file
        productDetails = {
        "productId" : productId,
        "gender" : self.gender,
        "shop" : self.shop,
        "category" : category,
        "productImageUrl" : productImageUrl,
        "modelImageUrl" : modelImageUrl,
        "productUrl" : productUrl,
        "affiliateUrl" : affiliateUrl,
        "price" : price,
        "title": title,
        "brand": brand,
        "color": color,
        "discounted": discounted
        }

        #Compute product directory depending on the category and the id
        # in this directory will be stored the image and the details in json
        productDirectory =  self.product_directory(category, productId)
        productDetailsFile = productDirectory+productId+'.json'


        if productId not in response.meta['previous_products']:                

            #Check if the product is already in the database so we do not download the image again
            #Download image to the correct folder in the dataset
            self.Request.retrieve(download_image_url, productDirectory+productImageFile)
            #Write JSON data in the details file of the product
            with open(productDetailsFile, "w") as json_file:
                json.dump(productDetails, json_file, indent=2)

            #Compute Product item for scrapy
            # will be sent to pipelines.py
            product = Product(productId = productId, category = category, new= True, update = False)

            yield product

        else:
            
            with open(productDetailsFile) as f:
                previous_product_details = json.load(f)

            previous_product_price = previous_product_details['price']

            update = False

            if productPrice != previous_product_price:
                new_data = {'price' : productPrice, 'discounted': discounted}
                previous_product_details.update(new_data)
                update = True
                with open(productDetailsFile, 'w') as f:
                    json.dump(previous_product_details, f, indent = 2, separators = (',',': '))

            #Compute Product item for scrapy
            # will be sent to pipelines.py
            product = Product(productId = productId, category = category, new = False, update = update)

            yield product



    def product_directory(self, category, productId):
        productDirectory = self.dirToSave + category + '/' + self.shop + '/products/' + productId + '/'
        #Create correct directory
        if not os.path.exists(os.path.dirname(productDirectory)):
            os.makedirs(os.path.dirname(productDirectory))

        return productDirectory