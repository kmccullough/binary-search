const { binarySearch } = require('./dist/index');

const assert = require('assert');

describe('Unit | binarySearch', function() {
  it('starts next/center', function() {
    const expectedValues = [ 3, 1, 2 ];
    const lastIndex = expectedValues.length - 1;
    const search = binarySearch(1, 4);
    for (let [ value ] of search) {
      const expectedValue = expectedValues.length ? expectedValues.shift() : null;
      assert.strictEqual(value, expectedValue, 'values in order');
      search.isLeft ? search.right() : search.left();
    }
    assert.strictEqual(expectedValues.length, 0, 'no remaining values');
    assert.strictEqual(search.index, lastIndex, 'expected last index');
  });

  it('starts left', function() {
    const expectedValues = [ 1, 3, 2 ];
    const lastIndex = expectedValues.length - 1;
    const search = binarySearch(1, 3).startLeft();
    for (let [ value ] of search) {
      const expectedValue = expectedValues.length ? expectedValues.shift() : null;
      assert.strictEqual(value, expectedValue, 'values in order');
      search.isLeft ? search.right() : search.left();
    }
    assert.strictEqual(expectedValues.length, 0, 'no remaining values');
    assert.strictEqual(search.index, lastIndex, 'expected last index');
  });

  it('starts right', function() {
    const expectedValues = [ 3, 1, 2 ];
    const lastIndex = expectedValues.length - 1;
    const search = binarySearch(1, 3).startRight();
    for (let [ value ] of search) {
      const expectedValue = expectedValues.shift();
      assert.strictEqual(value, expectedValue, 'values in order');
      search.isLeft ? search.right() : search.left();
    }
    assert.strictEqual(expectedValues.length, 0, 'no remaining values');
    assert.strictEqual(search.index, lastIndex, 'expected last index');
  });

  it('works going left', function() {
    const expectedValues = [ 0, 100, 50, 25, 13, 6, 3, 2, 1 ];
    const lastIndex = expectedValues.length - 1;
    const search = binarySearch(0, 100).startLow();
    for (let [ value ] of search) {
      const expectedValue = expectedValues.length ? expectedValues.shift() : null;
      assert.strictEqual(value, expectedValue, 'values in order');
      search.isLeft ? search.right() : search.left();
    }
    assert.strictEqual(expectedValues.length, 0, 'no remaining values');
    assert.strictEqual(search.index, lastIndex, 'expected last index');
  });

  it('works going right', function() {
    const expectedValues = [ 0, 100, 50, 75, 88, 94, 97, 98, 99 ];
    const lastIndex = expectedValues.length - 1;
    const search = binarySearch(0, 100).startLow();
    for (let [ value ] of search) {
      const expectedValue = expectedValues.length ? expectedValues.shift() : null;
      assert.strictEqual(value, expectedValue, 'values in order');
      search.isRight ? search.left() : search.right();
    }
    assert.strictEqual(expectedValues.length, 0, 'no remaining values');
    assert.strictEqual(search.index, lastIndex, 'expected last index');
  });

  it('works with floats', function() {
    const expectedValues = [ 0, 1, .5, .25, .125, .0625, .03125, .015625, .0078125 ];
    const lastIndex = expectedValues.length - 1;
    const search = binarySearch(0, 1).float().startLeft();
    for (let [ value ] of search) {
      const expectedValue = expectedValues.length ? expectedValues.shift() : null;
      assert.strictEqual(value, expectedValue, 'values in order');
      // Limit infinite loop to only our test data
      if (!expectedValues.length) {
        break;
      }
      search.isLow ? search.right() : search.left();
    }
    assert.strictEqual(search.index, lastIndex, 'expected last index');
  });

  it('works with comparator', function() {
    const expectedValues = [ 0, 100, 50, 25, 13, 6, 3, 2, 1 ];
    let expectedValue;
    const result = binarySearch(0, 100).startLow()
      .search((value, i, search) => {
        expectedValue = expectedValues.length ? expectedValues.shift() : null;
        assert.strictEqual(value, expectedValue, 'values in order');
        search.isLeft ? search.right() : search.left();
      });
    assert.strictEqual(expectedValues.length, 0, 'no remaining values');
    assert.strictEqual(result, expectedValue, 'result is last value');
  });

  it('works with comparator returning best', function() {
    const expectedValues = [ 0, 100, 50, 25, 13, 6, 3, 2, 1 ];
    const expectedBestValue = expectedValues[Math.floor(expectedValues.length / 2)];
    let hasSeenBest = false;
    const result = binarySearch(0, 100).startLow()
      .search((value, i, search) => {
        const expectedValue = expectedValues.length ? expectedValues.shift() : null;
        if (!hasSeenBest) {
          search.promote();
          hasSeenBest = expectedValue === expectedBestValue;
        }
        assert.strictEqual(value, expectedValue, 'values in order');
        search.isLeft ? search.right() : search.left();
      }, true);
    assert.strictEqual(expectedValues.length, 0, 'no remaining values');
    assert.strictEqual(result, expectedBestValue, 'result is best value');
  });
});
