import scrapy
from scrapy_splash import SplashRequest
from laredouteScraper.items import Product

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path



class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class LaredouteSpider(scrapy.Spider):

    name = "laredoute"

    #Genero de la ropa que descargamos mujer/hombre
    gender = "mujer"
    #Nombre de la tienda
    shop = "laredoute"
    affiliateTag = 'https://ad.zanox.com/ppc/?43375426C1166500821&ulp=[[XXX]]'

    dirToSave = "../../../dataset/"+gender+"/"

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #LAREDOUTE
    def assign_category(self, index):
        #Nombres de las categorias en LaRedoute.es
        # 0.Abrigos y Chaquetas
        # 1.Abrigos y Chaquetas
        # 2.Vestidos
        # 3.Monos
        # 4.Camisas y blusas
        # 5.Camisetas
        # 6.Camisetas
        # 7.Camisetas
        # 8.Tops y bodies
        # 9.Sudaderas, Cardigans y jerseis
        # 10.Faldas
        # 11.Pantalones largos
        # 12.Pantalones cortos

        #funciona como un switch
        if index == 0 or index == 1:
            categoriaNombre="abrigos_chaquetas"
        elif index == 2:
            categoriaNombre="vestidos"
        elif index == 3:
            categoriaNombre="monos"
        elif index == 4:
            categoriaNombre="camisas_blusas"
        elif index == 5 or index == 6 or index == 7:
            categoriaNombre="camisetas"
        elif index == 8:
            categoriaNombre="tops_bodies"
        elif index == 9:
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
                with open(current_products_dir, "w") as outfile:
                    outfile.write("[]")
                with open(new_products_dir, "w") as outfile:
                    outfile.write("[]")
            except OSError as exc: # Guard against race condition
                if exc.errno != errno.EEXIST:
                    raise                       

        shutil.copy(current_products_dir, previous_products_dir)


    def start_requests(self):
        urls = [
            "http://www.laredoute.es/pplp/100/157878/201/cat-677.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/cat-703.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/cat-692.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/cat-66407.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/cat-83771.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/697/cat-701.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/697/cat-702.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/697/cat-157869.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/697/cat-698.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/cat-157879.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/cat-666.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/cat-686.aspx#shoppingtool=treestructureguidednavigation",
            "http://www.laredoute.es/pplp/100/157878/201/cat-685.aspx#shoppingtool=treestructureguidednavigation"
        ]
        for index, url in enumerate(urls):

            category = self.assign_category(index) 

            dirToProducts = self.dirToSave +category+'/'+self.shop+'/products/'
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            if(index!=1 and index!=6 and index!=7):
                self.create_files( dirToProducts, current_products_dir, previous_products_dir)

            with open(previous_products_dir) as f:
                previous_products = json.load(f)

            yield SplashRequest(url, self.parse_category_page,
                meta={
                    'category': category,
                    'previous_products': previous_products,
                },
            )

    def parse_category_page(self, response):
        #We obtain the links from each category page
        #Depends on the shop: LAREDOUTE
        productLinks = response.css('a.link::attr(href)').extract()
        category = response.meta['category']

        for index, productLink in enumerate(productLinks):

            productLink = 'http://www.laredoute.es'+productLink
            #Make Splash Request for parsing the product url
            yield SplashRequest(
                productLink, 
                self.parse_product_page,
                meta={
                    'category': response.meta['category'],
                    'previous_products' : response.meta['previous_products']
                }
            )

        nextPage = response.css('li.next a::attr(href)').extract_first()
        if nextPage is not None:
            nextPage = response.urljoin(nextPage)
            yield SplashRequest(
                nextPage, 
                self.parse_category_page,
                meta={
                    'category': response.meta['category'],
                    'previous_products' : response.meta['previous_products']
                }
            )

    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #LAREDOUTE
        brand = response.css('a.brand::text').extract_first().strip()

        #Filtering big size brands of LAREDOUTE
        if (brand != 'CASTALUNA' 
            and brand != 'TAILLISSIME' 
            and brand != 'MELLEM' 
            and brand != 'KOKO BY KOKO'
            and brand != 'MAT FASHION'):

            #Category of the product
            category = response.meta['category']
            #Product url
            productUrl = response.url
            #Title of the product
            #Depends on the shop: LAREDOUTE
            productTitle = response.css('div.title h2::text').extract_first().strip()
            #Color of the product
            #Depends on the shop: LAREDOUTE
            productColor = response.css('div.variants.colours dl dd::text').extract_first().strip()
            #Extract image src of the clothes with the model
            #Depends on the shop: LAREDOUTE
            images = response.css('ul.divAddScroller.jcarousel-list.jcarousel-list-vertical li a img::attr(src)').extract()
            if brand == 'NUMPH':                
                modelImageUrl = images[1].replace("100by100","641by641")
                productImageUrl = images[0].replace("100by100","641by641")

            elif brand == "ESPRIT":
                modelImageUrl = images[0].replace("100by100","641by641")
                productImageUrl= images[2].replace("100by100","641by641")

            else:
                try:
                    modelImageUrl = images[0].replace("100by100","641by641")
                    productImageUrl= images[4].replace("100by100","641by641")
                except:
                    return None

            download_image_url = productImageUrl
            #Check if it has discount
            # and extract the product price
            #Depends on the shop: LAREDOUTE
            discounted = False
            priceElementBefore = response.css('span.sale-price-before::text').extract_first()[:-2]
            #Get element containing product price
            priceElementAfter = response.css('span[itemprop = "price"]::text').extract_first()
            if priceElementBefore != priceElementAfter:
                discounted = True 
            #Price is given without termination " €" so we do not need to remove last characters
            productPrice = priceElementAfter
            productPrice = productPrice.replace(",",".")
            #Obtain the name of the file where we will download the image
            #Depends on the shop: LAREDOUTE
            pt1 = productImageUrl.rfind("/")+1 
            productImageFile = productImageUrl[pt1:]
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
            "price" : productPrice,
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

                if not os.path.isfile(productDirectory+productImageFile) :
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