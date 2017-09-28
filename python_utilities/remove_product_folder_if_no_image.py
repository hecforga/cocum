#!/usr/bin/python

import os
import json
import shutil
from os.path import isfile

from myargparse import parse_args

args = parse_args()

base_dir = '../dataset/mujer'

dirs_to_remove = []
for shop in args.shops:
    for category in args.categories:
        products_folder = base_dir + '/' + category + '/' + shop + '/products'

        ids_to_remove = []
        for root, dirs, files in os.walk(products_folder):
            for product_id in dirs:
                product_folder = products_folder + '/' + product_id

                if not isfile(product_folder + '/' + product_id + '.jpg'):
                    ids_to_remove.append(product_id)
                    dirs_to_remove.append(product_folder)

        new_products_file_path = products_folder + '/new_products.json'
        with open(new_products_file_path) as f:
            new_products = json.load(f)

        for id_to_remove in ids_to_remove:
            try:
                new_products.remove(id_to_remove)
            except ValueError:
                print('Tried to remove not existing item, continuing...')

        with open(new_products_file_path, 'w') as f:
            json.dump(new_products, f, indent=2, separators=(',', ': '))

for dir in dirs_to_remove:
    shutil.rmtree(dir)
