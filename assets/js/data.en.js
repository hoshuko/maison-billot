/* ---------- English content: cuts, house-made products, counter ----------
   Same structure as data.fr.js and data.es.js. */
const LOCALE = 'en-GB';
const PHONE = '04 65 71 19 87';
const CAT = {
  1: { label: 'Quick-cooking', hint: 'grill, pan-fry, roast' },
  2: { label: 'For braising', hint: 'slow-cook for hours' },
  3: { label: 'For poaching', hint: 'pot-au-feu, stock' }
};
const ZONES = {
  avant: 'Forequarter',
  dos: 'Back',
  ventre: 'Belly',
  cuisse: 'Hind leg'
};
const USAGES = [
  ['tout', 'All'],
  ['barbecue', 'Barbecue'],
  ['poele', 'Pan-fried'],
  ['roti', 'Roast'],
  ['mijote', 'Braised'],
  ['potaufeu', 'Pot-au-feu'],
  ['tartare', 'Tartare'],
  ['hache', 'Mince']
];

const CUTS = [
  { id: 'joue', name: 'Beef cheek', aka: 'Joue de bœuf', zone: 'avant', cat: 2, img: 'joue',
    where: 'The jaw muscle. It works all day long, so it is rich in collagen and turns meltingly soft, almost confit, after a long, slow cook.',
    tendre: 1, persille: 2, gout: 5, cuissons: ['Braise'], plats: ['Cheeks braised in red wine', 'Daube', 'Beef cheek cottage pie'],
    usages: ['mijote'], prix: 21.9, portion: [800, '≈ 800 g · serves 3'], temps: '3½ hours on a very low heat',
    conseil: 'Cook it the day before: reheated, it’s even better.' },
  { id: 'collier', name: 'Neck', aka: 'Collier', zone: 'avant', cat: 3, img: 'collier',
    where: 'The neck, just behind the head. A hard-working muscle, marbled and gelatinous: the backbone of any full-bodied stock.',
    tendre: 1, persille: 3, gout: 4, cuissons: ['Poach', 'Braise', 'Mince'], plats: ['Pot-au-feu', 'Bourguignon', 'Burger patties'],
    usages: ['potaufeu', 'mijote', 'hache'], prix: 16.9, portion: [1000, '≈ 1 kg · serves 4'], temps: '3 hours at a gentle simmer',
    conseil: 'Mixed with top blade, it makes juicy, full-flavoured mince.' },
  { id: 'basses-cotes', name: 'Chuck eye', aka: 'Basses côtes', zone: 'avant', cat: 2, img: 'basses-cotes',
    where: 'The top of the back, between the neck and the ribs. Heavily marbled: the rustic cousin of the rib-eye.',
    tendre: 3, persille: 4, gout: 5, cuissons: ['Grill', 'Braise', 'Poach'], plats: ['Thick-cut grilled steak', 'Pot-au-feu', 'Braised beef'],
    usages: ['barbecue', 'poele', 'potaufeu', 'mijote', 'hache'], prix: 24.9, portion: [400, 'slice ≈ 400 g'], temps: 'Grilled: 3 min per side',
    conseil: 'Ask for a 2 cm slice and marinate it for an hour: rib-eye results at a gentler price.' },
  { id: 'paleron', name: 'Top blade', aka: 'Paleron · flat iron', zone: 'avant', cat: 2, img: 'paleron',
    where: 'The shoulder, above the clod. You can spot it by the seam of sinew down its centre, which melts into jelly as it cooks.',
    tendre: 2, persille: 3, gout: 5, cuissons: ['Braise', 'Poach', 'Mince'], plats: ['Beef bourguignon', 'Provençal daube', 'Pot-au-feu'],
    usages: ['mijote', 'potaufeu', 'hache'], prix: 19.9, portion: [1000, '≈ 1 kg · serves 4'], temps: '2½ to 3 hours',
    conseil: 'Keep the sinew: it’s what gives the sauce its silky body.' },
  { id: 'macreuse', name: 'Shoulder clod', aka: 'Macreuse', zone: 'avant', cat: 2, img: 'macreuse',
    where: 'The lower shoulder, beneath the top blade. One part is for quick cooking (macreuse à bifteck), the other for braising.',
    tendre: 3, persille: 2, gout: 3, cuissons: ['Pan-fry', 'Braise', 'Poach'], plats: ['Bourguignon', 'Clod steak', 'Pot-au-feu'],
    usages: ['mijote', 'potaufeu', 'poele'], prix: 19.9, portion: [1000, '≈ 1 kg · serves 4'], temps: 'Braised: 2½ hours',
    conseil: 'The steak part is best sliced thinly, against the grain.' },
  { id: 'jumeau', name: 'Chuck tender', aka: 'Jumeau', zone: 'avant', cat: 2, img: 'jumeau',
    where: 'Between the shoulder and the foreleg. Two muscles side by side, hence its French name, “twin”.',
    tendre: 3, persille: 2, gout: 3, cuissons: ['Pan-fry', 'Poach', 'Braise'], plats: ['Pot-au-feu', 'Grilling steak', 'Skewers'],
    usages: ['potaufeu', 'poele'], prix: 19.9, portion: [500, '≈ 500 g · serves 2'], temps: 'Pan-fried: 2 min per side',
    conseil: 'A hidden gem: tender, lean and cheaper than rump.' },
  { id: 'poitrine', name: 'Brisket', aka: 'Poitrine', zone: 'ventre', cat: 3, img: 'poitrine',
    where: 'The lower chest, between the forelegs. Alternating layers of fat and lean.',
    tendre: 1, persille: 4, gout: 4, cuissons: ['Poach', 'Braise', 'Smoke'], plats: ['Pot-au-feu', 'House pastrami', 'Hotpot'],
    usages: ['potaufeu'], prix: 13.9, portion: [1000, '≈ 1 kg · serves 4'], temps: '3 hours at a gentle simmer',
    conseil: 'It’s the base of pastrami: brined for ten days, smoked, then poached.' },
  { id: 'gite-avant', name: 'Fore shank', aka: 'Gîte avant · shin', zone: 'avant', cat: 3, img: 'gite',
    where: 'The top of the foreleg. Lean, and laced with tendons that turn gelatinous as they cook.',
    tendre: 1, persille: 1, gout: 4, cuissons: ['Poach', 'Braise'], plats: ['Pot-au-feu', 'Beef and carrots', 'Stock'],
    usages: ['potaufeu', 'mijote'], prix: 16.9, portion: [800, 'cross-cut ≈ 800 g'], temps: '3½ hours',
    conseil: 'Take it with the marrow bone: your stock will be twice as rich.' },
  { id: 'cotes', name: 'Rib & rib-eye', aka: 'Côte de bœuf, entrecôte', zone: 'dos', cat: 1, img: 'cotes',
    where: 'The middle of the back, over the ribs. On the bone, it’s a côte de bœuf; off the bone, a rib-eye.',
    tendre: 4, persille: 5, gout: 5, cuissons: ['Grill', 'Pan-fry', 'Roast'], plats: ['Barbecued côte de bœuf', 'Rib-eye bordelaise'],
    usages: ['barbecue', 'poele', 'roti'], prix: 42.9, portion: [1100, 'rib ≈ 1.1 kg · serves 3'], temps: '1 kg rib: 4 min per side + 10 min resting',
    conseil: 'Take it out of the fridge an hour before, and salt it just before searing.' },
  { id: 'plat-de-cotes', name: 'Short ribs', aka: 'Plat de côtes', zone: 'ventre', cat: 3, img: 'plat-de-cotes',
    where: 'The lower ribs, beneath the rib-eye. Bone, fat and lean in layers.',
    tendre: 1, persille: 4, gout: 5, cuissons: ['Poach', 'Braise', 'Low oven'], plats: ['Pot-au-feu', 'Glazed short ribs', 'Hotpot'],
    usages: ['potaufeu', 'mijote'], prix: 13.9, portion: [1000, '≈ 1 kg · serves 3'], temps: '3 hours, or 8 hours at 110 °C',
    conseil: 'One night in a low oven, and the meat comes off the bone with a fork.' },
  { id: 'hampe', name: 'Skirt steak', aka: 'Hampe', zone: 'ventre', cat: 1, img: 'hampe',
    where: 'The diaphragm muscle, along the ribs. Long fibres, bold flavour.',
    tendre: 3, persille: 3, gout: 5, cuissons: ['Grill', 'Pan-fry'], plats: ['Skirt steak with shallots', 'Fajitas'],
    usages: ['barbecue', 'poele'], prix: 29.9, portion: [400, 'piece ≈ 400 g'], temps: '2 min per side, rare',
    conseil: 'Always slice it across the grain.' },
  { id: 'onglet', name: 'Hanger steak', aka: 'Onglet', zone: 'ventre', cat: 1, img: 'onglet',
    where: 'Two small muscles that support the diaphragm. There is only one per animal, about a kilo.',
    tendre: 4, persille: 2, gout: 5, cuissons: ['Grill', 'Pan-fry'], plats: ['Onglet with shallots', 'Steak frites'],
    usages: ['barbecue', 'poele'], prix: 36.9, portion: [350, 'piece ≈ 350 g'], temps: 'Seared, 2 min per side',
    conseil: 'Remove the central sinew, and never cook it past rare.' },
  { id: 'faux-filet', name: 'Sirloin', aka: 'Faux-filet · strip loin', zone: 'dos', cat: 1, img: 'faux-filet',
    where: 'Along the spine, behind the ribs. A rim of fat and fine, close-textured meat.',
    tendre: 4, persille: 3, gout: 4, cuissons: ['Grill', 'Pan-fry', 'Roast'], plats: ['Roast sirloin', 'Pepper steak'],
    usages: ['barbecue', 'poele', 'roti'], prix: 39.9, portion: [300, 'steak ≈ 300 g'], temps: 'Roast: 15 min per 500 g at 220 °C',
    conseil: 'Leave the fat on while it cooks; trim it on the plate.' },
  { id: 'filet', name: 'Fillet', aka: 'Filet · tournedos, chateaubriand', zone: 'dos', cat: 1, img: 'filet',
    where: 'Beneath the sirloin, against the spine. The least-worked muscle, and the most tender cut of all.',
    tendre: 5, persille: 1, gout: 3, cuissons: ['Pan-fry', 'Roast', 'Raw'], plats: ['Tournedos Rossini', 'Beef Wellington', 'Carpaccio'],
    usages: ['roti', 'poele', 'tartare'], prix: 69.9, portion: [360, '2 tournedos ≈ 360 g'], temps: 'Tournedos: 3 min per side',
    conseil: 'A knob of butter at the end and a twist of pepper are all it needs.' },
  { id: 'bavette', name: 'Bavette', aka: 'Bavette d’aloyau · flap steak', zone: 'ventre', cat: 1, img: 'bavette',
    where: 'The lower belly, beneath the fillet. Long, pronounced fibres, very juicy.',
    tendre: 3, persille: 2, gout: 5, cuissons: ['Grill', 'Pan-fry'], plats: ['Bavette with shallots', 'Tagliata'],
    usages: ['barbecue', 'poele'], prix: 29.9, portion: [400, 'piece ≈ 400 g'], temps: '2 to 3 min per side',
    conseil: 'A very hot pan, and no more than rare.' },
  { id: 'flanchet', name: 'Flank', aka: 'Flanchet', zone: 'ventre', cat: 3, img: 'flanchet',
    where: 'The lower flank, just in front of the hind leg. Fibrous and fatty, perfect for long cooking.',
    tendre: 1, persille: 3, gout: 4, cuissons: ['Poach', 'Braise', 'Mince'], plats: ['Pot-au-feu', 'Phở', 'Mince'],
    usages: ['potaufeu', 'hache'], prix: 13.9, portion: [1000, '≈ 1 kg · serves 4'], temps: '3 hours',
    conseil: 'Rolled and tied, it makes a superb pot-au-feu on a budget.' },
  { id: 'rumsteck', name: 'Rump', aka: 'Rumsteck · top sirloin', zone: 'dos', cat: 1, img: 'rumsteck',
    where: 'The top of the rump, behind the sirloin. Lean, tender and very versatile.',
    tendre: 4, persille: 2, gout: 4, cuissons: ['Grill', 'Pan-fry', 'Roast', 'Raw'], plats: ['Rump steak', 'Steak tartare', 'Beef fondue'],
    usages: ['barbecue', 'poele', 'roti', 'tartare'], prix: 32.9, portion: [360, '2 steaks ≈ 360 g'], temps: 'Steak: 3 min per side',
    conseil: 'For tartare, buy it whole and chop it by hand at home.' },
  { id: 'aiguillette', name: 'Tri-tip', aka: 'Aiguillette baronne', zone: 'cuisse', cat: 1, img: 'aiguillette',
    where: 'Beneath the rump, at the top of the leg. A long, tender joint.',
    tendre: 4, persille: 2, gout: 4, cuissons: ['Roast', 'Grill', 'Pan-fry'], plats: ['Roast', 'Skewers', 'Hot-stone grill'],
    usages: ['roti', 'barbecue'], prix: 28.9, portion: [1000, 'roast ≈ 1 kg · serves 6'], temps: 'Roast: 30 min at 200 °C',
    conseil: 'As a 1 kg roast, it feeds six for less than fillet.' },
  { id: 'tranche-grasse', name: 'Thick flank', aka: 'Tranche grasse · knuckle', zone: 'cuisse', cat: 1, img: 'tranche-grasse',
    where: 'The front of the hind leg, above the knee. Despite its French name, “fatty slice”, it is lean.',
    tendre: 3, persille: 1, gout: 3, cuissons: ['Pan-fry', 'Grill', 'Roast'], plats: ['Steaks', 'Skewers', 'Fondue'],
    usages: ['poele', 'barbecue', 'roti'], prix: 23.9, portion: [400, '2 steaks ≈ 400 g'], temps: '2 to 3 min per side',
    conseil: 'Marinated, it makes skewers that never dry out.' },
  { id: 'tende-de-tranche', name: 'Topside', aka: 'Tende de tranche · top round', zone: 'cuisse', cat: 1, img: 'tende-de-tranche',
    where: 'The inside of the hind leg. Lean and tender; the poire and the merlan are part of it.',
    tendre: 4, persille: 1, gout: 3, cuissons: ['Pan-fry', 'Roast', 'Raw'], plats: ['Roast beef', 'Carpaccio', 'Steaks'],
    usages: ['roti', 'poele', 'tartare'], prix: 27.9, portion: [800, 'roast beef ≈ 800 g'], temps: 'Roast beef: 12 min per 500 g at 220 °C',
    conseil: 'The poire and the merlan are the butcher’s own favourites: ask for them and we’ll set them aside for you.' },
  { id: 'gite-noix', name: 'Silverside', aka: 'Gîte à la noix · eye of round', zone: 'cuisse', cat: 1, img: 'gite-noix',
    where: 'The back of the hind leg. Very lean, with fine, tight fibres.',
    tendre: 2, persille: 1, gout: 3, cuissons: ['Roast', 'Braise', 'Raw'], plats: ['Roast', 'Air-dried beef', 'Carpaccio'],
    usages: ['roti', 'tartare'], prix: 24.9, portion: [800, 'roast ≈ 800 g'], temps: 'Pink roast: 25 min at 200 °C',
    conseil: 'The eye of round slices very thinly, as carpaccio or cold roast beef.' },
  { id: 'gite-arriere', name: 'Hind shank', aka: 'Gîte arrière', zone: 'cuisse', cat: 3, img: 'gite',
    where: 'The lower hind leg, above the hock. Sinewy, gelatinous and full of flavour.',
    tendre: 1, persille: 1, gout: 4, cuissons: ['Poach', 'Braise'], plats: ['Pot-au-feu', 'Beef osso buco', 'Stock'],
    usages: ['potaufeu', 'mijote'], prix: 17.9, portion: [800, 'cross-cut ≈ 800 g'], temps: '3½ hours',
    conseil: 'Cross-cut with the bone in, it makes a generous beef osso buco.' },
  { id: 'queue', name: 'Oxtail', aka: 'Queue de bœuf', zone: 'cuisse', cat: 3, img: 'queue',
    where: 'The tail, cut between the vertebrae. Lots of bone, very gelatinous meat.',
    tendre: 1, persille: 3, gout: 5, cuissons: ['Poach', 'Braise'], plats: ['Pot-au-feu', 'Braised oxtail', 'Cottage pie'],
    usages: ['potaufeu', 'mijote'], prix: 15.9, portion: [1000, '≈ 1 kg · serves 3'], temps: '4 hours',
    conseil: 'Shredded after cooking, it makes the best cottage pie there is.' }
];
CUTS.forEach((c, i) => { c.n = i + 1; });
const CUT = Object.fromEntries(CUTS.map(c => [c.id, c]));

