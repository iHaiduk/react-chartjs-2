(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.reactChartjs2 = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],2:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ("production" !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],3:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("production" !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
},{"./emptyFunction":1}],4:[function(require,module,exports){
(function (global){
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _constants = require('./constants');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// constants


// utils


// types


/**
 * @class Cache
 * @classdesc class that mimics parts of the Map infrastructure, but faster
 */
var Cache = function () {
  function Cache() {
    _classCallCheck(this, Cache);

    this[_constants.CACHE_IDENTIFIER] = true;
    this.lastItem = undefined;
    this.list = [];
    this.size = 0;
  }
  // $FlowIgnore computed properties not yet supported on classes


  /**
   * @function clear
   * @memberof Cache
   * @instance
   *
   * @description
   * remove all keys from the map
   */
  Cache.prototype.clear = function clear() {
    this.list.length = 0;

    this.setLastItem();
  };

  /**
   * @function delete
   * @memberof Cache
   * @instance
   *
   * @description
   * remove the key from the map
   *
   * @param {*} key key to delete from the map
   */


  Cache.prototype.delete = function _delete(key) {
    var index = (0, _utils.getIndexOfKey)(this, key);

    if (~index) {
      (0, _utils.splice)(this.list, index);

      this.setLastItem(this.list[0]);
    }
  };

  /**
   * @function get
   * @memberof Cache
   * @instance
   *
   * @description
   * get the value for the given key
   *
   * @param {*} key key to get the value for
   * @returns {*} value at the key location
   */


  Cache.prototype.get = function get(key) {
    if (!this.lastItem) {
      return undefined;
    }

    if (key === this.lastItem.key) {
      return this.lastItem.value;
    }

    var index = (0, _utils.getIndexOfKey)(this, key);

    if (~index) {
      var item = this.list[index];

      this.setLastItem((0, _utils.unshift)((0, _utils.splice)(this.list, index), item));

      return item.value;
    }
  };

  /**
   * @function getKeyIterator
   * @memberof Cache
   * @instance
   *
   * @description
   * create a custom iterator for the keys in the list
   *
   * @returns {{next: (function(): Object)}} iterator instance
   */


  Cache.prototype.getKeyIterator = function getKeyIterator() {
    var _this = this;

    var index = -1;

    return {
      next: function next() {
        return ++index >= _this.size ? _constants.ITERATOR_DONE_OBJECT : {
          index: index,
          isMultiParamKey: _this.list[index].isMultiParamKey,
          key: _this.list[index].key
        };
      }
    };
  };

  /**
   * @function has
   * @memberof Cache
   * @instance
   *
   * @description
   * does the map have the key provided
   *
   * @param {*} key key to test for in the map
   * @returns {boolean} does the map have the key
   */


  Cache.prototype.has = function has(key) {
    // $FlowIgnore: this.lastItem exists
    return this.size !== 0 && (key === this.lastItem.key || !!~(0, _utils.getIndexOfKey)(this, key));
  };

  /**
   * @function set
   * @memberof Cache
   * @instance
   *
   * @description
   * set the value at the key location, or add a new item with that key value
   *
   * @param {*} key key to assign value of
   * @param {*} value value to store in the map at key
   */


  Cache.prototype.set = function set(key, value) {
    this.setLastItem((0, _utils.unshift)(this.list, {
      key: key,
      isMultiParamKey: !!(key && key.isMultiParamKey),
      value: value
    }));
  };

  /**
   * @function setLastItem
   * @memberof Cache
   * @instance
   *
   * @description
   * assign the lastItem
   *
   * @param {ListItem|undefined} lastItem the item to assign
   */


  Cache.prototype.setLastItem = function setLastItem(lastItem) {
    this.lastItem = lastItem;
    this.size = this.list.length;
  };

  /**
   * @function updateItem
   * @memberof Cache
   * @instance
   *
   * @description
   * update an item in-place with a new value
   *
   * @param {*} key key to update value of
   * @param {*} value value to store in the map at key
   */


  Cache.prototype.updateItem = function updateItem(key, value) {
    var index = (0, _utils.getIndexOfKey)(this, key);

    if (~index) {
      this.list[index].value = value;

      if (this.lastItem && key === this.lastItem.key) {
        this.lastItem.value = value;
      }
    }
  };

  return Cache;
}();

exports.default = Cache;
module.exports = exports['default'];
},{"./constants":6,"./utils":8}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;


/**
 * @private
 *
 * @constant {number} INFINITY
 * @default
 */
var INFINITY = exports.INFINITY = Number.POSITIVE_INFINITY;

/**
 * @private
 *
 * @constant {string} INVALID_FIRST_PARAMETER_ERROR
 * @default
 */
// types
var INVALID_FIRST_PARAMETER_ERROR = exports.INVALID_FIRST_PARAMETER_ERROR = 'You must pass either a function or an object of options as the first parameter to moize.';

/**
 * @private
 *
 * @constant {string} NO_PROMISE_LIBRARY_EXISTS_ERROR_MESSAGE
 * @default
 */
var NO_PROMISE_LIBRARY_EXISTS_ERROR_MESSAGE = exports.NO_PROMISE_LIBRARY_EXISTS_ERROR_MESSAGE = 'You have not specified a promiseLibrary, and it appears that your browser does not support ' + 'native promises. You can either assign the library you are using to the global Promise object, or pass ' + 'the library in options via the "promiseLibrary" property.';

/**
 * @private
 *
 * @constant {IteratorDone} ITERATOR_DONE_OBJECT
 */
var ITERATOR_DONE_OBJECT = exports.ITERATOR_DONE_OBJECT = {
  done: true
};

/**
 * @private
 *
 * @constant {string|symbol} CACHE_IDENTIFIER
 * @default
 */
var CACHE_IDENTIFIER = exports.CACHE_IDENTIFIER = typeof Symbol === 'function' ? Symbol('isMoizeCache') : '__IS_MOIZE_CACHE__';

/**
 * @private
 *
 * @constant {string} ARRAY_OBJECT_CLASS
 * @default
 */
var ARRAY_OBJECT_CLASS = exports.ARRAY_OBJECT_CLASS = '[object Array]';

/**
 * @private
 *
 * @constant {string} FUNCTION_TYPEOF
 * @default
 */
var FUNCTION_TYPEOF = exports.FUNCTION_TYPEOF = 'function';

/**
 * @private
 *
 * @constant {RegExp} FUNCTION_NAME_REGEXP
 */
var FUNCTION_NAME_REGEXP = exports.FUNCTION_NAME_REGEXP = /^\s*function\s+([^\(\s]*)\s*/;

/**
 * @private
 *
 * @constant {string} OBJECT_TYPEOF
 * @default
 */
var OBJECT_TYPEOF = exports.OBJECT_TYPEOF = 'object';

/**
 * @private
 *
 * @constant {Array<Object>} GOTCHA_OBJECT_CLASSES
 */
var GOTCHA_OBJECT_CLASSES = exports.GOTCHA_OBJECT_CLASSES = [Boolean, Date, Number, RegExp, String];

/**
 * @private
 *
 * @constant {Array<string>} STATIC_PROPERTIES_TO_PASS
 */
var STATIC_PROPERTIES_TO_PASS = exports.STATIC_PROPERTIES_TO_PASS = ['contextTypes', 'defaultProps', 'propTypes'];

/**
 * @private
 *
 * @constant {number} STATIC_PROPERTIES_TO_PASS_LENGTH
 */
var STATIC_PROPERTIES_TO_PASS_LENGTH = exports.STATIC_PROPERTIES_TO_PASS_LENGTH = STATIC_PROPERTIES_TO_PASS.length;
},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// cache


// constants


// utils


// types


var _Cache = require('./Cache');

var _Cache2 = _interopRequireDefault(_Cache);

var _constants = require('./constants');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module moize
 */

/**
 * @constant {{isPromise: true}} PROMISE_OPTIONS
 */
var PROMISE_OPTIONS = {
  isPromise: true
};

/**
 * @constant {{maxArgs: number, serialize: boolean, serializeFunctions: boolean}} REACT_OPTIONS
 */
var REACT_OPTIONS = {
  maxArgs: 2,
  serialize: true,
  serializeFunctions: true
};

/**
 * @constant {{serialize: boolean}} SERIALIZE_OPTIONS
 */
var SERIALIZE_OPTIONS = {
  serialize: true
};

/**
 * @function moize
 *
 * @description
 * store cached values returned from calling method with arguments to avoid reprocessing data from same arguments
 *
 * @example
 * import moize from 'moize';
 *
 * // standard implementation
 * const fn = (foo, bar) => {
 *  return `${foo} ${bar}`;
 * };
 * const memoizedFn = moize(fn);
 *
 * // implementation with options
 * const fn = async (id) => {
 *  return get(`http://foo.com/${id}`);
 * };
 * const memoizedFn = moize(fn, {
 *  isPromise: true,
 *  maxSize: 5
 * });
 *
 * @param {function} functionOrComposableOptions method to memoize
 * @param {Options} [passedOptions={}] options to customize how the caching is handled
 * @param {Cache} [passedOptions.cache=new Cache()] caching mechanism to use for method
 * @param {boolean} [passedOptions.isPromise=false] is the function return expected to be a promise to resolve
 * @param {number} [passedOptions.maxAge=Infinity] the maximum age the value should persist in cache
 * @param {number} [passedOptions.maxArgs=Infinity] the maximum number of arguments to be used in serializing the keys
 * @param {number} [passedOptions.maxSize=Infinity] the maximum size of the cache to retain
 * @param {function} [passedOptions.promiseLibrary=Promise] promise library to use for resolution / rejection
 * @param {function} [passedOptions.serializeFunctions=false] should function parameters be serialized as well
 * @param {function} [passedOptions.serializer] method to serialize arguments with for cache storage
 * @returns {Function} higher-order function which either returns from cache or newly-computed value
 */
var moize = function moize(functionOrComposableOptions) {
  var passedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((0, _utils.isPlainObject)(functionOrComposableOptions)) {
    return function (fn) {
      var otherOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return moize(fn, _extends({}, functionOrComposableOptions, otherOptions));
    };
  }

  if (!(0, _utils.isFunction)(functionOrComposableOptions)) {
    throw new TypeError(_constants.INVALID_FIRST_PARAMETER_ERROR);
  }

  var isComposed = functionOrComposableOptions.isMemoized;
  // $FlowIgnore the value of the property is a function
  var fn = isComposed ? functionOrComposableOptions.originalFunction : functionOrComposableOptions;
  var options = !isComposed ? passedOptions : _extends({}, functionOrComposableOptions.options, passedOptions);

  var _options$cache = options.cache,
      cache = _options$cache === undefined ? new _Cache2.default() : _options$cache,
      _options$isPromise = options.isPromise,
      isPromise = _options$isPromise === undefined ? false : _options$isPromise,
      _options$maxAge = options.maxAge,
      maxAge = _options$maxAge === undefined ? _constants.INFINITY : _options$maxAge,
      _options$maxArgs = options.maxArgs,
      maxArgs = _options$maxArgs === undefined ? _constants.INFINITY : _options$maxArgs,
      _options$maxSize = options.maxSize,
      maxSize = _options$maxSize === undefined ? _constants.INFINITY : _options$maxSize,
      _options$promiseLibra = options.promiseLibrary,
      promiseLibrary = _options$promiseLibra === undefined ? Promise : _options$promiseLibra,
      _options$serialize = options.serialize,
      serialize = _options$serialize === undefined ? false : _options$serialize,
      _options$serializeFun = options.serializeFunctions,
      serializeFunctions = _options$serializeFun === undefined ? false : _options$serializeFun,
      serializer = options.serializer;


  if (isPromise && !promiseLibrary) {
    throw new ReferenceError(_constants.NO_PROMISE_LIBRARY_EXISTS_ERROR_MESSAGE);
  }

  var addPropertiesToFunction = (0, _utils.createAddPropertiesToFunction)(cache, fn, options);
  var getCacheKey = (0, _utils.createGetCacheKey)(cache, serialize, serializer, serializeFunctions, maxArgs);
  var setNewCachedValue = (0, _utils.createSetNewCachedValue)(cache, isPromise, maxAge, maxSize, promiseLibrary);

  var key = void 0;

  /**
   * @private
   *
   * @function memoizedFunction
   *
   * @description
   * higher-order function which either returns from cache or stores newly-computed value and returns it
   *
   * @param {Array<*>} args arguments passed to method
   * @returns {any} value resulting from executing of fn passed to memoize
   */
  var memoizedFunction = function memoizedFunction() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    key = getCacheKey(args);

    return cache.has(key) ? cache.get(key) : setNewCachedValue(key, fn.apply(this, args));
  };

  return addPropertiesToFunction(memoizedFunction);
};

moize.compose = _utils.compose;
moize.maxAge = (0, _utils.createCurriableOptionMethod)(moize, 'maxAge');
moize.maxArgs = (0, _utils.createCurriableOptionMethod)(moize, 'maxArgs');
moize.maxSize = (0, _utils.createCurriableOptionMethod)(moize, 'maxSize');
moize.promise = moize(PROMISE_OPTIONS);
moize.react = moize(REACT_OPTIONS);
moize.serialize = moize(SERIALIZE_OPTIONS);
moize.simple = moize.maxSize(1);

exports.default = moize;
module.exports = exports['default'];
},{"./Cache":5,"./constants":6,"./utils":8}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.createSetNewCachedValue = exports.createPromiseResolver = exports.createPromiseRejecter = exports.createSetExpirationOfCache = exports.createGetCacheKey = exports.getSerializerFunction = exports.createArgumentSerializer = exports.getStringifiedArgument = exports.stringify = exports.getIndexOfKey = exports.isFiniteAndPositive = exports.createAddPropertiesToFunction = exports.getMultiParamKey = exports.isKeyShallowEqualWithArgs = exports.deleteItemFromCache = exports.decycle = exports.customReplacer = exports.isValueObjectOrArray = exports.isPlainObject = exports.isFunction = exports.isComplexObject = exports.isArray = exports.isArrayFallback = exports.getFunctionName = exports.getFunctionNameViaRegexp = exports.createPluckFromInstanceList = exports.createCurriableOptionMethod = exports.isCache = exports.unshift = exports.splice = exports.every = exports.compose = exports.addStaticPropertiesToFunction = exports.toString = exports.keys = exports.jsonStringify = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// cache


// constants


var _Cache = require('./Cache');

var _Cache2 = _interopRequireDefault(_Cache);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// types
var jsonStringify = exports.jsonStringify = JSON.stringify;
var keys = exports.keys = Object.keys;
var toString = exports.toString = Object.prototype.toString;

/**
 * @private
 *
 * @function addStaticPropertiesToFunction
 *
 * @description
 * add static properties to the memoized function if they exist on the original
 *
 * @param {function} originalFunction the function to be memoized
 * @param {function} memoizedFn the higher-order memoized function
 * @returns {function} memoizedFn with static properties added
 */
var addStaticPropertiesToFunction = exports.addStaticPropertiesToFunction = function addStaticPropertiesToFunction(originalFunction, memoizedFn) {
  var index = _constants.STATIC_PROPERTIES_TO_PASS_LENGTH,
      property = void 0;

  while (index--) {
    property = _constants.STATIC_PROPERTIES_TO_PASS[index];

    if (originalFunction[property]) {
      memoizedFn[property] = originalFunction[property];
    }
  }

  return memoizedFn;
};

/**
 * @private
 *
 * @function compose
 *
 * @description
 * method to compose functions and return a single function
 *
 * @param {...Array<function>} functions the functions to compose
 * @returns {function(...Array<*>): *} the composed function
 */
var compose = exports.compose = function compose() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return functions.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};

/**
 * @private
 *
 * @function every
 *
 * @description
 * faster version of determining every item in array matches fn check
 *
 * @param {Array<*>} array array to test
 * @param {function} fn fn to test each item against
 * @returns {boolean} do all values match
 */
var every = exports.every = function every(array, fn) {
  if (!array.length) {
    return true;
  }

  var index = array.length;

  while (index--) {
    if (!fn(array[index], index)) {
      return false;
    }
  }

  return true;
};

/**
 * @private
 *
 * @function splice
 *
 * @description
 * faster version of splicing a single item from the array
 *
 * @param {Array<*>} array array to splice from
 * @param {number} startingIndex index to splice at
 * @returns {Array<*>} array minus the item removed
 */
var splice = exports.splice = function splice(array, startingIndex) {
  if (!array.length) {
    return array;
  }

  var index = startingIndex - 1;

  while (++index < array.length) {
    array[index] = array[index + 1];
  }

  array.length -= 1;

  return array;
};

/**
 * @private
 *
 * @function unshift
 *
 * @description
 * faster version of unshifting a single item into an array
 *
 * @param {Array<*>} array array to unshift into
 * @param {*} item item to unshift into array
 * @returns {*} the item just added to the array
 */
var unshift = exports.unshift = function unshift(array, item) {
  var index = array.length;

  while (index--) {
    array[index + 1] = array[index];
  }

  return array[0] = item;
};

