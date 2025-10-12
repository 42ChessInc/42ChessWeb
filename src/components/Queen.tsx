import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Queen() {
	const containerRef =
		useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container =
			containerRef.current;
		if (!container) return;

		const scene = new THREE.Scene();
		const camera =
			new THREE.PerspectiveCamera(
				75,
				container.clientWidth /
					container.clientHeight,
				0.1,
				1000
			);
		camera.position.set(0, 1, 5);
		camera.lookAt(0, 0, 0);

		const renderer =
			new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
			});
		renderer.setSize(
			container.clientWidth,
			container.clientHeight
		);
		renderer.setClearColor(0xffffff, 0);
		container.appendChild(
			renderer.domElement
		);

		const loader = new GLTFLoader();
		let model: THREE.Object3D | null =
			null;
		let light: THREE.DirectionalLight | null =
			null;
		const mouse = { x: 0, y: 0 };

		function onMouseMove(
			event: MouseEvent
		) {
			mouse.x =
				(event.clientX /
					window.innerWidth) *
					2 -
				1;
			mouse.y =
				-(
					event.clientY /
					window.innerHeight
				) *
					2 +
				1;
		}
		window.addEventListener(
			'mousemove',
			onMouseMove
		);

		loader.load(
			'/Queen.glb',
			(gltf) => {
				model = gltf.scene;
				model.traverse((child) => {
					if (
						(child as THREE.Mesh).isMesh
					) {
						(
							child as THREE.Mesh
						).material =
							new THREE.MeshStandardMaterial(
								{
									color: 0x272727,
									metalness: 1,
									roughness: 0.3,
								}
							);
					}
				});

				light =
					new THREE.DirectionalLight(
						0xf5f5e6,
						7
					);
				light.position.set(0, -1, 0);
				scene.add(light);
				scene.add(
					new THREE.AmbientLight(0x404040)
				);

				model.scale.set(0.3, 0.3, 0.3);
				model.position.set(0, -1, 0);
				scene.add(model);
			},
			undefined,
			(err) => console.error(err)
		);

		function animate() {
			requestAnimationFrame(animate);
			if (model && light) {
				model.rotation.z =
					-mouse.x * 0.15;
				model.rotation.x =
					-mouse.y * 0.15;

				light.position.x = mouse.x * 80;
				light.position.y = mouse.y * 120;
				light.position.z = 60;
				light.lookAt(model.position);
			}
			renderer.render(scene, camera);
		}

		animate();

		function handleResize() {
			if (!container) return;
			camera.aspect =
				container.clientWidth /
				container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(
				container.clientWidth,
				container.clientHeight
			);
		}
		window.addEventListener(
			'resize',
			handleResize
		);

		return () => {
			window.removeEventListener(
				'mousemove',
				onMouseMove
			);
			window.removeEventListener(
				'resize',
				handleResize
			);
			renderer.dispose();
			if (
				container.contains(
					renderer.domElement
				)
			)
				container.removeChild(
					renderer.domElement
				);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="absolute h-full w-1/3 right-1/12 top-0"
		/>
	);
}
