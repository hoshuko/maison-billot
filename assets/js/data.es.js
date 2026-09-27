/* ---------- Contenido en español: piezas, elaboraciones, mostrador ----------
   Misma estructura que data.fr.js y data.en.js. */
const LOCALE = 'es-ES';
const PHONE = '04 65 71 19 87';
const CAT = {
  1: { label: 'Cocción rápida', hint: 'parrilla, plancha, horno' },
  2: { label: 'Para guisar', hint: 'guisar durante horas' },
  3: { label: 'Para cocer', hint: 'cocido, caldo' }
};
const ZONES = {
  avant: 'Parte delantera',
  dos: 'Lomo',
  ventre: 'Vientre',
  cuisse: 'Pierna'
};
const USAGES = [
  ['tout', 'Todo'],
  ['barbecue', 'Barbacoa'],
  ['poele', 'A la plancha'],
  ['roti', 'Asado'],
  ['mijote', 'Guisado'],
  ['potaufeu', 'Cocido'],
  ['tartare', 'Tartar'],
  ['hache', 'Picada']
];

const CUTS = [
  { id: 'joue', name: 'Carrillera', aka: 'Joue de bœuf', zone: 'avant', cat: 2, img: 'joue',
    where: 'El músculo de la mandíbula. Trabaja todo el día: es rico en colágeno y queda meloso, casi confitado, tras una cocción larga.',
    tendre: 1, persille: 2, gout: 5, cuissons: ['Guisar'], plats: ['Carrillera al vino tinto', 'Estofado provenzal', 'Pastel de carrillera'],
    usages: ['mijote'], prix: 21.9, portion: [800, '≈ 800 g · 3 pers.'], temps: '3 h 30 a fuego muy suave',
    conseil: 'Cocínala la víspera: recalentada, está todavía mejor.' },
  { id: 'collier', name: 'Pescuezo', aka: 'Collier · cuello', zone: 'avant', cat: 3, img: 'collier',
    where: 'El cuello, justo detrás de la cabeza. Un músculo que trabaja mucho, veteado y gelatinoso: la base de los caldos con cuerpo.',
    tendre: 1, persille: 3, gout: 4, cuissons: ['Cocer', 'Guisar', 'Picar'], plats: ['Pot-au-feu', 'Bourguignon', 'Hamburguesas'],
    usages: ['potaufeu', 'mijote', 'hache'], prix: 16.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: '3 h a fuego lento',
    conseil: 'Mezclado con espaldilla, da una carne picada jugosa y llena de sabor.' },
  { id: 'basses-cotes', name: 'Aguja', aka: 'Basses côtes', zone: 'avant', cat: 2, img: 'basses-cotes',
    where: 'La parte alta del lomo, entre el pescuezo y las costillas. Muy veteada: la prima rústica del entrecot.',
    tendre: 3, persille: 4, gout: 5, cuissons: ['A la parrilla', 'Guisar', 'Cocer'], plats: ['Filete grueso a la brasa', 'Pot-au-feu', 'Carne guisada'],
    usages: ['barbecue', 'poele', 'potaufeu', 'mijote', 'hache'], prix: 24.9, portion: [400, 'filete ≈ 400 g'], temps: 'A la parrilla: 3 min por lado',
    conseil: 'Pídela en filetes de 2 cm y marínala una hora: efecto entrecot a un precio más amable.' },
  { id: 'paleron', name: 'Espaldilla', aka: 'Paleron', zone: 'avant', cat: 2, img: 'paleron',
    where: 'La paletilla, por encima de la llana. Se reconoce por su nervio central, que se funde en gelatina durante la cocción.',
    tendre: 2, persille: 3, gout: 5, cuissons: ['Guisar', 'Cocer', 'Picar'], plats: ['Bourguignon', 'Estofado provenzal', 'Pot-au-feu'],
    usages: ['mijote', 'potaufeu', 'hache'], prix: 19.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: '2 h 30 a 3 h',
    conseil: 'No le quites el nervio: es lo que liga la salsa.' },
  { id: 'macreuse', name: 'Llana', aka: 'Macreuse', zone: 'avant', cat: 2, img: 'macreuse',
    where: 'La parte baja de la paletilla, bajo la espaldilla. Una parte se hace a la plancha y la otra se guisa.',
    tendre: 3, persille: 2, gout: 3, cuissons: ['A la plancha', 'Guisar', 'Cocer'], plats: ['Bourguignon', 'Filete de llana', 'Pot-au-feu'],
    usages: ['mijote', 'potaufeu', 'poele'], prix: 19.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: 'Guisada: 2 h 30',
    conseil: 'La parte para filetes se corta fina, a contrafibra.' },
  { id: 'jumeau', name: 'Pez', aka: 'Jumeau', zone: 'avant', cat: 2, img: 'jumeau',
    where: 'Entre la paletilla y la pata delantera. Dos músculos juntos: de ahí su nombre francés, «gemelo».',
    tendre: 3, persille: 2, gout: 3, cuissons: ['A la plancha', 'Cocer', 'Guisar'], plats: ['Pot-au-feu', 'Pieza a la parrilla', 'Brochetas'],
    usages: ['potaufeu', 'poele'], prix: 19.9, portion: [500, '≈ 500 g · 2 pers.'], temps: 'A la plancha: 2 min por lado',
    conseil: 'Poco conocido: tierno, magro y más barato que la cadera.' },
  { id: 'poitrine', name: 'Pecho', aka: 'Poitrine', zone: 'ventre', cat: 3, img: 'poitrine',
    where: 'La parte baja del pecho, entre las patas delanteras. Capas alternas de grasa y magro.',
    tendre: 1, persille: 4, gout: 4, cuissons: ['Cocer', 'Guisar', 'Ahumar'], plats: ['Pot-au-feu', 'Pastrami casero', 'Potaje'],
    usages: ['potaufeu'], prix: 13.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: '3 h a fuego lento',
    conseil: 'Es la base del pastrami: diez días en salmuera, ahumado y después cocido.' },
  { id: 'gite-avant', name: 'Morcillo delantero', aka: 'Gîte avant · zancarrón', zone: 'avant', cat: 3, img: 'gite',
    where: 'La parte alta de la pata delantera. Magro, atravesado por tendones que se vuelven gelatinosos al cocinarse.',
    tendre: 1, persille: 1, gout: 4, cuissons: ['Cocer', 'Guisar'], plats: ['Pot-au-feu', 'Ternera con zanahorias', 'Caldo'],
    usages: ['potaufeu', 'mijote'], prix: 16.9, portion: [800, 'rodaja ≈ 800 g'], temps: '3 h 30',
    conseil: 'Llévatelo con el hueso de caña: el caldo saldrá el doble de rico.' },
  { id: 'cotes', name: 'Chuletón y entrecot', aka: 'Côte de bœuf, lomo alto', zone: 'dos', cat: 1, img: 'cotes',
    where: 'La mitad del lomo, sobre las costillas. Con hueso es el chuletón; sin hueso, el entrecot.',
    tendre: 4, persille: 5, gout: 5, cuissons: ['A la parrilla', 'A la plancha', 'Asar'], plats: ['Chuletón a la brasa', 'Entrecot a la bordelesa'],
    usages: ['barbecue', 'poele', 'roti'], prix: 42.9, portion: [1100, 'chuletón ≈ 1,1 kg · 3 pers.'], temps: 'Chuletón de 1 kg: 4 min por lado + 10 min de reposo',
    conseil: 'Sácalo de la nevera una hora antes y sálalo justo antes de marcarlo.' },
  { id: 'plat-de-cotes', name: 'Costillar', aka: 'Plat de côtes', zone: 'ventre', cat: 3, img: 'plat-de-cotes',
    where: 'La parte baja de las costillas, bajo el entrecot. Hueso, grasa y magro por capas.',
    tendre: 1, persille: 4, gout: 5, cuissons: ['Cocer', 'Guisar', 'Horno suave'], plats: ['Pot-au-feu', 'Costillas glaseadas', 'Potaje'],
    usages: ['potaufeu', 'mijote'], prix: 13.9, portion: [1000, '≈ 1 kg · 3 pers.'], temps: '3 h, u 8 h a 110 °C',
    conseil: 'Una noche en el horno a baja temperatura y la carne se separa del hueso con el tenedor.' },
  { id: 'hampe', name: 'Entraña', aka: 'Hampe', zone: 'ventre', cat: 1, img: 'hampe',
    where: 'El músculo del diafragma, a lo largo de las costillas. Fibras largas y un sabor potente.',
    tendre: 3, persille: 3, gout: 5, cuissons: ['A la parrilla', 'A la plancha'], plats: ['Entraña con chalota', 'Fajitas'],
    usages: ['barbecue', 'poele'], prix: 29.9, portion: [400, 'pieza ≈ 400 g'], temps: '2 min por lado, poco hecha',
    conseil: 'Córtala siempre en perpendicular a las fibras.' },
  { id: 'onglet', name: 'Onglet', aka: 'Entraña gruesa', zone: 'ventre', cat: 1, img: 'onglet',
    where: 'Dos pequeños músculos que sostienen el diafragma. Solo hay uno por animal, de alrededor de un kilo.',
    tendre: 4, persille: 2, gout: 5, cuissons: ['A la parrilla', 'A la plancha'], plats: ['Onglet con chalota', 'Onglet con patatas fritas'],
    usages: ['barbecue', 'poele'], prix: 36.9, portion: [350, 'pieza ≈ 350 g'], temps: 'Marcado 2 min por lado',
    conseil: 'Quítale el nervio central y no lo pases nunca de poco hecho.' },
  { id: 'faux-filet', name: 'Lomo bajo', aka: 'Faux-filet · contre-filet', zone: 'dos', cat: 1, img: 'faux-filet',
    where: 'A lo largo de la columna, detrás de las costillas. Un borde de grasa y una carne fina y prieta.',
    tendre: 4, persille: 3, gout: 4, cuissons: ['A la parrilla', 'A la plancha', 'Asar'], plats: ['Lomo bajo asado', 'Filete a la pimienta'],
    usages: ['barbecue', 'poele', 'roti'], prix: 39.9, portion: [300, 'filete ≈ 300 g'], temps: 'Asado: 15 min por cada 500 g a 220 °C',
    conseil: 'Deja el borde de grasa durante la cocción y quítalo ya en el plato.' },
  { id: 'filet', name: 'Solomillo', aka: 'Filet · tournedó, chateaubriand', zone: 'dos', cat: 1, img: 'filet',
    where: 'Bajo el lomo bajo, pegado a la columna. El músculo que menos trabaja: la pieza más tierna del animal.',
    tendre: 5, persille: 1, gout: 3, cuissons: ['A la plancha', 'Asar', 'Crudo'], plats: ['Tournedó Rossini', 'Solomillo Wellington', 'Carpaccio'],
    usages: ['roti', 'poele', 'tartare'], prix: 69.9, portion: [360, '2 tournedós ≈ 360 g'], temps: 'Tournedó: 3 min por lado',
    conseil: 'Una nuez de mantequilla al final y un toque de pimienta: no necesita más.' },
  { id: 'bavette', name: 'Vacío', aka: 'Bavette d’aloyau', zone: 'ventre', cat: 1, img: 'bavette',
    where: 'La parte baja del vientre, bajo el solomillo. Fibras largas y marcadas, muy jugoso.',
    tendre: 3, persille: 2, gout: 5, cuissons: ['A la parrilla', 'A la plancha'], plats: ['Vacío con chalota', 'Tagliata'],
    usages: ['barbecue', 'poele'], prix: 29.9, portion: [400, 'pieza ≈ 400 g'], temps: '2 a 3 min por lado',
    conseil: 'Sartén muy caliente, y nunca más que poco hecho.' },
  { id: 'flanchet', name: 'Falda', aka: 'Flanchet', zone: 'ventre', cat: 3, img: 'flanchet',
    where: 'La parte baja del costado, delante de la pierna. Fibrosa y grasa, perfecta para cocciones largas.',
    tendre: 1, persille: 3, gout: 4, cuissons: ['Cocer', 'Guisar', 'Picar'], plats: ['Pot-au-feu', 'Phở', 'Carne picada'],
    usages: ['potaufeu', 'hache'], prix: 13.9, portion: [1000, '≈ 1 kg · 4 pers.'], temps: '3 h',
    conseil: 'Enrollada y atada, da un pot-au-feu estupendo a buen precio.' },
  { id: 'rumsteck', name: 'Cadera', aka: 'Rumsteck', zone: 'dos', cat: 1, img: 'rumsteck',
    where: 'La parte alta de la grupa, detrás del lomo bajo. Magra, tierna y muy versátil.',
    tendre: 4, persille: 2, gout: 4, cuissons: ['A la parrilla', 'A la plancha', 'Asar', 'Crudo'], plats: ['Filete de cadera', 'Steak tartar', 'Fondue borgoñona'],
    usages: ['barbecue', 'poele', 'roti', 'tartare'], prix: 32.9, portion: [360, '2 filetes ≈ 360 g'], temps: 'Filete: 3 min por lado',
    conseil: 'Para un tartar, llévatela entera y pícala a cuchillo en casa.' },
  { id: 'aiguillette', name: 'Rabillo de cadera', aka: 'Aiguillette baronne', zone: 'cuisse', cat: 1, img: 'aiguillette',
    where: 'Bajo la cadera, en lo alto de la pierna. Una pieza alargada y tierna.',
    tendre: 4, persille: 2, gout: 4, cuissons: ['Asar', 'A la parrilla', 'A la plancha'], plats: ['Asado', 'Brochetas', 'A la piedra'],
    usages: ['roti', 'barbecue'], prix: 28.9, portion: [1000, 'asado ≈ 1 kg · 6 pers.'], temps: 'Asado: 30 min a 200 °C',
    conseil: 'Asado en una pieza de 1 kg, da de comer a seis por menos que un solomillo.' },
  { id: 'tranche-grasse', name: 'Babilla', aka: 'Tranche grasse', zone: 'cuisse', cat: 1, img: 'tranche-grasse',
    where: 'La parte delantera de la pierna, sobre la rodilla. Pese a su nombre francés, «loncha grasa», es magra.',
    tendre: 3, persille: 1, gout: 3, cuissons: ['A la plancha', 'A la parrilla', 'Asar'], plats: ['Filetes', 'Brochetas', 'Fondue'],
    usages: ['poele', 'barbecue', 'roti'], prix: 23.9, portion: [400, '2 filetes ≈ 400 g'], temps: '2 a 3 min por lado',
    conseil: 'Marinada, da unas brochetas que no se resecan.' },
  { id: 'tende-de-tranche', name: 'Tapa', aka: 'Tende de tranche', zone: 'cuisse', cat: 1, img: 'tende-de-tranche',
    where: 'La cara interna de la pierna. Magra y tierna; la «poire» y el «merlan» forman parte de ella.',
    tendre: 4, persille: 1, gout: 3, cuissons: ['A la plancha', 'Asar', 'Crudo'], plats: ['Rosbif', 'Carpaccio', 'Filetes'],
    usages: ['roti', 'poele', 'tartare'], prix: 27.9, portion: [800, 'rosbif ≈ 800 g'], temps: 'Rosbif: 12 min por cada 500 g a 220 °C',
    conseil: 'La «poire» y el «merlan» son las piezas del carnicero: pídelas y te las guardamos.' },
  { id: 'gite-noix', name: 'Contra', aka: 'Gîte à la noix · redondo', zone: 'cuisse', cat: 1, img: 'gite-noix',
    where: 'La parte trasera de la pierna. Muy magra, de fibras finas y prietas.',
    tendre: 2, persille: 1, gout: 3, cuissons: ['Asar', 'Guisar', 'Crudo'], plats: ['Asado', 'Cecina', 'Carpaccio'],
    usages: ['roti', 'tartare'], prix: 24.9, portion: [800, 'asado ≈ 800 g'], temps: 'Asado al punto: 25 min a 200 °C',
    conseil: 'El redondo se corta muy fino, en carpaccio o en rosbif frío.' },
  { id: 'gite-arriere', name: 'Morcillo trasero', aka: 'Gîte arrière · jarrete', zone: 'cuisse', cat: 3, img: 'gite',
    where: 'La parte baja de la pierna, sobre el jarrete. Nervioso, gelatinoso y lleno de sabor.',
    tendre: 1, persille: 1, gout: 4, cuissons: ['Cocer', 'Guisar'], plats: ['Pot-au-feu', 'Ossobuco de ternera', 'Caldo'],
    usages: ['potaufeu', 'mijote'], prix: 17.9, portion: [800, 'rodaja ≈ 800 g'], temps: '3 h 30',
    conseil: 'Cortado en rodajas con el hueso, da un ossobuco generoso.' },
  { id: 'queue', name: 'Rabo', aka: 'Queue de bœuf', zone: 'cuisse', cat: 3, img: 'queue',
    where: 'El rabo, troceado entre las vértebras. Mucho hueso y una carne muy gelatinosa.',
    tendre: 1, persille: 3, gout: 5, cuissons: ['Cocer', 'Guisar'], plats: ['Pot-au-feu', 'Rabo estofado', 'Pastel de carne'],
    usages: ['potaufeu', 'mijote'], prix: 15.9, portion: [1000, '≈ 1 kg · 3 pers.'], temps: '4 h',
    conseil: 'Deshilachado después de la cocción, da el mejor pastel de carne que existe.' }
];
CUTS.forEach((c, i) => { c.n = i + 1; });
const CUT = Object.fromEntries(CUTS.map(c => [c.id, c]));

