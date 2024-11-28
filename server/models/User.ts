import { ShapeManager } from '../managers/ShapeManager';

export class User {
    private shapeManager: ShapeManager;
    constructor(public id: number, public name: string, private password: string) {
        this.shapeManager = new ShapeManager();
    }

    getShapes() {
        return this.shapeManager.getShapes();
    }

    getShapeById(id: number) {
        return this.shapeManager.getShapeById(id);
    }

    createShape(type: string, x: number, y: number, z: number) {
        return this.shapeManager.createShape(type, x, y, z);
    }

    deleteShape(id: number) {
        this.shapeManager.deleteShape(id);
    }

    changeShapePosition (id: number, x: number, y: number, z: number) {
        this.shapeManager.changeShapePosition(id, x, y, z);
    }
}