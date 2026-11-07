// Product catalogue: Category → Sub-category → Child category.
// Each category renders as its own page at /products/<id>.
//
// Child categories and product photography are still being finalised with
// the client. To fill them in later, edit this file only — the product pages
// render whatever is here:
//   - `image`    (category, sub-category or child): import a .webp from
//                src/assets/images/products/ and set it here. Without one, a
//                styled placeholder (the `icon` on a tinted panel) is shown.
//   - `children` (sub-category): the products shown in its "View Products"
//                popup, each { name: 'Terry Towels', image: towelsPhoto }.
//                Empty → the popup shows the sub-category's own photo.
//   - `sustainable: true` (sub-category): adds an eco "Sustainable" badge.
//
// Kitchen & Dining and Living & Decor (curtains, cushions) use client photos,
// converted to .webp in src/assets/images/products/<category-id>/ (originals
// are backed up in the cloud, not kept in the repo). Everything else still uses
// Unsplash stock imagery — swap in client photos. `image` feeds the cards;
// `largeImage` is the bigger version used for the category page hero and
// the "View Products" popup.

import tableClothRunnerPlacemats from '../assets/images/products/kitchen-dining/table-cloth-runner-placemats.webp'
import classicWhiteTableCover from '../assets/images/products/kitchen-dining/classic-white-table-cover.webp'
import floralPrintedTableCloth from '../assets/images/products/kitchen-dining/floral-printed-table-cloth.webp'
import frillEdgedSixSeaterTableCloth from '../assets/images/products/kitchen-dining/frill-edged-six-seater-table-cloth.webp'
import partyTableCloth from '../assets/images/products/kitchen-dining/party-table-cloth.webp'
import spookySeasonTableCover from '../assets/images/products/kitchen-dining/spooky-season-table-cover.webp'
import cottonTableRunner from '../assets/images/products/kitchen-dining/cotton-table-runner.webp'
import embroideredTableRunner from '../assets/images/products/kitchen-dining/embroidered-table-runner.webp'
import printedTableRunner from '../assets/images/products/kitchen-dining/printed-table-runner.webp'
import stripedCottonTableRunner from '../assets/images/products/kitchen-dining/striped-cotton-table-runner.webp'
import placematsWithNapkins from '../assets/images/products/kitchen-dining/placemats-with-napkins.webp'
import kitchenTeaTowel from '../assets/images/products/kitchen-dining/kitchen-tea-towel.webp'
import kitchenHandTowel from '../assets/images/products/kitchen-dining/kitchen-hand-towel.webp'
import terryKitchenTowel from '../assets/images/products/kitchen-dining/terry-kitchen-towel.webp'
import waffleKitchenTowel from '../assets/images/products/kitchen-dining/waffle-kitchen-towel.webp'
import classicStripedKitchenTowel from '../assets/images/products/kitchen-dining/classic-striped-kitchen-towel.webp'
import themePrintedKitchenTowel from '../assets/images/products/kitchen-dining/theme-printed-kitchen-towel.webp'
import vintagePlaidTeaTowel from '../assets/images/products/kitchen-dining/vintage-plaid-tea-towel.webp'
import fabricDyedSet from '../assets/images/products/kitchen-dining/fabric-dyed-set.webp'
import floralPrintedSet from '../assets/images/products/kitchen-dining/floral-printed-set.webp'
import apronOvenMittsComboSet from '../assets/images/products/kitchen-dining/apron-oven-mitts-combo-set.webp'
import traditionalCheckeredApron from '../assets/images/products/kitchen-dining/traditional-checkered-apron.webp'
import floralPrintedCurtains from '../assets/images/products/living-decor/floral-printed-curtains.webp'
import leafPrintedCurtains from '../assets/images/products/living-decor/leaf-printed-curtains.webp'
import printedCurtains from '../assets/images/products/living-decor/printed-curtains.webp'
import stripeLinedCurtains from '../assets/images/products/living-decor/stripe-lined-curtains.webp'
import curatedCushions from '../assets/images/products/living-decor/curated-cushions.webp'
import decorativeCushionCover from '../assets/images/products/living-decor/decorative-cushion-cover.webp'
import embroideredTextCushion from '../assets/images/products/living-decor/embroidered-text-cushion.webp'
import floorCushions from '../assets/images/products/living-decor/floor-cushions.webp'
import linenCushion from '../assets/images/products/living-decor/linen-cushion.webp'
import luxuryTexturedCushionCover from '../assets/images/products/living-decor/luxury-textured-cushion-cover.webp'
import patchworkCushions from '../assets/images/products/living-decor/patchwork-cushions.webp'
import printedCushions from '../assets/images/products/living-decor/printed-cushions.webp'
import statementCushion from '../assets/images/products/living-decor/statement-cushion.webp'
import texturedCushion from '../assets/images/products/living-decor/textured-cushion.webp'
import wovenCushion from '../assets/images/products/living-decor/woven-cushion.webp'
import wovenCushions from '../assets/images/products/living-decor/woven-cushions.webp'
import yarnDyedCushion from '../assets/images/products/living-decor/yarn-dyed-cushion.webp'

