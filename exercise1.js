const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('start', () =>{
    console.log('start event fired');
})

console.log('hello world');
myEmitter.emit('start')