import { getShapes, updateShapePosition, updateShapeColor, createShape, deleteShape } from './api.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const shapes = [];

async function addShape(shapeData) {
    const color = shapeData.color ? parseInt(shapeData.color.replace('#', '0x')) : 0xffffff;
    let geometry;
    let material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.7 });
    switch (shapeData.type) {
        case 'cube':
            geometry = new THREE.BoxGeometry();
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry();
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry();
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry();
            break;
        default:
            console.error('Unknown shape type');
            return;
    }
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(shapeData.x, shapeData.y, shapeData.z);
    shape.userData.id = shapeData.id;
    shapes.push(shape);
    scene.add(shape);
}

async function loadShapes() {
    const shapesData = await getShapes();
    shapesData.forEach(shapeData => {
        addShape(shapeData);
    });
}

async function changeShapePosition(shape, x, y, z) {
    const roundedX = Math.round(x * 1000) / 1000;
    const roundedY = Math.round(y * 1000) / 1000;
    const roundedZ = Math.round(z * 1000) / 1000;
    console.log('Updating shape position:', shape.userData.id, roundedX, roundedY, roundedZ);
    try {
        await updateShapePosition(shape.userData.id, roundedX, roundedY, roundedZ);
    } catch (error) {
        console.error('Failed to update shape position:', error);
    }
}

camera.position.z = 5;

let isDragging = false;
let mousePosition = { x: 0, y: 0 };
let selectedShape = null;
let dragThreshold = 5;
let initialMousePosition = { x: 0, y: 0 };

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
    initialMousePosition = { x: event.clientX, y: event.clientY };
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
        mousePosition = { x: event.clientX, y: event.clientY };
    }
});

window.addEventListener('mouseup', (event) => {
    isDragging = false;
    const distance = Math.sqrt(
        Math.pow(event.clientX - initialMousePosition.x, 2) +
        Math.pow(event.clientY - initialMousePosition.y, 2)
    );

    if (distance < dragThreshold && selectedShape) {
        // Handle click
        console.log('Shape clicked:', selectedShape.userData.id);
    } else if (selectedShape) {
        // Handle drag end
        changeShapePosition(selectedShape, selectedShape.position.x, selectedShape.position.y, selectedShape.position.z);
    }
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

        mousePosition = { x: event.clientX, y: event.clientY };
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('DOMContentLoaded', () => {
    loadShapes();

    const newButtons = document.querySelectorAll('.new-button');
    newButtons.forEach(button => {
        button.addEventListener('click', async () => {
            console.log('click!');
            const id = button.getAttribute('id');
            try {
                const shape = await createShape(id);
                if (shape) {
                    addShape(shape);
                }
                else console.error('Failed to create shape:', error);
            } catch (error) {
                console.error('Failed to create shape:', error);
            }
        });
    });

    const deleteButton = document.querySelector('.del-button');
    deleteButton.addEventListener('click', async () => {
        if (selectedShape) {
            await deleteShape(selectedShape.userData.id);
            scene.remove(selectedShape);
            selectedShape = null;
        }
    });

    const colorButton = document.querySelector('.col-button');
    colorButton.addEventListener('click', async () => {
        if (selectedShape) {
            const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            try {
                await updateShapeColor(selectedShape.userData.id, color);
                selectedShape.material.color.set(color);
            } catch (error) {
                console.error('Failed to update shape color:', error);
            }
        }
    });
});