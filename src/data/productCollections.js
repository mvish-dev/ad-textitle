// Shared metadata for the 4 product collections. Used to auto-generate the
// "Extend the Experience" related-products carousel on each collection page.
export const COLLECTION_ORDER = ['BL', 'TL', 'KL', 'LL']

export const COLLECTIONS_META = {
  BL: {
    slug: 'heritage-bed-linen',
    label: 'Heritage Bed Linen',
    blurb: "Luxury linens engineered for a restful night's sleep.",
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD0kXCzrplXjWLXtXY3-Op3woPtu-7n3T0z68FZQURBgpFHEAea5sOMsoVXQosNffaZ3qd79ucJV6uprNkW4uXLnSBWgt0gxPsRfG7J24Oz1y389mm6DYm2uqvkTGRT7-JUCLn2yOqDX5HVfNJ_E94qgHawmfjOZ_NAu6t-VbbFCh3E9o5CP9ZmwhSdVCc4Y1SVd3DUNj-WfqFiuV_d1WgCHuIx090glfyoUCwd4oF06_5FwIFMvup9H_Y5AFh8rSxpyZ_QuytwwQY',
  },
  TL: {
    slug: 'table-linen',
    label: 'Refined Table Linen',
    blurb: 'Precision-hemmed linens for grand banquets.',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-2p1jq9B5cab5Qsu-UGCCMniPN0jfEqKzuTyZKBQG0xIof2S5LFW3NL0rhz84Lz6bAsBsM2RnS7DxNox5ZliI4fUQhxC18dr82E5_x-9yYTTASiExjEImAxE4WF79WWQ7c_6Q9CmE2QRJcWSCjoXL4n1LlYazpczVaJhQzX3LZXiTEAtEmICIucdUBaGn2VQC9V8512EMhKhuzytmUJR8i8u4K7ww4WlgLOh4vl7B3yeS_04TtK1h6Tq_c_a_6F7M5DFZunfrNIQ',
  },
  KL: {
    slug: 'kitchen-linen',
    label: 'Culinary Kitchen Linen',
    blurb: 'Highly absorbent weaves for active kitchens.',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-o8n5chBX-29oz68ZM82dAFfoy70qOr_I0WTlXhRjkqWnI5x4j66I3-PBkhcnb8YoLzBrKTTEt9Bhd2EALY__17O0cgul_C35qSQu8SAOC-d8fv_3ujI4G0H3-VtZCufe94TnVH7RkGmsxfLjsoyOmqGz75I7EZ_3EPD3zzdwdoqDBXhvN2gI1polpx4E2sVwMuXVd7-swkexEWqVg8WNrSotEP9yYVyhANofZhnGojS_eWVksdHRIw5OHUqok4Smm9dK3VUUOxQ',
  },
  LL: {
    slug: 'living-linen',
    label: 'Living Linen Curtains',
    blurb: 'Precision-tailored curtains that shape light across living spaces.',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=80&auto=format&fit=crop',
  },
}

// Per-collection page config. Every section below is optional except hero,
// features and gallery — CollectionPage.jsx skips whatever isn't provided,
// which is how Living Linen can use "focus" instead of "offerings" and skip
// "integrity" entirely for Kitchen/Table.
export const COLLECTIONS = {
  'kitchen-linen': {
    category: 'KL',
    contactCategory: 'Kitchen Linen',
    hero: {
      eyebrow: 'Culinary Craftsmanship',
      title: 'Kitchen Linen',
      titleAccent: 'Collection',
      description:
        'Highly absorbent weaves, tailored aprons, and insulated mittens designed to bring style and durability to culinary workspaces.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA-o8n5chBX-29oz68ZM82dAFfoy70qOr_I0WTlXhRjkqWnI5x4j66I3-PBkhcnb8YoLzBrKTTEt9Bhd2EALY__17O0cgul_C35qSQu8SAOC-d8fv_3ujI4G0H3-VtZCufe94TnVH7RkGmsxfLjsoyOmqGz75I7EZ_3EPD3zzdwdoqDBXhvN2gI1polpx4E2sVwMuXVd7-swkexEWqVg8WNrSotEP9yYVyhANofZhnGojS_eWVksdHRIw5OHUqok4Smm9dK3VUUOxQ',
      imageAlt: 'Stacked premium linen kitchen towels on a countertop',
    },
    gallery: { eyebrow: 'Kitchen Linen Curation', title: 'Explore Kitchen Linen', titleAccent: 'Products' },
    offerings: {
      eyebrow: 'Product Offerings',
      title: "What's in the",
      titleAccent: 'Collection',
      description:
        'Our Kitchen Linen range spans four core categories, each woven, cut, and finished in-house for extreme durability.',
      items: [
        { icon: 'checkroom', label: 'Aprons' },
        { icon: 'dry_cleaning', label: 'Mittens & Gloves' },
        { icon: 'texture', label: 'Kitchen Towels' },
        { icon: 'pan_tool', label: 'Pot Holders' },
      ],
    },
    features: [
      {
        icon: 'verified',
        title: 'Heavy-Duty Stitching',
        text: 'Stitched with extra-reinforced threads and dynamic stress-point backing on industrial Juki machines, ensuring they withstand active daily kitchen usage.',
      },
      {
        icon: 'eco',
        title: 'Azo-Free, High Color-Fastness',
        text: 'We dye exclusively with skin-safe, Azo-free dyes tested to maintain color vibrance even after multiple high-temperature commercial laundry runs.',
      },
      {
        icon: 'shield',
        title: 'SGS & Laboratory Certified',
        text: 'Our kitchen towels pass strict absorbance parameters and shrink resistance tests verified in-house and through competent third-party labs like SGS.',
      },
    ],
  },

  'table-linen': {
    category: 'TL',
    contactCategory: 'Table Linen',
    hero: {
      eyebrow: 'Sophisticated Dining',
      title: 'Table Linen',
      titleAccent: 'Collection',
      description:
        'Beautifully hemstitched table cloths, elegant runners, and coordinated napkin sets designed for upscale dining spaces.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB-2p1jq9B5cab5Qsu-UGCCMniPN0jfEqKzuTyZKBQG0xIof2S5LFW3NL0rhz84Lz6bAsBsM2RnS7DxNox5ZliI4fUQhxC18dr82E5_x-9yYTTASiExjEImAxE4WF79WWQ7c_6Q9CmE2QRJcWSCjoXL4n1LlYazpczVaJhQzX3LZXiTEAtEmICIucdUBaGn2VQC9V8512EMhKhuzytmUJR8i8u4K7ww4WlgLOh4vl7B3yeS_04TtK1h6Tq_c_a_6F7M5DFZunfrNIQ',
      imageAlt: 'Refined dining table setup with premium tablecloth and matching runner',
    },
    gallery: { eyebrow: 'Table Linen Curation', title: 'Explore Table Linen', titleAccent: 'Products' },
    offerings: {
      eyebrow: 'Product Offerings',
      title: "What's in the",
      titleAccent: 'Collection',
      description:
        'Our Table Linen range covers four main categories, featuring stain-release technology and mitered corner finishes.',
      items: [
        { icon: 'table_bar', label: 'Tablecloths' },
        { icon: 'straighten', label: 'Table Runners' },
        { icon: 'grid_on', label: 'Placemats' },
        { icon: 'local_laundry_service', label: 'Napkins' },
      ],
    },
    features: [
      {
        icon: 'verified',
        title: 'Mitered Finish Corners',
        text: 'All table linens feature clean, double-folded hems and precise mitered corners for a sleek, upscale banquet display.',
      },
      {
        icon: 'eco',
        title: 'Stain & Spill Resistant',
        text: 'Processed with state-of-the-art soil-release technology that resists absorption of liquids and staining, making cleanups quick.',
      },
      {
        icon: 'shield',
        title: 'SGS Tested Durability',
        text: 'Tested thoroughly by SGS to verify high seam strength, color-fastness, and minimal shrinkage over hundreds of wash cycles.',
      },
    ],
  },

  'heritage-bed-linen': {
    category: 'BL',
    contactCategory: 'Bed Linen',
    hero: {
      eyebrow: 'Global Excellence in Manufacturing',
      title: 'Heritage Bed Linen',
      titleAccent: 'Collection',
      description:
        "Exquisite long-staple cotton woven with precision for the world's most discerning hospitality brands.",
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80&auto=format&fit=crop',
      imageAlt: 'Crisp, long-staple white cotton bed linens folded beautifully',
    },
    gallery: { eyebrow: 'Bed Linen Curation', title: 'Explore Bed Linen', titleAccent: 'Products' },
    offerings: {
      eyebrow: 'Product Offerings',
      title: "What's in the",
      titleAccent: 'Collection',
      description: 'Our Bed Linen range spans five core categories, each woven, cut and finished in-house.',
      items: [
        { icon: 'bed', label: 'Bed Spread' },
        { icon: 'king_bed', label: 'Bedding' },
        { icon: 'weekend', label: 'Cushion' },
        { icon: 'texture', label: 'Quilt' },
        { icon: 'hotel', label: 'Rest Bedding' },
      ],
      footnote: 'Looking for exact sizes, fabric compositions or colourways?',
    },
    features: [
      {
        icon: 'verified',
        title: '5-Level Quality Control',
        text: 'Every batch passes a five-level inspection cycle, with testing referenced against reports from SGS, Texanlabs and the Textile Committee before it ships.',
      },
      {
        icon: 'eco',
        title: 'Eco-Friendly Dyeing',
        text: 'We dye exclusively with Azo-free dyes, tested to wet and dry rubbing and light-fastness standards, so colour stays true wash after wash.',
      },
      {
        icon: 'shield',
        title: 'Built for Everyday Use',
        text: 'Cut and stitched on Juki and Brother machinery by a trained, experienced workforce, built for the demands of hospitality and residential use alike.',
      },
    ],
    integrity: {
      eyebrow: 'Operations',
      title: 'Manufacturing',
      titleAccent: 'Integrity',
      blocks: [
        {
          heading: 'Packaging Solutions',
          description:
            'Choice of sustainable double-wall cardboard or premium matching fabric drawstring bags for a complete zero-plastic experience.',
          tags: ['Recyclable Cardboard', 'Linen Dust Bags'],
        },
      ],
      applicationsHeading: 'Global Applications',
      applications: [
        { title: 'Hospitality', text: 'Luxury Hotels & Resorts' },
        { title: 'Bespoke', text: 'Private Residence Projects' },
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80&auto=format&fit=crop',
        alt: 'Stacked luxury linens and towels',
      },
    },
  },

  'living-linen': {
    category: 'LL',
    contactCategory: 'Living Linen',
    hero: {
      eyebrow: 'Global Excellence in Manufacturing',
      title: 'Living Linen',
      titleAccent: 'Collection',
      description:
        'Precision-tailored curtains woven, cut and finished in-house — shaping light and texture across living spaces.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80&auto=format&fit=crop',
      imageAlt: 'Tall windows dressed in flowing, tailored neutral curtains',
    },
    gallery: { eyebrow: 'Living Linen Curation', title: 'Explore Living Linen', titleAccent: 'Products' },
    focus: {
      eyebrow: 'Production Specialization',
      title: 'Our Living Linen',
      titleAccent: 'Focus',
      description:
        'Living Linen is built around one core product: Curtains. Every panel is woven, cut and stitched in-house, giving us full control over quality from loom to finished drape.',
      cards: [
        {
          icon: 'grid_on',
          title: 'In-House Weaving',
          text: '56 automatic Repair looms weaving dobby, satin, satin-stripe and twill constructions up to 360cm width, so large curtain panels come off a single continuous run.',
        },
        {
          icon: 'content_cut',
          title: 'Tailored Finishing',
          text: 'Cut and stitched on Juki and Brother machinery by a trained, experienced workforce, then checked through our multi-parameter finishing inspection.',
        },
        {
          icon: 'design_services',
          title: 'Made to Your Brief',
          text: 'Our in-house design studio, rotary and manual printing, and Tajima & Barudan embroidery machines (9 colours) support custom patterns and finishes.',
        },
      ],
      footnote: 'Looking for specific widths, weaves or finishes?',
    },
    features: [
      {
        icon: 'verified',
        title: '5-Level Quality Control',
        text: 'Every batch passes a five-level inspection cycle, with testing referenced against reports from SGS, Texanlabs and the Textile Committee before it ships.',
      },
      {
        icon: 'eco',
        title: 'Eco-Friendly Dyeing',
        text: 'We dye exclusively with Azo-free dyes, tested to wet and dry rubbing and light-fastness standards, so colour stays true wash after wash.',
      },
      {
        icon: 'shield',
        title: 'Built for Everyday Use',
        text: 'Cut and stitched by a trained, experienced workforce, built for the demands of hospitality and residential interiors alike.',
      },
    ],
    integrity: {
      eyebrow: 'Operations',
      title: 'Manufacturing',
      titleAccent: 'Integrity',
      blocks: [
        {
          heading: 'In-House Design & Print',
          description:
            'From our in-house design studio through rotary and manual printing to embroidery, curtain fabric development stays under one roof from concept to loom.',
        },
      ],
      applicationsHeading: 'Applications',
      applications: [
        { title: 'Hospitality', text: 'Hotel & Resort Window Treatments' },
        { title: 'Bespoke', text: 'Private Residence Projects' },
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=80&auto=format&fit=crop',
        alt: 'Tailored curtain fabric close-up',
      },
    },
  },
}
