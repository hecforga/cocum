#!/usr/bin/python3.5

import os
import shutil

from myargparse import parse_args

args = parse_args()

#input_dir = '/media/hector/HECTOR/dataset/mujer'
#output_dir = '../dataset/mujer'
input_dir = '../dataset/mujer'
output_dir = '/media/hector/HECTOR/dataset/mujer'

for shop in args.shops:
    for category in args.categories:
        products_folder = os.path.join(input_dir, category, shop, 'products')
        dst_products_folder = os.path.join(output_dir, category, shop, 'products')
        if os.path.isdir(products_folder):
            if os.path.isdir(dst_products_folder) is False:
                os.makedirs(dst_products_folder)
            for item in os.listdir(products_folder):
                if os.path.isdir(os.path.join(products_folder, item)):
                    src = os.path.join(products_folder, item, item + '.json')
                    dst = os.path.join(dst_products_folder, item, item + '.json')
                    if os.path.isdir(os.path.join(dst_products_folder, item)) is False:
                        os.makedirs(os.path.join(dst_products_folder, item))
                    if os.path.isfile(dst):
                        os.remove(dst)
                    shutil.copyfile(src, dst)
                else:
                    src = os.path.join(products_folder, item)
                    dst = os.path.join(dst_products_folder, item)
                    if os.path.isfile(dst):
                        os.remove(dst)
                    shutil.copyfile(src, dst)
