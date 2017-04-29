#!/usr/bin/python

import os
import sys
import glob

import dlib
from skimage import io

import numpy as np
import cv2


if len(sys.argv) != 5:
    print(
        "Example execution:\n"
        "    ./shape_predictor_single.py camisetas_tops_bodies/pullandbear/detector.svm camisetas_tops_bodies/pullandbear/predictor.dat ../dataset/hombre/camisetas_tops_bodies/pullandbear/products/5237502800_2_1_2/5237502800_2_1_2.jpg ../dataset/hombre/camisetas_tops_bodies/CROPPED/")
    exit()
detector_file = sys.argv[1]
predictor_file = sys.argv[2]
image_path = sys.argv[3]
output_folder = sys.argv[4]

predictor = dlib.shape_predictor(predictor_file)
detector = dlib.simple_object_detector(detector_file)

# Get the image from image_path
print("Processing file: {}".format(image_path))
img = cv2.imread(image_path)

# Ask the detector to find the bounding boxes of each object
rectangles = detector(img)
# Only use the first detection
r = rectangles[0]
# Get the landmarks/parts for the object in box r
full_object_detection = predictor(img, r)

# Compute output image dimensions
p = full_object_detection.part(0)
minx = p.x
maxx = p.x
miny = p.y
maxy = p.y
for i in range(full_object_detection.num_parts):
    p = full_object_detection.part(i)
    if p.x < minx:
        minx = p.x;
    if p.x > maxx:
        maxx = p.x;
    if p.y < miny:
        miny = p.y;
    if p.y > maxy:
        maxy = p.y;
output_width = maxx - minx
output_height = maxy - miny

# Compute contours and create mask image
mask = np.zeros(img.shape, np.uint8)
cnt = np.empty(full_object_detection.num_parts, dtype=(int,2))
for i in range(full_object_detection.num_parts):
    cnt[i] = (full_object_detection.part(i).x, full_object_detection.part(i).y)
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
if output_folder.rfind("/") != len(output_folder) + 1:
    output_folder += "/"
cv2.imwrite(output_folder + image_name, output_img)
