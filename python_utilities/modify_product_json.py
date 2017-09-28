#!/usr/bin/python

import os
import json

from myargparse import parse_args

args = parse_args()

for shop in args.shops:
    for category in args.categories:
        dirProducts = '/home/hector/workspace/cocum/dataset/mujer/' + category + '/' + shop + '/products'

        for root, dirs, files in os.walk(dirProducts):
            for fileName in files:
                if '_products.json' not in fileName and '.json' in fileName:

                    productId = fileName[:-5]
                    productJson = dirProducts + '/' + productId + '/' + fileName

                    with open(productJson) as f:
                        data = json.load(f)

                    productImageUrl = data['productImageUrl']
                    productImageUrl = productImageUrl.replace('%24category-page__grid--1x%24', '$product-page__thumbnail--3x$')

                    modelImageUrl = data['modelImageUrl']
                    modelImageUrl = modelImageUrl.replace('%24category-page__grid--1x%24', '$product-page__thumbnail--3x$')

                    dataToAppend = { 'productImageUrl': productImageUrl, 'modelImageUrl': modelImageUrl }
                    data.update(dataToAppend)
                    with open(productJson, 'w') as f:
                        json.dump(data, f, indent = 2, separators = (',',': '))
