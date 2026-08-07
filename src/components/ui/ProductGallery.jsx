import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import Icon from './Icon.jsx'
import { gsap, Flip } from '../../lib/motion.js'

// Dynamic imports of images in Vite
const bedLinenGlob = import.meta.glob('../../assets/BL/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true })
const kitchenLinenGlob = import.meta.glob('../../assets/KL/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true })
const livingLinenGlob = import.meta.glob('../../assets/LL/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true })
const tableLinenGlob = import.meta.glob('../../assets/TL/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true })

const getFileName = (path) => {
  const parts = path.split('/')
  const nameWithExt = parts[parts.length - 1]
  return nameWithExt.split('.')[0]
}

const mapImages = (globObj, categoryName) => {
  return Object.keys(globObj)
    .filter(key => !key.endsWith('.html')) // Skip any non-image files like HTML stray pages
    .map(key => ({
      id: getFileName(key),
      url: globObj[key].default || globObj[key],
      category: categoryName
    }))
}

const ALL_PRODUCTS = [
  ...mapImages(bedLinenGlob, 'Bed Linen'),
  ...mapImages(kitchenLinenGlob, 'Kitchen Linen'),
  ...mapImages(livingLinenGlob, 'Living Linen'),
  ...mapImages(tableLinenGlob, 'Table Linen')
]

// Helper function to generate premium metadata dynamically
const getProductDetails = (product) => {
  if (!product) return null
  const code = product.id
  const num = parseInt(code.replace(/\D/g, ''), 10) || 1

  if (product.category === 'Bed Linen') {
    const names = [
      "Classic Sateen Sheet Set", "Hotel Border Duvet Cover", "Premium Percale Pillowcase", 
      "Waffle Weave Bedspread", "Quilted Cotton Coverlet", "Jacquard Weave Duvet Set",
      "Linen Blend Fitted Sheet", "Stripe Satin Bedding", "Premium Comfort Mattress Protector",
      "Luxury Down Comforter"
    ]
    const name = names[num % names.length]
    return {
      name,
      composition: "100% Long-Staple Combed Cotton",
      specLabel: "Thread Count",
      specValue: `${200 + (num % 5) * 100} TC`,
      finish: "Mercerized, Singed & Pre-Shrunk",
      features: ["Breathable, high-thread-count weave", "Industrial washing durability", "Azo-free eco-friendly dyeing"]
    }
  } else if (product.category === 'Living Linen') {
    const names = [
      "Tailored Slub Curtain Panel", "Grommet Velvet Drapery", "Pleated Linen Blend Curtain",
      "Sheer Voile Drapery Panel", "Jacquard Patterned Curtain", "Heavyweight Blackout Drape",
      "Textured Herringbone Curtain"
    ]
    const name = names[num % names.length]
    return {
      name,
      composition: "55% Belgian Linen / 45% Cotton Blend",
      specLabel: "Fabric Weight",
      specValue: `${220 + (num % 4) * 40} GSM`,
      finish: "Soft Wash, Precision-Hemmed",
      features: ["Elegant natural drape and texture", "UV-resistant fabric treatment", "Double-folded side & bottom hems"]
    }
  } else if (product.category === 'Kitchen Linen') {
    const names = [
      "Waffle Weave Apron", "Quilted Double Oven Mitt", "Herringbone Kitchen Towel Set",
      "Premium Pocket Apron", "Heavy Duty Pot Holder Set", "Classic Culinary Chef Apron",
      "Textured Glass Towel"
    ]
    const name = names[num % names.length]
    return {
      name,
      composition: "100% Pure Organic Cotton",
      specLabel: "Fabric Weight",
      specValue: `${250 + (num % 3) * 50} GSM`,
      finish: "Highly Absorbent Waffle Finishing",
      features: ["Extra-reinforced double stitching", "Highly absorbent and quick-drying", "Heat-resistant quilted padding"]
    }
  } else { // Table Linen
    const names = [
      "Hemstitched Tablecloth", "Linen Textured Table Runner", "Coordinated Placemat Set",
      "Elegant Mitered Napkins", "Jacquard Banqueting Tablecloth", "Stripe Border Table Runner",
      "Water-Resistant Dining Cover"
    ]
    const name = names[num % names.length]
    return {
      name,
      composition: "100% Ring-Spun Cotton or Cotton/Linen Blend",
      specLabel: "Stitch Finish",
      specValue: "Mitered Corners & Double-Stitched",
      finish: "Soil-Release Finish, Mercerized",
      features: ["Clean, professional mitered corners", "Stain & spill resistant treatment", "Elegant drape for grand tables"]
    }
  }
}

const ITEMS_PER_PAGE = 12

function ProductGallery({ category = 'ALL' }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(category)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sortBy, setSortBy] = useState('asc')

  const gridRef = useRef(null)
  const flipStateRef = useRef(null)

  // Capture the current card positions before a filter/sort/load-more
  // change so the post-render effect below can Flip them into their new
  // layout instead of hard-cutting.
  const captureFlipState = () => {
    if (gridRef.current) {
      flipStateRef.current = Flip.getState(gridRef.current.querySelectorAll('.product-card'))
    }
  }

  const handleTabChange = (tab) => {
    captureFlipState()
    setActiveTab(tab)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleSortChange = (value) => {
    captureFlipState()
    setSortBy(value)
  }

  // Filter items based on activeTab
  const filteredProducts = ALL_PRODUCTS.filter(item => {
    if (activeTab === 'ALL') return true
    if (activeTab === 'BL') return item.category === 'Bed Linen'
    if (activeTab === 'LL') return item.category === 'Living Linen'
    if (activeTab === 'KL') return item.category === 'Kitchen Linen'
    if (activeTab === 'TL') return item.category === 'Table Linen'
    return item.category === activeTab
  })

  // Sort items based on alphanumeric product code (natural sort)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' })
    } else {
      return b.id.localeCompare(a.id, undefined, { numeric: true, sensitivity: 'base' })
    }
  })

  const visibleProducts = sortedProducts.slice(0, visibleCount)
  const hasMore = sortedProducts.length > visibleCount

  const handleLoadMore = () => {
    captureFlipState()
    setVisibleCount(prev => prev + ITEMS_PER_PAGE)
  }

  useGSAP(
    () => {
      if (!flipStateRef.current) return
      Flip.from(flipStateRef.current, {
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.03,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(elements, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.92, duration: 0.3 }),
      })
      flipStateRef.current = null
    },
    { dependencies: [activeTab, sortBy, visibleCount], scope: gridRef }
  )

  const handleInquiry = (product) => {
    setSelectedProduct(null)
    navigate(`/contact?product=${product.id}&category=${encodeURIComponent(product.category)}`)
    // Scroll to contact form smoothly
    setTimeout(() => {
      const navbar = document.getElementById('navbar')
      const offset = navbar ? navbar.offsetHeight : 80
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="w-full">
      {/* Category Tabs (only shown when category === 'ALL') */}
      {category === 'ALL' && (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['ALL', 'BL', 'LL', 'KL', 'TL'].map((tab) => {
            const labelMap = {
              ALL: 'All Collections',
              BL: 'Bed Linen',
              LL: 'Living Linen',
              KL: 'Kitchen Linen',
              TL: 'Table Linen'
            }
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/30'
                }`}
              >
                {labelMap[tab]}
              </button>
            )
          })}
        </div>
      )}

      {/* Product Stats and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-surface-container-low/40 border border-outline-variant/30 rounded-xl px-6 py-3 font-sans text-xs md:text-sm text-on-surface-variant text-left w-full">
        <div className="font-medium text-on-surface-variant/80">
          Showing <span className="font-bold text-primary">{Math.min(visibleCount, sortedProducts.length)}</span> of <span className="font-bold text-primary">{sortedProducts.length}</span> products
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <label htmlFor="sortBy" className="font-semibold text-on-surface-variant/70 uppercase tracking-wider text-[10px]">Sort By:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-white border border-outline-variant/30 rounded-lg px-3 py-1.5 focus:border-secondary outline-none cursor-pointer font-semibold text-xs text-primary"
          >
            <option value="asc">Code (Ascending)</option>
            <option value="desc">Code (Descending)</option>
          </select>
        </div>
      </div>

      {/* Product Grid — re-flows via GSAP Flip on filter/sort/load-more
          instead of a hard cut, so cards that stay visible glide to their
          new position and only genuinely new/removed cards fade. */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
          const details = getProductDetails(product)
          return (
            <div
              key={product.id}
              data-flip-id={product.id}
              data-cursor-label="View"
              className="product-card group relative overflow-hidden bg-white border border-outline-variant/20 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-square w-full overflow-hidden bg-surface-container-low relative shrink-0">
                <img
                  src={product.url}
                  alt={details.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Glassmorphic Category Label */}
                <div className="absolute top-3 left-3 bg-primary/75 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider text-white z-10">
                  {product.category}
                </div>
              </div>
              <div className="p-4 border-t border-outline-variant/10 flex flex-col justify-between flex-grow text-left">
                <div>
                  <p className="text-[10px] text-secondary font-bold tracking-widest uppercase mb-1">
                    {product.id}
                  </p>
                  <h4 className="font-headline-lg text-sm text-primary font-semibold truncate">
                    {details.name}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-1">
                    {details.composition}
                  </p>
                </div>

                {/* Direct Get Quote E-commerce CTA Button */}
                <div className="mt-4 pt-3 border-t border-outline-variant/5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation() // Prevent modal trigger
                      handleInquiry(product)
                    }}
                    className="w-full py-2 bg-transparent hover:bg-primary border border-primary text-primary hover:text-white font-label-md text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    Get Quote
                    <Icon name="arrow_forward" className="text-[10px] shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* No products found */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-surface-container-low rounded-xl border border-dashed border-outline-variant">
          <Icon name="search_off" className="text-4xl text-on-surface-variant/40 mb-4" />
          <p className="font-body-md text-sm text-on-surface-variant">No products found in this category.</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-[#1E293B] text-white font-label-md text-xs font-semibold uppercase tracking-wider rounded-full shadow transition-all duration-300 hover:scale-103 cursor-pointer"
          >
            Load More Products
            <Icon name="expand_more" />
          </button>
        </div>
      )}

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Left Column: Image */}
              <div className="relative bg-surface-container-low h-64 md:h-full w-full">
                <img
                  src={selectedProduct.url}
                  alt={selectedProduct.id}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                  {selectedProduct.category}
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="p-6 md:p-10 flex flex-col justify-between overflow-y-auto h-full text-left">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-background hover:bg-surface-container rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer z-20 border border-outline-variant/30"
                  aria-label="Close details"
                >
                  <Icon name="close" className="text-xl" />
                </button>

                <div>
                  <span className="text-xs text-secondary font-bold tracking-widest uppercase block mb-2">
                    Product Code: {selectedProduct.id}
                  </span>
                  <h3 className="font-headline-lg text-2xl text-primary font-semibold mb-6">
                    {getProductDetails(selectedProduct).name}
                  </h3>

                  <div className="divider mb-6" />

                  {/* Specifications */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant/70 tracking-wider">Composition</span>
                      <span className="col-span-2 text-xs text-primary font-medium">{getProductDetails(selectedProduct).composition}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant/70 tracking-wider">
                        {getProductDetails(selectedProduct).specLabel}
                      </span>
                      <span className="col-span-2 text-xs text-primary font-medium">{getProductDetails(selectedProduct).specValue}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant/70 tracking-wider">Fabric Finish</span>
                      <span className="col-span-2 text-xs text-primary font-medium">{getProductDetails(selectedProduct).finish}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-8">
                    <h5 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-3">Key Features</h5>
                    <ul className="space-y-2">
                      {getProductDetails(selectedProduct).features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                          <Icon name="check_circle" className="text-secondary text-sm shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Inquiry CTA */}
                <div className="mt-8 md:mt-12 pt-6 border-t border-outline-variant/20">
                  <button
                    onClick={() => handleInquiry(selectedProduct)}
                    className="w-full py-4 bg-primary hover:bg-[#1E293B] text-white font-label-md text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer shadow-[0_8px_24px_rgba(15,23,42,0.15)]"
                  >
                    Inquire About This Product
                    <Icon name="send" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductGallery
