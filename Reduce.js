function reduce(array, cb, base) {
    if (!Array.isArray(array) || !array.length) {
        return {};
    }
    const current = array[0];
    const output = cb(base, current);
    const newArr = array.slice(1);
    return newArr.length === 0 ? output : reduce(newArr, cb, output);
}

// Test cases

function expect(result, expected) {
  const correct = JSON.stringify(result) === JSON.stringify(expected);
  if (correct) {
    console.info('Correct!');
  } else {
    console.error(`Error: ${ result } does not match ${
      expected }`);
  }
}

const val1 = reduce(
  [[ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ]],
  ((object, [ key, value ]) => ({
    ...object,
    [key]: value
  })),
{} );

expect(val1, { a: 1, b: 2, c: 3 });

const val2 = reduce(
  [],
  ((object, [ key, value ]) => ({
    ...object,
    [key]: value
  })),
{} );

expect(val2, {});

const val3 = reduce(
  [[ 'a', null ], ['b']],
  ((object, [ key, value ]) => ({
    ...object,
    [key]: value
  })),
{} );

expect(val3, { a: null, b: undefined });
