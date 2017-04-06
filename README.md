# COCUM

## Demo

[https://cocum.herokuapp.com](https://cocum.herokuapp.com)

## Meteor

Instalar Meteor:

> `curl https://install.meteor.com/ | sh`

Clonar este repositorio, instalar dependencias y listo para ejecutar!

> `cd ~/<my-working-directory>`
> `git clone https://github.com/hecforga/cocum.git`
> `cd cocum`
> `meteor npm install`
> `meteor npm start`

## Dataset

Existe un dataset con imágenes de prendas de ropa de diferentes categorías.

Se encuentra en [esta carpeta compartida de Google Drive](https://drive.google.com/open?id=0B229wR-YZUYoUURtb1ZsSF9Edm8). (Descargar en `~/<my-working-directory>/cocum/`).

Al no encontrarse en este repositorio Git, debe mantenerse actualizada de forma manual una copia local, necesaria para los algoritmos de detección de objetos y la creación de los índices de LireSolr.

Todo este proceso es una solución temporal. Tareas:

- Implementar los "web crawlers" para descargar las imágenes de las tiendas online y mantener el dataset actualizado, todo de forma automática.
- Estudiar opciones de almacenamiento online (Cloudinary, AWS S3, etc.).

## Object detection

### Instalación

#### dlib

Instalar dependencias (CMake, Boost, Boost.Python y X11):

> `sudo apt-get install build-essential cmake`
> `sudo apt-get install libgtk-3-dev`
> `sudo apt-get install libboost-python-dev`

Instalar pip:

> `wget https://bootstrap.pypa.io/get-pip.py`
> `sudo python get-pip.py`

Instalar NumPy, SciPy y scikit-image

> ` pip install numpy`
> ` pip install scipy`
> ` pip install scikit-image`

Y finalmente instalar dlib (desde el fork de hecforga):

> `cd ~/<my-working-directory>`
> `git clone https://github.com/hecforga/dlib.git`
> `cd dlib`
> `sudo python setup.py install`

#### opencv

Instalar dependencias:

> `sudo apt-get install libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev`
> `sudo apt-get install libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev`

Instalar opencv

> `cd ~/<my-working-directory>`
> `git clone https://github.com/opencv/opencv.git`
> `cd opencv`
> `mkdir release`
> `cd release`
> `cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local ..`
> `make`
> `sudo make install`

#### ¿Todo correcto?

Para comprobar que dlib y opencv se han instalado correctamente:

> `cd ~/<my-working-directory>/cocum/object_detection`
> `./shape_predictor_single.py t-shirts/pullandbear/detector_t-shirts_pullandbear_products_squares10x12_53560c1.svm t-shirts/pullandbear/predictor_t-shirts_pullandbear_products_squares10x12.dat ../dataset/t-shirts/pullandbear/products/5237502800_2_1_2/5237502800_2_1_2.jpg ../dataset/t-shirts/pullandbear/products/5237528800_2_6_2/`

Debería ejecutarse sin errores y crear una imagen PNG con la camiseta recortada en la carpeta `~/<my-working-directory>/cocum/dataset/t-shirts/pullandbear/products/5237528800_2_6_2/`.

### Entrenamiento

TODO

### Ejecución

TODO

## LireSolr

TODO
