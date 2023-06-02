const inquirer = require("inquirer");
const fs = require("fs");

// Import classes from shapes
const { Triangle, Square, Circle } = require("./lib/shapes");

// create SVG file 
function writeToFile(fileName, answers) {
  let shapeString = "";
  // Sets width and height of logo container
  shapeString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  // <g> tag wraps <text> tag so that font layers on top of shape 
  shapeString += "<g>";
  // Takes user input for shape choice and inserts it into SVG file
  shapeString += `${answers.shape}`;

  // checks user input to set shape for logo
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    shapeString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    shapeString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    shapeString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  // <text> tag lets us set alignment and text size
  shapeString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  // Closing </g> tag
  shapeString += "</g>";
  // Closing </svg> tag
  shapeString += "</svg>";

  //generate svg file
  fs.writeFile(fileName, shapeString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

// prompts for text, text color, shape and shape color
function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What text would you like you logo to display? (Enter up to three characters)",
        name: "text",
      },
      {
        type: "input",
        message:
          "Choose text color (Enter color keyword OR a hexadecimal number)",
        name: "textColor",
      },
      {
        type: "list",
        message: "What shape would you like the logo to render?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      {
        type: "input",
        message:
          "Choose shapes color (Enter color keyword OR a hexadecimal number)",
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
      // Error handling for text prompt (user must enter 3 characters or less for logo to generate)
      if (answers.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        promptUser();
      } else {
        // generate SVG file
        writeToFile("./examples/logo.svg", answers);
      }
    });
}

// launches the prompts 
promptUser();