const PREPS = [
  { id: 'merguez', tab: 'Merguez de la casa', title: 'Anatomía de una merguez.', mode: 'burst',
    lede: 'Nada oculto en nuestras salchichas. Esto es exactamente lo que lleva una merguez Maison Billot.',
    badges: ['Tripa natural de cordero · Ø 22 mm', 'Sin colorantes ni conservantes', 'Picante, sin pasarse'],
    prix: 16.9, priceNote: 'el kilo', cta: 'Añadir 6 merguez', productId: 'p-merguez',
    product: { img: 'merguez', name: 'Merguez de la casa' },
    layers: [
      { name: 'Comino y cilantro', pct: 1, img: 'cumin', note: 'Tostados y molidos' },
      { name: 'Ajo fresco', pct: 1.5, img: 'ail', note: 'Majado esa misma mañana' },
      { name: 'Sal de Guérande', pct: 1.5, img: null, note: '15 g por kilo' },
      { name: 'Pimentón dulce y picante', pct: 3, img: 'paprika', note: 'Para el color, sin colorantes' },
      { name: 'Harissa casera', pct: 5, img: 'harissa', note: 'Guindillas, ajo, aceite de oliva' },
      { name: 'Espaldilla de vacuno', pct: 38, img: 'paleron', note: 'Picada gruesa', cut: 'paleron' },
      { name: 'Paletilla de cordero', pct: 50, img: 'agneau', note: 'Deshuesada aquí' }
    ] },
  { id: 'potaufeu', tab: 'Kit pot-au-feu', title: 'Anatomía de un pot-au-feu.', mode: 'pile',
    lede: 'Cuatro piezas, tres kilos y una tarde de paciencia: el kit que te preparamos para los domingos de invierno.',
    badges: ['Para 6 personas · ≈ 3 kg', 'Con hueso de caña', 'Atado, listo para cocinar'],
    prix: 49.9, priceNote: 'el kit · ≈ 3 kg', cta: 'Añadir el kit', productId: 'p-kit-pot',
    layers: [
      { name: 'Costillar', pct: 33, img: 'plat-de-cotes', note: '1 kg · lo meloso', cut: 'plat-de-cotes' },
      { name: 'Morcillo con hueso', pct: 27, img: 'gite', note: '800 g · el tuétano', cut: 'gite-arriere' },
      { name: 'Rabo', pct: 20, img: 'queue', note: '600 g · el caldo', cut: 'queue' },
      { name: 'Espaldilla', pct: 20, img: 'paleron', note: '600 g · lo tierno', cut: 'paleron' }
    ] },
  { id: 'bourguignon', tab: 'Kit bourguignon', title: 'Anatomía de un bourguignon.', mode: 'pile',
    lede: 'Tres piezas que no se parecen en nada: esa mezcla es lo que da una salsa untuosa.',
    badges: ['Para 6 personas · ≈ 2,5 kg', 'En dados de 5 cm', 'Con el nervio de la espaldilla'],
    prix: 49.9, priceNote: 'el kit · ≈ 2,5 kg', cta: 'Añadir el kit', productId: 'p-kit-bourguignon',
    layers: [
      { name: 'Espaldilla', pct: 40, img: 'paleron', note: '1 kg · el nervio que se funde', cut: 'paleron' },
      { name: 'Carrillera', pct: 32, img: 'joue', note: '800 g · lo confitado', cut: 'joue' },
      { name: 'Pescuezo', pct: 28, img: 'collier', note: '700 g · el sabor', cut: 'collier' }
    ] },
  { id: 'barbecue', tab: 'Bandeja barbacoa', title: 'Anatomía de una barbacoa.', mode: 'pile',
    lede: 'El chuletón para impresionar, el onglet para los entendidos y las merguez para todos.',
    badges: ['Para 6 personas · ≈ 2,9 kg', 'Chuletón madurado 30 días', 'Merguez de esta mañana'],
    prix: 109.9, priceNote: 'la bandeja · ≈ 2,9 kg', cta: 'Añadir la bandeja', productId: 'p-kit-bbq',
    layers: [
      { name: 'Chuletón madurado', pct: 42, img: 'cotes', note: '1,2 kg · para compartir', cut: 'cotes' },
      { name: 'Aguja', pct: 28, img: 'basses-cotes', note: '800 g · marinada', cut: 'basses-cotes' },
      { name: 'Merguez de la casa', pct: 18, img: 'merguez', note: '6 piezas · 500 g' },
      { name: 'Onglet', pct: 12, img: 'onglet', note: '350 g · poco hecho', cut: 'onglet' }
    ] }
];

