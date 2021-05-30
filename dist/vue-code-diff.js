(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("diff"), require("diff2html"), require("highlight.js"));
	else if(typeof define === 'function' && define.amd)
		define(["diff", "diff2html", "highlight.js"], factory);
	else if(typeof exports === 'object')
		exports["vue-code-diff"] = factory(require("diff"), require("diff2html"), require("highlight.js"));
	else
		root["vue-code-diff"] = factory(root["diff"], root["diff2html"], root["highlight.js"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__6801__, __WEBPACK_EXTERNAL_MODULE__6918__, __WEBPACK_EXTERNAL_MODULE__6872__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2714:
/***/ (function(module) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ 9293:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(47);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ 5570:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(5389).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 6506:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(47);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ 1167:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(9718).forEach;
var arrayMethodIsStrict = __webpack_require__(428);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ 1669:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(1301);
var toLength = __webpack_require__(3208);
var toAbsoluteIndex = __webpack_require__(8018);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 9718:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(6385);
var IndexedObject = __webpack_require__(5542);
var toObject = __webpack_require__(2196);
var toLength = __webpack_require__(3208);
var arraySpeciesCreate = __webpack_require__(1461);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};


/***/ }),

/***/ 428:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(629);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 1461:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(47);
var isArray = __webpack_require__(8397);
var wellKnownSymbol = __webpack_require__(6807);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ 3236:
/***/ (function(module) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 4888:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(2253);
var ownKeys = __webpack_require__(4327);
var getOwnPropertyDescriptorModule = __webpack_require__(6623);
var definePropertyModule = __webpack_require__(1765);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ 6273:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(1629);
var definePropertyModule = __webpack_require__(1765);
var createPropertyDescriptor = __webpack_require__(5250);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 5250:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 1629:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(629);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 4971:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var isObject = __webpack_require__(47);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 3924:
/***/ (function(module) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 5209:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(3236);
var global = __webpack_require__(4677);

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ 3696:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5784);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 9450:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var userAgent = __webpack_require__(3696);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ 3711:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 7574:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var getOwnPropertyDescriptor = __webpack_require__(6623).f;
var createNonEnumerableProperty = __webpack_require__(6273);
var redefine = __webpack_require__(3369);
var setGlobal = __webpack_require__(488);
var copyConstructorProperties = __webpack_require__(4888);
var isForced = __webpack_require__(2432);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 629:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 6475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(6366);
var redefine = __webpack_require__(3369);
var fails = __webpack_require__(629);
var wellKnownSymbol = __webpack_require__(6807);
var regexpExec = __webpack_require__(1517);
var createNonEnumerableProperty = __webpack_require__(6273);

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 6385:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aFunction = __webpack_require__(2714);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 5784:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(504);
var global = __webpack_require__(4677);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8563:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toObject = __webpack_require__(2196);

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 4677:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  /* global globalThis -- safe */
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2253:
/***/ (function(module) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 9154:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 8160:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5784);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 9520:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(1629);
var fails = __webpack_require__(629);
var createElement = __webpack_require__(4971);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 5542:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(629);
var classof = __webpack_require__(3236);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 5670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(47);
var setPrototypeOf = __webpack_require__(9040);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 8914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var store = __webpack_require__(1247);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 6761:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(1544);
var global = __webpack_require__(4677);
var isObject = __webpack_require__(47);
var createNonEnumerableProperty = __webpack_require__(6273);
var objectHas = __webpack_require__(2253);
var shared = __webpack_require__(1247);
var sharedKey = __webpack_require__(1325);
var hiddenKeys = __webpack_require__(9154);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 8397:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(3236);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ 2432:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(629);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 47:
/***/ (function(module) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 2093:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 4893:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_NODE = __webpack_require__(5209);
var V8_VERSION = __webpack_require__(9450);
var fails = __webpack_require__(629);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  /* global Symbol -- required for testing */
  return !Symbol.sham &&
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    (IS_NODE ? V8_VERSION === 38 : V8_VERSION > 37 && V8_VERSION < 41);
});


/***/ }),

/***/ 1544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var inspectSource = __webpack_require__(8914);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(6506);
var defineProperties = __webpack_require__(5139);
var enumBugKeys = __webpack_require__(3711);
var hiddenKeys = __webpack_require__(9154);
var html = __webpack_require__(8160);
var documentCreateElement = __webpack_require__(4971);
var sharedKey = __webpack_require__(1325);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ 5139:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(1629);
var definePropertyModule = __webpack_require__(1765);
var anObject = __webpack_require__(6506);
var objectKeys = __webpack_require__(5474);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ 1765:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(1629);
var IE8_DOM_DEFINE = __webpack_require__(9520);
var anObject = __webpack_require__(6506);
var toPrimitive = __webpack_require__(6204);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 6623:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(1629);
var propertyIsEnumerableModule = __webpack_require__(630);
var createPropertyDescriptor = __webpack_require__(5250);
var toIndexedObject = __webpack_require__(1301);
var toPrimitive = __webpack_require__(6204);
var has = __webpack_require__(2253);
var IE8_DOM_DEFINE = __webpack_require__(9520);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ 2884:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(2034);
var enumBugKeys = __webpack_require__(3711);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 1453:
/***/ (function(__unused_webpack_module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 2034:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(2253);
var toIndexedObject = __webpack_require__(1301);
var indexOf = __webpack_require__(1669).indexOf;
var hiddenKeys = __webpack_require__(9154);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 5474:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(2034);
var enumBugKeys = __webpack_require__(3711);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 630:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ 9040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(6506);
var aPossiblePrototype = __webpack_require__(9293);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 4327:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5784);
var getOwnPropertyNamesModule = __webpack_require__(2884);
var getOwnPropertySymbolsModule = __webpack_require__(1453);
var anObject = __webpack_require__(6506);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 504:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);

