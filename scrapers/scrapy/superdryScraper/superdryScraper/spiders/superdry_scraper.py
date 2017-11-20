# -*- coding: utf-8 -*-

import scrapy
from scrapy_splash import SplashRequest
from superdryScraper.items import Product

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path
import errno



class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class SuperDrySpider(scrapy.Spider):

    name = "superdry"

    #Genero de la ropa que descargamos mujer/hombre
    gender = "mujer"
    #Nombre de la tienda
    shop = "superdry"
    affiliateTag = "http://ad.zanox.com/ppc/?43297613C1261462829T&ULP=[[XXX]]"

    dirToSave = "../../../dataset/"+gender+"/"

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #Superdry
    def assign_category(self, index):
        #Nombres de las categorias en superdry.es
        # 0.Abrigos y Chaquetas
        # 1.Abrigos y Chaquetas
        # 2.Abrigos y Chaquetas
        # 3.Vestidos
        # 4.Camisas y blusas
        # 5.Camisetas
        # 6.Camisetas
        # 7.Tops y bodies
        # 8.Sudaderas, Cardigans y jerseis
        # 9.Sudaderas, Cardigans y jerseis
        # 10.Faldas
        # 11.Pantalones largos
        # 12.Pantalones cortos

        #funciona como un switch
        if index == 0 or index == 1 or index==2:
            categoriaNombre="abrigos_chaquetas"
        elif index == 3:
            categoriaNombre="vestidos"
        elif index == 4:
            categoriaNombre="camisas_blusas"
        elif index == 5 or index == 6:
            categoriaNombre="camisetas"
        elif index == 7:
            categoriaNombre="tops_bodies"
        elif index == 8 or index == 9 or index == 13:
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
           "https://www.superdry.es/mujer/chaquetas-y-abrigos",
           "https://www.superdry.es/mujer/cazadoras-cortavientos",
           "https://www.superdry.es/mujer/piel",
           "https://www.superdry.es/mujer/vestidos",
           "https://www.superdry.es/mujer/camisas",
           "https://www.superdry.es/mujer/camisetas",
           "https://www.superdry.es/mujer/tops#product_type=Camiseta+a+rayas,Camiseta+corta,Camiseta+de+tirantes,Camiseta+estampada,Camiseta+lisa",
           "https://www.superdry.es/mujer/tops#product_type=Bodys,Camiseta+de+tirantes,Top+Bardot,Top+de+manga+corta,Top+hombros+cut-out",
           "https://www.superdry.es/mujer/tops#product_type=Jersey+con+dibujos,Jersey+liso,Sudadera,Sudadera+con+capucha+de+estilo+jersey,Sudadera+con+capucha+y+cremallera",
           "https://www.superdry.es/mujer/sudaderas",
           "https://www.superdry.es/mujer/faldas",
           "https://www.superdry.es/mujer/pantalones",
           "https://www.superdry.es/mujer/pantalones-cortos",
           "https://www.superdry.es/mujer/prendas-de-punto"
        ]
        for index, url in enumerate(urls):

            category = self.assign_category(index)

            dirToProducts = self.dirToSave +category+'/superdry/products/'
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            if(index!=1 and index!=2 and index!=6 and index!=9):
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
        #Depends on the shop: SUPERDRY
        productLinks = response.xpath('//li[@class = "hproduct"]/a/@href').extract()

        for index, productLink in enumerate(productLinks):
            if productLink is not None:
                #En SUPERDRY hay que completar la url de cada producto
                productLink = "https://www.superdry.es"+productLink
                #Make Splash Request for parsing the product url
                yield SplashRequest(productLink, self.parse_product_page,
                    meta={
                        'category': response.meta['category'],
                        'previous_products' : response.meta['previous_products'],
                    },
                )

    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #SUPERDRY has no brand
        brand = ''
        #Category of the product
        category = response.meta['category']
        #Product url
        productUrl = response.url
        #Title of the product
        #Depends on the shop: SUPERDRY
        productTitle = response.css('span.fn::text').extract_first()
        #Color of the product
        #Depends on the shop: SUPERDRY
        productColor = response.css('div.font-8 span[id="product-colour"]::text').extract_first()
        #Obtain the div that contains the image from the product
        #Depends on the shop: SUPERDRY
        images = response.css('div.scroller li a img::attr(src)').extract()
        #Extract image src of the clothes with the model
        #Depends on the shop: SUPERDRY
        #Extract image src of the clothes alone
        #Depends on the shop: SUPERDRY

        #SUPERDRY
        if category == 'faldas' or category == 'pantalones_cortos':

            modelImageUrl = images[0].replace("productthumbs/", "")
            productImageUrl = images[1].replace("productthumbs/", "")
            download_image_url = modelImageUrl

        elif category == 'pantalones_largos':
            modelImageUrl = images[1].replace("productthumbs/", "")
            productImageUrl = images[0].replace("productthumbs/", "")
            download_image_url = modelImageUrl

        else:
            modelImageUrl = images[2].replace("productthumbs/", "")
            productImageUrl = images[1].replace("productthumbs/", "")
            download_image_url = productImageUrl

        #Check if it has discount
        # and extract the product price
        #Depends on the shop: SUPERDRY
        discounted = False
        discount = response.css('span.now-price::text').extract_first()
        if discount is None:
            priceElement = response.css('span.price.font_bold::text').extract_first()
        else:
            priceElement = discount
            discounted = True
        #Remove extra simbols from the price
        #Depends on the shop: SUPERDRY
        point = priceElement.rfind("€")+1
        price = priceElement[point:]
        #Obtain the name of the file where we will download the image
        #Depends on the shop: SUPERDRY
        pt1 = productImageUrl.rfind('upload')+6
        productImageFile = productImageUrl[pt1:]
        #Obtain the product id from the image file name
        productId = productImageFile[:-4]
        #Compute the affiliate url from the affiliate tag
        #Depends on the shop: SUPERDRY
        affiliateUrl = None
        if self.affiliateTag is not None:
            affiliateUrl = self.affiliateTag.replace('XXX', productUrl.replace('https://www.superdry.es', ''))

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
