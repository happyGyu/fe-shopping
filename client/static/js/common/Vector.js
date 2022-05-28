export class Vector {
    constructor(startPoint, endPoint) {
        this.x = endPoint[0] - startPoint[0];
        this.y = endPoint[1] - startPoint[1];
    }

    cross2D(vector) {
        return this.x * vector.y - this.y * vector.x;
    }
}