/**
 * @private
 *
 * @function isCache
 *
 * @description
 * is the object passed an instance of the native Cache implementation
 *
 * @param {*} object object to test
 * @returns {boolean} is the object an instance of Cache
 */
var isCache = exports.isCache = function isCache(object) {
  return !!object[_constants.CACHE_IDENTIFIER];
};

/**
 * @private
 *
 * @function createCurriableOptionMethod
 *
 * @description
 * create a method that will curry moize with the option + value passed
 *
 * @param {function} fn the method to call
 * @param {string} option the name of the option to apply
 * @param {*} value the value to assign to option
 * @returns {function} the moizer with the option pre-applied
 */
var createCurriableOptionMethod = exports.createCurriableOptionMethod = function createCurriableOptionMethod(fn, option) {
  return function (value) {
    var _fn;

    return fn((_fn = {}, _fn[option] = value, _fn));
  };
};

/**
 * @private
 *
 * @function createPluckFromInstanceList
 *
 * @description
 * get a property from the list on the cache
 *
 * @param {{list: Array<Object>}} cache cache whose list to map over
 * @param {string} key key to pluck from list
 * @returns {Array<*>} array of values plucked at key
 */
var createPluckFromInstanceList = exports.createPluckFromInstanceList = function createPluckFromInstanceList(cache, key) {
  return !isCache(cache) ? function () {} : function () {
    return cache.list.map(function (item) {
      return item[key];
    });
  };
};

/**
 * @private
 *
 * @function getFunctionNameViaRegexp
 *
 * @description
 * use regexp match on stringified function to get the function name
 *
 * @param {function} fn function to get the name of
 * @returns {string} function name
 */
var getFunctionNameViaRegexp = exports.getFunctionNameViaRegexp = function getFunctionNameViaRegexp(fn) {
  var match = fn.toString().match(_constants.FUNCTION_NAME_REGEXP);

  return match ? match[1] : '';
};

/**
 * @private
 *
 * @function getFunctionName
 *
 * @description
 * get the function name, either from modern property or regexp match,
 * falling back to generic string
 *
 * @param {function} fn function to get the name of
 * @returns {string} function name
 */
var getFunctionName = exports.getFunctionName = function getFunctionName(fn) {
  return fn.displayName || fn.name || getFunctionNameViaRegexp(fn) || _constants.FUNCTION_TYPEOF;
};

/**
 * @private
 *
 * @function isArrayFallback
 *
 * @description
 * provide fallback for native Array.isArray test
 *
 * @param {*} object object to test if it is an array
 * @returns {boolean} is the object passed an array or not
 */
var isArrayFallback = exports.isArrayFallback = function isArrayFallback(object) {
  return toString.call(object) === _constants.ARRAY_OBJECT_CLASS;
};

/**
 * @private
 *
 * @function isArray
 *
 * @description
 * isArray function to use internally, either the native one or fallback
 *
 * @param {*} object object to test if it is an array
 * @returns {boolean} is the object passed an array or not
 */
var isArray = exports.isArray = Array.isArray || isArrayFallback;

/**
 * @private
 *
 * @function isComplexObject
 *
 * @description
 * is the object passed a complex object
 *
 * @param {*} object object to test if it is complex
 * @returns {boolean} is it a complex object
 */
var isComplexObject = exports.isComplexObject = function isComplexObject(object) {
  return !!object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === _constants.OBJECT_TYPEOF;
};

/**
 * @private
 *
 * @function isFunction
 *
 * @description
 * is the object passed a function or not
 *
 * @param {*} object object to test
 * @returns {boolean} is it a function
 */
var isFunction = exports.isFunction = function isFunction(object) {
  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === _constants.FUNCTION_TYPEOF;
};

/**
 * @private
 *
 * @function isPlainObject
 *
 * @description
 * is the object passed a plain object or not
 *
 * @param {*} object object to test
 * @returns {boolean} is it a plain object
 */
var isPlainObject = exports.isPlainObject = function isPlainObject(object) {
  return isComplexObject(object) && object.constructor === Object;
};

/**
 * @private
 *
 * @function isValueObjectOrArray
 *
 * @description
 * check if the object is actually an object or array
 *
 * @param {*} object object to test
 * @returns {boolean} is the object an object or array
 */
var isValueObjectOrArray = exports.isValueObjectOrArray = function isValueObjectOrArray(object) {
  return isComplexObject(object) && every(_constants.GOTCHA_OBJECT_CLASSES, function (Class) {
    return !(object instanceof Class);
  });
};

/**
 * @private
 *
 * @function customReplacer
 *
 * @description
 * custom replacer for the stringify function
 *
 * @param {string} key key in json object
 * @param {*} value value in json object
 * @returns {*} if function then toString of it, else the value itself
 */
var customReplacer = exports.customReplacer = function customReplacer(key, value) {
  return isFunction(value) ? '' + value : value;
};

/**
 * @private
 *
 * @function decycle
 *
 * @description
 * ES2015-ified version of cycle.decyle
 *
 * @param {*} object object to stringify
 * @returns {string} stringified value of object
 */
var decycle = exports.decycle = function decycle(object) {
  var cache = new _Cache2.default();

  /**
   * @private
   *
   * @function coalesceCircularReferences
   *
   * @description
   * recursive method to replace any circular references with a placeholder
   *
   * @param {*} value value in object to decycle
   * @param {string} path path to reference
   * @returns {*} clean value
   */
  var coalesceCircularReferences = function coalesceCircularReferences(value, path) {
    if (!isValueObjectOrArray(value)) {
      return value;
    }

    if (cache.has(value)) {
      return {
        $ref: cache.get(value)
      };
    }

    cache.set(value, path);

    if (isArray(value)) {
      return value.map(function (item, itemIndex) {
        return coalesceCircularReferences(item, path + '[' + itemIndex + ']');
      });
    }

    return keys(value).reduce(function (object, name) {
      object[name] = coalesceCircularReferences(value[name], path + '[' + JSON.stringify(name) + ']');

      return object;
    }, {});
  };

  return coalesceCircularReferences(object, '$');
};

/**
 * @private
 *
 * @function deleteItemFromCache
 *
 * @description
 * remove an item from cache
 *
 * @param {Cache} cache caching mechanism for method
 * @param {*} key key to delete
 * @param {boolean} [isKeyLastItem=false] should the key be the last item in the LRU list
 */
var deleteItemFromCache = exports.deleteItemFromCache = function deleteItemFromCache(cache, key) {
  var isKeyLastItem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (isKeyLastItem && isCache(cache)) {
    key = cache.list[cache.list.length - 1].key;
  }

  if (cache.has(key)) {
    cache.delete(key);
  }
};

/**
 * @private
 *
 * @function isKeyShallowEqualWithArgs
 *
 * @description
 * is the value passed shallowly equal with the args
 *
 * @param {*} value the value to compare
 * @param {Array<*>} args the args to test
 * @returns {boolean} are the args shallow equal to the value
 */
var isKeyShallowEqualWithArgs = exports.isKeyShallowEqualWithArgs = function isKeyShallowEqualWithArgs(value, args) {
  return value.isMultiParamKey && value.key.length === args.length && every(args, function (arg, index) {
    return arg === value.key[index];
  });
};

/**
 * @private
 *
 * @function getMultiParamKey
 *
 * @description
 * get the multi-parameter key that either matches a current one in state or is the same as the one passed
 *
 * @param {Cache} cache cache to compare args to
 * @param {Array<*>} args arguments passed to moize get key
 * @returns {Array<*>} either a matching key in cache or the same key as the one passed
 */
