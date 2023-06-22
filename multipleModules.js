// Build a simple Node.js application that utilizes multiple modules and includes external npm packages.

// import the modules
const calculateFactorial = require("./factorial"); // custom module

// import built-in modules
const fs = require("fs"); // file system module
const path = require("path"); // path module

// import the npm package
const chalk = require("chalk"); // this is a third party package

// use the modules
const factorial = calculateFactorial(5);
console.log(`The factorial of 5 is ${chalk.blue(factorial)}`);

// use the built-in modules
const filePath = path.join(__dirname, "test.txt");
fs.writeFileSync(filePath, `The factorial of 5 is ${factorial}`);
const fileContent = fs.readFileSync(filePath, "utf-8");
console.log(fileContent);
