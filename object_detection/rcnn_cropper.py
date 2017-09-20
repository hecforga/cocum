#!/usr/bin/python

import sys
import json
import os

import numpy as np
import cv2

import _init_paths
from fast_rcnn.config import cfg
from fast_rcnn.test import im_detect
from fast_rcnn.nms_wrapper import nms
import caffe


if len(sys.argv) != 4:
    print(
        "Example execution:\n"
        "    ./main_cropper.py all all all")
    exit()

dataset_folder = "../dataset"
if sys.argv[1] == 'all':
    genders = ["hombre", "mujer"]
else:
    genders = [sys.argv[1]]
if sys.argv[2] == 'all':
    categories = ["abrigos_chaquetas", "camisas_blusas", "camisetas_tops_bodies", "faldas", "monos", "pantalones_cortos", "pantalones_largos", "punto", "sudaderas_jerseis", "vestidos"]
else:
    categories = [sys.argv[2]]
if sys.argv[3] == 'all':
    shops = ["asos", "superdry"]
else:
    shops = [sys.argv[3]]

crop_percentages = { # [x0, y0, x1, y1]
    "abrigos_chaquetas": [0.6, 0.25, 0.25, 0.4],
    "camisas_blusas": [0.25, 0.3, 0.25, 0.4],
    "camisetas_tops_bodies": [0.25, 0.3, 0.25, 0.4],
    "faldas": [0.25, 0.4, 0.25, 0.4],
    "monos": [0.25, 0.3, 0.25, 0.4],
    "pantalones_cortos": [0.3, 0.45, 0.3, 0.45],
    "pantalones_largos": [0.2, 0.5, 0.2, 0.1],
    "punto": [0, 0, 0, 0],
    "sudaderas_jerseis": [0.25, 0.3, 0.25, 0.4],
    "vestidos": [0.25, 0.3, 0.25, 0.35],
}

# Initialize Net
cfg.TEST.HAS_RPN = True # Use RPN for proposals

prototxt = os.path.join(cfg.MODELS_DIR, 'VGG16', 'faster_rcnn_alt_opt', 'faster_rcnn_test.pt')
caffemodel = os.path.join(cfg.DATA_DIR, 'faster_rcnn_models', 'VGG16_faster_rcnn_final.caffemodel')

caffe.set_mode_gpu()
caffe.set_device(0)
cfg.GPU_ID = 0
net = caffe.Net(prototxt, caffemodel, caffe.TEST)

print '\n\nLoaded network {:s}'.format(caffemodel)

for gender in genders:
    for category in categories:
        print("Processing category: " + category)
        category_folder = dataset_folder + "/" + gender + "/" + category
        output_folder = category_folder + "/" + "CROPPED"
        for shop in shops:
            products_folder = category_folder + "/" + shop + "/products"

            # Remove previous products
            previous_products_file_path = products_folder + "/previous_products.json"
            with open(previous_products_file_path) as previous_products_file:
                previous_products = json.load(previous_products_file)
            for product_id in previous_products:
                os.remove(output_folder + "/" + product_id + "_CROPPED.png")

            # Crop new products
            new_products_file_path = products_folder + "/new_products.json"
            # Traverse images in json file passed as argument
            with open(new_products_file_path) as new_products_file:
                new_products = json.load(new_products_file)

            for product_id in new_products:
                image_path = products_folder + "/" + product_id + "/" + product_id + ".jpg"
                print(image_path)
                # Get the image from image_path
                img = cv2.imread(image_path)

                PERSON_CLASS_IND = 15
                CONF_THRESH = 0.8
                NMS_THRESH = 0.3
                scores, boxes = im_detect(net, img)
                cls_boxes = boxes[:, 4*PERSON_CLASS_IND:4*(PERSON_CLASS_IND+1)]
                cls_scores = scores[:, PERSON_CLASS_IND]
                dets = np.hstack((cls_boxes, cls_scores[:, np.newaxis])).astype(np.float32)
                keep = nms(dets, NMS_THRESH)
                dets = dets[keep, :]

                inds = np.where(dets[:, -1] >= CONF_THRESH)[0]
                print(len(inds))
                if (len(inds) > 0):

                    # We assume there is only one person
                    i = inds[0]
                    bbox = dets[i, :4]

                    # Create output image
                    width = bbox[2] - bbox[0]
                    height = bbox[3] - bbox[1]
                    c_p = crop_percentages[category]
                    output_img = img[int(round(bbox[1] + c_p[1] * height)):int(round(bbox[3] - c_p[3] * height)),int(round(bbox[0] + c_p[0] * width)):int(round(bbox[2] - c_p[2] * width))]

                    # Save output image to output folder
                    image_name = image_path[image_path.rfind("/") + 1:-4]
                    image_name += "_CROPPED.png"
                    cv2.imwrite(output_folder + "/" + image_name, output_img)
