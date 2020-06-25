(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && $elm$core$Maybe$isJust(options.defaultHighlighting))
		{
			lang = options.defaultHighlighting.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.tables,
		breaks: gfm && gfm.breaks,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Model$AniIn = {$: 'AniIn'};
var $author$project$Messages$AnimationPrepare = {$: 'AnimationPrepare'};
var $author$project$Model$Func = function (a) {
	return {$: 'Func', a: a};
};
var $author$project$Messages$GetViewport = function (a) {
	return {$: 'GetViewport', a: a};
};
var $author$project$Messages$Start0 = {$: 'Start0'};
var $author$project$Model$AniStop = {$: 'AniStop'};
var $author$project$Messages$AnimationPass = {$: 'AnimationPass'};
var $author$project$Model$Model = function (gameLevel) {
	return function (gameStatus) {
		return function (ball) {
			return function (paddle) {
				return function (bricks) {
					return function (state) {
						return function (canvas) {
							return function (size) {
								return function (clock) {
									return function (activeInput) {
										return function (animateState) {
											return function (god) {
												return function (finished) {
													return function (visualization) {
														return {activeInput: activeInput, animateState: animateState, ball: ball, bricks: bricks, canvas: canvas, clock: clock, finished: finished, gameLevel: gameLevel, gameStatus: gameStatus, god: god, paddle: paddle, size: size, state: state, visualization: visualization};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Tools$dummyModel = $author$project$Model$Model($author$project$Messages$Start0)($author$project$Messages$AnimationPass)(_List_Nil)(_List_Nil)(_List_Nil)(_List_Nil)(
	{h: 0, w: 0})(
	_Utils_Tuple2(0, 0))(0)(true)($author$project$Model$AniStop)(false)(0)(
	A2($elm$html$Html$div, _List_Nil, _List_Nil));
var $author$project$Tools$dummyState = {
	_function: $author$project$Model$Func(
		F2(
			function (m, _v0) {
				return m;
			})),
	loop: false,
	name: 'dummy',
	t: 0,
	value: 0
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Tools$divState = F2(
	function (states, name) {
		var _v0 = A2(
			$elm$core$List$partition,
			function (s) {
				return _Utils_eq(s.name, name);
			},
			states);
		var state_ = _v0.a;
		var lst = _v0.b;
		var state = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Tools$dummyState,
			$elm$core$List$head(state_));
		return _Utils_Tuple2(state, lst);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Fade$genFadeIn = F3(
	function (_break, interval, speedAdjust) {
		var fadeIn_ = F2(
			function (model, t_) {
				var val = (_Utils_cmp(t_, _break) < 0) ? 0 : (((_Utils_cmp(t_, _break) > -1) && (_Utils_cmp(t_, _break + interval) < 1)) ? ((t_ - _break) / interval) : 1);
				var _v0 = A2($author$project$Tools$divState, model.state, 'fadeIn');
				var s_ = _v0.a;
				var state_ = _v0.b;
				var state = function () {
					var _v1 = t_ > 1;
					if (!_v1) {
						return A2(
							$elm$core$List$cons,
							_Utils_update(
								s_,
								{t: s_.t + speedAdjust, value: val}),
							state_);
					} else {
						return state_;
					}
				}();
				return _Utils_update(
					model,
					{state: state});
			});
		return fadeIn_;
	});
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Messages$AnimationPreparePost = {$: 'AnimationPreparePost'};
var $author$project$Messages$Lose = {$: 'Lose'};
var $author$project$Messages$Paused = {$: 'Paused'};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$audio = _VirtualDom_node('audio');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$autoplay = $elm$html$Html$Attributes$boolProperty('autoplay');
var $author$project$Model$Color = function (a) {
	return {$: 'Color', a: a};
};
var $author$project$Model$rgb = F3(
	function (red, green, blue) {
		return $author$project$Model$Color(
			{blue: blue, green: green, red: red});
	});
var $author$project$Start0$View$backgroundColor = A3($author$project$Model$rgb, 0, 0, 0);
var $author$project$Model$colorToString = function (_v0) {
	var red = _v0.a.red;
	var green = _v0.a.green;
	var blue = _v0.a.blue;
	return 'rgb(' + ($elm$core$String$fromInt(red) + (',' + ($elm$core$String$fromInt(green) + (',' + ($elm$core$String$fromInt(blue) + ')')))));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Start0$View$genFadeInAndOut = function (t) {
	return (t < 0.3) ? (t / 0.3) : (((t >= 0.3) && (t <= 0.7)) ? 1 : ((1.0 - t) / 0.3));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Tools$getState = F2(
	function (states, name) {
		var state_ = A2(
			$elm$core$List$filter,
			function (s) {
				return _Utils_eq(s.name, name);
			},
			states);
		var state = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Tools$dummyState,
			$elm$core$List$head(state_));
		return state;
	});
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$loop = $elm$html$Html$Attributes$boolProperty('loop');
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$html$Html$Attributes$preload = $elm$html$Html$Attributes$stringProperty('preload');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$Attributes$align = $elm$html$Html$Attributes$stringProperty('align');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm_explorations$markdown$Markdown$defaultOptions = {
	defaultHighlighting: $elm$core$Maybe$Nothing,
	githubFlavored: $elm$core$Maybe$Just(
		{breaks: false, tables: false}),
	sanitize: true,
	smartypants: false
};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var $elm_explorations$markdown$Markdown$toHtml = $elm_explorations$markdown$Markdown$toHtmlWith($elm_explorations$markdown$Markdown$defaultOptions);
var $author$project$Start0$View$visualizeHelp = function (model) {
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'Paused':
				return 1;
			case 'AnimationPreparePost':
				return 1 - A2($author$project$Tools$getState, model.state, 'fadeOut').t;
			default:
				return 0;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString($author$project$Start0$View$backgroundColor)),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				_Utils_eq(model.gameStatus, $author$project$Messages$Paused) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '30%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
						$elm$html$Html$Attributes$align('center')
					]),
				_List_fromArray(
					[
						A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, '\r\n[←] [→] for game-control.\r\n\r\n[ Space ] for next page.\r\n\r\n[ R ] estart a level or simply [ S ] kip it.\r\n\r\n[ G ] od awaits if you just want to relax.\r\n')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '90%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
						A2($elm$html$Html$Attributes$style, 'color', '#b7e5d9'),
						$elm$html$Html$Attributes$align('center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Cattubene')
					]))
			]));
};
var $author$project$Messages$ChooseLevel = function (a) {
	return {$: 'ChooseLevel', a: a};
};
var $author$project$Messages$Prepare = {$: 'Prepare'};
var $author$project$Messages$ShowStatus = function (a) {
	return {$: 'ShowStatus', a: a};
};
var $author$project$Messages$Strangers1 = {$: 'Strangers1'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Start0$View$visualizeMenu = function (model) {
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeIn').t;
			case 'Prepare':
				return 1;
			default:
				return 0;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString($author$project$Start0$View$backgroundColor)),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$AnimationPreparePost])) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('help'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'outline', 'none'),
						A2($elm$html$Html$Attributes$style, 'left', '47%'),
						A2($elm$html$Html$Attributes$style, 'width', '6%'),
						A2($elm$html$Html$Attributes$style, 'top', '70%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid #000000'),
						A2($elm$html$Html$Attributes$style, 'color', '#ffffff'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Model$colorToString($author$project$Start0$View$backgroundColor)),
						A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
						$elm$html$Html$Events$onClick(
						$author$project$Messages$ShowStatus($author$project$Messages$Paused))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Help')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '90%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
						A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
						A2($elm$html$Html$Attributes$style, 'color', '#b7e5d9'),
						$elm$html$Html$Attributes$align('center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Powered by Cattubene')
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('Duality'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'outline', 'none'),
						A2($elm$html$Html$Attributes$style, 'top', '32%'),
						A2($elm$html$Html$Attributes$style, 'left', '40%'),
						A2($elm$html$Html$Attributes$style, 'align', 'center'),
						A2($elm$html$Html$Attributes$style, 'width', '20%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '72px'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Model$colorToString($author$project$Start0$View$backgroundColor)),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid #000000'),
						A2($elm$html$Html$Attributes$style, 'color', '#ffffff'),
						$elm$html$Html$Events$onClick(
						$author$project$Messages$ChooseLevel($author$project$Messages$Strangers1)),
						A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Duality')
					]))
			]));
};
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$Start0$View$visualize = function (model) {
	var len = 700;
	var _v0 = model.size;
	var w = _v0.a;
	var h = _v0.b;
	var r = ((w / h) > 1) ? A2($elm$core$Basics$min, 1, h / len) : A2($elm$core$Basics$min, 1, w / len);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Model$colorToString($author$project$Start0$View$backgroundColor))
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('icon.png'),
							$elm$html$Html$Attributes$width(len),
							$elm$html$Html$Attributes$height(len),
							A2($elm$html$Html$Attributes$style, 'position', 'relative'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat((h - (len * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat((w - (len * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(
								$author$project$Start0$View$genFadeInAndOut(
									A2($author$project$Tools$getState, model.state, 'fadeInAndOut').t))),
							$elm$html$Html$Attributes$alt('Network Failure')
						]),
					_List_Nil),
					A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$Paused, $author$project$Messages$AnimationPreparePost])) ? $author$project$Start0$View$visualizeHelp(model) : $author$project$Start0$View$visualizeMenu(model)
				]),
			(!A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$Lose]))) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('audio0'),
							$elm$html$Html$Attributes$src('Start - For River - Piano (Johnny\'s Version).mp3'),
							$elm$html$Html$Attributes$autoplay(true),
							$elm$html$Html$Attributes$preload('True'),
							$elm$html$Html$Attributes$loop(true)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Start0$Init$init = function () {
	var state = _List_fromArray(
		[
			{
			_function: $author$project$Model$Func(
				F2(
					function (m, _v0) {
						return m;
					})),
			loop: false,
			name: 'fadeInAndOut',
			t: 0,
			value: 0
		},
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeIn, 0, 0.4, 0)),
			loop: false,
			name: 'fadeIn',
			t: -1,
			value: 0
		}
		]);
	var canvas = {h: 600, w: 400};
	var model = _Utils_update(
		$author$project$Tools$dummyModel,
		{
			activeInput: true,
			animateState: $author$project$Model$AniIn,
			ball: _List_Nil,
			bricks: _List_Nil,
			canvas: canvas,
			clock: 0,
			gameLevel: $author$project$Messages$Start0,
			gameStatus: $author$project$Messages$AnimationPrepare,
			paddle: _List_Nil,
			size: _Utils_Tuple2(canvas.w, canvas.h),
			state: state
		});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				visualization: $author$project$Start0$View$visualize(model)
			}),
		A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
}();
var $author$project$Main$init = $author$project$Start0$Init$init;
var $author$project$Messages$Resize = F2(
	function (a, b) {
		return {$: 'Resize', a: a, b: b};
	});
var $author$project$Messages$Tick = function (a) {
	return {$: 'Tick', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$html$Html$Events$keyCode = A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int);
var $author$project$Messages$KeyDown = function (a) {
	return {$: 'KeyDown', a: a};
};
var $author$project$Messages$Key_D = {$: 'Key_D'};
var $author$project$Messages$Key_G = {$: 'Key_G'};
var $author$project$Messages$Key_Left = {$: 'Key_Left'};
var $author$project$Messages$Key_R = {$: 'Key_R'};
var $author$project$Messages$Key_Right = {$: 'Key_Right'};
var $author$project$Messages$Key_S = {$: 'Key_S'};
var $author$project$Messages$NoOp = {$: 'NoOp'};
var $author$project$Messages$Space = {$: 'Space'};
var $author$project$Subscriptions$keyDown = function (key_code) {
	switch (key_code) {
		case 37:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_Left);
		case 39:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_Right);
		case 32:
			return $author$project$Messages$KeyDown($author$project$Messages$Space);
		case 68:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_D);
		case 71:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_G);
		case 82:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_R);
		case 83:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_S);
		default:
			return $author$project$Messages$NoOp;
	}
};
var $author$project$Messages$KeyUp = function (a) {
	return {$: 'KeyUp', a: a};
};
var $author$project$Subscriptions$keyUp = function (key_code) {
	switch (key_code) {
		case 37:
			return $author$project$Messages$KeyUp($author$project$Messages$Key_Left);
		case 39:
			return $author$project$Messages$KeyUp($author$project$Messages$Key_Right);
		default:
			return $author$project$Messages$NoOp;
	}
};
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrameDelta = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Delta(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrameDelta = $elm$browser$Browser$AnimationManager$onAnimationFrameDelta;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Subscriptions$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				function () {
				var _v0 = model.gameStatus;
				switch (_v0.$) {
					case 'Running':
						return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
					case 'ChangeLevel':
						return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
					case 'AnimationPrepare':
						return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
					case 'AnimationPreparePost':
						return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
					case 'AnimationPass':
						return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
					case 'Pass':
						return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
					case 'AnimationEnd':
						return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
					default:
						return $elm$core$Platform$Sub$none;
				}
			}(),
				$elm$browser$Browser$Events$onKeyUp(
				A2($elm$json$Json$Decode$map, $author$project$Subscriptions$keyUp, $elm$html$Html$Events$keyCode)),
				$elm$browser$Browser$Events$onKeyDown(
				A2($elm$json$Json$Decode$map, $author$project$Subscriptions$keyDown, $elm$html$Html$Events$keyCode)),
				$elm$browser$Browser$Events$onResize($author$project$Messages$Resize)
			]));
};
var $author$project$Messages$AnimationEnd = {$: 'AnimationEnd'};
var $author$project$Messages$Companions5 = {$: 'Companions5'};
var $author$project$Messages$Death6 = {$: 'Death6'};
var $author$project$Messages$End = {$: 'End'};
var $author$project$Messages$End7 = {$: 'End7'};
var $author$project$Messages$Friends2 = {$: 'Friends2'};
var $author$project$Messages$Lovers3 = {$: 'Lovers3'};
var $author$project$Messages$Pass = {$: 'Pass'};
var $author$project$Messages$Strangers4 = {$: 'Strangers4'};
var $author$project$Messages$ChangeLevel = {$: 'ChangeLevel'};
var $author$project$Tools$nextLevel = function (model) {
	var next = function () {
		var _v0 = model.gameLevel;
		switch (_v0.$) {
			case 'Start0':
				return $author$project$Messages$Strangers1;
			case 'Strangers1':
				return $author$project$Messages$Friends2;
			case 'Friends2':
				return $author$project$Messages$Lovers3;
			case 'Lovers3':
				return $author$project$Messages$Strangers4;
			case 'Strangers4':
				return $author$project$Messages$Companions5;
			case 'Companions5':
				return $author$project$Messages$Death6;
			case 'Death6':
				return $author$project$Messages$End7;
			default:
				return $author$project$Messages$Start0;
		}
	}();
	return _Utils_update(
		model,
		{gameLevel: next, gameStatus: $author$project$Messages$ChangeLevel});
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Model$Brick = F5(
	function (pos, collision, block, hitTime, color) {
		return {block: block, collision: collision, color: color, hitTime: hitTime, pos: pos};
	});
var $author$project$Model$Hit = function (a) {
	return {$: 'Hit', a: a};
};
var $author$project$Model$Point = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Basics$cos = _Basics_cos;
var $author$project$Model$Block = F2(
	function (lt, rb) {
		return {lt: lt, rb: rb};
	});
var $author$project$Tools$dummyPoint = A2($author$project$Model$Point, 0, 0);
var $author$project$Tools$dummyBlock = A2($author$project$Model$Block, $author$project$Tools$dummyPoint, $author$project$Tools$dummyPoint);
var $author$project$Fade$genFadeInSub = F3(
	function (_break, interval, speedAdjust) {
		var fadeIn_ = F2(
			function (model, t_) {
				var val = (_Utils_cmp(t_, _break) < 0) ? 0 : (((_Utils_cmp(t_, _break) > -1) && (_Utils_cmp(t_, _break + interval) < 1)) ? ((t_ - _break) / interval) : 1);
				var _v0 = A2($author$project$Tools$divState, model.state, 'fadeInSub');
				var s_ = _v0.a;
				var state_ = _v0.b;
				var state = function () {
					var _v1 = t_ > 1;
					if (!_v1) {
						return A2(
							$elm$core$List$cons,
							_Utils_update(
								s_,
								{t: s_.t + speedAdjust, value: val}),
							state_);
					} else {
						return state_;
					}
				}();
				return _Utils_update(
					model,
					{state: state});
			});
		return fadeIn_;
	});
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$Tools$getBallColl = function (_v0) {
	var pos = _v0.a;
	var r = _v0.b;
	var precision = _v0.c;
	var angle = A2(
		$elm$core$List$map,
		function (x) {
			return ((x / precision) * 2) * $elm$core$Basics$pi;
		},
		A2($elm$core$List$range, 0, precision - 1));
	var points = A2(
		$elm$core$List$map,
		function (t) {
			return A2(
				$author$project$Model$Point,
				pos.x + (r * $elm$core$Basics$cos(t)),
				pos.y + (r * $elm$core$Basics$sin(t)));
		},
		angle);
	return points;
};
var $author$project$Tools$pos2block = F2(
	function (pos, object) {
		var y = pos.y;
		var x = pos.x;
		var w = object.w / 2;
		var h = object.h / 2;
		return A2(
			$author$project$Model$Block,
			A2($author$project$Model$Point, x - w, y - h),
			A2($author$project$Model$Point, x + w, y + h));
	});
var $author$project$Tools$pos2coll = F2(
	function (pos, object) {
		var y = pos.y;
		var x = pos.x;
		var w = object.w / 2;
		var h = object.h / 2;
		return _List_fromArray(
			[
				A2($author$project$Model$Point, x + w, y + h),
				A2($author$project$Model$Point, x - w, y + h),
				A2($author$project$Model$Point, x - w, y - h),
				A2($author$project$Model$Point, x + w, y - h)
			]);
	});
var $author$project$Companions5$View$backgroundColor = A3($author$project$Model$rgb, 138, 182, 165);
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$Basics$round = _Basics_round;
var $author$project$Bezier$bezierColor = F2(
	function (_v0, _v1) {
		var startInt = _v0.a;
		var endInt = _v1.a;
		var newPoint = F3(
			function (a, pa, pb) {
				return {blue: (a * pa.blue) + ((1 - a) * pb.blue), green: (a * pa.green) + ((1 - a) * pb.green), red: (a * pa.red) + ((1 - a) * pb.red)};
			});
		var intToFloat = function (_int) {
			return {blue: _int.blue, green: _int.green, red: _int.red};
		};
		var start = intToFloat(startInt);
		var end = intToFloat(endInt);
		var mid1 = A3(newPoint, 4 / 5, start, end);
		var mid2 = A3(newPoint, 1 / 5, start, end);
		var curve = function (time) {
			var now = 1 - time;
			return A3(
				$author$project$Model$rgb,
				$elm$core$Basics$round(
					(((start.red * A2($elm$core$Basics$pow, now, 3)) + (((3 * mid1.red) * time) * A2($elm$core$Basics$pow, now, 2))) + (((3 * mid2.red) * now) * A2($elm$core$Basics$pow, time, 2))) + (end.red * A2($elm$core$Basics$pow, time, 3))),
				$elm$core$Basics$round(
					(((start.green * A2($elm$core$Basics$pow, now, 3)) + (((3 * mid1.green) * time) * A2($elm$core$Basics$pow, now, 2))) + (((3 * mid2.green) * now) * A2($elm$core$Basics$pow, time, 2))) + (end.green * A2($elm$core$Basics$pow, time, 3))),
				$elm$core$Basics$round(
					(((start.blue * A2($elm$core$Basics$pow, now, 3)) + (((3 * mid1.blue) * time) * A2($elm$core$Basics$pow, now, 2))) + (((3 * mid2.blue) * now) * A2($elm$core$Basics$pow, time, 2))) + (end.blue * A2($elm$core$Basics$pow, time, 3))));
		};
		return curve;
	});
var $author$project$Companions5$View$backgroundColor_ = function (model) {
	var state = $elm$core$List$isEmpty(model.state) ? _Utils_update(
		$author$project$Tools$dummyState,
		{t: 1}) : A2($author$project$Tools$getState, model.state, 'fadeIn');
	var color = A3(
		$author$project$Bezier$bezierColor,
		A3($author$project$Model$rgb, 177, 177, 177),
		$author$project$Companions5$View$backgroundColor,
		state.t);
	return _Utils_eq(model.gameStatus, $author$project$Messages$AnimationPrepare) ? color : $author$project$Companions5$View$backgroundColor;
};
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $author$project$BasicView$visualizeMenu = function (model) {
	var level = function () {
		var _v0 = model.gameLevel;
		switch (_v0.$) {
			case 'Start0':
				return 0;
			case 'Strangers1':
				return 1;
			case 'Friends2':
				return 2;
			case 'Lovers3':
				return 3;
			case 'Strangers4':
				return 4;
			case 'Companions5':
				return 5;
			case 'Death6':
				return 6;
			default:
				return 7;
		}
	}();
	var hiding = function (bool) {
		return bool ? '0' : '1';
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2($elm$html$Html$Attributes$style, 'opacity', '1'),
				A2($elm$html$Html$Attributes$style, 'display', 'inline')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'text-align', 'center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('toStart0'),
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel($author$project$Messages$Start0)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(level < 0)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(!level)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Start')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('toStranger1'),
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel($author$project$Messages$Strangers1)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(level < 1)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 1)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Strangers')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('toFriends2'),
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel($author$project$Messages$Friends2)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(level < 2)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 2)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Friends')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('toLovers3'),
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel($author$project$Messages$Lovers3)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(level < 3)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 3)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Lovers')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Strangers4'),
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel($author$project$Messages$Strangers4)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(level < 4)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 4)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Strangers II')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('toCompanions5'),
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel($author$project$Messages$Companions5)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(level < 5)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 5)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Companions')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('toDeath6'),
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel($author$project$Messages$Death6)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(level < 6)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 6)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Death')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$KeyDown($author$project$Messages$Key_S)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(false)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(false)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Skip')
							]))
					]))
			]));
};
var $author$project$BasicView$visualizeBlock = function (model) {
	var alpha = function () {
		var _v2 = model.gameStatus;
		switch (_v2.$) {
			case 'Paused':
				return '0.7';
			case 'Lose':
				return '1';
			default:
				return '0';
		}
	}();
	var _v0 = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Paused':
				return _Utils_Tuple2('Paused', 'Press Space to continue');
			case 'Lose':
				return _Utils_Tuple2('... The orb of life was smashed ...', 'Press R to revisit');
			default:
				return _Utils_Tuple2('', '');
		}
	}();
	var status = _v0.a;
	var description = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString(
					A3($author$project$Model$rgb, 40, 40, 40))),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'opacity', alpha),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$Paused, $author$project$Messages$Lose])) ? 'inline' : 'none')
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'left', '0'),
							A2($elm$html$Html$Attributes$style, 'top', '55%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'color', '#AAAAAA')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(description)
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'left', '0'),
							A2($elm$html$Html$Attributes$style, 'top', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '40px'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(status)
						])),
					$author$project$BasicView$visualizeMenu(model)
				]),
			_Utils_eq(model.gameStatus, $author$project$Messages$Lose) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('Lose - Too Bad So Sad.mp3'),
							$elm$html$Html$Attributes$id('audioLose'),
							$elm$html$Html$Attributes$loop(false),
							$elm$html$Html$Attributes$autoplay(true)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Tools$dummyColor = A3($author$project$Model$rgb, 0, 0, 0);
var $author$project$Tools$dummyPoly = _List_Nil;
var $author$project$Tools$dummyBall = function () {
	var v = $author$project$Tools$dummyPoint;
	var r = 0;
	var pos = $author$project$Tools$dummyPoint;
	return {active: false, collision: $author$project$Tools$dummyPoly, color: $author$project$Tools$dummyColor, pos: pos, r: r, v: v};
}();
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $author$project$Model$Paddle = F7(
	function (pos, collision, block, color, r, h, angle) {
		return {angle: angle, block: block, collision: collision, color: color, h: h, pos: pos, r: r};
	});
