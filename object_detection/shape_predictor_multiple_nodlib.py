#!/usr/bin/python

import sys
import json

import numpy as np
import cv2


if len(sys.argv) != 4:
    print(
        "Example execution:\n"
        "    ./shape_predictor_multiple_nodlib.py all all all")
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
    shops = ["pullandbear", "zara"]
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
                imggray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                thresh_value = 260
                aux_contours = []
                while len(aux_contours) == 0 and thresh_value > 0:
                    ret, thresh = cv2.threshold(imggray, thresh_value, 255, cv2.THRESH_BINARY)
                    img2, contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
                    aux_contours = []
                    if hierarchy is not None:
                        for i in range(len(hierarchy[0])):
                            if hierarchy[0][i][3] == 0 and hierarchy[0][i][2] > 0:
                                aux_contours.append(contours[i])
                    thresh_value -= 1
                
                if len(aux_contours) > 0:
                    # Compute output image dimensions
                    contour = sorted(aux_contours, key = cv2.contourArea, reverse = True)[0]
                    p = contour[0][0]
                    minx = p[0]
                    maxx = p[0]
                    miny = p[1]
                    maxy = p[1]
                    for i in range(len(contour)):
                        p = contour[i][0]
                        if p[0] < minx:
                            minx = p[0];
                        if p[0] > maxx:
                            maxx = p[0];
                        if p[1] < miny:
                            miny = p[1];
                        if p[1] > maxy:
                            maxy = p[1];
                    output_width = maxx - minx
                    output_height = maxy - miny

                    # Compute contours and create mask image
                    mask = np.zeros(img.shape, np.uint8)
                    cnt = np.empty(len(contour), dtype=(int,2))
                    for i in range(len(contour)):
                        cnt[i] = (contour[i][0][0], contour[i][0][1])
                    cv2.drawContours(mask,[cnt],0,(255,255,255),-1)

                    # Needed for making the background of the output image transparent
                    b_channel, g_channel, r_channel = cv2.split(img)
                    alpha_channel = np.ones(b_channel.shape, b_channel.dtype) * 255
                    img_alpha = cv2.merge((b_channel, g_channel, r_channel, alpha_channel))

                    # Create output image (4 for transparent, 3 for RGB) and apply mask
                    output_img = np.zeros((output_height, output_width, 4), np.uint8)
                    locs = np.where(mask != 0)
                    output_img[locs[0]-miny-1, locs[1]-minx-1] = img_alpha[locs[0], locs[1]]

                    # Save output image to output folder
                    image_name = image_path[image_path.rfind("/") + 1:-4]
                    image_name += "_CROPPED.png"
                    cv2.imwrite(output_folder + "/" + image_name, output_img)