const unsplash = (id, width) => `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`
const stock = (id) => ({ image: unsplash(id, 900), largeImage: unsplash(id, 2000) })
// Client photos are a single .webp (≤1600px) used for both card and popup.
const photo = (src) => ({ image: src, largeImage: src })

export const PRODUCT_CATEGORIES = [
  {
    id: 'kitchen-dining',
    title: 'Kitchen & Dining',
    icon: 'restaurant',
    tagline: 'Functional textiles for the everyday kitchen and the well-set table.',
    description:
      'Absorbent towels, heat-protective mitts and coordinated table linen — woven, dyed and finished in-house for retail programmes that need consistent quality across every colourway.',
    ...photo(tableClothRunnerPlacemats),
    subcategories: [
      {
        name: 'Dining Sets',
        icon: 'table_restaurant',
        description: 'Table cloths, runners, placemats and napkins in printed, woven and embroidered finishes to dress the table for every occasion.',
        ...photo(tableClothRunnerPlacemats),
        children: [
          { name: 'Table Cloth with Placemat & Runner', ...photo(tableClothRunnerPlacemats) },
          { name: 'Classic White Table Cover', ...photo(classicWhiteTableCover) },
          { name: 'Floral Printed Table Cloth', ...photo(floralPrintedTableCloth) },
          { name: 'Frill Edged 6 Seater Table Cloth', ...photo(frillEdgedSixSeaterTableCloth) },
          { name: 'Party Table Cloth', ...photo(partyTableCloth) },
          { name: 'Spooky Season Table Cover', ...photo(spookySeasonTableCover) },
          { name: 'Cotton Table Runner', ...photo(cottonTableRunner) },
          { name: 'Embroidered Table Runner', ...photo(embroideredTableRunner) },
          { name: 'Printed Table Runner', ...photo(printedTableRunner) },
          { name: 'Stripe Designed Cotton Runner', ...photo(stripedCottonTableRunner) },
          { name: 'Placemats with Napkins', ...photo(placematsWithNapkins) },
        ],
      },
      {
        name: 'Towels',
        icon: 'dry_cleaning',
        description: 'Absorbent, quick-drying kitchen and tea towels in terry, waffle, yarn-dyed and embroidered constructions.',
        ...photo(kitchenTeaTowel),
        children: [
          { name: 'Kitchen Tea Towel', ...photo(kitchenTeaTowel) },
          { name: 'Kitchen Hand Towel', ...photo(kitchenHandTowel) },
          { name: 'Terry Kitchen Towel', ...photo(terryKitchenTowel) },
          { name: 'Waffle Kitchen Towel', ...photo(waffleKitchenTowel) },
          { name: 'Classic Striped Kitchen Towel', ...photo(classicStripedKitchenTowel) },
          { name: 'Theme Printed Kitchen Towel', ...photo(themePrintedKitchenTowel) },
          { name: 'Vintage Plaid Tea Towel', ...photo(vintagePlaidTeaTowel) },
        ],
      },
      {
        name: 'Apron & Mitts',
        icon: 'oven_gen',
        description: 'Aprons, oven mitts and pot holders — sold singly or as coordinated sets — that pair practical padding with matching design.',
        ...photo(fabricDyedSet),
        children: [
          { name: 'Fabric Dyed Set', ...photo(fabricDyedSet) },
          { name: 'Floral Printed Set', ...photo(floralPrintedSet) },
          { name: 'Apron & Oven Mitts Combo Set', ...photo(apronOvenMittsComboSet) },
          { name: 'Traditional Checkered Apron', ...photo(traditionalCheckeredApron) },
        ],
      },
    ],
  },
  {
    id: 'living-decor',
    title: 'Living & Decor',
    icon: 'weekend',
    tagline: 'Texture, drape and colour for living spaces.',
    description:
      'Curtains, cushions, throws and rugs designed to layer together — from yarn-dyed and jacquard weaves to embroidered and printed finishes.',
    ...photo(floralPrintedCurtains),
    subcategories: [
      {
        name: 'Curtains',
        icon: 'curtains',
        description: 'Drapery in printed, textured and woven designs, made for the right fall, light control and finish.',
        ...photo(floralPrintedCurtains),
        children: [
          { name: 'Floral Printed Curtains', ...photo(floralPrintedCurtains) },
          { name: 'Leaf Printed Curtains', ...photo(leafPrintedCurtains) },
          { name: 'Printed Curtains', ...photo(printedCurtains) },
          { name: 'Stripe Lined Curtains', ...photo(stripeLinedCurtains) },
        ],
      },
      {
        name: 'Cushions',
        icon: 'chair',
        description: 'Decorative cushion covers and fillers — printed, yarn-dyed, woven and embroidered — to accent any room.',
        ...photo(printedCushions),
        children: [
          { name: 'Curated Cushions', ...photo(curatedCushions) },
          { name: 'Decorative Cushion Cover', ...photo(decorativeCushionCover) },
          { name: 'Embroidered & Text Cushion', ...photo(embroideredTextCushion) },
          { name: 'Floor Cushions', ...photo(floorCushions) },
          { name: 'Linen Cushion', ...photo(linenCushion) },
          { name: 'Luxury Textured Cushion Cover', ...photo(luxuryTexturedCushionCover) },
          { name: 'Patchwork Cushions', ...photo(patchworkCushions) },
          { name: 'Printed Cushions', ...photo(printedCushions) },
          { name: 'Statement Cushion', ...photo(statementCushion) },
          { name: 'Textured Cushion', ...photo(texturedCushion) },
          { name: 'Woven Cushion', ...photo(wovenCushion) },
          { name: 'Woven Cushions', ...photo(wovenCushions) },
          { name: 'Yarn Dyed Cushion', ...photo(yarnDyedCushion) },
        ],
      },
      {
        name: 'Throws',
        icon: 'airline_seat_flat',
        description: 'Soft, versatile throws that add warmth and texture to sofas, beds and reading corners.',
        ...stock('1674475760738-8c7af859f821'),
        children: [],
      },
      {
        name: 'Rugs',
        icon: 'texture',
        description: 'Woven rugs and mats in durable constructions, designed to ground a room with colour and pattern.',
        ...stock('1603913996638-c01100417b4a'),
        children: [],
      },
    ],
  },
  {
    id: 'kids-nursery',
    title: 'Kids & Nursery',
    icon: 'child_care',
    tagline: 'Soft, playful pieces made with care for little ones.',
    description:
      'Playful shaped cushions and nursery textiles made from skin-friendly materials, built to the safety and compliance standards children’s products demand.',
    ...stock('1780399382189-d417eb8bd907'),
    subcategories: [
      {
        name: 'Shape Cushions',
        icon: 'toys',
        description: 'Fun, character and shape cushions in soft, skin-friendly fabrics — made to be hugged, washed and loved.',
        ...stock('1780399382189-d417eb8bd907'),
        children: [],
      },
    ],
  },
  {
    id: 'outdoor-lifestyle',
    title: 'Outdoor & Lifestyle',
    icon: 'park',
    tagline: 'Durable comfort for life outdoors.',
    description:
      'Blankets built for picnics, travel and the outdoors — durable constructions that stay soft wash after wash.',
    ...stock('1578359968130-76b59bb5af13'),
    subcategories: [
      {
        name: 'Blankets',
        icon: 'camping',
        description: 'Picnic, travel and outdoor blankets that balance warmth, durability and easy care.',
        ...stock('1593034509785-5b17ba49f683'),
        children: [],
      },
    ],
  },
  {
    id: 'performance-knitwear',
    title: 'Performance Knitwear',
    icon: 'directions_run',
    tagline: 'Engineered knits for movement — including a sustainable bamboo range.',
    description:
      'Socks, arm sleeves and tights knitted on our in-house single-cylinder machines, with a sustainable range in bamboo blends for breathability and natural softness.',
    ...stock('1582966772680-860e372bb558'),
    subcategories: [
      {
        name: 'Socks',
        icon: 'steps',
        description: 'Everyday, sports and performance socks with cushioned, plain and jacquard constructions.',
        ...stock('1615486364462-ef6363adbc18'),
        children: [],
      },
      {
        name: 'Arm Sleeves',
        icon: 'sports_handball',
        description: 'Compression and sun-protective arm sleeves built for stretch, recovery and all-day comfort.',
        ...stock('1749094697076-ca9fb48ebe70'),
        children: [],
      },
      {
        name: 'Bamboo Arm Sleeves',
        icon: 'eco',
        description: 'Arm sleeves knitted from bamboo blends — naturally breathable, soft and cool against the skin.',
        ...stock('1532920161727-344adb090f7f'),
        children: [],
        sustainable: true,
      },
      {
        name: 'Bamboo Socks',
        icon: 'eco',
        description: 'Bamboo-blend socks that stay soft, breathable and fresh through the day.',
        ...stock('1640026199235-c24aa417b552'),
        children: [],
        sustainable: true,
      },
      {
        name: 'Tights',
        icon: 'eco',
        description: 'Comfortable, sustainable tights with a smooth knit and lasting stretch.',
        ...stock('1761393956376-98c280da9698'),
        children: [],
        sustainable: true,
      },
    ],
  },
]

export const getProductCategory = (id) => PRODUCT_CATEGORIES.find((category) => category.id === id)

export const productCategoryPath = (category) => `/products/${category.id}`