var getMultiParamKey = exports.getMultiParamKey = function getMultiParamKey(cache, args) {
  if (cache.lastItem && isKeyShallowEqualWithArgs(cache.lastItem, args)) {
    return cache.lastItem.key;
  }

  var iterator = cache.getKeyIterator();

  var iteration = void 0;

  while ((iteration = iterator.next()) && !iteration.done) {
    if (isKeyShallowEqualWithArgs(iteration, args)) {
      return iteration.key;
    }
  }

  // $FlowIgnore ok to add key to array object
  args.isMultiParamKey = true;

  return args;
};

/**
 * @private
 *
 * @function createAddPropertiesToFunction
 *
 * @description
 * add the caching mechanism to the function passed and return the function
 *
 * @param {Cache} cache caching mechanism that has get / set / has methods
 * @param {function} originalFunction function to get the name of
 * @param {Options} options the options for the given memoized function
 * @returns {function(function): function} method that has cache mechanism added to it
 */
var createAddPropertiesToFunction = exports.createAddPropertiesToFunction = function createAddPropertiesToFunction(cache, originalFunction, options) {
  return function (fn) {
    fn.cache = cache;
    fn.displayName = 'Memoized(' + getFunctionName(originalFunction) + ')';
    fn.isMemoized = true;
    fn.options = options;
    fn.originalFunction = originalFunction;

    /**
     * @private
     *
     * @function add
     *
     * @description
     * manually add an item to cache if the key does not already exist
     *
     * @param {*} key key to use in cache
     * @param {*} value value to assign to key
     */
    fn.add = function (key, value) {
      if (!cache.has(key) && getMultiParamKey(cache, key) === key) {
        cache.set(key, value);
      }
    };

    /**
     * @private
     *
     * @function clear
     *
     * @description
     * clear the current cache for this method
     */
    fn.clear = function () {
      cache.clear();
    };

    /**
     * @private
     *
     * @function delete
     *
     * @description
     * delete the cache for the key passed for this method
     *
     * @param {Array<*>} args combination of args to remove from cache
     */
    fn.delete = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var key = args.length === 1 && args[0].isMultiParamKey ? args[0] : getMultiParamKey(cache, args);

      deleteItemFromCache(cache, key);
    };

    /**
     * @private
     *
     * @function keys
     *
     * @description
     * get the list of keys currently in cache
     *
     * @returns {Array<*>}
     */
    fn.keys = createPluckFromInstanceList(cache, 'key');

    /**
     * @private
     *
     * @function values
     *
     * @description
     * get the list of values currently in cache
     *
     * @returns {Array<*>}
     */
    fn.values = createPluckFromInstanceList(cache, 'value');

    return addStaticPropertiesToFunction(originalFunction, fn);
  };
};

/**
 * @private
 *
 * @function isFiniteAndPositive
 *
 * @description
 * is the number passed finite and positive
 *
 * @param {number} number number to test for finiteness and positivity
 * @returns {boolean} is the number finite and positive
 */
var isFiniteAndPositive = exports.isFiniteAndPositive = function isFiniteAndPositive(number) {
  return number === ~~number && number > 0;
};

/**
 * @private
 *
 * @function getIndexOfKey
 *
 * @description
 * get the index of the key in the map
 *
 * @param {Cache} cache cache to iterate over
 * @param {*} key key to find in list
 * @returns {number} index location of key in list
 */
var getIndexOfKey = exports.getIndexOfKey = function getIndexOfKey(cache, key) {
  var iterator = cache.getKeyIterator();

  var iteration = void 0;

  while ((iteration = iterator.next()) && !iteration.done) {
    if (iteration.key === key) {
      return iteration.index;
    }
  }

  return -1;
};

/**
 * @private
 *
 * @function stringify
 *
 * @description
 * stringify with a custom replacer if circular, else use standard JSON.stringify
 *
 * @param {*} value value to stringify
 * @param {function} [replacer] replacer to used in stringification
 * @returns {string} the stringified version of value
 */
var stringify = exports.stringify = function stringify(value, replacer) {
  try {
    return jsonStringify(value, replacer);
  } catch (exception) {
    return jsonStringify(decycle(value), replacer);
  }
};

/**
 * @private
 *
 * @function getStringifiedArgument
 *
 * @description
 * get the stringified version of the argument passed
 *
 * @param {*} arg argument to stringify
 * @param {function} [replacer] replacer to used in stringification
 * @returns {string}
 */
var getStringifiedArgument = exports.getStringifiedArgument = function getStringifiedArgument(arg, replacer) {
  return isComplexObject(arg) ? stringify(arg, replacer) : arg;
};

/**
 * @private
 *
 * @function createArgumentSerializer
 *
 * @description
 * create the internal argument serializer based on the options passed
 *
 * @param {boolean} serializeFunctions should functions be included in the serialization
 * @param {number} maxArgs the cap on the number of arguments used in serialization
 * @returns {function(...Array<*>): string} argument serialization method
 */
var createArgumentSerializer = exports.createArgumentSerializer = function createArgumentSerializer(serializeFunctions, maxArgs) {
  var replacer = serializeFunctions ? customReplacer : null;
  var hasMaxArgs = isFiniteAndPositive(maxArgs);

  return function (args) {
    var length = hasMaxArgs ? maxArgs : args.length;

    var index = -1,
        key = '|';

    while (++index < length) {
      key += getStringifiedArgument(args[index], replacer) + '|';
    }

    return key;
  };
};

/**
 * @private
 *
 * @function getSerializerFunction
 *
 * @description
 * based on the options passed, either use the serializer passed or generate the internal one
 *
 * @param {function} [serializerFromOptions] serializer function passed into options
 * @param {boolean} serializeFunctions should functions be included in the serialization
 * @param {number} maxArgs the cap on the number of arguments used in serialization
 * @returns {function} the function to use in serializing the arguments
 */
var getSerializerFunction = exports.getSerializerFunction = function getSerializerFunction(serializerFromOptions, serializeFunctions, maxArgs) {
  // $FlowIgnore
  return isFunction(serializerFromOptions) ? serializerFromOptions : createArgumentSerializer(serializeFunctions, maxArgs);
};

