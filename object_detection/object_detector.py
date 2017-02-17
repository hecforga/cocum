#!/usr/bin/python

import os
import sys
import glob

import dlib
from skimage import io

if len(sys.argv) != 3:
    print(
        "Example execution:\n"
        "    ./object_detector.py t-shirts/pullandbear/detector.svm ../dataset/t-shirts/pullandbear/products/")
    exit()
detector_file = sys.argv[1]
images_folder = sys.argv[2]

# Load detector from disk.
detector = dlib.simple_object_detector(detector_file)

# Show the learnt HOG filter.
#win_det = dlib.image_window()
#win_det.set_image(detector)

full_object_detections = []
images_paths = []

# Now let's run the detector over all JPG images in the images folder and
# display the results.
# print("Showing detections...")
#win = dlib.image_window()
# We know all images are inside its own directory, so we use an extra "*"
for f in glob.glob(os.path.join(images_folder, "*", "*.jpg")):
    print("Processing file: {}".format(f))
    img = io.imread(f)
    dets = detector(img)
    #print("Number of detections: {}".format(len(dets)))
    #for k, d in enumerate(dets):
        #print("Detection {}: Left: {} Top: {} Right: {} Bottom: {}".format(
            #k, d.left(), d.top(), d.right(), d.bottom()))

    #win.clear_overlay()
    #win.set_image(img)
    #win.add_overlay(dets)

    full_object_detections.append(dlib.full_object_detection(dets[0], []))
    images_paths.append(f)

    #dlib.hit_enter_to_continue()

dlib.save_multiple_detections_results(full_object_detections, images_paths)
