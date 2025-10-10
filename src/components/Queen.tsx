import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

export const Queen = () => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(0, 1, 5);
	camera.lookAt(0, 0, 0);

	const renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	// document.body.appendChild(renderer.domElement);

	let mouse = {x: 0, y: 0};

	window.addEventListener("mousemove", (event) => {
		// Convert mouse coords to -1 to 1 range
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	});

	// Load GLTF
	const loader = new GLTFLoader();
	loader.load(
		"/Queen.glb",
		(gltf) => {
			const model = gltf.scene;
			const light = new THREE.DirectionalLight(0xf5f5e6, 1);
			light.position.set(0, -1, 0);
			scene.add(light);

			const ambient = new THREE.AmbientLight(0x404040);
			scene.add(ambient);

			model.scale.set(0.3, 0.3, 0.3);
			model.position.set(0, -1, 0);
			scene.add(model);

			function animateModel() {
				requestAnimationFrame(animateModel);

				// Smooth tilt based on mouse
				model.rotation.z = -mouse.x * 0.15; // tilt left/right
				model.rotation.x = -mouse.y * 0.15; // tilt forward/back

				light.position.x = mouse.x * 80;
				light.position.y = mouse.y * 120; // offset for height
				light.position.z = 60; // keep distance in z
				light.lookAt(model.position); // always point at the queen
				renderer.render(scene, camera);
			}

			animateModel();
		},
		undefined,
		(err) => console.error(err)
	);

	// Render loop
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	animate();
	return (
		<div>
			{renderer}
		</div>
	)
};