/**
 * @private
 *
 * @function createGetCacheKey
 *
 * @description
 * get the key used for storage in the method's cache
 *
 * @param {Cache} cache cache where keys are stored
 * @param {boolean} serialize should the arguments be serialized into a string
 * @param {function} serializerFromOptions method used to serialize keys into a string
 * @param {boolean} serializeFunctions should functions be converted to string in serialization
 * @param {number} maxArgs the maximum number of arguments to use in the serialization
 * @returns {function(Array<*>): *}
 */
var createGetCacheKey = exports.createGetCacheKey = function createGetCacheKey(cache, serialize, serializerFromOptions, serializeFunctions, maxArgs) {
  if (serialize) {
    var serializeArguments = getSerializerFunction(serializerFromOptions, serializeFunctions, maxArgs);

    return function (args) {
      return serializeArguments(args);
    };
  }

  if (isFiniteAndPositive(maxArgs)) {
    return function (args) {
      return args.length > 1 ? getMultiParamKey(cache, args.slice(0, maxArgs)) : args[0];
    };
  }

  return function (args) {
    return args.length > 1 ? getMultiParamKey(cache, args) : args[0];
  };
};

/**
 * @private
 *
 * @function setExpirationOfCache
 *
 * @description
 * create function to set the cache to expire after the maxAge passed (coalesced to 0)
 *
 * @param {number} maxAge number in ms to wait before expiring the cache
 * @returns {function(Cache, Array<*>): void} setExpirationOfCache method
 */
var createSetExpirationOfCache = exports.createSetExpirationOfCache = function createSetExpirationOfCache(maxAge) {
  return function (cache, key) {
    setTimeout(function () {
      deleteItemFromCache(cache, key);
    }, maxAge);
  };
};

/**
 * @private
 *
 * @function createPromiseRejecter
 *
 * @description
 * create method that will reject the promise and delete the key from cache
 *
 * @param {Cache} cache cache to update
 * @param {*} key key to delete from cache
 * @param {function} PromiseLibrary the promise library used
 * @returns {function} the rejecter function for the promise
 */
var createPromiseRejecter = exports.createPromiseRejecter = function createPromiseRejecter(cache, key, PromiseLibrary) {
  return function (exception) {
    cache.delete(key);

    return PromiseLibrary.reject(exception);
  };
};

/**
 * @private
 *
 * @function createPromiseResolver
 *
 * @description
 * create method that will resolve the promise and update the key in cache
 *
 * @param {Cache} cache cache to update
 * @param {*} key key to update in cache
 * @param {boolean} hasMaxAge should the cache expire after some time
 * @param {function} setExpirationOfCache function to set the expiration of cache
 * @param {function} PromiseLibrary the promise library used
 * @returns {function} the resolver function for the promise
 */
var createPromiseResolver = exports.createPromiseResolver = function createPromiseResolver(cache, key, hasMaxAge, setExpirationOfCache, PromiseLibrary) {
  return function (resolvedValue) {
    cache.updateItem(key, PromiseLibrary.resolve(resolvedValue));

    if (hasMaxAge) {
      setExpirationOfCache(cache, key);
    }

    return resolvedValue;
  };
};

/**
 * @private
 *
 * @function createSetNewCachedValue
 *
 * @description
 * assign the new value to the key in the functions cache and return the value
 *
 * @param {Cache} cache the cache to assign the value to at key
 * @param {boolean} isPromise is the value a promise or not
 * @param {number} maxAge how long should the cache persist
 * @param {number} maxSize the maximum number of values to store in cache
 * @param {Function} PromiseLibrary the library to use for resolve / reject
 * @returns {function(function, *, *): *} value just stored in cache
 */
var createSetNewCachedValue = exports.createSetNewCachedValue = function createSetNewCachedValue(cache, isPromise, maxAge, maxSize, PromiseLibrary) {
  var hasMaxAge = isFiniteAndPositive(maxAge);
  var hasMaxSize = isFiniteAndPositive(maxSize);
  var setExpirationOfCache = createSetExpirationOfCache(maxAge);

  if (isPromise) {
    return function (key, value) {
      var promiseResolver = createPromiseResolver(cache, key, hasMaxAge, setExpirationOfCache, PromiseLibrary);
      var promiseRejecter = createPromiseRejecter(cache, key, PromiseLibrary);

      var handler = value.then(promiseResolver, promiseRejecter);

      cache.set(key, handler);

      if (hasMaxSize && cache.size > maxSize) {
        deleteItemFromCache(cache, undefined, true);
      }

      return handler;
    };
  }

  return function (key, value) {
    cache.set(key, value);

    if (hasMaxAge) {
      setExpirationOfCache(cache, key);
    }

    if (hasMaxSize && cache.size > maxSize) {
      deleteItemFromCache(cache, undefined, true);
    }

    return value;
  };
};
},{"./Cache":5,"./constants":6}],9:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if ("production" !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if ("production" !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

},{"./lib/ReactPropTypesSecret":13,"fbjs/lib/invariant":2,"fbjs/lib/warning":3}],10:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":13,"fbjs/lib/emptyFunction":1,"fbjs/lib/invariant":2}],11:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if ("production" !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("production" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      "production" !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      "production" !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./checkPropTypes":9,"./lib/ReactPropTypesSecret":13,"fbjs/lib/emptyFunction":1,"fbjs/lib/invariant":2,"fbjs/lib/warning":3}],12:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if ("production" !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

},{"./factoryWithThrowingShims":10,"./factoryWithTypeCheckers":11}],13:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],14:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Chart = exports.defaults = exports.Bubble = exports.Polar = exports.Radar = exports.HorizontalBar = exports.Bar = exports.Line = exports.Pie = exports.Doughnut = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _chart = (typeof window !== "undefined" ? window['Chart'] : typeof global !== "undefined" ? global['Chart'] : null);

var _chart2 = _interopRequireDefault(_chart);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _moize = require('moize');

