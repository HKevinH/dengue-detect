# Dengue Detect

# 🧬 Dengue Detect

Este proyecto es una aplicación web creada con **React** y **Vite**, organizada utilizando la metodología **Atomic Design** para un mejor manejo de los componentes. También utilizamos **Tailwind CSS** para un diseño moderno, limpio y fácil de personalizar.

## 🚀 Características

- ⚛️ **React** con Vite para una rápida configuración y desarrollo.
- 🧬 **Atomic Design** como patrón de organización de componentes.
- 🎨 **Tailwind CSS** para un estilo rápido y eficiente.
- 📄 Arquitectura clara y escalable, ideal para aplicaciones modulares.

## 📂 Estructura del Proyecto

El proyecto sigue la arquitectura de **Atomic Design**, donde los componentes están organizados en **átomos**, **moléculas**, **organismos**, **plantillas** y **páginas**.

```bash
src/
├── assets/                # Archivos estáticos como imágenes, fuentes, etc.
├── components/
│   ├── atoms/             # Componentes más básicos (Botones, Inputs)
│   ├── molecules/         # Combinaciones simples de átomos (Navbar, Formularios)
│   ├── organisms/         # Combinaciones más complejas de moléculas (Header)
│   ├── templates/         # Plantillas que agrupan organismos (MainTemplate)
│   └── pages/             # Páginas que usan plantillas (HomePage)
├── App.jsx                # Punto de entrada de la aplicación
├── index.css              # Archivos de estilos globales (usamos Tailwind aquí)
└── main.jsx               # Archivo principal para renderizar la App
```
