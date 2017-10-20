#!/usr/bin/python3.5

import os
import shutil

from myargparse import parse_args

args = parse_args()

input_dir = '/media/hector/HECTOR/dataset/mujer'
output_dir = '../dataset/mujer'

for shop in args.shops:
    for category in args.categories:
        products_folder = os.path.join(input_dir, category, shop, 'products')
        dst_products_folder = os.path.join(output_dir, category, shop, 'products')
        if os.path.isdir(products_folder):
            if os.path.isdir(dst_products_folder) is False:
                os.makedirs(dst_products_folder)
            for item in os.listdir(products_folder):
                src = os.path.join(products_folder, item)
                dst = os.path.join(dst_products_folder, item)
                if os.path.isdir(src):
                    if os.path.isdir(dst):
                        shutil.rmtree(dst)
                    shutil.copytree(src, dst, False, None)
                else:
                    if os.path.isfile(dst):
                        os.remove(dst)
                    shutil.copyfile(src, dst)
