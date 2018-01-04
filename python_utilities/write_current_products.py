#!/usr/bin/python3.5

import os
import json

from myargparse import parse_args

args = parse_args()

base_dir = '../dataset/mujer'

for shop in args.shops:
    for category in args.categories:
        products_folder = base_dir + '/' + category + '/' + shop + '/products'

        list_of_dirs = []
        for root, dirs, files in os.walk(products_folder):
            for dir_name in dirs:
                list_of_dirs.append(dir_name)

        with open(products_folder + '/new_products.json', 'w') as outfile:
            json.dump(list_of_dirs, outfile, indent=2, separators=(',', ': '))

        #with open(products_folder + '/update_products.json', 'w') as outfile:
        #    json.dump(list_of_dirs, outfile, indent=2, separators=(',', ': '))

        #with open(products_folder + '/current_products.json', 'w') as outfile:
        #    json.dump(list_of_dirs, outfile, indent=2, separators=(',', ': '))

        #with open(products_folder + '/previous_products.json', 'w') as outfile:
        #    json.dump([], outfile, indent=2, separators=(',', ': '))
