function myFunction(number1, number2, callback) {
  callback(number1 + number2);
}

myFunction(3, 5, (result) => {
    console.log(result)
});
