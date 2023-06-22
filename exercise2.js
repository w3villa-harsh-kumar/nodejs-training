const myFunction = (callback) => {
    setInterval(callback, 1000)
}

myFunction(() => {
    console.log("Hello I'm callback")
})