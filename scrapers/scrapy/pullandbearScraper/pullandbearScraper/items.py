# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class Product(scrapy.Item):
    productId = scrapy.Field()
    category = scrapy.Field()
    shop = scrapy.Field()
    new = scrapy.Field()

class PullandbearscraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass
