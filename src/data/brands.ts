export interface Brand {
  id: string
  name: string
  category: string
  description: string
  logoUrl: string | null
  displayOrder: number
}

export const brands: Brand[] = [
  {
    id: 'nestle',
    name: 'Nestlé',
    category: 'Food & Beverages',
    description: 'Global leader in nutrition, health, and wellness products.',
    logoUrl: null,
    displayOrder: 1,
  },
  {
    id: 'unilever-food-solutions',
    name: 'Unilever Food Solutions',
    category: 'Professional Foodservice',
    description: 'World-class sauces, seasonings, and food ingredients for professional kitchens.',
    logoUrl: null,
    displayOrder: 2,
  },
  {
    id: 'tabasco',
    name: 'Tabasco',
    category: 'Condiments & Sauces',
    description: 'Iconic hot sauce brand crafted on Avery Island since 1868.',
    logoUrl: null,
    displayOrder: 3,
  },
  {
    id: 'qbb',
    name: 'QBB',
    category: 'Dairy & Spreads',
    description: 'Premium quality butter and dairy products trusted across the Middle East.',
    logoUrl: null,
    displayOrder: 4,
  },
  {
    id: 'fragata',
    name: 'Fragata',
    category: 'Olives & Preserved Foods',
    description: 'Spanish heritage brand specialising in quality olives and preserved vegetables.',
    logoUrl: null,
    displayOrder: 5,
  },
  {
    id: 'hellmanns',
    name: "Hellmann's",
    category: 'Condiments & Sauces',
    description: 'The world\'s number one mayonnaise brand, known for rich, creamy quality.',
    logoUrl: null,
    displayOrder: 6,
  },
  {
    id: 'royal-oak',
    name: 'Royal Oak',
    category: 'Food Products',
    description: 'Quality food products meeting the highest standards for HORECA and retail.',
    logoUrl: null,
    displayOrder: 7,
  },
  {
    id: 'bavaria',
    name: 'Bavaria',
    category: 'Beverages',
    description: 'Premium malt beverages crafted with a 300-year Dutch brewing heritage.',
    logoUrl: null,
    displayOrder: 8,
  },
  {
    id: 'nellara',
    name: 'Nellara',
    category: 'Staples & Grains',
    description: 'Trusted Indian brand delivering quality rice, flour, and essential staples.',
    logoUrl: null,
    displayOrder: 9,
  },
  {
    id: 'mama',
    name: 'Mama',
    category: 'Instant Foods',
    description: 'Thailand\'s leading instant noodle brand, enjoyed across Asia and the world.',
    logoUrl: null,
    displayOrder: 10,
  },
  {
    id: 'zaffran',
    name: 'Zaffran',
    category: 'Spices & Seasonings',
    description: 'Authentic flavours and premium spice blends rooted in culinary tradition.',
    logoUrl: null,
    displayOrder: 11,
  },
  {
    id: 'sipa',
    name: 'Sipa',
    category: 'Food Products',
    description: 'Quality FMCG products distributed across the Middle East and beyond.',
    logoUrl: null,
    displayOrder: 12,
  },
  {
    id: 'american-classic',
    name: 'American Classic',
    category: 'Snacks & Confectionery',
    description: 'Classic American-style food products enjoyed by families worldwide.',
    logoUrl: null,
    displayOrder: 13,
  },
  {
    id: 'chatura',
    name: 'Chatura',
    category: 'Food Products',
    description: 'Trusted brand delivering quality products for everyday consumer needs.',
    logoUrl: null,
    displayOrder: 14,
  },
  {
    id: '717',
    name: '717',
    category: 'Beverages & Food',
    description: 'Premium food and beverage products meeting international quality standards.',
    logoUrl: null,
    displayOrder: 15,
  },
  {
    id: 'rexoguard',
    name: 'Rexoguard',
    category: 'Food Safety & Hygiene',
    description: 'Professional-grade hygiene and food safety products for the food industry.',
    logoUrl: null,
    displayOrder: 16,
  },
]

export default brands