const PRODUCTS = [
  { id: 'p-cote', name: 'Chuletón madurado', img: 'cotes', tag: 'griller', origin: 'Salers · 30 días', desc: 'Con hueso, veteado, para tres.', prix: 57.9, unit: [1200, 'pieza ≈ 1,2 kg'], cut: 'cotes' },
  { id: 'p-entrecote', name: 'Entrecot', img: 'basses-cotes', tag: 'griller', origin: 'Aubrac · 21 días', desc: 'Muy veteado, cortado grueso.', prix: 42.9, unit: [350, 'filete ≈ 350 g'], cut: 'cotes' },
  { id: 'p-filet', name: 'Solomillo', img: 'filet', tag: 'griller', origin: 'Charolesa', desc: 'En tournedós o asado entero.', prix: 69.9, unit: [360, '2 tournedós ≈ 360 g'], cut: 'filet' },
  { id: 'p-fauxfilet', name: 'Lomo bajo', img: 'faux-filet', tag: 'griller', origin: 'Salers · 21 días', desc: 'Con su borde de grasa.', prix: 39.9, unit: [300, 'filete ≈ 300 g'], cut: 'faux-filet' },
  { id: 'p-onglet', name: 'Onglet', img: 'onglet', tag: 'griller', origin: 'Limusina', desc: 'Uno por animal, sin nervio.', prix: 36.9, unit: [350, 'pieza ≈ 350 g'], cut: 'onglet' },
  { id: 'p-bavette', name: 'Vacío', img: 'bavette', tag: 'griller', origin: 'Charolesa', desc: 'Fibras largas, muy jugoso.', prix: 29.9, unit: [400, 'pieza ≈ 400 g'], cut: 'bavette' },
  { id: 'p-paleron', name: 'Espaldilla para bourguignon', img: 'paleron', tag: 'mijoter', origin: 'Salers', desc: 'En dados, con su nervio.', prix: 19.9, unit: [1000, 'bandeja de 1 kg'], cut: 'paleron' },
  { id: 'p-joue', name: 'Carrillera', img: 'joue', tag: 'mijoter', origin: 'Aubrac', desc: 'Limpia, lista para guisar.', prix: 21.9, unit: [800, '≈ 800 g'], cut: 'joue' },
  { id: 'p-plat', name: 'Costillar', img: 'plat-de-cotes', tag: 'mijoter', origin: 'Salers', desc: 'Para pot-au-feu o para horno suave.', prix: 13.9, unit: [1000, '≈ 1 kg'], cut: 'plat-de-cotes' },
  { id: 'p-jarret', name: 'Morcillo para ossobuco', img: 'gite', tag: 'mijoter', origin: 'Charolesa', desc: 'En rodajas con hueso de caña.', prix: 17.9, unit: [800, '2 rodajas ≈ 800 g'], cut: 'gite-arriere' },
  { id: 'p-queue', name: 'Rabo de vacuno', img: 'queue', tag: 'mijoter', origin: 'Salers', desc: 'Troceado entre las vértebras.', prix: 15.9, unit: [1000, '≈ 1 kg'], cut: 'queue' },
  { id: 'p-merguez', name: 'Merguez de la casa', img: 'merguez', tag: 'maison', origin: 'Cordero y vacuno', desc: 'Harissa casera, tripa natural.', prix: 16.9, unit: [500, '6 merguez ≈ 500 g'], cut: null },
  { id: 'p-kit-pot', name: 'Kit pot-au-feu', img: 'plat-de-cotes', tag: 'maison', origin: 'Para 6 · ≈ 3 kg', desc: 'Costillar, morcillo con hueso, rabo y espaldilla.', prix: 49.9, kit: true, unit: [3000, 'kit ≈ 3 kg'], cut: null },
  { id: 'p-kit-bourguignon', name: 'Kit bourguignon', img: 'joue', tag: 'maison', origin: 'Para 6 · ≈ 2,5 kg', desc: 'Espaldilla, carrillera y pescuezo en dados.', prix: 49.9, kit: true, unit: [2500, 'kit ≈ 2,5 kg'], cut: null },
  { id: 'p-kit-bbq', name: 'Bandeja barbacoa', img: 'cotes', tag: 'maison', origin: 'Para 6 · ≈ 2,9 kg', desc: 'Chuletón madurado, aguja, onglet y merguez.', prix: 109.9, kit: true, unit: [2850, 'bandeja ≈ 2,9 kg'], cut: null }
];
const PRODUCT = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const VIT_FILTERS = [['tout', 'Todo'], ['griller', 'A la parrilla'], ['mijoter', 'Para guisar'], ['maison', 'De la casa']];
const PRESETS = [
  { id: 'bbq', name: 'Barbacoa con amigos', note: '6 pers.', items: { 'p-cote': 1, 'p-onglet': 1, 'p-merguez': 2 } },
  { id: 'dimanche', name: 'Domingo en familia', note: '4 pers.', items: { 'p-filet': 1, 'p-fauxfilet': 2, 'p-plat': 1 } },
  { id: 'mijotes', name: 'Una semana de guisos', note: '4 pers.', items: { 'p-paleron': 1, 'p-joue': 1, 'p-queue': 1 } }
];