const PREPS = [
  { id: 'merguez', tab: 'House merguez', title: 'Anatomy of a merguez.', mode: 'burst',
    lede: 'Nothing hidden in our sausages. Here is exactly what goes into a Maison Billot merguez.',
    badges: ['Natural sheep casing · Ø 22 mm', 'No colourings or preservatives', 'Spicy, never fiery'],
    prix: 16.9, priceNote: 'per kilo', cta: 'Add 6 merguez', productId: 'p-merguez',
    product: { img: 'merguez', name: 'House merguez' },
    layers: [
      { name: 'Cumin & coriander', pct: 1, img: 'cumin', note: 'Toasted and ground' },
      { name: 'Fresh garlic', pct: 1.5, img: 'ail', note: 'Crushed that morning' },
      { name: 'Guérande salt', pct: 1.5, img: null, note: '15 g per kilo' },
      { name: 'Sweet & hot paprika', pct: 3, img: 'paprika', note: 'For colour, no additives' },
      { name: 'House harissa', pct: 5, img: 'harissa', note: 'Chillies, garlic, olive oil' },
      { name: 'Beef top blade', pct: 38, img: 'paleron', note: 'Coarsely minced', cut: 'paleron' },
      { name: 'Lamb shoulder', pct: 50, img: 'agneau', note: 'Boned in-house' }
    ] },
  { id: 'potaufeu', tab: 'Pot-au-feu kit', title: 'Anatomy of a pot-au-feu.', mode: 'pile',
    lede: 'Four cuts, three kilos, one patient afternoon: the kit we put together for winter Sundays.',
    badges: ['Serves 6 · ≈ 3 kg', 'With the marrow bone', 'Tied, ready to cook'],
    prix: 49.9, priceNote: 'per kit · ≈ 3 kg', cta: 'Add the kit', productId: 'p-kit-pot',
    layers: [
      { name: 'Short ribs', pct: 33, img: 'plat-de-cotes', note: '1 kg · for tenderness', cut: 'plat-de-cotes' },
      { name: 'Shank on the bone', pct: 27, img: 'gite', note: '800 g · for the marrow', cut: 'gite-arriere' },
      { name: 'Oxtail', pct: 20, img: 'queue', note: '600 g · for the broth', cut: 'queue' },
      { name: 'Top blade', pct: 20, img: 'paleron', note: '600 g · for richness', cut: 'paleron' }
    ] },
  { id: 'bourguignon', tab: 'Bourguignon kit', title: 'Anatomy of a bourguignon.', mode: 'pile',
    lede: 'Three very different cuts: it’s the mix that gives you a rich, glossy sauce.',
    badges: ['Serves 6 · ≈ 2.5 kg', 'Cut into 5 cm cubes', 'Top blade sinew left in'],
    prix: 49.9, priceNote: 'per kit · ≈ 2.5 kg', cta: 'Add the kit', productId: 'p-kit-bourguignon',
    layers: [
      { name: 'Top blade', pct: 40, img: 'paleron', note: '1 kg · the sinew that melts', cut: 'paleron' },
      { name: 'Beef cheek', pct: 32, img: 'joue', note: '800 g · the confit texture', cut: 'joue' },
      { name: 'Neck', pct: 28, img: 'collier', note: '700 g · the flavour', cut: 'collier' }
    ] },
  { id: 'barbecue', tab: 'Barbecue platter', title: 'Anatomy of a barbecue.', mode: 'pile',
    lede: 'The côte to impress, the hanger steak for connoisseurs, merguez for everyone.',
    badges: ['Serves 6 · ≈ 2.9 kg', 'Rib aged 30 days', 'Merguez made this morning'],
    prix: 109.9, priceNote: 'per platter · ≈ 2.9 kg', cta: 'Add the platter', productId: 'p-kit-bbq',
    layers: [
      { name: 'Dry-aged côte de bœuf', pct: 42, img: 'cotes', note: '1.2 kg · for sharing', cut: 'cotes' },
      { name: 'Chuck eye', pct: 28, img: 'basses-cotes', note: '800 g · marinated', cut: 'basses-cotes' },
      { name: 'House merguez', pct: 18, img: 'merguez', note: '6 pieces · 500 g' },
      { name: 'Hanger steak', pct: 12, img: 'onglet', note: '350 g · rare', cut: 'onglet' }
    ] }
];

