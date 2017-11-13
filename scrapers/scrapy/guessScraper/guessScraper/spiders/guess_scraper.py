import scrapy
from scrapy_splash import SplashRequest
from guessScraper.items import Product

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path
import errno




class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class GuessSpider(scrapy.Spider):

    name = "guess"

    #Genero de la ropa que descargamos mujer/hombre
    gender = "mujer"
    #Nombre de la tienda
    shop = "guess"

    affiliateTag = 'https://ad.zanox.com/ppc/?43229809C558540070&ulp=[[XXX]]'

    dirToSave = "../../../dataset/"+gender+"/"

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #GUESS
    def assign_category(self, index):
        #Nombres de las categorias en guess.eu/es
        # 0.Abrigos y Chaquetas
        # 1.Vestidos
        # 2.Vestidos
        # 3.Camisas y blusas
        # 4.Camisetas
        # 5.Tops y bodies
        # 6.Tops y bodies
        # 7.Sudaderas, Cardigans y jerseis
        # 8.Sudaderas, Cardigans y jerseis
        # 9.Faldas
        # 10.Pantalones largos
        # 11.Pantalones cortos

        #funciona como un switch
        if index == 0:
            categoriaNombre="abrigos_chaquetas"
        elif index == 1 or index == 2:
            categoriaNombre="vestidos"
        elif index == 3:
            categoriaNombre="monos"
        elif index == 4:
            categoriaNombre="camisas_blusas"
        elif index == 5:
            categoriaNombre="camisetas"
        elif index == 6 or index == 7:
            categoriaNombre="tops_bodies"
        elif index == 8 or index == 9:
            categoriaNombre="sudaderas_jerseis"
        elif index == 10:
            categoriaNombre="faldas"
        elif index == 11:
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
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/chaquetas-y-abrigos/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/vestidos/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/vestidos-largos/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/mono/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/camisas/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/t-shirt/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/tops/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/body/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/cardigan/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/jersey/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/faldas/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/pantalones/?page=99",
            "https://www.guess.eu/es/catalog/browse/mujeres/prendas-de-vestir/shorts/?page=99",
        ]
        for index, url in enumerate(urls):

            category = self.assign_category(index) 

            dirToProducts = self.dirToSave +category+'/'+self.shop+'/products/'
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            if(index!=2 and index!=7 and index!=9):
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
        #Depends on the shop: LAREDOUTE
        productLinks = response.css('a.media.pdp')
        category = response.meta['category']

        for index, productLink in enumerate(productLinks):

            productTitle = productLink.css('::attr(title)').extract_first()
            productLink = productLink.css('::attr(href)').extract_first()

            if (category == 'tops_bodies' and 'CAMIS' in productTitle):
                pass
            else:
                #Make Splash Request for parsing the product url
                yield SplashRequest(
                    productLink, 
                    self.parse_product_page,
                    meta={
                        'category': response.meta['category'],
                        'previous_products' : response.meta['previous_products'],
                        'productTitle' : productTitle,
                    }
                )

    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #GUESS
        brand = ''

        #Category of the product
        category = response.meta['category']
        #Product url
        productUrl = response.url
        #Title of the product
        #Depends on the shop: GUESS
        productTitle = response.meta['productTitle']
        #Color of the product
        #Depends on the shop: GUESS
        productColor = response.css('ul.color-list.list-unstyled li a::attr(alt)').extract_first().strip()
        #Extract image src of the clothes with the model
        #Depends on the shop: GUESS
        images = response.css('a.zoom-link > img.img-responsive::attr(src)').extract()
        try:
            modelImageUrl = images[0].replace('wid=540', 'wid=350')
            productImageUrl= images[-1].replace('wid=540', 'wid=350')
            download_image_url = productImageUrl.replace('wid=350', 'wid=414')
        except:
            return None
        #Check if it has discount
        # and extract the product price
        #Depends on the shop: GUESS
        discounted = False
        discount = response.css('div.price.hidden-xs div').extract()
        if len(discount) > 1:
            #Get element containing product price
            discounted = True
     
        #Price is given with termination " €" so we need to remove last characters
        price = response.css('div.price.hidden-xs div.actual::text').extract_first()
        price = price[4:]
        price = price.replace(",",".")
        #Obtain the name of the file where we will download the image
        #Depends on the shop: GUESS
        pt1 = modelImageUrl.rfind("/")+1
        pt2 = modelImageUrl.rfind("?")
        productImageFile = modelImageUrl[pt1:pt2]+'.jpg'
        #Obtain the product id from the image file name
        productId = productImageFile[:-4]
        #Compute the affiliate url from the affiliate tag
        #Depends on the shop: LAREDOUTE
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


        if productId not in response.meta['previous_products']:

            #Compute product directory depending on the category and the id
            # in this directory will be stored the image and the details in json
            productDirectory =  self.product_directory(category, productId)
            productDetailsFile = productDirectory+productId+'.json'
            
            #Check if the product is already in the database so we do not download the image again
            #Download image to the correct folder in the dataset
            self.Request.retrieve(download_image_url, productDirectory+productImageFile)
            #Write JSON data in the details file of the product
            with open(productDetailsFile, "w") as json_file:
                json.dump(productDetails, json_file, indent=2)

            #Compute Product item for scrapy
            # will be sent to pipelines.py
            product = Product(productId = productId, category = category, new= True)

            yield product
        else:
            #Compute Product item for scrapy
            # will be sent to pipelines.py
            product = Product(productId = productId, category = category, new= False)

            yield product



    def product_directory(self, category, productId):
        productDirectory = self.dirToSave + category + '/' + self.shop + '/products/' + productId + '/'
        #Create correct directory
        if not os.path.exists(os.path.dirname(productDirectory)):
            os.makedirs(os.path.dirname(productDirectory))

        return productDirectory