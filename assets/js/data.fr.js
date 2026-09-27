/* ---------- Contenus en français : morceaux, préparations, vitrine ----------
   Les versions anglaise et espagnole (data.en.js, data.es.js) suivent la même structure. */
const LOCALE = 'fr-FR';
const PHONE = '04 65 71 19 87';
const CAT = {
  1: { label: 'Cuisson rapide', hint: 'griller, poêler, rôtir' },
  2: { label: 'À mijoter', hint: 'braiser plusieurs heures' },
  3: { label: 'À bouillir', hint: 'pot-au-feu, bouillon' }
};
const ZONES = {
  avant: "L'avant",
  dos: 'Le dos',
  ventre: 'Le ventre',
  cuisse: 'La cuisse'
};
const USAGES = [
  ['tout', 'Tout'],
  ['barbecue', 'Barbecue'],
  ['poele', 'À la poêle'],
  ['roti', 'Rôti'],
  ['mijote', 'Mijoté'],
  ['potaufeu', 'Pot-au-feu'],
  ['tartare', 'Tartare'],
  ['hache', 'Haché']
];

const CUTS = [
  { id: 'joue', name: 'Joue', aka: 'Joue de bœuf', zone: 'avant', cat: 2, img: 'joue',
    where: "Le muscle de la mâchoire. Il travaille toute la journée : riche en collagène, il devient fondant, presque confit, après une longue cuisson.",
    tendre: 1, persille: 2, gout: 5, cuissons: ['Braiser'], plats: ['Joue braisée au vin rouge', 'Daube', 'Parmentier de joue'],
    usages: ['mijote'], prix: 21.9, portion: [800, '≈ 800 g · 3 pers.'], temps: '3 h 30 à feu très doux',
    conseil: 'Faites-la cuire la veille : réchauffée, elle est encore meilleure.' },
  { id: 'collier', name: 'Collier', aka: 'Le cou', zone: 'avant', cat: 3, img: 'collier',
    where: "Le cou, juste derrière la tête. Un muscle qui travaille beaucoup, persillé et gélatineux : la base des bouillons qui ont du corps.",
    tendre: 1, persille: 3, gout: 4, cuissons: ['Bouillir', 'Braiser', 'Hacher'], plats: ['Pot-au-feu', 'Bourguignon', 'Steak haché'],
    usages: ['potaufeu', 'mijote', 'hache'], prix: 16.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: '3 h à frémissement',
    conseil: 'Mélangé à du paleron, il donne un haché juteux et plein de goût.' },
  { id: 'basses-cotes', name: 'Basses côtes', aka: 'Côtes découvertes', zone: 'avant', cat: 2, img: 'basses-cotes',
    where: "Le haut du dos, entre le collier et les côtes. Très persillé : c'est le cousin rustique de l'entrecôte.",
    tendre: 3, persille: 4, gout: 5, cuissons: ['Griller', 'Braiser', 'Bouillir'], plats: ['Grillade en tranche épaisse', 'Pot-au-feu', 'Bœuf braisé'],
    usages: ['barbecue', 'poele', 'potaufeu', 'mijote', 'hache'], prix: 24.9, portion: [400, 'tranche ≈ 400 g'], temps: 'Grillée : 3 min par face',
    conseil: "Demandez-la en tranche de 2 cm et marinez-la une heure : effet entrecôte à prix doux." },
  { id: 'paleron', name: 'Paleron', aka: "Le haut de l'épaule", zone: 'avant', cat: 2, img: 'paleron',
    where: "L'épaule, au-dessus de la macreuse. On le reconnaît à son nerf central, qui fond en gelée pendant la cuisson.",
    tendre: 2, persille: 3, gout: 5, cuissons: ['Braiser', 'Bouillir', 'Hacher'], plats: ['Bœuf bourguignon', 'Daube provençale', 'Pot-au-feu'],
    usages: ['mijote', 'potaufeu', 'hache'], prix: 19.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: '2 h 30 à 3 h',
    conseil: 'Gardez le nerf : c’est lui qui rend la sauce nappante.' },
  { id: 'macreuse', name: 'Macreuse', aka: 'Macreuse à bifteck ou à pot-au-feu', zone: 'avant', cat: 2, img: 'macreuse',
    where: "Le bas de l'épaule, sous le paleron. Une partie se grille (macreuse à bifteck), l'autre se mijote.",
    tendre: 3, persille: 2, gout: 3, cuissons: ['Poêler', 'Braiser', 'Bouillir'], plats: ['Bourguignon', 'Steak de macreuse', 'Pot-au-feu'],
    usages: ['mijote', 'potaufeu', 'poele'], prix: 19.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: 'Mijotée : 2 h 30',
    conseil: 'La macreuse à bifteck se tranche finement, contre les fibres.' },
  { id: 'jumeau', name: 'Jumeau', aka: 'Jumeau à bifteck ou à pot-au-feu', zone: 'avant', cat: 2, img: 'jumeau',
    where: "Entre l'épaule et la patte avant. Deux muscles côte à côte, d'où son nom.",
    tendre: 3, persille: 2, gout: 3, cuissons: ['Poêler', 'Bouillir', 'Braiser'], plats: ['Pot-au-feu', 'Pièce à griller', 'Brochettes'],
    usages: ['potaufeu', 'poele'], prix: 19.9, portion: [500, '≈ 500 g · 2 pers.'], temps: 'Poêlé : 2 min par face',
    conseil: 'Méconnu : tendre, maigre et moins cher qu’un rumsteck.' },
  { id: 'poitrine', name: 'Poitrine', aka: 'Gros bout de poitrine', zone: 'ventre', cat: 3, img: 'poitrine',
    where: "Le bas du poitrail, entre les pattes avant. Couches de gras et de maigre en alternance.",
    tendre: 1, persille: 4, gout: 4, cuissons: ['Bouillir', 'Braiser', 'Fumer'], plats: ['Pot-au-feu', 'Pastrami maison', 'Potée'],
    usages: ['potaufeu'], prix: 13.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: '3 h à frémissement',
    conseil: 'C’est la base du pastrami : saumurée dix jours, fumée, puis pochée.' },
  { id: 'gite-avant', name: 'Gîte avant', aka: 'Jarret avant, gîte-gîte', zone: 'avant', cat: 3, img: 'gite',
    where: "Le haut de la patte avant. Maigre, traversé de tendons qui deviennent gélatineux à la cuisson.",
    tendre: 1, persille: 1, gout: 4, cuissons: ['Bouillir', 'Braiser'], plats: ['Pot-au-feu', 'Bœuf carottes', 'Bouillon'],
    usages: ['potaufeu', 'mijote'], prix: 16.9, portion: [800, 'rouelle ≈ 800 g'], temps: '3 h 30',
    conseil: 'Prenez-le avec l’os à moelle : le bouillon sera deux fois plus riche.' },
  { id: 'cotes', name: 'Côte & entrecôte', aka: 'Côte de bœuf, train de côtes', zone: 'dos', cat: 1, img: 'cotes',
    where: "Le milieu du dos, sur les côtes. Avec l'os, c'est la côte de bœuf. Sans l'os, l'entrecôte.",
    tendre: 4, persille: 5, gout: 5, cuissons: ['Griller', 'Poêler', 'Rôtir'], plats: ['Côte de bœuf au barbecue', 'Entrecôte bordelaise'],
    usages: ['barbecue', 'poele', 'roti'], prix: 42.9, portion: [1100, 'côte ≈ 1,1 kg · 3 pers.'], temps: 'Côte de 1 kg : 4 min par face + 10 min de repos',
    conseil: 'Sortez-la du frigo une heure avant, salez juste avant de la saisir.' },
  { id: 'plat-de-cotes', name: 'Plat de côtes', aka: 'Short ribs', zone: 'ventre', cat: 3, img: 'plat-de-cotes',
    where: "Le bas des côtes, sous l'entrecôte. Os, gras et maigre en couches.",
    tendre: 1, persille: 4, gout: 5, cuissons: ['Bouillir', 'Braiser', 'Four doux'], plats: ['Pot-au-feu', 'Short ribs laqués', 'Potée'],
    usages: ['potaufeu', 'mijote'], prix: 13.9, portion: [1000, '≈ 1 kg · 3 pers.'], temps: '3 h, ou 8 h à 110 °C',
    conseil: 'Une nuit au four à basse température : la viande se détache de l’os à la fourchette.' },
  { id: 'hampe', name: 'Hampe', aka: 'Skirt steak', zone: 'ventre', cat: 1, img: 'hampe',
    where: "Le muscle du diaphragme, le long des côtes. Longues fibres, goût puissant.",
    tendre: 3, persille: 3, gout: 5, cuissons: ['Griller', 'Poêler'], plats: ['Hampe à l’échalote', 'Fajitas'],
    usages: ['barbecue', 'poele'], prix: 29.9, portion: [400, 'pièce ≈ 400 g'], temps: '2 min par face, saignante',
    conseil: 'Tranchez toujours perpendiculairement aux fibres.' },
  { id: 'onglet', name: 'Onglet', aka: 'Hanger steak', zone: 'ventre', cat: 1, img: 'onglet',
    where: "Deux petits muscles qui soutiennent le diaphragme. Un seul onglet par bête, environ un kilo.",
    tendre: 4, persille: 2, gout: 5, cuissons: ['Griller', 'Poêler'], plats: ['Onglet à l’échalote', 'Onglet frites'],
    usages: ['barbecue', 'poele'], prix: 36.9, portion: [350, 'pièce ≈ 350 g'], temps: 'Saisi 2 min par face',
    conseil: 'Retirez le nerf central, et ne dépassez jamais saignant.' },
  { id: 'faux-filet', name: 'Faux-filet', aka: 'Contre-filet', zone: 'dos', cat: 1, img: 'faux-filet',
    where: "Le long de la colonne, derrière les côtes. Une bordure de gras, une chair fine et serrée.",
    tendre: 4, persille: 3, gout: 4, cuissons: ['Griller', 'Poêler', 'Rôtir'], plats: ['Rôti de faux-filet', 'Steak au poivre'],
    usages: ['barbecue', 'poele', 'roti'], prix: 39.9, portion: [300, 'pavé ≈ 300 g'], temps: 'Rôti : 15 min par livre à 220 °C',
    conseil: 'Laissez la bordure de gras pendant la cuisson, retirez-la à l’assiette.' },
  { id: 'filet', name: 'Filet', aka: 'Tournedos, chateaubriand', zone: 'dos', cat: 1, img: 'filet',
    where: "Sous le faux-filet, contre la colonne. Le muscle qui travaille le moins : le plus tendre de la bête.",
    tendre: 5, persille: 1, gout: 3, cuissons: ['Poêler', 'Rôtir', 'Cru'], plats: ['Tournedos Rossini', 'Filet Wellington', 'Carpaccio'],
    usages: ['roti', 'poele', 'tartare'], prix: 69.9, portion: [360, '2 tournedos ≈ 360 g'], temps: 'Tournedos : 3 min par face',
    conseil: 'Une noix de beurre en fin de cuisson et un tour de poivre suffisent.' },
  { id: 'bavette', name: 'Bavette', aka: "Bavette d'aloyau", zone: 'ventre', cat: 1, img: 'bavette',
    where: "Le bas du ventre, sous le filet. Fibres longues et marquées, très juteuse.",
    tendre: 3, persille: 2, gout: 5, cuissons: ['Griller', 'Poêler'], plats: ['Bavette à l’échalote', 'Tagliata'],
    usages: ['barbecue', 'poele'], prix: 29.9, portion: [400, 'pièce ≈ 400 g'], temps: '2 à 3 min par face',
    conseil: 'Une poêle très chaude, et pas plus que saignant.' },
  { id: 'flanchet', name: 'Flanchet', aka: 'Bavette de flanchet', zone: 'ventre', cat: 3, img: 'flanchet',
    where: "Le bas du flanc, devant la cuisse. Fibreux et gras, parfait pour les cuissons longues.",
    tendre: 1, persille: 3, gout: 4, cuissons: ['Bouillir', 'Braiser', 'Hacher'], plats: ['Pot-au-feu', 'Phở', 'Haché'],
    usages: ['potaufeu', 'hache'], prix: 13.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: '3 h',
    conseil: 'Roulé et ficelé, il fait un pot-au-feu superbe à petit prix.' },
  { id: 'rumsteck', name: 'Rumsteck', aka: 'Cœur de rumsteck', zone: 'dos', cat: 1, img: 'rumsteck',
    where: "Le haut de la croupe, derrière le faux-filet. Maigre, tendre, très polyvalent.",
    tendre: 4, persille: 2, gout: 4, cuissons: ['Griller', 'Poêler', 'Rôtir', 'Cru'], plats: ['Pavé de rumsteck', 'Tartare', 'Fondue bourguignonne'],
    usages: ['barbecue', 'poele', 'roti', 'tartare'], prix: 32.9, portion: [360, '2 pavés ≈ 360 g'], temps: 'Pavé : 3 min par face',
    conseil: 'Pour un tartare, prenez-le entier et hachez-le au couteau chez vous.' },
  { id: 'aiguillette', name: 'Aiguillette baronne', aka: 'Pièce à rôtir', zone: 'cuisse', cat: 1, img: 'aiguillette',
    where: "Sous le rumsteck, en haut de la cuisse. Une pièce longue et tendre.",
    tendre: 4, persille: 2, gout: 4, cuissons: ['Rôtir', 'Griller', 'Poêler'], plats: ['Rôti', 'Brochettes', 'Pierrade'],
    usages: ['roti', 'barbecue'], prix: 28.9, portion: [1000, 'rôti ≈ 1 kg · 6 pers.'], temps: 'Rôti : 30 min à 200 °C',
    conseil: 'En rôti de 1 kg, elle nourrit six personnes pour moins cher qu’un filet.' },
  { id: 'tranche-grasse', name: 'Tranche grasse', aka: 'Plat de tranche', zone: 'cuisse', cat: 1, img: 'tranche-grasse',
    where: "L'avant de la cuisse, au-dessus du genou. Malgré son nom, elle est maigre.",
    tendre: 3, persille: 1, gout: 3, cuissons: ['Poêler', 'Griller', 'Rôtir'], plats: ['Steaks', 'Brochettes', 'Fondue'],
    usages: ['poele', 'barbecue', 'roti'], prix: 23.9, portion: [400, '2 steaks ≈ 400 g'], temps: '2 à 3 min par face',
    conseil: 'Marinée, elle fait des brochettes qui ne se dessèchent pas.' },
  { id: 'tende-de-tranche', name: 'Tende de tranche', aka: 'Poire, merlan', zone: 'cuisse', cat: 1, img: 'tende-de-tranche',
    where: "L'intérieur de la cuisse. Maigre et tendre ; la poire et le merlan en font partie.",
    tendre: 4, persille: 1, gout: 3, cuissons: ['Poêler', 'Rôtir', 'Cru'], plats: ['Rosbif', 'Carpaccio', 'Steaks'],
    usages: ['roti', 'poele', 'tartare'], prix: 27.9, portion: [800, 'rosbif ≈ 800 g'], temps: 'Rosbif : 12 min par livre à 220 °C',
    conseil: 'La poire et le merlan sont les morceaux du boucher : demandez-les, on vous les garde.' },
  { id: 'gite-noix', name: 'Gîte à la noix', aka: 'Rond de gîte', zone: 'cuisse', cat: 1, img: 'gite-noix',
    where: "L'arrière de la cuisse. Très maigre, fibres fines et serrées.",
    tendre: 2, persille: 1, gout: 3, cuissons: ['Rôtir', 'Braiser', 'Cru'], plats: ['Rôti', 'Viande séchée', 'Carpaccio'],
    usages: ['roti', 'tartare'], prix: 24.9, portion: [800, 'rôti ≈ 800 g'], temps: 'Rôti rosé : 25 min à 200 °C',
    conseil: 'Le rond de gîte se tranche très fin, en carpaccio ou en rosbif froid.' },
  { id: 'gite-arriere', name: 'Gîte arrière', aka: 'Jarret arrière', zone: 'cuisse', cat: 3, img: 'gite',
    where: "Le bas de la cuisse, au-dessus du jarret. Nerveux, gélatineux, plein de goût.",
    tendre: 1, persille: 1, gout: 4, cuissons: ['Bouillir', 'Braiser'], plats: ['Pot-au-feu', 'Osso-buco de bœuf', 'Bouillon'],
    usages: ['potaufeu', 'mijote'], prix: 17.9, portion: [800, 'rouelle ≈ 800 g'], temps: '3 h 30',
    conseil: 'Coupé en rouelles avec l’os, il fait un osso-buco de bœuf généreux.' },
  { id: 'queue', name: 'Queue', aka: 'Queue de bœuf', zone: 'cuisse', cat: 3, img: 'queue',
    where: "La queue, tronçonnée entre les vertèbres. Beaucoup d'os, une chair très gélatineuse.",
    tendre: 1, persille: 3, gout: 5, cuissons: ['Bouillir', 'Braiser'], plats: ['Pot-au-feu', 'Queue braisée', 'Hachis parmentier'],
    usages: ['potaufeu', 'mijote'], prix: 15.9, portion: [1000, '≈ 1 kg · 3 pers.'], temps: '4 h',
    conseil: 'Effilochée après cuisson, elle fait le meilleur parmentier qui soit.' }
];
CUTS.forEach((c, i) => { c.n = i + 1; });
const CUT = Object.fromEntries(CUTS.map(c => [c.id, c]));

