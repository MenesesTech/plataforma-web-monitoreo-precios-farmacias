# Plataforma Web de Monitoreo de Precios de Farmacias
<img width="1919" height="985" alt="platform_capture_farma_banner" src="https://github.com/user-attachments/assets/7f403162-5516-47b4-8dd7-458a8fb751b9" />

## 📋 Descripción

Plataforma web full-stack que permite a los usuarios comparar precios de medicamentos entre diferentes farmacias en tiempo real. El sistema recopila datos mediante web scraping, los procesa y presenta de manera intuitiva, permitiendo a los usuarios encontrar las mejores ofertas para sus medicamentos.

## 🚀 Características Principales

- **Búsqueda de medicamentos** por nombre o palabras clave
- **Comparación de precios** entre diferentes farmacias
- **Visualización de datos** clara y accesible
- **Sistema de autenticación** seguro con JWT
- **Web scraping automatizado** para mantener datos actualizados

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Framework de JavaScript para UI
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework CSS utilitario
- **Axios** - Cliente HTTP para peticiones a la API
- **React Router** - Enrutamiento del lado del cliente

### Backend
- **Spring Boot 3.5** - Framework Java para aplicaciones web
- **Spring Security** - Autenticación y autorización
- **Spring Data JPA** - Persistencia de datos
- **MySQL** - Base de datos relacional
- **JWT** - Autenticación basada en tokens
- **Lombok** - Reducción de código boilerplate

### Web Scraping
- **Python** - Lenguaje de programación
- **BeautifulSoup4** - Parsing de HTML
- **Playwright** - Automatización de navegador
- **Flask** - Microframework web
- **Pandas** - Manipulación y análisis de datos

## 📊 Arquitectura del Proyecto

El proyecto sigue una arquitectura de tres capas:

1. **Frontend (React)**: Interfaz de usuario responsiva y moderna
2. **Backend (Spring Boot)**: API RESTful para gestión de datos y lógica de negocio
3. **Scraping (Python)**: Módulo independiente para la extracción de datos de sitios web de farmacias

## 🖼️ Capturas de Pantalla

<img width="1909" height="1356" alt="platform_capture_farma (1)" src="https://github.com/user-attachments/assets/3c78eb65-06ad-4db0-833f-a8a8480d1db4" />
<img width="1920" height="1976" alt="platform_capture_farma_comparador" src="https://github.com/user-attachments/assets/8ccaed62-5f74-42b6-9865-7907ca297205" />
<img width="1513" height="330" alt="image" src="https://github.com/user-attachments/assets/8ab1ab8e-f593-41ee-ba28-64e1d08a53c4" />
<img width="1920" height="1683" alt="screencapture-localhost-5173-buscar-producto-panadol-2025-07-16-17_45_58" src="https://github.com/user-attachments/assets/93d2edd0-907f-4a41-81a8-499d5042ba46" />

## ⚙️ Instalación y Ejecución

### Requisitos Previos
- Java 21
- Node.js 18+
- MySQL
- Python 3.8+

### Frontend
```bash
cd plataforma-web-frontend
npm install
npm run dev
```

### Backend
```bash
cd plataforma-web-backend
./mvnw spring-boot:run
```

### Scraping
```bash
cd scraping
pip install -r requirements.txt
python app.py
```

## 🧪 Pruebas

El proyecto incluye pruebas unitarias y de integración para garantizar la calidad del código:

### Backend (Spring Boot)

```bash
# Ejecutar todas las pruebas
cd plataforma-web-backend
./mvnw test

# Ejecutar solo pruebas de integración
./mvnw test -Dtest=*IntegrationTest
```

### Frontend (React)

```bash
# Ejecutar todas las pruebas
cd plataforma-web-frontend
npm run test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar informe de cobertura
npm run test:coverage
```

### Módulo de Scraping (Python)

```bash
cd scraping
python -m unittest discover tests

# Ejecutar prueba específica
python -m unittest tests.integration_test
```

## 🌟 Habilidades Demostradas

- Desarrollo Full-Stack (React + Spring Boot)
- Diseño de API RESTful
- Web Scraping y procesamiento de datos
- Autenticación y seguridad
- Diseño de interfaces de usuario modernas
- Integración de múltiples tecnologías
- Arquitectura de software


⭐️ Si te gusta este proyecto, ¡no dudes en darle una estrella!
