import scrapy
from scrapy_splash import SplashRequest
from forever21Scraper.items import Product

from urllib.parse import urljoin
from urllib.request import Request, urlopen, urlretrieve, FancyURLopener

import json
import os
import shutil
import os.path
import errno



class AppURLopener(FancyURLopener):
        version = "Mozilla/5.0 (Windows NT 6.3; WOW64)"


class Forever21Spider(scrapy.Spider):

    name = 'forever21'

    #Genero de la ropa que descargamos mujer/hombre
    gender = 'mujer'
    #Nombre de la tienda
    shop = 'forever21'
    affiliateTag = 'https://ad.zanox.com/ppc/?43389295C1565797894&ulp=[[XXX]]'

    dirToSave = '../../../dataset/' + gender + '/'

    Request = AppURLopener()

    #normaliza el nombre de cada categoria para nuestra BD
    #Forever 21
    def assign_category(self, index):
        #Nombres de las categorias en forever21.com
        # 0.Abrigos y Chaquetas
        # 1.Vestidos
        # 2.Monos
        # 3.Camisas y blusas
        # 4.Camisetas
        # 5.Tops y bodies
        # 6.Sudaderas y jerseis
        # 7.Sudaderas y jerseis
        # 8.Faldas
        # 9.Pantalones largos
        # 10.Pantalones cortos

        #funciona como un switch
        if index == 0:
            categoriaNombre = 'abrigos_chaquetas'
        elif index == 1:
            categoriaNombre = 'vestidos'
        elif index == 2:
            categoriaNombre = 'monos'
        elif index == 3:
            categoriaNombre = 'camisas_blusas'
        elif index == 4:
            categoriaNombre = 'camisetas'
        elif index == 5:
            categoriaNombre = 'tops_bodies'
        elif index == 6 or index == 7:
            categoriaNombre = 'sudaderas_jerseis'
        elif index == 8:
            categoriaNombre = 'faldas'
        elif index == 9:
            categoriaNombre = 'pantalones_largos'
        elif index == 10:
            categoriaNombre = 'pantalones_cortos'

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
            'http://www.forever21.com/EU/Product/Category.aspx?br=f21&category=outerwear_coats-and-jackets&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=F21&category=dress&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=f21&category=jumpsuit_romper&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=F21&category=top_blouses&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=F21&category=top_blouses&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=F21&category=top_blouses&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=F21&category=sweater&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=f21&category=top_blouses-sweatshirts-hoodies&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=f21&category=bottom_skirt&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=f21&category=bottom_trousers&lang=en-US&pagesize=120&page=1',
            'http://www.forever21.com/EU/Product/Category.aspx?br=f21&category=bottom_shorts&lang=en-US&pagesize=120&page=1'
        ]
        for index, url in enumerate(urls):

            category = self.assign_category(index)

            dirToProducts = self.dirToSave + category + '/'+ self.shop + '/products/'
            current_products_dir = dirToProducts+'current_products.json'
            previous_products_dir = dirToProducts+'previous_products.json'

            if(index != 7):
                self.create_files( dirToProducts, current_products_dir, previous_products_dir)

            with open(previous_products_dir) as f:
                previous_products = json.load(f)

            yield SplashRequest(url, self.parse_category_page, dont_filter = True,
                meta = {
                    'category': category,
                    'previous_products': previous_products,
                }
            )

    def parse_category_page(self, response):
        #We obtain the links from each category page
        #Depends on the shop: FOREVER21
        productElements = response.css('div.product_item')
        category = response.meta['category']

        for index, productElement in enumerate(productElements):
            title = productElement.css('div.item_name_c::text').extract_first().lower()
            productLink = productElement.css('::attr(href)').extract_first()

            if category == 'camisetas' and ('tee' not in title):
                pass
            elif category == 'tops_bodies' and ('top' not in title and 'bodysuit' not in title and 'cami' not in title and 'bralette' not in title):
                pass
            elif category == 'camisas_blusas' and ('shirt' not in title):
                pass
            else:
                #Make Splash Request for parsing the product url
                yield SplashRequest(productLink, self.parse_product_page,
                    meta = {
                        'category': category,
                        'previous_products' : response.meta['previous_products']
                    }
                )

        topPageNumbersSpan = response.css('span.p_number')[0]
        pageNumbers = topPageNumbersSpan.css('button::text').extract()
        currentPageNumber = int(topPageNumbersSpan.css('button.active::text').extract_first())
        lastPageNumber = int(pageNumbers[-1])

        if currentPageNumber < lastPageNumber:
            nextPageLink = response.url.replace('&page=' + str(currentPageNumber), '&page=' + str(currentPageNumber+1))
            yield SplashRequest(nextPageLink, self.parse_category_page, dont_filter = True,
                    meta = {
                        'category': category,
                        'previous_products' : response.meta['previous_products']
                    }
                )

    def parse_product_page(self, response):
        #Brand of the product for shops like Asos or Amazon
        #FOREVER21 has no brand
        brand = ''
        #Category of the product
        category = response.meta['category']
        #Product url
        productUrl = response.url
        #Title of the product
        #Depends on the shop: FOREVER21
        title = response.css('h1.item_name_p::text').extract_first().strip()
        #Color of the product
        #Depends on the shop: FOREVER21
        color = response.css('span#spanSelectedColorName::text').extract_first().strip()
        #Extract image src of the clothes with the model
        #Depends on the shop: FOREVER21
        modelImageUrl = response.css('img[alt="full"]::attr(src)').extract_first()
        #Extract image src of the clothes alone
        #Depends on the shop: FOREVER21
        productImageUrl = response.css('img[alt="front"]::attr(src)').extract_first()
        if modelImageUrl is None:
            modelImageUrl = productImageUrl
        else:
            modelImageUrl = modelImageUrl.replace('_58', '_330')
            productImageUrl = productImageUrl.replace('_58', '_330')

        displayImageUrl = response.css('img[alt="front"]::attr(src)').extract_first().replace('_58', '_330')
        download_image_url = modelImageUrl.replace('_330', '_750')
        #Check if it has discount
        # and extract the product price
        #Depends on the shop: FOREVER21
        discounted = False
        price = response.css('span#priceContainer::text').extract_first()

        if price is None:
            price = response.css('span.price_c.sale::text').extract_first()
            discounted = True
        #Remove extra simbols from the price
        #Depends on the shop: FOREVER21
        price = price[1:]
        price = price.replace(',', '.')
        #Obtain the name of the file where we will download the image
        #Depends on the shop: FOREVER21
        pt1 = productImageUrl.rfind("/")+1
        productImageFile = productImageUrl[pt1:]
        #Obtain the product id from the image file name
        productId = productImageFile[:-4]
        #Compute the affiliate url from the affiliate tag
        #Depends on the shop: FOREVER21
        affiliateUrl = self.affiliateTag.replace('XXX', productUrl)

        # get JSON data ready for writing into the file
        productDetails = {
            'productId': productId,
            'gender': self.gender,
            'shop': self.shop,
            'category': category,
            'displayImageUrl': displayImageUrl,
            'productUrl': productUrl,
            'affiliateUrl': affiliateUrl,
            'price': price,
            'title': title,
            'brand': brand,
            'color': color,
            'discounted': discounted
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
