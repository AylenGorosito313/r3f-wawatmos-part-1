/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/MoonPoly/MoonPoly.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function MoonModelPoly (props) {
  const { nodes, materials } = useGLTF('/models/MoonPoly/MoonPoly.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Moon.geometry} material={materials.Mat} />
    </group>
  )
}

useGLTF.preload('/MoonPoly.glb')
