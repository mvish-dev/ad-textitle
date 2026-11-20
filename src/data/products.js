// Product catalogue: Category → Sub-category → Child category.
// Each category renders as its own page at /products/<id>.
//
// Child categories and product photography are still being finalised with
// the client. To fill them in later, edit this file only — the product pages
// render whatever is here:
//   - `image`    (category, sub-category or child): import a .webp from
//                src/assets/images/products/ and set it here. Without one, a
//                "Coming Soon" placeholder (the `icon` on a tinted panel) is
//                shown. Only client photos go on sub-categories and children.
//   - `children` (sub-category): the products shown in its "View Products"
//                popup, each { name: 'Terry Towels', image: towelsPhoto }.
//                Empty → the popup shows the sub-category's own photo.
//   - `sustainable: true` (sub-category): adds an eco "Sustainable" badge.
//
// Kitchen & Dining, Living & Decor (curtains, cushions), Kids & Nursery and Performance Knitwear use client photos,
// converted to .webp in src/assets/images/products/<category-id>/ (originals
// are backed up in the cloud, not kept in the repo). The other category
// heroes/cards still use Unsplash stock imagery; their sub-categories show
// "Coming Soon" until client photos arrive. `image` feeds the cards;
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
import apronOvenMittsComboSet from '../assets/images/products/kitchen-dining/apron-oven-mitts-combo-set.webp'
import coordinatedKitchenSet from '../assets/images/products/kitchen-dining/coordinated-kitchen-set.webp'
import coordinatedKitchenSet2 from '../assets/images/products/kitchen-dining/coordinated-kitchen-set-2.webp'
import cottonApronCheckered from '../assets/images/products/kitchen-dining/cotton-apron-checkered.webp'
import cottonApronCheckered2 from '../assets/images/products/kitchen-dining/cotton-apron-checkered-2.webp'
import cottonApronCheckered3 from '../assets/images/products/kitchen-dining/cotton-apron-checkered-3.webp'
import floralPrintedCurtains from '../assets/images/products/living-decor/floral-printed-curtains.webp'
import leafPrintedCurtains from '../assets/images/products/living-decor/leaf-printed-curtains.webp'
import printedCurtains from '../assets/images/products/living-decor/printed-curtains.webp'
import stripeLinedCurtains from '../assets/images/products/living-decor/stripe-lined-curtains.webp'
import curatedCushions from '../assets/images/products/living-decor/curated-cushions.webp'
import decorativeCushion from '../assets/images/products/living-decor/decorative-cushion.webp'
import embroideredTextCushion from '../assets/images/products/living-decor/embroidered-text-cushion.webp'
import floorCushions from '../assets/images/products/living-decor/floor-cushions.webp'
import linenCushion from '../assets/images/products/living-decor/linen-cushion.webp'
import luxuryTexturedCushionCover from '../assets/images/products/living-decor/luxury-textured-cushion-cover.webp'
import patchWorkCushions from '../assets/images/products/living-decor/patch-work-cushions.webp'
import printedCushion from '../assets/images/products/living-decor/printed-cushion.webp'
import statementCushion from '../assets/images/products/living-decor/statement-cushion.webp'
import texturedCushion from '../assets/images/products/living-decor/textured-cushion.webp'
import wovenCushion from '../assets/images/products/living-decor/woven-cushion.webp'
import wovenCushions from '../assets/images/products/living-decor/woven-cushions.webp'
import yarnDyedCushion from '../assets/images/products/living-decor/yarn-dyed-cushion.webp'
import shapedCushion from '../assets/images/products/kids-nursery/shaped-cushion.webp'
import cushionToys from '../assets/images/products/kids-nursery/cushion-toys.webp'
import shapeToys from '../assets/images/products/kids-nursery/shape-toys.webp'
import hangingToys from '../assets/images/products/kids-nursery/hanging-toys.webp'
import hangingPocketOrganisers from '../assets/images/products/kids-nursery/hanging-pocket-organisers.webp'
import cottonAnkleSocks from '../assets/images/products/performance-knitwear/cotton-ankle-socks.webp'
import cottonAnkleSocks2 from '../assets/images/products/performance-knitwear/cotton-ankle-socks-2.webp'
import cottonAnkleSocks3 from '../assets/images/products/performance-knitwear/cotton-ankle-socks-3.webp'
import cottonQuarterSocks from '../assets/images/products/performance-knitwear/cotton-quarter-socks.webp'
import cottonQuarterSocks2 from '../assets/images/products/performance-knitwear/cotton-quarter-socks-2.webp'
import cottonQuarterSocks3 from '../assets/images/products/performance-knitwear/cotton-quarter-socks-3.webp'
import kidsSocks from '../assets/images/products/performance-knitwear/kids-socks.webp'
import kidsSocks2 from '../assets/images/products/performance-knitwear/kids-socks-2.webp'
import kidsSocks3 from '../assets/images/products/performance-knitwear/kids-socks-3.webp'
import kidsSocks4 from '../assets/images/products/performance-knitwear/kids-socks-4.webp'
import bambooArmSleeve from '../assets/images/products/performance-knitwear/bamboo-arm-sleeve.webp'
import bambooArmSleeve2 from '../assets/images/products/performance-knitwear/bamboo-arm-sleeve-2.webp'
import bambooAnkleSocks from '../assets/images/products/performance-knitwear/bamboo-ankle-socks.webp'
import bambooAnkleSocks2 from '../assets/images/products/performance-knitwear/bamboo-ankle-socks-2.webp'
import bambooAnkleSocks3 from '../assets/images/products/performance-knitwear/bamboo-ankle-socks-3.webp'
import bambooQuarterSocks from '../assets/images/products/performance-knitwear/bamboo-quarter-socks.webp'
import bambooQuarterSocks2 from '../assets/images/products/performance-knitwear/bamboo-quarter-socks-2.webp'
import bambooQuarterSocks3 from '../assets/images/products/performance-knitwear/bamboo-quarter-socks-3.webp'
import bambooTerrySocks from '../assets/images/products/performance-knitwear/bamboo-terry-socks.webp'
import bambooTerrySocks2 from '../assets/images/products/performance-knitwear/bamboo-terry-socks-2.webp'

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
        ...photo(coordinatedKitchenSet2),
        children: [
          { name: 'Apron & Oven Mitts Combo Set', ...photo(apronOvenMittsComboSet) },
          { name: 'Coordinated Kitchen Set', ...photo(coordinatedKitchenSet) },
          { name: 'Coordinated Kitchen Set', ...photo(coordinatedKitchenSet2) },
          { name: 'Cotton Apron Checkered', ...photo(cottonApronCheckered) },
          { name: 'Cotton Apron Checkered', ...photo(cottonApronCheckered2) },
          { name: 'Cotton Apron Checkered', ...photo(cottonApronCheckered3) },
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
        ...photo(printedCushion),
        children: [
          { name: 'Curated Cushions', ...photo(curatedCushions) },
          { name: 'Decorative Cushion', ...photo(decorativeCushion) },
          { name: 'Embroidered & Text Cushion', ...photo(embroideredTextCushion) },
          { name: 'Floor Cushions', ...photo(floorCushions) },
          { name: 'Linen Cushion', ...photo(linenCushion) },
          { name: 'Luxury Textured Cushion Cover', ...photo(luxuryTexturedCushionCover) },
          { name: 'Patch Work Cushions', ...photo(patchWorkCushions) },
          { name: 'Printed Cushion', ...photo(printedCushion) },
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
        children: [],
      },
      {
        name: 'Rugs',
        icon: 'texture',
        description: 'Woven rugs and mats in durable constructions, designed to ground a room with colour and pattern.',
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
    ...photo(shapedCushion),
    subcategories: [
      {
        name: 'Shape Cushions',
        icon: 'toys',
        description: 'Fun, character and shape cushions in soft, skin-friendly fabrics — made to be hugged, washed and loved.',
        ...photo(shapedCushion),
        children: [
          { name: 'Shaped Cushions', ...photo(shapedCushion) },
          { name: 'Cushion Toys', ...photo(cushionToys) },
          { name: 'Shape Toys', ...photo(shapeToys) },
          { name: 'Hanging Toys', ...photo(hangingToys) },
          { name: 'Hanging Pocket Organisers', ...photo(hangingPocketOrganisers) },
        ],
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
    ...photo(bambooArmSleeve),
    subcategories: [
      {
        name: 'Socks',
        icon: 'steps',
        description: 'Everyday, sports and performance socks with cushioned, plain and jacquard constructions.',
        ...photo(cottonAnkleSocks),
        children: [
          { name: 'Cotton Ankle Socks', ...photo(cottonAnkleSocks) },
          { name: 'Cotton Ankle Socks', ...photo(cottonAnkleSocks2) },
          { name: 'Cotton Ankle Socks', ...photo(cottonAnkleSocks3) },
          { name: 'Cotton Quarter Socks', ...photo(cottonQuarterSocks) },
          { name: 'Cotton Quarter Socks', ...photo(cottonQuarterSocks2) },
          { name: 'Cotton Quarter Socks', ...photo(cottonQuarterSocks3) },
          { name: 'Kids Socks', ...photo(kidsSocks) },
          { name: 'Kids Socks', ...photo(kidsSocks2) },
          { name: 'Kids Socks', ...photo(kidsSocks3) },
          { name: 'Kids Socks', ...photo(kidsSocks4) },
        ],
      },
      {
        name: 'Arm Sleeves',
        icon: 'sports_handball',
        description: 'Compression and sun-protective arm sleeves built for stretch, recovery and all-day comfort.',
        children: [],
      },
      {
        name: 'Bamboo Arm Sleeves',
        icon: 'eco',
        description: 'Arm sleeves knitted from bamboo blends — naturally breathable, soft and cool against the skin.',
        ...photo(bambooArmSleeve),
        children: [
          { name: 'Bamboo Arm Sleeves', ...photo(bambooArmSleeve) },
          { name: 'Bamboo Arm Sleeves', ...photo(bambooArmSleeve2) },
        ],
        sustainable: true,
      },
      {
        name: 'Bamboo Socks',
        icon: 'eco',
        description: 'Bamboo-blend socks that stay soft, breathable and fresh through the day.',
        ...photo(bambooAnkleSocks),
        children: [
          { name: 'Bamboo Ankle Socks', ...photo(bambooAnkleSocks) },
          { name: 'Bamboo Ankle Socks', ...photo(bambooAnkleSocks2) },
          { name: 'Bamboo Ankle Socks', ...photo(bambooAnkleSocks3) },
          { name: 'Bamboo Quarter Socks', ...photo(bambooQuarterSocks) },
          { name: 'Bamboo Quarter Socks', ...photo(bambooQuarterSocks2) },
          { name: 'Bamboo Quarter Socks', ...photo(bambooQuarterSocks3) },
          { name: 'Bamboo Terry Socks', ...photo(bambooTerrySocks) },
          { name: 'Bamboo Terry Socks', ...photo(bambooTerrySocks2) },
        ],
        sustainable: true,
      },
      {
        name: 'Tights',
        icon: 'eco',
        description: 'Comfortable, sustainable tights with a smooth knit and lasting stretch.',
        children: [],
        sustainable: true,
      },
    ],
  },
]

export const getProductCategory = (id) => PRODUCT_CATEGORIES.find((category) => category.id === id)

export const productCategoryPath = (category) => `/products/${category.id}`