const PREPS = [
  { id: 'merguez', tab: 'Merguez maison', title: "Anatomie d'une merguez.", mode: 'burst',
    lede: "Rien de caché dans nos saucisses. Voici exactement ce qu'on met dans une merguez Maison Billot.",
    badges: ['Boyau naturel de mouton · Ø 22 mm', 'Sans colorant ni conservateur', 'Piquante, sans excès'],
    prix: 16.9, priceNote: 'le kilo', cta: 'Ajouter 6 merguez', productId: 'p-merguez',
    product: { img: 'merguez', name: 'Merguez maison' },
    layers: [
      { name: 'Cumin & coriandre', pct: 1, img: 'cumin', note: 'Torréfiés et moulus' },
      { name: 'Ail frais', pct: 1.5, img: 'ail', note: 'Pilé le matin même' },
      { name: 'Sel de Guérande', pct: 1.5, img: null, note: '15 g par kilo' },
      { name: 'Paprika doux & fort', pct: 3, img: 'paprika', note: 'Pour la couleur, sans colorant' },
      { name: 'Harissa maison', pct: 5, img: 'harissa', note: 'Piments, ail, huile d’olive' },
      { name: 'Paleron de bœuf', pct: 38, img: 'paleron', note: 'Haché gros', cut: 'paleron' },
      { name: "Épaule d'agneau", pct: 50, img: 'agneau', note: 'Désossée ici' }
    ] },
  { id: 'potaufeu', tab: 'Kit pot-au-feu', title: 'Anatomie d’un pot-au-feu.', mode: 'pile',
    lede: "Quatre morceaux, trois kilos, une après-midi de patience : le kit qu'on vous prépare pour les dimanches d'hiver.",
    badges: ['Pour 6 personnes · ≈ 3 kg', 'Avec l’os à moelle', 'Ficelé, prêt à cuire'],
    prix: 49.9, priceNote: 'le kit · ≈ 3 kg', cta: 'Ajouter le kit', productId: 'p-kit-pot',
    layers: [
      { name: 'Plat de côtes', pct: 33, img: 'plat-de-cotes', note: '1 kg · le moelleux', cut: 'plat-de-cotes' },
      { name: 'Gîte à l’os', pct: 27, img: 'gite', note: '800 g · la moelle', cut: 'gite-arriere' },
      { name: 'Queue', pct: 20, img: 'queue', note: '600 g · le bouillon', cut: 'queue' },
      { name: 'Paleron', pct: 20, img: 'paleron', note: '600 g · le fondant', cut: 'paleron' }
    ] },
  { id: 'bourguignon', tab: 'Kit bourguignon', title: 'Anatomie d’un bourguignon.', mode: 'pile',
    lede: 'Trois morceaux qui ne se ressemblent pas : c’est ce mélange qui donne une sauce nappante.',
    badges: ['Pour 6 personnes · ≈ 2,5 kg', 'Coupé en cubes de 5 cm', 'Nerf du paleron conservé'],
    prix: 49.9, priceNote: 'le kit · ≈ 2,5 kg', cta: 'Ajouter le kit', productId: 'p-kit-bourguignon',
    layers: [
      { name: 'Paleron', pct: 40, img: 'paleron', note: '1 kg · le nerf qui fond', cut: 'paleron' },
      { name: 'Joue', pct: 32, img: 'joue', note: '800 g · le confit', cut: 'joue' },
      { name: 'Collier', pct: 28, img: 'collier', note: '700 g · le goût', cut: 'collier' }
    ] },
  { id: 'barbecue', tab: 'Plateau barbecue', title: 'Anatomie d’un barbecue.', mode: 'pile',
    lede: 'La côte pour épater, l’onglet pour les connaisseurs, les merguez pour tout le monde.',
    badges: ['Pour 6 personnes · ≈ 2,9 kg', 'Côte maturée 30 jours', 'Merguez du matin'],
    prix: 109.9, priceNote: 'le plateau · ≈ 2,9 kg', cta: 'Ajouter le plateau', productId: 'p-kit-bbq',
    layers: [
      { name: 'Côte de bœuf maturée', pct: 42, img: 'cotes', note: '1,2 kg · à partager', cut: 'cotes' },
      { name: 'Basses côtes', pct: 28, img: 'basses-cotes', note: '800 g · marinées', cut: 'basses-cotes' },
      { name: 'Merguez maison', pct: 18, img: 'merguez', note: '6 pièces · 500 g' },
      { name: 'Onglet', pct: 12, img: 'onglet', note: '350 g · saignant', cut: 'onglet' }
    ] }
];

