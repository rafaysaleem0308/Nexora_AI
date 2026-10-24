import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Central glowing AI core — optimized geometry & shaders.
 */
export function AICore() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.18
      outerRef.current.rotation.x = Math.sin(t * 0.22) * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.28
      innerRef.current.rotation.z = t * 0.12
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.35
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.2
      ring2Ref.current.rotation.x = Math.sin(t * 0.3) * 0.4
    }
  })

  return (
    <group>
      {/* Optimized ambient point lights */}
      <pointLight position={[0, 0, 0]} intensity={4.0} distance={5} color="#06b6d4" />
      <pointLight position={[0, 2, 0]} intensity={2.0} distance={4} color="#10b981" />

      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Middle distorted sphere — 32x32 segments for 4x faster shader performance */}
      <Sphere ref={innerRef} args={[0.88, 32, 32]}>
        <MeshDistortMaterial
          color="#042f2e"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.8}
          distort={0.32}
          speed={1.5}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[0.45, 20, 20]} />
        <meshStandardMaterial
          color="#e0f2fe"
          emissive="#22d3ee"
          emissiveIntensity={2.4}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.018, 12, 80]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.72, 0.012, 12, 80]} />
        <meshStandardMaterial
          color="#6ee7b7"
          emissive="#10b981"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[1.7, 24, 24]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0e7490"
          emissiveIntensity={0.15}
          transparent
          opacity={0.06}
          roughness={1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
