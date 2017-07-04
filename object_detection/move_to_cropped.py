#!/usr/bin/python

import sys
import json

import dlib

import numpy as np
import cv2


if len(sys.argv) != 4:
    print(
        "Example execution:\n"
        "    ./move_to_cropped.py all all all")
    exit()

dataset_folder = "../dataset"
if sys.argv[1] == 'all':
    genders = ["hombre", "mujer"]
else:
    genders = [sys.argv[1]]
if sys.argv[2] == 'all':
    categories = ["abrigos_chaquetas", "camisas_blusas", "camisetas_tops_bodies", "faldas", "pantalones_cortos", "pantalones_largos", "punto", "sudaderas_jerseis", "vestidos_monos"]
else:
    categories = [sys.argv[2]]
if sys.argv[3] == 'all':
    shops = ["mango", "pullandbear", "zara"]
else:
    shops = [sys.argv[3]]

for gender in genders:
    for category in categories:
        category_folder = dataset_folder + "/" + gender + "/" + category
        output_folder = category_folder + "/" + "CROPPED"
        for shop in shops:
            products_folder = category_folder + "/" + shop + "/products"
            current_products_file_path = products_folder + "/current_products.json"

            # Traverse images in json file passed as argument
            with open(current_products_file_path) as current_products_file:    
                current_products = json.load(current_products_file)

            for product_id in current_products:
                image_path = products_folder + "/" + product_id + "/" + product_id + ".jpg"

                # Get the image from image_path
                print("Processing file: {}".format(image_path))
                img = cv2.imread(image_path)

                # Save output image to output folder
                image_name = image_path[image_path.rfind("/") + 1:-4]
                image_name += "_CROPPED.png"
                cv2.imwrite(output_folder + "/" + image_name, img)
