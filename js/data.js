/**
 * DYKHA STORE - Données Initiales du Catalogue
 * Catégories, sous-catégories et produits avec vraies photos réelles en haute définition
 * Prix réduits & caractéristiques techniques complètes
 */

const INITIAL_CATEGORIES = [
  { id: 'all', name: 'Tous les articles', icon: 'fa-layer-group' },
  { 
    id: 'femme', 
    name: 'Femme', 
    icon: 'fa-female',
    subcategories: [
      'Robes',
      'Jupes',
      'Pantalons',
      'Hauts',
      'Pantalons bas larges',
      'Ensembles combinaisons',
      'Chaussures',
      'Foulards'
    ]
  },
  { 
    id: 'homme', 
    name: 'Homme', 
    icon: 'fa-male',
    subcategories: [
      'Chemises',
      'Pantalons',
      'Costumes',
      'Chaussures'
    ]
  },
  { 
    id: 'enfants', 
    name: 'Enfants', 
    icon: 'fa-child',
    subcategories: [
      'Filles',
      'Garçons',
      'Bébés'
    ]
  },
  { 
    id: 'accessoires', 
    name: 'Accessoires', 
    icon: 'fa-gem',
    subcategories: [
      'Sacs',
      'Chaussures',
      'Montres',
      'Bijoux Or & Argent',
      'Lunettes de soleil Femme',
      'Lunettes de soleil Homme',
      'Lunettes Enfants',
      'Lunettes de vue'
    ]
  }
];

