import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Line } from '@react-three/drei'
import * as THREE from 'three'

const GOLD = '#C59D5F'
const GOLD_DIM = '#8a6d3f'

// A handful of loosely-woven curves drifting behind the hero copy — reads as
// "thread" without being a literal illustration. Cheap enough to run
// continuously (no shadows, no postprocessing).
function ThreadStrands({ count = 5 }) {
  const groupRef = useRef(null)

  const strands = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = i * 1.7
        const points = Array.from({ length: 6 }, (_, p) => {
          const t = p / 5
          return new THREE.Vector3(
            (t - 0.5) * 14 + Math.sin(seed + p) * 0.6,
            Math.sin(seed * 2 + t * 3) * 2.2 - i * 0.4 + 1.5,
            -2 - i * 0.8
          )
        })
        return new THREE.CatmullRomCurve3(points).getPoints(40)
      }),
    [count]
  )

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.children.forEach((line, i) => {
      line.position.y = Math.sin(t * 0.15 + i) * 0.35
      line.position.x = Math.sin(t * 0.08 + i * 2) * 0.5
    })
  })

  return (
    <group ref={groupRef}>
      {strands.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={i % 2 === 0 ? GOLD : GOLD_DIM}
          lineWidth={1.1}
          transparent
          opacity={0.35 - i * 0.03}
        />
      ))}
    </group>
  )
}

// Ambient WebGL backdrop used behind hero copy. Purely decorative
// (pointer-events disabled by the caller), so it degrades gracefully if
// WebGL init throws — see the try/catch wrapper this is normally rendered
// through from page components.
function HeroCanvas({ className = '', sparkleCount = 60 }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <ThreadStrands />
          <Sparkles count={sparkleCount} scale={[12, 6, 4]} size={2} speed={0.15} color={GOLD} opacity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroCanvas
