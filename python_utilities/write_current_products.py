#!/usr/bin/python

import os
import json

shopList = ['superdry']
categoriaList = ['abrigos_chaquetas', 'camisas_blusas', 'camisetas', 'faldas', 'monos', 'pantalones_cortos', 'pantalones_largos', 'punto', 'sudaderas_jerseis', 'tops_bodies', 'vestidos']

base_dir = '/home/hector/workspace/cocum/dataset/mujer'

for shop in shopList:
    for categoria in categoriaList:
        products_folder = base_dir + '/' + categoria + '/' + shop + '/products'

        list_of_dirs = []
        for root, dirs, files in os.walk(products_folder):
            for dir_name in dirs:
                list_of_dirs.append(dir_name)

        with open(products_folder + '/new_products.json', 'w') as outfile:
            json.dump(list_of_dirs, outfile, indent=2, separators=(',', ': '))

        with open(products_folder + '/current_products.json', 'w') as outfile:
            json.dump(list_of_dirs, outfile, indent=2, separators=(',', ': '))

        with open(products_folder + '/previous_products.json', 'w') as outfile:
            json.dump([], outfile, indent=2, separators=(',', ': '))
