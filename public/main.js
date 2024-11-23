const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, transparent: true, opacity: 0.7 });
const cube = new THREE.Mesh(boxGeometry, cubeMaterial);
const cube2 = new THREE.Mesh(boxGeometry, cubeMaterial);

const sphereGeometry = new THREE.SphereGeometry();
const sphereMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, transparent: true, opacity: 0.7 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

const shapes = [];
shapes.push(cube);
shapes.push(sphere);

shapes.forEach(shape => {
    shape.position.x = (Math.random()) * 10 - 5;
    shape.position.y = (Math.random()) * 10 - 5;
    scene.add(shape);
});

camera.position.z = 5;

let isDragging = false;
let mousePosition = {
    x: 0,
    y: 0
}
let selectedShape = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function animate() {
    requestAnimationFrame(animate);
    shapes.forEach(shape => {
        shape.rotation.x += 0.02;
        shape.rotation.y += 0.02;
    });
    renderer.render(scene, camera);
}
animate();

window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(shapes);

    if (intersects.length > 0) {
        if (selectedShape) {
            // reset the previous selected shape
            selectedShape.material.opacity = 0.7;
        }
        selectedShape = intersects[0].object;
        // make the selected shape fully opaque
        selectedShape.material.opacity = 1;
        isDragging = true;
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (event) => {
    if (isDragging && selectedShape) {
        const deltaMove = {
            x: event.clientX - mousePosition.x,
            y: event.clientY - mousePosition.y
        };

        selectedShape.position.x += deltaMove.x * 0.01;
        selectedShape.position.y -= deltaMove.y * 0.01;
        selectedShape.rotation.x += deltaMove.y * 0.008;
        selectedShape.rotation.y += deltaMove.x * 0.008;

        mousePosition = {
            x: event.clientX,
            y: event.clientY
        }
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});