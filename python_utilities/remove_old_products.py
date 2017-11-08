#!/usr/bin/python3.5

import os
import json
import shutil

from myargparse import parse_args

args = parse_args()

base_dir = '../dataset/mujer'

for shop in args.shops:
    for category in args.categories:
        products_folder = os.path.join(base_dir, category, shop, 'products')
        cropped_folder = os.path.join(base_dir, category, shop, 'CROPPED')

        current_products_file_path = products_folder + '/current_products.json'
        with open(current_products_file_path) as f:
            current_products = json.load(f)

        for product_id in os.listdir(products_folder):
            product_folder = os.path.join(products_folder, product_id)
            if os.path.isdir(product_folder):
                if not product_id in current_products:
                    shutil.rmtree(product_folder)

        for cropped_image_name in os.listdir(cropped_folder):
            cropped_image = os.path.join(cropped_folder + '/' + cropped_image_name)
            os.remove(cropped_image)
