import scrapy
from scrapy_splash import SplashRequest
from zaraScraper.items import Product

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path
import errno



class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class ZaraSpider(scrapy.Spider):

    name = "zara"

    #Genero de la ropa que descargamos mujer/hombre
    gender = "mujer"
    #Nombre de la tienda
    shop = "zara"
    affiliateTag = ''

    dirToSave = "../../../dataset/"+gender+"/"

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #ZARA
    def assign_category(self, index):
        #Nombres de las categorias en zara.es
        # 0.Abrigos y Chaquetas
        # 1.Abrigos y Chaquetas
        # 2.Abrigos y Chaquetas
        # 3.Abrigos y Chaquetas
        # 4.Vestidos
        # 5.Monos
        # 6.Camisas y blusas
        # 7.Camisetas
        # 8.Tops y bodies
        # 9.Tops y bodies
        # 10.Sudaderas, Cardigans y jerseis
        # 11.Punto
        # 12.Faldas
        # 13.Pantalones largos
        # 14.Pantalones largos
        # 15.Pantalones cortos

        #funciona como un switch
        if index == 0 or index == 1 or index == 2:
            categoriaNombre="abrigos_chaquetas"
        elif index == 3:
            categoriaNombre="vestidos"
        elif index == 4:
            categoriaNombre="monos"
        elif index == 5:
            categoriaNombre="camisas_blusas"
        elif index == 6:
            categoriaNombre="camisetas"
        elif index == 7 or index == 8 or index == 9:
            categoriaNombre= "tops_bodies"
        elif index == 10 or index == 11 or index == 12:
            categoriaNombre="sudaderas_jerseis"
        elif index == 13:
            categoriaNombre="faldas"
        elif index == 14 or index == 15:
            categoriaNombre="pantalones_largos"
        elif index == 16:
            categoriaNombre="pantalones_cortos"

        return categoriaNombre

    def create_files( self, dirToProducts, current_products_dir, previous_products_dir):

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
            "https://www.zara.com/es/es/mujer-prendas-exterior-l1184.html",
            "https://www.zara.com/es/es/mujer-chaquetas-l1114.html",
            "https://www.zara.com/es/es/mujer-blazers-l1055.html",
            "https://www.zara.com/es/es/mujer-vestidos-l1066.html",
            "https://www.zara.com/es/es/mujer-monos-l1150.html",
            "https://www.zara.com/es/es/mujer-camisas-l1217.html",
            "https://www.zara.com/es/es/mujer-camisetas-l1362.html",
            "https://www.zara.com/es/es/mujer-camisetas-l1362.html", #zara tiene los tops donde las camisetas asi que filtramos más adelante
            "https://www.zara.com/es/es/mujer-camisas-tops-l1249.html", #zara tiene los tops donde las camisas asi que filtramos más adelante
            "https://www.zara.com/es/es/mujer-body-l1057.html",
            "https://www.zara.com/es/es/mujer-sudaderas-l1320.html",
            "https://www.zara.com/es/es/mujer-punto-jerseys-l1165.html",
            "https://www.zara.com/es/es/mujer-punto-cuello-alto-l1170.html?v1=688003",
            "https://www.zara.com/es/es/mujer-faldas-l1299.html",
            "https://www.zara.com/es/es/mujer-jeans-l1119.html",
            "https://www.zara.com/es/es/mujer-pantalones-l1335.html", #zara hay que filtrar los shorts
            "https://www.zara.com/es/es/mujer-pantalones-shorts-l1355.html"
        ]
        for index, url in enumerate(urls):
            category = self.assign_category(index)

            dirToProducts = self.dirToSave +category+'/'+self.shop+'/products/'
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            if(index!=1 and index!=2 and index!=8 and index!=9 and index!=11 and index!=12 and index!=15):
                self.create_files( dirToProducts, current_products_dir, previous_products_dir)

            with open(previous_products_dir) as f:
                previous_products = json.load(f)

            yield SplashRequest(url, self.parse_category_page, dont_filter = True,
                meta={
                    'category': category,
                    'previous_products': previous_products,
                },
            )

    def parse_category_page(self, response):
        #We obtain the links from each category page
        #Depends on the shop: zara
        productElements = response.css('li.product._product')
        category = response.meta['category']

        for index, productElement in enumerate(productElements):

            priceElement = productElement.css('div.product-info._product-info>div.product-info-item.product-info-item-price>div.price._product-price>span::attr(data-price)').extract_first()
            productLink = productElement.css('a.item._item::attr(href)').extract_first()
            if not productLink:
                continue
            special_price_label = productElement.css('div.label._label.label-special_price.special_price')

            discounted = False
            if len(special_price_label) > 0:
                discounted = True

            if category == "tops_bodies" and ("top-" not in productLink and 'camiseta-tul' not in productLink):
                pass
            elif category == "camisetas" and ("top-" in productLink or 'camiseta-tul' in productLink or 'body' in productLink):
                pass
            elif category == "pantalones_largos" and ("short" in productLink or 'bermuda' in productLink):
                pass
            else:

                #Make Splash Request for parsing the product url
                yield SplashRequest(productLink, self.parse_product_page,
                    meta={
                        'category': response.meta['category'],
                        'previous_products' : response.meta['previous_products'],
                        'price' : priceElement,
                        'discounted' : discounted
                    }
                )



    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #ZARA has no brand
        brand = ''
        #Category of the product
        category = response.meta['category']
        #Product url
        productUrl = response.url
        #Title of the product
        #Depends on the shop: ZARA
        productTitle = response.css('h1.product-name::text').extract_first().strip()
        #Color of the product
        #Depends on the shop: ZARA
        productColor = response.css('span._colorName::text').extract_first().strip()
        #Extract image src of the clothes with the model
        #Depends on the shop: ZARA
        modelImageUrl_list = response.css('div[id="main-images"] div a::attr(href)').extract()
        if category == 'faldas' or category == 'pantalones_cortos' or category == 'pantalones_largos':
            modelImageUrl = modelImageUrl_list[0]
        else :
            modelImageUrl = modelImageUrl_list[1]

        modelImageUrl = 'http:'+modelImageUrl.replace('w/560', 'w/400')
        #Extract image src of the clothes alone
        #Depends on the shop: ZARA
        productImageUrl = response.css('div[id="plain-image"] div a::attr(href)').extract_first()
        productImageUrl = 'http:'+productImageUrl.replace('w/560', 'w/400')

        download_image_url = productImageUrl.replace( 'w/400', 'w/560')
        #Check if it has discount
        # and extract the product price
        #Depends on the shop: ZARA
        discounted = response.meta['discounted']
        priceElement = response.meta['price']
        #Remove extra simbols from the price
        #Depends on the shop: ZARA
        price = priceElement[:-4]
        price = price.replace(",",".")
        #Obtain the name of the file where we will download the image
        #Depends on the shop: ZARA
        pt1 = productImageUrl.rfind("/")+1
        pt2 = productImageUrl.rfind("?")
        productImageFile = productImageUrl[pt1:pt2]
        #Obtain the product id from the image file name
        productId = productImageFile[:-4]
        #Compute the affiliate url from the affiliate tag
        #Depends on the shop: ZARA
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
        "title": productTitle,
        "brand": brand,
        "color": productColor,
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

            if price != previous_product_price:
                new_data = {'price' : price, 'discounted': discounted}
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
