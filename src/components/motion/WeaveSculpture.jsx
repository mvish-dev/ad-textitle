import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const NAVY = '#1e293b'
const IVORY = '#F4E4C8'
const GOLD = '#C59D5F'
const STRAND_COLORS = [NAVY, IVORY, GOLD, NAVY]

const DRAG_SENSITIVITY = 0.006
const DAMPING = 0.94
const MAX_TILT = 0.55
const IDLE_SPEED = 0.25
const IDLE_AMPLITUDE_Y = THREE.MathUtils.degToRad(2.6)
const IDLE_AMPLITUDE_X = THREE.MathUtils.degToRad(1.4)
const SETTLE_LERP = 0.04
const HOVER_LERP = 0.08
const REST_SPEED_EPSILON = 0.0004

// Closed, single-stroke outlines (z = 0) for stylised "A" and "D" glyphs —
// abstract rather than exact typography, since each is rendered as one
// continuous braided rope and a rope can't lift and restart the way a pen
// drawing real letterforms would.
const LETTER_A_POINTS = [
  [0, 1.05],
  [0.55, -1],
  [0.22, -0.05],
  [-0.22, -0.05],
  [-0.55, -1],
]
const LETTER_D_POINTS = [
  [-0.5, -1],
  [-0.5, 1],
  [0.15, 1],
  [0.65, 0.6],
  [0.75, 0],
  [0.65, -0.6],
  [0.15, -1],
]

function pointsToCurve(points) {
  const vecs = points.map(([x, y]) => new THREE.Vector3(x, y, 0))
  return new THREE.CatmullRomCurve3(vecs, true, 'catmullrom', 0.5)
}

// Offsets a base curve's Frenet frame by a rotating radius to trace one
// strand of a braided-rope look, then re-wraps the offset points into a
// curve so it can be extruded with TubeGeometry.
function buildStrandCurve(baseCurve, strandIndex, strandCount, radius, twists, segments = 220) {
  const frames = baseCurve.computeFrenetFrames(segments, true)
  const pts = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const basePt = baseCurve.getPointAt(t)
    const normal = frames.normals[i]
    const binormal = frames.binormals[i]
    const phase = t * Math.PI * 2 * twists + (strandIndex / strandCount) * Math.PI * 2
    const offset = normal
      .clone()
      .multiplyScalar(Math.cos(phase) * radius)
      .add(binormal.clone().multiplyScalar(Math.sin(phase) * radius))
    pts.push(basePt.clone().add(offset))
  }
  return new THREE.CatmullRomCurve3(pts, true)
}

function buildLetterGeometries(points, { strandCount = 4, radius = 0.11, tubeRadius = 0.05, twists = 5 } = {}) {
  const baseCurve = pointsToCurve(points)
  return Array.from({ length: strandCount }, (_, i) => {
    const strandCurve = buildStrandCurve(baseCurve, i, strandCount, radius, twists)
    return new THREE.TubeGeometry(strandCurve, 220, tubeRadius, 8, true)
  })
}

