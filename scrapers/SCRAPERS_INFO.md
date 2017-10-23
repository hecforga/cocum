# Scrapers Info #

## ASOS ##

 - **URLs de las imágenes:**
	 - faldas, pantalones_cortos, pantalones_largos:
		 - productImageUrl ---> 1ª
		 - modelImageUrl ---> última
		 - downloadImageUrl ---> productImageUrl
	 - Resto de categorías:
		 - productImageUrl ---> 1ª
		 - modelImageUrl ---> última
		 - downloadImageUrl ---> modelImageUrl
 - **Ancho de las imágenes:**
	 - urls ---> 350
	 - download ---> 513
 - **Croppers:**
	 - Todas las categorías:
		 - rcnn_cropper.py

## Forever 21 ##

 - **URLs de las imágenes:**
	 - Todas las categorías:
		 - productImageUrl ---> front
		 - modelImageUrl ---> full || front
		 - downloadImageUrl ---> modelImageUrl
 - **Ancho de las imágenes:**
	 - urls ---> 330
	 - download ---> 750
 - **Croppers:**
	 - faldas, pantalones_cortos, pantalones_largos:
		 - absolute_position_cropper.py
	 - Resto de categorías:
		 - rcnn_cropper.py

## GUESS ##

 - **URLs de las imágenes:**
	 - Todas las categorías:
		 - productImageUrl ---> última
		 - modelImageUrl ---> 1ª
		 - downloadImageUrl ---> productImageUrl
 - **Ancho de las imágenes:**
	 - urls ---> 350
	 - download ---> 414
 - **Croppers:**
	 - Todas las categorías:
		 - white_background_cropper.py

## La Redoute ##

 - **URLs de las imágenes:**
	 - Todas las categorías:
		 - productImageUrl ---> última
		 - modelImageUrl ---> 1ª
		 - downloadImageUrl ---> productImageUrl
 - **Ancho de las imágenes:**
	 - urls ---> 641 (resize con Cloudinary)
	 - download ---> 641
 - **Croppers:**
	 - Todas las categorías:
		 - white_background_cropper.py

## MANGO ##

 - **URLs de las imágenes:**
	 - Todas las categorías:
		 - productImageUrl ---> última (o 1ª si 1ª contiene "_B")
		 - modelImageUrl ---> 1ª (o última si 1ª contiene "_B")
		 - downloadImageUrl ---> productImageUrl
 - **Ancho de las imágenes:**
	 - urls ---> 407
	 - download ---> 407
 - **Croppers:**
	 - Todas las categorías:
		 - white_background_cropper.py

## Missguided ##

 - **URLs de las imágenes:**
	 - Todas las categorías:
		 - productImageUrl ---> 1ª
		 - modelImageUrl ---> 2ª
		 - downloadImageUrl ---> modelImageUrl
 - **Ancho de las imágenes:**
	 - urls ---> 300
	 - download ---> 774
 - **Croppers:**
	 - Todas las categorías:
		 - rcnn_cropper.py

## Superdry ##

 - **URLs de las imágenes:**
	 - faldas, pantalones_cortos:
		 - productImageUrl ---> 2ª
		 - modelImageUrl ---> 1ª
		 - downloadImageUrl ---> modelImageUrl
	 - pantalones_largos:
		 - productImageUrl ---> 1ª
		 - modelImageUrl ---> 2ª
		 - downloadImageUrl ---> modelImageUrl
	 - Resto de categorías:
		 - productImageUrl ---> 2ª
		 - modelImageUrl ---> 3ª
		 - downloadImageUrl ---> productImageUrl
 - **Ancho de las imágenes:**
	 - urls ---> 445
	 - download ---> 445
 - **Croppers:**
	 - faldas, pantalones_cortos, pantalones_largos:
		 - absolute_position_cropper.py
	 - vestidos:
	 	 - rcnn_cropper.py
	 - Resto de categorías:
		 - white_background_cropper.py

## ZARA ##

 - **URLs de las imágenes:**
	 - faldas, pantalones_cortos, pantalones_largos:
		 - productImageUrl ---> última
		 - modelImageUrl ---> 2ª
		 - downloadImageUrl ---> productImageUrl
	 - Resto de categorías:
		 - productImageUrl ---> última
		 - modelImageUrl ---> 1ª
		 - downloadImageUrl ---> productImageUrl
 - **Ancho de las imágenes:**
	 - urls ---> 400
	 - download ---> 560
 - **Croppers:**
	 - Todas las categorías:
		 - white_background_cropper.py
