import Icon from '../ui/Icon.jsx'

// Shows the product photo when one has been supplied, otherwise a tinted
// placeholder built from the item's icon so the layout reads as finished
// while photography is still pending. Hover zoom keys off a `group` parent.
function ProductMedia({ image, icon, alt, size = 'lg', className = '' }) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
      />
    )
  }

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container-low via-background to-secondary/10 ${className}`}
      role="img"
      aria-label={`${alt} — photo coming soon`}
    >
      {/* Faint woven cross-hatch so the placeholder reads as fabric, not an empty box. */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #0F172A 0 1px, transparent 1px 10px), repeating-linear-gradient(90deg, #0F172A 0 1px, transparent 1px 10px)',
        }}
      />
      <div
        className={`relative flex items-center justify-center rounded-full bg-white/80 border border-secondary/25 shadow-sm transition-transform duration-500 group-hover:scale-110 ${
          size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
        }`}
      >
        <Icon name={icon} className={`text-secondary ${size === 'lg' ? 'text-4xl' : 'text-[1.75rem]'}`} />
      </div>
    </div>
  )
}

export default ProductMedia
