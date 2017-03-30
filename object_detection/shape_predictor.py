#!/usr/bin/python
# The contents of this file are in the public domain. See LICENSE_FOR_EXAMPLE_PROGRAMS.txt
#
#   This example program shows how to use dlib's implementation of the paper:
#   One Millisecond Face Alignment with an Ensemble of Regression Trees by
#   Vahid Kazemi and Josephine Sullivan, CVPR 2014
#
#   In particular, we will train a face landmarking model based on a small
#   dataset and then evaluate it.  If you want to visualize the output of the
#   trained model on some images then you can run the
#   face_landmark_detection.py example program with predictor.dat as the input
#   model.
#
#   It should also be noted that this kind of model, while often used for face
#   landmarking, is quite general and can be used for a variety of shape
#   prediction tasks.  But here we demonstrate it only on a simple face
#   landmarking task.
#
# COMPILING/INSTALLING THE DLIB PYTHON INTERFACE
#   You can install dlib using the command:
#       pip install dlib
#
#   Alternatively, if you want to compile dlib yourself then go into the dlib
#   root folder and run:
#       python setup.py install
#   or
#       python setup.py install --yes USE_AVX_INSTRUCTIONS
#   if you have a CPU that supports AVX instructions, since this makes some
#   things run faster.  
#
#   Compiling dlib should work on any operating system so long as you have
#   CMake and boost-python installed.  On Ubuntu, this can be done easily by
#   running the command:
#       sudo apt-get install libboost-python-dev cmake
#
#   Also note that this example requires scikit-image which can be installed
#   via the command:
#       pip install scikit-image
#   Or downloaded from http://scikit-image.org/download.html. 

import os
import sys
import glob

import dlib
from skimage import io


if len(sys.argv) != 4:
    print(
        "Example execution:\n"
        "    ./shape_predictor.py t-shirts/pullandbear/detector.svm t-shirts/pullandbear/predictor.dat ../dataset/t-shirts/pullandbear/products/5237502800_2_1_2/5237502800_2_1_2.jpg")
    exit()
detector_file = sys.argv[1]
predictor_file = sys.argv[2]
image_path = sys.argv[3]

predictor = dlib.shape_predictor(predictor_file)
detector = dlib.simple_object_detector(detector_file)

# Run the detector and shape_predictor over the images in the images
# folder and display the results.
print("Showing detections and predictions...")
win = dlib.image_window()
print("Processing file: {}".format(image_path))
img = io.imread(image_path)

win.clear_overlay()
win.set_image(img)

# Ask the detector to find the bounding boxes of each object.
rectangles = detector(img)
print("Number of detections: {}".format(len(rectangles)))
# We only use the first detection
r = rectangles[0]
print("Detection: Left: {} Top: {} Right: {} Bottom: {}".format(r.left(), r.top(), r.right(), r.bottom()))
# Get the landmarks/parts for the object in box d.
full_object_detection = predictor(img, r)
# Draw the object landmarks on the screen.
win.add_overlay(full_object_detection)

win.add_overlay(rectangles)
dlib.hit_enter_to_continue()
