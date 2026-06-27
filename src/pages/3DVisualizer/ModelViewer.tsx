import React, { useMemo, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader, GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';

interface ModelViewerProps {
  url: string;
  type: 'obj' | 'gltf' | 'glb';
  color?: string;
  style?: 'normal' | 'futuristic' | '3tone';
}

export function ModelViewer({ url, type, color = '#ffffff', style = 'normal' }: ModelViewerProps) {
  const isObj = type === 'obj';
  const loader = isObj ? OBJLoader : GLTFLoader;
  const object = useLoader(loader as any, url) as any;

  const clonedObj = useMemo(() => {
    const rawObj = isObj ? object : object.scene;
    if (!rawObj) return null;
    const clone = rawObj.clone();

    // Auto-center and normalize scale
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Normalize scale so the longest dimension is 2 units
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2 / maxDim;
      clone.scale.setScalar(scale);
    }
    
    // Recalculate box after scale
    const scaledBox = new THREE.Box3().setFromObject(clone);
    const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
    
    // Center the model
    clone.position.sub(scaledCenter);

    clone.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        let targetColor = color;
        if (!isObj) {
           // For GLTF, we try to preserve original color but apply our styling
           const mat = mesh.material as THREE.MeshStandardMaterial;
           if (mat && mat.color) {
             targetColor = '#' + mat.color.getHexString();
           }
        }

        if (style === 'futuristic') {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#0ff'),
            emissive: new THREE.Color('#048'),
            emissiveIntensity: 0.8,
            wireframe: true,
            transparent: true,
            opacity: 0.8,
          });
        } else if (style === '3tone') {
          mesh.material = new THREE.MeshToonMaterial({
            color: new THREE.Color(targetColor),
          });
        } else {
          // normal
          if (isObj) {
            mesh.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(color),
              roughness: 0.5,
              metalness: 0.5,
            });
          }
        }
        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    
    // Return a group that contains the centered and scaled clone
    const group = new THREE.Group();
    group.add(clone);
    return group;
  }, [object, color, isObj, style]);

  if (!clonedObj) return null;
  return <primitive object={clonedObj} />;
}
