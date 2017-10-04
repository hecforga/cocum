# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json
import os

class BasescraperPipeline(object):
    def process_item(self, item, spider):
        return item

class JsonWriterPipeline(object):

    shop = 'base'
    gender = 'mujer'
    dirToSave = '../../../dataset/'+gender+'/'

    def open_spider(self, spider):
        self.current_products_abrigos_chaquetas = []
        self.current_products_vestidos = []
        self.current_products_monos = []
        self.current_products_camisetas = []
        self.current_products_tops_bodies = []
        self.current_products_camisas_blusas = []
        self.current_products_faldas = []
        self.current_products_pantalones_largos = []
        self.current_products_pantalones_cortos = []
        self.current_products_punto = []
        self.current_products_sudaderas_jerseis = []

        self.new_products_abrigos_chaquetas = []
        self.new_products_vestidos = []
        self.new_products_monos = []
        self.new_products_camisetas = []
        self.new_products_tops_bodies = []
        self.new_products_camisas_blusas = []
        self.new_products_faldas = []
        self.new_products_pantalones_largos = []
        self.new_products_pantalones_cortos = []
        self.new_products_punto = []
        self.new_products_sudaderas_jerseis = []

    def close_spider(self, spider):

        categoryList = ['abrigos_chaquetas'
        ,'camisas_blusas','camisetas',
        'faldas','monos','pantalones_cortos','pantalones_largos','punto','sudaderas_jerseis',
        'tops_bodies', 'vestidos'
        ]

        for category in categoryList:
            dirToSave = self.dirToSave+category+'/'+self.shop+'/products/'

            if category == 'abrigos_chaquetas':
                current_products = self.current_products_abrigos_chaquetas                
                new_products = self.new_products_abrigos_chaquetas
            elif category == 'vestidos':
                current_products =self.current_products_vestidos                
                new_products = self.new_products_vestidos
            elif category == 'monos':
                current_products =self.current_products_monos                
                new_products = self.new_products_monos
            elif category == 'camisetas':
                current_products =self.current_products_camisetas                
                new_products = self.new_products_camisetas
            elif category == 'tops_bodies':
                current_products =self.current_products_tops_bodies                
                new_products = self.new_products_tops_bodies
            elif category == 'camisas_blusas':
                current_products =self.current_products_camisas_blusas                
                new_products = self.new_products_camisas_blusas
            elif category == 'faldas':
                current_products =self.current_products_faldas                
                new_products = self.new_products_faldas
            elif category == 'pantalones_largos':
                current_products =self.current_products_pantalones_largos                
                new_products = self.new_products_pantalones_largos
            elif category == 'pantalones_cortos':
                current_products =self.current_products_pantalones_cortos                
                new_products = self.new_products_pantalones_cortos
            elif category == 'sudaderas_jerseis':
                current_products =self.current_products_sudaderas_jerseis                
                new_products = self.new_products_sudaderas_jerseis
            elif category == 'punto':
                current_products =self.current_products_punto                
                new_products = self.new_products_punto

            if len(current_products > 0):
                try: 
                    with open(dirToSave+'previous_products.json') as f:
                        previous_products = json.load(f)

                except FileNotFoundError as exc:
                        previous_products = []

                aux_previous_products = []
                for product in previous_products:

                    if product not in current_products:
                        aux_previous_products.append(product)

                with open(dirToSave+'current_products.json', 'w') as f:
                    json.dump(current_products, f, indent = 2, separators = (',',': '))

                with open(dirToSave+'new_products.json', 'w') as f:
                    json.dump(new_products, f, indent = 2, separators = (',',': '))

                with open(dirToSave+'previous_products.json', 'w') as f:
                    json.dump(aux_previous_products, f, indent = 2, separators = (',',': '))

    def process_item(self, item, spider):
        if item['category'] == 'abrigos_chaquetas':
            self.current_products_abrigos_chaquetas.append(item['productId'])
            if item['new']:
                self.new_products_abrigos_chaquetas.append(item['productId'])
        elif item['category'] == 'vestidos':
            self.current_products_vestidos.append(item['productId'])
            if item['new']:
                self.new_products_vestidos.append(item['productId'])
        elif item['category'] == 'monos':
            self.current_products_monos.append(item['productId'])
            if item['new']:
                self.new_products_monos.append(item['productId'])
        elif item['category'] == 'camisetas':
            self.current_products_camisetas.append(item['productId'])
            if item['new']:
                self.new_products_camisetas.append(item['productId'])
        elif item['category'] == 'tops_bodies':
            self.current_products_tops_bodies.append(item['productId'])
            if item['new']:
                self.new_products_tops_bodies.append(item['productId'])
        elif item['category'] == 'camisas_blusas':
            self.current_products_camisas_blusas.append(item['productId'])
            if item['new']:
                self.new_products_camisas_blusas.append(item['productId'])
        elif item['category'] == 'faldas':
            self.current_products_faldas.append(item['productId'])
            if item['new']:
                self.new_products_faldas.append(item['productId'])
        elif item['category'] == 'pantalones_largos':
            self.current_products_pantalones_largos.append(item['productId'])
            if item['new']:
                self.new_products_pantalones_largos.append(item['productId'])
        elif item['category'] == 'pantalones_cortos':
            self.current_products_pantalones_cortos.append(item['productId'])
            if item['new']:
                self.new_products_pantalones_cortos.append(item['productId'])
        elif item['category'] == 'sudaderas_jerseis':
            self.current_products_sudaderas_jerseis.append(item['productId'])
            if item['new']:
                self.new_products_sudaderas_jerseis.append(item['productId'])
        elif item['category'] == 'punto':
            self.current_products_punto.append(item['productId'])
            if item['new']:
                self.new_products_punto.append(item['productId'])
            
        return item