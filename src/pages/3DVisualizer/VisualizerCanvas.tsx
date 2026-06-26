import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls, Grid, Html, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { VisualizerState, SceneObject } from './types';
import { ObjModel } from './ObjModel';
import * as THREE from 'three';

interface VisualizerCanvasProps {
  state: VisualizerState;
  onObjectUpdate: (id: string, updates: Partial<SceneObject>) => void;
  onObjectSelect: (id: string | null) => void;
}

const ObjectNode = ({
  obj,
  isSelected,
  mode,
  onUpdate,
  onSelect,
}: {
  obj: SceneObject;
  isSelected: boolean;
  mode: 'live' | 'edit';
  onUpdate: (updates: Partial<SceneObject>) => void;
  onSelect: (id: string | null) => void;
}) => {
  const [target, setTarget] = React.useState<THREE.Group | null>(null);
  const transformRef = useRef<any>(null);

  return (
    <>
      {/* If object is selected in Edit mode, show TransformControls */}
      {isSelected && mode === 'edit' && target && (
        <TransformControls
          ref={transformRef}
          object={target}
          mode="translate"
          onMouseUp={() => {
            if (target) {
              onUpdate({
                position: [
                  target.position.x,
                  target.position.y,
                  target.position.z,
                ],
                rotation: [
                  target.rotation.x,
                  target.rotation.y,
                  target.rotation.z,
                ],
                scale: [
                  target.scale.x,
                  target.scale.y,
                  target.scale.z,
                ],
              });
            }
          }}
        />
      )}

      <group
        position={obj.position}
        rotation={obj.rotation}
        scale={obj.scale}
        ref={setTarget}
        onClick={(e) => {
          if (mode === 'edit') {
            e.stopPropagation();
            onSelect(obj.id);
          }
        }}
      >
        {/* Render the actual object */}
        {obj.type === 'box' ? (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={isSelected ? '#7c3aed' : '#a0a0a0'} />
          </mesh>
        ) : obj.type === 'pin' ? (
          <group position={[0, 0.5, 0]}>
            <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color={isSelected ? '#7c3aed' : '#f59e0b'} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <cylinderGeometry args={[0, 0.1, 1, 8]} />
              <meshStandardMaterial color={isSelected ? '#7c3aed' : '#f59e0b'} />
            </mesh>
          </group>
        ) : obj.objUrl ? (
          <Suspense fallback={<mesh><boxGeometry args={[1,1,1]} /><meshBasicMaterial wireframe color="gray" /></mesh>}>
            <ObjModel url={obj.objUrl} color={isSelected ? '#7c3aed' : '#ffffff'} />
          </Suspense>
        ) : null}

        {/* Label for the object */}
        {(obj.label || obj.deviceCategory) && (
          <Html position={[0, obj.type === 'pin' ? 1.5 : 1.5, 0]} center>
            <div className="px-2 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-[6px] shadow-lg pointer-events-none flex flex-col items-center border border-white/10">
              {obj.label && <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">{obj.label}</span>}
              {obj.type === 'pin' && mode === 'live' && obj.deviceCategory && (
                <div className="flex flex-col items-center mt-1 pt-1 border-t border-white/20">
                  <span className="text-[8px] font-medium text-[#f59e0b] uppercase">{obj.deviceCategory}</span>
                  {obj.iotConfig?.endpoint && <span className="text-[7px] text-gray-400 mt-0.5">{obj.iotConfig.endpoint}</span>}
                </div>
              )}
            </div>
          </Html>
        )}
      </group>
    </>
  );
};

export default function VisualizerCanvas({ state, onObjectUpdate, onObjectSelect }: VisualizerCanvasProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 5, 5], fov: 50 }}
      onPointerMissed={() => onObjectSelect(null)}
      className="w-full h-full"
    >
      <ambientLight intensity={state.settings.ambientLightIntensity} />
      <directionalLight 
        castShadow 
        position={[10, 10, 10]} 
        intensity={state.settings.directionalLightIntensity} 
        shadow-mapSize={[1024, 1024]}
      />

      {state.settings.showGrid && (
        <Grid infiniteGrid fadeDistance={50} sectionColor="#333" cellColor="#222" />
      )}

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
      </GizmoHelper>

      <OrbitControls makeDefault />

      {state.objects.map((obj) => (
        <ObjectNode
          key={obj.id}
          obj={obj}
          isSelected={obj.id === state.selectedObjectId}
          mode={state.mode}
          onUpdate={(updates) => onObjectUpdate(obj.id, updates)}
          onSelect={onObjectSelect}
        />
      ))}
    </Canvas>
  );
}
