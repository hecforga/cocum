import argparse

def parse_args():
    genders_all = ['all', 'hombre', 'mujer']
    categories_all = ['all', 'abrigos_chaquetas', 'camisas_blusas', 'camisetas', 'faldas', 'monos',
        'pantalones_cortos', 'pantalones_largos', 'punto', 'sudaderas_jerseis', 'tops_bodies', 'vestidos']
    shops_all = ['all', 'asos', 'forever21', 'guess', 'laredoute', 'mango', 'missguided', 'superdry', 'zara']

    parser = argparse.ArgumentParser()
    parser.add_argument('--genders', nargs='+', default=['mujer'], choices=genders_all)
    parser.add_argument('--categories', nargs='+', required=True, choices=categories_all)
    parser.add_argument('--shops', nargs='+', required=True, choices=shops_all)

    args = parser.parse_args()

    if 'all' in args.genders:
        args.genders = genders_all[1:]
    if 'all' in args.categories:
        args.categories = categories_all[1:]
    if 'all' in args.shops:
        args.shops = shops_all[1:]

    return args