var $author$project$Tools$dummyPaddle = A7($author$project$Model$Paddle, $author$project$Tools$dummyPoint, $author$project$Tools$dummyPoly, $author$project$Tools$dummyBlock, $author$project$Tools$dummyColor, 0, 0, 0);
var $author$project$Tools$getPaddle = F2(
	function (lst, n) {
		getPaddle:
		while (true) {
			if (n === 1) {
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Tools$dummyPaddle,
					$elm$core$List$head(lst));
			} else {
				var $temp$lst = A2($elm$core$List$drop, 1, lst),
					$temp$n = n - 1;
				lst = $temp$lst;
				n = $temp$n;
				continue getPaddle;
			}
		}
	});
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$feGaussianBlur = $elm$svg$Svg$trustedNode('feGaussianBlur');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$filter = $elm$svg$Svg$trustedNode('filter');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$Attributes$in_ = _VirtualDom_attribute('in');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$stdDeviation = _VirtualDom_attribute('stdDeviation');
var $author$project$Companions5$View$visualizeBall = function (ball) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('4')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('3')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(ball.color))
					]),
				_List_Nil)
			]));
};
var $author$project$Companions5$View$changeBrickColor = function (brick) {
	var _v0 = brick.hitTime;
	if ((_v0.$ === 'Hit') && (!_v0.a)) {
		return brick.color;
	} else {
		return $author$project$Companions5$View$backgroundColor;
	}
};
var $elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $author$project$Model$pointToString = function (point) {
	return $elm$core$String$fromFloat(point.x) + (', ' + $elm$core$String$fromFloat(point.y));
};
var $author$project$Model$polyToString = function (poly) {
	return A2(
		$elm$core$String$join,
		' ',
		A2($elm$core$List$map, $author$project$Model$pointToString, poly));
};
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $author$project$Companions5$View$visualizeBrick = function (brick) {
	var alpha = function () {
		var _v0 = brick.hitTime;
		if ((_v0.$ === 'Hit') && (!_v0.a)) {
			return '1';
		} else {
			return '0';
		}
	}();
	return A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points(
				$author$project$Model$polyToString(brick.collision)),
				$elm$svg$Svg$Attributes$fill(
				$author$project$Model$colorToString(
					$author$project$Companions5$View$changeBrickColor(brick))),
				$elm$svg$Svg$Attributes$opacity(alpha)
			]),
		_List_Nil);
};
var $elm$svg$Svg$Attributes$filter = _VirtualDom_attribute('filter');
var $author$project$Companions5$View$visualizeCanvas = function (model) {
	var rt = A2($author$project$Model$Point, model.canvas.w, 0);
	var rb = A2($author$project$Model$Point, model.canvas.w, model.canvas.h);
	var lt = A2($author$project$Model$Point, 0, 0);
	var lb = A2($author$project$Model$Point, 0, model.canvas.h);
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('15')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('10')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 255, 255, 255))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString($author$project$Companions5$View$backgroundColor)),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur_in1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil)
			]));
};
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $author$project$Companions5$View$visualizePaddle = function (paddle) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(paddle.color))
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fillOpacity('0'),
						$elm$svg$Svg$Attributes$stroke(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromFloat(paddle.h))
					]),
				_List_Nil)
			]));
};
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$Companions5$View$visualizeGame = F2(
	function (model, opacity) {
		var elements = A2(
			$elm$core$List$cons,
			$author$project$Companions5$View$visualizeCanvas(model),
			A2(
				$elm$core$List$cons,
				$author$project$Companions5$View$visualizePaddle(
					A2($author$project$Tools$getPaddle, model.paddle, 2)),
				A2(
					$elm$core$List$cons,
					$author$project$Companions5$View$visualizePaddle(
						A2($author$project$Tools$getPaddle, model.paddle, 1)),
					_Utils_ap(
						A2($elm$core$List$map, $author$project$Companions5$View$visualizeBrick, model.bricks),
						_Utils_ap(
							A2($elm$core$List$map, $author$project$Companions5$View$visualizeBall, model.ball),
							A2(
								$elm$core$List$map,
								$author$project$Companions5$View$visualizeBall,
								A2(
									$elm$core$Maybe$withDefault,
									_List_fromArray(
										[$author$project$Tools$dummyBall]),
									$elm$core$List$tail(model.ball))))))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'opacity', opacity)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$version('1.1'),
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y('0'),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromFloat(model.canvas.w) + (' ' + $elm$core$String$fromFloat(model.canvas.h))))
						]),
					elements)
				]));
	});
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$html$Html$i = _VirtualDom_node('i');
var $author$project$Companions5$View$visualizePrepare = function (model) {
	var alphaSub = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeInSub').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeIn').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString(
					$author$project$Companions5$View$backgroundColor_(model))),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$AnimationPreparePost])) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '55%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(alphaSub)),
						A2($elm$html$Html$Attributes$style, 'line-height', '40px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('- Together?'),
						A2($elm$html$Html$br, _List_Nil, _List_Nil),
						$elm$html$Html$text('- Together.'),
						A2($elm$html$Html$br, _List_Nil, _List_Nil),
						A2(
						$elm$html$Html$i,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'color', '#9fece0')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('You\'ll never know how much I want to be with you. ')
							])),
						A2($elm$html$Html$br, _List_Nil, _List_Nil),
						A2(
						$elm$html$Html$i,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'color', '#ECE29F')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('And how much I did in order to. ')
							]))
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '30%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '48px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Companions')
					]))
			]));
};
var $author$project$Companions5$View$visualize = function (model) {
	var alpha = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Prepare':
				return '1';
			case 'Running':
				return '1';
			case 'Paused':
				return '1';
			case 'AnimationPass':
				return $elm$core$String$fromFloat(
					A2($author$project$Tools$getState, model.state, 'fadeOut').value);
			case 'Pass':
				return '1';
			default:
				return '0';
		}
	}();
	var _v0 = model.size;
	var w = _v0.a;
	var h = _v0.b;
	var r = (_Utils_cmp(w / h, model.canvas.w / model.canvas.h) > 0) ? A2($elm$core$Basics$min, 1, h / model.canvas.h) : A2($elm$core$Basics$min, 1, w / model.canvas.w);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Model$colorToString(
					$author$project$Companions5$View$backgroundColor_(model)))
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromFloat(model.canvas.w) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'height',
							$elm$core$String$fromFloat(model.canvas.h) + 'px'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat((w - (model.canvas.w * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat((h - (model.canvas.h * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Companions5$View$backgroundColor_(model)))
						]),
					_List_fromArray(
						[
							A2($author$project$Companions5$View$visualizeGame, model, alpha)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Companions5$View$backgroundColor_(model))),
							A2($elm$html$Html$Attributes$style, 'background-position', 'center')
						]),
					_List_fromArray(
						[
							$author$project$Companions5$View$visualizePrepare(model),
							$author$project$BasicView$visualizeBlock(model)
						]))
				]),
			(!A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$Lose, $author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare]))) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('Companions - Having Lived.mp3'),
							$elm$html$Html$Attributes$id('audio5'),
							$elm$html$Html$Attributes$autoplay(true),
							$elm$html$Html$Attributes$preload('True'),
							$elm$html$Html$Attributes$loop(true)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Companions5$Init$init = function () {
	var state = _List_fromArray(
		[
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeIn, 0, 0.4, 0)),
			loop: false,
			name: 'fadeIn',
			t: 0,
			value: 0
		},
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeInSub, 0.5, 0.5, 0)),
			loop: false,
			name: 'fadeInSub',
			t: 0,
			value: 0
		}
		]);
	var canvas = {h: 700, w: 550};
	var paddle = function () {
		var r = 60;
		var h = 3;
		var angle = (40 * $elm$core$Basics$pi) / 180;
		var pos = A2(
			$author$project$Model$Point,
			canvas.w / 2,
			((canvas.h + (r * $elm$core$Basics$cos(angle))) - 5) - r);
		var getPaddleColl_ = function (precision) {
			var pre = precision;
			var unit = (2 * $elm$core$Basics$pi) / pre;
			var iter = A2($elm$core$List$range, 0, precision - 1);
			return A2(
				$elm$core$List$map,
				function (t) {
					return A2(
						$author$project$Model$Point,
						pos.x + (r * $elm$core$Basics$sin(unit * t)),
						pos.y + (r * $elm$core$Basics$cos(unit * t)));
				},
				iter);
		};
		return {
			angle: angle,
			block: $author$project$Tools$dummyBlock,
			collision: $elm$core$List$reverse(
				getPaddleColl_(48)),
			color: A3($author$project$Model$rgb, 66, 150, 240),
			h: h,
			pos: pos,
			r: r
		};
	}();
	var paddle2 = function () {
		var reflect = function (p) {
			return A2($author$project$Model$Point, canvas.w - p.x, canvas.h - p.y);
		};
		var pos_ = paddle.pos;
		return _Utils_update(
			paddle,
			{
				collision: A2($elm$core$List$map, reflect, paddle.collision),
				color: A3($author$project$Model$rgb, 250, 200, 50),
				pos: reflect(pos_)
			});
	}();
	var bricksize = {h: 39, w: 39};
	var bricks = function () {
		var valid = function (a) {
			return $elm$core$Basics$abs(a) > 2;
		};
		var newBricks_ = function (info) {
			var positionConvert = F3(
				function (len, unit, orientation) {
					var ori = function () {
						if (orientation) {
							return $elm$core$List$filter(
								function (x) {
									return valid(x);
								});
						} else {
							return $elm$core$Basics$identity;
						}
					}();
					return A2(
						$elm$core$List$map,
						function (x) {
							return x * unit;
						},
						ori(
							A2(
								$elm$core$List$map,
								function (x) {
									return (x - 0.5) - (len / 2);
								},
								A2(
									$elm$core$List$map,
									$elm$core$Basics$toFloat,
									A2($elm$core$List$range, 1, len)))));
				});
			var posBrickY = A2(
				$elm$core$List$map,
				function (y) {
					return (y + (info.canvas.h / 2)) + info.offset.y;
				},
				A3(positionConvert, info.layout.y, info.brick.h + info.breath, false));
			var posBrickX = A2(
				$elm$core$List$map,
				function (x) {
					return (x + (info.canvas.w / 2)) + info.offset.x;
				},
				A3(positionConvert, info.layout.x, info.brick.w + info.breath, true));
			var posBricks = A2(
				$elm$core$List$concatMap,
				function (x) {
					return A2(
						$elm$core$List$map,
						$author$project$Model$Point(x),
						posBrickY);
				},
				posBrickX);
			return A2(
				$elm$core$List$map,
				function (pos) {
					return A5(
						$author$project$Model$Brick,
						pos,
						A2($author$project$Tools$pos2coll, pos, info.brick),
						A2($author$project$Tools$pos2block, pos, info.brick),
						$author$project$Model$Hit(0),
						info.color);
				},
				posBricks);
		};
		var brickInfo = {
			breath: 10,
			brick: bricksize,
			canvas: canvas,
			color: A3($author$project$Model$rgb, 255, 255, 255),
			layout: {x: 10, y: 7},
			offset: A2($author$project$Model$Point, 0, 0)
		};
		return newBricks_(brickInfo);
	}();
	var ball = function () {
		var v = A2($author$project$Model$Point, 3.0, -3.0);
		var r = 15;
		var pos = A2($author$project$Model$Point, canvas.w / 2, ((paddle.pos.y - paddle.r) - paddle.h) - r);
		return {
			active: true,
			collision: $author$project$Tools$getBallColl(
				_Utils_Tuple3(pos, r, 32)),
			color: A3($author$project$Model$rgb, 244, 241, 187),
			pos: pos,
			r: r,
			v: v
		};
	}();
	var model = _Utils_update(
		$author$project$Tools$dummyModel,
		{
			activeInput: true,
			animateState: $author$project$Model$AniIn,
			ball: _List_fromArray(
				[ball]),
			bricks: bricks,
			canvas: canvas,
			clock: 0,
			gameLevel: $author$project$Messages$Companions5,
			gameStatus: $author$project$Messages$AnimationPrepare,
			paddle: _List_fromArray(
				[paddle, paddle2]),
			size: _Utils_Tuple2(canvas.w, canvas.h),
			state: state
		});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				visualization: $author$project$Companions5$View$visualize(model)
			}),
		A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
}();
var $author$project$Tools$getPaddleColl = F5(
	function (pos, r, h, angle, precision) {
		var surfaceR = (r + h) + 5;
		var rulerAngle = angle + 1.2;
		var pos_ = A2($author$project$Model$Point, pos.x, pos.y + 5);
		var toPoints = function (t) {
			return A2(
				$author$project$Model$Point,
				pos_.x + (surfaceR * $elm$core$Basics$sin(rulerAngle * t)),
				pos_.y - (surfaceR * $elm$core$Basics$cos(rulerAngle * t)));
		};
		var length = precision - 1;
		var points = A2(
			$elm$core$List$map,
			function (x) {
				return (x - (length / 2)) / length;
			},
			A2($elm$core$List$range, 0, precision - 1));
		return A2($elm$core$List$map, toPoints, points);
	});
var $author$project$Death6$View$backgroundColor = A3($author$project$Model$rgb, 72, 65, 60);
var $author$project$Death6$View$backgroundColor_ = function (model) {
	var state = $elm$core$List$isEmpty(model.state) ? _Utils_update(
		$author$project$Tools$dummyState,
		{t: 1}) : A2($author$project$Tools$getState, model.state, 'fadeIn');
	var color = A3(
		$author$project$Bezier$bezierColor,
		A3($author$project$Model$rgb, 138, 182, 165),
		$author$project$Death6$View$backgroundColor,
		state.t);
	return _Utils_eq(model.gameStatus, $author$project$Messages$AnimationPrepare) ? color : $author$project$Death6$View$backgroundColor;
};
var $author$project$Death6$View$visualizeCanvas = function (model) {
	var rt = A2($author$project$Model$Point, model.canvas.w, 0);
	var rb = A2($author$project$Model$Point, model.canvas.w, model.canvas.h);
	var lt = A2($author$project$Model$Point, 0, 0);
	var lb = A2($author$project$Model$Point, 0, model.canvas.h);
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('15')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('10')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 255, 255, 255))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString($author$project$Death6$View$backgroundColor)),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur_in1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil)
			]));
};
var $author$project$Death6$View$visualizeCanvasDone = F2(
	function (model, opacity) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'opacity', opacity),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$version('1.1'),
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y('0'),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromFloat(model.canvas.w) + (' ' + $elm$core$String$fromFloat(model.canvas.h))))
						]),
					_List_fromArray(
						[
							$author$project$Death6$View$visualizeCanvas(model)
						]))
				]));
	});
var $author$project$Death6$View$visualizeEpitaph = function (model) {
	var displaying = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Running':
				return 'inline';
			case 'Paused':
				return 'inline';
			case 'Pass':
				return 'block';
			case 'AnimationPass':
				return 'block';
			case 'End':
				return 'block';
			case 'AnimationEnd':
				return 'block';
			default:
				return 'none';
		}
	}();
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'AnimationEnd':
				return $elm$core$List$isEmpty(model.state) ? '0' : ((!A2($author$project$Tools$getState, model.state, 'fadeOut').t) ? '1' : $elm$core$String$fromFloat(
					A2($author$project$Tools$getState, model.state, 'fadeOut').value));
			case 'AnimationPrepare':
				return '0';
			default:
				return '1';
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
				A2($elm$html$Html$Attributes$style, 'opacity', alpha),
				A2($elm$html$Html$Attributes$style, 'display', displaying),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2($elm$html$Html$Attributes$style, 'letter-spacing', '9px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '10%'),
						A2($elm$html$Html$Attributes$style, 'left', '10%'),
						A2($elm$html$Html$Attributes$style, 'width', '80%'),
						A2($elm$html$Html$Attributes$style, 'height', '20%'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'transparent')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Nay, ')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '19%'),
						A2($elm$html$Html$Attributes$style, 'left', '10%'),
						A2($elm$html$Html$Attributes$style, 'width', '80%'),
						A2($elm$html$Html$Attributes$style, 'height', '20%'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'transparent')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('if you read this line, ')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '28%'),
						A2($elm$html$Html$Attributes$style, 'left', '10%'),
						A2($elm$html$Html$Attributes$style, 'width', '80%'),
						A2($elm$html$Html$Attributes$style, 'height', '20%'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'transparent')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(' remember not')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '37%'),
						A2($elm$html$Html$Attributes$style, 'left', '10%'),
						A2($elm$html$Html$Attributes$style, 'width', '80%'),
						A2($elm$html$Html$Attributes$style, 'height', '20%'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'transparent')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('The hand that writ;')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '46%'),
						A2($elm$html$Html$Attributes$style, 'left', '10%'),
						A2($elm$html$Html$Attributes$style, 'width', '80%'),
						A2($elm$html$Html$Attributes$style, 'height', '20%'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'transparent')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('for I ')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '55%'),
						A2($elm$html$Html$Attributes$style, 'left', '54.5%'),
						A2($elm$html$Html$Attributes$style, 'width', '80%'),
						A2($elm$html$Html$Attributes$style, 'height', '20%'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'transparent')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('love you so.')
					]))
			]));
};
var $author$project$Death6$View$visualizeBall = function (ball) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('4')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('3')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(ball.color))
					]),
				_List_Nil)
			]));
};
var $author$project$Death6$View$changeBrickColor = function (brick) {
	var _v0 = brick.hitTime;
	if ((_v0.$ === 'Hit') && (!_v0.a)) {
		return A3($author$project$Model$rgb, 110, 106, 100);
	} else {
		return A3($author$project$Model$rgb, 150, 150, 150);
	}
};
var $author$project$Death6$View$visualizeBrick = function (brick) {
	var alpha = function () {
		var _v0 = brick.hitTime;
		if ((_v0.$ === 'Hit') && (!_v0.a)) {
			return '1';
		} else {
			return '0';
		}
	}();
	return A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points(
				$author$project$Model$polyToString(brick.collision)),
				$elm$svg$Svg$Attributes$fill(
				$author$project$Model$colorToString(
					$author$project$Death6$View$changeBrickColor(brick))),
				$elm$svg$Svg$Attributes$opacity(alpha)
			]),
		_List_Nil);
};
var $elm$svg$Svg$mask = $elm$svg$Svg$trustedNode('mask');
var $elm$svg$Svg$Attributes$mask = _VirtualDom_attribute('mask');
var $author$project$Model$posToPoly = F3(
	function (w, h, center) {
		return _List_fromArray(
			[
				A2($author$project$Model$Point, center.x + (w / 2), center.y + (h / 2)),
				A2($author$project$Model$Point, center.x + (w / 2), center.y - (h / 2)),
				A2($author$project$Model$Point, center.x - (w / 2), center.y - (h / 2)),
				A2($author$project$Model$Point, center.x - (w / 2), center.y + (h / 2))
			]);
	});
var $author$project$Death6$View$visualizePaddle = function (paddle) {
	var w = 2 * ((paddle.r + paddle.h) + 1);
	var h = (2 * paddle.r) * $elm$core$Basics$cos(paddle.angle);
	var pos_ = {x: paddle.pos.x, y: paddle.pos.y - h};
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$mask,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('mask_')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$polygon,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$points(
										$author$project$Model$polyToString(
											A3($author$project$Model$posToPoly, w, h, pos_))),
										$elm$svg$Svg$Attributes$fill(
										$author$project$Model$colorToString(
											A3($author$project$Model$rgb, 255, 255, 255)))
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$mask('url(#mask_)')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fillOpacity('0'),
						$elm$svg$Svg$Attributes$stroke(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromFloat(paddle.h))
					]),
				_List_Nil)
			]));
};
var $author$project$Death6$View$visualizeGame = F2(
	function (model, opacity) {
		var elements = A2(
			$elm$core$List$cons,
			$author$project$Death6$View$visualizePaddle(
				A2(
					$elm$core$Maybe$withDefault,
					$author$project$Tools$dummyPaddle,
					$elm$core$List$head(model.paddle))),
			_Utils_ap(
				A2($elm$core$List$map, $author$project$Death6$View$visualizeBrick, model.bricks),
				_Utils_ap(
					A2($elm$core$List$map, $author$project$Death6$View$visualizeBall, model.ball),
					A2(
						$elm$core$List$map,
						$author$project$Death6$View$visualizeBall,
						A2(
							$elm$core$Maybe$withDefault,
							_List_fromArray(
								[$author$project$Tools$dummyBall]),
							$elm$core$List$tail(model.ball))))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'opacity', opacity),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$version('1.1'),
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y('0'),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromFloat(model.canvas.w) + (' ' + $elm$core$String$fromFloat(model.canvas.h))))
						]),
					elements)
				]));
	});
var $author$project$Death6$View$visualizePrepare = function (model) {
	var alphaSub = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeInSub').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return (!A2($author$project$Tools$getState, model.state, 'fadeOut').t) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeIn').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return ((!A2($author$project$Tools$getState, model.state, 'fadeOut').t) && (!$elm$core$List$isEmpty(model.state))) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString(
					$author$project$Death6$View$backgroundColor_(model))),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'text-align', 'center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2($elm$html$Html$Attributes$style, 'top', '55%'),
								A2($elm$html$Html$Attributes$style, 'width', '100%'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
								A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								$elm$core$String$fromFloat(alphaSub)),
								A2($elm$html$Html$Attributes$style, 'line-height', '40px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'position', 'relative'),
										A2($elm$html$Html$Attributes$style, 'left', '43%'),
										A2($elm$html$Html$Attributes$style, 'width', '40%'),
										A2($elm$html$Html$Attributes$style, 'text-align', 'left')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Let all bells toll!')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'position', 'relative'),
										A2($elm$html$Html$Attributes$style, 'top', '-20px'),
										A2($elm$html$Html$Attributes$style, 'left', '43%'),
										A2($elm$html$Html$Attributes$style, 'width', '40%'),
										A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
										A2($elm$html$Html$Attributes$style, 'color', '#C00000')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Let'),
										A2(
										$elm$html$Html$i,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(' no')
											])),
										$elm$html$Html$text(' bell toll.')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
										A2($elm$html$Html$Attributes$style, 'position', 'relative'),
										A2($elm$html$Html$Attributes$style, 'top', '-35px'),
										A2($elm$html$Html$Attributes$style, 'left', '32%'),
										A2($elm$html$Html$Attributes$style, 'width', '40%'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('              - Edgar Allan Poe ')
									]))
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2($elm$html$Html$Attributes$style, 'top', '30%'),
								A2($elm$html$Html$Attributes$style, 'width', '100%'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
								A2($elm$html$Html$Attributes$style, 'font-size', '48px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Death')
							]))
					]))
			]));
};
var $author$project$Death6$View$visualize = function (model) {
	var alpha = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Prepare':
				return '1';
			case 'Running':
				return '1';
			case 'Paused':
				return '1';
			case 'Pass':
				return '1';
			case 'AnimationPass':
				return $elm$core$String$fromFloat(
					A2($author$project$Tools$getState, model.state, 'fadeOut').value);
			default:
				return '0';
		}
	}();
	var _v0 = model.size;
	var w = _v0.a;
	var h = _v0.b;
	var r = (_Utils_cmp(w / h, model.canvas.w / model.canvas.h) > 0) ? A2($elm$core$Basics$min, 1, h / model.canvas.h) : A2($elm$core$Basics$min, 1, w / model.canvas.w);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Model$colorToString(
					$author$project$Death6$View$backgroundColor_(model)))
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromFloat(model.canvas.w) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'height',
							$elm$core$String$fromFloat(model.canvas.h) + 'px'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat((w - (model.canvas.w * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat((h - (model.canvas.h * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Death6$View$backgroundColor_(model)))
						]),
					_List_fromArray(
						[
							A2($author$project$Death6$View$visualizeCanvasDone, model, alpha),
							$author$project$Death6$View$visualizeEpitaph(model),
							A2($author$project$Death6$View$visualizeGame, model, alpha)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Death6$View$backgroundColor_(model))),
							A2($elm$html$Html$Attributes$style, 'background-position', 'center')
						]),
					_List_fromArray(
						[
							$author$project$Death6$View$visualizePrepare(model),
							$author$project$BasicView$visualizeBlock(model)
						]))
				]),
			(!A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$Lose]))) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('audio6'),
							$elm$html$Html$Attributes$src('Death - November.mp3'),
							$elm$html$Html$Attributes$autoplay(true),
							$elm$html$Html$Attributes$preload('True'),
							$elm$html$Html$Attributes$loop(true)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Death6$Init$init = function () {
	var state = _List_fromArray(
		[
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeIn, 0, 0.4, 0)),
			loop: false,
			name: 'fadeIn',
			t: 0,
			value: 0
		},
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeInSub, 0.5, 0.5, 0)),
			loop: false,
			name: 'fadeInSub',
			t: 0,
			value: 0
		}
		]);
	var canvas = {h: 600, w: 500};
	var paddle = function () {
		var r = 60;
		var h = 3;
		var angle = (40 * $elm$core$Basics$pi) / 180;
		var pos = A2(
			$author$project$Model$Point,
			canvas.w / 2,
			((canvas.h + (r * $elm$core$Basics$cos(angle))) - 5) - r);
		return {
			angle: angle,
			block: $author$project$Tools$dummyBlock,
			collision: A5($author$project$Tools$getPaddleColl, pos, r, h, angle, 16),
			color: A3($author$project$Model$rgb, 255, 255, 255),
			h: h,
			pos: pos,
			r: r
		};
	}();
	var bricks = function () {
		var posInfo = _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$Model$Point, 82, 91),
				{h: 25, w: 74}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 60, 148),
				{h: 25, w: 30}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 117, 148),
				{h: 25, w: 60}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 198, 148),
				{h: 25, w: 77}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 283, 148),
				{h: 25, w: 65}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 370, 148),
				{h: 25, w: 84}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 122, 199),
				{h: 25, w: 154}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 248, 199),
				{h: 25, w: 66}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 75, 253),
				{h: 25, w: 60}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 159, 253),
				{h: 25, w: 80}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 248, 253),
				{h: 25, w: 70}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 339, 253),
				{h: 25, w: 84}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 70, 307),
				{h: 25, w: 50}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 122, 307),
				{h: 25, w: 24}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 302, 364),
				{h: 25, w: 74}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 382.5, 364),
				{h: 25, w: 53}),
				_Utils_Tuple2(
				A2($author$project$Model$Point, 451, 364),
				{h: 25, w: 52})
			]);
		return A2(
			$elm$core$List$map,
			function (_v0) {
				var p = _v0.a;
				var b = _v0.b;
				return A5(
					$author$project$Model$Brick,
					p,
					A2($author$project$Tools$pos2coll, p, b),
					A2($author$project$Tools$pos2block, p, b),
					$author$project$Model$Hit(0),
					A3($author$project$Model$rgb, 0, 0, 0));
			},
			posInfo);
	}();
	var ball = function () {
		var v = A2($author$project$Model$Point, -1.6, -1.6);
		var r = 10;
		var pos = A2($author$project$Model$Point, canvas.w / 2, ((paddle.pos.y - paddle.r) - paddle.h) - r);
		return {
			active: true,
			collision: $author$project$Tools$getBallColl(
				_Utils_Tuple3(pos, r, 16)),
			color: A3($author$project$Model$rgb, 100, 100, 100),
			pos: pos,
			r: r,
			v: v
		};
	}();
	var model = _Utils_update(
		$author$project$Tools$dummyModel,
		{
			activeInput: true,
			animateState: $author$project$Model$AniIn,
			ball: _List_fromArray(
				[ball]),
			bricks: bricks,
			canvas: canvas,
			clock: 0,
			gameLevel: $author$project$Messages$Death6,
			gameStatus: $author$project$Messages$AnimationPrepare,
			paddle: _List_fromArray(
				[paddle]),
			size: _Utils_Tuple2(canvas.w, canvas.h),
			state: state
		});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				visualization: $author$project$Death6$View$visualize(model)
			}),
		A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
}();
var $author$project$Tools$dummyStateManagement = F2(
	function (name, end) {
		var dummy_ = F2(
			function (model, _v2) {
				var _v0 = A2($author$project$Tools$divState, model.state, name);
				var s_ = _v0.a;
				var state_ = _v0.b;
				var _v1 = _Utils_cmp(s_.t, end) > 0;
				if (_v1) {
					return _Utils_update(
						model,
						{state: state_});
				} else {
					return _Utils_update(
						model,
						{
							state: A2($elm$core$List$cons, s_, state_)
						});
				}
			});
		return dummy_;
	});
