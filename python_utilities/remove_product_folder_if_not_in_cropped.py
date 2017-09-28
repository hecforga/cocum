#!/usr/bin/python

import os
import json
import shutil
from os import listdir
from os.path import isfile, join

from myargparse import parse_args

args = parse_args()

base_dir = '/home/hector/workspace/cocum/dataset/mujer'

for shop in args.shops:
    for category in args.categories:
        dirProducts = "/home/hector/workspace/cocum/dataset/mujer/" + category + '/' + shop + "/products"
        dirCropped = '/home/hector/workspace/cocum/dataset/mujer/' + category + "/CROPPED"

        new_products_file_path = dirProducts + '/new_products.json'
        with open(new_products_file_path) as f:
            new_products = json.load(f)

        ids_to_remove = []
        for product_id in new_products:
            if not isfile(dirCropped + '/' + product_id + '_CROPPED.png'):
                shutil.rmtree(dirProducts +'/' + product_id)
                ids_to_remove.append(product_id)

        for id_to_remove in ids_to_remove:
            new_products.remove(id_to_remove)

        with open(new_products_file_path, 'w') as f:
            json.dump(new_products, f, indent=2, separators=(',', ': '))
