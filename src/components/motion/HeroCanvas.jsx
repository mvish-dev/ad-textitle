import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const GOLD_DIM = new THREE.Color('#a9895b')
const GOLD = new THREE.Color('#C59D5F')
const GOLD_BRIGHT = new THREE.Color('#F4E4C8')

const COLS = 16
const ROWS = 9
const COUNT = COLS * ROWS
const INFLUENCE_RADIUS = 1.2
const DOT_RADIUS = 0.011
const LERP_SPEED = 0.07

const dummy = new THREE.Object3D()
const colorScratch = new THREE.Color()

// Deterministic hash noise (not Math.random) so the scattered layout is a
// pure function of each dot's index — stable across re-renders.
function hashNoise(seed) {
  const x = Math.sin(seed) * 43758.5453
  return x - Math.floor(x)
}

// A sparse field of champagne-gold/ivory motes behind the hero copy —
// jittered off a grid and randomly sized so it reads as floating textile
// dust rather than decorative dots. Barely-there and slow-drifting at rest;
// only motes within a tight radius of the cursor brighten and scale up, so
// the reaction stays localized rather than sweeping the whole field.
// Pointer is tracked manually via a window listener (not R3F's built-in
// pointer state) because the wrapping div is pointer-events-none so clicks
// can pass through to the hero content.
function DotField({ pointerRef }) {
  const meshRef = useRef(null)
  const { viewport } = useThree()
  const smoothed = useRef(new THREE.Vector2(9999, 9999))
  const smoothedInit = useRef(false)

  // CircleGeometry has no per-vertex `color` attribute. With
  // material.vertexColors on, the vertex shader still multiplies vColor by
  // that (missing) attribute — WebGL reads a disabled attribute as (0,0,0),
  // which zeroes vColor before it's multiplied by instanceColor, rendering
  // every dot black. Supplying an explicit all-white color attribute makes
  // that multiply a no-op so the real instance color survives.
  const geometry = useMemo(() => {
    const geo = new THREE.CircleGeometry(DOT_RADIUS, 12)
    const count = geo.attributes.position.count
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3).fill(1), 3))
    return geo
  }, [])

  const { basePositions, baseScales } = useMemo(() => {
    const w = viewport.width * 1.1
    const h = viewport.height * 1.25
    const cellW = w / (COLS - 1)
    const cellH = h / (ROWS - 1)
    const positions = new Float32Array(COUNT * 2)
    const scales = new Float32Array(COUNT)
    let i = 0
    let s = 0
    for (let iy = 0; iy < ROWS; iy++) {
      for (let ix = 0; ix < COLS; ix++) {
        const seed = iy * COLS + ix
        const jitterX = (hashNoise(seed * 12.9898) - 0.5) * cellW * 0.7
        const jitterY = (hashNoise(seed * 78.233 + 4.1) - 0.5) * cellH * 0.7
        positions[i++] = (ix / (COLS - 1) - 0.5) * w + jitterX
        positions[i++] = (iy / (ROWS - 1) - 0.5) * h + jitterY
        scales[s++] = 0.5 + hashNoise(seed * 39.425 + 9.3) * 1.1
      }
    }
    return { basePositions: positions, baseScales: scales }
  }, [viewport.width, viewport.height])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return

    const hasPointer = pointerRef.current.x !== 9999
    const targetX = (pointerRef.current.x * viewport.width) / 2
    const targetY = (pointerRef.current.y * viewport.height) / 2

    if (hasPointer && !smoothedInit.current) {
      // First real cursor reading: snap instead of lerping in from the
      // far-off sentinel, otherwise the exponential decay from (9999, 9999)
      // takes ~1s of real time to reach the grid regardless of target —
      // reads as "nothing happens" on a quick hover.
      smoothed.current.set(targetX, targetY)
      smoothedInit.current = true
    } else {
      smoothed.current.x += (targetX - smoothed.current.x) * LERP_SPEED
      smoothed.current.y += (targetY - smoothed.current.y) * LERP_SPEED
    }

    const t = clock.getElapsedTime()

    for (let i = 0; i < COUNT; i++) {
      const bx = basePositions[i * 2]
      const by = basePositions[i * 2 + 1]
      const dx = bx - smoothed.current.x
      const dy = by - smoothed.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = dist < INFLUENCE_RADIUS ? 1 - dist / INFLUENCE_RADIUS : 0
      const eased = influence * influence
      const baseScale = baseScales[i]

      const angle = Math.atan2(dy, dx)
      const push = eased * 0.5
      const drift = Math.sin(t * 0.15 + bx * 2 + by * 2) * 0.02

      dummy.position.set(bx + Math.cos(angle) * push, by + Math.sin(angle) * push + drift, 0)
      dummy.scale.setScalar(baseScale * (1 + eased * 3.2))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      colorScratch.copy(GOLD_DIM).lerp(GOLD, (baseScale - 0.5) / 1.1)
      colorScratch.lerp(GOLD_BRIGHT, eased)
      mesh.setColorAt(i, colorScratch)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, COUNT]}>
      <meshBasicMaterial color="#ffffff" vertexColors transparent opacity={0.22} toneMapped={false} />
    </instancedMesh>
  )
}

// Ambient WebGL backdrop used behind hero copy. Purely decorative
// (pointer-events disabled by the caller), so it degrades gracefully if
// WebGL init throws — see the try/catch wrapper this is normally rendered
// through from page components.
function HeroCanvas({ className = '' }) {
  const containerRef = useRef(null)
  const pointerRef = useRef(new THREE.Vector2(9999, 9999))

  useEffect(() => {
    const handlePointerMove = (event) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      pointerRef.current.set(nx, ny)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <DotField pointerRef={pointerRef} />
      </Canvas>
    </div>
  )
}

export default HeroCanvas
