function flat(arr, baseArray) {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      flat(item, baseArray);
    } else {
      baseArray.push(item);
    }
  })  
}
function flatten(...rest) {
  const output = [];
  flat(rest, output);
  return output;
}

// test cases:
expect(flatten(), []);
expect(flatten('first', 'flatten', {}), ['first', 'flatten', {}]);
expect(flatten([2], ['flatten', 'example'], '!'), [2, 'flatten', 'example', '!']);
expect(flatten(['third', ['flatten', 'example']]), ['third', 'flatten', 'example']);
expect(flatten(['4th', ['flatten', ['com', 'plex'], 'example']]), ['4th', 'flatten', 'com', 'plex', 'example']);
 

// helper
function expect(input, value) {
  var _input, isArray, arrayElements, equal;

  isArray = input instanceof Array;
  _input = input || [];
  arrayElements = _input.some(function(value) {
    return value instanceof Array;
  });
  equal = _input.toString() === value.toString();
  
  if (isArray && !arrayElements && equal) {
    console.log(input, ' ok!');
  } else {
    console.log('error: ', input, ' not correctly flatten (expected: ', value, ')');
  }
}