var _moize2 = _interopRequireDefault(_moize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var datasetKeyProvider = function datasetKeyProvider(d) {
	return d.label;
};
var datasetKeyProviderMemoized = (0, _moize2.default)(datasetKeyProvider);

var ChartComponent = function (_React$Component) {
	_inherits(ChartComponent, _React$Component);

	function ChartComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ChartComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChartComponent.__proto__ || Object.getPrototypeOf(ChartComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnClick = function (event) {
			var instance = _this.chart_instance;

			var _this$props = _this.props,
			    getDatasetAtEvent = _this$props.getDatasetAtEvent,
			    getElementAtEvent = _this$props.getElementAtEvent,
			    getElementsAtEvent = _this$props.getElementsAtEvent,
			    onElementsClick = _this$props.onElementsClick;


			getDatasetAtEvent && getDatasetAtEvent(instance.getDatasetAtEvent(event), event);
			getElementAtEvent && getElementAtEvent(instance.getElementAtEvent(event), event);
			getElementsAtEvent && getElementsAtEvent(instance.getElementsAtEvent(event), event);
			onElementsClick && onElementsClick(instance.getElementsAtEvent(event), event); // Backward compatibility
		}, _this.handleOnClick = function (event) {
			var instance = _this.chart_instance;

			var _this$props2 = _this.props,
			    getDatasetAtEvent = _this$props2.getDatasetAtEvent,
			    getElementAtEvent = _this$props2.getElementAtEvent,
			    getElementsAtEvent = _this$props2.getElementsAtEvent,
			    onElementsClick = _this$props2.onElementsClick;


			getDatasetAtEvent && getDatasetAtEvent(instance.getDatasetAtEvent(event), event);
			getElementAtEvent && getElementAtEvent(instance.getElementAtEvent(event), event);
			getElementsAtEvent && getElementsAtEvent(instance.getElementsAtEvent(event), event);
			onElementsClick && onElementsClick(instance.getElementsAtEvent(event), event); // Backward compatibility
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ChartComponent, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.chart_instance = undefined;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.renderChart();
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			if (this.props.redraw) {
				this.chart_instance.destroy();
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.props.redraw) {
				this.renderChart();
				return;
			}

			this.updateChart();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			var _props = this.props,
			    redraw = _props.redraw,
			    type = _props.type,
			    options = _props.options,
			    plugins = _props.plugins,
			    legend = _props.legend,
			    height = _props.height,
			    width = _props.width;


			if (nextProps.redraw === true) {
				return true;
			}

			if (height !== nextProps.height || width !== nextProps.width) {
				return true;
			}

			if (type !== nextProps.type) {
				return true;
			}

			if (!(0, _lodash2.default)(legend, nextProps.legend)) {
				return true;
			}

			if (!(0, _lodash2.default)(options, nextProps.options)) {
				return true;
			}

			var nextData = this.transformDataProp(nextProps);

			if (!(0, _lodash2.default)(this.shadowDataProp, nextData)) {
				return true;
			}

			return !(0, _lodash2.default)(plugins, nextProps.plugins);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.chart_instance.destroy();
		}

		// Chart.js directly mutates the data.dataset objects by adding _meta proprerty
		// this makes impossible to compare the current and next data changes
		// therefore we memoize the data prop while sending a fake to Chart.js for mutation.

	}, {
		key: 'transformDataProp',
		value: function transformDataProp(props) {
			var data = props.data;

			if (typeof data == 'function') {
				var node = _reactDom2.default.findDOMNode(this);
				return data(node);
			} else {
				return data;
			}
		}

		// see https://github.com/chartjs/Chart.js/blob/master/src/core/core.controller.js#L615-L617

	}, {
		key: 'memoizeDataProps',
		value: function memoizeDataProps() {
			if (!this.props.data) {
				return;
			}

			var data = this.transformDataProp(this.props);

			this.shadowDataProp = _extends({}, data, {
				datasets: data.datasets && data.datasets.map(function (set) {
					return _extends({}, set);
				})
			});

			return data;
		}
	}, {
		key: 'updateChart',
		value: function updateChart() {
			var _this2 = this;

			var options = this.props.options;


			var data = this.memoizeDataProps(this.props);

			if (!this.chart_instance) return;

			if (options) {
				this.chart_instance.options = _chart2.default.helpers.configMerge(this.chart_instance.options, options);
			}

			// Pipe datasets to chart instance datasets enabling
			// seamless transitions
			var currentDatasets = this.chart_instance.config.data && this.chart_instance.config.data.datasets || [];
			var nextDatasets = data.datasets || [];

			// use the key provider to work out which series have been added/removed/changed
			var currentDatasetKeys = currentDatasets.map(this.props.datasetKeyProvider);
			var nextDatasetKeys = nextDatasets.map(this.props.datasetKeyProvider);
			var newDatasets = nextDatasets.filter(function (d) {
				return currentDatasetKeys.indexOf(_this2.props.datasetKeyProvider(d)) === -1;
			});

			// process the updates (via a reverse for loop so we can safely splice deleted datasets out of the array

			var _loop = function _loop(idx) {
				var currentDatasetKey = _this2.props.datasetKeyProvider(currentDatasets[idx]);
				if (nextDatasetKeys.indexOf(currentDatasetKey) === -1) {
					// deleted series
					currentDatasets.splice(idx, 1);
				} else {
					var retainedDataset = nextDatasets.find(function (d) {
						return _this2.props.datasetKeyProvider(d) === currentDatasetKey;
					});
					if (retainedDataset) {
						// update it in place if it is a retained dataset
						currentDatasets[idx].data.splice(retainedDataset.data.length);
						retainedDataset.data.forEach(function (point, pid) {
							currentDatasets[idx].data[pid] = retainedDataset.data[pid];
						});

						var _data = retainedDataset.data,
						    otherProps = _objectWithoutProperties(retainedDataset, ['data']);

						currentDatasets[idx] = _extends({
							data: currentDatasets[idx].data
						}, currentDatasets[idx], otherProps);
					}
				}
			};

			for (var idx = currentDatasets.length - 1; idx >= 0; idx -= 1) {
				_loop(idx);
			}
			// finally add any new series
			newDatasets.forEach(function (d) {
				return currentDatasets.push(d);
			});

			var datasets = data.datasets,
			    rest = _objectWithoutProperties(data, ['datasets']);

			this.chart_instance.config.data = _extends({}, this.chart_instance.config.data, rest);

			this.chart_instance.update();
		}
	}, {
		key: 'renderChart',
		value: function renderChart() {
			var _props2 = this.props,
			    options = _props2.options,
			    legend = _props2.legend,
			    type = _props2.type,
			    redraw = _props2.redraw,
			    plugins = _props2.plugins;

			var node = _reactDom2.default.findDOMNode(this);
			var data = this.memoizeDataProps();

			this.chart_instance = new _chart2.default(node, {
				type: type,
				data: data,
				options: options,
				plugins: plugins
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    height = _props3.height,
			    width = _props3.width,
			    onElementsClick = _props3.onElementsClick;


			return _react2.default.createElement('canvas', {
				height: height,
				width: width,
				onClick: this.handleOnClick
			});
		}
	}]);

	return ChartComponent;
}(_react2.default.Component);

ChartComponent.defaultProps = {
	legend: {
		display: true,
		position: 'bottom'
	},
	type: 'doughnut',
	height: 150,
	width: 300,
	redraw: false,
	options: {},
	datasetKeyProvider: datasetKeyProviderMemoized
};
ChartComponent.propTypes = {
	data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]).isRequired,
	getDatasetAtEvent: _propTypes2.default.func,
	getElementAtEvent: _propTypes2.default.func,
	getElementsAtEvent: _propTypes2.default.func,
	height: _propTypes2.default.number,
	legend: _propTypes2.default.object,
	onElementsClick: _propTypes2.default.func,
	options: _propTypes2.default.object,
	plugins: _propTypes2.default.arrayOf(_propTypes2.default.object),
	redraw: _propTypes2.default.bool,
	type: _propTypes2.default.oneOf(['doughnut', 'pie', 'line', 'bar', 'horizontalBar', 'radar', 'polarArea', 'bubble']),
	width: _propTypes2.default.number,
	datasetKeyProvider: _propTypes2.default.func
};
exports.default = ChartComponent;

