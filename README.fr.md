<div align="center">

<a href="https://hoshuko.github.io/maison-billot/"><img src="https://hoshuko.github.io/assets/readme/billot-banner-fr.jpg" alt="Maison Billot sur ordinateur et sur téléphone" width="100%"></a>

# Maison Billot

**Le site vitrine animé d’une boucherie artisanale : la découpe du bœuf expliquée pièce par pièce.**

[English](README.md) · **Français** · [Español](README.es.md)

[![Démo en ligne](https://img.shields.io/badge/D%C3%A9mo_en_ligne-hoshuko.github.io-B01F2E?style=for-the-badge)](https://hoshuko.github.io/maison-billot/) [![Vidéo promo](https://img.shields.io/badge/Vid%C3%A9o_promo-60_s_%C2%B7_3_formats-0F2922?style=for-the-badge)](https://hoshuko.github.io/#billot) [![Langues](https://img.shields.io/badge/Langues-FR_%C2%B7_EN_%C2%B7_ES-555555?style=for-the-badge)](#langues) [![Licence](https://img.shields.io/badge/Licence-PolyForm_Noncommercial-555555?style=for-the-badge)](LICENSE)

</div>

## Aperçu

<a href="https://hoshuko.github.io/#billot"><img src="https://hoshuko.github.io/assets/readme/billot-preview-fr.webp" alt="Aperçu animé de Maison Billot" width="100%"></a>

L’animation phare du site, extraite de sa vidéo promo de 60 secondes. [Voir la vidéo promo en entier →](https://hoshuko.github.io/#billot)

## Points forts

- **Anatomie au défilement.** La vache Salers se découpe en 23 morceaux photographiés, chacun relié à sa zone exacte sur la bête.
- **Guide des morceaux.** Choisissez un plat (barbecue, pot-au-feu, tartare…) pour voir les morceaux qui conviennent et où ils se trouvent, avec une recherche instantanée.
- **Fiches morceaux.** Tendreté, persillé, goût, cuissons, plats, conseil du boucher et prix au kilo.
- **Le fait maison en vue éclatée.** La merguez montrée ingrédient par ingrédient, et les kits pot-au-feu, bourguignon et barbecue.
- **Cave de maturation.** Faites glisser de J+0 à J+60 et voyez la côte, la tendreté et le prix évoluer.
- **Click & collect.** Composez un colis, choisissez un créneau de retrait et obtenez un récapitulatif à transmettre par téléphone ou par SMS. Aucun paiement sur le site, rien n’est envoyé automatiquement.

## Captures d’écran

| Ordinateur | Mobile |
| :---: | :---: |
| <img src="https://hoshuko.github.io/assets/shots/billot-desktop-fr.webp" alt="Maison Billot sur ordinateur" width="560"> | <img src="https://hoshuko.github.io/assets/shots/billot-mobile-fr.webp" alt="Maison Billot sur téléphone" width="200"> |

## Vidéos promo

Trois formats de 60 secondes, avec une musique et des bruitages créés de toutes pièces (aucun son sous droits). Cliquez sur une affiche pour lancer la vidéo.

| Paysage · 16:9 | Fil · 4:5 | Vertical · 9:16 |
| :---: | :---: | :---: |
| <a href="https://hoshuko.github.io/assets/video/billot-169-fr.mp4"><img src="https://hoshuko.github.io/assets/video/billot-169-fr.jpg" alt="Vidéo promo Maison Billot, Paysage · 16:9" width="360"></a> | <a href="https://hoshuko.github.io/assets/video/billot-45-fr.mp4"><img src="https://hoshuko.github.io/assets/video/billot-45-fr.jpg" alt="Vidéo promo Maison Billot, Fil · 4:5" width="180"></a> | <a href="https://hoshuko.github.io/assets/video/billot-916-fr.mp4"><img src="https://hoshuko.github.io/assets/video/billot-916-fr.jpg" alt="Vidéo promo Maison Billot, Vertical · 9:16" width="152"></a> |
| <sub>YouTube, sites web</sub> | <sub>Fils Facebook et Instagram</sub> | <sub>Reels, Stories, WhatsApp</sub> |

## Langues

Le site existe en français (`index.html`, par défaut), en anglais (`en.html`) et en espagnol (`es.html`). Chaque langue est une page statique : les moteurs de recherche et les aperçus de liens voient le bon texte, et le sélecteur de langue se trouve dans la navigation.

## Sous le capot

- Les 23 zones sont des polygones SVG tracés sur la photo et découpés à la silhouette de l’animal par un masque CSS ; les scènes au défilement tournent avec `requestAnimationFrame` et une progression lissée.
- HTML, CSS et JavaScript, sans framework ni dépendance : rien à installer ni à compiler pour le lancer.
- Les contenus et les textes de l’interface tiennent dans un fichier par langue (`assets/js/data.fr.js · data.en.js · data.es.js`).
- Images WebP, polices hébergées avec le site, prise en compte de `prefers-reduced-motion`, navigation au clavier et mise en page vérifiée dès 360 px de large.
- Respect de la vie privée : ni cookies, ni mesure d’audience, ni requête vers un service tiers, et une politique de sécurité du contenu (CSP) stricte.

## Lancer en local

N’importe quel serveur web statique convient. Avec Python :

```bash
git clone https://github.com/hoshuko/maison-billot.git
cd maison-billot
python3 -m http.server 8000
```

Ouvrez ensuite <http://localhost:8000>. Pour le mettre en ligne, déposez le dossier chez n’importe quel hébergeur statique (GitHub Pages, Netlify, Apache, Nginx…).

## Personnaliser

Tout ce que la boutique met à jour se trouve dans `assets/js/data.fr.js`, `data.en.js` et `data.es.js` : morceaux et prix, produits maison, vitrine, horaires, numéro de téléphone et textes de l’interface. Les textes des pages sont dans `index.html`, `en.html` et `es.html`, et les couleurs sont des variables CSS en tête de `assets/css/style.css`.

## Crédits

Les photos viennent d’Unsplash, de Pexels et de Wikimedia Commons ; toutes les attributions sont dans [CREDITS.md](CREDITS.md). Les images adaptées d’originaux sous CC BY-SA restent sous cette licence. Les polices sont sous licence SIL Open Font License 1.1 ([`assets/fonts/OFL.txt`](assets/fonts/OFL.txt)). Les noms, adresses, numéros, prix et avis sont fictifs.

## Licence

Le code est publié sous [licence PolyForm Noncommercial 1.0.0](LICENSE). Vous pouvez l’utiliser, l’étudier et le modifier pour tout usage non commercial : projets personnels, apprentissage, enseignement, associations. Un usage commercial, par exemple livrer cette maquette à un client, demande une licence à part : ouvrez un ticket (issue) sur ce dépôt pour en faire la demande. Les photos et les polices gardent leurs propres licences (voir plus haut).

## Sécurité

Vous avez trouvé une faille ? Signalez-la en privé depuis l’onglet **Security** du dépôt (« Report a vulnerability »), plutôt que dans un ticket public. Voir [SECURITY.md](SECURITY.md).

## Autres maquettes

Cette maquette fait partie de **Vitrines en mouvement**, une série de trois sites animés au défilement :

- **[Tafat](https://github.com/hoshuko/tafat/blob/main/README.fr.md)**: Le site d’une équipe de femmes qui fait le ménage à domicile sur la côte kabyle : au défilement, une raclette nettoie la vitre.
- **[Atelier Nacre](https://github.com/hoshuko/atelier-nacre/blob/main/README.fr.md)**: Le site d’un atelier de prothésiste ongulaire à Bordeaux : une pose démontée couche par couche, un essayage de couleur et la réservation en ligne.

Portfolio: <https://hoshuko.github.io/> · YouTube: <https://www.youtube.com/@Hosh-uko>
