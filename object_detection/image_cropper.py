#!/usr/bin/python

# IMPORTANT: This program assumes there is a *_detection_results.xml file for each image,
#            so run shape_predictor.py before this program.

import os
import sys
import glob
import json

import dlib

if len(sys.argv) != 3:
    print(
        "Example execution:\n"
        "    ./image_cropper.py  ../dataset/t-shirts/pullandbear/products/current_products.json ../dataset/t-shirts/CROPPED/")
    exit()
images_to_be_cropped_file_path = sys.argv[1]
cropped_images_folder = sys.argv[2]

with open(images_to_be_cropped_file_path) as images_to_be_cropped_file:    
    images_to_be_cropped = json.load(images_to_be_cropped_file)

for image_path_unicode in images_to_be_cropped:
    image_path = str(image_path_unicode)
    print("Processing file: {}".format(image_path))

    dlib.crop_image(image_path, cropped_images_folder)

