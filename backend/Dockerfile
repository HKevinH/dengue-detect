# [ !NOTES ] Utiliza una imagen base de Node.js con soporte a largo plazo (LTS).
# Esto garantiza estabilidad y soporte continuo para las dependencias.
FROM node:lts

# [ !NOTES ] Establece el directorio de trabajo dentro del contenedor.
# Todos los comandos posteriores se ejecutarán en este directorio.
WORKDIR /app

# [ !IMPORTANT ] Copia el archivo package.json al contenedor.
# Esto permite instalar las dependencias necesarias antes de copiar el código fuente.
COPY package.json ./

# [ !NOTES ] Instala las dependencias listadas en package.json.
# Usar un paso separado para instalar dependencias ayuda a aprovechar la caché de Docker.
RUN npm install

# [ !NOTES ] Copia el código fuente completo al directorio de trabajo.
COPY . .

# [ !NOTES ] Expone el puerto 5173 para acceder a la aplicación desde el host.
# Este puerto es común para entornos de desarrollo con herramientas como Vite.
EXPOSE 5173

# [ !CAUTION ] Inicia la aplicación en modo de desarrollo.
# En producción, se recomienda usar un comando de construcción (`npm run build`) y servir
# los archivos estáticos con un servidor web como Nginx.
CMD ["npm", "run", "dev"]