var $author$project$End7$View$backgroundColor = A3($author$project$Model$rgb, 0, 0, 0);
var $author$project$End7$View$tMapTop = F2(
	function (t, posAdjust) {
		var per = 170;
		return (((0.32 - t) * 2) * per) + posAdjust;
	});
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$End7$View$subtitle = function (model) {
	var t = $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'tMapTop').t;
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'Height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(
						A2($author$project$End7$View$tMapTop, t, 0)) + '%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'font-size', '72px'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Duality')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'Height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(
						A2($author$project$End7$View$tMapTop, t, 20)) + '%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'font-size', '36px'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$elm$core$String$toUpper('Staff'))
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'Height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(
						A2($author$project$End7$View$tMapTop, t, 30)) + '%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'line-height', '6px'),
					A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Jiang Yuchen')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Tang Rundong')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Sun Zhimin')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Zhou Yuchen')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'Height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(
						A2($author$project$End7$View$tMapTop, t, 50)) + '%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'font-size', '36px'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('MUSIC')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'line-height', '6px'),
					A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 62)) + '%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('For River')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 62)) + '%'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'right', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Kan R. Gao')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 66)) + '%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Paper Airplane')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 66)) + '%'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'right', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Kan R. Gao')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 70)) + '%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Take Me Anywhere')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 70)) + '%'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'right', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Kan R. Gao')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 74)) + '%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Bata-B')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 74)) + '%'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'right', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Kan R. Gao')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 78)) + '%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Blower’s Daughter')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 78)) + '%'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'right', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Damien Rice')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 82)) + '%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Having Lived')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 82)) + '%'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'right', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Kan R. Gao')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 86)) + '%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('November')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 86)) + '%'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'right', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Endless Melancholy')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 90)) + '%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Too Bad So Sad')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(
								A2($author$project$End7$View$tMapTop, t, 90)) + '%'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'right', '35%'),
							A2($elm$html$Html$Attributes$style, 'width', '20%')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Kan R. Gao')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'Height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(
						A2($author$project$End7$View$tMapTop, t, 98)) + '%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'font-size', '36px'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('FONT')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'Height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(
						A2($author$project$End7$View$tMapTop, t, 110)) + '%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'line-height', '6px'),
					A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('High Tower Text')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Copperplate Gothic Light')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'Height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(
						A2($author$project$End7$View$tMapTop, t, 124)) + '%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'font-size', '36px'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Special Thanks for')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'Height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(
						A2($author$project$End7$View$tMapTop, t, 136)) + '%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'line-height', '6px'),
					A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('William Shakespeare')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Edgar Allan Poe')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Manuel Charlem')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Michele M. Campbell')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Pan Yu')
						]))
				]))
		]);
};
var $author$project$End7$View$tMapFade = function (t) {
	return (t < 0) ? 0 : ((t < 0.1) ? (t / 0.1) : ((t < 0.2) ? 1 : 1));
};
var $author$project$End7$View$visualize = function (model) {
	var t_ = $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fade').t;
	var t = $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'tMapTop').t;
	var len = 500;
	var _v0 = model.size;
	var w = _v0.a;
	var h = _v0.b;
	var r = ((w / h) > 1) ? A2($elm$core$Basics$min, 1, h / len) : A2($elm$core$Basics$min, 1, w / len);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Model$colorToString($author$project$End7$View$backgroundColor)),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif')
			]),
		_Utils_ap(
			$author$project$End7$View$subtitle(model),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src('icon.png'),
								$elm$html$Html$Attributes$width(len),
								$elm$html$Html$Attributes$height(len),
								A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								$elm$core$String$fromFloat((w - (len * r)) / 2) + 'px'),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								$elm$core$String$fromFloat(
									A2($author$project$End7$View$tMapTop, t, 160)) + '%'),
								$elm$html$Html$Attributes$alt('Network Failure')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'width', '100%'),
								A2($elm$html$Html$Attributes$style, 'Height', '40%'),
								A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
								A2($elm$html$Html$Attributes$style, 'left', '0'),
								A2($elm$html$Html$Attributes$style, 'top', '35%'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
								A2($elm$html$Html$Attributes$style, 'font-size', '36px'),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								$elm$core$String$fromFloat(
									$author$project$End7$View$tMapFade(t_)))
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Thank you for playing!')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'font-size', '22px')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Press Space to restart.')
									]))
							]))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$audio,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src('End - The Blowers Daughter (Instrumental).mp3'),
								$elm$html$Html$Attributes$id('audio7'),
								$elm$html$Html$Attributes$autoplay(true),
								$elm$html$Html$Attributes$preload('True'),
								$elm$html$Html$Attributes$loop(true)
							]),
						_List_Nil)
					]))));
};
var $author$project$End7$Init$init = function () {
	var state = _List_fromArray(
		[
			{
			_function: $author$project$Model$Func(
				A2($author$project$Tools$dummyStateManagement, 'tMapTop', 1)),
			loop: false,
			name: 'tMapTop',
			t: 0,
			value: 0
		},
			{
			_function: $author$project$Model$Func(
				A2($author$project$Tools$dummyStateManagement, 'fade', 0.3)),
			loop: false,
			name: 'fade',
			t: -1,
			value: 0
		}
		]);
	var canvas = {h: 600, w: 400};
	var model = _Utils_update(
		$author$project$Tools$dummyModel,
		{
			activeInput: true,
			animateState: $author$project$Model$AniIn,
			ball: _List_Nil,
			bricks: _List_Nil,
			canvas: canvas,
			clock: 0,
			gameLevel: $author$project$Messages$End7,
			gameStatus: $author$project$Messages$AnimationPrepare,
			paddle: _List_Nil,
			size: _Utils_Tuple2(canvas.w, canvas.h),
			state: state
		});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				visualization: $author$project$End7$View$visualize(model)
			}),
		A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
}();
var $author$project$Model$NoMore = {$: 'NoMore'};
var $author$project$Tools$dummyBrick = A5($author$project$Model$Brick, $author$project$Tools$dummyPoint, $author$project$Tools$dummyPoly, $author$project$Tools$dummyBlock, $author$project$Model$NoMore, $author$project$Tools$dummyColor);
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Friends2$Find$getBrick = F2(
	function (lst, n) {
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$Tools$dummyBrick,
			$elm$core$List$head(
				A2(
					$elm$core$List$map,
					function (b) {
						return A2($elm$core$Maybe$withDefault, $author$project$Tools$dummyBrick, b);
					},
					A2(
						$elm$core$List$filter,
						function (e) {
							return !_Utils_eq(e, $elm$core$Maybe$Nothing);
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, brick) {
									return _Utils_eq(i + 1, n) ? $elm$core$Maybe$Just(brick) : $elm$core$Maybe$Nothing;
								}),
							lst)))));
	});
var $author$project$Tools$newBricks = function (info) {
	var positionConvert = F2(
		function (len, unit) {
			return A2(
				$elm$core$List$map,
				function (x) {
					return x * unit;
				},
				A2(
					$elm$core$List$map,
					function (x) {
						return (x - 0.5) - (len / 2);
					},
					A2(
						$elm$core$List$map,
						$elm$core$Basics$toFloat,
						A2($elm$core$List$range, 1, len))));
		});
	var posBrickY = A2(
		$elm$core$List$map,
		function (y) {
			return (y + (info.canvas.h / 2)) + info.offset.y;
		},
		A2(positionConvert, info.layout.y, info.brick.h + info.breath));
	var posBrickX = A2(
		$elm$core$List$map,
		function (x) {
			return (x + (info.canvas.w / 2)) + info.offset.x;
		},
		A2(positionConvert, info.layout.x, info.brick.w + info.breath));
	var posBricks = A2(
		$elm$core$List$concatMap,
		function (x) {
			return A2(
				$elm$core$List$map,
				$author$project$Model$Point(x),
				posBrickY);
		},
		posBrickX);
	return A2(
		$elm$core$List$map,
		function (pos) {
			return A5(
				$author$project$Model$Brick,
				pos,
				A2($author$project$Tools$pos2coll, pos, info.brick),
				A2($author$project$Tools$pos2block, pos, info.brick),
				$author$project$Model$Hit(0),
				info.color);
		},
		posBricks);
};
var $author$project$Friends2$View$backgroundColor = A3($author$project$Model$rgb, 242, 176, 173);
var $author$project$Friends2$View$backgroundColor_ = function (model) {
	var state = $elm$core$List$isEmpty(model.state) ? _Utils_update(
		$author$project$Tools$dummyState,
		{t: 1}) : A2($author$project$Tools$getState, model.state, 'fadeIn');
	var color = A3(
		$author$project$Bezier$bezierColor,
		A3($author$project$Model$rgb, 0, 0, 0),
		$author$project$Friends2$View$backgroundColor,
		state.t);
	return _Utils_eq(model.gameStatus, $author$project$Messages$AnimationPrepare) ? color : $author$project$Friends2$View$backgroundColor;
};
var $author$project$Tools$getBall = F2(
	function (lst, n) {
		getBall:
		while (true) {
			if (n === 1) {
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Tools$dummyBall,
					$elm$core$List$head(lst));
			} else {
				var $temp$lst = A2($elm$core$List$drop, 1, lst),
					$temp$n = n - 1;
				lst = $temp$lst;
				n = $temp$n;
				continue getBall;
			}
		}
	});
var $author$project$Friends2$View$visualizeBall1 = function (ball) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(ball.color))
					]),
				_List_Nil)
			]));
};
var $author$project$Friends2$View$visualizeBall2 = function (ball) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(ball.color)),
						$elm$svg$Svg$Attributes$opacity('0.85')
					]),
				_List_Nil)
			]));
};
var $author$project$Friends2$View$changeBrickColor = function (brick) {
	var _v0 = brick.hitTime;
	if ((_v0.$ === 'Hit') && (!_v0.a)) {
		return brick.color;
	} else {
		return $author$project$Friends2$View$backgroundColor;
	}
};
var $author$project$Friends2$View$visualizeBrick = function (brick) {
	var alpha = function () {
		var _v0 = brick.hitTime;
		if ((_v0.$ === 'Hit') && (!_v0.a)) {
			return '1';
		} else {
			return '0';
		}
	}();
	return A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points(
				$author$project$Model$polyToString(brick.collision)),
				$elm$svg$Svg$Attributes$fill(
				$author$project$Model$colorToString(
					$author$project$Friends2$View$changeBrickColor(brick))),
				$elm$svg$Svg$Attributes$opacity(alpha)
			]),
		_List_Nil);
};
var $author$project$Friends2$View$visualizeCanvas = function (model) {
	var rt = A2($author$project$Model$Point, model.canvas.w, 0);
	var rb = A2($author$project$Model$Point, model.canvas.w, model.canvas.h);
	var lt = A2($author$project$Model$Point, 0, 0);
	var lb = A2($author$project$Model$Point, 0, model.canvas.h);
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('15')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('10')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 255, 255, 255))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							$author$project$Friends2$View$backgroundColor_(model))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur_in1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil)
			]));
};
var $author$project$Friends2$View$visualizePaddle = function (paddle) {
	var w = 2 * ((paddle.r + paddle.h) + 1);
	var h = (2 * paddle.r) * $elm$core$Basics$cos(paddle.angle);
	var pos_ = {x: paddle.pos.x, y: paddle.pos.y - h};
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$mask,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('mask_')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$polygon,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$points(
										$author$project$Model$polyToString(
											A3($author$project$Model$posToPoly, w, h, pos_))),
										$elm$svg$Svg$Attributes$fill(
										$author$project$Model$colorToString(paddle.color))
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$mask('url(#mask_)')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fillOpacity('0'),
						$elm$svg$Svg$Attributes$stroke(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromFloat(paddle.h))
					]),
				_List_Nil)
			]));
};
var $author$project$Friends2$View$visualizeGame = F2(
	function (model, opacity) {
		var elements = A2(
			$elm$core$List$cons,
			$author$project$Friends2$View$visualizeCanvas(model),
			A2(
				$elm$core$List$cons,
				$author$project$Friends2$View$visualizePaddle(
					A2($author$project$Tools$getPaddle, model.paddle, 1)),
				_Utils_ap(
					A2($elm$core$List$map, $author$project$Friends2$View$visualizeBrick, model.bricks),
					_List_fromArray(
						[
							$author$project$Friends2$View$visualizeBall1(
							A2($author$project$Tools$getBall, model.ball, 1)),
							$author$project$Friends2$View$visualizeBall2(
							A2($author$project$Tools$getBall, model.ball, 2))
						]))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'opacity', opacity)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$version('1.1'),
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y('0'),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromFloat(model.canvas.w) + (' ' + $elm$core$String$fromFloat(model.canvas.h))))
						]),
					elements)
				]));
	});
var $author$project$Friends2$View$visualizePrepare = function (model) {
	var alphaSub = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeInSub').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeIn').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString(
					$author$project$Friends2$View$backgroundColor_(model))),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$AnimationPreparePost])) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '55%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(alphaSub))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Couple of drinks. Leisurely chats. '),
						A2($elm$html$Html$br, _List_Nil, _List_Nil),
						$elm$html$Html$text('Casual flirting. ')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '30%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(alpha))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Friends')
					]))
			]));
};
var $author$project$Friends2$View$visualize = function (model) {
	var alpha = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Prepare':
				return '1';
			case 'Running':
				return '1';
			case 'Paused':
				return '1';
			case 'AnimationPass':
				return $elm$core$String$fromFloat(
					A2($author$project$Tools$getState, model.state, 'fadeOut').value);
			case 'Pass':
				return '1';
			default:
				return '0';
		}
	}();
	var _v0 = model.size;
	var w = _v0.a;
	var h = _v0.b;
	var r = (_Utils_cmp(w / h, model.canvas.w / model.canvas.h) > 0) ? A2($elm$core$Basics$min, 1, h / model.canvas.h) : A2($elm$core$Basics$min, 1, w / model.canvas.w);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Model$colorToString(
					$author$project$Friends2$View$backgroundColor_(model)))
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromFloat(model.canvas.w) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'height',
							$elm$core$String$fromFloat(model.canvas.h) + 'px'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat((w - (model.canvas.w * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat((h - (model.canvas.h * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Friends2$View$backgroundColor_(model)))
						]),
					_List_fromArray(
						[
							A2($author$project$Friends2$View$visualizeGame, model, alpha)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Friends2$View$backgroundColor_(model))),
							A2($elm$html$Html$Attributes$style, 'background-position', 'center')
						]),
					_List_fromArray(
						[
							$author$project$Friends2$View$visualizePrepare(model),
							$author$project$BasicView$visualizeBlock(model)
						]))
				]),
			(!A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$Lose, $author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare]))) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('audio2'),
							$elm$html$Html$Attributes$src('Friends - Take Me Anywhere.mp3'),
							$elm$html$Html$Attributes$autoplay(true),
							$elm$html$Html$Attributes$preload('True'),
							$elm$html$Html$Attributes$loop(true)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Friends2$Init$init = function () {
	var state = _List_fromArray(
		[
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeIn, 0, 0.4, -0.003)),
			loop: false,
			name: 'fadeIn',
			t: 0,
			value: 0
		},
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeInSub, 0.5, 0.5, -0.003)),
			loop: false,
			name: 'fadeInSub',
			t: 0,
			value: 0
		}
		]);
	var canvas = {h: 600, w: 800};
	var paddle = function () {
		var r = 60;
		var h = 3;
		var angle = (40 * $elm$core$Basics$pi) / 180;
		var pos = A2(
			$author$project$Model$Point,
			canvas.w / 2,
			((canvas.h + (r * $elm$core$Basics$cos(angle))) - 5) - r);
		return {
			angle: angle,
			block: $author$project$Tools$dummyBlock,
			collision: A5($author$project$Tools$getPaddleColl, pos, r, h, angle, 16),
			color: A3($author$project$Model$rgb, 255, 255, 255),
			h: h,
			pos: pos,
			r: r
		};
	}();
	var bricksize = {h: 60, w: 60};
	var bricks = function () {
		var brickInfo = {
			breath: 10,
			brick: bricksize,
			canvas: canvas,
			color: A3($author$project$Model$rgb, 109, 181, 161),
			layout: {x: 10, y: 3},
			offset: A2($author$project$Model$Point, 0, -120)
		};
		return $author$project$Tools$newBricks(brickInfo);
	}();
	var ball2 = function () {
		var v = A2($author$project$Model$Point, 0, 0);
		var r = 15;
		var pos = A2($author$project$Friends2$Find$getBrick, bricks, 27).pos;
		return {
			active: true,
			collision: $author$project$Tools$dummyPoly,
			color: A3($author$project$Model$rgb, 250, 200, 50),
			pos: pos,
			r: r,
			v: v
		};
	}();
	var ball = function () {
		var v = A2($author$project$Model$Point, 3.0, -3.0);
		var r = 15;
		var pos = A2($author$project$Model$Point, canvas.w / 2, (((paddle.pos.y - paddle.r) - paddle.h) - r) - 3);
		return {
			active: true,
			collision: $author$project$Tools$getBallColl(
				_Utils_Tuple3(pos, r, 16)),
			color: A3($author$project$Model$rgb, 66, 150, 240),
			pos: pos,
			r: r,
			v: v
		};
	}();
	var model = _Utils_update(
		$author$project$Tools$dummyModel,
		{
			activeInput: true,
			animateState: $author$project$Model$AniIn,
			ball: _List_fromArray(
				[ball, ball2]),
			bricks: bricks,
			canvas: canvas,
			clock: 0,
			gameLevel: $author$project$Messages$Friends2,
			gameStatus: $author$project$Messages$AnimationPrepare,
			paddle: _List_fromArray(
				[paddle]),
			size: _Utils_Tuple2(canvas.w, canvas.h),
			state: state
		});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				visualization: $author$project$Friends2$View$visualize(model)
			}),
		A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
}();
var $author$project$Lovers3$View$backgroundColor = A3($author$project$Model$rgb, 198, 185, 169);
var $author$project$Lovers3$View$backgroundColor_ = function (model) {
	var state = $elm$core$List$isEmpty(model.state) ? _Utils_update(
		$author$project$Tools$dummyState,
		{t: 1}) : A2($author$project$Tools$getState, model.state, 'fadeIn');
	var color = A3(
		$author$project$Bezier$bezierColor,
		A3($author$project$Model$rgb, 242, 176, 173),
		$author$project$Lovers3$View$backgroundColor,
		state.t);
	return _Utils_eq(model.gameStatus, $author$project$Messages$AnimationPrepare) ? color : $author$project$Lovers3$View$backgroundColor;
};
var $author$project$Lovers3$View$visualizeBall = function (ball) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('4')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('3')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(ball.color))
					]),
				_List_Nil)
			]));
};
var $author$project$Lovers3$View$changeBrickColor = function (brick) {
	var _v0 = brick.hitTime;
	if ((_v0.$ === 'Hit') && (!_v0.a)) {
		return A3($author$project$Model$rgb, 121, 26, 26);
	} else {
		return A3($author$project$Model$rgb, 140, 120, 100);
	}
};
var $author$project$Lovers3$View$visualizeBrick = function (brick) {
	var alpha = function () {
		var _v0 = brick.hitTime;
		if ((_v0.$ === 'Hit') && (!_v0.a)) {
			return '1';
		} else {
			return '0.3';
		}
	}();
	return A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points(
				$author$project$Model$polyToString(brick.collision)),
				$elm$svg$Svg$Attributes$fill(
				$author$project$Model$colorToString(
					$author$project$Lovers3$View$changeBrickColor(brick))),
				$elm$svg$Svg$Attributes$opacity(alpha)
			]),
		_List_Nil);
};
var $author$project$Lovers3$View$visualizeCanvas = function (model) {
	var rt = A2($author$project$Model$Point, model.canvas.w, 0);
	var rb = A2($author$project$Model$Point, model.canvas.w, model.canvas.h);
	var lt = A2($author$project$Model$Point, 0, 0);
	var lb = A2($author$project$Model$Point, 0, model.canvas.h);
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('15')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('10')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 255, 255, 255))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString($author$project$Lovers3$View$backgroundColor)),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur_in1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil)
			]));
};
var $author$project$Lovers3$View$visualizePaddle = function (paddle) {
	var w = 2 * ((paddle.r + paddle.h) + 1);
	var h = (2 * paddle.r) * $elm$core$Basics$cos(paddle.angle);
	var pos_ = {x: paddle.pos.x, y: paddle.pos.y - h};
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$mask,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('mask_')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$polygon,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$points(
										$author$project$Model$polyToString(
											A3($author$project$Model$posToPoly, w, h, pos_))),
										$elm$svg$Svg$Attributes$fill(
										$author$project$Model$colorToString(
											A3($author$project$Model$rgb, 255, 255, 255)))
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$mask('url(#mask_)')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fillOpacity('0'),
						$elm$svg$Svg$Attributes$stroke(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromFloat(paddle.h))
					]),
				_List_Nil)
			]));
};
var $author$project$Lovers3$View$visualizeGame = F2(
	function (model, opacity) {
		var elements = A2(
			$elm$core$List$cons,
			$author$project$Lovers3$View$visualizeCanvas(model),
			A2(
				$elm$core$List$cons,
				$author$project$Lovers3$View$visualizePaddle(
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Tools$dummyPaddle,
						$elm$core$List$head(model.paddle))),
				_Utils_ap(
					A2($elm$core$List$map, $author$project$Lovers3$View$visualizeBrick, model.bricks),
					_Utils_ap(
						A2($elm$core$List$map, $author$project$Lovers3$View$visualizeBall, model.ball),
						A2(
							$elm$core$List$map,
							$author$project$Lovers3$View$visualizeBall,
							A2(
								$elm$core$Maybe$withDefault,
								_List_fromArray(
									[$author$project$Tools$dummyBall]),
								$elm$core$List$tail(model.ball)))))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'opacity', opacity)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$version('1.1'),
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y('0'),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromFloat(model.canvas.w) + (' ' + $elm$core$String$fromFloat(model.canvas.h))))
						]),
					elements)
				]));
	});
