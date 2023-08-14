/**
 * @name BinarySearchGetNextValue
 * @function
 * @param {number} left
 * @param {number} right
 * @param {number} index
 * @param {BinarySearchIterator} iterable
 * @return number
 */

/**
 * @name BinarySearchIterator
 * @implements Iterable
 * @property {function(BinarySearchGetNextValue): BinarySearchIterator} getNextValue Set function to return next value
 * @property {function(number): BinarySearchIterator} splitRatio Set ratio between left (0) and right (1) to choose next value (default: .5) Note: Used exclusively by default `getNextValue` implementation
 * @property {function: BinarySearchIterator}         integer    Call to force rounding of values (toggles float, defaults to integer)
 * @property {function: BinarySearchIterator}         float      Call to force no rounding of values (toggles integer, defaults to integer)
 * @property {function: BinarySearchIterator}         startNext  Call to start iteration with next value (i.e. between left and right) (default: startNext)
 * @property {function: BinarySearchIterator}         startLeft  Call to start iteration with leftmost value (default: startNext)
 * @property {function: BinarySearchIterator}         startRight Call to start iteration with rightmost value (default: startNext)
 * @property {function: BinarySearchIterator}         startLow   Call to start iteration with lower of left or right (default: startLeft)
 * @property {function: BinarySearchIterator}         startHigh  Call to start iteration with higher of left or right  (default: startLeft)
 * @property {function(number): BinarySearchIterator} epsilon    Set epsilon for float comparisons
 * @property {function: BinarySearchIterator}         promote    Call to set value as current best
 * @property {function: BinarySearchIterator}         done       Call to end iteration
 * @property {function: BinarySearchIterator}         left       Call to make next iteration left of current value
 * @property {function: BinarySearchIterator}         right      Call to make next iteration right of current value
 * @property {function: BinarySearchIterator}         lower      Call to make next iteration lower than current value
 * @property {function: BinarySearchIterator}         higher     Call to make next iteration higher than current value
 * @property {function: BinarySearchIterator}         nextValue  Call to set specific next iteration value
 * @property {function: BinarySearchIterator}         clone      Call to return a copy of the iteratable with the same configuration
 * @property {function(function(value: number, index: number, BinarySearchIterator), best: Boolean = false): number|undefined} search Call to iterate using a comparator function. Pass true for `best` argument to return last best value rather than last value.
 * @property {number}           index             Current iteration index
 * @property {number}           value             Current value (optionally rounded to integer)
 * @property {number}           floatValue        Current value
 * @property {number|undefined} best              Current best value
 * @property {number}           leftBound         Current left bound
 * @property {number}           rightBound        Current right bound
 * @property {number}           lowBound          Current low bound
 * @property {number}           highBound         Current high bound
 * @property {boolean}          isLeft            True if current value is left bound
 * @property {boolean}          isRight           True if current value is right bound
 * @property {boolean}          isLow             True if current value is low bound
 * @property {boolean}          isHigh            True if current value is high bound
 * @property {boolean}          ratio             Given `splitRatio` (default .5)
 * @property {boolean}          positiveDirection -1 if left > right, otherwise 1
 */

/**
 * @name BinarySearchConfig
 * @property {true} [startLeft] True to start iteration with leftmost value (default: startNext)
 * @property {true} [startRight] True to start iteration with rightmost value (default: startNext)
 * @property {number} [ratio] Ratio between left (0) and right (1) used to choose next value (default: .5) Note: Used exclusively by default `getNextValue` implementation
 * @property {BinarySearchGetNextValue} [getNextValue] Function to return next value
 * @property {number} [epsilon] Epsilon for float comparisons
 * @property {true} [float] True to force no rounding of values (defaults to integer)
 */

/**
 * Creates and allows control of a binary search iterator
 * @param {number} left  Left bounding number
 * @param {number} right Right bounding number
 * @param {BinarySearchIterator|BinarySearchConfig} config
 * @return {BinarySearchIterator|number} Iterable if you prefer, or final value if comparator given
 */