const PRODUCTS = [
  { id: 'p-cote', name: 'Dry-aged côte de bœuf', img: 'cotes', tag: 'griller', origin: 'Salers · 30 days', desc: 'On the bone, well marbled, serves three.', prix: 57.9, unit: [1200, 'piece ≈ 1.2 kg'], cut: 'cotes' },
  { id: 'p-entrecote', name: 'Rib-eye', img: 'basses-cotes', tag: 'griller', origin: 'Aubrac · 21 days', desc: 'Richly marbled, cut thick.', prix: 42.9, unit: [350, 'slice ≈ 350 g'], cut: 'cotes' },
  { id: 'p-filet', name: 'Fillet', img: 'filet', tag: 'griller', origin: 'Charolais', desc: 'As tournedos or a whole roast.', prix: 69.9, unit: [360, '2 tournedos ≈ 360 g'], cut: 'filet' },
  { id: 'p-fauxfilet', name: 'Sirloin', img: 'faux-filet', tag: 'griller', origin: 'Salers · 21 days', desc: 'With its rim of fat.', prix: 39.9, unit: [300, 'steak ≈ 300 g'], cut: 'faux-filet' },
  { id: 'p-onglet', name: 'Hanger steak', img: 'onglet', tag: 'griller', origin: 'Limousin', desc: 'One per animal, trimmed.', prix: 36.9, unit: [350, 'piece ≈ 350 g'], cut: 'onglet' },
  { id: 'p-bavette', name: 'Bavette', img: 'bavette', tag: 'griller', origin: 'Charolais', desc: 'Long fibres, very juicy.', prix: 29.9, unit: [400, 'piece ≈ 400 g'], cut: 'bavette' },
  { id: 'p-paleron', name: 'Top blade for bourguignon', img: 'paleron', tag: 'mijoter', origin: 'Salers', desc: 'Diced, sinew included.', prix: 19.9, unit: [1000, '1 kg tray'], cut: 'paleron' },
  { id: 'p-joue', name: 'Beef cheek', img: 'joue', tag: 'mijoter', origin: 'Aubrac', desc: 'Trimmed, ready to braise.', prix: 21.9, unit: [800, '≈ 800 g'], cut: 'joue' },
  { id: 'p-plat', name: 'Short ribs', img: 'plat-de-cotes', tag: 'mijoter', origin: 'Salers', desc: 'For pot-au-feu or a low oven.', prix: 13.9, unit: [1000, '≈ 1 kg'], cut: 'plat-de-cotes' },
  { id: 'p-jarret', name: 'Shank for osso buco', img: 'gite', tag: 'mijoter', origin: 'Charolais', desc: 'Cross-cut with the marrow bone.', prix: 17.9, unit: [800, '2 cross-cuts ≈ 800 g'], cut: 'gite-arriere' },
  { id: 'p-queue', name: 'Oxtail', img: 'queue', tag: 'mijoter', origin: 'Salers', desc: 'Cut between the vertebrae.', prix: 15.9, unit: [1000, '≈ 1 kg'], cut: 'queue' },
  { id: 'p-merguez', name: 'House merguez', img: 'merguez', tag: 'maison', origin: 'Lamb & beef', desc: 'House harissa, natural casing.', prix: 16.9, unit: [500, '6 merguez ≈ 500 g'], cut: null },
  { id: 'p-kit-pot', name: 'Pot-au-feu kit', img: 'plat-de-cotes', tag: 'maison', origin: 'Serves 6 · ≈ 3 kg', desc: 'Short ribs, shank on the bone, oxtail, top blade.', prix: 49.9, kit: true, unit: [3000, 'kit ≈ 3 kg'], cut: null },
  { id: 'p-kit-bourguignon', name: 'Bourguignon kit', img: 'joue', tag: 'maison', origin: 'Serves 6 · ≈ 2.5 kg', desc: 'Top blade, cheek and neck, diced.', prix: 49.9, kit: true, unit: [2500, 'kit ≈ 2.5 kg'], cut: null },
  { id: 'p-kit-bbq', name: 'Barbecue platter', img: 'cotes', tag: 'maison', origin: 'Serves 6 · ≈ 2.9 kg', desc: 'Aged côte, chuck eye, hanger steak, merguez.', prix: 109.9, kit: true, unit: [2850, 'platter ≈ 2.9 kg'], cut: null }
];
const PRODUCT = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const VIT_FILTERS = [['tout', 'All'], ['griller', 'For grilling'], ['mijoter', 'For braising'], ['maison', 'House-made']];
const PRESETS = [
  { id: 'bbq', name: 'Barbecue with friends', note: 'serves 6', items: { 'p-cote': 1, 'p-onglet': 1, 'p-merguez': 2 } },
  { id: 'dimanche', name: 'Family Sunday lunch', note: 'serves 4', items: { 'p-filet': 1, 'p-fauxfilet': 2, 'p-plat': 1 } },
  { id: 'mijotes', name: 'A week of slow cooking', note: 'serves 4', items: { 'p-paleron': 1, 'p-joue': 1, 'p-queue': 1 } }
];

