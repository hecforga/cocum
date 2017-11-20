import scrapy
from scrapy_splash import SplashRequest
from mangoScraper.items import Product

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path
import errno



class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class MangoSpider(scrapy.Spider):

    name = "mango"

    #Genero de la ropa que descargamos mujer/hombre
    gender = "mujer"
    #Nombre de la tienda
    shop = "mango"
    # MANGO has no affiliate tag
    affiliateTag = ""

    dirToSave = "../../../dataset/"+gender+"/"

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #MANGO
    def assign_category(self, index):
        #Nombres de las categorias en mango.es
        # 0.Abrigos y Chaquetas
        # 1.Abrigos y chaquetas
        # 2.Vestidos
        # 3.Monos
        # 4.Camisas y blusas
        # 5.Camisetas
        # 6.Tops y bodies
        # 7.Tops y bodies
        # 8.Sudaderas, Cardigans y jerseis
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
        elif index == 5:
            categoriaNombre="camisetas"
        elif index == 6 or index == 7 or index == 8:
            categoriaNombre="tops_bodies"
        elif index == 9 or index == 10:
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
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=abrigos&menu=familia;2&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=chaquetas&menu=familia;4,304&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=vestidos&menu=familia;32&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=monos&menu=familia;34&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=camisas&menu=familia;14&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",#En Mango hay que filtrar los tops de camisas
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=camisetas&menu=familia;18,318&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",#En Mango hay que filtrar los tops y bodies de camisetas
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=camisas&menu=familia;14&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",#En Mango hay qu filtrar las camisas y las blusas de los tops
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=camisetas&menu=familia;18,318&subMenu=tops18,318;Tops&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=camisetas&menu=familia;18,318&subMenu=tops18,318;Bodies&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=sudaderas&menu=familia;610,810&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=cardigans&menu=familia;55,355&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=faldas&menu=familia;20&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=pantalones&menu=familia;26,326&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2",#En Mango hay que filtrar los shorts de los pantalones
                    "https://shop.mango.com/services/productlist/products/ES/she/sections_she_PromoWomanOCT.prendas/?idSubSection=pantalones&menu=familia;26,326&subMenu=pants26,326;Shorts&stateCode=46&pageNum=1&rowsPerPage=20&columnsPerRow=2"
                ]

        for index, url in enumerate(urls):

            category = self.assign_category(index)

            dirToProducts = self.dirToSave +category+'/'+self.shop+'/products/'
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            if(index!=1 and index!=7 and index!=8 and index!=10):
                self.create_files( dirToProducts, current_products_dir, previous_products_dir)

            with open(previous_products_dir) as f:
                previous_products = json.load(f)

            yield scrapy.Request(
                    url,
                    self.parse_category_page,
                    dont_filter = True,
                    meta = {
                        'page_number' : 1,
                        'category' : category,
                        'previous_products' : previous_products,
                    }
                )

    def parse_category_page(self, response):
        #Try to load the body of the respones as json
        data = json.loads(response.body.decode('utf-8'))
        category = response.meta['category']
        #Check if we are in the last page
        #MANGO
        try:
            garments = data['groups'][0]['garments']
            for index, garment_key in enumerate(garments):

                product_link = garments[garment_key]['colors'][0]['linkAnchor']+'&prov=46'

                #En Mango hay que filtrar los tops de camisas
                if category == 'camisas_blusas' and ('-tops' in product_link):
                    pass
                    #En Mango hay que filtrar los tops y bodies de camisetas
                elif category == 'camisetas' and ('-tops/' in product_link or '-body/' in product_link):
                    pass
                #En Mango hay qu filtrar las camisas y las blusas de los tops
                elif category == 'tops_bodies' and ('-tops/' not in product_link and '-body/' not in product_link):
                    pass
                #En Mango hay que filtrar los shorts de los pantalones
                elif category == 'pantalones_largos' and ('-shorts/' in product_link):
                    pass
                else:

                    #Make Splash Request for parsing the product url
                    yield SplashRequest(product_link,
                        self.parse_product_page,
                        meta={
                            'category': category,
                            'previous_products' : response.meta['previous_products']
                        }
                    )

            #Prepare the url for the next page
            #MANGO
            page_number = response.meta['page_number']
            next_page_number = page_number + 1
            next_page_url = response.url.replace('pageNum='+str(page_number), 'pageNum='+str(next_page_number))
            yield scrapy.Request(
                    next_page_url,
                    self.parse_category_page,
                    dont_filter = True,
                    meta = {
                        'page_number' : next_page_number,
                        'category' : category,
                        'previous_products' : response.meta['previous_products'],
                    }
                )
        except IndexError as exc:
            self.log('Found last page of '+response.meta['category'])


    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #MANGO has no brand
        brand = ""
        #Category of the product
        category = response.meta['category']
        #Product url
        productUrl = response.url
        #Title of the product
        #Depends on the shop: MANGO
        productTitle = response.css('div.nombreProducto.row-fluid h1::text').extract_first().strip()
        #Color of the product
        #Depends on the shop: MANGO
        productColor = response.css('p.producto_actual_color::text').extract_first().strip()
        #Extract image src of the clothes with the model
        #Depends on the shop: MANGO
        images = response.xpath('//img[@id="tableFoto"]/@src').extract()
        #Extract image src of the clothes alone
        #Depends on the shop: MANGO
        modelImageUrl = images[0].replace('S1', 'S9')
        productImageUrl = images[-1].replace('S1', 'S9')
        #In MANGO sometimes the images are not in order
        #   however the url of the image that has the product alone
        #   always contains the productId + '_B'
        #   so this is a way of filtering
        if '_B' in modelImageUrl:
            aux_image_url = productImageUrl
            productImageUrl = modelImageUrl
            modelImageUrl = aux_image_url

        download_image_url = productImageUrl
        #Check if it has discount
        # and extract the product price
        #Depends on the shop: MANGO
        discounted = False
        priceElement1 = response.css('span.erased.ficha_precio_venta_entero.false::text').extract_first()
        priceElement2 = response.css('span.ficha_precio_venta_decimal.false::text').extract_first()
        #Mango check if it is discounted
        if priceElement1 is None:
            priceElement1 = response.css("span.erased.ficha_precio_venta_entero.true::text").extract_first()
            priceElement2 = response.css("span.ficha_precio_venta_decimal.true::text").extract_first()
            discounted = True
        #Remove extra simbols from the price
        #Depends on the shop: MANGO
        price = priceElement1+priceElement2
        price = price.replace(",",".")
        #Obtain the name of the file where we will download the image
        #Depends on the shop: MANGO
        pt1 = productImageUrl.rfind("/")+1
        pt2 = productImageUrl.rfind("?")
        productImageFile = productImageUrl[pt1:pt2]
        #Obtain the product id from the image file name
        productId = productImageFile[:-4]
        #Compute the affiliate url from the affiliate tag
        #Depends on the shop: MANGO
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
