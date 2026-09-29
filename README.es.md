<div align="center">

<a href="https://hoshuko.github.io/maison-billot/es.html"><img src="https://hoshuko.github.io/assets/readme/billot-banner-es.jpg" alt="Maison Billot en ordenador y en móvil" width="100%"></a>

# Maison Billot

**La web animada de una carnicería artesanal: el despiece del vacuno explicado pieza a pieza.**

[English](README.md) · [Français](README.fr.md) · **Español**

[![Demo en línea](https://img.shields.io/badge/Demo_en_l%C3%ADnea-hoshuko.github.io-B01F2E?style=for-the-badge)](https://hoshuko.github.io/maison-billot/es.html) [![Vídeo promocional](https://img.shields.io/badge/V%C3%ADdeo_promocional-60_s_%C2%B7_3_formatos-0F2922?style=for-the-badge)](https://hoshuko.github.io/es.html#billot) [![Idiomas](https://img.shields.io/badge/Idiomas-FR_%C2%B7_EN_%C2%B7_ES-555555?style=for-the-badge)](#idiomas) [![Licencia](https://img.shields.io/badge/Licencia-PolyForm_Noncommercial-555555?style=for-the-badge)](LICENSE)

</div>

## Vista previa

<a href="https://hoshuko.github.io/es.html#billot"><img src="https://hoshuko.github.io/assets/readme/billot-preview-es.webp" alt="Vista previa animada de Maison Billot" width="100%"></a>

La animación estrella de la web, extraída de su vídeo promocional de 60 segundos. [Ver el vídeo promocional completo →](https://hoshuko.github.io/es.html#billot)

## Lo más destacado

- **Anatomía al desplazarse.** La vaca Salers se divide en 23 piezas fotografiadas, cada una unida a su zona exacta del animal.
- **Guía de piezas.** Elige un plato (barbacoa, cocido, tartar…) para ver las piezas que le van y dónde están, con búsqueda instantánea.
- **Fichas de cada pieza.** Terneza, veteado, sabor, cocciones, platos, el consejo del carnicero y el precio por kilo.
- **Lo de la casa, despiezado.** La merguez ingrediente a ingrediente, y los kits de pot-au-feu, bourguignon y barbacoa.
- **Cámara de maduración.** Desliza del día 0 al día 60 y mira cómo cambian el chuletón, la terneza y el precio.
- **Recogida en tienda.** Prepara un pedido, elige una hora de recogida y obtén un resumen para llamar o enviar por SMS. Sin pagos en la web y sin envíos automáticos.

## Capturas de pantalla

| Ordenador | Móvil |
| :---: | :---: |
| <img src="https://hoshuko.github.io/assets/shots/billot-desktop-es.webp" alt="Maison Billot en ordenador" width="560"> | <img src="https://hoshuko.github.io/assets/shots/billot-mobile-es.webp" alt="Maison Billot en móvil" width="200"> |

## Vídeos promocionales

Tres formatos de 60 segundos, con música y efectos de sonido creados desde cero (sin audio sujeto a derechos). Haz clic en un póster para ver el vídeo.

| Horizontal · 16:9 | Feed · 4:5 | Vertical · 9:16 |
| :---: | :---: | :---: |
| <a href="https://hoshuko.github.io/assets/video/billot-169-es.mp4"><img src="https://hoshuko.github.io/assets/video/billot-169-es.jpg" alt="Vídeo promocional de Maison Billot, Horizontal · 16:9" width="360"></a> | <a href="https://hoshuko.github.io/assets/video/billot-45-es.mp4"><img src="https://hoshuko.github.io/assets/video/billot-45-es.jpg" alt="Vídeo promocional de Maison Billot, Feed · 4:5" width="180"></a> | <a href="https://hoshuko.github.io/assets/video/billot-916-es.mp4"><img src="https://hoshuko.github.io/assets/video/billot-916-es.jpg" alt="Vídeo promocional de Maison Billot, Vertical · 9:16" width="152"></a> |
| <sub>YouTube, webs</sub> | <sub>Feed de Facebook e Instagram</sub> | <sub>Reels, Stories, WhatsApp</sub> |

## Idiomas

La web está disponible en francés (`index.html`, por defecto), inglés (`en.html`) y español (`es.html`). Cada idioma es una página estática, así que los buscadores y las vistas previas de enlaces ven el texto correcto; el selector de idioma está en la navegación.

## Por dentro

- Las 23 zonas son polígonos SVG trazados sobre la foto y recortados a la silueta del animal con una máscara CSS; las escenas al desplazarse funcionan con `requestAnimationFrame` y un avance suavizado.
- HTML, CSS y JavaScript, sin frameworks ni dependencias: no hay nada que instalar ni compilar para ponerla en marcha.
- Los contenidos y los textos de la interfaz están en un archivo por idioma (`assets/js/data.fr.js · data.en.js · data.es.js`).
- Imágenes WebP, fuentes alojadas con la web, compatibilidad con `prefers-reduced-motion`, navegación con teclado y diseño comprobado desde 360 px de ancho.
- Privacidad desde el diseño: sin cookies, sin analítica, sin peticiones a terceros y con una política de seguridad de contenido (CSP) estricta.

## Ejecutar en local

Sirve cualquier servidor web estático. Con Python:

```bash
git clone https://github.com/hoshuko/maison-billot.git
cd maison-billot
python3 -m http.server 8000
```

Después abre <http://localhost:8000>. Para publicarla, sube la carpeta a cualquier alojamiento estático (GitHub Pages, Netlify, Apache, Nginx…).

## Personalizar

Todo lo que la tienda actualiza está en `assets/js/data.fr.js`, `data.en.js` y `data.es.js`: piezas y precios, elaboraciones propias, el mostrador, el horario, el teléfono y los textos de la interfaz. Los textos de las páginas están en `index.html`, `en.html` y `es.html`, y los colores son variables CSS al principio de `assets/css/style.css`.

## Créditos

Las fotos proceden de Unsplash, Pexels y Wikimedia Commons; todas las atribuciones están en [CREDITS.md](CREDITS.md). Las imágenes adaptadas de originales con licencia CC BY-SA conservan esa licencia. Las fuentes tienen licencia SIL Open Font License 1.1 ([`assets/fonts/OFL.txt`](assets/fonts/OFL.txt)). Los nombres, direcciones, teléfonos, precios y opiniones son ficticios.

## Licencia

El código se publica con la [licencia PolyForm Noncommercial 1.0.0](LICENSE). Puedes usarlo, estudiarlo y modificarlo para cualquier fin no comercial: proyectos personales, aprendizaje, docencia, asociaciones. El uso comercial, por ejemplo entregar esta maqueta a un cliente, requiere una licencia aparte: abre una incidencia (issue) en este repositorio para solicitarla. Las fotos y las fuentes conservan sus propias licencias (ver arriba).

## Seguridad

¿Has encontrado una vulnerabilidad? Comunícala de forma privada desde la pestaña **Security** del repositorio («Report a vulnerability»), no en una incidencia pública. Consulta [SECURITY.md](SECURITY.md).

## Más maquetas

Forma parte de **Escaparates en movimiento**, una serie de cuatro webs animadas al desplazarse:

- **[Tafat](https://github.com/hoshuko/tafat/blob/main/README.es.md)**: La web de un equipo de mujeres que limpia casas en la costa de Cabilia: al desplazarte, una rasqueta limpia el cristal.
- **[Atelier Nacre](https://github.com/hoshuko/atelier-nacre/blob/main/README.es.md)**: La web de un estudio de uñas en Burdeos: una manicura desmontada capa a capa, un probador de color y reservas en línea.
- **[Tiziri](https://github.com/hoshuko/tiziri/blob/main/README.es.md)**: El armario de una tienda de ropa en línea: cada prenda, fotografiada en la tienda, la lleva un maniquí de madera que cobra vida.

Portafolio: <https://hoshuko.github.io/es.html> · YouTube: <https://www.youtube.com/@Hosh-uko>
