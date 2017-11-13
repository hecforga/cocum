import scrapy
from scrapy_splash import SplashRequest
from missguidedScraper.items import Product

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path
import errno



class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class missguidedSpider(scrapy.Spider):

    name = "missguided"

    #Genero de la ropa que descargamos mujer/hombre
    gender = "mujer"
    #Nombre de la tienda
    shop = "missguided"
    #affiliateTag for MISSGUIDED
    affiliateTag = 'https://ad.zanox.com/ppc/?43703211C1086678239&ulp=[[XXX]]'

    dirToSave = "../../../dataset/"+gender+"/"

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #MISSGUIDED
    def assign_category(self, index):
        #Nombres de las categorias en missguided.es
        # 0.Abrigos y Chaquetas
        # 1.Vestidos
        # 2.Monos
        # 3.Monos
        # 4.Camisas y blusas
        # 5.Camisas y blusas
        # 6.Camisetas
        # 7.Tops y bodies
        # 8.Tops y bodies
        # 9.Tops y bodies
        # 10.Sudaderas, Cardigans y jerseis
        # 11.Faldas
        # 12.Pantalones largos
        # 13.Pantalones cortos

        #funciona como un switch
        if index == 0:
            categoriaNombre="abrigos_chaquetas"
        elif index == 1 :
            categoriaNombre="vestidos"
        elif index == 2 or index == 3 :
            categoriaNombre="monos"
        elif index == 4 or index == 5:
            categoriaNombre="camisas_blusas"
        elif index == 6:
            categoriaNombre="camisetas"
        elif index == 7 or index == 8 or index == 9:
            categoriaNombre="tops_bodies"
        elif index == 10:
            categoriaNombre="sudaderas_jerseis"
        elif index == 11:
            categoriaNombre="faldas"
        elif index == 12:
            categoriaNombre="pantalones_largos"
        elif index == 13:
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
            "https://www.missguided.com/es/ropa/abrigos-chaquetas",
            "https://www.missguided.com/es/vestidos",
            "https://www.missguided.com/es/ropa/monos-largos",
            "https://www.missguided.com/es/ropa/monos-cortos",
            "https://www.missguided.com/es/ropa/tops/camisas",
            "https://www.missguided.com/es/ropa/tops/blusas",
            "https://www.missguided.com/es/ropa/tops/camisetas",
            "https://www.missguided.com/es/ropa/tops/tops-de-manga-larga",
            "https://www.missguided.com/es/ropa/tops/tops-de-fiesta",
            "https://www.missguided.com/es/ropa/tops/tops-cortos",
            "https://www.missguided.com/es/ropa/tops/sudaderas",
            "https://www.missguided.com/es/ropa/faldas",
            "https://www.missguided.com/es/ropa/pantalones",
            "https://www.missguided.com/es/ropa/shorts"
        ]

        for index, url in enumerate(urls):

            category = self.assign_category(index) 

            dirToProducts = self.dirToSave +category+'/'+self.shop+'/products/'
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            if(index!=3 and index!=5 and index!=8 and index!=9):
                self.create_files( dirToProducts, current_products_dir, previous_products_dir)                

            with open(previous_products_dir) as f:
                previous_products = json.load(f)

            yield SplashRequest(url, self.parse_category_page, dont_filter = True,
                meta={
                    'category': category,
                    'previous_products': previous_products,
                    'is_first_page' : True,
                },
            )

    def parse_category_page(self, response):
        #We obtain the links from each category page
        #Depends on the shop: MISSGUIDED

        if response.meta['is_first_page'] != True:

            productLinks = response.css('a.product-image::attr(href)').extract()     
            category = response.meta['category']

            for index, productLink in enumerate(productLinks):

                #Filtrar focaccias depende de cada tienda
                #MISSGUIDED
                if '-petite' in productLink or '-tall-' in productLink or '-talla-grande-' in productLink:
                    pass
                elif category == 'tops_bodies' and ( 
                    'camisa' in productLink 
                    or 'camiseta' in productLink
                    or 'blusa' in productLink 
                    or 'sudadera' in productLink 
                    or 'kimono' in productLink
                    or 'jersey' in productLink
                    ):
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


        # Check if it has pages 
        # It depends on each shop
        # MISSGUIDED      

        elif response.meta['is_first_page'] :

            number_of_products_string = response.css('p.cascade__label > class::text').extract_first()
            begin_number_of_products = number_of_products_string.rfind('de ')+3
            end_number_of_products = number_of_products_string.rfind('  estilos')
            number_of_products = int(number_of_products_string[ begin_number_of_products : end_number_of_products ])
            # Number of products per page in missguided = 40
            number_of_pages = (number_of_products + 40 //2) // 40
            number_of_button_clicks = number_of_pages - 1

            #In MISSGUIDED I had to click the button of show more several times to show all the products
            #   in the category. This is achieved by passing the number_of_button_clicks as an args to the 
            #   lua script below by passing it through the SplashRequest args further below.
            click_show_more_button_script = """
                    function main(splash)
                        local url = splash.args.url
                        assert(splash:go(url))
                        assert(splash:wait(2))

                        for i=1, splash.args.number_of_button_clicks, 1
                        do
                            assert(splash:runjs('document.getElementsByClassName("button button--alt button--short cascade__controls--button js-toggle js-cascade-button")[0].click()'))
                            assert(splash:wait(1))
                        end

                        -- return result as a JSON object
                        return {
                            html = splash:html()
                        }
                    end
                    """

            yield SplashRequest(
                response.url, 
                self.parse_category_page,
                args={
                    'lua_source': click_show_more_button_script,
                    'number_of_button_clicks' : number_of_button_clicks, 
                    'timeout': 3600  
                },

                endpoint = 'execute',
                meta={
                    'category': response.meta['category'],
                    'previous_products' : response.meta['previous_products'],
                    'is_first_page' : False
                }
            )     

    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #MISSGUIDED
        brand = ''

        #category of the product
        category = response.meta['category']
        #Product url
        productUrl = response.url
        #Title of the product
        #Depends on the shop: MISSGUIDED
        title = response.css('h1.product-essential__name.product-name::text').extract_first().strip()
        #Color of the product
        #Depends on the shop: MISSGUIDED
        #We extract the color from the title in MISSGUIDED covering all cases
        begin_color_name = title.rfind(' en ')
        if begin_color_name == -1:
            begin_color_name = title.rfind(' de ')
            if begin_color_name == -1:
                begin_color_name = title.rfind(' ') + 1

            else:
                begin_color_name += 4

        else:
            begin_color_name += 4

        color = title[begin_color_name:].strip().lower()
        #Extract image src of the clothes with the model
        #Depends on the shop: MISSGUIDED
        #In MISSGUIDED we will download the modelImage because we have the person detector for cropping
        #   but the productImage is one with more product detail but does not work for the person cropper
        images = response.css('li.more-views-list__item a picture img::attr(src)').extract()
        try:
            #Need to replace part of the url to do it in big size, better quality
            #Depends on the shop: MISSGUIDED
            modelImageUrl = images[1].replace('--1x','--3x')
            productImageUrl = images[0].replace('--1x','--3x')
            download_image_url = modelImageUrl.replace('product-page__thumbnail--3x','category-page__grid--3x')
        except:
            return None
        #Check if it has discount
        # and extract the product price
        #Depends on the shop: MISSGUIDED
        discounted = False
        discount = response.css('div.product-essential__title div.price-box p.old-price').extract_first()
        if discount is not None:
            #Get element containing product price
            discounted = True
            price = response.css('div.price-box p.special-price span.price::text').extract_first()
        else:
            price = response.css('div.price-box span span.price::text').extract_first()
     
        #Price begins"€ " so we need to remove first two characters
        #Depends on the shop: MISSGUIDED
        price = price[2:]
        price = price.replace(",",".")
        #Obtain the name of the file where we will download the image
        #Depends on the shop: MISSGUIDED
        begin_productImageFile = productImageUrl.rfind('missguided/')+len('missguided/')
        end_productImageFile = productImageUrl.rfind('_set/')
        productImageFile = productImageUrl[ begin_productImageFile : end_productImageFile ]+'.jpg'
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