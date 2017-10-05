#How to build a new shop scraper with Scrapy + Splash#


##**Building the project**##


## Set up enviroment ##
First of all, you will need to have Scrapy and Splash installed in your computer. Follow these guides for further explanation on how to do that: Scrapy [install docs](https://doc.scrapy.org/en/latest/intro/install.html), Splash [ install docs](https://github.com/scrapy-plugins/scrapy-splash).

Create a new directory in `'/cocum'`  named: `'/scrapers/scrapy'`

Finally download the latest version of the `baseScraper` project folder into this directory.

##Create Scrapy project##
With the recently created directory as the working directory, we need to create the Scrapy project . Execute the following command: 

    $ scrapy startproject <shopName>Scraper
 
##Include necessary files##
Now you will need to copy some files from the baseScraper project into the newly-created project in order to work as expected. Copy the files `items.py`, `pipelines.py` and `settings.py` that can be found in the directory `/baseScraper/baseScraper/` into  `/<shopName>Sacraper/<shopName>Scraper/`. Don't worry about replacing the original files in the directory, it's all good. 

Then, copy into `/<shopName>Scraper/<shopName>Scraper/spiders/` the file named `base_scraper.py` from `/baseScraper/baseScraper/spiders/` and rename it with this format `<shopName>_scraper.py`.

##Modify files##

Finally you will have to modify some lines in the files we just copied, taking in consideration the "caps" so we can follow same convention from scraper to scraper.

 - In **items.py**:
 `class BasescraperItem(scrapy.Item)` to `class <Shopname>scraperItem(scrapy.Item)`
 
 - In **pipelines.py**:
 `class BasescraperPipeline(object):` to `class <Shopname>scraperPipeline(object):` and `shop = 'base'` to `shop = '<shopName>'`. 
 
 - In **settings.py**:
 `BOT_NAME = '<shopName>'`
 `SPIDER_MODULES = ['<shopName>Scraper.spiders'] ` 
`NEWSPIDER_MODULE = '<shopName>Scraper.spiders'`
`ITEM_PIPELINES = {'<shopName>Scraper.pipelines.JsonWriterPipeline': 800,}`
 - In **shopName_scraper.py**:
 `from <shopName>Scraper.items import Product`
 `class <shopName>Spider(scrapy.Spider):`
 `name = '<shopName>'`
 This 'name' will be the one we will call later in the execution.



##**Writing the spider**##
In this section the minimum steps that are common to all scrapers are explained. However, it depends on each of the shops and how their website is arranged to be able to extract the data needed in each step. You can have a look at the others spiders in order to see how a particular problem is solved.

In the file `<shopName>_scraper.py` the comments will guide you as well.

 1. Set the **name** of the shop:
 `#Name of the shop
    shop = ""`
 
 2. Set the **gender** of the garments we are scraping:
 `#Gender of the garments we are crawling mujer/hombre
    gender = ""`
  
 3. **Affiliate tag**. Open the file where the affiliate tag for each retailer is and paste it here. With the XXX where the url of each product will be placed.
 `#affiliateTag for shop: BASE
    affiliateTag = ''`
  
  
 4. Assign the **categories**. This can be broke down in two different sub-steps:
	  
	4.1 Select the urls from the retailer that matches one of our categories. Match it in the `urls` list in the func `start_requests`. It can happen that two different urls match the same category. Nema problema.
	4.2 Once you have the urls ordered you need to modify the func `assign_category` with the index of each category in the `urls` list. This function works as a switch.

 5. Avoid repetition: Replace with the repeated occurrences of a category index.
 `if(index != 3 and index != 5 and index != 8 and index != 9):`
 
 6. The categories url are fetched and the `parse_category_page` func is called. After this, obtain **product_urls**. It depends on each shop website on how to extract them.
 
 7. Check if the category page has **pagination**.
 
 8. Traverse the **product_urls** and visit each of the url with a request and the func `parse_product_page` as the callback.

 8.1 It can happen that some of the links need to be **filtered** and not fetched. eg. big-size, tall-size, tops in camisetas category...

 9. Set **brand** of the product for shops like Amazon, Asos...
 
 10. Obtain **title** and **color** for each product.
 
 11. Check if the product is **discounted** and extract **price**.
 
 12. Extract **images** of the product. For more info on specifications on which url to extract have look at [Scrapers Info](https://github.com/hecforga/cocum/blob/master/scrapers/SCRAPERS_INFO.md). Set the url for:

	 12.1 **productImageUrl** - the image where the product can be seen alone or in more detail. Will be stored in graphcool. It should have width between 300-450 px.
	 12.2 **modelImageUrl** - the image where a model wears the product. Will be stored in graphcool. It should have width between 300-450 px.
	 12.3 **download_image_url** - the image that will be downloaded. It needs to be set taking into account which cropper will be used. The url will not be stored anywhere but the image located at this url will be downloaded. The optimal width is in the range of 500 and 800 px.

 13. Obtain the **productImageFile**  from the download_image_url that is the name we will store the image that will be downloaded.
 14. Set the **affiliateUrl**. Sometimes not all the productUrl needs to be on it.

##**Executing the scraper**##
1. Start the docker with the Splash:
`$ sudo docker run -d -p 8050:8050 --restart=always scrapinghub/splash --maxrss=4000`
2. For executing the spider, with `/scrapers/scrapy/<shopName>Scraper>/` as our working directory:
`$ scrapy crawl <shopName>`
3. Close the docker Splash:
`$ sudo docker kill $(sudo docker ps -q)`

##**PS:**##
The end. Hope you had fun learning how to complete a simple shop scraper to get the products of a retailer. For me it has been a bit of pain in the ass to write this guide, I think I didn't do it toooo bad, so enjoy it. Probably we will keep updating this a bit like connecting it to an amazon server to host the images directly there. Well see you soon. 



PS:
Abajo 21 buttons!!! 


 