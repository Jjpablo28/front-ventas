
# Frontend de Sistema Web de Ventas

---

## Descripción General
Este repositorio contiene el desarrollo del **frontend** para un **sistema web de ventas** destinado a una **distribuidora de juguetes** con cobertura nacional. El frontend se enfoca en proporcionar una interfaz de usuario interactiva y responsiva para gestionar **ventas, inventario, clientes y productos**.

El sistema está desarrollado con **Angular**, utilizando tecnologías web estándar como **HTML5, CSS3, y TypeScript**. Además, se ha integrado **Bootstrap 5** para el diseño visual y **Chart.js** para la visualización de datos estadísticos.

---

## Objetivos Específicos
- Desarrollar una **interfaz de usuario responsiva** que sea fácil de usar en dispositivos de escritorio y móviles.
- Implementar pantallas interactivas para la **gestión de ventas**, donde se pueda ingresar productos, calcular totales y manejar pagos.
- Desarrollar módulos administrativos para gestionar **clientes** y **productos** mediante CRUD (Crear, Leer, Actualizar, Eliminar).
- Implementar un **módulo de reportes** que muestre estadísticas clave, como ventas por departamento y productos más vendidos.

---

## Arquitectura Tecnológica

### Frontend
- **Framework:** Angular  
- **Lenguajes:** HTML5, CSS3, TypeScript  
- **Diseño:** Bootstrap 5  
- **Gráficos:** Chart.js  

### Herramientas de Desarrollo
- **Git:** Control de versiones  
- **Node.js y npm:** Gestión de dependencias  
- **Angular CLI:** Herramientas de desarrollo de Angular  

---

## Módulos Principales

### Módulo de Ventas
- **Interfaz de ventas** con tres secciones:
  - **Encabezado:** Fecha y hora, selección de cliente, número de factura, forma de pago.
  - **Detalle:** Búsqueda de productos por código o nombre, y cálculos automáticos de subtotales e impuestos.
  - **Pie de Página:** Totales de productos, IVA y total general.

### Mantenimiento de Tablas Maestras
- **Clientes:** CRUD para gestionar clientes clasificados por ubicación y tipo de pago.
- **Productos:** CRUD para la gestión de productos agrupados por líneas de producto.

### Módulo de Reportes
- Generación de reportes estadísticos clave, como:
  - Ventas por departamento
  - Productos más vendidos
  - Clientes activos

---

## Requisitos del Proyecto

### Software Necesario
- **Node.js** (versión recomendada: 16+)
- **npm** (gestor de paquetes)
- **Angular CLI** (para la creación y gestión del proyecto Angular)

### Instrucciones para la Instalación local
1. Clonar el repositorio:
   ```
   git clone https://github.com/tu-usuario/front-ventas.git
   ```
2. Instalar las dependencias:
   ```
   cd front-ventas
   npm install
   ```
3. Ejecutar el proyecto:
   ```
   ng serve
   ```
   Accede al sistema en `http://localhost:4200`.

---

## Criterios de Aceptación

- La **interfaz de usuario** debe ser intuitiva y responsiva.
- Los **cálculos automáticos** en el módulo de ventas deben ser precisos.
- Los **formularios CRUD** deben ser completamente funcionales.
- El **módulo de reportes** debe mostrar estadísticas relevantes.

---

## Plan de Desarrollo

| Sesión | Tema | Fecha |
|:-------|:------|:-------|
| 1 | Diseño y Estructura Inicial | **Nov. 6** |
| 2 | Implementación Módulo de Ventas | **Nov. 7** |
| 3 | Módulo CRUD de Clientes y Productos | **Nov. 10** |
| 4 | Módulo de Reportes y Estadísticas | **Nov. 13** |
| 5 | Revisión Final y Pulimiento | **Nov. 15** |
