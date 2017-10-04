import scrapy
from scrapy_splash import SplashRequest
from asosScraper.items import Product
from scrapy.selector import HtmlXPathSelector

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path



class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class AsosSpider(scrapy.Spider):

    name = "asos"

    #Genero de la ropa que descargamos mujer/hombre
    gender = "mujer"
    #Nombre de la tienda
    shop = "asos"
    affiliateTag = 'https://ad.zanox.com/ppc/?43617660C773823014&ulp=[[XXX]]'

    dirToSave = "../../../dataset/"+gender+"/"

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #ASOS
    def assign_category(self, index):
        # 0.Abrigos y Chaquetas
        # 1.Vestidos
        # 2.Monos
        # 3.Camisas y blusas
        # 4.Camisetas, 
        # 5.Tops y bodies
        # 6.Sudaderas, Cardigans y jerseis
        # 7.Sudaderas, Cardigans y jerseis
        # 8.Faldas
        # 9.Pantalones largos
        # 10.Pantalones cortos

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
        elif index == 5:
            categoriaNombre = "tops_bodies"
        elif index == 6 or index == 7:
            categoriaNombre="sudaderas_jerseis"
        elif index == 8:
            categoriaNombre="faldas"
        elif index == 9:
            categoriaNombre="pantalones_largos"
        elif index == 10:
            categoriaNombre="pantalones_cortos"

        return categoriaNombre

    def create_files( dirToProducts, current_products_dir, previous_products_dir):

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
            "http://www.asos.com/es/mujer/abrigos-y-chaquetas/cat/?cid=2641&pge=0&refine=attribute_1027:6764&currentpricerange=20-550&pgesize=204",
            "http://www.asos.com/es/mujer/vestidos/cat/?cid=8799&pge=0&refine=attribute_1027:6764,6402&currentpricerange=10-520&pgesize=204",
            "http://www.asos.com/es/mujer/monos-largos-y-cortos/cat/?cid=7618&pge=0&refine=attribute_1027:6764&currentpricerange=10-280&pgesize=36",
            "http://www.asos.com/es/mujer/tops/camisas-y-blusas/cat/?cid=11318&pge=0&refine=attribute_1027:6764&currentpricerange=15-230&pgesize=204",
            "http://www.asos.com/es/mujer/tops/cat/?cid=4169&refine=attribute_989:6807,5306|attribute_1027:6764&currentpricerange=0-405&pgesize=204&sort=priceasc",
            "http://www.asos.com/es/mujer/tops/cat/?cid=4169&pge=0&refine=attribute_989:5016,6248,6250,6341,6251,6245,6806,6244,6328,6243,5892,5083|attribute_1027:6764&currentpricerange=0-405&pgesize=204&sort=priceasc"
            "http://www.asos.com/es/mujer/tops/sudaderas-con-y-sin-capucha/cat/?cid=11321&pge=0&refine=attribute_1027:6764&currentpricerange=10-290&pgesize=36&sort=priceasc",
            "http://www.asos.com/es/mujer/jerseis-y-cardigans/cat/?cid=2637&pge=0&refine=attribute_1027:6764&currentpricerange=10-375&pgesize=204",
            "http://www.asos.com/es/mujer/faldas/cat/?cid=2639&pge=0&refine=attribute_1027:6764&currentpricerange=5-265&pgesize=204",
            "http://www.asos.com/es/mujer/pantalones-y-leggings/cat/?cid=2640&pge=0&refine=attribute_1027:6764&currentpricerange=5-390&pgesize=204",
            "http://www.asos.com/es/mujer/pantalones-cortos/cat/?cid=9263&pge=0&refine=attribute_1027:6764&currentpricerange=5-110&pgesize=204"
        ]
        for index, url in enumerate(urls):

            category = self.assign_category(index) 

            dirToProducts = self.dirToSave +category+'/'+self.shop+'/products/'            
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            if(index!=7):
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
        #Depends on the shop: ASOS
        productLinks = response.css('a.product.product-link')
        category = response.meta['category']

        for index, productLink in enumerate(productLinks):

            price = productLink.xpath('//following-sibling::div[1]/div[@class="price-wrap price-current"]/span[@class="price"]/text()').extract_first().strip()
            productLink = productLink.css('::attr(href)').extract_first()

            if ('-maternity' in productLink or '-tall' in productLink or '-petite' in productLink 
                or '-curve' in productLink or '-plus' in productLink):
                pass
            else:
                #Make Splash Request for parsing the product url
                yield SplashRequest(
                    productLink, 
                    self.parse_product_page,
                    meta={
                        'category': response.meta['category'],
                        'previous_products' : response.meta['previous_products'],
                        'price' : price,
                    }
                )

        # Check if it has pages 
        # It depends on each shop
        # ASOS
        second_part_page_link = response.css('ul.pager li.next a::attr(href)').extract_first()
        if second_part_page_link != '':
            first_part_page_link = response.url[:response.url.rfind('/cat/')+5]
            next_page_link = first_part_page_link + second_part_page_link
            yield SplashRequest(
                next_page_link, 
                self.parse_category_page,
                meta={
                    'category': response.meta['category'],
                    'previous_products' : response.meta['previous_products']
                }
            )

    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #ASOS
        brand = response.css('div.product-description span a strong::text').extract()[-1]

        #category of the product
        category = response.meta['category']
        #Product url
        productUrl = response.url
        #Title of the product
        #Depends on the shop: ASOS
        productTitle = response.css('div.product-hero h1::text').extract_first().strip()
        #In ASOS we need to remove the brand's name from the title
        productTitle = productTitle[:productTitle.rfind(' de ')-1]
        #Color of the product
        #Depends on the shop: ASOS
        #in ASOS we could not find a way of getting the color of product
        # as it is loaded after the page is rendered
        position1_color = productUrl.rfind('clr=')+4
        position2_color = productUrl.rfind('&')
        productColor = productUrl[position1_color: position2_color]

        #Extract image src of the clothes with the model
        #Depends on the shop: ASOS
        images = response.css('li.image-thumbnail.mobile-hide a img::attr(src)').extract()
        try:            
            productImageUrl= images[0].replace("$S$&wid=40","$XXL$&wid=350")
            modelImageUrl= images[-1].replace("$S$&wid=40","$XXL$&wid=350")

            if category == 'faldas' or category == 'pantalones_cortos' or category == 'pantalones_largos':
                download_image_url = productImageUrl.replace("$XXL$&wid=350","$XXL$&wid=513")
            else:
                download_image_url = modelImageUrl.replace("$XXL$&wid=350","$XXL$&wid=513")
        except:
            return None
        #Check if it has discount
        # and extract the product price
        #Depends on the shop: ASOS has no discount only in the section discounts
        discounted = False
     
        #Price is given with termination " €" so we need to remove last characters
        #ASOS
        price = response.meta['price']
        price = price[:-2]
        price = price.replace(",",".")
        #Obtain the name of the file where we will download the image
        #Depends on the shop: ASOS
        pt1 = modelImageUrl.rfind("/")+1
        pt2 = modelImageUrl.rfind("?")
        productImageFile = modelImageUrl[pt1:pt2]+'.jpg'
        #Obtain the product id from the image file name
        productId = productImageFile[:-4]
        #Compute the affiliate url from the affiliate tag
        #Depends on the shop: ASOS
        affiliateUrl = self.affiliateTag.replace('XXX', productUrl.replace('http://www.asos.com',''))    
        
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