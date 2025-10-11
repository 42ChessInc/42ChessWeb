import {Suspense, useEffect, useRef} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {useGLTF, OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import type {GLTF} from "three-stdlib";

type GLTFResult = GLTF & {scene: THREE.Group};

interface QueenModelProps {
	url?: string;
}

function QueenModel({url = "/Queen.glb"}: QueenModelProps) {
	// typed gltf result
	const gltf = useGLTF(url) as GLTFResult;
	const groupRef = useRef<THREE.Group | null>(null);
	const lightRef = useRef<THREE.DirectionalLight | null>(null);
	const mouse = useRef({x: 0, y: 0});

	// Track mouse in normalized device coords (-1..1)
	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
		};
		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	// animate / update every frame
	useFrame(() => {
		const m = mouse.current;
		const g = groupRef.current;
		const l = lightRef.current;
		if (!g) return;

		const targetZ = -m.x * 0.15; // tilt left/right
		const targetX = -m.y * 0.15; // tilt forward/back

		// smooth interpolation
		g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, targetZ, 0.1);
		g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.1);

		if (l) {
			l.position.x = m.x * 80;
			l.position.y = m.y * 120;
			l.position.z = 60;
			// point the light toward the model
			l.lookAt(g.position);
		}
	});

	return (
		<group>
			<directionalLight
				ref={lightRef}
				color={0xf5f5e6}
				intensity={1}
				position={[0, -1, 0]}
				castShadow={false}
			/>

			{/* The GLTF scene as a primitive. We place it inside a wrapper group so we can rotate/scale it easily */}
			<group ref={groupRef} scale={[0.3, 0.3, 0.3]} position={[0, -1, 0]}>
				<primitive object={gltf.scene} />
			</group>
		</group>
	);
}

export function Queen3d() {
	useGLTF.preload("/Queen.glb");

	return (
		<div className="absolute h-full right-1/12 top-0 z-10">
			<Canvas camera={{position: [0, 1, 5], fov: 75}}>
				{/* Ambient + Model (which creates its own directional light) */}
				<ambientLight intensity={0.4} />

				<Suspense fallback={null}>
					<QueenModel url={"/Queen.glb"} />
				</Suspense>

				{/* optional controls for debugging; remove or configure for production */}
				<OrbitControls
					enablePan={false}
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
				/>
			</Canvas>
		</div>
	);
}
