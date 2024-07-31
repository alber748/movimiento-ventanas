# Ventanas Interactivas

Este proyecto es una simple aplicación web que simula un entorno de escritorio con ventanas que puedes mover y organizar. La aplicación utiliza solo HTML, CSS y JavaScript puro, sin dependencias externas.

## Características

- **Crear Ventanas**: Puedes crear nuevas ventanas haciendo clic en el botón "Crear Ventana".
- **Arrastrar Ventanas**: Las ventanas se pueden mover haciendo clic y arrastrando la barra de título.
- **Ordenar Ventanas**: La ventana en la que haces clic se lleva al frente de las demás, permitiendo una fácil organización.

## Instalación y Ejecución

1. Clona este repositorio en tu máquina local.
2. Abre el archivo `index.html` en un servidor en vivo (live server) o simplemente abre el archivo en tu navegador.

## Estructura del Proyecto

- `index.html`: Contiene la estructura HTML de la aplicación.
- `styles.css`: Define el estilo y diseño de la aplicación.
- `script.js`: Implementa la lógica para crear, mover y manejar las ventanas.

## Cómo Funciona

1. **Crear Ventanas**: Al hacer clic en el botón "Crear Ventana", se genera una nueva ventana en una posición inicial o en un lugar ligeramente desplazado de la última ventana creada.
2. **Mover Ventanas**: Puedes arrastrar cualquier ventana haciendo clic en su barra de título. La ventana arrastrada se coloca en el frente de las demás.
3. **Ordenar Ventanas**: Cada vez que se hace clic en una ventana, esta se lleva al frente utilizando `z-index`, permitiendo que se vea claramente en la parte superior.

## Autor

Alberto Funes García
