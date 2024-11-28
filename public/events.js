import { scene, camera } from './scene.js';
import { shapes, newShape, addShape, changeShapePosition, changeShapeColor, loadShapes, removeShape } from './shapes.js';

let isDragging = false;
let mousePosition = { x: 0, y: 0 };
let selectedShape = null;
let dragThreshold = 5;
let initialMousePosition = { x: 0, y: 0 };

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousedown', (event) => {
    initialMousePosition = { x: event.clientX, y: event.clientY };
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(shapes);

    if (intersects.length > 0) {
        if (selectedShape) {
            selectedShape.material.opacity = 0.7;
        }
        selectedShape = intersects[0].object;
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
        console.log('Shape clicked:', selectedShape.userData.id);
    } else if (selectedShape) {
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

window.addEventListener('DOMContentLoaded', () => {
    loadShapes();

    const newButtons = document.querySelectorAll('.new-button');
    newButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('id');
            newShape(id);
        });
    });

    const deleteButton = document.querySelector('.del-button');
    deleteButton.addEventListener('click', async () => {
        if (selectedShape) {
            removeShape(selectedShape);
            selectedShape = null;
        }
    });

    const colorButton = document.querySelector('.col-button');
    colorButton.addEventListener('click', async () => {
        if (selectedShape) {
            changeShapeColor(selectedShape);
        }
    });
});