const HOURS = [ // 0 = domingo
  [[8 * 60, 12 * 60 + 30]],
  [],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[7 * 60 + 30, 19 * 60]]
];
const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const CREDITS = [
  ['Vaca Salers', 'B.navez', 'Wikimedia Commons, CC BY-SA 3.0, recortada'],
  ['Vacío', 'Bortz60', 'Wikimedia Commons, CC BY-SA 3.0, recortada'],
  ['Rabo', 'FotoosVanRobin', 'Wikimedia Commons, CC BY-SA 2.0, recortada'],
  ['Merguez', 'Stanislaus der Lausige', 'Wikimedia Commons, CC BY-SA 4.0, recortada'],
  ['Harissa', 'Miansari66', 'Wikimedia Commons, CC0'],
  ['Chuletón, lomo bajo, solomillo, cadera, entrecot, costillar, pecho, morcillo, espaldilla, entraña, onglet, falda, pescuezo, llana, pez, tapa, contra, rabillo de cadera, carrillera, cordero, especias',
    'Alexander Van Steenberge, Eiliv Aceron, David Foodphototasty, Sergey Kotenev, Kelsey Todd, Anastasia Malysh, hyun-su Jung, Jakob Trost, Studio Crevettes, Sally Cox, Wesual Click, Marcos Paulo Prado, Skyler Ewing, Paras Kapoor, Olivier Amyot, Kyle Mackie, Manjunath Kammar, Katrina Wright, Mockup Graphics',
    'Unsplash, licencia de Unsplash, recortadas']
];