module.exports = global;


/***/ }),

/***/ 3369:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var createNonEnumerableProperty = __webpack_require__(6273);
var has = __webpack_require__(2253);
var setGlobal = __webpack_require__(488);
var inspectSource = __webpack_require__(8914);
var InternalStateModule = __webpack_require__(6761);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 5740:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(3236);
var regexpExec = __webpack_require__(1517);

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ 1517:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(6742);
var stickyHelpers = __webpack_require__(3626);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
// eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 6742:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(6506);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 3626:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(629);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ 9612:
/***/ (function(module) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var createNonEnumerableProperty = __webpack_require__(6273);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 1325:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(4909);
var uid = __webpack_require__(1560);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 1247:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var setGlobal = __webpack_require__(488);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 4909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(2093);
var store = __webpack_require__(1247);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.9.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 5389:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(6736);
var requireObjectCoercible = __webpack_require__(9612);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 3516:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(9612);
var whitespaces = __webpack_require__(479);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 8018:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(6736);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 1301:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(5542);
var requireObjectCoercible = __webpack_require__(9612);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 6736:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ 3208:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(6736);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 2196:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(9612);

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 6204:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(47);

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 1560:
/***/ (function(module) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ 9538:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(4893);

module.exports = NATIVE_SYMBOL
  /* global Symbol -- safe */
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 6807:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var shared = __webpack_require__(4909);
var has = __webpack_require__(2253);
var uid = __webpack_require__(1560);
var NATIVE_SYMBOL = __webpack_require__(4893);
var USE_SYMBOL_AS_UID = __webpack_require__(9538);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 479:
/***/ (function(module) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 9329:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(1629);
var defineProperty = __webpack_require__(1765).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 907:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(1629);
var global = __webpack_require__(4677);
var isForced = __webpack_require__(2432);
var redefine = __webpack_require__(3369);
var has = __webpack_require__(2253);
var classof = __webpack_require__(3236);
var inheritIfRequired = __webpack_require__(5670);
var toPrimitive = __webpack_require__(6204);
var fails = __webpack_require__(629);
var create = __webpack_require__(8052);
var getOwnPropertyNames = __webpack_require__(2884).f;
var getOwnPropertyDescriptor = __webpack_require__(6623).f;
var defineProperty = __webpack_require__(1765).f;
var trim = __webpack_require__(3516).trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ 6366:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(7574);
var exec = __webpack_require__(1517);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 8289:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(6475);
var anObject = __webpack_require__(6506);
var toLength = __webpack_require__(3208);
var toInteger = __webpack_require__(6736);
var requireObjectCoercible = __webpack_require__(9612);
var advanceStringIndex = __webpack_require__(5570);
var getSubstitution = __webpack_require__(8563);
var regExpExec = __webpack_require__(5740);

var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
});


/***/ }),

