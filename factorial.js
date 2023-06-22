// Create a simple module that calculates the factorial of a number

const calculateFactorial = (num) => {
  let factorial = 1;
  for (let i = 1; i <= num; i++) {
    factorial *= i;
  }
  return factorial;
};

module.exports = calculateFactorial; // Exporting factorial module
