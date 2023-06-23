// Exercise 3 (optional): Create a function that takes two numbers and a callback. The function should invoke the callback with the result of adding the two numbers.

// create a function that takes two numbers and a callback
function myFunction(number1, number2, callback) {
  callback(number1 + number2);
}

// invoke the callback with the result of adding the two numbers
myFunction(3, 5, (result) => {
    console.log(result)
});
