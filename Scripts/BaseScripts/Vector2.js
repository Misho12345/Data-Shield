"use strict";

class Vector2 {
    x;
    y;

    constructor(x, y) {
        if (typeof x === "undefined" && typeof y == "undefined") {
            this.x = 0;
            this.y = 0;
        } else if (typeof y === "undefined") {
            this.x = x;
            this.y = x;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    static get zero() { return new Vector2(0, 0) }
    static get one() { return new Vector2(1, 1) }

    static get up() { return new Vector2(0, -1) }
    static get down() { return new Vector2(0, 1) }
    static get left() { return new Vector2(-1, 0) }
    static get right() { return new Vector2(1, 0) }

    static get positiveInfinity() { return new Vector2(Infinity, Infinity) }
    static get negativeInfinity() { return new Vector2(-Infinity, -Infinity) }

    get negative()      { return new Vector2(-this.x, -this.y) }
    get sqrMagnitude()  { return this.x * this.x + this.y * this.y }
    get magnitude()     { return Math.sqrt(this.sqrMagnitude) }
    get sumOfElements() { return this.x + this.y }
    get copy()          { return new Vector2(this.x, this.y) }

    get perpendicular() { return new Vector2(-this.y, this.x) }

    get normalized() {
        const magnitude = this.magnitude;
        const vector = this.copy;

        if (magnitude > 9.9999997473787516e-06) vector.Scale(1 / magnitude);
        else vector.Set(Vector2.zero);

        return vector;
    }


    Equals = (vec) => this.x === vec.x && this.y === vec.y;

    Scale(x, y) {
        if (typeof x == "number" && typeof y === "undefined") {
            this.x *= x;
            this.y *= x;
        } else if (typeof x == "number" && typeof y === "number") {
            this.x *= x;
            this.y *= y;
        } else if (x instanceof Vector2 && typeof y === "undefined") {
            this.x *= x.x;
            this.y *= x.y;
        }
    }

    Add(x, y) {
        if (typeof x == "number" && typeof y === "undefined") {
            this.x += x;
            this.y += x;
        } else if (typeof x == "number" && typeof y === "number") {
            this.x += x;
            this.y += y;
        } else if (x instanceof Vector2 && typeof y === "undefined") {
            this.x += x.x;
            this.y += x.y;
        }
    }

    Subtract(x, y) {
        if (typeof x == "number" && typeof y === "undefined") {
            this.x -= x;
            this.y -= x;
        } else if (typeof x == "number" && typeof y === "number") {
            this.x -= x;
            this.y -= y;
        } else if (x instanceof Vector2 && typeof y === "undefined") {
            this.x -= x.x;
            this.y -= x.y;
        }
    }

    Set(x, y) {
        if (typeof x == "number" && typeof y == "undefined") {
            this.x = x;
            this.y = x;
        } else if (typeof x == "number" && typeof y == "number") {
            this.x = x;
            this.y = y;
        } else if (x instanceof Vector2 && typeof y === "undefined") {
            this.x = x.x;
            this.y = x.y;
        }
    }

    Normalize = () => this.Set(this.normalized);


    static Distance = (a, b) => a.DistanceFrom(b);
    DistanceFrom = (vec) => new Vector2(this.x - vec.x, this.y - vec.y).magnitude;


    static Sum(vec1, vec2) {
        let newVec = vec1.copy;
        newVec.Add(vec2);
        return newVec;
    }

    static Subtraction(vec1, vec2) {
        let newVec = vec1.copy;
        newVec.Subtract(vec2);
        return newVec;
    }

    static Scale(vec1, vec2) {
        let newVec = vec1.copy;
        newVec.Scale(vec2);
        return newVec;
    }


    static Lerp(a, b, t){ return new Vector2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);}

    static Dot(vec1, vec2) { return vec1.x * vec2.x + vec1.y * vec2.y;}

    static Angle(from, to) {
        let angle = Math.atan2(to.y - from.y, to.x - from.x);
        if (to.y <= from.y) angle += Math.PI * 2;
        return angle;
    }


    static Reflect(vec, normal) {
        const num = -2 * Vector2.Dot(normal, vec);
        return new Vector2(num * normal.x + vec.x, num * normal.y + vec.y);
    }
}
