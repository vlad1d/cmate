import * as THREE from 'three';

let scene, camera, renderer;

if (process.client) {
    // set the scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    // animate the scene so that shapes rotate
    function animate() {
        requestAnimationFrame(animate);
        scene.children.forEach(shape => {
            shape.rotation.x += 0.02;
            shape.rotation.y += 0.02;
        });
        renderer.render(scene, camera);
    }
    animate();

    // support resizing the window
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

export { scene, camera, renderer };