var $author$project$Lovers3$View$visualizePrepare = function (model) {
	var alphaSub = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeInSub').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeIn').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString(
					$author$project$Lovers3$View$backgroundColor_(model))),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#791A1A'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$AnimationPreparePost])) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '55%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(alphaSub))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Deeply united, they got closer. The boundary grew vaguer.'),
						A2($elm$html$Html$br, _List_Nil, _List_Nil),
						$elm$html$Html$text('They were tangled.  ')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '30%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(alpha))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Lovers')
					]))
			]));
};
var $author$project$Lovers3$View$visualize = function (model) {
	var alpha = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Prepare':
				return '1';
			case 'Running':
				return '1';
			case 'Paused':
				return '1';
			case 'Pass':
				return '1';
			case 'AnimationPass':
				return $elm$core$String$fromFloat(
					A2($author$project$Tools$getState, model.state, 'fadeOut').value);
			default:
				return '0';
		}
	}();
	var _v0 = model.size;
	var w = _v0.a;
	var h = _v0.b;
	var r = (_Utils_cmp(w / h, model.canvas.w / model.canvas.h) > 0) ? A2($elm$core$Basics$min, 1, h / model.canvas.h) : A2($elm$core$Basics$min, 1, w / model.canvas.w);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Model$colorToString(
					$author$project$Lovers3$View$backgroundColor_(model)))
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromFloat(model.canvas.w) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'height',
							$elm$core$String$fromFloat(model.canvas.h) + 'px'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat((w - (model.canvas.w * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat((h - (model.canvas.h * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Lovers3$View$backgroundColor_(model)))
						]),
					_List_fromArray(
						[
							A2($author$project$Lovers3$View$visualizeGame, model, alpha)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Lovers3$View$backgroundColor_(model))),
							A2($elm$html$Html$Attributes$style, 'background-position', 'center')
						]),
					_List_fromArray(
						[
							$author$project$Lovers3$View$visualizePrepare(model),
							$author$project$BasicView$visualizeBlock(model)
						]))
				]),
			(!A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$AnimationPreparePost, $author$project$Messages$Lose]))) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('audio3'),
							$elm$html$Html$Attributes$src('Lovers - Beta-B.mp3'),
							$elm$html$Html$Attributes$autoplay(true),
							$elm$html$Html$Attributes$preload('True'),
							$elm$html$Html$Attributes$loop(true)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Lovers3$Init$init = function () {
	var state = _List_fromArray(
		[
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeIn, 0, 0.4, 0)),
			loop: false,
			name: 'fadeIn',
			t: 0,
			value: 0
		},
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeInSub, 0.5, 0.5, 0)),
			loop: false,
			name: 'fadeInSub',
			t: 0,
			value: 0
		}
		]);
	var canvas = {h: 600, w: 500};
	var paddle = function () {
		var r = 60;
		var h = 3;
		var angle = (40 * $elm$core$Basics$pi) / 180;
		var pos = A2(
			$author$project$Model$Point,
			canvas.w / 2,
			((canvas.h + (r * $elm$core$Basics$cos(angle))) - 5) - r);
		return {
			angle: angle,
			block: $author$project$Tools$dummyBlock,
			collision: A5($author$project$Tools$getPaddleColl, pos, r, h, angle, 16),
			color: A3($author$project$Model$rgb, 255, 255, 255),
			h: h,
			pos: pos,
			r: r
		};
	}();
	var bricks = function () {
		var posInfo = _List_fromArray(
			[
				A2($author$project$Model$Point, 0, -1),
				A2($author$project$Model$Point, 0, 0),
				A2($author$project$Model$Point, 0, 1),
				A2($author$project$Model$Point, 0, 2),
				A2($author$project$Model$Point, -1, -2),
				A2($author$project$Model$Point, -1, -1),
				A2($author$project$Model$Point, -1, 0),
				A2($author$project$Model$Point, -1, 1),
				A2($author$project$Model$Point, -2, 0),
				A2($author$project$Model$Point, -2, -1),
				A2($author$project$Model$Point, -2, -2),
				A2($author$project$Model$Point, -3, -1),
				A2($author$project$Model$Point, 1, -2),
				A2($author$project$Model$Point, 1, -1),
				A2($author$project$Model$Point, 1, 0),
				A2($author$project$Model$Point, 1, 1),
				A2($author$project$Model$Point, 2, 0),
				A2($author$project$Model$Point, 2, -1),
				A2($author$project$Model$Point, 2, -2),
				A2($author$project$Model$Point, 3, -1)
			]);
		var hi = {
			breath: 1,
			brick: {h: 29, w: 29},
			canvas: canvas,
			color: A3($author$project$Model$rgb, 66, 150, 240),
			offset: A2($author$project$Model$Point, 0, -40)
		};
		return A2(
			$elm$core$List$map,
			function (p) {
				return A5(
					$author$project$Model$Brick,
					p,
					A2($author$project$Tools$pos2coll, p, hi.brick),
					A2($author$project$Tools$pos2block, p, hi.brick),
					$author$project$Model$Hit(0),
					hi.color);
			},
			A2(
				$elm$core$List$map,
				function (p) {
					return A2($author$project$Model$Point, (((hi.brick.w + hi.breath) * p.x) + (hi.canvas.w / 2)) + hi.offset.x, (((hi.brick.h + hi.breath) * p.y) + (hi.canvas.h / 2)) + hi.offset.y);
				},
				posInfo));
	}();
	var ball = function () {
		var v = A2($author$project$Model$Point, 3.0, -3.0);
		var r = 10;
		var pos = A2($author$project$Model$Point, canvas.w / 2, ((paddle.pos.y - paddle.r) - paddle.h) - r);
		return {
			active: true,
			collision: $author$project$Tools$getBallColl(
				_Utils_Tuple3(pos, r, 16)),
			color: A3($author$project$Model$rgb, 252, 226, 149),
			pos: pos,
			r: r,
			v: v
		};
	}();
	var model = _Utils_update(
		$author$project$Tools$dummyModel,
		{
			activeInput: true,
			animateState: $author$project$Model$AniIn,
			ball: _List_fromArray(
				[ball]),
			bricks: bricks,
			canvas: canvas,
			clock: 0,
			gameLevel: $author$project$Messages$Lovers3,
			gameStatus: $author$project$Messages$AnimationPrepare,
			paddle: _List_fromArray(
				[paddle]),
			size: _Utils_Tuple2(canvas.w, canvas.h),
			state: state
		});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				visualization: $author$project$Lovers3$View$visualize(model)
			}),
		A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
}();
var $author$project$Strangers1$View$backgroundColor = A3($author$project$Model$rgb, 0, 0, 0);
var $author$project$Strangers1$View$visualizeBall = function (ball) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('4')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('3')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r * 2.5)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 200, 200, 200))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur)'),
						$elm$svg$Svg$Attributes$opacity('0.5')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(ball.color)),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur_in)')
					]),
				_List_Nil)
			]));
};
var $author$project$Strangers1$View$changeBrickColor = function (brick) {
	var _v0 = brick.hitTime;
	if ((_v0.$ === 'Hit') && (!_v0.a)) {
		return brick.color;
	} else {
		return $author$project$Strangers1$View$backgroundColor;
	}
};
var $author$project$Strangers1$View$visualizeBrick = function (brick) {
	var alpha = function () {
		var _v0 = brick.hitTime;
		if ((_v0.$ === 'Hit') && (!_v0.a)) {
			return '1';
		} else {
			return '0';
		}
	}();
	return A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points(
				$author$project$Model$polyToString(brick.collision)),
				$elm$svg$Svg$Attributes$fill(
				$author$project$Model$colorToString(
					$author$project$Strangers1$View$changeBrickColor(brick))),
				$elm$svg$Svg$Attributes$opacity(alpha)
			]),
		_List_Nil);
};
var $author$project$Strangers1$View$visualizeCanvas = function (model) {
	var rt = A2($author$project$Model$Point, model.canvas.w, 0);
	var rb = A2($author$project$Model$Point, model.canvas.w, model.canvas.h);
	var lt = A2($author$project$Model$Point, 0, 0);
	var lb = A2($author$project$Model$Point, 0, model.canvas.h);
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('15')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('10')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 255, 255, 255))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 0, 0, 0))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur_in1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil)
			]));
};
var $author$project$Strangers1$View$visualizePaddle = function (paddle) {
	var w = 2 * ((paddle.r + paddle.h) + 1);
	var h = (2 * paddle.r) * $elm$core$Basics$cos(paddle.angle);
	var pos_ = {x: paddle.pos.x, y: paddle.pos.y - h};
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$mask,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('mask_')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$polygon,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$points(
										$author$project$Model$polyToString(
											A3($author$project$Model$posToPoly, w, h, pos_))),
										$elm$svg$Svg$Attributes$fill(
										$author$project$Model$colorToString(paddle.color))
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$mask('url(#mask_)')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(paddle.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(paddle.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(paddle.r + paddle.h)),
						$elm$svg$Svg$Attributes$fillOpacity('0'),
						$elm$svg$Svg$Attributes$stroke(
						$author$project$Model$colorToString(paddle.color)),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromFloat(paddle.h))
					]),
				_List_Nil)
			]));
};
var $author$project$Strangers1$View$visualizeGame = F2(
	function (model, opacity) {
		var elements = A2(
			$elm$core$List$cons,
			$author$project$Strangers1$View$visualizeCanvas(model),
			A2(
				$elm$core$List$cons,
				$author$project$Strangers1$View$visualizePaddle(
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Tools$dummyPaddle,
						$elm$core$List$head(model.paddle))),
				_Utils_ap(
					A2($elm$core$List$map, $author$project$Strangers1$View$visualizeBrick, model.bricks),
					_Utils_ap(
						A2($elm$core$List$map, $author$project$Strangers1$View$visualizeBall, model.ball),
						A2(
							$elm$core$List$map,
							$author$project$Strangers1$View$visualizeBall,
							A2(
								$elm$core$Maybe$withDefault,
								_List_fromArray(
									[$author$project$Tools$dummyBall]),
								$elm$core$List$tail(model.ball)))))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'opacity', opacity)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$version('1.1'),
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y('0'),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromFloat(model.canvas.w) + (' ' + $elm$core$String$fromFloat(model.canvas.h))))
						]),
					elements)
				]));
	});
var $author$project$Strangers1$View$visualizePrepare = function (model) {
	var alphaSub = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeInSub').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeIn').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString($author$project$Strangers1$View$backgroundColor)),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$AnimationPreparePost])) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '55%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(alphaSub))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('It was a night when they were returning from work, '),
						A2($elm$html$Html$br, _List_Nil, _List_Nil),
						$elm$html$Html$text('yet ended up in a bar. ')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '30%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(alpha))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Strangers')
					]))
			]));
};
var $author$project$Strangers1$View$visualize = function (model) {
	var alpha = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Prepare':
				return '1';
			case 'Running':
				return '1';
			case 'Paused':
				return '1';
			case 'Pass':
				return '1';
			case 'AnimationPass':
				return $elm$core$String$fromFloat(
					A2($author$project$Tools$getState, model.state, 'fadeOut').value);
			default:
				return '0';
		}
	}();
	var _v0 = model.size;
	var w = _v0.a;
	var h = _v0.b;
	var r = (_Utils_cmp(w / h, model.canvas.w / model.canvas.h) > 0) ? A2($elm$core$Basics$min, 1, h / model.canvas.h) : A2($elm$core$Basics$min, 1, w / model.canvas.w);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Model$colorToString($author$project$Strangers1$View$backgroundColor))
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromFloat(model.canvas.w) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'height',
							$elm$core$String$fromFloat(model.canvas.h) + 'px'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat((w - (model.canvas.w * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat((h - (model.canvas.h * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString($author$project$Strangers1$View$backgroundColor))
						]),
					_List_fromArray(
						[
							A2($author$project$Strangers1$View$visualizeGame, model, alpha)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString($author$project$Strangers1$View$backgroundColor)),
							A2($elm$html$Html$Attributes$style, 'background-position', 'center')
						]),
					_List_fromArray(
						[
							$author$project$Strangers1$View$visualizePrepare(model),
							$author$project$BasicView$visualizeBlock(model)
						]))
				]),
			(!A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$Lose, $author$project$Messages$AnimationPrepare]))) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('audio1'),
							$elm$html$Html$Attributes$src('Strangers - Paper Airplane.mp3'),
							$elm$html$Html$Attributes$autoplay(true),
							$elm$html$Html$Attributes$preload('True'),
							$elm$html$Html$Attributes$loop(true)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Strangers1$Init$init = function () {
	var state = _List_fromArray(
		[
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeIn, 0, 0.4, 0)),
			loop: false,
			name: 'fadeIn',
			t: 0,
			value: 0
		},
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeInSub, 0.5, 0.5, 0)),
			loop: false,
			name: 'fadeInSub',
			t: 0,
			value: 0
		}
		]);
	var canvas = {h: 600, w: 400};
	var paddle = function () {
		var r = 60;
		var h = 3;
		var angle = (40 * $elm$core$Basics$pi) / 180;
		var pos = A2(
			$author$project$Model$Point,
			canvas.w / 2,
			((canvas.h + (r * $elm$core$Basics$cos(angle))) - 5) - r);
		return _Utils_update(
			$author$project$Tools$dummyPaddle,
			{
				angle: angle,
				block: $author$project$Tools$dummyBlock,
				collision: A5($author$project$Tools$getPaddleColl, pos, r, h, angle, 16),
				color: A3($author$project$Model$rgb, 255, 255, 255),
				h: h,
				pos: pos,
				r: r
			});
	}();
	var bricks = function () {
		var brickInfo = {
			breath: 5,
			brick: {h: 39, w: 39},
			canvas: canvas,
			color: A3($author$project$Model$rgb, 100, 100, 100),
			layout: {x: 8, y: 3},
			offset: A2($author$project$Model$Point, 0, -10)
		};
		return $author$project$Tools$newBricks(brickInfo);
	}();
	var ball2 = function () {
		var v = A2($author$project$Model$Point, 0, 0);
		var r = 10;
		var pos = A2($author$project$Model$Point, canvas.w / 2, canvas.h / 5);
		return _Utils_update(
			$author$project$Tools$dummyBall,
			{
				active: true,
				collision: $author$project$Tools$dummyPoly,
				color: A3($author$project$Model$rgb, 244, 244, 244),
				pos: pos,
				r: r,
				v: v
			});
	}();
	var ball = function () {
		var v = A2($author$project$Model$Point, 0.2, -3.0);
		var r = 10;
		var pos = A2($author$project$Model$Point, canvas.w / 2, ((paddle.pos.y - paddle.r) - paddle.h) - r);
		return _Utils_update(
			$author$project$Tools$dummyBall,
			{
				active: true,
				collision: $author$project$Tools$getBallColl(
					_Utils_Tuple3(pos, r, 16)),
				color: A3($author$project$Model$rgb, 244, 244, 244),
				pos: pos,
				r: r,
				v: v
			});
	}();
	var model = _Utils_update(
		$author$project$Tools$dummyModel,
		{
			activeInput: true,
			animateState: $author$project$Model$AniIn,
			ball: _List_fromArray(
				[ball, ball2]),
			bricks: bricks,
			canvas: canvas,
			clock: 0,
			gameLevel: $author$project$Messages$Strangers1,
			gameStatus: $author$project$Messages$AnimationPrepare,
			paddle: _List_fromArray(
				[paddle]),
			size: _Utils_Tuple2(canvas.w, canvas.h),
			state: state
		});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				visualization: $author$project$Strangers1$View$visualize(model)
			}),
		A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
}();
var $author$project$Tools$pos2blockL = F2(
	function (pos, object) {
		var y = pos.y;
		var x = pos.x;
		var w = (object.w / 2) + 3.51;
		var h = (object.h / 2) + 3.51;
		return A2(
			$author$project$Model$Block,
			A2($author$project$Model$Point, x - w, y - h),
			A2($author$project$Model$Point, x + w, y + h));
	});
var $author$project$Strangers4$View$backgroundColor = A3($author$project$Model$rgb, 177, 177, 177);
var $author$project$Strangers4$View$backgroundColor_ = function (model) {
	var state = $elm$core$List$isEmpty(model.state) ? _Utils_update(
		$author$project$Tools$dummyState,
		{t: 1}) : A2($author$project$Tools$getState, model.state, 'fadeInSub');
	var color = A3(
		$author$project$Bezier$bezierColor,
		A3($author$project$Model$rgb, 198, 185, 169),
		$author$project$Strangers4$View$backgroundColor,
		state.t);
	return _Utils_eq(model.gameStatus, $author$project$Messages$AnimationPrepare) ? color : $author$project$Strangers4$View$backgroundColor;
};
var $author$project$Strangers4$View$visualizeBall = function (ball) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('4')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('3')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r * 2.5)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 200, 200, 200))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur)'),
						$elm$svg$Svg$Attributes$opacity('0.5')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(ball.color)),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur_in)')
					]),
				_List_Nil)
			]));
};
var $author$project$Strangers4$State$endColor0 = A3($author$project$Model$rgb, 0, 79, 102);
var $author$project$Strangers4$View$changeBrickColor = function (brick) {
	var _v0 = brick.hitTime;
	if (_v0.$ === 'Hit') {
		if (!_v0.a) {
			return $author$project$Strangers4$State$endColor0;
		} else {
			return brick.color;
		}
	} else {
		return $author$project$Strangers4$View$backgroundColor;
	}
};
var $author$project$Strangers4$View$visualizeBrick = function (brick) {
	return A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points(
				$author$project$Model$polyToString(brick.collision)),
				$elm$svg$Svg$Attributes$fill(
				$author$project$Model$colorToString(
					$author$project$Strangers4$View$changeBrickColor(brick)))
			]),
		_List_Nil);
};
var $author$project$Strangers4$View$visualizeCanvas = function (model) {
	var rt = A2($author$project$Model$Point, model.canvas.w, 0);
	var rb = A2($author$project$Model$Point, model.canvas.w, model.canvas.h);
	var lt = A2($author$project$Model$Point, 0, 0);
	var lb = A2($author$project$Model$Point, 0, model.canvas.h);
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('15')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$filter,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Gaussian_Blur_in1')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$feGaussianBlur,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$in_('SourceGraphic'),
										$elm$svg$Svg$Attributes$stdDeviation('10')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(
							A3($author$project$Model$rgb, 255, 255, 255))),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(
							_List_fromArray(
								[lt, lb, rb, rt]))),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString($author$project$Strangers4$View$backgroundColor)),
						$elm$svg$Svg$Attributes$filter('url(#Gaussian_Blur_in1)'),
						$elm$svg$Svg$Attributes$opacity('1')
					]),
				_List_Nil)
			]));
};
var $author$project$Strangers4$View$visualizePaddle = function (paddle) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Model$polyToString(paddle.collision)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(paddle.color))
					]),
				_List_Nil)
			]));
};
var $author$project$Strangers4$View$visualizeStaticBall = function (ball) {
	return A2(
		$elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				A2($elm$svg$Svg$defs, _List_Nil, _List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(ball.pos.x)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(ball.pos.y)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(ball.r)),
						$elm$svg$Svg$Attributes$fill(
						$author$project$Model$colorToString(ball.color))
					]),
				_List_Nil)
			]));
};
var $author$project$Strangers4$View$visualizeGame = F2(
	function (model, opacity) {
		var elements = A2(
			$elm$core$List$cons,
			$author$project$Strangers4$View$visualizeCanvas(model),
			A2(
				$elm$core$List$cons,
				$author$project$Strangers4$View$visualizePaddle(
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Tools$dummyPaddle,
						$elm$core$List$head(model.paddle))),
				_Utils_ap(
					A2($elm$core$List$map, $author$project$Strangers4$View$visualizeBrick, model.bricks),
					_Utils_ap(
						_List_fromArray(
							[
								$author$project$Strangers4$View$visualizeBall(
								A2($author$project$Tools$getBall, model.ball, 1))
							]),
						A2(
							$elm$core$List$map,
							$author$project$Strangers4$View$visualizeStaticBall,
							A2($elm$core$List$drop, 7, model.ball))))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'opacity', opacity)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$version('1.1'),
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y('0'),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromFloat(model.canvas.w) + (' ' + $elm$core$String$fromFloat(model.canvas.h))))
						]),
					elements)
				]));
	});
var $author$project$Strangers4$View$visualizePrepare = function (model) {
	var alphaSub = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(model.state) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeInSub').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	var alpha = function () {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'AnimationPrepare':
				return $elm$core$List$isEmpty(
					A2(
						$elm$core$List$filter,
						function (s) {
							return s.name === 'fadeIn';
						},
						model.state)) ? 1 : A2($author$project$Tools$getState, model.state, 'fadeIn').value;
			case 'Prepare':
				return 1;
			case 'AnimationPreparePost':
				return A2($author$project$Tools$getState, model.state, 'fadeOut').value;
			default:
				return 0;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Model$colorToString(
					$author$project$Strangers4$View$backgroundColor_(model))),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$AnimationPreparePost])) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '55%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(alphaSub))
					]),
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$text('Mending hearts is a difficult job, especially those frozen hearts. '),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('Patience and companionship. That\'s all you need. ')
						]),
					(model.finished >= 6) ? _List_fromArray(
						[
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2(
							$elm$html$Html$i,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '18px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('[G] od mode recommended. ')
								]))
						]) : _List_Nil)),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '30%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '48px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Strangers')
					]))
			]));
};
var $author$project$Strangers4$View$visualize = function (model) {
	var alpha = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Prepare':
				return '1';
			case 'Running':
				return '1';
			case 'Paused':
				return '1';
			case 'AnimationPass':
				return $elm$core$String$fromFloat(
					A2($author$project$Tools$getState, model.state, 'fadeOut').value);
			case 'Pass':
				return '1';
			default:
				return '0';
		}
	}();
	var _v0 = model.size;
	var w = _v0.a;
	var h = _v0.b;
	var r = (_Utils_cmp(w / h, model.canvas.w / model.canvas.h) > 0) ? A2($elm$core$Basics$min, 1, h / model.canvas.h) : A2($elm$core$Basics$min, 1, w / model.canvas.w);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Model$colorToString(
					$author$project$Strangers4$View$backgroundColor_(model)))
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromFloat(model.canvas.w) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'height',
							$elm$core$String$fromFloat(model.canvas.h) + 'px'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat((w - (model.canvas.w * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat((h - (model.canvas.h * r)) / 2) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Strangers4$View$backgroundColor_(model)))
						]),
					_List_fromArray(
						[
							A2($author$project$Strangers4$View$visualizeGame, model, alpha)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'background-color',
							$author$project$Model$colorToString(
								$author$project$Strangers4$View$backgroundColor_(model))),
							A2($elm$html$Html$Attributes$style, 'background-position', 'center')
						]),
					_List_fromArray(
						[
							$author$project$Strangers4$View$visualizePrepare(model),
							$author$project$BasicView$visualizeBlock(model)
						]))
				]),
			(!A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$Lose]))) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('StrangersII - The Blower\'s Daughter.mp3'),
							$elm$html$Html$Attributes$id('audio4'),
							$elm$html$Html$Attributes$autoplay(true),
							$elm$html$Html$Attributes$preload('True'),
							$elm$html$Html$Attributes$loop(false)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Strangers4$Init$init = function () {
	var state = _List_fromArray(
		[
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeIn, 0, 0.4, 0)),
			loop: false,
			name: 'fadeIn',
			t: 0,
			value: 0
		},
			{
			_function: $author$project$Model$Func(
				A3($author$project$Fade$genFadeInSub, 0.5, 0.5, -0.003)),
			loop: false,
			name: 'fadeInSub',
			t: 0,
			value: 0
		}
		]);
	var canvas = {h: 510, w: 600};
	var paddle = function () {
		var wh = {h: 20.0, w: 100.0};
		var pos = A2($author$project$Model$Point, canvas.w / 2, canvas.h - (wh.h / 2));
		return {
			angle: 0,
			block: A2($author$project$Tools$pos2block, pos, wh),
			collision: A2($author$project$Tools$pos2coll, pos, wh),
			color: A3($author$project$Model$rgb, 255, 255, 255),
			h: wh.h,
			pos: pos,
			r: 0
		};
	}();
	var bricks = function () {
		var posInfo = _List_fromArray(
			[
				A2($author$project$Model$Point, 0, 0),
				A2($author$project$Model$Point, 1, 1),
				A2($author$project$Model$Point, 1, -1),
				A2($author$project$Model$Point, -1, 1),
				A2($author$project$Model$Point, -1, -1),
				A2($author$project$Model$Point, 0, 1),
				A2($author$project$Model$Point, 0, -1),
				A2($author$project$Model$Point, 1, 0),
				A2($author$project$Model$Point, -1, 0)
			]);
		var hi = {
			breath: 1,
			brick: {h: 50, w: 50},
			canvas: canvas,
			color: $author$project$Tools$dummyColor,
			offset: A2($author$project$Model$Point, 0, -51)
		};
		return A2(
			$elm$core$List$map,
			function (p) {
				return A5(
					$author$project$Model$Brick,
					p,
					A2($author$project$Tools$pos2coll, p, hi.brick),
					A2($author$project$Tools$pos2blockL, p, hi.brick),
					$author$project$Model$Hit(0),
					hi.color);
			},
			A2(
				$elm$core$List$map,
				function (p) {
					return A2($author$project$Model$Point, (((hi.brick.w + hi.breath) * p.x) + (hi.canvas.w / 2)) + hi.offset.x, (((hi.brick.h + hi.breath) * p.y) + (hi.canvas.h / 2)) + hi.offset.y);
				},
				posInfo));
	}();
	var ball = function () {
		var v = A2($author$project$Model$Point, 3.5, -3.5);
		var r = 10;
		var pos = A2($author$project$Model$Point, canvas.w / 2, ((paddle.pos.y - paddle.r) - paddle.h) - r);
		return {
			active: true,
			collision: $author$project$Tools$getBallColl(
				_Utils_Tuple3(pos, r, 16)),
			color: A3($author$project$Model$rgb, 244, 244, 244),
			pos: pos,
			r: r,
			v: v
		};
	}();
	var model = _Utils_update(
		$author$project$Tools$dummyModel,
		{
			activeInput: true,
			animateState: $author$project$Model$AniIn,
			ball: _List_fromArray(
				[ball]),
			bricks: bricks,
			canvas: canvas,
			clock: 0,
			gameLevel: $author$project$Messages$Strangers4,
			gameStatus: $author$project$Messages$AnimationPrepare,
			paddle: _List_fromArray(
				[paddle]),
			size: _Utils_Tuple2(canvas.w, canvas.h),
			state: state
		});
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				visualization: $author$project$Strangers4$View$visualize(model)
			}),
		A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
}();
var $author$project$Main$reInit = function (model) {
	var _v0 = function () {
		var _v1 = model.gameLevel;
		switch (_v1.$) {
			case 'Strangers1':
				return $author$project$Strangers1$Init$init;
			case 'Friends2':
				return $author$project$Friends2$Init$init;
			case 'Lovers3':
				return $author$project$Lovers3$Init$init;
			case 'Strangers4':
				return $author$project$Strangers4$Init$init;
			case 'Companions5':
				return $author$project$Companions5$Init$init;
			case 'Death6':
				return $author$project$Death6$Init$init;
			case 'End7':
				return _Utils_Tuple2(
					function (m) {
						return _Utils_update(
							m,
							{visualization: model.visualization});
					}($author$project$End7$Init$init.a),
					A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
			default:
				return $author$project$Start0$Init$init;
		}
	}();
	var model_ = _v0.a;
	var task = _v0.b;
	return _Utils_Tuple2(
		_Utils_update(
			model_,
			{finished: model.finished, god: model.god}),
		task);
};
var $author$project$Messages$Left = {$: 'Left'};
var $author$project$Messages$Right = {$: 'Right'};
var $author$project$Messages$Running = function (a) {
	return {$: 'Running', a: a};
};
var $author$project$Messages$Stay = {$: 'Stay'};
var $author$project$Fade$fadeOut = F2(
	function (model, t) {
		var val = (t < 0.4) ? 1 : (((t >= 0.4) && (t <= 0.7)) ? ((0.7 - t) / 0.3) : 0);
		var _v0 = A2($author$project$Tools$divState, model.state, 'fadeOut');
		var s_ = _v0.a;
		var state_ = _v0.b;
		var state = function () {
			var _v1 = t > 1;
			if (!_v1) {
				return A2(
					$elm$core$List$cons,
					_Utils_update(
						s_,
						{value: val}),
					state_);
			} else {
				return state_;
			}
		}();
		return _Utils_update(
			model,
			{state: state});
	});
var $author$project$Companions5$State$getEndState = function (model) {
	var s = {
		_function: $author$project$Model$Func($author$project$Fade$fadeOut),
		loop: false,
		name: 'fadeOut',
		t: 0,
		value: 1
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s])
		});
};
var $author$project$Companions5$State$getPrepareState = function (model) {
	return $author$project$Companions5$State$getEndState(model);
};
var $author$project$CollisionBlock$Safe = {$: 'Safe'};
var $author$project$CollisionBlock$Corner = {$: 'Corner'};
var $author$project$CollisionBlock$block_corner = F2(
	function (ball, block) {
		var width = block.rb.x - block.lt.x;
		var height = block.rb.y - block.lt.y;
		var by = (block.rb.y + block.lt.y) / 2;
		var bx = (block.rb.x + block.lt.x) / 2;
		return ((_Utils_cmp(
			(((-1) * ball.v.y) / $elm$core$Basics$abs(ball.v.y)) * (ball.pos.y - by),
			height / 2) > 0) && ((_Utils_cmp(
			(((-1) * ball.v.y) / $elm$core$Basics$abs(ball.v.y)) * (ball.pos.y - by),
			(ball.r / 3) + (height / 2)) < 0) && ((_Utils_cmp(
			(((-1) * ball.v.x) / $elm$core$Basics$abs(ball.v.x)) * (ball.pos.x - bx),
			width / 2) > 0) && (_Utils_cmp(
			(((-1) * ball.v.x) / $elm$core$Basics$abs(ball.v.x)) * (ball.pos.x - bx),
			(ball.r / 3) + (width / 2)) < 0)))) ? $author$project$CollisionBlock$Corner : $author$project$CollisionBlock$Safe;
	});
