class Shape
{
    getArea()
    {
        throw new Error('Method getArea must be implemented.');
    }

    valueOf()
    {
        return this.getArea();
    }

    toString()
    {
        return `[Shape ${this.constructor.name.toLowerCase()}]`;
    }
}

class Square extends Shape
{
    constructor(sideLen)
    {
        super();
        this.sideLen = sideLen;
        this.name = 'square';
    }

    getArea()
    {
        return this.sideLen ** 2;
    }
}

class Rectangle extends Shape
{
    constructor(width, height)
    {
        super();
        this.width = width;
        this.height = height;
        this.name = 'rectangle';
    }

    getArea()
    {
        return this.width * this.height;
    }
}

class Circle extends Shape
{
    constructor(radius)
    {
        super();
        this.radius = radius;
        this.name = 'circle';
    }

    getArea()
    {
        return Math.PI * this.radius ** 2;
    }
}


const square = new Square(10);
console.log(square.getArea()); // 100

const rectangle = new Rectangle(5, 10);
console.log(rectangle.getArea()) // 50

const circle = new Circle(2);
console.log(circle.getArea()); // 12.566370614359172

console.log(`${rectangle} ${square} ${circle}`) // [Shape rectangle] [Shape square] [Shape circle]
console.log(rectangle + square - circle) // 137.4336293856408