const PRODUCTS = [
  { id: 'p-cote', name: 'Côte de bœuf maturée', img: 'cotes', tag: 'griller', origin: 'Salers · 30 jours', desc: 'Sur l’os, persillée, pour trois.', prix: 57.9, unit: [1200, 'pièce ≈ 1,2 kg'], cut: 'cotes' },
  { id: 'p-entrecote', name: 'Entrecôte', img: 'basses-cotes', tag: 'griller', origin: 'Aubrac · 21 jours', desc: 'Très persillée, taillée épaisse.', prix: 42.9, unit: [350, 'tranche ≈ 350 g'], cut: 'cotes' },
  { id: 'p-filet', name: 'Filet', img: 'filet', tag: 'griller', origin: 'Charolaise', desc: 'Au tournedos ou en rôti entier.', prix: 69.9, unit: [360, '2 tournedos ≈ 360 g'], cut: 'filet' },
  { id: 'p-fauxfilet', name: 'Faux-filet', img: 'faux-filet', tag: 'griller', origin: 'Salers · 21 jours', desc: 'Avec sa bordure de gras.', prix: 39.9, unit: [300, 'pavé ≈ 300 g'], cut: 'faux-filet' },
  { id: 'p-onglet', name: 'Onglet', img: 'onglet', tag: 'griller', origin: 'Limousine', desc: 'Un par bête, dénervé.', prix: 36.9, unit: [350, 'pièce ≈ 350 g'], cut: 'onglet' },
  { id: 'p-bavette', name: "Bavette d'aloyau", img: 'bavette', tag: 'griller', origin: 'Charolaise', desc: 'Fibres longues, très juteuse.', prix: 29.9, unit: [400, 'pièce ≈ 400 g'], cut: 'bavette' },
  { id: 'p-paleron', name: 'Paleron à bourguignon', img: 'paleron', tag: 'mijoter', origin: 'Salers', desc: 'Coupé en cubes, nerf compris.', prix: 19.9, unit: [1000, 'barquette 1 kg'], cut: 'paleron' },
  { id: 'p-joue', name: 'Joue de bœuf', img: 'joue', tag: 'mijoter', origin: 'Aubrac', desc: 'Parée, prête à braiser.', prix: 21.9, unit: [800, '≈ 800 g'], cut: 'joue' },
  { id: 'p-plat', name: 'Plat de côtes', img: 'plat-de-cotes', tag: 'mijoter', origin: 'Salers', desc: 'Pour le pot-au-feu ou le four doux.', prix: 13.9, unit: [1000, '≈ 1 kg'], cut: 'plat-de-cotes' },
  { id: 'p-jarret', name: 'Jarret à osso-buco', img: 'gite', tag: 'mijoter', origin: 'Charolaise', desc: 'Rouelles avec l’os à moelle.', prix: 17.9, unit: [800, '2 rouelles ≈ 800 g'], cut: 'gite-arriere' },
  { id: 'p-queue', name: 'Queue de bœuf', img: 'queue', tag: 'mijoter', origin: 'Salers', desc: 'Tronçonnée entre les vertèbres.', prix: 15.9, unit: [1000, '≈ 1 kg'], cut: 'queue' },
  { id: 'p-merguez', name: 'Merguez maison', img: 'merguez', tag: 'maison', origin: 'Agneau & bœuf', desc: 'Harissa maison, boyau naturel.', prix: 16.9, unit: [500, '6 merguez ≈ 500 g'], cut: null },
  { id: 'p-kit-pot', name: 'Kit pot-au-feu', img: 'plat-de-cotes', tag: 'maison', origin: 'Pour 6 · ≈ 3 kg', desc: 'Plat de côtes, gîte à l\u2019os, queue, paleron.', prix: 49.9, kit: true, unit: [3000, 'kit ≈ 3 kg'], cut: null },
  { id: 'p-kit-bourguignon', name: 'Kit bourguignon', img: 'joue', tag: 'maison', origin: 'Pour 6 · ≈ 2,5 kg', desc: 'Paleron, joue et collier en cubes.', prix: 49.9, kit: true, unit: [2500, 'kit ≈ 2,5 kg'], cut: null },
  { id: 'p-kit-bbq', name: 'Plateau barbecue', img: 'cotes', tag: 'maison', origin: 'Pour 6 · ≈ 2,9 kg', desc: 'Côte maturée, basses côtes, onglet, merguez.', prix: 109.9, kit: true, unit: [2850, 'plateau ≈ 2,9 kg'], cut: null }
];
const PRODUCT = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const VIT_FILTERS = [['tout', 'Tout'], ['griller', 'À griller'], ['mijoter', 'À mijoter'], ['maison', 'Fait maison']];
const PRESETS = [
  { id: 'bbq', name: 'Barbecue entre amis', note: '6 pers.', items: { 'p-cote': 1, 'p-onglet': 1, 'p-merguez': 2 } },
  { id: 'dimanche', name: 'Dimanche en famille', note: '4 pers.', items: { 'p-filet': 1, 'p-fauxfilet': 2, 'p-plat': 1 } },
  { id: 'mijotes', name: 'Semaine de mijotés', note: '4 pers.', items: { 'p-paleron': 1, 'p-joue': 1, 'p-queue': 1 } }
];