/***/ 1692:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(4677);
var DOMIterables = __webpack_require__(3924);
var forEach = __webpack_require__(1167);
var createNonEnumerableProperty = __webpack_require__(6273);

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ 2189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4309);
/* harmony import */ var _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7239);
/* harmony import */ var _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".d2h-d-none{display:none}.d2h-wrapper{text-align:left}.d2h-file-header{height:35px;padding:5px 10px;border-bottom:1px solid #d8d8d8;background-color:#f7f7f7;font-family:Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif}.d2h-file-header,.d2h-file-stats{display:-webkit-box;display:-ms-flexbox;display:flex}.d2h-file-stats{margin-left:auto;font-size:14px}.d2h-lines-added{text-align:right;border:1px solid #b4e2b4;border-radius:5px 0 0 5px;color:#399839;padding:2px;vertical-align:middle}.d2h-lines-deleted{text-align:left;border:1px solid #e9aeae;border-radius:0 5px 5px 0;color:#c33;padding:2px;vertical-align:middle;margin-left:1px}.d2h-file-name-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;font-size:15px}.d2h-file-name{white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}.d2h-file-wrapper{margin-bottom:1em}.d2h-file-collapse,.d2h-file-wrapper{border:1px solid #ddd;border-radius:3px}.d2h-file-collapse{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;display:none;cursor:pointer;font-size:12px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:4px 8px}.d2h-file-collapse.d2h-selected{background-color:#c8e1ff}.d2h-file-collapse-input{margin:0 4px 0 0}.d2h-diff-table{width:100%;border-collapse:collapse;font-family:Menlo,Consolas,monospace;font-size:13px}.d2h-files-diff{display:block;width:100%}.d2h-file-diff{overflow-y:hidden}.d2h-file-side-diff{display:inline-block;overflow-x:scroll;overflow-y:hidden;width:50%;margin-right:-4px;margin-bottom:-8px}.d2h-code-line{padding:0 8em}.d2h-code-line,.d2h-code-side-line{display:inline-block;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}.d2h-code-side-line{padding:0 4.5em}.d2h-code-line-ctn{display:inline-block;background:none;padding:0;word-wrap:normal;white-space:pre;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;width:100%;vertical-align:middle}.d2h-code-line del,.d2h-code-side-line del{background-color:#ffb6ba}.d2h-code-line del,.d2h-code-line ins,.d2h-code-side-line del,.d2h-code-side-line ins{display:inline-block;margin-top:-1px;text-decoration:none;border-radius:.2em;vertical-align:middle}.d2h-code-line ins,.d2h-code-side-line ins{background-color:#97f295;text-align:left}.d2h-code-line-prefix{display:inline;background:none;padding:0;word-wrap:normal;white-space:pre}.line-num1{float:left}.line-num1,.line-num2{-webkit-box-sizing:border-box;box-sizing:border-box;width:3.5em;overflow:hidden;text-overflow:ellipsis;padding:0 .5em}.line-num2{float:right}.d2h-code-linenumber{-webkit-box-sizing:border-box;box-sizing:border-box;width:7.5em;position:absolute;display:inline-block;background-color:#fff;color:rgba(0,0,0,.3);text-align:right;border:solid #eee;border-width:0 1px;cursor:pointer}.d2h-code-linenumber:after{content:\"\\200b\"}.d2h-code-side-linenumber{position:absolute;display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:4em;background-color:#fff;color:rgba(0,0,0,.3);text-align:right;border:solid #eee;border-width:0 1px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;padding:0 .5em}.d2h-code-side-linenumber:after{content:\"\\200b\"}.d2h-code-side-emptyplaceholder,.d2h-emptyplaceholder{background-color:#f1f1f1;border-color:#e1e1e1}.d2h-code-line-prefix,.d2h-code-linenumber,.d2h-code-side-linenumber,.d2h-emptyplaceholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d2h-code-linenumber,.d2h-code-side-linenumber{direction:rtl}.d2h-del{background-color:#fee8e9;border-color:#e9aeae}.d2h-ins{background-color:#dfd;border-color:#b4e2b4}.d2h-info{background-color:#f8fafd;color:rgba(0,0,0,.3);border-color:#d5e4f2}.d2h-file-diff .d2h-del.d2h-change{background-color:#fdf2d0}.d2h-file-diff .d2h-ins.d2h-change{background-color:#ded}.d2h-file-list-wrapper{margin-bottom:10px}.d2h-file-list-wrapper a{text-decoration:none;color:#3572b0}.d2h-file-list-wrapper a:visited{color:#3572b0}.d2h-file-list-header{text-align:left}.d2h-file-list-title{font-weight:700}.d2h-file-list-line{display:-webkit-box;display:-ms-flexbox;display:flex;text-align:left}.d2h-file-list{display:block;list-style:none;padding:0;margin:0}.d2h-file-list>li{border-bottom:1px solid #ddd;padding:5px 10px;margin:0}.d2h-file-list>li:last-child{border-bottom:none}.d2h-file-switch{display:none;font-size:10px;cursor:pointer}.d2h-icon{vertical-align:middle;margin-right:10px;fill:currentColor}.d2h-deleted{color:#c33}.d2h-added{color:#399839}.d2h-changed{color:#d0b44c}.d2h-moved{color:#3572b0}.d2h-tag{display:-webkit-box;display:-ms-flexbox;display:flex;font-size:10px;margin-left:5px;padding:0 2px;background-color:#fff}.d2h-deleted-tag{border:1px solid #c33}.d2h-added-tag{border:1px solid #399839}.d2h-changed-tag{border:1px solid #d0b44c}.d2h-moved-tag{border:1px solid #3572b0}", "",{"version":3,"sources":["webpack://./node_modules/.pnpm/diff2html@3.3.1/node_modules/diff2html/bundles/css/diff2html.min.css"],"names":[],"mappings":"AAAA,YAAY,YAAY,CAAC,aAAa,eAAe,CAAC,iBAAiB,WAAW,CAAC,gBAAgB,CAAC,+BAA+B,CAAC,wBAAwB,CAAC,qEAAqE,CAAC,iCAAiC,mBAAmB,CAAC,mBAAmB,CAAC,YAAY,CAAC,gBAAgB,gBAAgB,CAAC,cAAc,CAAC,iBAAiB,gBAAgB,CAAC,wBAAwB,CAAC,yBAAyB,CAAC,aAAa,CAAC,WAAW,CAAC,qBAAqB,CAAC,mBAAmB,eAAe,CAAC,wBAAwB,CAAC,yBAAyB,CAAC,UAAU,CAAC,WAAW,CAAC,qBAAqB,CAAC,eAAe,CAAC,uBAAuB,mBAAmB,CAAC,mBAAmB,CAAC,YAAY,CAAC,wBAAwB,CAAC,qBAAqB,CAAC,kBAAkB,CAAC,UAAU,CAAC,cAAc,CAAC,eAAe,kBAAkB,CAAC,sBAAsB,CAAC,iBAAiB,CAAC,kBAAkB,iBAAiB,CAAC,qCAAqC,qBAAqB,CAAC,iBAAiB,CAAC,mBAAmB,oBAAoB,CAAC,iBAAiB,CAAC,wBAAwB,CAAC,YAAY,CAAC,cAAc,CAAC,cAAc,CAAC,wBAAwB,CAAC,qBAAqB,CAAC,kBAAkB,CAAC,eAAe,CAAC,gCAAgC,wBAAwB,CAAC,yBAAyB,gBAAgB,CAAC,gBAAgB,UAAU,CAAC,wBAAwB,CAAC,oCAAoC,CAAC,cAAc,CAAC,gBAAgB,aAAa,CAAC,UAAU,CAAC,eAAe,iBAAiB,CAAC,oBAAoB,oBAAoB,CAAC,iBAAiB,CAAC,iBAAiB,CAAC,SAAS,CAAC,iBAAiB,CAAC,kBAAkB,CAAC,eAAe,aAAa,CAAC,mCAAmC,oBAAoB,CAAC,kBAAkB,CAAC,wBAAwB,CAAC,qBAAqB,CAAC,oBAAoB,CAAC,gBAAgB,CAAC,UAAU,CAAC,oBAAoB,eAAe,CAAC,mBAAmB,oBAAoB,CAAC,eAAe,CAAC,SAAS,CAAC,gBAAgB,CAAC,eAAe,CAAC,wBAAwB,CAAC,qBAAqB,CAAC,oBAAoB,CAAC,gBAAgB,CAAC,UAAU,CAAC,qBAAqB,CAAC,2CAA2C,wBAAwB,CAAC,sFAAsF,oBAAoB,CAAC,eAAe,CAAC,oBAAoB,CAAC,kBAAkB,CAAC,qBAAqB,CAAC,2CAA2C,wBAAwB,CAAC,eAAe,CAAC,sBAAsB,cAAc,CAAC,eAAe,CAAC,SAAS,CAAC,gBAAgB,CAAC,eAAe,CAAC,WAAW,UAAU,CAAC,sBAAsB,6BAA6B,CAAC,qBAAqB,CAAC,WAAW,CAAC,eAAe,CAAC,sBAAsB,CAAC,cAAc,CAAC,WAAW,WAAW,CAAC,qBAAqB,6BAA6B,CAAC,qBAAqB,CAAC,WAAW,CAAC,iBAAiB,CAAC,oBAAoB,CAAC,qBAAqB,CAAC,oBAAoB,CAAC,gBAAgB,CAAC,iBAAiB,CAAC,kBAAkB,CAAC,cAAc,CAAC,2BAA2B,eAAe,CAAC,0BAA0B,iBAAiB,CAAC,oBAAoB,CAAC,6BAA6B,CAAC,qBAAqB,CAAC,SAAS,CAAC,qBAAqB,CAAC,oBAAoB,CAAC,gBAAgB,CAAC,iBAAiB,CAAC,kBAAkB,CAAC,cAAc,CAAC,eAAe,CAAC,sBAAsB,CAAC,cAAc,CAAC,gCAAgC,eAAe,CAAC,sDAAsD,wBAAwB,CAAC,oBAAoB,CAAC,2FAA2F,wBAAwB,CAAC,qBAAqB,CAAC,oBAAoB,CAAC,gBAAgB,CAAC,+CAA+C,aAAa,CAAC,SAAS,wBAAwB,CAAC,oBAAoB,CAAC,SAAS,qBAAqB,CAAC,oBAAoB,CAAC,UAAU,wBAAwB,CAAC,oBAAoB,CAAC,oBAAoB,CAAC,mCAAmC,wBAAwB,CAAC,mCAAmC,qBAAqB,CAAC,uBAAuB,kBAAkB,CAAC,yBAAyB,oBAAoB,CAAC,aAAa,CAAC,iCAAiC,aAAa,CAAC,sBAAsB,eAAe,CAAC,qBAAqB,eAAe,CAAC,oBAAoB,mBAAmB,CAAC,mBAAmB,CAAC,YAAY,CAAC,eAAe,CAAC,eAAe,aAAa,CAAC,eAAe,CAAC,SAAS,CAAC,QAAQ,CAAC,kBAAkB,4BAA4B,CAAC,gBAAgB,CAAC,QAAQ,CAAC,6BAA6B,kBAAkB,CAAC,iBAAiB,YAAY,CAAC,cAAc,CAAC,cAAc,CAAC,UAAU,qBAAqB,CAAC,iBAAiB,CAAC,iBAAiB,CAAC,aAAa,UAAU,CAAC,WAAW,aAAa,CAAC,aAAa,aAAa,CAAC,WAAW,aAAa,CAAC,SAAS,mBAAmB,CAAC,mBAAmB,CAAC,YAAY,CAAC,cAAc,CAAC,eAAe,CAAC,aAAa,CAAC,qBAAqB,CAAC,iBAAiB,qBAAqB,CAAC,eAAe,wBAAwB,CAAC,iBAAiB,wBAAwB,CAAC,eAAe,wBAAwB","sourcesContent":[".d2h-d-none{display:none}.d2h-wrapper{text-align:left}.d2h-file-header{height:35px;padding:5px 10px;border-bottom:1px solid #d8d8d8;background-color:#f7f7f7;font-family:Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif}.d2h-file-header,.d2h-file-stats{display:-webkit-box;display:-ms-flexbox;display:flex}.d2h-file-stats{margin-left:auto;font-size:14px}.d2h-lines-added{text-align:right;border:1px solid #b4e2b4;border-radius:5px 0 0 5px;color:#399839;padding:2px;vertical-align:middle}.d2h-lines-deleted{text-align:left;border:1px solid #e9aeae;border-radius:0 5px 5px 0;color:#c33;padding:2px;vertical-align:middle;margin-left:1px}.d2h-file-name-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;font-size:15px}.d2h-file-name{white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}.d2h-file-wrapper{margin-bottom:1em}.d2h-file-collapse,.d2h-file-wrapper{border:1px solid #ddd;border-radius:3px}.d2h-file-collapse{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;display:none;cursor:pointer;font-size:12px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:4px 8px}.d2h-file-collapse.d2h-selected{background-color:#c8e1ff}.d2h-file-collapse-input{margin:0 4px 0 0}.d2h-diff-table{width:100%;border-collapse:collapse;font-family:Menlo,Consolas,monospace;font-size:13px}.d2h-files-diff{display:block;width:100%}.d2h-file-diff{overflow-y:hidden}.d2h-file-side-diff{display:inline-block;overflow-x:scroll;overflow-y:hidden;width:50%;margin-right:-4px;margin-bottom:-8px}.d2h-code-line{padding:0 8em}.d2h-code-line,.d2h-code-side-line{display:inline-block;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}.d2h-code-side-line{padding:0 4.5em}.d2h-code-line-ctn{display:inline-block;background:none;padding:0;word-wrap:normal;white-space:pre;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;width:100%;vertical-align:middle}.d2h-code-line del,.d2h-code-side-line del{background-color:#ffb6ba}.d2h-code-line del,.d2h-code-line ins,.d2h-code-side-line del,.d2h-code-side-line ins{display:inline-block;margin-top:-1px;text-decoration:none;border-radius:.2em;vertical-align:middle}.d2h-code-line ins,.d2h-code-side-line ins{background-color:#97f295;text-align:left}.d2h-code-line-prefix{display:inline;background:none;padding:0;word-wrap:normal;white-space:pre}.line-num1{float:left}.line-num1,.line-num2{-webkit-box-sizing:border-box;box-sizing:border-box;width:3.5em;overflow:hidden;text-overflow:ellipsis;padding:0 .5em}.line-num2{float:right}.d2h-code-linenumber{-webkit-box-sizing:border-box;box-sizing:border-box;width:7.5em;position:absolute;display:inline-block;background-color:#fff;color:rgba(0,0,0,.3);text-align:right;border:solid #eee;border-width:0 1px;cursor:pointer}.d2h-code-linenumber:after{content:\"\\200b\"}.d2h-code-side-linenumber{position:absolute;display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:4em;background-color:#fff;color:rgba(0,0,0,.3);text-align:right;border:solid #eee;border-width:0 1px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;padding:0 .5em}.d2h-code-side-linenumber:after{content:\"\\200b\"}.d2h-code-side-emptyplaceholder,.d2h-emptyplaceholder{background-color:#f1f1f1;border-color:#e1e1e1}.d2h-code-line-prefix,.d2h-code-linenumber,.d2h-code-side-linenumber,.d2h-emptyplaceholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d2h-code-linenumber,.d2h-code-side-linenumber{direction:rtl}.d2h-del{background-color:#fee8e9;border-color:#e9aeae}.d2h-ins{background-color:#dfd;border-color:#b4e2b4}.d2h-info{background-color:#f8fafd;color:rgba(0,0,0,.3);border-color:#d5e4f2}.d2h-file-diff .d2h-del.d2h-change{background-color:#fdf2d0}.d2h-file-diff .d2h-ins.d2h-change{background-color:#ded}.d2h-file-list-wrapper{margin-bottom:10px}.d2h-file-list-wrapper a{text-decoration:none;color:#3572b0}.d2h-file-list-wrapper a:visited{color:#3572b0}.d2h-file-list-header{text-align:left}.d2h-file-list-title{font-weight:700}.d2h-file-list-line{display:-webkit-box;display:-ms-flexbox;display:flex;text-align:left}.d2h-file-list{display:block;list-style:none;padding:0;margin:0}.d2h-file-list>li{border-bottom:1px solid #ddd;padding:5px 10px;margin:0}.d2h-file-list>li:last-child{border-bottom:none}.d2h-file-switch{display:none;font-size:10px;cursor:pointer}.d2h-icon{vertical-align:middle;margin-right:10px;fill:currentColor}.d2h-deleted{color:#c33}.d2h-added{color:#399839}.d2h-changed{color:#d0b44c}.d2h-moved{color:#3572b0}.d2h-tag{display:-webkit-box;display:-ms-flexbox;display:flex;font-size:10px;margin-left:5px;padding:0 2px;background-color:#fff}.d2h-deleted-tag{border:1px solid #c33}.d2h-added-tag{border:1px solid #399839}.d2h-changed-tag{border:1px solid #d0b44c}.d2h-moved-tag{border:1px solid #3572b0}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["Z"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4809:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4309);
/* harmony import */ var _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7239);
/* harmony import */ var _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n\nGoogle Code style (c) Aahan Krish <geekpanth3r@gmail.com>\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: white;\n  color: black;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #800;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-section,\n.hljs-title,\n.hljs-name {\n  color: #008;\n}\n\n.hljs-variable,\n.hljs-template-variable {\n  color: #660;\n}\n\n.hljs-string,\n.hljs-selector-attr,\n.hljs-selector-pseudo,\n.hljs-regexp {\n  color: #080;\n}\n\n.hljs-literal,\n.hljs-symbol,\n.hljs-bullet,\n.hljs-meta,\n.hljs-number,\n.hljs-link {\n  color: #066;\n}\n\n.hljs-title,\n.hljs-doctag,\n.hljs-type,\n.hljs-attr,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-params {\n  color: #606;\n}\n\n.hljs-attribute,\n.hljs-subst {\n  color: #000;\n}\n\n.hljs-formula {\n  background-color: #eee;\n  font-style: italic;\n}\n\n.hljs-selector-id,\n.hljs-selector-class {\n  color: #9B703F\n}\n\n.hljs-addition {\n  background-color: #baeeba;\n}\n\n.hljs-deletion {\n  background-color: #ffc8bd;\n}\n\n.hljs-doctag,\n.hljs-strong {\n  font-weight: bold;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n", "",{"version":3,"sources":["webpack://./node_modules/.pnpm/highlight.js@9.18.5/node_modules/highlight.js/styles/googlecode.css"],"names":[],"mappings":"AAAA;;;;CAIC;;AAED;EACE,cAAc;EACd,gBAAgB;EAChB,cAAc;EACd,iBAAiB;EACjB,YAAY;AACd;;AAEA;;EAEE,WAAW;AACb;;AAEA;;;;;EAKE,WAAW;AACb;;AAEA;;EAEE,WAAW;AACb;;AAEA;;;;EAIE,WAAW;AACb;;AAEA;;;;;;EAME,WAAW;AACb;;AAEA;;;;;;;EAOE,WAAW;AACb;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;;EAEE;AACF;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":["/*\n\nGoogle Code style (c) Aahan Krish <geekpanth3r@gmail.com>\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: white;\n  color: black;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #800;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-section,\n.hljs-title,\n.hljs-name {\n  color: #008;\n}\n\n.hljs-variable,\n.hljs-template-variable {\n  color: #660;\n}\n\n.hljs-string,\n.hljs-selector-attr,\n.hljs-selector-pseudo,\n.hljs-regexp {\n  color: #080;\n}\n\n.hljs-literal,\n.hljs-symbol,\n.hljs-bullet,\n.hljs-meta,\n.hljs-number,\n.hljs-link {\n  color: #066;\n}\n\n.hljs-title,\n.hljs-doctag,\n.hljs-type,\n.hljs-attr,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-params {\n  color: #606;\n}\n\n.hljs-attribute,\n.hljs-subst {\n  color: #000;\n}\n\n.hljs-formula {\n  background-color: #eee;\n  font-style: italic;\n}\n\n.hljs-selector-id,\n.hljs-selector-class {\n  color: #9B703F\n}\n\n.hljs-addition {\n  background-color: #baeeba;\n}\n\n.hljs-deletion {\n  background-color: #ffc8bd;\n}\n\n.hljs-doctag,\n.hljs-strong {\n  font-weight: bold;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["Z"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5984:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_pnpm_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4309);
/* harmony import */ var _node_modules_pnpm_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7239);
/* harmony import */ var _node_modules_pnpm_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_5_1_2_webpack_5_24_4_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.hljs {\n  display: inline-block;\n  padding: 0;\n  background: transparent;\n  vertical-align: middle;\n  height: 17px;\n}\n.d2h-wrapper {\n  position: relative;\n}\n.d2h-wrapper .d2h-file-header {\n  display: none;\n}\n.d2h-wrapper .d2h-files-diff {\n  position: relative;\n}\n.d2h-wrapper .d2h-file-side-diff {\n  margin-bottom: -5px;\n}\n.d2h-wrapper .d2h-files-diff > .d2h-file-side-diff ~ .d2h-file-side-diff {\n  position: absolute;\n}\n.d2h-wrapper .d2h-code-side-emptyplaceholder {\n  max-height: 19px;\n}\n.d2h-wrapper .d2h-code-side-line,\n.d2h-wrapper .d2h-code-line {\n  display: block;\n  width: auto;\n}\n.d2h-wrapper .d2h-code-side-line.d2h-info {\n  height: 18px;\n}\n.d2h-wrapper .d2h-code-linenumber,\n.d2h-code-side-linenumber {\n  height: 19px;\n}\n", "",{"version":3,"sources":["webpack://./src/lib/code-diff/index.vue"],"names":[],"mappings":";AAoGA;EACA,qBAAA;EACA,UAAA;EACA,uBAAA;EACA,sBAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,mBAAA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;;EAEA,cAAA;EACA,WAAA;AACA;AAEA;EACA,YAAA;AACA;AAEA;;EAEA,YAAA;AACA","sourcesContent":["<template>\n  <div id=\"app\">\n    <div\n      v-highlight\n      v-html=\"html\"\n    />\n  </div>\n</template>\n\n<script>\nimport { createPatch } from 'diff'\nimport * as Diff2Html from 'diff2html'\nimport hljs from 'highlight.js'\nimport 'highlight.js/styles/googlecode.css'\nimport 'diff2html/bundles/css/diff2html.min.css'\nexport default {\n  name: 'CodeDiff',\n  directives: {\n    highlight: function (el) {\n      const blocks = el.querySelectorAll('code')\n      blocks.forEach((block) => {\n        hljs.highlightBlock(block)\n      })\n    }\n  },\n  props: {\n    oldString: {\n      type: String,\n      default: ''\n    },\n    newString: {\n      type: String,\n      default: ''\n    },\n    context: {\n      type: Number,\n      default: 5\n    },\n    outputFormat: {\n      type: String,\n      default: 'line-by-line'\n    },\n    drawFileList: {\n      type: Boolean,\n      defalut: false\n    },\n    renderNothingWhenEmpty: {\n      type: Boolean,\n      default: false\n    },\n    diffStyle: {\n      type: String,\n      default: 'word'\n    },\n    fileName: {\n      type: String,\n      default: ''\n    },\n    isShowNoChange: {\n      type: Boolean,\n      default: false\n    }\n  },\n  computed: {\n    html () {\n      return this.createdHtml(this.oldString, this.newString, this.context, this.outputFormat, this.drawFileList, this.renderNothingWhenEmpty, this.fileName, this.isShowNoChange)\n    }\n  },\n  methods: {\n    createdHtml (oldString, newString, context, outputFormat, drawFileList, renderNothingWhenEmpty, fileName, isShowNoChange) {\n      function hljs (html) {\n        return html.replace(/<span class=\"d2h-code-line-ctn\">(.+?)<\\/span>/g, '<span class=\"d2h-code-line-ctn\"><code>$1</code></span>')\n      }\n      if (isShowNoChange) {\n        oldString = 'File Without Change\\tOldString: ======================== \\n' + oldString\n        newString = 'File Without Change\\tNewString: ======================== \\n' + newString\n      }\n      const args = [fileName, oldString, newString, '', '', { context: context }]\n      const dd = createPatch(...args)\n      const outStr = Diff2Html.parse(dd, {\n        inputFormat: 'diff',\n        outputFormat: outputFormat,\n        drawFileList: drawFileList,\n        matching: 'lines',\n        renderNothingWhenEmpty: renderNothingWhenEmpty\n      })\n      const html = Diff2Html.html(outStr, {\n        inputFormat: 'json',\n        outputFormat: outputFormat,\n        drawFileList: drawFileList,\n        matching: 'lines',\n        renderNothingWhenEmpty: renderNothingWhenEmpty\n      })\n      return hljs(html)\n    }\n  }\n}\n</script>\n\n<style lang=\"postcss\">\n.hljs {\n  display: inline-block;\n  padding: 0;\n  background: transparent;\n  vertical-align: middle;\n  height: 17px;\n}\n\n.d2h-wrapper {\n  position: relative;\n}\n\n.d2h-wrapper .d2h-file-header {\n  display: none;\n}\n\n.d2h-wrapper .d2h-files-diff {\n  position: relative;\n}\n\n.d2h-wrapper .d2h-file-side-diff {\n  margin-bottom: -5px;\n}\n\n.d2h-wrapper .d2h-files-diff > .d2h-file-side-diff ~ .d2h-file-side-diff {\n  position: absolute;\n}\n\n.d2h-wrapper .d2h-code-side-emptyplaceholder {\n  max-height: 19px;\n}\n\n.d2h-wrapper .d2h-code-side-line,\n.d2h-wrapper .d2h-code-line {\n  display: block;\n  width: auto;\n}\n\n.d2h-wrapper .d2h-code-side-line.d2h-info {\n  height: 18px;\n}\n\n.d2h-wrapper .d2h-code-linenumber,\n.d2h-code-side-linenumber {\n  height: 19px;\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["Z"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7239:
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 4309:
/***/ (function(module) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ 8390:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 6801:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__6801__;

/***/ }),

