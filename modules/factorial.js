// Create a simple module that calculates the factorial of a number

// Function to calculate factorial
const calculateFactorial = (num) => {
  let factorial = 1;
  for (let i = 1; i <= num; i++) {
    factorial *= i;
  }
  return factorial;
};

module.exports = calculateFactorial; // Exporting the function
