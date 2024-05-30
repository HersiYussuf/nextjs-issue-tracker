function first() {
  console.log('First function start');
  second();
  console.log('First function end');
}

function second() {
  console.log('Second function start');
  third();
  console.log('Second function end');
}

function third() {
  console.log('Third function start');
  console.log('Third function end');
}

first();
