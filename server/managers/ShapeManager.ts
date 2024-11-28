import { Shape } from "../models/Shape";
import { Cube } from "../models/Cube";
import { Sphere } from "../models/Sphere";
import { Cone } from "../models/Cone";
import { Cylinder } from "../models/Cylinder";

export class ShapeManager {
    private shapes: Shape[] = [];
    private id: number = 0;

    getShapes(): { id: number, x: number, y: number, z: number, type: string }[] {
        return this.shapes.map(shape => ({
                id: shape.id,
                type: shape.getType(),
                color: shape.color,
                x: shape.x,
                y: shape.y,
                z: shape.z
            }));
    }

    createShape(type: string, color: string, x: number, y: number, z: number): Shape {
        let shape: Shape;
        switch (type) {
            case 'cube':
                shape = new Cube(this.id++, x, y, z, color);
                break;
            case 'sphere':
                shape = new Sphere(this.id++, x, y, z, color);
                break;
            case 'cone':
                shape = new Cone(this.id++, x, y, z, color);
                break;
            case 'cylinder':
                shape = new Cylinder(this.id++, x, y, z, color);
                break;
            default:
                throw new Error('Invalid shape type');
        }
        this.shapes.push(shape);
        return shape;
    }

    deleteShape(id: number): void {
        this.shapes = this.shapes.filter(shape => shape.id !== id);
    }
    
    getShapeById(id: number): Shape {
        const shape = this.shapes.find(shape => shape.id === id);
        if (!shape) {
            throw new Error(`Shape with id ${id} not found`);
        }
        return shape;
    }

    changeShapePosition(id: number, new_x: number, new_y: number, new_z: number): Shape {
        const shape = this.getShapeById(id);
        shape.x = new_x;
        shape.y = new_y;
        shape.z = new_z;
        return shape;
    }

    changeShapeColor(id: number, new_color: string): Shape {
        const shape = this.getShapeById(id);
        shape.color = new_color;
        return shape;
    }
}