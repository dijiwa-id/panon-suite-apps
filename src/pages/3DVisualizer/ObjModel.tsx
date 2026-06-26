import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

interface ObjModelProps {
  url: string;
  color?: string;
}

export function ObjModel({ url, color = '#ffffff' }: ObjModelProps) {
  const obj = useLoader(OBJLoader, url);

  const clonedObj = useMemo(() => {
    const clone = obj.clone();
    clone.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          roughness: 0.5,
          metalness: 0.5,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [obj, color]);

  return <primitive object={clonedObj} />;
}