/***/ 6918:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__6918__;

/***/ }),

/***/ 6872:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__6872__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ lib; }
});

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.9.1/node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(9329);
;// CONCATENATED MODULE: ./node_modules/.pnpm/vue-loader@15.9.6_63153c0995d7402effb965957e9f9dd9/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/.pnpm/vue-loader@15.9.6_63153c0995d7402effb965957e9f9dd9/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/code-diff/index.vue?vue&type=template&id=08d8f955&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "app" } }, [
    _c("div", {
      directives: [{ name: "highlight", rawName: "v-highlight" }],
      domProps: { innerHTML: _vm._s(_vm.html) }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true


;// CONCATENATED MODULE: ./src/lib/code-diff/index.vue?vue&type=template&id=08d8f955&

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.9.1/node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(1692);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.9.1/node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(907);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.9.1/node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(8289);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.9.1/node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(6366);
// EXTERNAL MODULE: external "diff"
var external_diff_ = __webpack_require__(6801);
// EXTERNAL MODULE: external "diff2html"
var external_diff2html_ = __webpack_require__(6918);
// EXTERNAL MODULE: external "highlight.js"
var external_highlight_js_ = __webpack_require__(6872);
var external_highlight_js_default = /*#__PURE__*/__webpack_require__.n(external_highlight_js_);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@2.0.0_webpack@5.24.4/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(8390);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@5.1.2_webpack@5.24.4/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/highlight.js@9.18.5/node_modules/highlight.js/styles/googlecode.css
var googlecode = __webpack_require__(4809);
;// CONCATENATED MODULE: ./node_modules/.pnpm/highlight.js@9.18.5/node_modules/highlight.js/styles/googlecode.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(googlecode/* default */.Z, options);



/* harmony default export */ var styles_googlecode = (googlecode/* default.locals */.Z.locals || {});
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@5.1.2_webpack@5.24.4/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/diff2html@3.3.1/node_modules/diff2html/bundles/css/diff2html.min.css
var diff2html_min = __webpack_require__(2189);
;// CONCATENATED MODULE: ./node_modules/.pnpm/diff2html@3.3.1/node_modules/diff2html/bundles/css/diff2html.min.css

            

var diff2html_min_options = {};

diff2html_min_options.insert = "head";
diff2html_min_options.singleton = false;

var diff2html_min_update = injectStylesIntoStyleTag_default()(diff2html_min/* default */.Z, diff2html_min_options);



/* harmony default export */ var css_diff2html_min = (diff2html_min/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./node_modules/.pnpm/babel-loader@8.2.2_40e1cddd39669110b7315b4c77f03327/node_modules/babel-loader/lib/index.js?cacheDirectory!./node_modules/.pnpm/vue-loader@15.9.6_63153c0995d7402effb965957e9f9dd9/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/code-diff/index.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//





/* harmony default export */ var code_diffvue_type_script_lang_js_ = ({
  name: 'CodeDiff',
  directives: {
    highlight: function highlight(el) {
      var blocks = el.querySelectorAll('code');
      blocks.forEach(function (block) {
        external_highlight_js_default().highlightBlock(block);
      });
    }
  },
  props: {
    oldString: {
      type: String,
      default: ''
    },
    newString: {
      type: String,
      default: ''
    },
    context: {
      type: Number,
      default: 5
    },
    outputFormat: {
      type: String,
      default: 'line-by-line'
    },
    drawFileList: {
      type: Boolean,
      defalut: false
    },
    renderNothingWhenEmpty: {
      type: Boolean,
      default: false
    },
    diffStyle: {
      type: String,
      default: 'word'
    },
    fileName: {
      type: String,
      default: ''
    },
    isShowNoChange: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    html: function html() {
      return this.createdHtml(this.oldString, this.newString, this.context, this.outputFormat, this.drawFileList, this.renderNothingWhenEmpty, this.fileName, this.isShowNoChange);
    }
  },
  methods: {
    createdHtml: function createdHtml(oldString, newString, context, outputFormat, drawFileList, renderNothingWhenEmpty, fileName, isShowNoChange) {
      function hljs(html) {
        return html.replace(/<span class="d2h-code-line-ctn">(.+?)<\/span>/g, '<span class="d2h-code-line-ctn"><code>$1</code></span>');
      }

      if (isShowNoChange) {
        oldString = 'File Without Change\tOldString: ======================== \n' + oldString;
        newString = 'File Without Change\tNewString: ======================== \n' + newString;
      }

      var args = [fileName, oldString, newString, '', '', {
        context: context
      }];
      var dd = external_diff_.createPatch.apply(void 0, args);
      var outStr = external_diff2html_.parse(dd, {
        inputFormat: 'diff',
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        matching: 'lines',
        renderNothingWhenEmpty: renderNothingWhenEmpty
      });
      var html = external_diff2html_.html(outStr, {
        inputFormat: 'json',
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        matching: 'lines',
        renderNothingWhenEmpty: renderNothingWhenEmpty
      });
      return hljs(html);
    }
  }
});
;// CONCATENATED MODULE: ./src/lib/code-diff/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var lib_code_diffvue_type_script_lang_js_ = (code_diffvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@5.1.2_webpack@5.24.4/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@15.9.6_63153c0995d7402effb965957e9f9dd9/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@4.2.0_postcss@8.2.8+webpack@5.24.4/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@15.9.6_63153c0995d7402effb965957e9f9dd9/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/code-diff/index.vue?vue&type=style&index=0&lang=postcss&
var code_diffvue_type_style_index_0_lang_postcss_ = __webpack_require__(5984);
;// CONCATENATED MODULE: ./node_modules/.pnpm/style-loader@2.0.0_webpack@5.24.4/node_modules/style-loader/dist/cjs.js!./node_modules/.pnpm/css-loader@5.1.2_webpack@5.24.4/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@15.9.6_63153c0995d7402effb965957e9f9dd9/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@4.2.0_postcss@8.2.8+webpack@5.24.4/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@15.9.6_63153c0995d7402effb965957e9f9dd9/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/code-diff/index.vue?vue&type=style&index=0&lang=postcss&

            

var code_diffvue_type_style_index_0_lang_postcss_options = {};

code_diffvue_type_style_index_0_lang_postcss_options.insert = "head";
code_diffvue_type_style_index_0_lang_postcss_options.singleton = false;

var code_diffvue_type_style_index_0_lang_postcss_update = injectStylesIntoStyleTag_default()(code_diffvue_type_style_index_0_lang_postcss_/* default */.Z, code_diffvue_type_style_index_0_lang_postcss_options);



/* harmony default export */ var lib_code_diffvue_type_style_index_0_lang_postcss_ = (code_diffvue_type_style_index_0_lang_postcss_/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/lib/code-diff/index.vue?vue&type=style&index=0&lang=postcss&

;// CONCATENATED MODULE: ./node_modules/.pnpm/vue-loader@15.9.6_63153c0995d7402effb965957e9f9dd9/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/lib/code-diff/index.vue



;


/* normalize component */

var component = normalizeComponent(
  lib_code_diffvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/lib/code-diff/index.vue"
/* harmony default export */ var code_diff = (component.exports);
;// CONCATENATED MODULE: ./src/lib/index.js


/* istanbul ignore next */

code_diff.install = function (Vue) {
  Vue.component(code_diff.name, code_diff);
};

/* harmony default export */ var lib = (code_diff);
}();
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vue-code-diff.js.map