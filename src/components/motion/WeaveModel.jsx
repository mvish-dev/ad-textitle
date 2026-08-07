import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const GOLD = '#C59D5F'

// Abstract "woven thread" centerpiece — the one place on the site the user
// can actually reach into the 3D scene and drag it around. Deliberately
// abstract (a torus knot reads as an endless woven strand) rather than a
// literal product render, so it stays elegant instead of gimmicky.
function WovenKnot() {
  const meshRef = useRef(null)

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.x += delta * 0.05
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.25, 0.36, 220, 32, 2, 3]} />
      <meshStandardMaterial color={GOLD} metalness={0.75} roughness={0.3} />
    </mesh>
  )
}

function WeaveModel({ className = '' }) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5.5], fov: 42 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <pointLight position={[5, 5, 5]} intensity={70} color="#ffffff" />
          <pointLight position={[-5, -3, 3]} intensity={45} color={GOLD} />
          <directionalLight position={[0, 4, 6]} intensity={0.7} />
          <WovenKnot />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default WeaveModel
