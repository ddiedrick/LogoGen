// Import Triangle, Square, Circle classes from ./shapes.js
const { Triangle, Square, Circle } = require("./shapes.js");

//triangle test
describe("Triangle test", () => {
  test("test for a triangle with a blue background", () => {
    const shape = new Triangle();
    shape.setColor("blue");
    expect(shape.render()).toEqual(
      '<polygon points="150, 18 244, 182 56, 182" fill="blue" />'
    );
  });
});

//square test with hex color
describe("Square test", () => {
  test("test for a square with a purple background", () => {
    const shape = new Square();
    shape.setColor("#A020F0");
    expect(shape.render()).toEqual(
      '<rect x="73" y="40" width="160" height="160" fill="#A020F0" />'
    );
  });
});

//circle test
describe("Circle test", () => {
  test("test for a circle with a green background", () => {
    const shape = new Circle();
    shape.setColor("green");
    expect(shape.render()).toEqual(
      '<circle cx="150" cy="115" r="80" fill="green" />'
    );
  });
});