var $author$project$CollisionBlock$X = {$: 'X'};
var $author$project$CollisionBlock$block_x = F2(
	function (ball, block) {
		var rb = block.rb;
		var lt = block.lt;
		return ((((ball.v.x > 0) && ((_Utils_cmp(lt.x + ball.r, ball.pos.x) > -1) && (_Utils_cmp(lt.x - ball.pos.x, ball.r) < 1))) || ((ball.v.x < 0) && ((_Utils_cmp(rb.x - ball.r, ball.pos.x) < 1) && (_Utils_cmp(rb.x - ball.pos.x, -ball.r) > -1)))) && ((_Utils_cmp(ball.pos.y, lt.y) > 0) && (_Utils_cmp(ball.pos.y, rb.y) < 0))) ? $author$project$CollisionBlock$X : $author$project$CollisionBlock$Safe;
	});
var $author$project$CollisionBlock$Y = {$: 'Y'};
var $author$project$CollisionBlock$block_y = F2(
	function (ball, block) {
		var rb = block.rb;
		var lt = block.lt;
		return ((((ball.v.y > 0) && ((_Utils_cmp(ball.pos.y - lt.y, ball.r) < 1) && (_Utils_cmp(ball.pos.y + ball.r, lt.y) > -1))) || ((ball.v.y < 0) && ((_Utils_cmp(ball.pos.y - rb.y, -ball.r) > -1) && (_Utils_cmp(ball.pos.y - ball.r, rb.y) < 1)))) && ((_Utils_cmp(ball.pos.x, rb.x) < 0) && (_Utils_cmp(ball.pos.x, lt.x) > 0))) ? $author$project$CollisionBlock$Y : $author$project$CollisionBlock$Safe;
	});
var $author$project$CollisionBlock$xyToCorner = F2(
	function (hit_x, hit_y) {
		var _v0 = _Utils_Tuple2(hit_x, hit_y);
		_v0$1:
		while (true) {
			_v0$4:
			while (true) {
				_v0$6:
				while (true) {
					switch (_v0.a.$) {
						case 'Corner':
							var _v1 = _v0.a;
							return $author$project$CollisionBlock$Corner;
						case 'X':
							switch (_v0.b.$) {
								case 'Corner':
									break _v0$1;
								case 'X':
									break _v0$4;
								case 'Y':
									var _v3 = _v0.a;
									var _v4 = _v0.b;
									return $author$project$CollisionBlock$Corner;
								default:
									break _v0$4;
							}
						case 'Y':
							switch (_v0.b.$) {
								case 'Corner':
									break _v0$1;
								case 'X':
									var _v5 = _v0.a;
									var _v6 = _v0.b;
									return $author$project$CollisionBlock$Corner;
								case 'Y':
									break _v0$6;
								default:
									break _v0$6;
							}
						default:
							switch (_v0.b.$) {
								case 'Corner':
									break _v0$1;
								case 'X':
									var _v8 = _v0.b;
									return $author$project$CollisionBlock$X;
								case 'Y':
									var _v10 = _v0.b;
									return $author$project$CollisionBlock$Y;
								default:
									return $author$project$CollisionBlock$Safe;
							}
					}
				}
				var _v9 = _v0.a;
				return $author$project$CollisionBlock$Y;
			}
			var _v7 = _v0.a;
			return $author$project$CollisionBlock$X;
		}
		var _v2 = _v0.b;
		return $author$project$CollisionBlock$Corner;
	});
var $author$project$CollisionBlock$block_black_box_hit = F2(
	function (ball, block) {
		var hit_y = A2($author$project$CollisionBlock$block_y, ball, block);
		var hit_x = A2($author$project$CollisionBlock$block_x, ball, block);
		var hit_corner = A2($author$project$CollisionBlock$block_corner, ball, block);
		var hit = function () {
			if (hit_corner.$ === 'Corner') {
				return $author$project$CollisionBlock$Corner;
			} else {
				return A2($author$project$CollisionBlock$xyToCorner, hit_x, hit_y);
			}
		}();
		return hit;
	});
var $author$project$CollisionBlock$ball_direction = F2(
	function (ball, box) {
		var init = $author$project$CollisionBlock$Safe;
		var hit = F2(
			function (block, status) {
				hit:
				while (true) {
					var tmp = $elm$core$List$head(block);
					var next_tmp = $elm$core$List$tail(block);
					if (next_tmp.$ === 'Just') {
						var tail = next_tmp.a;
						if (tmp.$ === 'Just') {
							var head = tmp.a;
							var _v2 = head.hitTime;
							if ((_v2.$ === 'Hit') && (!_v2.a)) {
								return A2(
									$author$project$CollisionBlock$xyToCorner,
									status,
									A2(
										hit,
										tail,
										A2($author$project$CollisionBlock$block_black_box_hit, ball, head.block)));
							} else {
								var $temp$block = tail,
									$temp$status = status;
								block = $temp$block;
								status = $temp$status;
								continue hit;
							}
						} else {
							return status;
						}
					} else {
						if (tmp.$ === 'Just') {
							var head = tmp.a;
							var _v4 = head.hitTime;
							if ((_v4.$ === 'Hit') && (!_v4.a)) {
								return A2(
									$author$project$CollisionBlock$xyToCorner,
									status,
									A2(
										hit,
										_List_Nil,
										A2($author$project$CollisionBlock$block_black_box_hit, ball, head.block)));
							} else {
								return status;
							}
						} else {
							return status;
						}
					}
				}
			});
		return A2(hit, box, init);
	});
var $author$project$CollisionBlock$block_black_box_hitTime = F2(
	function (ball, block) {
		var hit = A2($author$project$CollisionBlock$block_black_box_hit, ball, block);
		var hit_time = function () {
			if (hit.$ === 'Safe') {
				return $author$project$Model$Hit(0);
			} else {
				return $author$project$Model$Hit(1);
			}
		}();
		return hit_time;
	});
var $author$project$CollisionBlock$basic_hit = function (model) {
	var now_bricks = model.bricks;
	var now_ball2 = A2($author$project$Tools$getBall, model.ball, 2);
	var now_ball1 = A2($author$project$Tools$getBall, model.ball, 1);
	var status = A2($author$project$CollisionBlock$ball_direction, now_ball1, now_bricks);
	return _Utils_update(
		model,
		{
			ball: _List_fromArray(
				[
					_Utils_update(
					now_ball1,
					{
						v: function () {
							switch (status.$) {
								case 'Safe':
									return now_ball1.v;
								case 'X':
									return {x: -now_ball1.v.x, y: now_ball1.v.y};
								case 'Y':
									return {x: now_ball1.v.x, y: -now_ball1.v.y};
								default:
									return {x: -now_ball1.v.x, y: -now_ball1.v.y};
							}
						}()
					}),
					now_ball2
				]),
			bricks: A2(
				$elm$core$List$map,
				function (a) {
					var _v1 = a.hitTime;
					if ((_v1.$ === 'Hit') && (!_v1.a)) {
						return _Utils_update(
							a,
							{
								hitTime: A2($author$project$CollisionBlock$block_black_box_hitTime, now_ball1, a.block)
							});
					} else {
						return a;
					}
				},
				now_bricks)
		});
};
var $author$project$Companions5$Update$moveBall = function (model) {
	var done = function (ball) {
		var v = ball.v;
		var setPos = F3(
			function (npos, ncoll, ball_) {
				return _Utils_update(
					ball_,
					{collision: ncoll, pos: npos});
			});
		var pos = ball.pos;
		var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
		var coll = A2(
			$elm$core$List$map,
			function (pt) {
				return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
			},
			ball.collision);
		return A3(setPos, newPos, coll, ball);
	};
	return _Utils_update(
		model,
		{
			ball: A2($elm$core$List$map, done, model.ball)
		});
};
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $author$project$Companions5$Update$movePaddle = F2(
	function (op, model) {
		var paddle2 = A2($author$project$Tools$getPaddle, model.paddle, 2);
		var paddle1 = A2($author$project$Tools$getPaddle, model.paddle, 1);
		var distance = F2(
			function (p1, p2) {
				return $elm$core$Basics$sqrt(
					A2($elm$core$Basics$pow, p1.x - p2.x, 2) + A2($elm$core$Basics$pow, p1.y - p2.y, 2));
			});
		var ball = A2($author$project$Tools$getBall, model.ball, 1);
		var vNorm = function () {
			var _v3 = (_Utils_cmp(
				(ball.r + paddle1.r) - 1,
				A2(distance, ball.pos, paddle1.pos)) < 0) || (_Utils_cmp(
				(ball.r + paddle2.r) - 1,
				A2(distance, ball.pos, paddle2.pos)) < 0);
			if (_v3) {
				return 6;
			} else {
				return 1;
			}
		}();
		var done = function (paddle) {
			var pos = paddle.pos;
			var v = function () {
				switch (op.$) {
					case 'Left':
						var _v1 = pos.x > 18;
						if (_v1) {
							return A2($author$project$Model$Point, -vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					case 'Right':
						var _v2 = _Utils_cmp(pos.x, model.canvas.w - 18) < 0;
						if (_v2) {
							return A2($author$project$Model$Point, vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					default:
						return A2($author$project$Model$Point, 0, 0);
				}
			}();
			var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
			var col = A2(
				$elm$core$List$map,
				function (pt) {
					return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
				},
				paddle.collision);
			return _Utils_update(
				paddle,
				{collision: col, pos: newPos});
		};
		return _Utils_update(
			model,
			{
				paddle: A2($elm$core$List$map, done, model.paddle)
			});
	});
var $author$project$Tools$combine = F2(
	function (a, b) {
		return {x: b.x + a.x, y: b.y + a.y};
	});
var $author$project$Tools$dot = F2(
	function (v1, v2) {
		return (v1.x * v2.x) + (v1.y * v2.y);
	});
var $author$project$Tools$distance = F2(
	function (p1, p2) {
		return $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, p1.x - p2.x, 2) + A2($elm$core$Basics$pow, p1.y - p2.y, 2));
	});
var $author$project$Tools$norm = $author$project$Tools$distance(
	A2($author$project$Model$Point, 0, 0));
var $author$project$Tools$scale = F2(
	function (t, v) {
		return A2($author$project$Model$Point, t * v.x, t * v.y);
	});
var $author$project$Tools$normalize = function (p) {
	return A2(
		$author$project$Tools$scale,
		1 / $author$project$Tools$norm(p),
		p);
};
var $author$project$Tools$vector = F2(
	function (a, b) {
		return {x: b.x - a.x, y: b.y - a.y};
	});
var $author$project$CollisionPoly$ballCheck = F2(
	function (paddle, ball) {
		var tar = A2($author$project$Tools$vector, paddle.pos, ball.pos);
		var dir = ball.v;
		var projection = A2($author$project$Tools$dot, dir, tar) / $author$project$Tools$norm(tar);
		var breath = 4;
		var blood = ((-projection) * 3) / 4;
		var dir_ = function () {
			if (_Utils_cmp(
				$author$project$Tools$norm(tar),
				((paddle.r + paddle.h) + ball.r) + blood) > 0) {
				return dir;
			} else {
				if (_Utils_cmp(
					$author$project$Tools$norm(tar),
					(paddle.r + ball.r) - breath) < 1) {
					return A2(
						$author$project$Tools$scale,
						$author$project$Tools$norm(dir),
						$author$project$Tools$normalize(tar));
				} else {
					if (projection < 0) {
						var t = (-2) * projection;
						var offset = A2(
							$author$project$Tools$scale,
							t,
							$author$project$Tools$normalize(tar));
						return A2($author$project$Tools$combine, dir, offset);
					} else {
						return dir;
					}
				}
			}
		}();
		var pos_ = (_Utils_cmp(
			$author$project$Tools$norm(tar),
			(paddle.r + ball.r) - breath) < 1) ? A2(
			$author$project$Tools$combine,
			paddle.pos,
			A2(
				$author$project$Tools$scale,
				(((paddle.r + paddle.h) + ball.r) + blood) + breath,
				$author$project$Tools$normalize(tar))) : ball.pos;
		return _Utils_update(
			ball,
			{pos: pos_, v: dir_});
	});
var $author$project$CollisionPoly$paddleBall = function (model) {
	var ball = A2($author$project$Tools$getBall, model.ball, 1);
	var new_ball = A3($elm$core$List$foldl, $author$project$CollisionPoly$ballCheck, ball, model.paddle);
	return _Utils_update(
		model,
		{
			ball: _Utils_ap(
				_List_fromArray(
					[new_ball]),
				A2($elm$core$List$drop, 1, model.ball))
		});
};
var $author$project$Companions5$Collision$wallCheck = function (model) {
	var old = A2($author$project$Tools$getBall, model.ball, 1);
	var pos = old.pos;
	var v = old.v;
	var vcBall = function () {
		var paddle2 = A2($author$project$Tools$getPaddle, model.paddle, 2);
		var paddle1 = A2($author$project$Tools$getPaddle, model.paddle, 1);
		var ball = A2($author$project$Tools$getBall, model.ball, 1);
		var _v1 = ((pos.y <= 0) && ((v.y < 0) && model.god)) || (((_Utils_cmp(pos.y, model.canvas.h - 10) > -1) && ((v.y > 0) && model.god)) || (((_Utils_cmp(
			(ball.r + paddle1.r) - 1,
			A2($author$project$Tools$distance, ball.pos, paddle1.pos)) > 0) && (v.y > 0)) || ((_Utils_cmp(
			(ball.r + paddle2.r) - 1,
			A2($author$project$Tools$distance, ball.pos, paddle2.pos)) > 0) && (v.y < 0))));
		if (_v1) {
			return function (b) {
				return _Utils_update(
					b,
					{
						v: A2($author$project$Model$Point, v.x, -v.y)
					});
			};
		} else {
			return $elm$core$Basics$identity;
		}
	}();
	var hcBall = function () {
		var _v0 = ((pos.x <= 10) && (v.x < 0)) || ((_Utils_cmp(pos.x, model.canvas.w - 10) > -1) && (v.x > 0));
		if (_v0) {
			return function (b) {
				return _Utils_update(
					b,
					{
						v: A2($author$project$Model$Point, -v.x, v.y)
					});
			};
		} else {
			return $elm$core$Basics$identity;
		}
	}();
	return _Utils_update(
		model,
		{
			ball: _List_fromArray(
				[
					vcBall(
					hcBall(old)),
					A2($author$project$Tools$getBall, model.ball, 2)
				])
		});
};
var $author$project$Companions5$Update$winJudge = function (model) {
	var change_brick = function (brick) {
		var _v2 = brick.hitTime;
		if ((_v2.$ === 'Hit') && (_v2.a === 1)) {
			return _Utils_update(
				brick,
				{color: $author$project$Companions5$View$backgroundColor, hitTime: $author$project$Model$NoMore});
		} else {
			return brick;
		}
	};
	var brick_all = A2($elm$core$List$map, change_brick, model.bricks);
	var ball = A2($author$project$Tools$getBall, model.ball, 1);
	var win = function () {
		var _v0 = $elm$core$List$isEmpty(
			A2(
				$elm$core$List$filter,
				function (b) {
					return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
				},
				brick_all));
		if (_v0) {
			return $author$project$Messages$Pass;
		} else {
			var _v1 = (_Utils_cmp(ball.pos.y, model.canvas.h + 20) > 0) || (_Utils_cmp(ball.pos.y, -20) < 0);
			if (_v1) {
				return $author$project$Messages$Lose;
			} else {
				return model.gameStatus;
			}
		}
	}();
	return _Utils_update(
		model,
		{bricks: brick_all, gameStatus: win});
};
var $author$project$Companions5$Update$exec = function (model) {
	var dir = function () {
		var _v0 = model.gameStatus;
		if (_v0.$ === 'Running') {
			var dr = _v0.a;
			return dr;
		} else {
			return $author$project$Messages$Stay;
		}
	}();
	return $author$project$Companions5$Update$winJudge(
		$author$project$Companions5$Collision$wallCheck(
			$author$project$CollisionPoly$paddleBall(
				A2(
					$author$project$Companions5$Update$movePaddle,
					dir,
					$author$project$CollisionBlock$basic_hit(
						$author$project$Companions5$Update$moveBall(model))))));
};
var $author$project$Companions5$Update$move = F2(
	function (elapsed, model) {
		var interval = 15;
		var elapsed_ = model.clock + elapsed;
		return (_Utils_cmp(elapsed_, interval) > 0) ? $author$project$Companions5$Update$exec(
			_Utils_update(
				model,
				{clock: elapsed_ - interval})) : _Utils_update(
			model,
			{clock: elapsed_});
	});
var $author$project$Companions5$State$getGameState = function (model) {
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[$author$project$Tools$dummyState])
		});
};
var $author$project$Companions5$State$loopState = F2(
	function (state, t) {
		var _v0 = state.loop;
		if (_v0) {
			return (state.loop && (state.t < 1)) ? _Utils_update(
				state,
				{t: state.t + t}) : _Utils_update(
				state,
				{t: state.t - 1});
		} else {
			return _Utils_update(
				state,
				{t: state.t + t});
		}
	});
