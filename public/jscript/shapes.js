/**
 * Module manipulates the shapes in the created scene. This is what makes it create, delete, etc in real time.
 */

import * as THREE from 'three';
import { scene } from './scene.js';
import { getShapes, updateShapePosition, updateShapeColor, createShape, deleteShape } from './api.js';

const shapes = [];

async function loadShapes() {
    const shapesData = await getShapes();
    shapesData.forEach(shapeData => {
        addShape(shapeData);
    });
}

async function newShape(type) {
    try {
        const shape = await createShape(type);
        if (shape) {
            addShape(shape);
        } else {
            console.error('Failed to create shape:', error);
        }
    } catch (error) {
        console.error('Failed to create shape:', error);
    }
}

async function addShape(shapeData) {
    const color = shapeData.color ? parseInt(shapeData.color.replace('#', '0x')) : 0xffffff;
    let geometry;
    let material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.7 });
    
    // create the shape based on the type selected, can easily add more shapes
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

// remove the shape from the scene and the shapes array
async function removeShape(shape) {
    try {
        await deleteShape(shape.userData.id);
        scene.remove(shape);
        shapes.splice(shapes.indexOf(shape), 1);
    } catch (error) {
        console.error('Failed to remove shape:', error);
    }
}

async function changeShapePosition(shape, x, y, z) {
    const roundedX = Math.round(x * 1000) / 1000;
    const roundedY = Math.round(y * 1000) / 1000;
    const roundedZ = Math.round(z * 1000) / 1000;
    try {
        await updateShapePosition(shape.userData.id, roundedX, roundedY, roundedZ);
    } catch (error) {
        console.error('Failed to update shape position:', error);
    }
}

// change the color of the shape by generating a random color
async function changeShapeColor(shape) {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    try {
        await updateShapeColor(shape.userData.id, color);
        shape.material.color.set(color);
    } catch (error) {
        console.error('Failed to update shape color:', error);
    }
}

export { shapes, newShape, addShape, removeShape, loadShapes, changeShapePosition, changeShapeColor };