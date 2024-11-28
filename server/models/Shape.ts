export abstract class Shape {
    constructor(public id: number, public x: number, public y: number, public z: number, public color: string) {}

    abstract getType(): string;
}