const HOURS = [ // 0 = Sunday
  [[8 * 60, 12 * 60 + 30]],
  [],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[8 * 60, 13 * 60], [15 * 60 + 30, 19 * 60 + 30]],
  [[7 * 60 + 30, 19 * 60]]
];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CREDITS = [
  ['Salers cow', 'B.navez', 'Wikimedia Commons, CC BY-SA 3.0, background removed'],
  ['Bavette', 'Bortz60', 'Wikimedia Commons, CC BY-SA 3.0, background removed'],
  ['Oxtail', 'FotoosVanRobin', 'Wikimedia Commons, CC BY-SA 2.0, background removed'],
  ['Merguez', 'Stanislaus der Lausige', 'Wikimedia Commons, CC BY-SA 4.0, background removed'],
  ['Harissa', 'Miansari66', 'Wikimedia Commons, CC0'],
  ['Rib, sirloin, fillet, rump, rib-eye, short ribs, brisket, shank, top blade, skirt, hanger, flank, neck, clod, chuck tender, topside, silverside, tri-tip, cheek, lamb, spices',
    'Alexander Van Steenberge, Eiliv Aceron, David Foodphototasty, Sergey Kotenev, Kelsey Todd, Anastasia Malysh, hyun-su Jung, Jakob Trost, Studio Crevettes, Sally Cox, Wesual Click, Marcos Paulo Prado, Skyler Ewing, Paras Kapoor, Olivier Amyot, Kyle Mackie, Manjunath Kammar, Katrina Wright, Mockup Graphics',
    'Unsplash, Unsplash License, background removed']
];

