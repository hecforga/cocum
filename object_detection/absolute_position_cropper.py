#!/usr/bin/python3.5

import sys
import json
import os

import numpy as np
import cv2


crop_percentages = { # [x0, y0, x1, y1]
    "faldas": [0.25, 0.05, 0.25, 0.6],
    "pantalones_cortos": [0.25, 0.05, 0.25, 0.7],
    "pantalones_largos": [0.3, 0.05, 0.3, 0.2]
}

dataset_folder = '../dataset'

def crop(gender, shop, category):
    category_folder = dataset_folder + "/" + gender + "/" + category
    output_folder = category_folder + '/CROPPED'
    products_folder = category_folder + '/' + shop + '/products'

    # Remove previous products
    previous_products_file_path = products_folder + "/previous_products.json"
    with open(previous_products_file_path) as previous_products_file:
        previous_products = json.load(previous_products_file)
    for product_id in previous_products:
        try:
            os.remove(output_folder + "/" + product_id + "_CROPPED.png")
        except OSError:
            pass

    # Crop new products
    new_products_file_path = products_folder + "/new_products.json"
    # Traverse images in json file passed as argument
    with open(new_products_file_path) as new_products_file:
        new_products = json.load(new_products_file)

    for product_id in new_products:
        image_path = products_folder + "/" + product_id + "/" + product_id + ".jpg"
        print(image_path)
        # Get the image from image_path
        img = cv2.imread(image_path.encode('utf-8'), 1)

        height, width, channels = img.shape
        c_p = crop_percentages[category]
        output_y0 = int(round(c_p[1] * height))
        output_y1 = int(round(height - c_p[3] * height))
        output_height = output_y1 - output_y0
        output_x0 = int(round(c_p[0] * width))
        output_x1 = int(round(width - c_p[2] * width))
        output_width = output_x1 - output_x0
        output_img = img[output_y0:output_y1,output_x0:output_x1]
        output_img = cv2.resize(output_img, (300, int((300.0 / output_width) * output_height)))

        # Save output image to output folder
        image_name = image_path[image_path.rfind("/") + 1:-4]
        image_name += "_CROPPED.png"
        cv2.imwrite((output_folder + "/" + image_name).encode('utf-8'), output_img)
