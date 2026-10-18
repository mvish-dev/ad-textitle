import { Link } from 'react-router-dom'
import ProductMedia from './ProductMedia.jsx'
import { PRODUCT_CATEGORIES, productCategoryPath } from '../../data/products.js'

// Circular category switcher shown under a category page's hero. The active
// category is larger, ringed in gold with a slowly turning dashed "stitch"
// ring, and its label is underlined — the rest lift and ring on hover.
function CategoryNav({ activeId }) {
  return (
    <nav aria-label="Product categories" className="bg-surface-container-low border-b border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <ul className="flex md:justify-between items-end gap-8 md:gap-6 overflow-x-auto snap-x px-3 py-8 md:py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PRODUCT_CATEGORIES.map((category, index) => {
            const active = category.id === activeId
            return (
              <li key={category.id} className="snap-center shrink-0 md:flex-1">
                <Link
                  to={productCategoryPath(category)}
                  aria-current={active ? 'page' : undefined}
                  className="group flex flex-col items-center text-center gap-4"
                >
                  <span
                    className={`relative block rounded-full transition-all duration-500 ${
                      active ? 'w-28 h-28 md:w-32 md:h-32' : 'w-20 h-20 md:w-24 md:h-24 group-hover:-translate-y-1'
                    }`}
                  >
                    {/* Dashed "stitch" ring — spins on the active item, fades in on hover for the rest. */}
                    <span
                      className={`absolute -inset-2.5 rounded-full border-2 border-dashed border-secondary transition-opacity duration-300 ${
                        active
                          ? 'opacity-100 animate-[spin_14s_linear_infinite] motion-reduce:animate-none'
                          : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                    <span
                      className={`absolute inset-0 rounded-full overflow-hidden border-[3px] shadow-md transition-colors duration-300 ${
                        active ? 'border-secondary' : 'border-white group-hover:border-secondary/60'
                      }`}
                    >
                      <ProductMedia image={category.image} icon={category.icon} alt={category.title} size="sm" />
                    </span>
                    <span
                      className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[0.62rem] font-bold shadow-sm transition-colors ${
                        active ? 'bg-secondary text-white' : 'bg-white text-primary border border-outline-variant/40'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <span
                    className={`font-label-md text-[0.78rem] md:text-[0.82rem] font-semibold uppercase tracking-[0.12em] whitespace-nowrap pb-1 border-b-2 transition-colors ${
                      active
                        ? 'text-secondary border-secondary'
                        : 'text-primary border-transparent group-hover:text-secondary'
                    }`}
                  >
                    {category.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default CategoryNav
