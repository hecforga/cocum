#!/usr/bin/python

import os
import json

shops = ['guess']
categories = ['abrigos_chaquetas', 'camisas_blusas', 'camisetas',
'faldas', 'monos', 'pantalones_cortos', 'pantalones_largos', 'punto',
'sudaderas_jerseis', 'tops_bodies', 'vestidos']

for shop in shops:
    for category in categories:
        dirProducts = '/home/hector/workspace/cocum/dataset/mujer/' + category + '/' + shop + '/products'

        for root, dirs, files in os.walk(dirProducts):
            for fileName in files:
                if '_products.json' not in fileName and '.json' in fileName:

                    productId = fileName[:-5]
                    productJson = dirProducts + '/' + productId + '/' + fileName

                    with open(productJson) as f:
                        data = json.load(f)

                    price = data['price']
                    price = price.replace('EUR ', '')

                    dataToAppend = { 'price': price }
                    data.update(dataToAppend)
                    with open(productJson, 'w') as f:
                        json.dump(data, f, indent = 2, separators = (',',': '))