const HOURS = [ // 0 = dimanche
  [[8 * 60, 12 * 60 + 30]],
  [],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[7 * 60 + 30, 19 * 60]]
];
const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const CREDITS = [
  ['La vache Salers', 'B.navez', 'Wikimedia Commons, CC BY-SA 3.0, détourée'],
  ['Bavette', 'Bortz60', 'Wikimedia Commons, CC BY-SA 3.0, détourée'],
  ['Queue', 'FotoosVanRobin', 'Wikimedia Commons, CC BY-SA 2.0, détourée'],
  ['Merguez', 'Stanislaus der Lausige', 'Wikimedia Commons, CC BY-SA 4.0, détourée'],
  ['Harissa', 'Miansari66', 'Wikimedia Commons, CC0'],
  ['Côte, faux-filet, filet, rumsteck, entrecôte, plat de côtes, poitrine, jarret, paleron, hampe, onglet, flanchet, collier, macreuse, jumeau, tende de tranche, gîte à la noix, aiguillette, joue, agneau, épices',
    'Alexander Van Steenberge, Eiliv Aceron, David Foodphototasty, Sergey Kotenev, Kelsey Todd, Anastasia Malysh, hyun-su Jung, Jakob Trost, Studio Crevettes, Sally Cox, Wesual Click, Marcos Paulo Prado, Skyler Ewing, Paras Kapoor, Olivier Amyot, Kyle Mackie, Manjunath Kammar, Katrina Wright, Mockup Graphics',
    'Unsplash, licence Unsplash, détourées']
];