var Doughnut = exports.Doughnut = function (_React$Component2) {
	_inherits(Doughnut, _React$Component2);

	function Doughnut() {
		_classCallCheck(this, Doughnut);

		return _possibleConstructorReturn(this, (Doughnut.__proto__ || Object.getPrototypeOf(Doughnut)).apply(this, arguments));
	}

	_createClass(Doughnut, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref2) {
					return _this4.chart_instance = _ref2 && _ref2.chart_instance;
				},
				type: 'doughnut'
			}));
		}
	}]);

	return Doughnut;
}(_react2.default.Component);

var Pie = exports.Pie = function (_React$Component3) {
	_inherits(Pie, _React$Component3);

	function Pie() {
		_classCallCheck(this, Pie);

		return _possibleConstructorReturn(this, (Pie.__proto__ || Object.getPrototypeOf(Pie)).apply(this, arguments));
	}

	_createClass(Pie, [{
		key: 'render',
		value: function render() {
			var _this6 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref3) {
					return _this6.chart_instance = _ref3 && _ref3.chart_instance;
				},
				type: 'pie'
			}));
		}
	}]);

	return Pie;
}(_react2.default.Component);

var Line = exports.Line = function (_React$Component4) {
	_inherits(Line, _React$Component4);

	function Line() {
		_classCallCheck(this, Line);

		return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
	}

	_createClass(Line, [{
		key: 'render',
		value: function render() {
			var _this8 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref4) {
					return _this8.chart_instance = _ref4 && _ref4.chart_instance;
				},
				type: 'line'
			}));
		}
	}]);

	return Line;
}(_react2.default.Component);

var Bar = exports.Bar = function (_React$Component5) {
	_inherits(Bar, _React$Component5);

	function Bar() {
		_classCallCheck(this, Bar);

		return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
	}

	_createClass(Bar, [{
		key: 'render',
		value: function render() {
			var _this10 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref5) {
					return _this10.chart_instance = _ref5 && _ref5.chart_instance;
				},
				type: 'bar'
			}));
		}
	}]);

	return Bar;
}(_react2.default.Component);

var HorizontalBar = exports.HorizontalBar = function (_React$Component6) {
	_inherits(HorizontalBar, _React$Component6);

	function HorizontalBar() {
		_classCallCheck(this, HorizontalBar);

		return _possibleConstructorReturn(this, (HorizontalBar.__proto__ || Object.getPrototypeOf(HorizontalBar)).apply(this, arguments));
	}

	_createClass(HorizontalBar, [{
		key: 'render',
		value: function render() {
			var _this12 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref6) {
					return _this12.chart_instance = _ref6 && _ref6.chart_instance;
				},
				type: 'horizontalBar'
			}));
		}
	}]);

	return HorizontalBar;
}(_react2.default.Component);

var Radar = exports.Radar = function (_React$Component7) {
	_inherits(Radar, _React$Component7);

	function Radar() {
		_classCallCheck(this, Radar);

		return _possibleConstructorReturn(this, (Radar.__proto__ || Object.getPrototypeOf(Radar)).apply(this, arguments));
	}

	_createClass(Radar, [{
		key: 'render',
		value: function render() {
			var _this14 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref7) {
					return _this14.chart_instance = _ref7 && _ref7.chart_instance;
				},
				type: 'radar'
			}));
		}
	}]);

	return Radar;
}(_react2.default.Component);

var Polar = exports.Polar = function (_React$Component8) {
	_inherits(Polar, _React$Component8);

	function Polar() {
		_classCallCheck(this, Polar);

		return _possibleConstructorReturn(this, (Polar.__proto__ || Object.getPrototypeOf(Polar)).apply(this, arguments));
	}

	_createClass(Polar, [{
		key: 'render',
		value: function render() {
			var _this16 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref8) {
					return _this16.chart_instance = _ref8 && _ref8.chart_instance;
				},
				type: 'polarArea'
			}));
		}
	}]);

	return Polar;
}(_react2.default.Component);

var Bubble = exports.Bubble = function (_React$Component9) {
	_inherits(Bubble, _React$Component9);

	function Bubble() {
		_classCallCheck(this, Bubble);

		return _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).apply(this, arguments));
	}

	_createClass(Bubble, [{
		key: 'render',
		value: function render() {
			var _this18 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref9) {
					return _this18.chart_instance = _ref9 && _ref9.chart_instance;
				},
				type: 'bubble'
			}));
		}
	}]);

	return Bubble;
}(_react2.default.Component);

var defaults = exports.defaults = _chart2.default.defaults;
exports.Chart = _chart2.default;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lodash.isequal":4,"moize":7,"prop-types":12}]},{},[14])(14)
});