const AGE_NOTES = [ // días, nota, terneza, sabor
  [0, 'Carne fresca: sabor limpio, ligeramente metálico, y textura firme.', 'Firme', 'Limpio'],
  [7, 'Las enzimas se ponen a trabajar: la carne empieza a ablandarse.', 'Tierna', 'Redondo'],
  [21, 'Nuestro punto de equilibrio: jugosa, tierna, con notas de mantequilla tostada.', 'Muy tierna', 'Avellana'],
  [35, 'Avellana tostada, setas, sotobosque. Para entendidos.', 'Muy tierna', 'Profundo'],
  [50, 'Sabor intenso, casi a queso, como un parmesano curado.', 'Melosa', 'Curado']
];

/* Textos de la interfaz */
const UI = {
  money: n => `${n} €`,
  pct: n => `${n} %`,
  time: (h, m) => `${h}:${String(m).padStart(2, '0')}`,
  perKilo: 'el kilo', perKit: 'el kit', perKiloCaps: 'EL KILO', perKitCaps: 'EL KIT',
  add: 'Añadir', addNamed: n => `Añadir ${n}`, removeNamed: n => `Quitar ${n}`,
  openCut: n => `${n}: ver la ficha`,
  noMatch: 'Ninguna pieza coincide. Prueba con otro nombre.',
  count: n => `${n} pieza${n > 1 ? 's' : ''}`,
  countFor: (n, l) => `${n} pieza${n > 1 ? 's' : ''} para «${l}»`,
  layerCut: n => `${n}: ver la pieza en el animal`,
  seeOnAnimal: 'ver en el animal',
  showOnAnimal: 'Ver de dónde sale esta pieza',
  day: d => `Día ${d}`,
  cardEnd: '<p>Todo se corta al momento. ¿No encuentras lo que buscas en el mostrador? Pídenoslo.</p><a class="btn btn-red" href="#guide">Ver las 23 piezas</a>',
  addedTo: n => `Añadido al pedido: ${n}`,
  pieces: n => `${n} productos`,
  presetAdded: n => `Añadido al pedido: «${n}»`,
  today: 'Hoy', tomorrow: 'Mañana',
  recap: (slot, lines, total) => `Maison Billot · Reserva\nRecogida: ${slot}\n${lines}\nTotal estimado: ${total} (según el peso real en tienda)\nNombre: \nTeléfono: `,
  selected: 'Texto seleccionado, cópialo', copiedRecap: 'Resumen copiado', copiedPhone: 'Número copiado',
  seeOrder: 'Ver el pedido',
  outOf5: n => `${n} de 5`,
  no: 'N.º', rawPhoto: n => `${n}, pieza en crudo`, location: 'Ubicación en el animal',
  where: '¿Dónde está?', tender: 'Terneza', marbling: 'Veteado', taste: 'Sabor', cooking: 'Cocciones', dishes: '¿Qué se prepara?',
  quote: s => `«${s}»`, tip: 'El consejo del carnicero', perKiloIndicative: 'el kilo · precio orientativo', addToOrder: 'Añadir al pedido',
  closed: 'Cerrado', openUntil: t => `Abierto · cierra a las ${t}`, opens: l => `Cerrado · abre ${l}`,
  nextOpen: (k, day, t) => `${k === 0 ? 'hoy' : k === 1 ? 'mañana' : 'el ' + day.toLowerCase()} a las ${t}`,
  credit: (w, a, l) => `<b>${w}</b>: ${a} (${l})`
};
