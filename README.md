# COCUM

## Dataset

Existe un dataset con imágenes de prendas de ropa de diferentes tiendas online. Está estructurado por categorías (camisetas, pantalones, vestidos, etc.) y tiendas (pullandbear, zara, mango, etc.). Además de las imágenes, también contiene información adicional de cada prenda, como la url de compra del producto o su precio.

El dataset se encuentra en [esta carpeta compartida de Google Drive](https://drive.google.com/open?id=0B229wR-YZUYoUURtb1ZsSF9Edm8). (Descargar en `~/<my-working-directory>/cocum/`), y debe mantenerse actualizado de forma manual tras la ejecución de los web crawlers.

## Object detection

### Instalación

#### dlib

Instalar dependencias (CMake, Boost, Boost.Python y X11):

```bash
sudo apt-get install build-essential cmake
sudo apt-get install libgtk-3-dev
sudo apt-get install libboost-python-dev
```

Instalar pip:

```bash
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
```

Instalar NumPy, SciPy y scikit-image

```bash
pip install numpy
pip install scipy
pip install scikit-image
```

Y finalmente instalar dlib (desde el fork de hecforga):

```bash
cd ~/<my-working-directory>
git clone https://github.com/hecforga/dlib.git
cd dlib
sudo python setup.py install
```

#### opencv

Instalar dependencias:

```bash
sudo apt-get install libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
sudo apt-get install libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev
```

Instalar opencv:

```bash
cd ~/<my-working-directory>
git clone https://github.com/opencv/opencv.git
cd opencv
mkdir release
cd release
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local ..
make
sudo make install
```

#### ¿Todo correcto?

Para comprobar que dlib y opencv se han instalado correctamente:

```bash
cd ~/<my-working-directory>/cocum/object_detection
./shape_predictor_single.py t-shirts/pullandbear/detector_t-shirts_pullandbear_products_squares10x12_53560c1.svm t-shirts/pullandbear/predictor_t-shirts_pullandbear_products_squares10x12.dat ../dataset/t-shirts/pullandbear/products/5237502800_2_1_2/5237502800_2_1_2.jpg ../dataset/t-shirts/pullandbear/products/5237528800_2_6_2/
```

Debería ejecutarse sin errores y crear una imagen PNG con la camiseta recortada en la carpeta `~/<my-working-directory>/cocum/dataset/t-shirts/pullandbear/products/5237528800_2_6_2/`.

### Entrenamiento

TODO

## Actualizar índices

### Scrapear

Ejecutar scrapers:

```bash
scrapy crawl scraper_name
```

Después de scrapear, ejecutar "python_utilities/remove_old_products.py" para las tiendas / categorías
que se hayan scrapeado.

### Recortar

Antes de recortar, eliminar las imágenes (CTRL+F ".jpg") que se hayan descargado mal. Después de esto, ejecutar "python_utilities/remove_product_folder_if_no_image.py" con los argumentos apropiados.

```bash
python main_cropper.py --shops varias tiendas o all --categories varias categorías o all
```

Después de recortar, eliminar de CROPPED las imágenes que se hayan recortado mal. Después de esto, ejecutar "python_utilities/remove_product_folder_if_not_in_cropped.py" con los argumentos apropiados.

### Añadir a Graphcool

(Si se han añadido/eliminado tiendas/categorías, editar el archivo graphcool_creator.js con dichas modificaciones antes de ejecutarlo.)

```bash
node graphcool_creator.js mujer category/all shop/all
```

### Calcular y subir índices a LireSolr

Abrir el proyecto my-liresolr en IntelliJ y ejecutar ParallelSolrIndexer.java. (Si se han añadido/eliminado tiendas/categorías, editar el archivo ParallelSolrIndexer.java con dichas modificaciones antes de ejecutarlo.)

Argumentos: /path/to/dataset mujer category/all shop/all

### Eliminar de Grapcool

(Si se han añadido/eliminado tiendas/categorías, editar el archivo graphcool_deleter.js con dichas modificaciones antes de ejecutarlo.)

```bash
node graphcool_deleter.js mujer category/all shop/all
```
