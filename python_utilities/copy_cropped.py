#!/usr/bin/python3.5

import os
import shutil

from myargparse import parse_args

args = parse_args()

#input_dir = '../dataset/mujer'
#output_dir = '/media/hector/DIEGO/dataset_limpiar/mujer'
input_dir = '/media/hector/DIEGO/dataset_limpio/mujer'
output_dir = '../dataset/mujer'

for shop in args.shops:
    for category in args.categories:
        shop_folder = os.path.join(input_dir, category, shop)
        dst_shop_folder = os.path.join(output_dir, category, shop)
        if os.path.isdir(dst_shop_folder) is False:
            os.makedirs(dst_shop_folder)

        src = os.path.join(shop_folder, 'CROPPED')
        dst = os.path.join(dst_shop_folder, 'CROPPED')
        if os.path.isdir(src):
            if os.path.isdir(dst):
                shutil.rmtree(dst)
            shutil.copytree(src, dst, False, None)
