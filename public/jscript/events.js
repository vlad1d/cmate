import * as THREE from 'three';
import { scene, camera } from './scene.js';
import { shapes, newShape, addShape, changeShapePosition, changeShapeColor, loadShapes, removeShape } from './shapes.js';

if (process.client) {
    let isDragging = false;
    let mousePosition = { x: 0, y: 0 };
    let selectedShape = null;
    let dragThreshold = 5;
    let initialMousePosition = { x: 0, y: 0 };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // when you click something, check if it's a shape
    window.addEventListener('mousedown', (event) => {
        initialMousePosition = { x: event.clientX, y: event.clientY };
        // calculate the mouse position but normalize it to the display size
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // raycaster is used to check if the click hits a shape
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(shapes);

        // if the click hits a shape, select it and log its ID, as well as the position of the click
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
        // if the mouse moved less than the threshold, consider it a click
        const distance = Math.sqrt(
            Math.pow(event.clientX - initialMousePosition.x, 2) +
            Math.pow(event.clientY - initialMousePosition.y, 2)
        );

        if (distance < dragThreshold && selectedShape) {
            console.log('Shape clicked:', selectedShape.userData.id);
        } else if (selectedShape) {
            // save the new position if the shape was dragged
            changeShapePosition(selectedShape, selectedShape.position.x, selectedShape.position.y, selectedShape.position.z); 
        }
    });

    window.addEventListener('mousemove', (event) => {
        // for mouse move just update the position of the shape but dont save it (it would be a disaster)
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
         // load the shapes from the server
        loadShapes();

        // add event listeners to the buttons accordingly
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
}