import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Graticule, Marker, Line } from 'react-simple-maps'
import { geoInterpolate } from 'd3-geo'
import worldTopology from 'world-atlas/countries-110m.json'

const HQ_COORDINATES = [78.0323, 10.9754]

const DESTINATIONS = [
  { id: 'europe', region: 'Europe', label: 'Rotterdam / Hamburg', coordinates: [4.4777, 51.9244] },
  { id: 'us-east', region: 'US East Coast', label: 'New York / Savannah', coordinates: [-74.006, 40.7128] },
  { id: 'middle-east', region: 'Middle East', label: 'Jebel Ali, Dubai', coordinates: [55.2708, 25.2532] },
  { id: 'east-asia', region: 'East Asia', label: 'Singapore / Tokyo', coordinates: [103.8198, 1.3521] },
]

// Points along the true great-circle path so routes read as flight-path arcs
// rather than projection-warped straight lines between the two ports.
function greatCircleArc(from, to, steps = 48) {
  const interpolate = geoInterpolate(from, to)
  return Array.from({ length: steps + 1 }, (_, step) => interpolate(step / steps))
}

const MAP_LABEL_STYLE = {
  fontSize: '7px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  paintOrder: 'stroke',
  stroke: '#0F172A',
  strokeWidth: 3,
  strokeLinejoin: 'round',
  pointerEvents: 'none',
}

function ExportRouteMap({ isExpanded = false }) {
  const [hoveredId, setHoveredId] = useState(null)
  // The SVG element always fills its container (width/height: 100%), but
  // preserveAspectRatio="meet" (the default) only scales the viewBox content
  // up to whichever axis is the tighter fit — so a viewBox tuned for the
  // collapsed card's ~1.6:1 shape stays letterboxed with empty side bars
  // once the card widens to ~2.7:1 on hover. Widening (shortening) the
  // viewBox itself for the expanded state, instead of just resizing the
  // container, keeps the projected map filling the actual visible width.
  // The shorter canvas also needs a smaller scale — otherwise Rotterdam
  // (the northernmost route point, ~52°N) projects right off the top edge.
  const height = isExpanded ? 300 : 480
  const scale = isExpanded ? 134 : 148

  return (
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{ scale, rotate: [-15, 0, 0] }}
      width={800}
      height={height}
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <marker id="route-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#C59D5F" />
        </marker>
      </defs>

      <Graticule stroke="#ffffff" strokeWidth={0.4} strokeOpacity={0.05} />

      <Geographies geography={worldTopology}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const isIndia = geo.properties.name === 'India'
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isIndia ? '#C59D5F' : '#25476B'}
                stroke="#0F172A"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: isIndia ? '#C59D5F' : '#2F5A85' },
                  pressed: { outline: 'none' },
                }}
              />
            )
          })
        }
      </Geographies>

      {DESTINATIONS.map((dest) => (
        <Line
          key={dest.id}
          coordinates={greatCircleArc(HQ_COORDINATES, dest.coordinates)}
          fill="none"
          stroke="#C59D5F"
          strokeWidth={hoveredId === dest.id ? 1.6 : 1}
          strokeDasharray="1,3"
          strokeLinecap="round"
          markerEnd="url(#route-arrowhead)"
          className="transition-all duration-300"
          style={{ opacity: hoveredId === null || hoveredId === dest.id ? 0.85 : 0.25 }}
        />
      ))}

      <Marker coordinates={HQ_COORDINATES}>
        <circle r={3.5} fill="#C59D5F" stroke="#0F172A" strokeWidth={1} />
        <circle r={7} fill="none" stroke="#C59D5F" strokeOpacity={0.5} strokeWidth={1} className="animate-ping" style={{ transformOrigin: 'center' }} />
        <text y={-9} textAnchor="middle" fill="#F4E4C8" style={MAP_LABEL_STYLE}>
          KARUR HQ
        </text>
      </Marker>

      {DESTINATIONS.map((dest) => (
        <Marker
          key={dest.id}
          coordinates={dest.coordinates}
          onMouseEnter={() => setHoveredId(dest.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{ default: { cursor: 'pointer' } }}
        >
          <circle
            r={hoveredId === dest.id ? 4 : 3}
            fill="#F4E4C8"
            stroke="#0F172A"
            strokeWidth={1}
            className="transition-all duration-200"
          >
            <title>{`${dest.region}: ${dest.label}`}</title>
          </circle>
          <text y={-8} textAnchor="middle" fill="#ffffff" style={MAP_LABEL_STYLE}>
            {dest.region.toUpperCase()}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  )
}

export default ExportRouteMap
