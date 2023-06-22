// Exercise 1: Create an event emitter that emits a 'start' event. Write a callback function that logs a message when the 'start' event is emitted.

const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('start', () =>{
    console.log('start event fired');
})

console.log('hello world');
myEmitter.emit('start')