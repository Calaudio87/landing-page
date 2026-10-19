# Guía de Despliegue en DreamHost VPS

Esta guía describe cómo descargar, compilar y desplegar tu Landing Page profesional en un VPS de **DreamHost**.

---

## 1. Descarga del Código Fuente

Tienes dos formas directas desde Google AI Studio:

### Opción A: Exportar a GitHub (Recomendado para mantener actualizaciones)
1. En la esquina superior derecha de la interfaz de AI Studio, haz clic en el menú `...` (o icono de opciones).
2. Selecciona **Export to GitHub**.
3. Elige o crea un repositorio (ej. `claudio-leiva-portfolio`).
4. En tu equipo o directamente en tu VPS, podrás clonarlo con:
   ```bash
   git clone https://github.com/tu-usuario/claudio-leiva-portfolio.git
   ```

### Opción B: Descargar en formato ZIP
1. En el mismo menú superior derecho de AI Studio, selecciona **Download as ZIP**.
2. Descomprime el archivo en tu equipo local.

---

## 2. Compilación Local o en el VPS

Asegúrate de tener Node.js instalado (v18 o superior):

```bash
# 1. Instalar dependencias
npm install

# 2. Generar build de producción optimizado
npm run build
```

El comando generará una carpeta `/dist` con todos los archivos estáticos minimizados (HTML, CSS con Tailwind v4, JS compilado y el `.htaccess` de enrutamiento).

---

## 3. Despliegue en DreamHost VPS

### Método 1: Subida de archivos estáticos vía SCP / SFTP (El más rápido y eficiente)
Si compilas localmente en tu computadora, solo necesitas transferir el contenido de la carpeta `dist/` al directorio web de tu dominio en DreamHost:

```bash
# Ejemplo usando rsync o scp desde tu terminal local hacia DreamHost:
rsync -avz --delete dist/ usuario_dreamhost@tu-servidor-vps.dreamhost.com:/home/usuario_dreamhost/tudominio.com/
```

O si usas clientes gráficos como **FileZilla**, **Cyberduck** o **Transmit**:
1. Conéctate por SFTP a tu VPS con tu usuario y contraseña/clave SSH de DreamHost.
2. Navega a la ruta de tu dominio: `/home/usuario/tudominio.com/`.
3. Arrastra y suelta todos los archivos y carpetas que están dentro de `/dist`.

### Método 2: Servidor Apache (Predeterminado en DreamHost)
- El archivo `.htaccess` configurado en `public/.htaccess` ya se copia automáticamente a `dist/.htaccess`.
- Este archivo habilita `mod_rewrite` para que cualquier ruta cargue correctamente sin error 404, y activa compresión `GZIP` y cabeceras de caché para que tu sitio cargue en menos de 1 segundo.

### Método 3: Si utilizas Nginx en tu VPS de DreamHost
Si configuraste tu VPS con Nginx como servidor web, agrega este bloque en tu archivo de configuración de sitio (`/etc/nginx/sites-available/tudominio.com`):

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    root /home/usuario/tudominio.com;
    index index.html;

    # Compresión gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 4. Certificado SSL Gratis en DreamHost
1. Ingresa al panel de control de DreamHost: [panel.dreamhost.com](https://panel.dreamhost.com).
2. Ve a **Websites** > **Manage Websites**.
3. Ubica tu dominio y haz clic en **Manage** o en el icono de candado **HTTPS**.
4. Haz clic en **Add Let's Encrypt Certificate** (es gratuito, automático y se renueva solo).