const AGE_NOTES = [ // jours, note, tendreté, goût
  [0, 'Viande fraîche : goût franc, légèrement métallique, texture ferme.', 'Ferme', 'Franc'],
  [7, 'Les enzymes se mettent au travail : la viande s’attendrit.', 'Tendre', 'Rond'],
  [21, 'Notre point d’équilibre : juteuse, tendre, notes de beurre noisette.', 'Très tendre', 'Noisette'],
  [35, 'Noisette grillée, champignon, sous-bois. Pour les amateurs.', 'Très tendre', 'Profond'],
  [50, 'Goût intense, presque fromager, façon parmesan affiné.', 'Fondante', 'Affiné']
];

/* Textes de l'interface */
const UI = {
  money: n => `${n}\u00a0€`,
  pct: n => `${n}\u00a0%`,
  time: (h, m) => `${h}\u00a0h${m ? '\u00a0' + String(m).padStart(2, '0') : ''}`,
  perKilo: 'le kilo', perKit: 'le kit', perKiloCaps: 'LE KILO', perKitCaps: 'LE KIT',
  add: 'Ajouter', addNamed: n => `Ajouter ${n}`, removeNamed: n => `Retirer ${n}`,
  openCut: n => `${n} : voir la fiche`,
  noMatch: 'Aucun morceau ne correspond. Essayez un autre nom.',
  count: n => `${n} morceau${n > 1 ? 'x' : ''}`,
  countFor: (n, l) => `${n} morceau${n > 1 ? 'x' : ''} pour « ${l} »`,
  layerCut: n => `${n} : voir le morceau sur la bête`,
  seeOnAnimal: 'voir sur la bête',
  showOnAnimal: 'Voir le morceau sur la bête',
  day: d => `J+${d}`,
  cardEnd: '<p>Tout est découpé à la demande. Une pièce qui n’est pas en vitrine&nbsp;? Demandez-la.</p><a class="btn btn-red" href="#guide">Parcourir les 23 morceaux</a>',
  addedTo: n => `Ajouté au colis : ${n}`,
  pieces: n => `${n} pièces`,
  presetAdded: n => `Colis « ${n} » ajouté`,
  today: 'Aujourd’hui', tomorrow: 'Demain',
  recap: (slot, lines, total) => `Maison Billot · Réservation\nRetrait : ${slot}\n${lines}\nTotal estimé : ${total} (au poids réel en boutique)\nNom : \nTéléphone : `,
  selected: 'Texte sélectionné, copiez-le', copiedRecap: 'Récapitulatif copié', copiedPhone: 'Numéro copié',
  seeOrder: 'Voir le colis',
  outOf5: n => `${n} sur 5`,
  no: 'N°', rawPhoto: n => `${n}, photo du morceau cru`, location: 'Emplacement sur la bête',
  where: 'Où c’est&nbsp;?', tender: 'Tendreté', marbling: 'Persillé', taste: 'Goût', cooking: 'Cuissons', dishes: 'On en fait quoi&nbsp;?',
  quote: s => `«\u00a0${s}\u00a0»`, tip: 'Le conseil du boucher', perKiloIndicative: 'le kilo · prix indicatif', addToOrder: 'Ajouter au colis',
  closed: 'Fermé', openUntil: t => `Ouvert · ferme à ${t}`, opens: l => `Fermé · ouvre ${l}`,
  nextOpen: (k, day, t) => `${k === 0 ? 'aujourd’hui' : k === 1 ? 'demain' : day.toLowerCase()} à ${t}`,
  credit: (w, a, l) => `<b>${w}</b> : ${a} (${l})`
};
