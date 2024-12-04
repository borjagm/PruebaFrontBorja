# Prueba Frontend ITX - Navegador de los 100 mejores Podcasts de Apple

Este es un proyecto de prueba frontend para ITX, que consiste en un navegador para explorar los 100 mejores podcasts de Apple. La aplicación está construida utilizando React y se configura con Webpack para su ejecución en dos entornos: **desarrollo** y **producción**.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 18.x o superior)
- [npm](https://www.npmjs.com/) (gestor de paquetes de Node)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/borjagm/PruebaFrontITX.git
   cd pruebafrontitx
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```
   
## Modos de Ejecución
Este proyecto tiene dos modos de ejecución principales:

### 1. Modo Desarrollo
En el modo desarrollo, se utiliza Webpack Dev Server para iniciar un servidor local que recarga automáticamente los cambios realizados en el código. Para iniciar la aplicación en este modo, ejecuta el siguiente comando:

  ```bash
   npm run start
   ```
Esto hará lo siguiente:

- Iniciará Webpack en modo desarrollo.
- Abrirá el navegador automáticamente y cargará la aplicación en http://localhost:3000 .
- El entorno se configura para permitir la depuración y desarrollo de nuevas características.

### 2. Modo Producción
En el modo producción, el código se optimiza y se minimiza para mejorar el rendimiento en un entorno de producción real. Para construir y ejecutar la aplicación en este modo, sigue estos pasos:

Construye la aplicación para producción:

```bash
npm run build
```
Este comando ejecuta Webpack en modo producción y genera los archivos optimizados y minimizados dentro del directorio dist/.

Sirve la aplicación construida utilizando el paquete serve (debes instalarlo globalmente si aún no lo tienes):

```bash
npm install -g serve
serve -s dist
```
Esto iniciará un servidor estático que servirá los archivos de producción en el puerto 3000 al cual puedes acceder a la aplicación en:

```html
http://localhost:3000
```

## Scripts de NPM
El proyecto incluye los siguientes scripts que puedes utilizar:

- **npm start**: Inicia el servidor de desarrollo con Webpack.
- **npm run build**: Construye la versión optimizada para producción.
- **npm run lint**: Ejecuta ESLint para verificar el código fuente.
- **npm run lint-fix**: Ejecuta ESLint con la opción --fix para corregir problemas automáticamente.


Desarrollado por Borja García Martínez.
