function Shape() {}

Shape.prototype.getArea = function ()
{
    throw new Error('Method getArea must be implemented.');
};

Shape.prototype.add = function (other)
{
    if (other instanceof Shape)
        return this.getArea() + other.getArea();
    else if (typeof other === 'number')
        return this.getArea() + other;

    throw new Error('The argument must be either a descendant of Shape or a number.');
};

Shape.prototype.subtract = function (other)
{
    if (other instanceof Shape)
        return this.getArea() - other.getArea();
    else if (typeof other === 'number')
        return this.getArea() - other;

    throw new Error('The argument must be either a descendant of Shape or a number.');
};

Shape.prototype.toString = function ()
{
    return `[Shape ${this.constructor.name.toLowerCase()}]`;
};


function Square(sideLen)
{
    this.sideLen = sideLen;
    this.name = 'square';
}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

Square.prototype.getArea = function ()
{
    return this.sideLen ** 2;
};


function Rectangle(width, height)
{
    this.width = width;
    this.height = height;
    this.name = 'rectangle';
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.getArea = function ()
{
    return this.width * this.height;
};


function Circle(radius)
{
    this.radius = radius;
    this.name = 'circle';
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.getArea = function ()
{
    return Math.PI * this.radius ** 2;
};


const square = new Square(10);
console.log(square.getArea()); // 100

const rectangle = new Rectangle(5, 10);
console.log(rectangle.getArea()) // 50

const circle = new Circle(2);
console.log(circle.getArea()); // 12.566370614359172

console.log(`${rectangle} ${square} ${circle}`) // [Shape rectangle] [Shape square] [Shape circle]
console.log(rectangle.add(square.subtract(circle))); // 137.4336293856408