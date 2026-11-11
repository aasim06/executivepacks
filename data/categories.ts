export interface PackagingProduct {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  hoverImage?: string;
  badge: string;
  badgeColor: string;
  moq: number;
  startingPrice: string;
  leadTime: string;
  materials: string[];
  features: string[];
  dimensions: {
    standard: string;
    customizable: boolean;
  };
  pricingTiers: {
    qty: string;
    unitPrice: string;
    savings?: string;
  }[];
}

export const CATEGORIES_LIST = [
  { id: 'all', label: 'All Packaging' },
  { id: 'food-bakery', label: 'Food & Bakery' },
  { id: 'cosmetics', label: 'Cosmetics & Beauty' },
  { id: 'apparel', label: 'Apparel & Fashion' },
  { id: 'rigid-luxury', label: 'Rigid Luxury & Gift' },
  { id: 'shipping-mailers', label: 'Mailers & Corrugated' },
  { id: 'mylar-bags', label: 'Mylar Bags & Pouches' },
  { id: 'custom-boxes', label: 'Retail & Display' },
] as const;

export const PACKAGING_PRODUCTS: PackagingProduct[] = [
  {
    "id": "custom-frozen-food-boxes",
    "name": "Custom Frozen Food Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured frozen food boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Printed-Frozen-Food-Boxes.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Customized-Frozen-Food-Boxes.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-cereal-boxes",
    "name": "Custom Cereal Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured cereal boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Cereal-Boxes-Wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Customized-Cereal-Boxes.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-chocolate-boxes",
    "name": "Custom Chocolate Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured chocolate boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Printed-Chocolate-Boxes.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/custom-chocolate-boxes-wholesale.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-burger-boxes",
    "name": "Custom Burger Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured burger boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-burger-boxes-wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Cardboard-burger-boxes-1.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-happy-meal-boxes",
    "name": "Custom Happy Meal Boxes",
    "category": "custom-boxes",
    "categoryLabel": "Retail & Custom Boxes",
    "tagline": "Wholesale custom manufactured happy meal boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/custom-happy-meal-boxes-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/custom-happy-meal-boxes-02.webp",
    "badge": "Custom Printed",
    "badgeColor": "bg-stone-100 text-stone-800 border-stone-300",
    "moq": 250,
    "startingPrice": "$0.45 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "350 GSM Bleached SBS Cardstock",
      "Eco-Friendly Soy Inks",
      "Matte / Gloss Coating"
    ],
    "features": [
      "Custom die-cut sizing",
      "CMYK full color printing",
      "Flat shipping for low freight cost"
    ],
    "dimensions": {
      "standard": "200mm × 150mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.81"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.59",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.50",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.45",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-sandwich-boxes",
    "name": "Custom Sandwich Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured sandwich boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Sandwich-Boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Sandwich-Boxes-3.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-food-boats",
    "name": "Custom Food Boats",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured food boats with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Food-Boats-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Food-Boats-03.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-fast-food-boxes",
    "name": "Custom Fast Food Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured fast food boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-fast-food-packaging-boxes-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-fast-food-packaging-boxes-02.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-soap-boxes",
    "name": "Custom Soap Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured soap boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Soap-Boxes-Wholesale-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Soap-Boxes-Wholesale-With-Logo-1.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "100mm × 70mm × 40mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-lip-balm-boxes",
    "name": "Custom Lip Balm Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured lip balm boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2024/02/Customised-Lip-Balm-Boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2024/02/lip-balm-packaging-boxes-1-1.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "25mm × 25mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-lipstick-boxes",
    "name": "Custom Lipstick Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured lipstick boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2024/02/Custom-Printed-Lipstick-Boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2024/02/Custom-Lipstick-Packaging-Boxes-1.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "25mm × 25mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-eyelash-boxes",
    "name": "Custom Eyelash Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured eyelash boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/eyelash-boxes-with-window-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/Eyelash-Boxes-wholesale.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "100mm × 70mm × 40mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-bath-bomb-boxes",
    "name": "Custom Bath Bomb Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured bath bomb boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Bath-Bomb-Boxes-With-Logo.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Bath-Bomb-Box-Packaging.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "100mm × 70mm × 40mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-perfume-boxes",
    "name": "Custom Perfume Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured perfume boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Perfume-Boxes-Wholesale-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Customised-Perfume-Boxes-Packaging-1.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "75mm × 75mm × 140mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-beard-oil-boxes",
    "name": "Custom Beard Oil Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured beard oil boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/custom-beard-oil-boxes.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/beard-packaging-boxes.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "100mm × 70mm × 40mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-serum-boxes",
    "name": "Custom Serum Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured serum boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Custom-Serum-Boxes-Wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/10/Customized-Serum-Boxes.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "100mm × 70mm × 40mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-pizza-boxes",
    "name": "Custom Pizza Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured pizza boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/custom-pizza-boxes-wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/pizza-packaging-boxes-wholesale.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "320mm × 320mm × 45mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-pie-boxes",
    "name": "Custom Pie Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured pie boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Pie-Boxes-Wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Pie-Boxes-With-Logo.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-cake-boxes",
    "name": "Custom Cake Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured cake boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/cake-box-5.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/cake-box-2.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "250mm × 250mm × 150mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-donut-boxes",
    "name": "Custom Donut Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured donut boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Donut-Boxes-With-Logo.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Donut-Boxes-01.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-lollipop-boxes",
    "name": "Custom Lollipop Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured lollipop boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Lollipop-Boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Lollipop-Boxes-2.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-candy-boxes",
    "name": "Custom Candy Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured candy boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Candy-Boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Candy-Boxes-2.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-coffee-boxes",
    "name": "Custom Coffee Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured coffee boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/11/Custom-Coffee-Boxes-UK.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Coffee-Boxes-2.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-ice-cream-boxes",
    "name": "Custom Ice Cream Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured ice cream boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Ice-Cream-Boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Ice-Cream-Boxes-2.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-t-shirt-boxes",
    "name": "Custom T Shirt Boxes",
    "category": "apparel",
    "categoryLabel": "Apparel & Fashion",
    "tagline": "Wholesale custom manufactured t shirt boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/Custom-Shirt-Boxes-With-Logo-2.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/Customised-Shirt-Boxes-Wholesale-2.webp",
    "badge": "Premium Fashion Grade",
    "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "moq": 150,
    "startingPrice": "$0.85 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "450 GSM Heavy Duplex / Kraft Board",
      "Anti-Scuff Lamination",
      "Tissue Paper Lining"
    ],
    "features": [
      "Two-piece lid & base setup",
      "High-end apparel presentation",
      "Sturdy structural sidewalls"
    ],
    "dimensions": {
      "standard": "360mm × 260mm × 60mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "150 pcs",
        "unitPrice": "$1.53"
      },
      {
        "qty": "600 pcs",
        "unitPrice": "$1.10",
        "savings": "28% OFF"
      },
      {
        "qty": "1500 pcs",
        "unitPrice": "$0.94",
        "savings": "39% OFF"
      },
      {
        "qty": "3000+ pcs",
        "unitPrice": "$0.85",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-tie-boxes",
    "name": "Custom Tie Boxes",
    "category": "apparel",
    "categoryLabel": "Apparel & Fashion",
    "tagline": "Wholesale custom manufactured tie boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/Tie-Boxes-wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/Custom-bow-tie-boxes.webp",
    "badge": "Premium Fashion Grade",
    "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "moq": 150,
    "startingPrice": "$0.85 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "450 GSM Heavy Duplex / Kraft Board",
      "Anti-Scuff Lamination",
      "Tissue Paper Lining"
    ],
    "features": [
      "Two-piece lid & base setup",
      "High-end apparel presentation",
      "Sturdy structural sidewalls"
    ],
    "dimensions": {
      "standard": "180mm × 120mm × 60mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "150 pcs",
        "unitPrice": "$1.53"
      },
      {
        "qty": "600 pcs",
        "unitPrice": "$1.10",
        "savings": "28% OFF"
      },
      {
        "qty": "1500 pcs",
        "unitPrice": "$0.94",
        "savings": "39% OFF"
      },
      {
        "qty": "3000+ pcs",
        "unitPrice": "$0.85",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-socks-boxes",
    "name": "Custom Socks Boxes",
    "category": "apparel",
    "categoryLabel": "Apparel & Fashion",
    "tagline": "Wholesale custom manufactured socks boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/Customized-Socks-Boxes.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/Custom-Printed-Socks-Boxes.webp",
    "badge": "Premium Fashion Grade",
    "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "moq": 150,
    "startingPrice": "$0.85 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "450 GSM Heavy Duplex / Kraft Board",
      "Anti-Scuff Lamination",
      "Tissue Paper Lining"
    ],
    "features": [
      "Two-piece lid & base setup",
      "High-end apparel presentation",
      "Sturdy structural sidewalls"
    ],
    "dimensions": {
      "standard": "180mm × 120mm × 60mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "150 pcs",
        "unitPrice": "$1.53"
      },
      {
        "qty": "600 pcs",
        "unitPrice": "$1.10",
        "savings": "28% OFF"
      },
      {
        "qty": "1500 pcs",
        "unitPrice": "$0.94",
        "savings": "39% OFF"
      },
      {
        "qty": "3000+ pcs",
        "unitPrice": "$0.85",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-lingerie-boxes",
    "name": "Custom Lingerie Boxes",
    "category": "apparel",
    "categoryLabel": "Apparel & Fashion",
    "tagline": "Wholesale custom manufactured lingerie boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2024/01/lingerie-boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Lingerie-Boxes-02.webp",
    "badge": "Premium Fashion Grade",
    "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "moq": 150,
    "startingPrice": "$0.85 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "450 GSM Heavy Duplex / Kraft Board",
      "Anti-Scuff Lamination",
      "Tissue Paper Lining"
    ],
    "features": [
      "Two-piece lid & base setup",
      "High-end apparel presentation",
      "Sturdy structural sidewalls"
    ],
    "dimensions": {
      "standard": "180mm × 120mm × 60mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "150 pcs",
        "unitPrice": "$1.53"
      },
      {
        "qty": "600 pcs",
        "unitPrice": "$1.10",
        "savings": "28% OFF"
      },
      {
        "qty": "1500 pcs",
        "unitPrice": "$0.94",
        "savings": "39% OFF"
      },
      {
        "qty": "3000+ pcs",
        "unitPrice": "$0.85",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-belt-boxes",
    "name": "Custom Belt Boxes",
    "category": "apparel",
    "categoryLabel": "Apparel & Fashion",
    "tagline": "Wholesale custom manufactured belt boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-belt-boxes-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-belt-boxes-02.webp",
    "badge": "Premium Fashion Grade",
    "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "moq": 150,
    "startingPrice": "$0.85 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "450 GSM Heavy Duplex / Kraft Board",
      "Anti-Scuff Lamination",
      "Tissue Paper Lining"
    ],
    "features": [
      "Two-piece lid & base setup",
      "High-end apparel presentation",
      "Sturdy structural sidewalls"
    ],
    "dimensions": {
      "standard": "180mm × 120mm × 60mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "150 pcs",
        "unitPrice": "$1.53"
      },
      {
        "qty": "600 pcs",
        "unitPrice": "$1.10",
        "savings": "28% OFF"
      },
      {
        "qty": "1500 pcs",
        "unitPrice": "$0.94",
        "savings": "39% OFF"
      },
      {
        "qty": "3000+ pcs",
        "unitPrice": "$0.85",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-shoe-boxes",
    "name": "Custom Shoe Boxes",
    "category": "apparel",
    "categoryLabel": "Apparel & Fashion",
    "tagline": "Wholesale custom manufactured shoe boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Shoe-Boxes-01.jpg",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Shoe-Boxes-02.jpg",
    "badge": "Premium Fashion Grade",
    "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "moq": 150,
    "startingPrice": "$0.85 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "450 GSM Heavy Duplex / Kraft Board",
      "Anti-Scuff Lamination",
      "Tissue Paper Lining"
    ],
    "features": [
      "Two-piece lid & base setup",
      "High-end apparel presentation",
      "Sturdy structural sidewalls"
    ],
    "dimensions": {
      "standard": "340mm × 200mm × 120mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "150 pcs",
        "unitPrice": "$1.53"
      },
      {
        "qty": "600 pcs",
        "unitPrice": "$1.10",
        "savings": "28% OFF"
      },
      {
        "qty": "1500 pcs",
        "unitPrice": "$0.94",
        "savings": "39% OFF"
      },
      {
        "qty": "3000+ pcs",
        "unitPrice": "$0.85",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-rigid-apparel-boxes",
    "name": "Custom Rigid Apparel Boxes",
    "category": "apparel",
    "categoryLabel": "Apparel & Fashion",
    "tagline": "Wholesale custom manufactured rigid apparel boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-rigid-apparel-boxes-01-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-rigid-apparel-boxes-02-1.webp",
    "badge": "Premium Fashion Grade",
    "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "moq": 150,
    "startingPrice": "$0.85 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "450 GSM Heavy Duplex / Kraft Board",
      "Anti-Scuff Lamination",
      "Tissue Paper Lining"
    ],
    "features": [
      "Two-piece lid & base setup",
      "High-end apparel presentation",
      "Sturdy structural sidewalls"
    ],
    "dimensions": {
      "standard": "180mm × 120mm × 60mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "150 pcs",
        "unitPrice": "$1.53"
      },
      {
        "qty": "600 pcs",
        "unitPrice": "$1.10",
        "savings": "28% OFF"
      },
      {
        "qty": "1500 pcs",
        "unitPrice": "$0.94",
        "savings": "39% OFF"
      },
      {
        "qty": "3000+ pcs",
        "unitPrice": "$0.85",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-sunglasses-boxes",
    "name": "Custom Sunglasses Boxes",
    "category": "apparel",
    "categoryLabel": "Apparel & Fashion",
    "tagline": "Wholesale custom manufactured sunglasses boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2026/02/Custom-Printed-Sunglasses-Boxes.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2026/08/Custom-Sunglasses-Boxes-With-Logo-1-1.webp",
    "badge": "Premium Fashion Grade",
    "badgeColor": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "moq": 150,
    "startingPrice": "$0.85 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "450 GSM Heavy Duplex / Kraft Board",
      "Anti-Scuff Lamination",
      "Tissue Paper Lining"
    ],
    "features": [
      "Two-piece lid & base setup",
      "High-end apparel presentation",
      "Sturdy structural sidewalls"
    ],
    "dimensions": {
      "standard": "180mm × 120mm × 60mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "150 pcs",
        "unitPrice": "$1.53"
      },
      {
        "qty": "600 pcs",
        "unitPrice": "$1.10",
        "savings": "28% OFF"
      },
      {
        "qty": "1500 pcs",
        "unitPrice": "$0.94",
        "savings": "39% OFF"
      },
      {
        "qty": "3000+ pcs",
        "unitPrice": "$0.85",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-presentation-boxes",
    "name": "Custom Presentation Boxes",
    "category": "rigid-luxury",
    "categoryLabel": "Rigid Luxury & Gift",
    "tagline": "Wholesale custom manufactured presentation boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Presentation-Boxes-Wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Personalised-Presentation-Boxes.webp",
    "badge": "1400 GSM Handcrafted Rigid",
    "badgeColor": "bg-amber-100 text-amber-900 border-amber-300",
    "moq": 100,
    "startingPrice": "$1.65 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "1400 GSM Heavy Greyboard Core",
      "Art Paper / Specialty Linen Wrap",
      "Precision Cut EVA Foam Insert"
    ],
    "features": [
      "Rigid non-collapsible build",
      "Magnetic snap / Ribbon pull tab",
      "Bespoke custom die-cut cavity"
    ],
    "dimensions": {
      "standard": "260mm × 180mm × 70mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "100 pcs",
        "unitPrice": "$2.97"
      },
      {
        "qty": "400 pcs",
        "unitPrice": "$2.15",
        "savings": "28% OFF"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$1.81",
        "savings": "39% OFF"
      },
      {
        "qty": "2000+ pcs",
        "unitPrice": "$1.65",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-kraft-boxes",
    "name": "Custom Kraft Boxes",
    "category": "shipping-mailers",
    "categoryLabel": "Eco Kraft Boxes",
    "tagline": "Wholesale custom manufactured kraft boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/kraft-boxes-wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/printed-kraft-boxes.webp",
    "badge": "100% Recycled Kraft",
    "badgeColor": "bg-stone-200 text-stone-900 border-stone-400",
    "moq": 200,
    "startingPrice": "$0.42 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "100% Recycled Brown Kraft",
      "Organic Water-Based Inks"
    ],
    "features": [
      "Biodegradable & compostable",
      "Rustic organic aesthetic",
      "High tensile tear resistance"
    ],
    "dimensions": {
      "standard": "200mm × 150mm × 70mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.76"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.55",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.46",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.42",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-corrugated-boxes",
    "name": "Custom Corrugated Boxes",
    "category": "shipping-mailers",
    "categoryLabel": "Shipping & Mailers",
    "tagline": "Wholesale custom manufactured corrugated boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Corrugated-Boxes-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Corrugated-Boxes-02.webp",
    "badge": "Drop-Tested Corrugated (32 ECT)",
    "badgeColor": "bg-blue-100 text-blue-800 border-blue-300",
    "moq": 100,
    "startingPrice": "$0.65 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "E-Flute / B-Flute Corrugated Board",
      "Kraft / Bleached White Top Liner",
      "Crush-Resistant Fluting"
    ],
    "features": [
      "Roll-end tuck-front design",
      "Double-wall crush protection",
      "Inside & outside CMYK printing"
    ],
    "dimensions": {
      "standard": "300mm × 220mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "100 pcs",
        "unitPrice": "$1.17"
      },
      {
        "qty": "400 pcs",
        "unitPrice": "$0.85",
        "savings": "28% OFF"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.72",
        "savings": "39% OFF"
      },
      {
        "qty": "2000+ pcs",
        "unitPrice": "$0.65",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-display-boxes",
    "name": "Custom Display Boxes",
    "category": "custom-boxes",
    "categoryLabel": "Retail & Custom Boxes",
    "tagline": "Wholesale custom manufactured display boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Display-Boxes-wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Display-Boxes-2.webp",
    "badge": "Custom Printed",
    "badgeColor": "bg-stone-100 text-stone-800 border-stone-300",
    "moq": 250,
    "startingPrice": "$0.45 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "350 GSM Bleached SBS Cardstock",
      "Eco-Friendly Soy Inks",
      "Matte / Gloss Coating"
    ],
    "features": [
      "Custom die-cut sizing",
      "CMYK full color printing",
      "Flat shipping for low freight cost"
    ],
    "dimensions": {
      "standard": "200mm × 150mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.81"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.59",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.50",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.45",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-pyramid-boxes",
    "name": "Custom Pyramid Boxes",
    "category": "custom-boxes",
    "categoryLabel": "Retail & Custom Boxes",
    "tagline": "Wholesale custom manufactured pyramid boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/custom-pyramid-boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Pyramid-Boxes-04.webp",
    "badge": "Custom Printed",
    "badgeColor": "bg-stone-100 text-stone-800 border-stone-300",
    "moq": 250,
    "startingPrice": "$0.45 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "350 GSM Bleached SBS Cardstock",
      "Eco-Friendly Soy Inks",
      "Matte / Gloss Coating"
    ],
    "features": [
      "Custom die-cut sizing",
      "CMYK full color printing",
      "Flat shipping for low freight cost"
    ],
    "dimensions": {
      "standard": "200mm × 150mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.81"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.59",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.50",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.45",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-halloween-boxes",
    "name": "Custom Halloween Boxes",
    "category": "custom-boxes",
    "categoryLabel": "Retail & Custom Boxes",
    "tagline": "Wholesale custom manufactured halloween boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Printed-halloween.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-halloween-Packaging.webp",
    "badge": "Custom Printed",
    "badgeColor": "bg-stone-100 text-stone-800 border-stone-300",
    "moq": 250,
    "startingPrice": "$0.45 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "350 GSM Bleached SBS Cardstock",
      "Eco-Friendly Soy Inks",
      "Matte / Gloss Coating"
    ],
    "features": [
      "Custom die-cut sizing",
      "CMYK full color printing",
      "Flat shipping for low freight cost"
    ],
    "dimensions": {
      "standard": "200mm × 150mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.81"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.59",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.50",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.45",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-cube-boxes",
    "name": "Custom Cube Boxes",
    "category": "custom-boxes",
    "categoryLabel": "Retail & Custom Boxes",
    "tagline": "Wholesale custom manufactured cube boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Cube-Boxes-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Cube-Boxes-3.webp",
    "badge": "Custom Printed",
    "badgeColor": "bg-stone-100 text-stone-800 border-stone-300",
    "moq": 250,
    "startingPrice": "$0.45 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "350 GSM Bleached SBS Cardstock",
      "Eco-Friendly Soy Inks",
      "Matte / Gloss Coating"
    ],
    "features": [
      "Custom die-cut sizing",
      "CMYK full color printing",
      "Flat shipping for low freight cost"
    ],
    "dimensions": {
      "standard": "200mm × 150mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.81"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.59",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.50",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.45",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-mailer-boxes",
    "name": "Custom Mailer Boxes",
    "category": "shipping-mailers",
    "categoryLabel": "Shipping & Mailers",
    "tagline": "Wholesale custom manufactured mailer boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/mailer-boxes-wholesale.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2023/12/earlock-mailer-boxes.webp",
    "badge": "Drop-Tested Corrugated (32 ECT)",
    "badgeColor": "bg-blue-100 text-blue-800 border-blue-300",
    "moq": 100,
    "startingPrice": "$0.65 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "E-Flute / B-Flute Corrugated Board",
      "Kraft / Bleached White Top Liner",
      "Crush-Resistant Fluting"
    ],
    "features": [
      "Roll-end tuck-front design",
      "Double-wall crush protection",
      "Inside & outside CMYK printing"
    ],
    "dimensions": {
      "standard": "300mm × 220mm × 80mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "100 pcs",
        "unitPrice": "$1.17"
      },
      {
        "qty": "400 pcs",
        "unitPrice": "$0.85",
        "savings": "28% OFF"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.72",
        "savings": "39% OFF"
      },
      {
        "qty": "2000+ pcs",
        "unitPrice": "$0.65",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-shaped-mylar-bags",
    "name": "Custom Shaped Mylar Bags",
    "category": "mylar-bags",
    "categoryLabel": "Mylar Barrier Pouches",
    "tagline": "Wholesale custom manufactured shaped mylar bags with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/11/Custom-Shaped-Mylar-Bags-wholesale-UK.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Custom-Shaped-Mylar-Bags-02.webp",
    "badge": "Airtight Smell-Proof Barrier",
    "badgeColor": "bg-purple-100 text-purple-800 border-purple-300",
    "moq": 500,
    "startingPrice": "$0.22 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Multi-Layer Aluminum Foil / PET / PE",
      "Matte Holographic Finish",
      "Heavy-Duty Resealable Zipper"
    ],
    "features": [
      "100% smell-proof & moisture barrier",
      "Heat-sealable tear notch",
      "Holographic / Spot UV metallic options"
    ],
    "dimensions": {
      "standard": "100mm (W) × 150mm (H) + 30mm Bottom Gusset",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "500 pcs",
        "unitPrice": "$0.40"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.29",
        "savings": "28% OFF"
      },
      {
        "qty": "5000 pcs",
        "unitPrice": "$0.24",
        "savings": "39% OFF"
      },
      {
        "qty": "10000+ pcs",
        "unitPrice": "$0.22",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-vacuum-seal-mylar-bags",
    "name": "Custom Vacuum Seal Mylar Bags",
    "category": "mylar-bags",
    "categoryLabel": "Mylar Barrier Pouches",
    "tagline": "Wholesale custom manufactured vacuum seal mylar bags with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Custom-Mylar-Vacuum-Seal-Bags-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Custom-Mylar-Vacuum-Seal-Bags-02.webp",
    "badge": "Airtight Smell-Proof Barrier",
    "badgeColor": "bg-purple-100 text-purple-800 border-purple-300",
    "moq": 500,
    "startingPrice": "$0.22 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Multi-Layer Aluminum Foil / PET / PE",
      "Matte Holographic Finish",
      "Heavy-Duty Resealable Zipper"
    ],
    "features": [
      "100% smell-proof & moisture barrier",
      "Heat-sealable tear notch",
      "Holographic / Spot UV metallic options"
    ],
    "dimensions": {
      "standard": "100mm (W) × 150mm (H) + 30mm Bottom Gusset",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "500 pcs",
        "unitPrice": "$0.40"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.29",
        "savings": "28% OFF"
      },
      {
        "qty": "5000 pcs",
        "unitPrice": "$0.24",
        "savings": "39% OFF"
      },
      {
        "qty": "10000+ pcs",
        "unitPrice": "$0.22",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-mylar-ziplock-bags",
    "name": "Custom Mylar Ziplock Bags",
    "category": "mylar-bags",
    "categoryLabel": "Mylar Barrier Pouches",
    "tagline": "Wholesale custom manufactured mylar ziplock bags with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/11/Mylar-Ziplock-Bags-03.jpg",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/11/Mylar-Ziplock-Bags-02-1-1.webp",
    "badge": "Airtight Smell-Proof Barrier",
    "badgeColor": "bg-purple-100 text-purple-800 border-purple-300",
    "moq": 500,
    "startingPrice": "$0.22 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Multi-Layer Aluminum Foil / PET / PE",
      "Matte Holographic Finish",
      "Heavy-Duty Resealable Zipper"
    ],
    "features": [
      "100% smell-proof & moisture barrier",
      "Heat-sealable tear notch",
      "Holographic / Spot UV metallic options"
    ],
    "dimensions": {
      "standard": "100mm (W) × 150mm (H) + 30mm Bottom Gusset",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "500 pcs",
        "unitPrice": "$0.40"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.29",
        "savings": "28% OFF"
      },
      {
        "qty": "5000 pcs",
        "unitPrice": "$0.24",
        "savings": "39% OFF"
      },
      {
        "qty": "10000+ pcs",
        "unitPrice": "$0.22",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-mylar-food-bags",
    "name": "Custom Mylar Food Bags",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured mylar food bags with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/custom-mylar-food-bags-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/custom-mylar-food-bags-02.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-holographic-mylar-bags",
    "name": "Custom Holographic Mylar Bags",
    "category": "mylar-bags",
    "categoryLabel": "Mylar Barrier Pouches",
    "tagline": "Wholesale custom manufactured holographic mylar bags with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Holographic-Mylar-Bags-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Holographic-Mylar-Bags-04.webp",
    "badge": "Airtight Smell-Proof Barrier",
    "badgeColor": "bg-purple-100 text-purple-800 border-purple-300",
    "moq": 500,
    "startingPrice": "$0.22 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Multi-Layer Aluminum Foil / PET / PE",
      "Matte Holographic Finish",
      "Heavy-Duty Resealable Zipper"
    ],
    "features": [
      "100% smell-proof & moisture barrier",
      "Heat-sealable tear notch",
      "Holographic / Spot UV metallic options"
    ],
    "dimensions": {
      "standard": "100mm (W) × 150mm (H) + 30mm Bottom Gusset",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "500 pcs",
        "unitPrice": "$0.40"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.29",
        "savings": "28% OFF"
      },
      {
        "qty": "5000 pcs",
        "unitPrice": "$0.24",
        "savings": "39% OFF"
      },
      {
        "qty": "10000+ pcs",
        "unitPrice": "$0.22",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-die-cut-mylar-bags",
    "name": "Custom Die Cut Mylar Bags",
    "category": "mylar-bags",
    "categoryLabel": "Mylar Barrier Pouches",
    "tagline": "Wholesale custom manufactured die cut mylar bags with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Die-cut-mylar-bags-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Die-cut-mylar-bags-02.webp",
    "badge": "Airtight Smell-Proof Barrier",
    "badgeColor": "bg-purple-100 text-purple-800 border-purple-300",
    "moq": 500,
    "startingPrice": "$0.22 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Multi-Layer Aluminum Foil / PET / PE",
      "Matte Holographic Finish",
      "Heavy-Duty Resealable Zipper"
    ],
    "features": [
      "100% smell-proof & moisture barrier",
      "Heat-sealable tear notch",
      "Holographic / Spot UV metallic options"
    ],
    "dimensions": {
      "standard": "100mm (W) × 150mm (H) + 30mm Bottom Gusset",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "500 pcs",
        "unitPrice": "$0.40"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.29",
        "savings": "28% OFF"
      },
      {
        "qty": "5000 pcs",
        "unitPrice": "$0.24",
        "savings": "39% OFF"
      },
      {
        "qty": "10000+ pcs",
        "unitPrice": "$0.22",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-cookies-mylar-bags",
    "name": "Custom Cookies Mylar Bags",
    "category": "mylar-bags",
    "categoryLabel": "Mylar Barrier Pouches",
    "tagline": "Wholesale custom manufactured cookies mylar bags with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/cookies-mylar-bags-01-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/cookies-mylar-bags-02-1.webp",
    "badge": "Airtight Smell-Proof Barrier",
    "badgeColor": "bg-purple-100 text-purple-800 border-purple-300",
    "moq": 500,
    "startingPrice": "$0.22 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Multi-Layer Aluminum Foil / PET / PE",
      "Matte Holographic Finish",
      "Heavy-Duty Resealable Zipper"
    ],
    "features": [
      "100% smell-proof & moisture barrier",
      "Heat-sealable tear notch",
      "Holographic / Spot UV metallic options"
    ],
    "dimensions": {
      "standard": "100mm (W) × 150mm (H) + 30mm Bottom Gusset",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "500 pcs",
        "unitPrice": "$0.40"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.29",
        "savings": "28% OFF"
      },
      {
        "qty": "5000 pcs",
        "unitPrice": "$0.24",
        "savings": "39% OFF"
      },
      {
        "qty": "10000+ pcs",
        "unitPrice": "$0.22",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-smell-proof-mylar-bags",
    "name": "Custom Smell Proof Mylar Bags",
    "category": "mylar-bags",
    "categoryLabel": "Mylar Barrier Pouches",
    "tagline": "Wholesale custom manufactured smell proof mylar bags with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Smell-Proof-Mylar-Bags-01-1.jpg",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Smell-Proof-Mylar-Bags-UK-04-1.webp",
    "badge": "Airtight Smell-Proof Barrier",
    "badgeColor": "bg-purple-100 text-purple-800 border-purple-300",
    "moq": 500,
    "startingPrice": "$0.22 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Multi-Layer Aluminum Foil / PET / PE",
      "Matte Holographic Finish",
      "Heavy-Duty Resealable Zipper"
    ],
    "features": [
      "100% smell-proof & moisture barrier",
      "Heat-sealable tear notch",
      "Holographic / Spot UV metallic options"
    ],
    "dimensions": {
      "standard": "100mm (W) × 150mm (H) + 30mm Bottom Gusset",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "500 pcs",
        "unitPrice": "$0.40"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.29",
        "savings": "28% OFF"
      },
      {
        "qty": "5000 pcs",
        "unitPrice": "$0.24",
        "savings": "39% OFF"
      },
      {
        "qty": "10000+ pcs",
        "unitPrice": "$0.22",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-rigid-gift-boxes",
    "name": "Custom Rigid Gift Boxes",
    "category": "rigid-luxury",
    "categoryLabel": "Rigid Luxury & Gift",
    "tagline": "Wholesale custom manufactured rigid gift boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-rigid-gift-boxes-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-rigid-gift-boxes-02.webp",
    "badge": "1400 GSM Handcrafted Rigid",
    "badgeColor": "bg-amber-100 text-amber-900 border-amber-300",
    "moq": 100,
    "startingPrice": "$1.65 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "1400 GSM Heavy Greyboard Core",
      "Art Paper / Specialty Linen Wrap",
      "Precision Cut EVA Foam Insert"
    ],
    "features": [
      "Rigid non-collapsible build",
      "Magnetic snap / Ribbon pull tab",
      "Bespoke custom die-cut cavity"
    ],
    "dimensions": {
      "standard": "260mm × 180mm × 70mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "100 pcs",
        "unitPrice": "$2.97"
      },
      {
        "qty": "400 pcs",
        "unitPrice": "$2.15",
        "savings": "28% OFF"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$1.81",
        "savings": "39% OFF"
      },
      {
        "qty": "2000+ pcs",
        "unitPrice": "$1.65",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-rigid-slide-boxes",
    "name": "Custom Rigid Slide Boxes",
    "category": "rigid-luxury",
    "categoryLabel": "Rigid Luxury & Gift",
    "tagline": "Wholesale custom manufactured rigid slide boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/Custom-Rigid-Slide-boxes-01-1-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-Rigid-Slide-boxes-02.webp",
    "badge": "1400 GSM Handcrafted Rigid",
    "badgeColor": "bg-amber-100 text-amber-900 border-amber-300",
    "moq": 100,
    "startingPrice": "$1.65 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "1400 GSM Heavy Greyboard Core",
      "Art Paper / Specialty Linen Wrap",
      "Precision Cut EVA Foam Insert"
    ],
    "features": [
      "Rigid non-collapsible build",
      "Magnetic snap / Ribbon pull tab",
      "Bespoke custom die-cut cavity"
    ],
    "dimensions": {
      "standard": "260mm × 180mm × 70mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "100 pcs",
        "unitPrice": "$2.97"
      },
      {
        "qty": "400 pcs",
        "unitPrice": "$2.15",
        "savings": "28% OFF"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$1.81",
        "savings": "39% OFF"
      },
      {
        "qty": "2000+ pcs",
        "unitPrice": "$1.65",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-foldable-rigid-boxes",
    "name": "Custom Foldable Rigid Boxes",
    "category": "rigid-luxury",
    "categoryLabel": "Rigid Luxury & Gift",
    "tagline": "Wholesale custom manufactured foldable rigid boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-foldable-rigid-boxes-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-foldable-rigid-boxes-02.webp",
    "badge": "1400 GSM Handcrafted Rigid",
    "badgeColor": "bg-amber-100 text-amber-900 border-amber-300",
    "moq": 100,
    "startingPrice": "$1.65 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "1400 GSM Heavy Greyboard Core",
      "Art Paper / Specialty Linen Wrap",
      "Precision Cut EVA Foam Insert"
    ],
    "features": [
      "Rigid non-collapsible build",
      "Magnetic snap / Ribbon pull tab",
      "Bespoke custom die-cut cavity"
    ],
    "dimensions": {
      "standard": "260mm × 180mm × 70mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "100 pcs",
        "unitPrice": "$2.97"
      },
      {
        "qty": "400 pcs",
        "unitPrice": "$2.15",
        "savings": "28% OFF"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$1.81",
        "savings": "39% OFF"
      },
      {
        "qty": "2000+ pcs",
        "unitPrice": "$1.65",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-two-piece-rigid-boxes",
    "name": "Custom Two Piece Rigid Boxes",
    "category": "food-bakery",
    "categoryLabel": "Food & Bakery",
    "tagline": "Wholesale custom manufactured two piece rigid boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/two-piece-Rigid-Boxes-02-1-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2025/12/two-piece-Rigid-Boxes-UK-1.webp",
    "badge": "100% Food-Grade Certified",
    "badgeColor": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "moq": 250,
    "startingPrice": "$0.38 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "Food-Grade Virgin Kraft",
      "Grease-Resistant Inner Barrier",
      "Non-Toxic Soy Inks"
    ],
    "features": [
      "FDA approved food-safe barrier",
      "Oil & moisture resistant",
      "Easy-assembly crash lock base"
    ],
    "dimensions": {
      "standard": "220mm × 140mm × 90mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "250 pcs",
        "unitPrice": "$0.68"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$0.49",
        "savings": "28% OFF"
      },
      {
        "qty": "2500 pcs",
        "unitPrice": "$0.42",
        "savings": "39% OFF"
      },
      {
        "qty": "5000+ pcs",
        "unitPrice": "$0.38",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-rigid-setup-boxes",
    "name": "Custom Rigid Setup Boxes",
    "category": "rigid-luxury",
    "categoryLabel": "Rigid Luxury & Gift",
    "tagline": "Wholesale custom manufactured rigid setup boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Rigid-set-up-boxes-01.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Rigid-set-up-boxes-02.webp",
    "badge": "1400 GSM Handcrafted Rigid",
    "badgeColor": "bg-amber-100 text-amber-900 border-amber-300",
    "moq": 100,
    "startingPrice": "$1.65 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "1400 GSM Heavy Greyboard Core",
      "Art Paper / Specialty Linen Wrap",
      "Precision Cut EVA Foam Insert"
    ],
    "features": [
      "Rigid non-collapsible build",
      "Magnetic snap / Ribbon pull tab",
      "Bespoke custom die-cut cavity"
    ],
    "dimensions": {
      "standard": "260mm × 180mm × 70mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "100 pcs",
        "unitPrice": "$2.97"
      },
      {
        "qty": "400 pcs",
        "unitPrice": "$2.15",
        "savings": "28% OFF"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$1.81",
        "savings": "39% OFF"
      },
      {
        "qty": "2000+ pcs",
        "unitPrice": "$1.65",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-rigid-boxes-with-inserts",
    "name": "Custom Rigid Boxes With Inserts",
    "category": "rigid-luxury",
    "categoryLabel": "Rigid Luxury & Gift",
    "tagline": "Wholesale custom manufactured rigid boxes with inserts with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-Rigid-Boxes-with-Inserts-UK-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-Rigid-Boxes-with-Inserts-04.webp",
    "badge": "1400 GSM Handcrafted Rigid",
    "badgeColor": "bg-amber-100 text-amber-900 border-amber-300",
    "moq": 100,
    "startingPrice": "$1.65 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "1400 GSM Heavy Greyboard Core",
      "Art Paper / Specialty Linen Wrap",
      "Precision Cut EVA Foam Insert"
    ],
    "features": [
      "Rigid non-collapsible build",
      "Magnetic snap / Ribbon pull tab",
      "Bespoke custom die-cut cavity"
    ],
    "dimensions": {
      "standard": "260mm × 180mm × 70mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "100 pcs",
        "unitPrice": "$2.97"
      },
      {
        "qty": "400 pcs",
        "unitPrice": "$2.15",
        "savings": "28% OFF"
      },
      {
        "qty": "1000 pcs",
        "unitPrice": "$1.81",
        "savings": "39% OFF"
      },
      {
        "qty": "2000+ pcs",
        "unitPrice": "$1.65",
        "savings": "52% OFF"
      }
    ]
  },
  {
    "id": "custom-flip-top-boxes",
    "name": "Custom Flip Top Boxes",
    "category": "cosmetics",
    "categoryLabel": "Cosmetics & Beauty",
    "tagline": "Wholesale custom manufactured flip top boxes with bespoke finishes and tailored branding.",
    "description": "Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.",
    "image": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-Flip-Top-Boxes-1-1.webp",
    "hoverImage": "https://customboxesmarket.co.uk/wp-content/uploads/2026/01/Custom-Flip-Top-Boxes-3.webp",
    "badge": "Luxury Retail Grade",
    "badgeColor": "bg-rose-100 text-rose-800 border-rose-300",
    "moq": 200,
    "startingPrice": "$0.48 / unit",
    "leadTime": "5-7 Business Days",
    "materials": [
      "380 GSM Ivory Board / SBS",
      "Metallic Foil Accent",
      "Soft-Touch Velvet Lamination"
    ],
    "features": [
      "Scratch-resistant velvet matte",
      "Gold / Silver hot foil stamping",
      "Embossed / Debossed logo ready"
    ],
    "dimensions": {
      "standard": "100mm × 70mm × 40mm",
      "customizable": true
    },
    "pricingTiers": [
      {
        "qty": "200 pcs",
        "unitPrice": "$0.86"
      },
      {
        "qty": "800 pcs",
        "unitPrice": "$0.62",
        "savings": "28% OFF"
      },
      {
        "qty": "2000 pcs",
        "unitPrice": "$0.53",
        "savings": "39% OFF"
      },
      {
        "qty": "4000+ pcs",
        "unitPrice": "$0.48",
        "savings": "52% OFF"
      }
    ]
  }
];