var $author$project$Companions5$State$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.state);
	if (_v0) {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return _Utils_update(
					model,
					{gameStatus: $author$project$Messages$Prepare});
			case 'AnimationPreparePost':
				var model1 = $author$project$Companions5$State$getGameState(model);
				return _Utils_update(
					model1,
					{
						gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
					});
			case 'AnimationPass':
				return _Utils_update(
					model,
					{gameLevel: $author$project$Messages$Death6, gameStatus: $author$project$Messages$ChangeLevel});
			default:
				return model;
		}
	} else {
		var state = model.state;
		var newState = A2(
			$elm$core$List$map,
			function (s) {
				return A2($author$project$Companions5$State$loopState, s, 0.007);
			},
			state);
		var getFunc = function (_v2) {
			var func = _v2.a;
			return func;
		};
		var setModel = F2(
			function (stat, model_) {
				return A2(
					getFunc(stat._function),
					model_,
					stat.t);
			});
		var newModel = A3(
			$elm$core$List$foldl,
			F2(
				function (x, y) {
					return A2(setModel, x, y);
				}),
			_Utils_update(
				model,
				{state: newState}),
			newState);
		return newModel;
	}
};
var $author$project$Companions5$Update$update = F2(
	function (msg, model) {
		var model0 = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Paused':
					_v1$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Space':
										var _v2 = msg.a;
										return _Utils_update(
											model,
											{
												gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
											});
									case 'Key_R':
										var _v3 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v1$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v1$3;
						}
					}
					return model;
				case 'AnimationPrepare':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Companions5$State$stateIterate(model);
						case 'GetViewport':
							var viewport = msg.a.viewport;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(viewport.width, viewport.height)
								});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Prepare':
					_v5$2:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								if (msg.a.$ === 'Space') {
									var _v6 = msg.a;
									return $author$project$Companions5$State$getPrepareState(
										_Utils_update(
											model,
											{gameStatus: $author$project$Messages$AnimationPreparePost}));
								} else {
									break _v5$2;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v5$2;
						}
					}
					return model;
				case 'AnimationPreparePost':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Companions5$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Lose':
					_v8$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Key_R':
										var _v9 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									case 'Space':
										var _v10 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v8$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v8$3;
						}
					}
					return model;
				case 'Pass':
					var model1 = $author$project$Companions5$State$getEndState(model);
					return _Utils_update(
						model1,
						{finished: model.finished + 1, gameStatus: $author$project$Messages$AnimationPass});
				case 'AnimationPass':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Companions5$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'End':
					switch (msg.$) {
						case 'KeyDown':
							return _Utils_update(
								model,
								{gameLevel: $author$project$Messages$Strangers4, gameStatus: $author$project$Messages$AnimationPrepare});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Running':
					switch (msg.$) {
						case 'KeyDown':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return $author$project$Messages$Running($author$project$Messages$Left);
									case 'Key_Right':
										return $author$project$Messages$Running($author$project$Messages$Right);
									case 'Key_R':
										return $author$project$Messages$ChangeLevel;
									default:
										return $author$project$Messages$Paused;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'KeyUp':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Left)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									case 'Key_Right':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Right)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									default:
										return model.gameStatus;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'Tick':
							var time = msg.a;
							return $author$project$Companions5$State$stateIterate(
								A2(
									$author$project$Companions5$Update$move,
									A2($elm$core$Basics$min, time, 25),
									model));
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(
			_Utils_update(
				model0,
				{
					visualization: $author$project$Companions5$View$visualize(model0)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Fade$genFadeOut = F3(
	function (_break, interval, speedAdjust) {
		var fadeOut_ = F2(
			function (model, t) {
				var val = (_Utils_cmp(t, _break) < 0) ? 1 : (((_Utils_cmp(t, _break) > -1) && (_Utils_cmp(t, _break + interval) < 1)) ? (((_break + interval) - t) / interval) : 0);
				var _v0 = A2($author$project$Tools$divState, model.state, 'fadeOut');
				var s_ = _v0.a;
				var state_ = _v0.b;
				var state = function () {
					var _v1 = t > 1;
					if (!_v1) {
						return A2(
							$elm$core$List$cons,
							_Utils_update(
								s_,
								{t: s_.t + speedAdjust, value: val}),
							state_);
					} else {
						return state_;
					}
				}();
				return _Utils_update(
					model,
					{state: state});
			});
		return fadeOut_;
	});
var $author$project$Death6$State$getEndState = function (model) {
	var s = {
		_function: $author$project$Model$Func(
			A3($author$project$Fade$genFadeOut, 0, 1, -0.001)),
		loop: false,
		name: 'fadeOut',
		t: 0,
		value: 0
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s])
		});
};
var $author$project$Death6$State$getPassState = function (model) {
	return $author$project$Death6$State$getEndState(model);
};
var $author$project$Death6$State$getPrepareState = function (model) {
	return $author$project$Death6$State$getEndState(model);
};
var $author$project$Death6$Update$moveBall = function (model) {
	var done = function (ball) {
		var v = ball.v;
		var setPos = F3(
			function (npos, ncoll, ball_) {
				return _Utils_update(
					ball_,
					{collision: ncoll, pos: npos});
			});
		var pos = ball.pos;
		var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
		var coll = A2(
			$elm$core$List$map,
			function (pt) {
				return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
			},
			ball.collision);
		return A3(setPos, newPos, coll, ball);
	};
	return _Utils_update(
		model,
		{
			ball: A2($elm$core$List$map, done, model.ball)
		});
};
var $author$project$Death6$Update$movePaddle = F2(
	function (op, model) {
		var done = function (paddle) {
			var vNorm = 3;
			var pos = paddle.pos;
			var v = function () {
				switch (op.$) {
					case 'Left':
						var _v1 = pos.x > 18;
						if (_v1) {
							return A2($author$project$Model$Point, -vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					case 'Right':
						var _v2 = _Utils_cmp(pos.x, model.canvas.w - 18) < 0;
						if (_v2) {
							return A2($author$project$Model$Point, vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					default:
						return A2($author$project$Model$Point, 0, 0);
				}
			}();
			var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
			var col = A2(
				$elm$core$List$map,
				function (pt) {
					return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
				},
				paddle.collision);
			var setPaddle = F2(
				function (npos, paddle_) {
					return _Utils_update(
						paddle_,
						{collision: col, pos: npos});
				});
			return A2(setPaddle, newPos, paddle);
		};
		return _Utils_update(
			model,
			{
				paddle: A2($elm$core$List$map, done, model.paddle)
			});
	});
var $author$project$CollisionPoly$wallCheck = function (model) {
	var old = A2($author$project$Tools$getBall, model.ball, 1);
	var pos = old.pos;
	var v = old.v;
	var vcBall = function () {
		var _v1 = ((pos.y <= 10) && (v.y < 0)) || ((_Utils_cmp(pos.y, model.canvas.h - 10) > -1) && ((v.y > 0) && model.god));
		if (_v1) {
			return function (b) {
				return _Utils_update(
					b,
					{
						v: A2($author$project$Model$Point, v.x, -v.y)
					});
			};
		} else {
			return $elm$core$Basics$identity;
		}
	}();
	var hcBall = function () {
		var _v0 = ((pos.x <= 10) && (v.x < 0)) || ((_Utils_cmp(pos.x, model.canvas.w - 10) > -1) && (v.x > 0));
		if (_v0) {
			return function (b) {
				return _Utils_update(
					b,
					{
						v: A2($author$project$Model$Point, -v.x, v.y)
					});
			};
		} else {
			return $elm$core$Basics$identity;
		}
	}();
	return _Utils_update(
		model,
		{
			ball: _Utils_ap(
				_List_fromArray(
					[
						vcBall(
						hcBall(old))
					]),
				A2($elm$core$List$drop, 1, model.ball))
		});
};
var $author$project$Death6$Update$winJudge = function (model) {
	var change_brick = function (brick) {
		var _v2 = brick.hitTime;
		if ((_v2.$ === 'Hit') && (_v2.a === 1)) {
			return _Utils_update(
				brick,
				{color: $author$project$Death6$View$backgroundColor, hitTime: $author$project$Model$NoMore});
		} else {
			return brick;
		}
	};
	var brick_all = A2($elm$core$List$map, change_brick, model.bricks);
	var ball = A2($author$project$Tools$getBall, model.ball, 1);
	var win = function () {
		var _v0 = _Utils_cmp(ball.pos.y, model.canvas.h + 20) > 0;
		if (_v0) {
			return $author$project$Messages$Lose;
		} else {
			var _v1 = $elm$core$List$isEmpty(
				A2(
					$elm$core$List$filter,
					function (b) {
						return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
					},
					brick_all));
			if (_v1) {
				return $author$project$Messages$Pass;
			} else {
				return model.gameStatus;
			}
		}
	}();
	return _Utils_update(
		model,
		{bricks: brick_all, gameStatus: win});
};
var $author$project$Death6$Update$exec = function (model) {
	var dir = function () {
		var _v0 = model.gameStatus;
		if (_v0.$ === 'Running') {
			var dr = _v0.a;
			return dr;
		} else {
			return $author$project$Messages$Stay;
		}
	}();
	return $author$project$Death6$Update$winJudge(
		$author$project$CollisionPoly$wallCheck(
			$author$project$CollisionPoly$paddleBall(
				$author$project$CollisionBlock$basic_hit(
					$author$project$Death6$Update$moveBall(
						A2($author$project$Death6$Update$movePaddle, dir, model))))));
};
var $author$project$Death6$Update$move = F2(
	function (elapsed, model) {
		var interval = 15;
		var elapsed_ = model.clock + elapsed;
		return (_Utils_cmp(elapsed_, interval) > 0) ? $author$project$Death6$Update$exec(
			_Utils_update(
				model,
				{clock: elapsed_ - interval})) : _Utils_update(
			model,
			{clock: elapsed_});
	});
var $author$project$Death6$State$getGameState = function (model) {
	return _Utils_update(
		model,
		{state: _List_Nil});
};
var $author$project$Death6$State$loopState = F2(
	function (state, t) {
		var _v0 = state.loop;
		if (_v0) {
			return (state.loop && (state.t < 1)) ? _Utils_update(
				state,
				{t: state.t + t}) : _Utils_update(
				state,
				{t: state.t - 1});
		} else {
			return _Utils_update(
				state,
				{t: state.t + t});
		}
	});
var $author$project$Death6$State$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.state);
	if (_v0) {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return _Utils_update(
					model,
					{gameStatus: $author$project$Messages$Prepare});
			case 'AnimationPreparePost':
				return $author$project$Death6$State$getGameState(
					_Utils_update(
						model,
						{
							gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
						}));
			case 'AnimationPass':
				return _Utils_update(
					model,
					{gameStatus: $author$project$Messages$End});
			case 'AnimationEnd':
				return _Utils_update(
					model,
					{gameLevel: $author$project$Messages$End7, gameStatus: $author$project$Messages$ChangeLevel});
			default:
				return model;
		}
	} else {
		var state = model.state;
		var newState = A2(
			$elm$core$List$map,
			function (s) {
				return A2($author$project$Death6$State$loopState, s, 0.007);
			},
			state);
		var getFunc = function (_v2) {
			var func = _v2.a;
			return func;
		};
		var setModel = F2(
			function (stat, model_) {
				return A2(
					getFunc(stat._function),
					model_,
					stat.t);
			});
		var newModel = A3(
			$elm$core$List$foldl,
			F2(
				function (x, y) {
					return A2(setModel, x, y);
				}),
			_Utils_update(
				model,
				{state: newState}),
			newState);
		return newModel;
	}
};
var $author$project$Death6$Update$update = F2(
	function (msg, model) {
		var model0 = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Paused':
					_v1$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Space':
										var _v2 = msg.a;
										return _Utils_update(
											model,
											{
												gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
											});
									case 'Key_R':
										var _v3 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v1$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v1$3;
						}
					}
					return model;
				case 'AnimationPrepare':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Death6$State$stateIterate(model);
						case 'GetViewport':
							var viewport = msg.a.viewport;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(viewport.width, viewport.height)
								});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Prepare':
					_v5$2:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								if (msg.a.$ === 'Space') {
									var _v6 = msg.a;
									return $author$project$Death6$State$getPrepareState(
										_Utils_update(
											model,
											{gameStatus: $author$project$Messages$AnimationPreparePost}));
								} else {
									break _v5$2;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v5$2;
						}
					}
					return model;
				case 'AnimationPreparePost':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Death6$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Lose':
					_v8$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Key_R':
										var _v9 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									case 'Space':
										var _v10 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v8$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v8$3;
						}
					}
					return model;
				case 'Pass':
					var model1 = $author$project$Death6$State$getPassState(model);
					return _Utils_update(
						model1,
						{finished: model.finished + 1, gameStatus: $author$project$Messages$AnimationPass});
				case 'AnimationPass':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Death6$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'End':
					switch (msg.$) {
						case 'KeyDown':
							return $author$project$Death6$State$getEndState(
								_Utils_update(
									model,
									{gameStatus: $author$project$Messages$AnimationEnd}));
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'AnimationEnd':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Death6$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Running':
					switch (msg.$) {
						case 'KeyDown':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return $author$project$Messages$Running($author$project$Messages$Left);
									case 'Key_Right':
										return $author$project$Messages$Running($author$project$Messages$Right);
									case 'Key_R':
										return $author$project$Messages$ChangeLevel;
									default:
										return $author$project$Messages$Paused;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'KeyUp':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Left)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									case 'Key_Right':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Right)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									default:
										return model.gameStatus;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'Tick':
							var time = msg.a;
							return $author$project$Death6$State$stateIterate(
								A2(
									$author$project$Death6$Update$move,
									A2($elm$core$Basics$min, time, 25),
									model));
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(
			_Utils_update(
				model0,
				{
					visualization: $author$project$Death6$View$visualize(model0)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$End7$Update$loopState = F2(
	function (state, t) {
		var _v0 = state.loop;
		if (_v0) {
			return (state.loop && (state.t < 1)) ? _Utils_update(
				state,
				{t: state.t + t}) : _Utils_update(
				state,
				{t: state.t - 1});
		} else {
			return _Utils_update(
				state,
				{t: state.t + t});
		}
	});
var $author$project$End7$Update$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.state);
	if (_v0) {
		var _v1 = model.gameStatus;
		if (_v1.$ === 'AnimationPrepare') {
			return _Utils_update(
				model,
				{gameStatus: $author$project$Messages$Prepare});
		} else {
			return _Utils_update(
				model,
				{gameLevel: $author$project$Messages$Start0, gameStatus: $author$project$Messages$ChangeLevel});
		}
	} else {
		var state = model.state;
		var newState = A2(
			$elm$core$List$map,
			function (s) {
				return A2($author$project$End7$Update$loopState, s, 0.0012);
			},
			state);
		var getFunc = function (_v2) {
			var func = _v2.a;
			return func;
		};
		var setModel = F2(
			function (stat, model_) {
				return A2(
					getFunc(stat._function),
					model_,
					stat.t);
			});
		var newModel = A3(
			$elm$core$List$foldl,
			F2(
				function (x, y) {
					return A2(setModel, x, y);
				}),
			_Utils_update(
				model,
				{state: newState}),
			newState);
		return newModel;
	}
};
var $author$project$End7$Update$update = F2(
	function (msg, model) {
		var model0 = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'AnimationPrepare':
					switch (msg.$) {
						case 'Tick':
							return $author$project$End7$Update$stateIterate(model);
						case 'GetViewport':
							var viewport = msg.a.viewport;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(viewport.width, viewport.height)
								});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Prepare':
					if ((msg.$ === 'KeyDown') && (msg.a.$ === 'Space')) {
						var _v3 = msg.a;
						return _Utils_update(
							model,
							{gameLevel: $author$project$Messages$Start0, gameStatus: $author$project$Messages$ChangeLevel});
					} else {
						return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(
			_Utils_update(
				model0,
				{
					visualization: $author$project$End7$View$visualize(model0)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Friends2$State$getEndState = function (model) {
	var s1 = {
		_function: $author$project$Model$Func($author$project$Fade$fadeOut),
		loop: false,
		name: 'fadeOut',
		t: 0,
		value: 1
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s1])
		});
};
var $author$project$Friends2$State$getPrepareState = function (model) {
	return $author$project$Friends2$State$getEndState(model);
};
var $author$project$Friends2$Update$moveBall = function (model) {
	var done = function (ball) {
		var v = ball.v;
		var setPos = F3(
			function (npos, ncoll, ball_) {
				return _Utils_update(
					ball_,
					{collision: ncoll, pos: npos});
			});
		var pos = ball.pos;
		var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
		var coll = A2(
			$elm$core$List$map,
			function (pt) {
				return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
			},
			ball.collision);
		return A3(setPos, newPos, coll, ball);
	};
	return _Utils_update(
		model,
		{
			ball: A2($elm$core$List$map, done, model.ball)
		});
};
var $author$project$Friends2$Update$movePaddle = F2(
	function (op, model) {
		var done = function (paddle) {
			var vNorm = 6;
			var pos = paddle.pos;
			var v = function () {
				switch (op.$) {
					case 'Left':
						var _v1 = pos.x > 18;
						if (_v1) {
							return A2($author$project$Model$Point, -vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					case 'Right':
						var _v2 = _Utils_cmp(pos.x, model.canvas.w - 18) < 0;
						if (_v2) {
							return A2($author$project$Model$Point, vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					default:
						return A2($author$project$Model$Point, 0, 0);
				}
			}();
			var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
			var col = A2(
				$elm$core$List$map,
				function (pt) {
					return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
				},
				paddle.collision);
			var setPaddle = F2(
				function (npos, paddle_) {
					return _Utils_update(
						paddle_,
						{collision: col, pos: npos});
				});
			return A2(setPaddle, newPos, paddle);
		};
		return _Utils_update(
			model,
			{
				paddle: A2($elm$core$List$map, done, model.paddle)
			});
	});
var $author$project$Friends2$Update$winJudge = function (model) {
	var change_brick = function (brick) {
		var _v2 = brick.hitTime;
		if ((_v2.$ === 'Hit') && (_v2.a === 1)) {
			return _Utils_update(
				brick,
				{color: $author$project$Friends2$View$backgroundColor, hitTime: $author$project$Model$NoMore});
		} else {
			return brick;
		}
	};
	var brick_all = A2($elm$core$List$map, change_brick, model.bricks);
	var win = function () {
		var _v0 = $elm$core$List$isEmpty(
			A2(
				$elm$core$List$filter,
				function (b) {
					return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
				},
				brick_all));
		if (_v0) {
			return $author$project$Messages$Pass;
		} else {
			var _v1 = _Utils_cmp(
				A2($author$project$Tools$getBall, model.ball, 1).pos.y,
				model.canvas.h + 20) > 0;
			if (_v1) {
				return $author$project$Messages$Lose;
			} else {
				return model.gameStatus;
			}
		}
	}();
	return _Utils_update(
		model,
		{bricks: brick_all, gameStatus: win});
};
var $author$project$Friends2$Update$exec = function (model) {
	var dir = function () {
		var _v0 = model.gameStatus;
		if (_v0.$ === 'Running') {
			var dr = _v0.a;
			return dr;
		} else {
			return $author$project$Messages$Stay;
		}
	}();
	return $author$project$Friends2$Update$winJudge(
		$author$project$CollisionPoly$wallCheck(
			$author$project$CollisionPoly$paddleBall(
				$author$project$CollisionBlock$basic_hit(
					$author$project$Friends2$Update$moveBall(
						A2($author$project$Friends2$Update$movePaddle, dir, model))))));
};
var $author$project$Friends2$Update$move = F2(
	function (elapsed, model) {
		var interval = 15;
		var elapsed_ = model.clock + elapsed;
		return (_Utils_cmp(elapsed_, interval) > 0) ? $author$project$Friends2$Update$exec(
			_Utils_update(
				model,
				{clock: elapsed_ - interval})) : _Utils_update(
			model,
			{clock: elapsed_});
	});
var $author$project$Friends2$Find$getIndexByPoint = F2(
	function (bricks, point) {
		return 1 + A3(
			$elm$core$List$foldl,
			F2(
				function (a, r) {
					return A2($elm$core$Basics$max, a, r);
				}),
			-1,
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, b) {
						return _Utils_eq(point, b.pos) ? i : (-1);
					}),
				bricks));
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Friends2$Find$find = F2(
	function (bricks, lastIndex) {
		var vb = A2(
			$elm$core$List$filter,
			function (b) {
				return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
			},
			bricks);
		var i = A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(vb),
			lastIndex * 77) + 1;
		var pos = A2($author$project$Friends2$Find$getBrick, vb, i).pos;
		var index = A2($author$project$Friends2$Find$getIndexByPoint, bricks, pos);
		return _Utils_Tuple2(pos, index);
	});
var $author$project$Bezier$bezierPos = F4(
	function (start, mid1, mid2, end) {
		var curve = function (time) {
			var now = 1 - time;
			return {
				x: (((start.x * A2($elm$core$Basics$pow, now, 3)) + (((3 * mid1.x) * time) * A2($elm$core$Basics$pow, now, 2))) + (((3 * mid2.x) * now) * A2($elm$core$Basics$pow, time, 2))) + (end.x * A2($elm$core$Basics$pow, time, 3)),
				y: (((start.y * A2($elm$core$Basics$pow, now, 3)) + (((3 * mid1.y) * time) * A2($elm$core$Basics$pow, now, 2))) + (((3 * mid2.y) * now) * A2($elm$core$Basics$pow, time, 2))) + (end.y * A2($elm$core$Basics$pow, time, 3))
			};
		};
		return curve;
	});
var $author$project$Friends2$State$genBezierBall2 = F4(
	function (p1, p2, p3, p4) {
		var bezier = A4($author$project$Bezier$bezierPos, p1, p2, p3, p4);
		var bezierBall2 = F2(
			function (model_, t_) {
				var ball2 = A2($author$project$Tools$getBall, model_.ball, 2);
				var ball2_ = _Utils_update(
					ball2,
					{
						pos: bezier(t_)
					});
				var ball1 = A2($author$project$Tools$getBall, model_.ball, 1);
				return _Utils_update(
					model_,
					{
						ball: _List_fromArray(
							[ball1, ball2_])
					});
			});
		return bezierBall2;
	});
var $author$project$Friends2$State$genBezierPoints = F4(
	function (p1, p4, degree, ratio) {
		var theta = (degree * $elm$core$Basics$pi) / 180;
		var rot_ = A2($author$project$Model$Point, ((-p1.x) + p4.x) / 2, ((-p1.y) + p4.y) / 2);
		var ori = A2($author$project$Model$Point, (p1.x + p4.x) / 2, (p1.y + p4.y) / 2);
		var b1 = -$elm$core$Basics$sin(theta);
		var a2 = -b1;
		var a1 = $elm$core$Basics$cos(theta);
		var b2 = a1;
		var rot = A2($author$project$Model$Point, ((a1 * rot_.x) + (b1 * rot_.y)) * ratio, ((a2 * rot_.x) + (b2 * rot_.y)) * ratio);
		var p2 = A2($author$project$Model$Point, ori.x - rot.x, ori.y - rot.y);
		var p3 = A2($author$project$Model$Point, ori.x + rot.x, ori.y + rot.y);
		return A4($author$project$Friends2$State$genBezierBall2, p1, p2, p3, p4);
	});
var $author$project$Friends2$State$moveBall2 = function (model) {
	var valid = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (b) {
				return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
			},
			model.bricks));
	var state = A2($author$project$Tools$getState, model.state, 'moveBall2');
	var pos = A2(
		$author$project$Friends2$Find$getBrick,
		model.bricks,
		$elm$core$Basics$round(state.value)).pos;
	var ball = A2($author$project$Tools$getBall, model.ball, 2);
	var stateKToP = function () {
		var p4 = {x: ball.pos.x, y: ball.pos.y};
		var p3 = {x: ball.pos.x - 10, y: ball.pos.y + 10};
		var p2 = {x: ball.pos.x + 20, y: ball.pos.y + 5};
		var p1 = {x: ball.pos.x, y: ball.pos.y};
		return _Utils_update(
			state,
			{
				_function: $author$project$Model$Func(
					A4($author$project$Friends2$State$genBezierBall2, p1, p2, p3, p4)),
				loop: true,
				t: 0
			});
	}();
	var _v0 = (valid < 1) ? _Utils_Tuple2(
		pos,
		$elm$core$Basics$round(state.value)) : A2(
		$author$project$Friends2$Find$find,
		model.bricks,
		$elm$core$Basics$round(state.value));
	var pos_ = _v0.a;
	var index_ = _v0.b;
	var stateKToK = function () {
		var ratio = 0.88;
		var p4 = {x: pos.x, y: pos.y};
		var p1 = {x: ball.pos.x, y: ball.pos.y};
		var degree = -33;
		return _Utils_update(
			state,
			{
				_function: $author$project$Model$Func(
					A4($author$project$Friends2$State$genBezierPoints, p1, p4, degree, ratio)),
				t: 0,
				value: index_
			});
	}();
	var statePToK = function () {
		var ratio = 0.35;
		var p4 = {x: pos_.x, y: pos_.y};
		var p1 = {x: ball.pos.x, y: ball.pos.y};
		var degree = 37;
		return _Utils_update(
			state,
			{
				_function: $author$project$Model$Func(
					A4($author$project$Friends2$State$genBezierPoints, p1, p4, degree, ratio)),
				loop: false,
				t: 0,
				value: index_
			});
	}();
	var _v1 = state.loop;
	if (_v1) {
		return (!_Utils_eq(
			A2(
				$author$project$Friends2$Find$getBrick,
				model.bricks,
				$elm$core$Basics$round(state.value)).hitTime,
			$author$project$Model$NoMore)) ? model : _Utils_update(
			model,
			{
				state: _List_fromArray(
					[statePToK])
			});
	} else {
		return (state.t >= 1) ? _Utils_update(
			model,
			{
				state: _List_fromArray(
					[stateKToP])
			}) : ((!_Utils_eq(
			A2(
				$author$project$Friends2$Find$getBrick,
				model.bricks,
				$elm$core$Basics$round(state.value)).hitTime,
			$author$project$Model$NoMore)) ? model : _Utils_update(
			model,
			{
				state: _List_fromArray(
					[stateKToK])
			}));
	}
};
var $author$project$Friends2$State$getGameState = function (model) {
	var s = function () {
		var index = 27;
		var pos = A2($author$project$Friends2$Find$getBrick, model.bricks, index).pos;
		var p1 = {x: pos.x, y: pos.y};
		var p2 = {x: pos.x + 10, y: pos.y + 10};
		var p3 = {x: pos.x - 20, y: pos.y + 4};
		var p4 = {x: pos.x, y: pos.y};
		return {
			_function: $author$project$Model$Func(
				A4($author$project$Friends2$State$genBezierBall2, p1, p2, p3, p4)),
			loop: true,
			name: 'moveBall2',
			t: 0,
			value: index
		};
	}();
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s])
		});
};
var $author$project$Friends2$State$loopState = F2(
	function (state, t) {
		var _v0 = state.loop;
		if (_v0) {
			return (state.loop && (state.t < 1)) ? _Utils_update(
				state,
				{t: state.t + t}) : _Utils_update(
				state,
				{t: state.t - 1});
		} else {
			return _Utils_update(
				state,
				{t: state.t + t});
		}
	});