// The interactive centerpiece: two braided-rope glyphs sharing one rigid
// group. Dragging rotates the group around its own center only (no
// translation/orbit); releasing lets the drag velocity decay into a settled
// pose, from which a small idle wobble takes over until the visitor grabs
// it again. Hover brightens every strand's emissive term slightly so the
// object visibly announces it's interactive.
function SculptureGroup({ containerRef }) {
  const groupRef = useRef(null)
  const materialsRef = useRef([])

  const rot = useRef({ x: 0, y: 0.3 })
  const vel = useRef({ x: 0, y: 0 })
  const rest = useRef({ x: 0, y: 0.3 })
  const dragging = useRef(false)
  const settled = useRef(true)
  const lastPos = useRef({ x: 0, y: 0 })
  const hover = useRef(0)
  const hoverTarget = useRef(0)

  const letterAGeoms = useMemo(() => buildLetterGeometries(LETTER_A_POINTS), [])
  const letterDGeoms = useMemo(() => buildLetterGeometries(LETTER_D_POINTS), [])

  const registerMaterial = (mat) => {
    if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat)
  }

  const handlePointerMove = (event) => {
    if (!dragging.current) return
    const dx = event.clientX - lastPos.current.x
    const dy = event.clientY - lastPos.current.y
    lastPos.current = { x: event.clientX, y: event.clientY }

    rot.current.y += dx * DRAG_SENSITIVITY
    rot.current.x = THREE.MathUtils.clamp(rot.current.x + dy * DRAG_SENSITIVITY, -MAX_TILT, MAX_TILT)
    vel.current.y = dx * DRAG_SENSITIVITY
    vel.current.x = dy * DRAG_SENSITIVITY
  }

  const handlePointerUp = () => {
    dragging.current = false
    settled.current = false
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }

  const handlePointerDown = (event) => {
    event.stopPropagation()
    dragging.current = true
    settled.current = false
    lastPos.current = { x: event.clientX, y: event.clientY }
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerOver = (event) => {
    event.stopPropagation()
    hoverTarget.current = 1
    const canvasEl = containerRef.current?.querySelector('canvas')
    if (canvasEl) canvasEl.dataset.cursorLabel = 'Drag'
  }

  const handlePointerOut = () => {
    hoverTarget.current = 0
    const canvasEl = containerRef.current?.querySelector('canvas')
    if (canvasEl) delete canvasEl.dataset.cursorLabel
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (!dragging.current) {
      rot.current.x += vel.current.x
      rot.current.y += vel.current.y
      vel.current.x *= DAMPING
      vel.current.y *= DAMPING
      rot.current.x = THREE.MathUtils.clamp(rot.current.x, -MAX_TILT, MAX_TILT)

      const speed = Math.hypot(vel.current.x, vel.current.y)
      if (!settled.current && speed < REST_SPEED_EPSILON) {
        settled.current = true
        rest.current = { x: rot.current.x, y: rot.current.y }
      }

      if (settled.current) {
        const targetY = rest.current.y + Math.sin(t * IDLE_SPEED) * IDLE_AMPLITUDE_Y
        const targetX = rest.current.x + Math.sin(t * IDLE_SPEED * 0.8 + 1.4) * IDLE_AMPLITUDE_X
        rot.current.y = THREE.MathUtils.lerp(rot.current.y, targetY, SETTLE_LERP)
        rot.current.x = THREE.MathUtils.lerp(rot.current.x, targetX, SETTLE_LERP)
      }
    }

    if (groupRef.current) {
      groupRef.current.rotation.set(rot.current.x, rot.current.y, 0)
    }

    hover.current = THREE.MathUtils.lerp(hover.current, hoverTarget.current, HOVER_LERP)
    materialsRef.current.forEach((mat) => {
      mat.emissiveIntensity = hover.current * 0.4
    })
  })

  return (
    <group ref={groupRef} scale={0.78}>
      {/* Generously-sized invisible hit-area, comfortably larger than the
          thin rope strands so drag/hover register reliably anywhere over
          the glyphs rather than only on razor-thin geometry. Sits in front
          of the visible strands so it's what the raycaster actually hits;
          fully transparent so it never occludes them visually. */}
      <mesh
        position={[0, 0, 0.15]}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[3.8, 2.3, 0.3]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <group position={[-1.05, 0, 0]}>
        {letterAGeoms.map((geo, i) => (
          <mesh key={`a-${i}`} geometry={geo}>
            <meshStandardMaterial
              ref={registerMaterial}
              color={STRAND_COLORS[i % STRAND_COLORS.length]}
              emissive={STRAND_COLORS[i % STRAND_COLORS.length]}
              emissiveIntensity={0}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
        ))}
      </group>
      <group position={[1.05, 0, 0]}>
        {letterDGeoms.map((geo, i) => (
          <mesh key={`d-${i}`} geometry={geo}>
            <meshStandardMaterial
              ref={registerMaterial}
              color={STRAND_COLORS[i % STRAND_COLORS.length]}
              emissive={STRAND_COLORS[i % STRAND_COLORS.length]}
              emissiveIntensity={0}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Fixed-position hero centerpiece — never follows the cursor, only rotates
// in place when dragged directly. A blurred CSS radial-gradient sits behind
// the canvas for a cinematic glow/shadow without an extra WebGL pass, and a
// sparse, non-interactive Sparkles field (distinct from the ambient
// cursor-reactive dot grid elsewhere in the hero) adds a little floating
// dust around it.
function WeaveSculpture({ className = '' }) {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(closest-side, rgba(197,157,95,0.30) 0%, rgba(197,157,95,0.10) 50%, transparent 72%)',
          filter: 'blur(46px)',
        }}
        aria-hidden="true"
      />
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 7.5], fov: 38 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 4, 5]} intensity={0.9} />
          <pointLight position={[-2, -1, 3]} intensity={0.4} color={GOLD} />
          <SculptureGroup containerRef={containerRef} />
          <Sparkles count={18} scale={[4, 4, 2]} size={1.6} speed={0.08} color={GOLD} opacity={0.25} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default WeaveSculpture