const INITIAL_PRODUCTS = [
  // =================================================================
  // --- FEMME ---
  // =================================================================
  {
    id: 'prod-f-1',
    name: 'Robe de Soirée Satin Rose Poudré',
    category: 'femme',
    subcategory: 'Robes',
    price: 25000,
    oldPrice: 38000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Rose Poudré', hex: '#E8A7B2' },
      { name: 'Beige Crème', hex: '#F5EBE1' },
      { name: 'Blanc Pur', hex: '#FFFFFF' }
    ],
    stock: 12,
    rating: 4.9,
    reviewsCount: 34,
    badge: 'Prix Réduit',
    image: 'images/products/robe-soiree-rose.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85',
    description: 'Robe longue fluide confectionnée en satin de soie de haute qualité. Dos nu élégant et coupe cintrée qui sublime la silhouette pour toutes vos occasions prestigieuses.',
    characteristics: [
      { label: 'Matière', value: '100% Satin de soie fluide haute densité' },
      { label: 'Coupe', value: 'Longue sirène cintrée avec fente d\'aisance et dos nu' },
      { label: 'Finitions', value: 'Fermeture zippée invisible latérale & coutures renforcées' },
      { label: 'Entretien', value: 'Nettoyage à sec ou lavage main délicat à 30°C' },
      { label: 'Occasion', value: 'Cérémonie, mariage, soirée de gala et cocktails' }
    ]
  },
  {
    id: 'prod-f-2',
    name: 'Ensemble Combinaison Fluide Chic',
    category: 'femme',
    subcategory: 'Ensembles combinaisons',
    price: 22000,
    oldPrice: 32000,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige Sable', hex: '#E2D5C3' },
      { name: 'Rose Nude', hex: '#ECC4C9' }
    ],
    stock: 8,
    rating: 4.8,
    reviewsCount: 19,
    badge: 'Promo',
    image: 'images/products/ensemble-combinaison-chic.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    description: 'Ensemble combinaison taille ceinturée avec col chemisier délicat. Tissu léger et respirant, idéal pour les rendez-vous professionnels comme pour les sorties festives.',
    characteristics: [
      { label: 'Matière', value: 'Crêpe de viscose soyeuse & élasthanne doux' },
      { label: 'Coupe', value: 'Taille ceinturée amovible & pantalon droit fluide' },
      { label: 'Col & Buste', value: 'Col tailleur cranté avec boutonnage nacré' },
      { label: 'Poches', value: 'Deux poches italiennes passepoilées discrètes' },
      { label: 'Entretien', value: 'Lavage en machine programme délicat 30°C, repassage doux' }
    ]
  },
  {
    id: 'prod-f-3',
    name: 'Pantalon Bas Large Palazzo Luxury',
    category: 'femme',
    subcategory: 'Pantalons bas larges',
    price: 16500,
    oldPrice: 24000,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanc Ivoire', hex: '#FBF9F5' },
      { name: 'Beige Taupe', hex: '#D6C7B2' }
    ],
    stock: 15,
    rating: 4.7,
    reviewsCount: 22,
    badge: 'Baisse de Prix',
    image: 'images/products/pantalon-palazzo-large.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
    description: 'Pantalon ample coupe palazzo taille haute avec poches passepoilées. Allie aisance absolue et élégance intemporelle.',
    characteristics: [
      { label: 'Matière', value: '95% Coton peigné sergé fluide, 5% Spandex confort' },
      { label: 'Coupe', value: 'Palazzo ultra-évasé taille haute sculptante' },
      { label: 'Fermeture', value: 'Bouton marbré & braguette zippée robuste' },
      { label: 'Longueur', value: 'Coupe jambe extra-longue tombé impeccable' },
      { label: 'Entretien', value: 'Lavage machine 30°C, repassage à température moyenne' }
    ]
  },
  {
    id: 'prod-f-4',
    name: 'Foulard Soie Sauvage Imprimé Pastel',
    category: 'femme',
    subcategory: 'Foulards',
    price: 9500,
    oldPrice: 15000,
    sizes: ['Unique'],
    colors: [
      { name: 'Nuance Rose & Or', hex: '#F7D6D0' },
      { name: 'Palette Beige Douce', hex: '#EBE2D5' }
    ],
    stock: 25,
    rating: 5.0,
    reviewsCount: 41,
    badge: 'Offre Spéciale',
    image: 'images/products/foulard-soie-pastel.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=85',
    description: 'Foulard en twill de soie 100% naturelle orné de motifs artistiques délicats. Parfait autour du cou, dans les cheveux ou noué à votre sac à main.',
    characteristics: [
      { label: 'Matière', value: '100% Soie naturelle de mûrier (Twill 14 mommes)' },
      { label: 'Dimensions', value: '90 cm x 90 cm (Grand carré de soie)' },
      { label: 'Ourlet', value: 'Roulotté traditionnel fait à la main' },
      { label: 'Impression', value: 'Pigments minéraux écologiques nuances pastel & or' },
      { label: 'Entretien', value: 'Nettoyage à sec recommandé ou lavage main à l\'eau tiède' }
    ]
  },
  {
    id: 'prod-f-5',
    name: 'Haut Dentelle Fine Romantique',
    category: 'femme',
    subcategory: 'Hauts',
    price: 13000,
    oldPrice: 19500,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blanc Pur', hex: '#FFFFFF' },
      { name: 'Pétale de Rose', hex: '#FADADD' }
    ],
    stock: 9,
    rating: 4.8,
    reviewsCount: 15,
    badge: 'Remise',
    image: 'images/products/haut-dentelle-romantique.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=85',
    description: 'Chemisier en dentelle raffinée avec manches bouffantes et boutons nacrés. Une touche de poésie et de féminité pour toute garde-robe.',
    characteristics: [
      { label: 'Matière', value: 'Dentelle guipure florale & doublure voile doux' },
      { label: 'Manches', value: 'Manches 3/4 ballon avec poignets élastiqués délicats' },
      { label: 'Boutonnage', value: 'Patte de boutonnage centrale à boutons en nacre véritable' },
      { label: 'Doublure', value: 'Buste opaque anti-transparence, manches semi-ajourées' },
      { label: 'Entretien', value: 'Lavage doux à 30°C dans un filet de protection' }
    ]
  },
  {
    id: 'prod-f-6',
    name: 'Jupe Plissée Longueur Midi Beige Poudré',
    category: 'femme',
    subcategory: 'Jupes',
    price: 15000,
    oldPrice: 22000,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Beige Champagne', hex: '#EED9C4' },
      { name: 'Vieux Rose', hex: '#C48B9F' }
    ],
    stock: 11,
    rating: 4.6,
    reviewsCount: 17,
    badge: 'Baisse de Prix',
    image: 'images/products/jupe-plissee-midi.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=85',
    description: 'Jupe plissée taille élastique scintillante. Mouvement fluide et tombé impeccable qui accompagne chaque pas avec grâce.',
    characteristics: [
      { label: 'Matière', value: 'Voile plissé soleil haute mémoire de forme (infroissable)' },
      { label: 'Ceinture', value: 'Bandeau élastiqué scintillant en fil lurex doré' },
      { label: 'Longueur', value: 'Coupe midi moderne (78 cm de hauteur)' },
      { label: 'Doublure', value: 'Doublure intégrale satinée opaque ton sur ton' },
      { label: 'Entretien', value: 'Ne nécessite aucun repassage, séchage rapide sur cintre' }
    ]
  },
  {
    id: 'prod-f-7',
    name: 'Escarpins Vernis Nude Stiletto Prestige',
    category: 'femme',
    subcategory: 'Chaussures',
    price: 23500,
    oldPrice: 34000,
    sizes: ['37', '38', '39', '40', '41'],
    colors: [
      { name: 'Nude Poudré', hex: '#E8C5B8' },
      { name: 'Noir Verni', hex: '#1C1C1C' },
      { name: 'Blanc Nacré', hex: '#FDFBF7' }
    ],
    stock: 9,
    rating: 4.9,
    reviewsCount: 26,
    badge: 'Élégance Promo',
    image: 'images/products/escarpins-vernis-nude.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
    description: 'Escarpins iconiques à bout pointu et cambrure parfaite. Conçus pour sublimer vos tenues de soirée, tailleurs et robes d\'apparat.',
    characteristics: [
      { label: 'Matière tige', value: 'Cuir glacé vernis haute brillance anti-rayures' },
      { label: 'Hauteur de talon', value: 'Talon aiguille stiletto 8,5 cm profilé' },
      { label: 'Semelle intérieure', value: 'Coussinet confort molletonné à mémoire de forme' },
      { label: 'Semelle extérieure', value: 'Cuir véritable avec patin antidérapant intégré' },
      { label: 'Entretien', value: 'Nettoyer avec une chamoisine douce légèrement imprégnée' }
    ]
  },
  {
    id: 'prod-f-8',
    name: 'Pantalon Tailleur Coupe Cigarette Crêpe Beige',
    category: 'femme',
    subcategory: 'Pantalons',
    price: 17500,
    oldPrice: 26000,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige Sable', hex: '#DFD3C3' },
      { name: 'Noir Intemporel', hex: '#212121' }
    ],
    stock: 12,
    rating: 4.8,
    reviewsCount: 20,
    badge: 'Promo',
    image: 'images/products/pantalon-tailleur-beige.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85',
    description: 'Pantalon droit cigarette chic et structuré à plis marqués. Parfaitement ajusté pour vos journées au bureau comme vos réceptions habillées.',
    characteristics: [
      { label: 'Matière', value: 'Crêpe tailleur fluide haute tenue (viscose & élasthanne)' },
      { label: 'Coupe', value: 'Coupe cigarette droite ajustée taille mi-haute à plis' },
      { label: 'Poches', value: '2 poches italiennes passepoilées avant' },
      { label: 'Fermeture', value: 'Zip sous patte avec agrafe métallique invisible' },
      { label: 'Entretien', value: 'Lavage en machine cycle doux 30°C ou nettoyage à sec' }
    ]
  },

  // =================================================================
  // --- HOMME ---
  // =================================================================
  {
    id: 'prod-h-1',
    name: 'Costume Homme 2 Pièces Royal Slim',
    category: 'homme',
    subcategory: 'Costumes',
    price: 59000,
    oldPrice: 85000,
    sizes: ['48', '50', '52', '54', '56'],
    colors: [
      { name: 'Beige Sablé', hex: '#CDBCA8' },
      { name: 'Bleu Nuit', hex: '#1C2833' },
      { name: 'Gris Perle', hex: '#D5D8DC' }
    ],
    stock: 7,
    rating: 4.9,
    reviewsCount: 28,
    badge: 'Super Prix',
    image: 'images/products/costume-homme-slim.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85',
    description: 'Costume sur mesure confectionné en laine tropicale ultra-confortable et infroissable. Veste cintrée avec revers cranté et pantalon coordonné.',
    characteristics: [
      { label: 'Matière', value: '100% Laine tropicale peignée Super 120s infroissable' },
      { label: 'Coupe', value: 'Veste 2 boutons coupe slim ajustée & pantalon sans pince' },
      { label: 'Revers', value: 'Revers cranté 7,5 cm avec surpiqûres tailleur AMF' },
      { label: 'Doublure', value: 'Soie jacquard satinée respirante à micro-motifs' },
      { label: 'Poches & Fentes', value: '4 poches intérieures portefeuille et 2 fentes dos latérales' }
    ]
  },
  {
    id: 'prod-h-2',
    name: 'Chemise Col Italien Coton Égyptien',
    category: 'homme',
    subcategory: 'Chemises',
    price: 18000,
    oldPrice: 26000,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanc Pur', hex: '#FFFFFF' },
      { name: 'Rose Pastel', hex: '#FADBD8' },
      { name: 'Beige Lin', hex: '#EFE7DA' }
    ],
    stock: 20,
    rating: 4.8,
    reviewsCount: 39,
    badge: 'Baisse de Prix',
    image: 'images/products/chemise-homme-blanche.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=85',
    description: 'Chemise classique coupe ajustée tissée en pur coton égyptien respirant. Boutons en nacre véritable et finitions haute couture.',
    characteristics: [
      { label: 'Matière', value: '100% Pur coton d\'Égypte Giza double retors (fil 100/2)' },
      { label: 'Col', value: 'Col italien semi-ouvert avec baleines de maintien amovibles' },
      { label: 'Poignets', value: 'Poignets simples biseautés ajustables' },
      { label: 'Boutons', value: 'Nacre véritable de coquillage cousue en croix' },
      { label: 'Finition', value: 'Traitement Easy-Iron (repassage ultra-rapide)' }
    ]
  },
  {
    id: 'prod-h-3',
    name: 'Pantalon Chino Coupe Moderne Chameau',
    category: 'homme',
    subcategory: 'Pantalons',
    price: 16000,
    oldPrice: 24000,
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Chameau / Beige', hex: '#C19A6B' },
      { name: 'Kaki Clair', hex: '#A39882' }
    ],
    stock: 14,
    rating: 4.7,
    reviewsCount: 16,
    badge: 'Offre Spéciale',
    image: 'images/products/pantalon-chino-chameau.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
    description: 'Pantalon chino en gabardine de coton stretch pour un confort optimal tout au long de la journée, alliant décontraction et prestance.',
    characteristics: [
      { label: 'Matière', value: '97% Coton sergé peigné de première qualité, 3% Élasthanne' },
      { label: 'Coupe', value: 'Coupe fuselée moderne (Tapered fit)' },
      { label: 'Poches', value: '2 poches italiennes avant et 2 poches arrières passepoilées' },
      { label: 'Fermeture', value: 'Braguette zippée YKK en laiton & bouton en corne gravé' },
      { label: 'Entretien', value: 'Lavage en machine à 40°C, excellente tenue des couleurs' }
    ]
  },
  {
    id: 'prod-h-4',
    name: 'Chaussures Richelieu Cuir Glacé Brun',
    category: 'homme',
    subcategory: 'Chaussures',
    price: 32000,
    oldPrice: 48000,
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Marron Cognac', hex: '#6E473B' },
      { name: 'Noir Ébène', hex: '#1C1C1C' }
    ],
    stock: 8,
    rating: 4.9,
    reviewsCount: 23,
    badge: 'Artisanal Promo',
    image: 'images/products/chaussures-richelieu-cuir.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=85',
    description: 'Chaussures richelieu à bout fleuri confectionnées à la main dans un cuir pleine fleur patiné. Semelle cousue avec finition de prestige.',
    characteristics: [
      { label: 'Cuir extérieur', value: 'Cuir pleine fleur de veau sélectionné au tannage végétal' },
      { label: 'Montage', value: 'Cousu Blake traditionnel garantissant souplesse et robustesse' },
      { label: 'Semelle', value: 'Semelle en cuir véritable avec patin protecteur d\'usure' },
      { label: 'Détails', value: 'Perforations fleuries artisanales sur le bout de l\'empeigne' },
      { label: 'Doublure', value: '100% Cuir de veau naturel respirant et hypoallergénique' }
    ]
  },

  // =================================================================
  // --- ENFANTS ---
  // =================================================================
  {
    id: 'prod-e-1',
    name: 'Robe Cérémonie Fille Tulle Rose & Dentelle',
    category: 'enfants',
    subcategory: 'Filles',
    price: 14500,
    oldPrice: 22000,
    sizes: ['3-4 ans', '5-6 ans', '7-8 ans', '9-10 ans'],
    colors: [
      { name: 'Rose Féerique', hex: '#F9D5DC' },
      { name: 'Blanc Cérémonie', hex: '#FFFFFF' }
    ],
    stock: 10,
    rating: 4.9,
    reviewsCount: 31,
    badge: 'Prix Doux',
    image: 'images/products/robe-ceremonie-fille.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85',
    description: 'Superbe robe de fête pour petite princesse avec jupon en tulle aérien, corsage brodé de fleurs délicates et ruban de satin noué au dos.',
    characteristics: [
      { label: 'Matière', value: 'Corsage brodé coton doux & jupon en tulle aérien multicouche' },
      { label: 'Doublure', value: '100% Coton peigné hypoallergénique doux pour la peau' },
      { label: 'Fermeture', value: 'Zip invisible au dos et grand ruban noué en satin' },
      { label: 'Longueur', value: 'Longueur mi-mollet adaptée aux mouvements et jeux' },
      { label: 'Entretien', value: 'Lavage délicat à la main ou nettoyage doux en machine' }
    ]
  },
  {
    id: 'prod-e-2',
    name: 'Ensemble Garçon Chemisette & Bermuda Lin',
    category: 'enfants',
    subcategory: 'Garçons',
    price: 12500,
    oldPrice: 19500,
    sizes: ['2-3 ans', '4-5 ans', '6-7 ans', '8-9 ans'],
    colors: [
      { name: 'Beige & Blanc', hex: '#EFE6DA' },
      { name: 'Ciel Pastel', hex: '#D4E6F1' }
    ],
    stock: 12,
    rating: 4.8,
    reviewsCount: 14,
    badge: 'Offre Spéciale',
    image: 'images/products/ensemble-garcon-lin.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=85',
    description: 'Ensemble estival chic comprenant une chemisette à col mao et un bermuda assorti avec bretelles ajustables en tissu lin et coton doux.',
    characteristics: [
      { label: 'Matière', value: '70% Lin naturel écologique et 30% Coton respirant' },
      { label: 'Chemisette', value: 'Col mao/officier avec boutons aspect bois naturel' },
      { label: 'Bermuda', value: 'Taille élastique réglable avec bretelles amovibles incluses' },
      { label: 'Climat', value: 'Idéal pour temps chaud, cérémonies et festivités' },
      { label: 'Entretien', value: 'Lavage en machine à 30°C, repassage doux' }
    ]
  },
  {
    id: 'prod-e-3',
    name: 'Barboteuse Coton Bio Bébé Douceur',
    category: 'enfants',
    subcategory: 'Bébés',
    price: 8500,
    oldPrice: 13500,
    sizes: ['0-3 mois', '3-6 mois', '6-12 mois', '12-18 mois'],
    colors: [
      { name: 'Rose Poudré', hex: '#F7DCDA' },
      { name: 'Beige Écru', hex: '#FAF3E0' },
      { name: 'Blanc Coton', hex: '#FFFFFF' }
    ],
    stock: 18,
    rating: 5.0,
    reviewsCount: 27,
    badge: 'Petit Prix Bio',
    image: 'images/products/barboteuse-bebe-bio.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=85',
    description: 'Barboteuse tricotée en 100% coton biologique hypoallergénique. Boutons en bois naturel pour un habillage et un change faciles et tout en douceur.',
    characteristics: [
      { label: 'Certification', value: '100% Coton biologique certifié GOTS (aucun produit chimique)' },
      { label: 'Fermeture', value: 'Boutons-pression sans nickel à l\'entrejambe pour un change rapide' },
      { label: 'Col & Finitions', value: 'Col rond anti-frottement avec boutons décoratifs en bois d\'olivier' },
      { label: 'Propriétés', value: 'Hypoallergénique, respirant et ultra-doux pour les peaux fragiles' },
      { label: 'Entretien', value: 'Lavable en machine à 40°C, conserve toute sa douceur' }
    ]
  },

  // =================================================================
  // --- ACCESSOIRES ---
  // =================================================================
  {
    id: 'prod-a-1',
    name: 'Sac à Main Cuir Végétal Beige Royal',
    category: 'accessoires',
    subcategory: 'Sacs',
    price: 29500,
    oldPrice: 45000,
    sizes: ['Moyen (30x22 cm)'],
    colors: [
      { name: 'Beige Nude', hex: '#DDC9B7' },
      { name: 'Rose Pâle', hex: '#EBBAB9' },
      { name: 'Blanc Craie', hex: '#F8F6F0' }
    ],
    stock: 9,
    rating: 4.9,
    reviewsCount: 45,
    badge: 'Remise Exceptionnelle',
    image: 'images/products/sac-a-main-cuir-beige.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    description: 'Sac iconique en cuir texturé avec fermoir doré gravé DYKHA. Porté main ou bandoulière ajustable amovible pour une élégance sans égale.',
    characteristics: [
      { label: 'Matière', value: 'Cuir de vachette pleine fleur grainé au tannage végétal' },
      { label: 'Bijouterie', value: 'Fermoir et garnitures en laiton doré poli gravé DYKHA' },
      { label: 'Dimensions', value: 'Largeur 30 cm x Hauteur 22 cm x Profondeur 12 cm' },
      { label: 'Rangements', value: 'Compartiment central zippé + 2 poches intérieures smartphone/clés' },
      { label: 'Porté', value: 'Double anse rigide pour porté main + bandoulière cuir réglable' }
    ]
  },
  {
    id: 'prod-a-2',
    name: 'Montre Chronographe Mailles Dorées Gold Chic',
    category: 'accessoires',
    subcategory: 'Montres',
    price: 22500,
    oldPrice: 35000,
    sizes: ['Cadran 38mm'],
    colors: [
      { name: 'Or Jaune', hex: '#D4AF37' },
      { name: 'Or Rose', hex: '#B76E79' },
      { name: 'Argent Miroir', hex: '#C0C0C0' }
    ],
    stock: 11,
    rating: 4.8,
    reviewsCount: 38,
    badge: 'Baisse de Prix',
    image: 'images/products/montre-chronographe-or.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85',
    description: 'Montre analogique à mouvement quartz haute précision avec bracelet en maille milanaise. Résistante à l’eau et dotée d’un verre saphir anti-rayures.',
    characteristics: [
      { label: 'Mouvement', value: 'Quartz analogique japonais Miyota haute précision' },
      { label: 'Boîtier & Bracelet', value: 'Acier inoxydable 316L avec placage PVD doré inaltérable' },
      { label: 'Verre', value: 'Verre minéral saphir résistant aux rayures' },
      { label: 'Étanchéité', value: '3 ATM (résistance aux éclaboussures et lavage des mains)' },
      { label: 'Dimensions', value: 'Diamètre du cadran 38 mm, épaisseur extra-plate 8 mm' }
    ]
  },
  {
    id: 'prod-a-3',
    name: 'Parure Prestige Or 18 Carats & Diamants CZ',
    category: 'accessoires',
    subcategory: 'Bijoux Or & Argent',
    price: 42000,
    oldPrice: 65000,
    sizes: ['Standard'],
    colors: [
      { name: 'Or 18K', hex: '#E5C158' },
      { name: 'Argent 925', hex: '#D8D8D8' }
    ],
    stock: 6,
    rating: 5.0,
    reviewsCount: 52,
    badge: 'Offre Prestige',
    image: 'images/products/parure-bijoux-or.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85',
    description: 'Somptueuse parure comprenant un collier pendentif scintillant et des boucles d’oreilles pendantes plaquées or 18k serties d’oxydes de zirconium éclatants.',
    characteristics: [
      { label: 'Métal précieux', value: 'Laiton haute joaillerie plaqué Or 18 Carats (épaisseur 5 microns)' },
      { label: 'Pierres', value: 'Oxydes de Zirconium AAA+ taille brillant (éclat d\'un diamant)' },
      { label: 'Poinçon', value: 'Poinçon fabricant officiel certifiant la pureté du placage' },
      { label: 'Sécurité', value: 'Fermoir mousqueton renforcé & fermoirs poussettes belges' },
      { label: 'Écrin', value: 'Livré dans un coffret de prestige velours DYKHA avec certificat' }
    ]
  },
  {
    id: 'prod-a-4',
    name: 'Bracelet Jonc & Bague Argent Massif 925',
    category: 'accessoires',
    subcategory: 'Bijoux Or & Argent',
    price: 18500,
    oldPrice: 28000,
    sizes: ['Ajustable'],
    colors: [
      { name: 'Argent Pur 925', hex: '#E0E0E0' }
    ],
    stock: 14,
    rating: 4.9,
    reviewsCount: 29,
    badge: 'Argent Véritable',
    image: 'images/products/bracelet-bague-argent.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85',
    description: 'Ensemble jonc torsadé et bague gravée réalisés en argent fin 925 garanti avec poinçon officiel. Élégance intemporelle et éclat impérissable.',
    characteristics: [
      { label: 'Teneur en métal', value: 'Argent massif 925/1000 certifié avec poinçon officiel 925' },
      { label: 'Finition', value: 'Bain de rhodium éclat diamant (protection anti-noircissement)' },
      { label: 'Taille', value: 'Jonc ouvert ajustable à tous poignets & bague réglable (50 à 58)' },
      { label: 'Sécurité cutanée', value: '100% Hypoallergénique, garanti sans nickel, ni plomb, ni cadmium' },
      { label: 'Présentation', value: 'Pochon en suédine beige et chamoisine de nettoyage offerte' }
    ]
  },
  {
    id: 'prod-a-5',
    name: 'Lunettes de Soleil Femme Cat-Eye Rose Pêche',
    category: 'accessoires',
    subcategory: 'Lunettes de soleil Femme',
    price: 11500,
    oldPrice: 18000,
    sizes: ['Taille Unique'],
    colors: [
      { name: 'Monture Rose Poudré', hex: '#E8A7B2' },
      { name: 'Écaille Blonde', hex: '#A87954' },
      { name: 'Noir Glamour', hex: '#1C1C1C' }
    ],
    stock: 16,
    rating: 4.7,
    reviewsCount: 30,
    badge: 'Prix Promo',
    image: 'images/products/lunettes-soleil-femme.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85',
    description: 'Lunettes papillon ultra-glamour avec verres polarisés haute protection UV400. Branches fines rehaussées de détails dorés étincelants.',
    characteristics: [
      { label: 'Monture', value: 'Acétate de cellulose poli à la main et branches métalliques dorées' },
      { label: 'Verres', value: 'Verres polarisés dégradés bruns haute définition anti-reflets' },
      { label: 'Protection solaire', value: 'Catégorie 3 - Protection intégrale 100% UV400 (norme CE)' },
      { label: 'Confort', value: 'Plaquettes nasales ergonomiques intégrées sans frottement' },
      { label: 'Accessoires inclus', value: 'Étui rigide luxe estampillé DYKHA et lingette microfibre' }
    ]
  },
  {
    id: 'prod-a-6',
    name: 'Lunettes de Soleil Homme Aviateur Gold Polarized',
    category: 'accessoires',
    subcategory: 'Lunettes de soleil Homme',
    price: 13500,
    oldPrice: 21000,
    sizes: ['Taille Unique'],
    colors: [
      { name: 'Monture Or & Verres Verts', hex: '#34495E' },
      { name: 'Tout Noir Mat', hex: '#17202A' }
    ],
    stock: 13,
    rating: 4.8,
    reviewsCount: 24,
    badge: 'Polarisées',
    image: 'images/products/lunettes-soleil-homme.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=85',
    description: 'Modèle aviateur mythique avec monture métallique ultra-légère et verres polarisés anti-reflet. Protection maximale et allure charismatique.',
    characteristics: [
      { label: 'Monture', value: 'Alliage aluminium-magnésium ultra-léger et indéformable' },
      { label: 'Verres', value: 'Verres polarisés TAC couleur vert pilote G-15 anti-éblouissement' },
      { label: 'Protection', value: 'Filtre UV400 Catégorie 3 bloquant 100% des rayons UVA/UVB' },
      { label: 'Branches', value: 'Charnières à ressort flexibles adaptées à toutes morphologies' },
      { label: 'Accessoires', value: 'Étui rigide avec mousqueton et chiffon de nettoyage haute densité' }
    ]
  },
  {
    id: 'prod-a-7',
    name: 'Lunettes de Soleil Enfants Flexibles Anti-Choc',
    category: 'accessoires',
    subcategory: 'Lunettes Enfants',
    price: 7500,
    oldPrice: 12000,
    sizes: ['3-10 ans'],
    colors: [
      { name: 'Rose Bonbon', hex: '#FF69B4' },
      { name: 'Bleu Ciel', hex: '#87CEEB' },
      { name: 'Jaune Pastel', hex: '#FFFACD' }
    ],
    stock: 22,
    rating: 4.9,
    reviewsCount: 18,
    badge: 'Indestructible',
    image: 'images/products/lunettes-soleil-enfants.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=85',
    description: 'Lunettes pour enfants avec monture en silicone souple ultra-résistante et incassable. Verres UV400 Catégorie 3 pour protéger leurs yeux fragiles.',
    characteristics: [
      { label: 'Monture', value: 'Silicone TPEE flexible incassable, pliable à 360°' },
      { label: 'Verres', value: 'Polycarbonate anti-choc et anti-rayures avec polarisation protectrice' },
      { label: 'Sécurité sanitaire', value: 'Garanti 100% Sans BPA, sans phtalates, peinture atoxique' },
      { label: 'Indice de protection', value: 'Catégorie 3 UV400 (filtration totale des rayons nocifs)' },
      { label: 'Inclus', value: 'Cordon de maintien élastique ajustable au tour de tête' }
    ]
  },
  {
    id: 'prod-a-8',
    name: 'Lunettes de Vue Tendance Anti-Lumière Bleue',
    category: 'accessoires',
    subcategory: 'Lunettes de vue',
    price: 14000,
    oldPrice: 22500,
    sizes: ['Taille Unique'],
    colors: [
      { name: 'Translucide Champagne', hex: '#EFE7DA' },
      { name: 'Or Rosé & Acétate', hex: '#DEB887' },
      { name: 'Noir Classique', hex: '#212121' }
    ],
    stock: 15,
    rating: 4.8,
    reviewsCount: 36,
    badge: 'Anti-Fatigue',
    image: 'images/products/lunettes-vue-repos.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=85',
    description: 'Lunettes de repos légères dotées de verres filtrants contre la lumière bleue des écrans (téléphones, PC, tablettes). Confort visuel et style au quotidien.',
    characteristics: [
      { label: 'Monture', value: 'Acétate translucide premium finition champagne (poids plume 18g)' },
      { label: 'Technologie verres', value: 'Verres neutres filtrant 90% des rayonnements bleu-violet HEV' },
      { label: 'Bénéfices santé', value: 'Soulage la fatigue visuelle, prévient les maux de tête et favorise le sommeil' },
      { label: 'Traitement verres', value: 'Traitement anti-reflet, anti-traces et anti-poussière' },
      { label: 'Inclus', value: 'Étui de protection rigide et lingette microfibre antistatique' }
    ]
  },
  {
    id: 'prod-a-9',
    name: 'Sandales Mules à Brides Dorées Chic',
    category: 'accessoires',
    subcategory: 'Chaussures',
    price: 19000,
    oldPrice: 29000,
    sizes: ['37', '38', '39', '40', '41'],
    colors: [
      { name: 'Or Champagne', hex: '#D4AF37' },
      { name: 'Or Rosé', hex: '#B76E79' },
      { name: 'Argent Miroir', hex: '#C0C0C0' }
    ],
    stock: 10,
    rating: 4.9,
    reviewsCount: 22,
    badge: 'Super Promo',
    image: 'images/products/sandales-mules-dorees.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=85',
    description: 'Mules sophistiquées à brides fines dorées entrecroisées. Légères et d\'un confort absolu pour sublimer toutes vos tenues estivales et de fête.',
    characteristics: [
      { label: 'Matière', value: 'Cuir vegan métallisé or haute résistance' },
      { label: 'Talon', value: 'Petit talon bloc stable 5 cm pour confort prolongé' },
      { label: 'Semelle', value: 'Semelle intérieure rembourrée et semelle gomme antidérapante' },
      { label: 'Style', value: 'Brides asymétriques minimalistes élégantes' },
      { label: 'Occasion', value: 'Cocktails, mariages, soirées et quotidien chic' }
    ]
  }
];

const SOCIAL_CONTACTS = {
  phone: '+221 77 853 42 11',
  whatsappNumber: '221778534211',
  tiktok: 'https://tiktok.com/@dykhastore',
  instagram: 'https://instagram.com/dykha.store',
  facebook: 'https://facebook.com/dykhastore',
  google: 'https://maps.google.com/?q=DYKHA+STORE+Dakar',
  email: 'contact@dykhastore.com',
  address: 'Plateau & Almadies, Dakar, Sénégal'
};
