#!/usr/bin/python
# The contents of this file are in the public domain. See LICENSE_FOR_EXAMPLE_PROGRAMS.txt
#
# This example program shows how you can use dlib to make an object
#   detector for things like faces, pedestrians, and any other semi-rigid
#   object.  In particular, we go though the steps to train the kind of sliding
#   window object detector first published by Dalal and Triggs in 2005 in the
#   paper Histograms of Oriented Gradients for Human Detection.
#
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


if len(sys.argv) != 2:
    print(
        "Give the path to the directory containing the file training.xml "
        "as the argument to this program. Example execution:\n"
        "    ./train_object_detector.py t-shirts/pullandbear/products_training_xml_files/t-shirts_pullandbear_products_dataset.xml")
    exit()
training_xml_path = sys.argv[1]


# Trainer options
options = dlib.simple_object_detector_training_options()
# Since shirts are left/right symmetric we can tell the trainer to train a
# symmetric detector. This helps it get the most value out of the training
# data.
options.add_left_right_image_flips = True
# In general, a bigger C encourages the trainer to fit the training
# data better but might lead to overfitting.  Find the best C value
# empirically by checking how well the trained detector works on a test set of
# images you haven't trained on.
options.C = 1
# Optimal window size = box_area / 6.25
# For better results, the area and aspect ratio of the boxes should be similar
options.detection_window_size = 94568
# Tell the code how many CPU cores your computer has for the fastest training.
options.num_threads = 4
options.be_verbose = True


dlib.train_simple_object_detector(training_xml_path, "detector.svm", options)

print("")  # Print blank line to create gap from previous output
print("Training accuracy: {}".format(
    dlib.test_simple_object_detector(training_xml_path, "detector.svm")))

# testing_xml_path = sys.argv[2]
# print("Testing accuracy: {}".format(
#     dlib.test_simple_object_detector(testing_xml_path, "detector.svm")))