export function binarySearch(left, right) {
  var _config$_startPos, _config$ratio, _config$_nextValue, _config$_getNextValue, _config$_epsilon, _config$_float;

  let config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const EPSILON = Number.EPSILON * 10;
  let _leftmost = left;
  let _rightmost = right;

  let _positiveDirection = left > right ? -1 : 1;

  let _direction, _value, _floatValue, _best, _index;

  const feq = (a, b) => Math.abs(a - b) < it._epsilon;

  const getNextValue = fn => {
    it._getNextValue = fn || getNextValue;
    return it;
  };

  const integer = () => {
    it._float = false;
    return it;
  };

  const float = () => {
    it._float = true;
    return it;
  };

  const epsilon = function () {
    let epsilon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EPSILON;
    it._epsilon = epsilon;
    return it;
  };
  /** @type BinarySearchIterator */


  const it = {
    // Call before iterating
    splitRatio() {
      let ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : .5;
      it._ratio = ratio || it._ratio;
      return it;
    },

    getNextValue,
    integer,
    float,

    startNext() {
      it._startPos = 0;
      return it;
    },

    startLeft() {
      it._startPos = -1;
      return it;
    },

    startRight() {
      it._startPos = 1;
      return it;
    },

    startLow() {
      it._startPos = -_positiveDirection;
      return it;
    },

    startHigh() {
      it._startPos = _positiveDirection;
      return it;
    },

    epsilon,

    // Call during iteration
    done() {
      _direction = 0;
      return it;
    },

    promote() {
      _best = _value;
      return it;
    },

    left() {
      _direction = -1;
      return it;
    },

    right() {
      _direction = 1;
      return it;
    },

    lower() {
      _direction = -_positiveDirection;
      return it;
    },

    higher() {
      _direction = _positiveDirection;
      return it;
    },

    nextValue(value) {
      it._nextValue = value;
      return it;
    },

    get leftBound() {
      return left;
    },

    get rightBound() {
      return right;
    },

    get index() {
      return _index;
    },

    get value() {
      return _value;
    },

    get floatValue() {
      return _floatValue;
    },

    get best() {
      return _best;
    },

    get lowBound() {
      return _positiveDirection > 0 ? left : right;
    },

    get highBound() {
      return _positiveDirection > 0 ? right : left;
    },

    get isLeft() {
      return feq(_value, _leftmost);
    },

    get isRight() {
      return feq(_value, _rightmost);
    },

    get isLow() {
      return _positiveDirection ? it.isLeft : it.isRight;
    },

    get isHigh() {
      return !_positiveDirection ? it.isLeft : it.isRight;
    },

    get ratio() {
      return it._ratio;
    },

    get positiveDirection() {
      return _positiveDirection;
    },

    // Iterator
    [Symbol.iterator]: function* () {
      // Reset values for multiple iterations
      left = _leftmost;
      right = _rightmost;
      _direction = null;
      _value = _floatValue = _best = undefined;
      let value,
          floatValue,
          previousValue,
          i = -1;
      let {
        _startPos
      } = it;

      while (it.lowBound <= it.highBound) {
        const {
          _nextValue
        } = it;
        const hasNextValue = _nextValue !== null && _nextValue !== undefined;
        const hasEdgeValue = _startPos;

        if (!++i && hasEdgeValue) {
          // Starting left/right, try left or right on first iteration if desired
          floatValue = _startPos < 0 ? left : right;
        } else if (hasNextValue) {
          // Try next value if given
          floatValue = _nextValue;
          it._nextValue = undefined;
        } else if (hasEdgeValue) {
          // Starting left/right, try other side of desired on second iteration
          floatValue = _startPos < 0 ? right : left;
          _startPos = 0;
        } else if (i === 1 && !hasEdgeValue) {
          // Starting next, try bound on side of desired direction on second iteration
          floatValue = _direction < 0 ? left : right;
        } else {
          // Get next value between current bounds
          floatValue = it._getNextValue(left, right, i, it);
        } // Round to integer if needed


        value = it._float ? floatValue : Math.round(floatValue); // Break if same value as previous or if at bounds

        if (previousValue !== undefined && feq(value, previousValue) || value < left || value > right || !(hasNextValue || hasEdgeValue) && i > 1 && (value === left || value === right)) {
          break;
        }

        previousValue = value;
        _value = value;
        _floatValue = floatValue;
        _index = i; // Distinguish between methods and comparator return with null

        _direction = null;
        yield [value, i, it];
        /***** YIELD *****/
        // Break if done called or direction out of bounds
        // Note: Ignore warning "Can be simplified to true", as above
        // `yield` allows method calls that change `_direction`

        if (_direction === 0 || _direction && (_direction < 0 ? it.isLeft : it.isRight)) {
          break;
        } // Shrink bounds


        if (_direction < 0) {
          right = floatValue;
        } else if (_direction > 0) {
          left = floatValue;
        }
      }
    },

    // Comparator iteration
    search(comparator) {
      let best = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      for (let [value, index] of it) {
        var _comparator;

        it._direction = (_comparator = comparator(value, index, it)) !== null && _comparator !== void 0 ? _comparator : it._direction;
      }

      return best ? _best : _value;
    },

    clone() {
      return binarySearch(left, right, it);
    },

    _startPos: ((_config$_startPos = config._startPos) !== null && _config$_startPos !== void 0 ? _config$_startPos : config.startLeft) ? -1 : config.startRight ? 1 : 0,
    // (default: `startNext`)
    _ratio: (_config$ratio = config.ratio) !== null && _config$ratio !== void 0 ? _config$ratio : .5,
    _nextValue: (_config$_nextValue = config._nextValue) !== null && _config$_nextValue !== void 0 ? _config$_nextValue : config.nextValue,
    _getNextValue: (_config$_getNextValue = config._getNextValue) !== null && _config$_getNextValue !== void 0 ? _config$_getNextValue : config.getNextValue !== getNextValue && config.getNextValue || getNextValueByHalf,
    _epsilon: (_config$_epsilon = config._epsilon) !== null && _config$_epsilon !== void 0 ? _config$_epsilon : config.epsilon !== epsilon && config.epsilon || EPSILON,
    _float: (_config$_float = config._float) !== null && _config$_float !== void 0 ? _config$_float : isSet(config.float) && config.float !== float ? config.float : isSet(config.integer) && config.integer !== integer ? !config.integer : false
  };
  return it;
}
export function getNextValueByHalf(left, right, i, iterable) {
  return left + (right - left) * iterable.ratio;
}

function isSet(value) {
  return value !== null && value !== undefined;
}

export default binarySearch;
//# sourceMappingURL=index.js.map