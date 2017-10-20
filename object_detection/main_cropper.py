#!/usr/bin/python

import os
import json

from myargparse import parse_args

import white_background_cropper
import rcnn_cropper
import absolute_position_cropper

top_categories = ['abrigos_chaquetas', 'camisas_blusas', 'camisetas', 'monos', 'punto', 'sudaderas_jerseis', 'tops_bodies', 'vestidos']
bottom_categories = ['faldas', 'pantalones_cortos', 'pantalones_largos']
all_categories = top_categories + bottom_categories

correlations = {
    'asos': {
        'all': {
            'cropper': rcnn_cropper
        }
    },
    'forever21': {
        'top': {
            'cropper': rcnn_cropper
        },
        'bottom': {
            'cropper': absolute_position_cropper
        }
    },
    'guess': {
        'all': {
            'cropper': white_background_cropper
        }
    },
    'laredoute': {
        'all': {
            'cropper': white_background_cropper
        }
    },
    'mango': {
        'all': {
            'cropper': white_background_cropper
        }
    },
    'missguided': {
        'all': {
            'cropper': rcnn_cropper
        }
    },
    'superdry': {
        'top': {
            'cropper': rcnn_cropper
        },
        'bottom': {
            'cropper': absolute_position_cropper
        }
    },
    'zara': {
        'all': {
            'cropper': white_background_cropper
        }
    }
}

def crop(gender, shop, categories):
    try:
        all_object = correlations[shop]['all']
        all_object['cropper'].crop(gender, shop, categories)
    except KeyError:
        aux_top_categories = []
        aux_bottom_categories = []
        for category in categories:
            if category in bottom_categories:
                aux_bottom_categories.append(category)
            else:
                aux_top_categories.append(category)

        if len(aux_top_categories) > 0:
            top_object = correlations[shop]['top']
            top_object['cropper'].crop(gender, shop, aux_top_categories)

        if len(aux_bottom_categories) > 0:
            bottom_object = correlations[shop]['bottom']
            bottom_object['cropper'].crop(gender, shop, aux_bottom_categories)


args = parse_args()

for gender in args.genders:
    for shop in args.shops:
        crop(gender, shop, args.categories)
