#!/usr/bin/python3.5

import os
import json
import shutil
from os.path import isfile

from myargparse import parse_args

args = parse_args()

base_dir = '../dataset/mujer'

for shop in args.shops:
    for category in args.categories:
        products_folder = base_dir + '/' + category + '/' + shop + '/products'

        ids_to_remove = []
        new_products_file_path = products_folder + '/new_products.json'
        with open(new_products_file_path) as f:
            new_products = json.load(f)

        for product_id in new_products:
            product_folder = products_folder + '/' + product_id

            if not isfile(product_folder + '/' + product_id + '.jpg'):
                try:
                    shutil.rmtree(product_folder)
                except OSError:
                    pass
                ids_to_remove.append(product_id)

        for id_to_remove in ids_to_remove:
            try:
                new_products.remove(id_to_remove)
            except ValueError:
                print('Tried to remove non-existing item, continuing...')

        with open(new_products_file_path, 'w') as f:
            json.dump(new_products, f, indent=2, separators=(',', ': '))
