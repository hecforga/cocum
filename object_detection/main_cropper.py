#!/usr/bin/python3.5

import os
import json

from myargparse import parse_args

import white_background_cropper
rcnn_cropper = ''
import absolute_position_cropper

top_clothes = ['abrigos_chaquetas', 'camisas_blusas', 'camisetas', 'monos', 'punto', 'sudaderas_jerseis', 'tops_bodies', 'vestidos']
bottom_clothes = ['faldas', 'pantalones_cortos', 'pantalones_largos']
all_clothes = top_clothes + bottom_clothes

correlations = {
    'asos': {
        'all_clothes': rcnn_cropper
    },
    'forever21': {
        'top_clothes': rcnn_cropper,
        'bottom_clothes': absolute_position_cropper
    },
    'guess': {
        'all_clothes': white_background_cropper
    },
    'laredoute': {
        'all_clothes': white_background_cropper
    },
    'mango': {
        'all_clothes': white_background_cropper
    },
    'missguided': {
        'all_clothes': rcnn_cropper
    },
    'superdry': {
        'top_clothes': rcnn_cropper,
        'bottom_clothes': absolute_position_cropper
    },
    'zara': {
        'all_clothes': white_background_cropper
    }
}

def crop(gender, shop, category):
    clothes_group = ''
    if category in all_clothes:
        try:
            aux_check = correlations[shop]['all_clothes']
            clothes_group = 'all_clothes'
        except KeyError:
            if category in top_clothes:
                clothes_group = 'top_clothes'
            elif category in bottom_clothes:
                clothes_group = 'bottom_clothes'

    if len(clothes_group) > 0:
        print(clothes_group)
        cropper = correlations[shop][clothes_group]
        cropper.crop(gender, shop, category)

args = parse_args()

for gender in args.genders:
    for shop in args.shops:
        for category in args.categories:
            print('Processing: ' + gender + ' - ' + shop + ' - ' + category)
            crop(gender, shop, category)