const AGE_NOTES = [ // days, note, tenderness, flavour
  [0, 'Fresh beef: a clean, slightly metallic flavour and a firm texture.', 'Firm', 'Clean'],
  [7, 'The enzymes get to work: the meat starts to tenderise.', 'Tender', 'Rounded'],
  [21, 'Our sweet spot: juicy and tender, with notes of brown butter.', 'Very tender', 'Nutty'],
  [35, 'Toasted hazelnut, mushroom, forest floor. For enthusiasts.', 'Very tender', 'Deep'],
  [50, 'Intense, almost cheesy, like a well-aged parmesan.', 'Melting', 'Mature']
];

/* Interface text */
const UI = {
  money: n => `€${n}`,
  pct: n => `${n}%`,
  time: (h, m) => `${h}:${String(m).padStart(2, '0')}`,
  perKilo: 'per kilo', perKit: 'per kit', perKiloCaps: 'PER KILO', perKitCaps: 'PER KIT',
  add: 'Add', addNamed: n => `Add ${n}`, removeNamed: n => `Remove ${n}`,
  openCut: n => `${n}: view details`,
  noMatch: 'No cut matches. Try another name.',
  count: n => `${n} cut${n > 1 ? 's' : ''}`,
  countFor: (n, l) => `${n} cut${n > 1 ? 's' : ''} for “${l}”`,
  layerCut: n => `${n}: show this cut on the animal`,
  seeOnAnimal: 'see it on the animal',
  showOnAnimal: 'Show where this cut comes from',
  day: d => `Day ${d}`,
  cardEnd: '<p>Everything is cut to order. Can’t see what you’re after? Just ask.</p><a class="btn btn-red" href="#guide">Browse all 23 cuts</a>',
  addedTo: n => `Added to your order: ${n}`,
  pieces: n => `${n} items`,
  presetAdded: n => `“${n}” added to your order`,
  today: 'Today', tomorrow: 'Tomorrow',
  recap: (slot, lines, total) => `Maison Billot · Reservation\nCollection: ${slot}\n${lines}\nEstimated total: ${total} (charged by actual weight in store)\nName: \nPhone: `,
  selected: 'Text selected, copy it', copiedRecap: 'Summary copied', copiedPhone: 'Number copied',
  seeOrder: 'View order',
  outOf5: n => `${n} out of 5`,
  no: 'No.', rawPhoto: n => `${n}, raw cut`, location: 'Location on the animal',
  where: 'Where is it?', tender: 'Tenderness', marbling: 'Marbling', taste: 'Flavour', cooking: 'Cooking methods', dishes: 'What to make',
  quote: s => `“${s}”`, tip: 'Butcher’s tip', perKiloIndicative: 'per kilo · guide price', addToOrder: 'Add to order',
  closed: 'Closed', openUntil: t => `Open · closes at ${t}`, opens: l => `Closed · opens ${l}`,
  nextOpen: (k, day, t) => `${k === 0 ? 'today' : k === 1 ? 'tomorrow' : day} at ${t}`,
  credit: (w, a, l) => `<b>${w}</b>: ${a} (${l})`
};