var $author$project$Friends2$State$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.state);
	if (_v0) {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return _Utils_update(
					model,
					{gameStatus: $author$project$Messages$Prepare});
			case 'AnimationPreparePost':
				var model1 = $author$project$Friends2$State$getGameState(model);
				return _Utils_update(
					model1,
					{
						gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
					});
			case 'AnimationPass':
				return _Utils_update(
					model,
					{gameLevel: $author$project$Messages$Lovers3, gameStatus: $author$project$Messages$ChangeLevel});
			default:
				return model;
		}
	} else {
		var state = model.state;
		var newState = A2(
			$elm$core$List$map,
			function (s) {
				return A2($author$project$Friends2$State$loopState, s, 0.01);
			},
			state);
		var getFunc = function (_v2) {
			var func = _v2.a;
			return func;
		};
		var setModel = F2(
			function (stat, model_) {
				return A2(
					getFunc(stat._function),
					model_,
					stat.t);
			});
		var newModel = A3(
			$elm$core$List$foldl,
			F2(
				function (x, y) {
					return A2(setModel, x, y);
				}),
			_Utils_update(
				model,
				{state: newState}),
			newState);
		return newModel;
	}
};
var $author$project$Friends2$Update$update = F2(
	function (msg, model) {
		var model0 = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Paused':
					_v1$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Space':
										var _v2 = msg.a;
										return _Utils_update(
											model,
											{
												gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
											});
									case 'Key_R':
										var _v3 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v1$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v1$3;
						}
					}
					return model;
				case 'AnimationPrepare':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Friends2$State$stateIterate(model);
						case 'GetViewport':
							var viewport = msg.a.viewport;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(viewport.width, viewport.height)
								});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Prepare':
					_v5$2:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								if (msg.a.$ === 'Space') {
									var _v6 = msg.a;
									return $author$project$Friends2$State$getPrepareState(
										_Utils_update(
											model,
											{gameStatus: $author$project$Messages$AnimationPreparePost}));
								} else {
									break _v5$2;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v5$2;
						}
					}
					return model;
				case 'AnimationPreparePost':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Friends2$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Lose':
					_v8$2:
					while (true) {
						if (msg.$ === 'KeyDown') {
							switch (msg.a.$) {
								case 'Key_R':
									var _v9 = msg.a;
									return _Utils_update(
										model,
										{gameStatus: $author$project$Messages$ChangeLevel});
								case 'Space':
									var _v10 = msg.a;
									return _Utils_update(
										model,
										{gameStatus: $author$project$Messages$ChangeLevel});
								default:
									break _v8$2;
							}
						} else {
							break _v8$2;
						}
					}
					return model;
				case 'Pass':
					var model1 = $author$project$Friends2$State$getEndState(model);
					return _Utils_update(
						model1,
						{finished: model.finished + 1, gameStatus: $author$project$Messages$AnimationPass});
				case 'AnimationPass':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Friends2$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Running':
					switch (msg.$) {
						case 'KeyDown':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return $author$project$Messages$Running($author$project$Messages$Left);
									case 'Key_Right':
										return $author$project$Messages$Running($author$project$Messages$Right);
									case 'Key_R':
										return $author$project$Messages$ChangeLevel;
									default:
										return $author$project$Messages$Paused;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'KeyUp':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Left)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									case 'Key_Right':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Right)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									default:
										return model.gameStatus;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'Tick':
							var time = msg.a;
							return $author$project$Friends2$State$moveBall2(
								$author$project$Friends2$State$stateIterate(
									A2(
										$author$project$Friends2$Update$move,
										A2($elm$core$Basics$min, time, 25),
										model)));
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(
			_Utils_update(
				model0,
				{
					visualization: $author$project$Friends2$View$visualize(model0)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Lovers3$State$getEndState = function (model) {
	var s = {
		_function: $author$project$Model$Func(
			A3($author$project$Fade$genFadeOut, 0, 1, 0.01)),
		loop: false,
		name: 'fadeOut',
		t: 0,
		value: 1
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s])
		});
};
var $author$project$Lovers3$State$getPrepareState = function (model) {
	var s = {
		_function: $author$project$Model$Func(
			A3($author$project$Fade$genFadeOut, 0, 1, 0.01)),
		loop: false,
		name: 'fadeOut',
		t: 0,
		value: 1
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s])
		});
};
var $author$project$Lovers3$Update$moveBall = function (model) {
	var done = function (ball) {
		var v = ball.v;
		var setPos = F3(
			function (npos, ncoll, ball_) {
				return _Utils_update(
					ball_,
					{collision: ncoll, pos: npos});
			});
		var pos = ball.pos;
		var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
		var coll = A2(
			$elm$core$List$map,
			function (pt) {
				return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
			},
			ball.collision);
		return A3(setPos, newPos, coll, ball);
	};
	return _Utils_update(
		model,
		{
			ball: A2($elm$core$List$map, done, model.ball)
		});
};
var $author$project$Lovers3$Update$movePaddle = F2(
	function (op, model) {
		var done = function (paddle) {
			var vNorm = 7.2;
			var pos = paddle.pos;
			var v = function () {
				switch (op.$) {
					case 'Left':
						var _v1 = pos.x > 18;
						if (_v1) {
							return A2($author$project$Model$Point, -vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					case 'Right':
						var _v2 = _Utils_cmp(pos.x, model.canvas.w - 18) < 0;
						if (_v2) {
							return A2($author$project$Model$Point, vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					default:
						return A2($author$project$Model$Point, 0, 0);
				}
			}();
			var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
			var col = A2(
				$elm$core$List$map,
				function (pt) {
					return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
				},
				paddle.collision);
			var setPaddle = F2(
				function (npos, paddle_) {
					return _Utils_update(
						paddle_,
						{collision: col, pos: npos});
				});
			return A2(setPaddle, newPos, paddle);
		};
		return _Utils_update(
			model,
			{
				paddle: A2($elm$core$List$map, done, model.paddle)
			});
	});
var $author$project$Lovers3$Update$winJudge = function (model) {
	var change_brick = function (brick) {
		var _v3 = brick.hitTime;
		if ((_v3.$ === 'Hit') && (_v3.a === 1)) {
			return _Utils_update(
				brick,
				{color: $author$project$Lovers3$View$backgroundColor, hitTime: $author$project$Model$NoMore});
		} else {
			return brick;
		}
	};
	var brick_all = A2($elm$core$List$map, change_brick, model.bricks);
	var ball = A2($author$project$Tools$getBall, model.ball, 1);
	var win = function () {
		var _v0 = _Utils_cmp(ball.pos.y, model.canvas.h + 20) > 0;
		if (_v0) {
			var _v1 = $elm$core$List$length(
				A2(
					$elm$core$List$filter,
					function (b) {
						return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
					},
					brick_all)) <= 4;
			if (_v1) {
				return $author$project$Messages$Pass;
			} else {
				return $author$project$Messages$Lose;
			}
		} else {
			var _v2 = $elm$core$List$isEmpty(
				A2(
					$elm$core$List$filter,
					function (b) {
						return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
					},
					brick_all));
			if (_v2) {
				return $author$project$Messages$Pass;
			} else {
				return model.gameStatus;
			}
		}
	}();
	return _Utils_update(
		model,
		{bricks: brick_all, gameStatus: win});
};
var $author$project$Lovers3$Update$exec = function (model) {
	var dir = function () {
		var _v0 = model.gameStatus;
		if (_v0.$ === 'Running') {
			var dr = _v0.a;
			return dr;
		} else {
			return $author$project$Messages$Stay;
		}
	}();
	return $author$project$Lovers3$Update$winJudge(
		$author$project$CollisionPoly$wallCheck(
			$author$project$CollisionPoly$paddleBall(
				$author$project$CollisionBlock$basic_hit(
					$author$project$Lovers3$Update$moveBall(
						A2($author$project$Lovers3$Update$movePaddle, dir, model))))));
};
var $author$project$Lovers3$Update$move = F2(
	function (elapsed, model) {
		var interval = 15;
		var elapsed_ = model.clock + elapsed;
		return (_Utils_cmp(elapsed_, interval) > 0) ? $author$project$Lovers3$Update$exec(
			_Utils_update(
				model,
				{clock: elapsed_ - interval})) : _Utils_update(
			model,
			{clock: elapsed_});
	});
var $author$project$Lovers3$State$getSpeed = function (v) {
	return $elm$core$Basics$sqrt(
		A2($elm$core$Basics$pow, v.x, 2) + A2($elm$core$Basics$pow, v.y, 2));
};
var $author$project$Lovers3$State$convertSpeed = F2(
	function (v, speed) {
		var vN = $author$project$Lovers3$State$getSpeed(v);
		return A2($author$project$Model$Point, (v.x / vN) * speed, (v.y / vN) * speed);
	});
var $author$project$Lovers3$State$posDiff = F3(
	function (ori, _new, cur) {
		var y = (_new.y - ori.y) + cur.y;
		var x = (_new.x - ori.x) + cur.x;
		return A2($author$project$Model$Point, x, y);
	});
var $author$project$Lovers3$State$speedMap = function (brickN) {
	var vInit = 4;
	var dv = 0.4;
	var brickInit = 20;
	return vInit + ((brickInit - brickN) * dv);
};
var $author$project$Lovers3$State$vecAway = F3(
	function (target, origin, distance) {
		var y = ((target.y - origin.y) * distance) + target.y;
		var x = ((target.x - origin.x) * distance) + target.x;
		return A2($author$project$Model$Point, x, y);
	});
var $author$project$Lovers3$State$genBezierBrick = function (bricks__) {
	var bezierBrick = F2(
		function (model, t_) {
			var center = A2($author$project$Model$Point, model.canvas.w / 2, (model.canvas.h / 2) - 50);
			var pos2curve = function (pos_) {
				var outpoint = A3($author$project$Lovers3$State$vecAway, pos_, center, 0.6);
				var bezier = A4($author$project$Bezier$bezierPos, pos_, outpoint, outpoint, pos_);
				return bezier;
			};
			var bricks_m = model.bricks;
			var ball_ = A2($author$project$Tools$getBall, model.ball, 1);
			var _v0 = A2($author$project$Tools$divState, model.state, 'heart');
			var s_ = _v0.a;
			var state_e = _v0.b;
			var s__ = _Utils_update(
				s_,
				{
					value: $author$project$Lovers3$State$speedMap(
						$elm$core$List$length(
							A2(
								$elm$core$List$filter,
								function (b) {
									return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
								},
								model.bricks)))
				});
			var t_r = function () {
				var timeMap = F2(
					function (t__, sp) {
						var vMax = 12;
						var frac = 1 - (sp / vMax);
						return t__ / frac;
					});
				return A2(timeMap, t_, s__.value);
			}();
			var _v1 = function () {
				var cutTime = 1.5;
				return (_Utils_cmp(t_r, cutTime) < 0) ? _Utils_Tuple2(
					A2($elm$core$Basics$min, t_r, 1),
					false) : _Utils_Tuple2(0, true);
			}();
			var t = _v1.a;
			var cut = _v1.b;
			var s = function () {
				if (cut) {
					return _Utils_update(
						s__,
						{t: 0});
				} else {
					return s__;
				}
			}();
			var ball = _List_fromArray(
				[
					_Utils_update(
					ball_,
					{
						v: A2($author$project$Lovers3$State$convertSpeed, ball_.v, s.value)
					})
				]);
			var bricks_ = A2(
				$elm$core$List$map,
				function (b) {
					var newPos = pos2curve(b.pos)(t);
					return _Utils_update(
						b,
						{
							block: A2(
								$author$project$Model$Block,
								A3($author$project$Lovers3$State$posDiff, b.pos, newPos, b.block.lt),
								A3($author$project$Lovers3$State$posDiff, b.pos, newPos, b.block.rb)),
							collision: A2(
								$elm$core$List$map,
								function (p) {
									return A3($author$project$Lovers3$State$posDiff, b.pos, newPos, p);
								},
								b.collision),
							pos: newPos
						});
				},
				bricks__);
			var bricks = A3(
				$elm$core$List$map2,
				F2(
					function (b1, b2) {
						return _Utils_update(
							b2,
							{hitTime: b1.hitTime});
					}),
				bricks_m,
				bricks_);
			return _Utils_update(
				model,
				{
					ball: ball,
					bricks: bricks,
					state: A2($elm$core$List$cons, s, state_e)
				});
		});
	return bezierBrick;
};
var $author$project$Lovers3$State$getGameState = function (model) {
	var s = {
		_function: $author$project$Model$Func(
			$author$project$Lovers3$State$genBezierBrick(model.bricks)),
		loop: true,
		name: 'heart',
		t: 0,
		value: $author$project$Lovers3$State$getSpeed(
			A2($author$project$Tools$getBall, model.ball, 1).v)
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s])
		});
};
var $author$project$Lovers3$State$loopState = F2(
	function (state, t) {
		var _v0 = state.loop;
		if (_v0) {
			return (state.loop && (state.t < 1)) ? _Utils_update(
				state,
				{t: state.t + t}) : _Utils_update(
				state,
				{t: state.t - 1});
		} else {
			return _Utils_update(
				state,
				{t: state.t + t});
		}
	});
var $author$project$Lovers3$State$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.state);
	if (_v0) {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return _Utils_update(
					model,
					{gameStatus: $author$project$Messages$Prepare});
			case 'AnimationPreparePost':
				var model1 = $author$project$Lovers3$State$getGameState(model);
				return _Utils_update(
					model1,
					{
						gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
					});
			case 'AnimationPass':
				return _Utils_update(
					model,
					{gameLevel: $author$project$Messages$Strangers4, gameStatus: $author$project$Messages$ChangeLevel});
			default:
				return model;
		}
	} else {
		var state = model.state;
		var newState = A2(
			$elm$core$List$map,
			function (s) {
				return A2($author$project$Lovers3$State$loopState, s, 0.007);
			},
			state);
		var getFunc = function (_v2) {
			var func = _v2.a;
			return func;
		};
		var setModel = F2(
			function (stat, model_) {
				return A2(
					getFunc(stat._function),
					model_,
					stat.t);
			});
		var newModel = A3(
			$elm$core$List$foldl,
			F2(
				function (x, y) {
					return A2(setModel, x, y);
				}),
			_Utils_update(
				model,
				{state: newState}),
			newState);
		return newModel;
	}
};
var $author$project$Lovers3$Update$update = F2(
	function (msg, model) {
		var model0 = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Paused':
					_v1$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Space':
										var _v2 = msg.a;
										return _Utils_update(
											model,
											{
												gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
											});
									case 'Key_R':
										var _v3 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v1$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v1$3;
						}
					}
					return model;
				case 'AnimationPrepare':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Lovers3$State$stateIterate(model);
						case 'GetViewport':
							var viewport = msg.a.viewport;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(viewport.width, viewport.height)
								});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Prepare':
					_v5$2:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								if (msg.a.$ === 'Space') {
									var _v6 = msg.a;
									return $author$project$Lovers3$State$getPrepareState(
										_Utils_update(
											model,
											{gameStatus: $author$project$Messages$AnimationPreparePost}));
								} else {
									break _v5$2;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v5$2;
						}
					}
					return model;
				case 'AnimationPreparePost':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Lovers3$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Lose':
					_v8$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Key_R':
										var _v9 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									case 'Space':
										var _v10 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v8$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v8$3;
						}
					}
					return model;
				case 'Pass':
					var model1 = $author$project$Lovers3$State$getEndState(model);
					return _Utils_update(
						model1,
						{finished: model.finished + 1, gameStatus: $author$project$Messages$AnimationPass});
				case 'AnimationPass':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Lovers3$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'End':
					switch (msg.$) {
						case 'KeyDown':
							return _Utils_update(
								model,
								{gameLevel: $author$project$Messages$Strangers4, gameStatus: $author$project$Messages$AnimationPrepare});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Running':
					switch (msg.$) {
						case 'KeyDown':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return $author$project$Messages$Running($author$project$Messages$Left);
									case 'Key_Right':
										return $author$project$Messages$Running($author$project$Messages$Right);
									case 'Key_R':
										return $author$project$Messages$ChangeLevel;
									default:
										return $author$project$Messages$Paused;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'KeyUp':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Left)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									case 'Key_Right':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Right)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									default:
										return model.gameStatus;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'Tick':
							var time = msg.a;
							return $author$project$Lovers3$State$stateIterate(
								A2(
									$author$project$Lovers3$Update$move,
									A2($elm$core$Basics$min, time, 25),
									model));
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(
			_Utils_update(
				model0,
				{
					visualization: $author$project$Lovers3$View$visualize(model0)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Start0$Update$winJudge = function (model) {
	return (A2($author$project$Tools$getState, model.state, 'fadeInAndOut').t > 2) ? _Utils_update(
		model,
		{gameStatus: $author$project$Messages$Prepare}) : model;
};
var $author$project$Start0$Update$exec = function (model) {
	return $author$project$Start0$Update$winJudge(model);
};
var $author$project$Start0$Update$move = F2(
	function (elapsed, model) {
		var interval = 15;
		var elapsed_ = model.clock + elapsed;
		return (_Utils_cmp(elapsed_, interval) > 0) ? $author$project$Start0$Update$exec(
			_Utils_update(
				model,
				{clock: elapsed_ - interval})) : _Utils_update(
			model,
			{clock: elapsed_});
	});
var $author$project$Start0$Update$loopState = F2(
	function (state, t) {
		var _v0 = state.loop;
		if (_v0) {
			return (state.loop && (state.t < 1)) ? _Utils_update(
				state,
				{t: state.t + t}) : _Utils_update(
				state,
				{t: state.t - 1});
		} else {
			return _Utils_update(
				state,
				{t: state.t + t});
		}
	});
var $author$project$Start0$Update$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.state);
	if (_v0) {
		return _Utils_update(
			model,
			{gameLevel: $author$project$Messages$Strangers1, gameStatus: $author$project$Messages$ChangeLevel});
	} else {
		var state = model.state;
		var newState = A2(
			$elm$core$List$map,
			function (s) {
				return A2($author$project$Start0$Update$loopState, s, 0.005);
			},
			state);
		var newModel = _Utils_update(
			model,
			{state: newState});
		return newModel;
	}
};
var $author$project$Start0$Update$update = F2(
	function (msg, model) {
		var model0 = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'AnimationPrepare':
					switch (msg.$) {
						case 'Tick':
							var time = msg.a;
							return $author$project$Start0$Update$stateIterate(
								A2(
									$author$project$Start0$Update$move,
									A2($elm$core$Basics$min, time, 25),
									model));
						case 'GetViewport':
							var viewport = msg.a.viewport;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(viewport.width, viewport.height)
								});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Prepare':
					_v2$2:
					while (true) {
						switch (msg.$) {
							case 'ShowStatus':
								if (msg.a.$ === 'Paused') {
									var _v3 = msg.a;
									return _Utils_update(
										model,
										{gameStatus: $author$project$Messages$Paused});
								} else {
									break _v2$2;
								}
							case 'KeyDown':
								if (msg.a.$ === 'Space') {
									var _v4 = msg.a;
									return _Utils_update(
										model,
										{gameStatus: $author$project$Messages$Paused});
								} else {
									break _v2$2;
								}
							default:
								break _v2$2;
						}
					}
					return model;
				case 'Paused':
					if ((msg.$ === 'KeyDown') && (msg.a.$ === 'Space')) {
						var _v6 = msg.a;
						return _Utils_update(
							model,
							{gameLevel: $author$project$Messages$Strangers1, gameStatus: $author$project$Messages$ChangeLevel});
					} else {
						return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(
			_Utils_update(
				model0,
				{
					visualization: $author$project$Start0$View$visualize(model0)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Strangers1$State$genChangeBallColor = F2(
	function (model, t) {
		var ball2 = A2($author$project$Tools$getBall, model.ball, 2);
		var ball1 = A2($author$project$Tools$getBall, model.ball, 1);
		var newBall1 = _Utils_update(
			ball1,
			{
				color: A3(
					$author$project$Bezier$bezierColor,
					ball1.color,
					A3($author$project$Model$rgb, 66, 150, 240),
					t)
			});
		var newBall2 = _Utils_update(
			ball2,
			{
				color: A3(
					$author$project$Bezier$bezierColor,
					ball1.color,
					A3($author$project$Model$rgb, 250, 200, 50),
					t)
			});
		var newball = _List_fromArray(
			[newBall1, newBall2]);
		var _v0 = A2($author$project$Tools$divState, model.state, 'changeBallColor');
		var s_ = _v0.a;
		var state_ = _v0.b;
		var state = function () {
			var _v1 = s_.t >= 1;
			if (_v1) {
				return state_;
			} else {
				return model.state;
			}
		}();
		return _Utils_update(
			model,
			{ball: newball, state: state});
	});
var $author$project$Strangers1$State$genChangeBallSize = F2(
	function (model, t) {
		var t_ = A2($elm$core$Basics$min, t, 1);
		var r_ = 10;
		var ball2 = A2($author$project$Tools$getBall, model.ball, 2);
		var newBall2 = _Utils_update(
			ball2,
			{r: r_ * (1 + t_)});
		var ball1 = A2($author$project$Tools$getBall, model.ball, 1);
		var newBall1 = _Utils_update(
			ball1,
			{r: r_ * (1 + t_)});
		var newball = _List_fromArray(
			[newBall1, newBall2]);
		var _v0 = A2($author$project$Tools$divState, model.state, 'changeBallSize');
		var s_ = _v0.a;
		var state_ = _v0.b;
		var state = function () {
			var _v1 = s_.t >= 1;
			if (_v1) {
				return state_;
			} else {
				return model.state;
			}
		}();
		return _Utils_update(
			model,
			{ball: newball, state: state});
	});
var $author$project$Strangers1$State$getEndState = function (model) {
	var s3 = {
		_function: $author$project$Model$Func($author$project$Fade$fadeOut),
		loop: false,
		name: 'fadeOut',
		t: -1,
		value: 0
	};
	var s2 = {
		_function: $author$project$Model$Func($author$project$Strangers1$State$genChangeBallSize),
		loop: false,
		name: 'changeBallSize',
		t: 0,
		value: 0
	};
	var s1 = {
		_function: $author$project$Model$Func($author$project$Strangers1$State$genChangeBallColor),
		loop: false,
		name: 'changeBallColor',
		t: 0,
		value: 0
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s1, s2, s3])
		});
};
var $author$project$Strangers1$State$getPrepareState = function (model) {
	var s3 = {
		_function: $author$project$Model$Func(
			A3($author$project$Fade$genFadeOut, 0, 0.4, -0.001)),
		loop: false,
		name: 'fadeOut',
		t: 0,
		value: 1
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s3])
		});
};
var $author$project$Strangers1$Update$moveBall = function (model) {
	var done = function (ball) {
		var v = ball.v;
		var setPos = F3(
			function (npos, ncoll, ball_) {
				return _Utils_update(
					ball_,
					{collision: ncoll, pos: npos});
			});
		var pos = ball.pos;
		var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
		var coll = A2(
			$elm$core$List$map,
			function (pt) {
				return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
			},
			ball.collision);
		return A3(setPos, newPos, coll, ball);
	};
	return _Utils_update(
		model,
		{
			ball: A2($elm$core$List$map, done, model.ball)
		});
};
var $author$project$Strangers1$Update$movePaddle = F2(
	function (op, model) {
		var done = function (paddle) {
			var vNorm = 4;
			var pos = paddle.pos;
			var v = function () {
				switch (op.$) {
					case 'Left':
						var _v1 = pos.x > 18;
						if (_v1) {
							return A2($author$project$Model$Point, -vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					case 'Right':
						var _v2 = _Utils_cmp(pos.x, model.canvas.w - 18) < 0;
						if (_v2) {
							return A2($author$project$Model$Point, vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					default:
						return A2($author$project$Model$Point, 0, 0);
				}
			}();
			var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
			var col = A2(
				$elm$core$List$map,
				function (pt) {
					return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
				},
				paddle.collision);
			var setPaddle = F2(
				function (npos, paddle_) {
					return _Utils_update(
						paddle_,
						{collision: col, pos: npos});
				});
			return A2(setPaddle, newPos, paddle);
		};
		return _Utils_update(
			model,
			{
				paddle: A2($elm$core$List$map, done, model.paddle)
			});
	});
var $author$project$Strangers1$Update$winJudge = function (model) {
	var change_brick = function (brick) {
		var _v2 = brick.hitTime;
		if ((_v2.$ === 'Hit') && (_v2.a === 1)) {
			return _Utils_update(
				brick,
				{color: $author$project$Strangers1$View$backgroundColor, hitTime: $author$project$Model$NoMore});
		} else {
			return brick;
		}
	};
	var brick_all = A2($elm$core$List$map, change_brick, model.bricks);
	var ball2 = A2($author$project$Tools$getBall, model.ball, 2);
	var ball = A2($author$project$Tools$getBall, model.ball, 1);
	var closeEnough = _Utils_cmp(
		$elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, ball.pos.x - ball2.pos.x, 2) + A2($elm$core$Basics$pow, ball.pos.y - ball2.pos.y, 2)),
		7 * ball.r) < 0;
	var win = function () {
		if (closeEnough) {
			return $author$project$Messages$Pass;
		} else {
			var _v1 = _Utils_cmp(
				A2($author$project$Tools$getBall, model.ball, 1).pos.y,
				model.canvas.h + 10) > 0;
			if (_v1) {
				return $author$project$Messages$Lose;
			} else {
				return model.gameStatus;
			}
		}
	}();
	return _Utils_update(
		model,
		{bricks: brick_all, gameStatus: win});
};
var $author$project$Strangers1$Update$exec = function (model) {
	var dir = function () {
		var _v0 = model.gameStatus;
		if (_v0.$ === 'Running') {
			var dr = _v0.a;
			return dr;
		} else {
			return $author$project$Messages$Stay;
		}
	}();
	return $author$project$Strangers1$Update$winJudge(
		$author$project$CollisionPoly$wallCheck(
			$author$project$CollisionPoly$paddleBall(
				$author$project$CollisionBlock$basic_hit(
					$author$project$Strangers1$Update$moveBall(
						A2($author$project$Strangers1$Update$movePaddle, dir, model))))));
};
var $author$project$Strangers1$Update$move = F2(
	function (elapsed, model) {
		var interval = 15;
		var elapsed_ = model.clock + elapsed;
		return (_Utils_cmp(elapsed_, interval) > 0) ? $author$project$Strangers1$Update$exec(
			_Utils_update(
				model,
				{clock: elapsed_ - interval})) : _Utils_update(
			model,
			{clock: elapsed_});
	});
var $author$project$Strangers1$State$bezierBall = F2(
	function (model, state) {
		var getfunc = function (_v0) {
			var func = _v0.a;
			return func;
		};
		var newBalls = A3(getfunc, state._function, model, state.t).ball;
		return _Utils_update(
			model,
			{ball: newBalls});
	});
var $author$project$Strangers1$State$genBezierBall2 = F4(
	function (p1, p2, p3, p4) {
		var bezier = A4($author$project$Bezier$bezierPos, p1, p2, p3, p4);
		var bezierBall2 = F2(
			function (model_, t_) {
				var ball2 = A2($author$project$Tools$getBall, model_.ball, 2);
				var ball2_ = _Utils_update(
					ball2,
					{
						pos: bezier(t_)
					});
				var ball1 = A2($author$project$Tools$getBall, model_.ball, 1);
				return _Utils_update(
					model_,
					{
						ball: _List_fromArray(
							[ball1, ball2_])
					});
			});
		return bezierBall2;
	});
var $author$project$Strangers1$State$getGameState = function (model) {
	var s = {
		_function: $author$project$Model$Func(
			A4(
				$author$project$Strangers1$State$genBezierBall2,
				A2(
					$author$project$Model$Point,
					A2($author$project$Tools$getBall, model.ball, 2).pos.x,
					A2($author$project$Tools$getBall, model.ball, 2).pos.y),
				A2(
					$author$project$Model$Point,
					A2($author$project$Tools$getBall, model.ball, 2).pos.x - 20,
					A2($author$project$Tools$getBall, model.ball, 2).pos.y - 5),
				A2(
					$author$project$Model$Point,
					A2($author$project$Tools$getBall, model.ball, 2).pos.x + 20,
					A2($author$project$Tools$getBall, model.ball, 2).pos.y + 10),
				A2(
					$author$project$Model$Point,
					A2($author$project$Tools$getBall, model.ball, 2).pos.x,
					A2($author$project$Tools$getBall, model.ball, 2).pos.y))),
		loop: true,
		name: 'bezier',
		t: 0,
		value: 2
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s])
		});
};
var $author$project$Strangers1$State$loopState = F2(
	function (state, t) {
		var _v0 = state.loop;
		if (_v0) {
			return (state.loop && (state.t < 1)) ? _Utils_update(
				state,
				{t: state.t + t}) : _Utils_update(
				state,
				{t: state.t - 1});
		} else {
			return _Utils_update(
				state,
				{t: state.t + t});
		}
	});
var $author$project$Strangers1$State$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.state);
	if (_v0) {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return _Utils_update(
					model,
					{gameStatus: $author$project$Messages$Prepare});
			case 'AnimationPreparePost':
				var model1 = $author$project$Strangers1$State$getGameState(model);
				return _Utils_update(
					model1,
					{
						gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
					});
			case 'AnimationPass':
				return _Utils_update(
					model,
					{gameLevel: $author$project$Messages$Friends2, gameStatus: $author$project$Messages$ChangeLevel});
			default:
				return model;
		}
	} else {
		var state = model.state;
		var newState = A2(
			$elm$core$List$map,
			function (s) {
				return A2($author$project$Strangers1$State$loopState, s, 0.007);
			},
			state);
		var getFunc = function (_v3) {
			var func = _v3.a;
			return func;
		};
		var setModel = F2(
			function (stat, model_) {
				var _v2 = stat.name;
				if (_v2 === 'bezier') {
					return A2($author$project$Strangers1$State$bezierBall, model_, stat);
				} else {
					return A2(
						getFunc(stat._function),
						model_,
						stat.t);
				}
			});
		var newModel = A3(
			$elm$core$List$foldl,
			F2(
				function (x, y) {
					return A2(setModel, x, y);
				}),
			_Utils_update(
				model,
				{state: newState}),
			newState);
		return newModel;
	}
};
var $author$project$Strangers1$Update$update = F2(
	function (msg, model) {
		var model0 = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Paused':
					_v1$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Space':
										var _v2 = msg.a;
										return _Utils_update(
											model,
											{
												gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
											});
									case 'Key_R':
										var _v3 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v1$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v1$3;
						}
					}
					return model;
				case 'AnimationPrepare':
					switch (msg.$) {
						case 'Tick':
							var time = msg.a;
							return $author$project$Strangers1$State$stateIterate(model);
						case 'GetViewport':
							var viewport = msg.a.viewport;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(viewport.width, viewport.height)
								});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Prepare':
					_v5$2:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								if (msg.a.$ === 'Space') {
									var _v6 = msg.a;
									return $author$project$Strangers1$State$getPrepareState(
										_Utils_update(
											model,
											{gameStatus: $author$project$Messages$AnimationPreparePost}));
								} else {
									break _v5$2;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v5$2;
						}
					}
					return model;
				case 'AnimationPreparePost':
					switch (msg.$) {
						case 'Tick':
							var time = msg.a;
							return $author$project$Strangers1$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Lose':
					_v8$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Key_R':
										var _v9 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									case 'Space':
										var _v10 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v8$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v8$3;
						}
					}
					return model;
				case 'Pass':
					var model1 = $author$project$Strangers1$State$getEndState(model);
					return _Utils_update(
						model1,
						{finished: model.finished + 1, gameStatus: $author$project$Messages$AnimationPass});
				case 'AnimationPass':
					switch (msg.$) {
						case 'Tick':
							var time = msg.a;
							return $author$project$Strangers1$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'End':
					switch (msg.$) {
						case 'KeyDown':
							return _Utils_update(
								model,
								{gameLevel: $author$project$Messages$Friends2, gameStatus: $author$project$Messages$AnimationPrepare});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Running':
					switch (msg.$) {
						case 'KeyDown':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return $author$project$Messages$Running($author$project$Messages$Left);
									case 'Key_Right':
										return $author$project$Messages$Running($author$project$Messages$Right);
									case 'Key_R':
										return $author$project$Messages$ChangeLevel;
									default:
										return $author$project$Messages$Paused;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'KeyUp':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Left)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									case 'Key_Right':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Right)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									default:
										return model.gameStatus;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'Tick':
							var time = msg.a;
							return $author$project$Strangers1$State$stateIterate(
								A2(
									$author$project$Strangers1$Update$move,
									A2($elm$core$Basics$min, time, 25),
									model));
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(
			_Utils_update(
				model0,
				{
					visualization: $author$project$Strangers1$View$visualize(model0)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Strangers4$State$getEndState = function (model) {
	var s1 = {
		_function: $author$project$Model$Func(
			A3($author$project$Fade$genFadeOut, 0, 1, -0.001)),
		loop: false,
		name: 'fadeOut',
		t: 0,
		value: 1
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s1])
		});
};
var $author$project$Strangers4$State$getPrepareState = function (model) {
	var s1 = {
		_function: $author$project$Model$Func(
			A3($author$project$Fade$genFadeOut, 0, 1, -0.001)),
		loop: false,
		name: 'fadeOut',
		t: 0,
		value: 1
	};
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s1])
		});
};
var $author$project$Strangers4$CollisionBlock$xyToCorner = F2(
	function (hit_x, hit_y) {
		var _v0 = _Utils_Tuple2(hit_x, hit_y);
		_v0$1:
		while (true) {
			_v0$8:
			while (true) {
				switch (_v0.a.$) {
					case 'Corner':
						var _v1 = _v0.a;
						return $author$project$CollisionBlock$Corner;
					case 'X':
						switch (_v0.b.$) {
							case 'Corner':
								break _v0$1;
							case 'Y':
								var _v3 = _v0.a;
								var _v4 = _v0.b;
								return $author$project$CollisionBlock$Corner;
							case 'Safe':
								var _v7 = _v0.a;
								var _v8 = _v0.b;
								return $author$project$CollisionBlock$X;
							default:
								break _v0$8;
						}
					case 'Y':
						switch (_v0.b.$) {
							case 'Corner':
								break _v0$1;
							case 'X':
								var _v5 = _v0.a;
								var _v6 = _v0.b;
								return $author$project$CollisionBlock$Corner;
							case 'Safe':
								var _v11 = _v0.a;
								var _v12 = _v0.b;
								return $author$project$CollisionBlock$Y;
							default:
								break _v0$8;
						}
					default:
						switch (_v0.b.$) {
							case 'Corner':
								break _v0$1;
							case 'X':
								var _v9 = _v0.a;
								var _v10 = _v0.b;
								return $author$project$CollisionBlock$X;
							case 'Y':
								var _v13 = _v0.a;
								var _v14 = _v0.b;
								return $author$project$CollisionBlock$Y;
							default:
								break _v0$8;
						}
				}
			}
			return $author$project$CollisionBlock$Safe;
		}
		var _v2 = _v0.b;
		return $author$project$CollisionBlock$Corner;
	});
