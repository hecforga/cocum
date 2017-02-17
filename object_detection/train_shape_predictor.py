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


if len(sys.argv) != 2:
    print(
        "Give the path to the directory containing the file training.xml "
        "as the argument to this program. Example execution:\n"
        "    ./train_shape_predictor.py t-shirts/pullandbear/products_training_xml_files/t-shirts_pullandbear_products_dataset_with_landmarks.xml")
    exit()
training_xml_path = sys.argv[1]

options = dlib.shape_predictor_training_options()
# Read the documentation for the shape_predictor_trainer the Kazemi's
# paper to understand the details of the options parameters.
# Set the oversampling to a high amount (300) for effectively
# boosting the training set size.
options.oversampling_amount = 300
# Reduce the capacity of the model by explicitly increasing
# the regularization (making nu smaller) and by using trees with
# smaller depths.
options.nu = 0.05
options.tree_depth = 2
options.num_threads = 4
options.be_verbose = True

# dlib.train_shape_predictor() does the actual training.  It will save the
# final predictor to predictor.dat.  The input is an XML file that lists the
# images in the training dataset and also contains the positions of the face
# parts.
dlib.train_shape_predictor(training_xml_path, "predictor.dat", options)

# Now that we have a model we can test it.  dlib.test_shape_predictor()
# measures the average distance between a face landmark output by the
# shape_predictor and where it should be according to the truth data.
print("\nTraining accuracy: {}".format(
    dlib.test_shape_predictor(training_xml_path, "predictor.dat")))
# The real test is to see how well it does on data it wasn't trained on.  We
# trained it on a very small dataset so the accuracy is not extremely high, but
# it's still doing quite good.  Moreover, if you train it on one of the large
# face landmarking datasets you will obtain state-of-the-art results, as shown
# in the Kazemi paper.
# testing_xml_path = sys.argv[2]
# print("Testing accuracy: {}".format(
#     dlib.test_shape_predictor(testing_xml_path, "predictor.dat")))
