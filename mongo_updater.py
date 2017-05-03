#!/usr/bin/python

import sys
import json

from pymongo import MongoClient

if len(sys.argv) != 4:
    print(
        "Example execution:\n"
        "    ./mongo_updater.py all all all")
    exit()

dataset_folder = "./dataset"
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

client = MongoClient('mongodb://meteor:PasswordForMeteor@cluster1-shard-00-00-dmovm.mongodb.net:27017,cluster1-shard-00-01-dmovm.mongodb.net:27017,cluster1-shard-00-02-dmovm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin')
db = client.test
products_collection = db.products

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
                product_info_path = products_folder + "/" + product_id + "/" + product_id + ".json"
                with open(product_info_path) as product_info_file:
                    product_info = json.load(product_info_file)
                    
                    products_collection.insert_one(product_info)
