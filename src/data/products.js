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
import fabricDyedSet from '../assets/images/products/kitchen-dining/fabric-dyed-set.webp'
import floralPrintedSet from '../assets/images/products/kitchen-dining/floral-printed-set.webp'
import apronOvenMittsComboSet from '../assets/images/products/kitchen-dining/apron-oven-mitts-combo-set.webp'
import traditionalCheckeredApron from '../assets/images/products/kitchen-dining/traditional-checkered-apron.webp'
import blackCheckeredApron from '../assets/images/products/kitchen-dining/black-checkered-apron.webp'
import blackCheckeredApron2 from '../assets/images/products/kitchen-dining/black-checkered-apron-2.webp'
import blackApron from '../assets/images/products/kitchen-dining/black-apron.webp'
import blackApron2 from '../assets/images/products/kitchen-dining/black-apron-2.webp'
import brownCheckeredApron from '../assets/images/products/kitchen-dining/brown-checkered-apron.webp'
import brownWhiteCheckeredApron from '../assets/images/products/kitchen-dining/brown-white-checkered-apron.webp'
import greenCheckeredApron from '../assets/images/products/kitchen-dining/green-checkered-apron.webp'
import oliveGreenCheckeredApron from '../assets/images/products/kitchen-dining/olive-green-checkered-apron.webp'
import oliveGreenLinePatternApron from '../assets/images/products/kitchen-dining/olive-green-line-pattern-apron.webp'
import orangeBoxPatternApron from '../assets/images/products/kitchen-dining/orange-box-pattern-apron.webp'
import pistaGreenApron from '../assets/images/products/kitchen-dining/pista-green-apron.webp'
import pistaGreenApron2 from '../assets/images/products/kitchen-dining/pista-green-apron-2.webp'
import pistaGreenApron3 from '../assets/images/products/kitchen-dining/pista-green-apron-3.webp'
import pistaGreenApron4 from '../assets/images/products/kitchen-dining/pista-green-apron-4.webp'
import redBoxPatternApron from '../assets/images/products/kitchen-dining/red-box-pattern-apron.webp'
import redBoxBlueLineApron from '../assets/images/products/kitchen-dining/red-box-blue-line-apron.webp'
import redCheckeredApron from '../assets/images/products/kitchen-dining/red-checkered-apron.webp'
import redFloralApron from '../assets/images/products/kitchen-dining/red-floral-apron.webp'
import saffronApron from '../assets/images/products/kitchen-dining/saffron-apron.webp'
import sandalApron from '../assets/images/products/kitchen-dining/sandal-apron.webp'
import sandalRedFloralPocketApron from '../assets/images/products/kitchen-dining/sandal-red-floral-pocket-apron.webp'
import whiteBlueLeafApron from '../assets/images/products/kitchen-dining/white-blue-leaf-apron.webp'
import floralPrintedCurtains from '../assets/images/products/living-decor/floral-printed-curtains.webp'
import leafPrintedCurtains from '../assets/images/products/living-decor/leaf-printed-curtains.webp'
import printedCurtains from '../assets/images/products/living-decor/printed-curtains.webp'
import stripeLinedCurtains from '../assets/images/products/living-decor/stripe-lined-curtains.webp'
import curatedCushions from '../assets/images/products/living-decor/curated-cushions.webp'
import embroideredTextCushions from '../assets/images/products/living-decor/embroidered-text-cushions.webp'
import embroideredTextCushions2 from '../assets/images/products/living-decor/embroidered-text-cushions-2.webp'
import floorCushions from '../assets/images/products/living-decor/floor-cushions.webp'
import floorCushions2 from '../assets/images/products/living-decor/floor-cushions-2.webp'
import floorCushions3 from '../assets/images/products/living-decor/floor-cushions-3.webp'
import jacquardCushions from '../assets/images/products/living-decor/jacquard-cushions.webp'
import linenCushions from '../assets/images/products/living-decor/linen-cushions.webp'
import patchworkCushions from '../assets/images/products/living-decor/patchwork-cushions.webp'
import printedCushions from '../assets/images/products/living-decor/printed-cushions.webp'
import statementCushions from '../assets/images/products/living-decor/statement-cushions.webp'
import texturedCushions from '../assets/images/products/living-decor/textured-cushions.webp'
import wovenCushions from '../assets/images/products/living-decor/woven-cushions.webp'
import yarnDyedCushions from '../assets/images/products/living-decor/yarn-dyed-cushions.webp'
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
        ...photo(fabricDyedSet),
        children: [
          { name: 'Fabric Dyed Set', ...photo(fabricDyedSet) },
          { name: 'Floral Printed Set', ...photo(floralPrintedSet) },
          { name: 'Apron & Oven Mitts Combo Set', ...photo(apronOvenMittsComboSet) },
          { name: 'Traditional Checkered Apron', ...photo(traditionalCheckeredApron) },
          { name: 'Black Checkered Apron', ...photo(blackCheckeredApron) },
          { name: 'Black Checkered Apron', ...photo(blackCheckeredApron2) },
          { name: 'Black Apron', ...photo(blackApron) },
          { name: 'Black Apron', ...photo(blackApron2) },
          { name: 'Brown Checkered Apron', ...photo(brownCheckeredApron) },
          { name: 'Brown & White Checkered Apron', ...photo(brownWhiteCheckeredApron) },
          { name: 'Green Checkered Apron', ...photo(greenCheckeredApron) },
          { name: 'Olive Green Checkered Apron', ...photo(oliveGreenCheckeredApron) },
          { name: 'Olive Green Line Pattern Apron', ...photo(oliveGreenLinePatternApron) },
          { name: 'Orange Box Pattern Apron', ...photo(orangeBoxPatternApron) },
          { name: 'Pista Green Apron', ...photo(pistaGreenApron) },
          { name: 'Pista Green Apron', ...photo(pistaGreenApron2) },
          { name: 'Pista Green Apron', ...photo(pistaGreenApron3) },
          { name: 'Pista Green Apron', ...photo(pistaGreenApron4) },
          { name: 'Red Box Pattern Apron', ...photo(redBoxPatternApron) },
          { name: 'Red Box with Blue Line Apron', ...photo(redBoxBlueLineApron) },
          { name: 'Red Checkered Apron', ...photo(redCheckeredApron) },
          { name: 'Red Floral Apron', ...photo(redFloralApron) },
          { name: 'Saffron Apron', ...photo(saffronApron) },
          { name: 'Sandal Apron', ...photo(sandalApron) },
          { name: 'Sandal Apron with Red Floral Pocket', ...photo(sandalRedFloralPocketApron) },
          { name: 'White with Blue Leaf Apron', ...photo(whiteBlueLeafApron) },
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
          { name: 'Embroidered & Text Cushions', ...photo(embroideredTextCushions) },
          { name: 'Embroidered & Text Cushions', ...photo(embroideredTextCushions2) },
          { name: 'Floor Cushions', ...photo(floorCushions) },
          { name: 'Floor Cushions', ...photo(floorCushions2) },
          { name: 'Floor Cushions', ...photo(floorCushions3) },
          { name: 'Jacquard Cushions', ...photo(jacquardCushions) },
          { name: 'Linen Cushions', ...photo(linenCushions) },
          { name: 'Patchwork Cushions', ...photo(patchworkCushions) },
          { name: 'Printed Cushions', ...photo(printedCushions) },
          { name: 'Statement Cushions', ...photo(statementCushions) },
          { name: 'Textured Cushions', ...photo(texturedCushions) },
          { name: 'Woven Cushions', ...photo(wovenCushions) },
          { name: 'Yarn Dyed Cushions', ...photo(yarnDyedCushions) },
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