var $author$project$Strangers4$CollisionBlock$ball_direction = F2(
	function (ball, box) {
		var init = $author$project$CollisionBlock$Safe;
		var hit = F2(
			function (block, status) {
				hit:
				while (true) {
					var tmp = $elm$core$List$head(block);
					var next_tmp = $elm$core$List$tail(block);
					if (next_tmp.$ === 'Just') {
						var tail = next_tmp.a;
						if (tmp.$ === 'Just') {
							var head = tmp.a;
							var _v2 = head.hitTime;
							if (_v2.$ === 'Hit') {
								return A2(
									$author$project$Strangers4$CollisionBlock$xyToCorner,
									status,
									A2(
										hit,
										tail,
										A2($author$project$CollisionBlock$block_black_box_hit, ball, head.block)));
							} else {
								var $temp$block = tail,
									$temp$status = status;
								block = $temp$block;
								status = $temp$status;
								continue hit;
							}
						} else {
							return status;
						}
					} else {
						if (tmp.$ === 'Just') {
							var head = tmp.a;
							var _v4 = head.hitTime;
							if (_v4.$ === 'Hit') {
								return A2(
									$author$project$Strangers4$CollisionBlock$xyToCorner,
									status,
									A2(
										hit,
										_List_Nil,
										A2($author$project$CollisionBlock$block_black_box_hit, ball, head.block)));
							} else {
								return status;
							}
						} else {
							return status;
						}
					}
				}
			});
		return A2(hit, box, init);
	});
var $author$project$Strangers4$CollisionBlock$block_black_box_hitTime = F3(
	function (ball, block, a) {
		var hit = A2($author$project$CollisionBlock$block_black_box_hit, ball, block);
		var hit_time = function () {
			if (hit.$ === 'Safe') {
				return $author$project$Model$Hit(a);
			} else {
				return $author$project$Model$Hit(a + 1);
			}
		}();
		return hit_time;
	});
var $author$project$Strangers4$State$endColor1 = A3($author$project$Model$rgb, 15, 112, 140);
var $author$project$Strangers4$State$endColor2 = A3($author$project$Model$rgb, 37, 136, 164);
var $author$project$Strangers4$State$endColor3 = A3($author$project$Model$rgb, 115, 169, 184);
var $author$project$Strangers4$State$endColor4 = A3($author$project$Model$rgb, 158, 189, 200);
var $author$project$Strangers4$State$genBezierColor = function () {
	var bezier3 = A2($author$project$Bezier$bezierColor, $author$project$Strangers4$State$endColor3, $author$project$Strangers4$State$endColor4);
	var bezier2 = A2($author$project$Bezier$bezierColor, $author$project$Strangers4$State$endColor2, $author$project$Strangers4$State$endColor3);
	var bezier1 = A2($author$project$Bezier$bezierColor, $author$project$Strangers4$State$endColor1, $author$project$Strangers4$State$endColor2);
	var bezier0 = A2($author$project$Bezier$bezierColor, $author$project$Strangers4$State$endColor0, $author$project$Strangers4$State$endColor1);
	var bezierBrickColor = F2(
		function (model_, t_) {
			var targetBrick = A2(
				$elm$core$List$map,
				function (a) {
					var _v0 = a.hitTime;
					_v0$4:
					while (true) {
						if (_v0.$ === 'Hit') {
							switch (_v0.a) {
								case 1:
									return (!_Utils_eq(a.color, $author$project$Strangers4$State$endColor1)) ? _Utils_update(
										a,
										{
											color: bezier0(t_)
										}) : a;
								case 2:
									return (!_Utils_eq(a.color, $author$project$Strangers4$State$endColor2)) ? _Utils_update(
										a,
										{
											color: bezier1(t_)
										}) : a;
								case 3:
									return (!_Utils_eq(a.color, $author$project$Strangers4$State$endColor3)) ? _Utils_update(
										a,
										{
											color: bezier2(t_)
										}) : a;
								case 4:
									return (!_Utils_eq(a.color, $author$project$Strangers4$State$endColor4)) ? _Utils_update(
										a,
										{
											color: bezier3(t_)
										}) : a;
								default:
									break _v0$4;
							}
						} else {
							break _v0$4;
						}
					}
					return a;
				},
				model_.bricks);
			return _Utils_update(
				model_,
				{
					bricks: targetBrick,
					state: A2(
						$elm$core$List$filter,
						function (s) {
							return s.t <= 1;
						},
						model_.state)
				});
		});
	return bezierBrickColor;
}();
var $author$project$Strangers4$CollisionBlock$block_hit = function (model) {
	var now_bricks = model.bricks;
	var now_ball1 = A2($author$project$Tools$getBall, model.ball, 1);
	var status = A2($author$project$Strangers4$CollisionBlock$ball_direction, now_ball1, now_bricks);
	return _Utils_update(
		model,
		{
			ball: _Utils_ap(
				_List_fromArray(
					[
						_Utils_update(
						now_ball1,
						{
							v: function () {
								switch (status.$) {
									case 'Safe':
										return now_ball1.v;
									case 'X':
										return {x: -now_ball1.v.x, y: now_ball1.v.y};
									case 'Y':
										return {x: now_ball1.v.x, y: -now_ball1.v.y};
									default:
										return {x: -now_ball1.v.x, y: -now_ball1.v.y};
								}
							}()
						})
					]),
				model.ball),
			bricks: A2(
				$elm$core$List$map,
				function (a) {
					var _v1 = a.hitTime;
					if (_v1.$ === 'Hit') {
						var b = _v1.a;
						return _Utils_update(
							a,
							{
								hitTime: A3($author$project$Strangers4$CollisionBlock$block_black_box_hitTime, now_ball1, a.block, b)
							});
					} else {
						return a;
					}
				},
				now_bricks),
			state: _Utils_ap(
				model.state,
				function () {
					if (status.$ === 'Safe') {
						return _List_Nil;
					} else {
						return _List_fromArray(
							[
								{
								_function: $author$project$Model$Func($author$project$Strangers4$State$genBezierColor),
								loop: false,
								name: 'Color',
								t: 0,
								value: 0
							}
							]);
					}
				}())
		});
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Strangers4$Update$griddle = F4(
	function (clock, flow, cur, ball) {
		var top = $elm$core$Basics$round(
			A2(
				$elm$core$Basics$max,
				100,
				225 - (1.2 * A2($elm$core$Basics$pow, 1.1, 15 + clock))));
		var len = $elm$core$List$length(ball);
		var grid = _List_fromArray(
			[3, 7, 8, 10, 11]);
		var cutting = $elm$core$Basics$round(
			A2($elm$core$Basics$max, 120 - flow, 60));
		var ball_ = (_Utils_cmp(len, cutting) > 0) ? _Utils_ap(
			A2(
				$elm$core$List$map,
				function (a) {
					return A2($elm$core$Maybe$withDefault, $author$project$Tools$dummyBall, a);
				},
				A2(
					$elm$core$List$filter,
					function (a) {
						if (a.$ === 'Just') {
							return true;
						} else {
							return false;
						}
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (i, a) {
								return (A3(
									$elm$core$List$foldr,
									F2(
										function (d, is) {
											return (!A2($elm$core$Basics$modBy, d, i)) || is;
										}),
									false,
									grid) && (_Utils_cmp(
									A2($author$project$Tools$distance, cur.pos, a.pos),
									1.4 * cur.r) < 0)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(a);
							}),
						A2($elm$core$List$take, cutting, ball)))),
			A2($elm$core$List$drop, cutting, ball)) : ball;
		return A2($elm$core$List$take, top, ball_);
	});
var $author$project$Strangers4$Update$moveBall = F2(
	function (flow, model) {
		var static_old_ = A2(
			$elm$core$List$map,
			function (a) {
				return _Utils_update(
					$author$project$Tools$dummyBall,
					{
						color: A3($author$project$Model$rgb, 255, 200, 200),
						pos: a.pos,
						r: 2
					});
			},
			model.ball);
		var static_old = A4(
			$author$project$Strangers4$Update$griddle,
			model.clock,
			flow,
			A2($author$project$Tools$getBall, model.ball, 1),
			static_old_);
		var done = function (ball_maybe) {
			var ball = A2($elm$core$Maybe$withDefault, $author$project$Tools$dummyBall, ball_maybe);
			var pos = ball.pos;
			var v = ball.v;
			var coll = A2(
				$elm$core$List$map,
				function (pt) {
					return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
				},
				ball.collision);
			var newPos = A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
			return _Utils_update(
				ball,
				{collision: coll, pos: newPos});
		};
		return _Utils_update(
			model,
			{
				ball: _Utils_ap(
					_List_fromArray(
						[
							done(
							$elm$core$List$head(model.ball))
						]),
					static_old)
			});
	});
var $author$project$Strangers4$Update$movePaddle = F2(
	function (op, model) {
		var done = function (paddle) {
			var wh = {h: 20.0, w: 100.0};
			var vNorm = 6;
			var pos = paddle.pos;
			var v = function () {
				switch (op.$) {
					case 'Left':
						var _v4 = pos.x > 18;
						if (_v4) {
							return A2($author$project$Model$Point, -vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					case 'Right':
						var _v5 = _Utils_cmp(pos.x, model.canvas.w - 18) < 0;
						if (_v5) {
							return A2($author$project$Model$Point, vNorm, 0);
						} else {
							return $author$project$Tools$dummyPoint;
						}
					default:
						return A2($author$project$Model$Point, 0, 0);
				}
			}();
			var newPos = function () {
				var _v2 = model.god;
				if (_v2) {
					return A2(
						$author$project$Model$Point,
						A2($author$project$Tools$getBall, model.ball, 1).pos.x,
						pos.y + v.y);
				} else {
					return A2($author$project$Model$Point, pos.x + v.x, pos.y + v.y);
				}
			}();
			var col = function () {
				var _v1 = model.god;
				if (_v1) {
					return A2($author$project$Tools$pos2coll, newPos, wh);
				} else {
					return A2(
						$elm$core$List$map,
						function (pt) {
							return A2($author$project$Model$Point, pt.x + v.x, pt.y + v.y);
						},
						paddle.collision);
				}
			}();
			var block = paddle.block;
			var newBlock = function () {
				var _v0 = model.god;
				if (_v0) {
					return A2($author$project$Tools$pos2block, newPos, wh);
				} else {
					return A2(
						$author$project$Model$Block,
						A2($author$project$Model$Point, block.lt.x + v.x, block.lt.y + v.y),
						A2($author$project$Model$Point, block.rb.x + v.x, block.rb.y + v.y));
				}
			}();
			var setPaddle = F2(
				function (npos, paddle_) {
					return _Utils_update(
						paddle_,
						{block: newBlock, collision: col, pos: npos});
				});
			return A2(setPaddle, newPos, paddle);
		};
		return _Utils_update(
			model,
			{
				paddle: A2($elm$core$List$map, done, model.paddle)
			});
	});
var $author$project$Strangers4$CollisionBlock$ball_direction_paddle = F2(
	function (ball, box) {
		var init = $author$project$CollisionBlock$Safe;
		var hit = F2(
			function (paddle, status) {
				var tmp = $elm$core$List$head(paddle);
				var next_tmp = $elm$core$List$tail(paddle);
				if (next_tmp.$ === 'Just') {
					var tail = next_tmp.a;
					if (tmp.$ === 'Just') {
						var head = tmp.a;
						return A2(
							$author$project$Strangers4$CollisionBlock$xyToCorner,
							status,
							A2(
								hit,
								tail,
								A2($author$project$CollisionBlock$block_black_box_hit, ball, head.block)));
					} else {
						return status;
					}
				} else {
					if (tmp.$ === 'Just') {
						var head = tmp.a;
						return A2(
							$author$project$Strangers4$CollisionBlock$xyToCorner,
							status,
							A2(
								hit,
								_List_Nil,
								A2($author$project$CollisionBlock$block_black_box_hit, ball, head.block)));
					} else {
						return status;
					}
				}
			});
		return A2(hit, box, init);
	});
var $author$project$Strangers4$CollisionBlock$paddle_hit = function (model) {
	var now_paddle = model.paddle;
	var now_ball1 = A2($author$project$Tools$getBall, model.ball, 1);
	var status = A2($author$project$Strangers4$CollisionBlock$ball_direction_paddle, now_ball1, now_paddle);
	return _Utils_update(
		model,
		{
			ball: _Utils_ap(
				_List_fromArray(
					[
						_Utils_update(
						now_ball1,
						{
							v: function () {
								switch (status.$) {
									case 'Safe':
										return now_ball1.v;
									case 'X':
										return {x: -now_ball1.v.x, y: now_ball1.v.y};
									case 'Y':
										return {x: now_ball1.v.x, y: -now_ball1.v.y};
									default:
										return {x: -now_ball1.v.x, y: -now_ball1.v.y};
								}
							}()
						})
					]),
				model.ball)
		});
};
var $author$project$Strangers4$Update$winJudge = function (model) {
	var change_brick = function (brick) {
		var _v2 = brick.hitTime;
		if ((_v2.$ === 'Hit') && (_v2.a === 5)) {
			return _Utils_update(
				brick,
				{color: $author$project$Strangers4$View$backgroundColor, hitTime: $author$project$Model$NoMore});
		} else {
			return brick;
		}
	};
	var brick_all = A2($elm$core$List$map, change_brick, model.bricks);
	var win = function () {
		var _v0 = $elm$core$List$isEmpty(
			A2(
				$elm$core$List$filter,
				function (b) {
					return !_Utils_eq(b.hitTime, $author$project$Model$NoMore);
				},
				brick_all));
		if (_v0) {
			return $author$project$Messages$Pass;
		} else {
			var _v1 = _Utils_cmp(
				A2($author$project$Tools$getBall, model.ball, 1).pos.y,
				model.canvas.h + 20) > 0;
			if (_v1) {
				return $author$project$Messages$Lose;
			} else {
				return model.gameStatus;
			}
		}
	}();
	return _Utils_update(
		model,
		{bricks: brick_all, gameStatus: win});
};
var $author$project$Strangers4$Update$exec = F2(
	function (flow, model) {
		var dir = function () {
			var _v0 = model.gameStatus;
			if (_v0.$ === 'Running') {
				var dr = _v0.a;
				return dr;
			} else {
				return $author$project$Messages$Stay;
			}
		}();
		return $author$project$Strangers4$Update$winJudge(
			$author$project$CollisionPoly$wallCheck(
				A2(
					$author$project$Strangers4$Update$moveBall,
					flow,
					$author$project$Strangers4$CollisionBlock$paddle_hit(
						$author$project$Strangers4$CollisionBlock$block_hit(
							A2($author$project$Strangers4$Update$movePaddle, dir, model))))));
	});
var $author$project$Strangers4$Update$move = F2(
	function (elapsed, model) {
		var average = (model.clock * 0.6) + (elapsed * 0.4);
		return A2(
			$author$project$Strangers4$Update$exec,
			elapsed,
			_Utils_update(
				model,
				{clock: average}));
	});
var $author$project$Strangers4$State$getGameState = function (model) {
	var s = $author$project$Tools$dummyState;
	return _Utils_update(
		model,
		{
			state: _List_fromArray(
				[s])
		});
};
var $author$project$Strangers4$State$loopState = F2(
	function (state, t) {
		var _v0 = state.loop;
		if (_v0) {
			return (state.loop && (state.t < 1)) ? _Utils_update(
				state,
				{t: state.t + t}) : _Utils_update(
				state,
				{t: state.t - 1});
		} else {
			return _Utils_update(
				state,
				{t: state.t + t});
		}
	});
var $author$project$Strangers4$State$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.state);
	if (_v0) {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'AnimationPrepare':
				return _Utils_update(
					model,
					{gameStatus: $author$project$Messages$Prepare});
			case 'AnimationPreparePost':
				var model1 = $author$project$Strangers4$State$getGameState(model);
				return _Utils_update(
					model1,
					{
						gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
					});
			case 'AnimationPass':
				return _Utils_update(
					model,
					{gameLevel: $author$project$Messages$Companions5, gameStatus: $author$project$Messages$ChangeLevel});
			default:
				return model;
		}
	} else {
		var state = model.state;
		var newState = A2(
			$elm$core$List$map,
			function (s) {
				return A2($author$project$Strangers4$State$loopState, s, 0.007);
			},
			state);
		var getFunc = function (_v2) {
			var func = _v2.a;
			return func;
		};
		var setModel = F2(
			function (stat, model_) {
				return A2(
					getFunc(stat._function),
					model_,
					stat.t);
			});
		var newModel = A3(
			$elm$core$List$foldl,
			F2(
				function (x, y) {
					return A2(setModel, x, y);
				}),
			_Utils_update(
				model,
				{state: newState}),
			newState);
		return newModel;
	}
};
var $author$project$Strangers4$Update$update = F2(
	function (msg, model) {
		var model4 = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Paused':
					_v1$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Space':
										var _v2 = msg.a;
										return _Utils_update(
											model,
											{
												gameStatus: $author$project$Messages$Running($author$project$Messages$Stay)
											});
									case 'Key_R':
										var _v3 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v1$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v1$3;
						}
					}
					return model;
				case 'AnimationPrepare':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Strangers4$State$stateIterate(model);
						case 'GetViewport':
							var viewport = msg.a.viewport;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(viewport.width, viewport.height)
								});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Prepare':
					_v5$2:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								if (msg.a.$ === 'Space') {
									var _v6 = msg.a;
									return $author$project$Strangers4$State$getPrepareState(
										_Utils_update(
											model,
											{gameStatus: $author$project$Messages$AnimationPreparePost}));
								} else {
									break _v5$2;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v5$2;
						}
					}
					return model;
				case 'AnimationPreparePost':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Strangers4$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Lose':
					_v8$3:
					while (true) {
						switch (msg.$) {
							case 'KeyDown':
								switch (msg.a.$) {
									case 'Key_R':
										var _v9 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									case 'Space':
										var _v10 = msg.a;
										return _Utils_update(
											model,
											{gameStatus: $author$project$Messages$ChangeLevel});
									default:
										break _v8$3;
								}
							case 'Resize':
								var w = msg.a;
								var h = msg.b;
								return _Utils_update(
									model,
									{
										size: _Utils_Tuple2(w, h)
									});
							default:
								break _v8$3;
						}
					}
					return model;
				case 'Pass':
					var model1 = $author$project$Strangers4$State$getEndState(model);
					return _Utils_update(
						model1,
						{finished: model.finished + 1, gameStatus: $author$project$Messages$AnimationPass});
				case 'AnimationPass':
					switch (msg.$) {
						case 'Tick':
							return $author$project$Strangers4$State$stateIterate(model);
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'End':
					switch (msg.$) {
						case 'KeyDown':
							return _Utils_update(
								model,
								{gameLevel: $author$project$Messages$Companions5, gameStatus: $author$project$Messages$AnimationPrepare});
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				case 'Running':
					switch (msg.$) {
						case 'KeyDown':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return $author$project$Messages$Running($author$project$Messages$Left);
									case 'Key_Right':
										return $author$project$Messages$Running($author$project$Messages$Right);
									case 'Key_R':
										return $author$project$Messages$ChangeLevel;
									default:
										return $author$project$Messages$Paused;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'KeyUp':
							var key = msg.a;
							var status = function () {
								switch (key.$) {
									case 'Key_Left':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Left)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									case 'Key_Right':
										return _Utils_eq(
											model.gameStatus,
											$author$project$Messages$Running($author$project$Messages$Right)) ? $author$project$Messages$Running($author$project$Messages$Stay) : model.gameStatus;
									default:
										return model.gameStatus;
								}
							}();
							return _Utils_update(
								model,
								{gameStatus: status});
						case 'Tick':
							var time = msg.a;
							return $author$project$Strangers4$State$stateIterate(
								A2(
									$author$project$Strangers4$Update$move,
									A2($elm$core$Basics$min, time, 25),
									model));
						case 'Resize':
							var w = msg.a;
							var h = msg.b;
							return _Utils_update(
								model,
								{
									size: _Utils_Tuple2(w, h)
								});
						default:
							return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(
			_Utils_update(
				model4,
				{
					visualization: $author$project$Strangers4$View$visualize(model4)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		_v0$4:
		while (true) {
			switch (msg.$) {
				case 'ChooseLevel':
					var level = msg.a;
					switch (level.$) {
						case 'Strangers1':
							return $author$project$Main$reInit(
								_Utils_update(
									model,
									{gameLevel: $author$project$Messages$Strangers1}));
						case 'Friends2':
							return $author$project$Main$reInit(
								_Utils_update(
									model,
									{gameLevel: $author$project$Messages$Friends2}));
						case 'Lovers3':
							return $author$project$Main$reInit(
								_Utils_update(
									model,
									{gameLevel: $author$project$Messages$Lovers3}));
						case 'Strangers4':
							return $author$project$Main$reInit(
								_Utils_update(
									model,
									{gameLevel: $author$project$Messages$Strangers4}));
						case 'Companions5':
							return $author$project$Main$reInit(
								_Utils_update(
									model,
									{gameLevel: $author$project$Messages$Companions5}));
						case 'Death6':
							return $author$project$Main$reInit(
								_Utils_update(
									model,
									{gameLevel: $author$project$Messages$Death6}));
						case 'End7':
							return $author$project$Main$reInit(
								_Utils_update(
									model,
									{gameLevel: $author$project$Messages$End7}));
						default:
							return $author$project$Main$reInit(
								_Utils_update(
									model,
									{gameLevel: $author$project$Messages$Start0}));
					}
				case 'KeyDown':
					switch (msg.a.$) {
						case 'Key_G':
							var _v2 = msg.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{god: !model.god}),
								$elm$core$Platform$Cmd$none);
						case 'Key_S':
							var _v3 = msg.a;
							return A2(
								$elm$core$List$member,
								model.gameLevel,
								_List_fromArray(
									[$author$project$Messages$Start0, $author$project$Messages$End7])) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : (A2(
								$elm$core$List$member,
								model.gameStatus,
								_List_fromArray(
									[$author$project$Messages$AnimationPass, $author$project$Messages$Pass, $author$project$Messages$Lose, $author$project$Messages$AnimationEnd])) ? _Utils_Tuple2(
								$author$project$Tools$nextLevel(model),
								$elm$core$Platform$Cmd$none) : (A2(
								$elm$core$List$member,
								model.gameStatus,
								_List_fromArray(
									[$author$project$Messages$AnimationPrepare, $author$project$Messages$Prepare, $author$project$Messages$AnimationPreparePost, $author$project$Messages$End])) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
								_Utils_update(
									model,
									{gameStatus: $author$project$Messages$Pass}),
								$elm$core$Platform$Cmd$none)));
						case 'Key_D':
							var _v4 = msg.a;
							return _Utils_Tuple2(
								$author$project$Tools$nextLevel(model),
								$elm$core$Platform$Cmd$none);
						default:
							break _v0$4;
					}
				default:
					break _v0$4;
			}
		}
		var _v5 = model.gameStatus;
		if (_v5.$ === 'ChangeLevel') {
			var _v6 = model.gameLevel;
			switch (_v6.$) {
				case 'Strangers1':
					return $author$project$Main$reInit(
						_Utils_update(
							model,
							{gameLevel: $author$project$Messages$Strangers1}));
				case 'Friends2':
					return $author$project$Main$reInit(
						_Utils_update(
							model,
							{gameLevel: $author$project$Messages$Friends2}));
				case 'Lovers3':
					return $author$project$Main$reInit(
						_Utils_update(
							model,
							{gameLevel: $author$project$Messages$Lovers3}));
				case 'Strangers4':
					return $author$project$Main$reInit(
						_Utils_update(
							model,
							{gameLevel: $author$project$Messages$Strangers4}));
				case 'Companions5':
					return $author$project$Main$reInit(
						_Utils_update(
							model,
							{gameLevel: $author$project$Messages$Companions5}));
				case 'Death6':
					return $author$project$Main$reInit(
						_Utils_update(
							model,
							{gameLevel: $author$project$Messages$Death6}));
				case 'End7':
					return $author$project$Main$reInit(
						_Utils_update(
							model,
							{gameLevel: $author$project$Messages$End7}));
				default:
					return $author$project$Main$reInit(
						_Utils_update(
							model,
							{gameLevel: $author$project$Messages$Start0}));
			}
		} else {
			var _v7 = model.gameLevel;
			switch (_v7.$) {
				case 'Strangers1':
					return A2($author$project$Strangers1$Update$update, msg, model);
				case 'Friends2':
					return A2($author$project$Friends2$Update$update, msg, model);
				case 'Lovers3':
					return A2($author$project$Lovers3$Update$update, msg, model);
				case 'Strangers4':
					return A2($author$project$Strangers4$Update$update, msg, model);
				case 'Companions5':
					return A2($author$project$Companions5$Update$update, msg, model);
				case 'Death6':
					return A2($author$project$Death6$Update$update, msg, model);
				case 'End7':
					return A2($author$project$End7$Update$update, msg, model);
				default:
					return A2($author$project$Start0$Update$update, msg, model);
			}
		}
	});
var $author$project$Main$view = function (model) {
	return model.visualization;
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: function (_v0) {
			return $author$project$Main$init;
		},
		subscriptions: $author$project$Subscriptions$subscriptions,
		update: $author$project$Main$update,
		view: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));