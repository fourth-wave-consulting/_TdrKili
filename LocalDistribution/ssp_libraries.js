__sc_ssplibraries_t0 = new Date().getTime(); 
release_metadata = {"name":"SiteBuilder Extensions","bundle_id":"","baselabel":"SBE_Kilimanjaro","version":"Kilimanjaro","datelabel":"2017.00.00","buildno":"0"}
/**
 * @license almond 0.3.0 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

(function () {
    var root = this;
    var previousUnderscore = root._;
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
    var _ = function (obj) {
        if (obj instanceof _)
            return obj;
        if (!(this instanceof _))
            return new _(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
    _.VERSION = '1.7.0';
    var createCallback = function (func, context, argCount) {
        if (context === void 0)
            return func;
        switch (argCount == null ? 3 : argCount) {
        case 1:
            return function (value) {
                return func.call(context, value);
            };
        case 2:
            return function (value, other) {
                return func.call(context, value, other);
            };
        case 3:
            return function (value, index, collection) {
                return func.call(context, value, index, collection);
            };
        case 4:
            return function (accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };
    _.iteratee = function (value, context, argCount) {
        if (value == null)
            return _.identity;
        if (_.isFunction(value))
            return createCallback(value, context, argCount);
        if (_.isObject(value))
            return _.matches(value);
        return _.property(value);
    };
    _.each = _.forEach = function (obj, iteratee, context) {
        if (obj == null)
            return obj;
        iteratee = createCallback(iteratee, context);
        var i, length = obj.length;
        if (length === +length) {
            for (i = 0; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };
    _.map = _.collect = function (obj, iteratee, context) {
        if (obj == null)
            return [];
        iteratee = _.iteratee(iteratee, context);
        var keys = obj.length !== +obj.length && _.keys(obj), length = (keys || obj).length, results = Array(length), currentKey;
        for (var index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };
    var reduceError = 'Reduce of empty array with no initial value';
    _.reduce = _.foldl = _.inject = function (obj, iteratee, memo, context) {
        if (obj == null)
            obj = [];
        iteratee = createCallback(iteratee, context, 4);
        var keys = obj.length !== +obj.length && _.keys(obj), length = (keys || obj).length, index = 0, currentKey;
        if (arguments.length < 3) {
            if (!length)
                throw new TypeError(reduceError);
            memo = obj[keys ? keys[index++] : index++];
        }
        for (; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
    };
    _.reduceRight = _.foldr = function (obj, iteratee, memo, context) {
        if (obj == null)
            obj = [];
        iteratee = createCallback(iteratee, context, 4);
        var keys = obj.length !== +obj.length && _.keys(obj), index = (keys || obj).length, currentKey;
        if (arguments.length < 3) {
            if (!index)
                throw new TypeError(reduceError);
            memo = obj[keys ? keys[--index] : --index];
        }
        while (index--) {
            currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
    };
    _.find = _.detect = function (obj, predicate, context) {
        var result;
        predicate = _.iteratee(predicate, context);
        _.some(obj, function (value, index, list) {
            if (predicate(value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        if (obj == null)
            return results;
        predicate = _.iteratee(predicate, context);
        _.each(obj, function (value, index, list) {
            if (predicate(value, index, list))
                results.push(value);
        });
        return results;
    };
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(_.iteratee(predicate)), context);
    };
    _.every = _.all = function (obj, predicate, context) {
        if (obj == null)
            return true;
        predicate = _.iteratee(predicate, context);
        var keys = obj.length !== +obj.length && _.keys(obj), length = (keys || obj).length, index, currentKey;
        for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj))
                return false;
        }
        return true;
    };
    _.some = _.any = function (obj, predicate, context) {
        if (obj == null)
            return false;
        predicate = _.iteratee(predicate, context);
        var keys = obj.length !== +obj.length && _.keys(obj), length = (keys || obj).length, index, currentKey;
        for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj))
                return true;
        }
        return false;
    };
    _.contains = _.include = function (obj, target) {
        if (obj == null)
            return false;
        if (obj.length !== +obj.length)
            obj = _.values(obj);
        return _.indexOf(obj, target) >= 0;
    };
    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    };
    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    };
    _.where = function (obj, attrs) {
        return _.filter(obj, _.matches(attrs));
    };
    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matches(attrs));
    };
    _.max = function (obj, iteratee, context) {
        var result = -Infinity, lastComputed = -Infinity, value, computed;
        if (iteratee == null && obj != null) {
            obj = obj.length === +obj.length ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };
    _.min = function (obj, iteratee, context) {
        var result = Infinity, lastComputed = Infinity, value, computed;
        if (iteratee == null && obj != null) {
            obj = obj.length === +obj.length ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };
    _.shuffle = function (obj) {
        var set = obj && obj.length === +obj.length ? obj : _.values(obj);
        var length = set.length;
        var shuffled = Array(length);
        for (var index = 0, rand; index < length; index++) {
            rand = _.random(0, index);
            if (rand !== index)
                shuffled[index] = shuffled[rand];
            shuffled[rand] = set[index];
        }
        return shuffled;
    };
    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (obj.length !== +obj.length)
                obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    };
    _.sortBy = function (obj, iteratee, context) {
        iteratee = _.iteratee(iteratee, context);
        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            };
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0)
                    return 1;
                if (a < b || b === void 0)
                    return -1;
            }
            return left.index - right.index;
        }), 'value');
    };
    var group = function (behavior) {
        return function (obj, iteratee, context) {
            var result = {};
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    };
    _.groupBy = group(function (result, value, key) {
        if (_.has(result, key))
            result[key].push(value);
        else
            result[key] = [value];
    });
    _.indexBy = group(function (result, value, key) {
        result[key] = value;
    });
    _.countBy = group(function (result, value, key) {
        if (_.has(result, key))
            result[key]++;
        else
            result[key] = 1;
    });
    _.sortedIndex = function (array, obj, iteratee, context) {
        iteratee = _.iteratee(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = low + high >>> 1;
            if (iteratee(array[mid]) < value)
                low = mid + 1;
            else
                high = mid;
        }
        return low;
    };
    _.toArray = function (obj) {
        if (!obj)
            return [];
        if (_.isArray(obj))
            return slice.call(obj);
        if (obj.length === +obj.length)
            return _.map(obj, _.identity);
        return _.values(obj);
    };
    _.size = function (obj) {
        if (obj == null)
            return 0;
        return obj.length === +obj.length ? obj.length : _.keys(obj).length;
    };
    _.partition = function (obj, predicate, context) {
        predicate = _.iteratee(predicate, context);
        var pass = [], fail = [];
        _.each(obj, function (value, key, obj) {
            (predicate(value, key, obj) ? pass : fail).push(value);
        });
        return [
            pass,
            fail
        ];
    };
    _.first = _.head = _.take = function (array, n, guard) {
        if (array == null)
            return void 0;
        if (n == null || guard)
            return array[0];
        if (n < 0)
            return [];
        return slice.call(array, 0, n);
    };
    _.initial = function (array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };
    _.last = function (array, n, guard) {
        if (array == null)
            return void 0;
        if (n == null || guard)
            return array[array.length - 1];
        return slice.call(array, Math.max(array.length - n, 0));
    };
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };
    _.compact = function (array) {
        return _.filter(array, _.identity);
    };
    var flatten = function (input, shallow, strict, output) {
        if (shallow && _.every(input, _.isArray)) {
            return concat.apply(output, input);
        }
        for (var i = 0, length = input.length; i < length; i++) {
            var value = input[i];
            if (!_.isArray(value) && !_.isArguments(value)) {
                if (!strict)
                    output.push(value);
            } else if (shallow) {
                push.apply(output, value);
            } else {
                flatten(value, shallow, strict, output);
            }
        }
        return output;
    };
    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false, []);
    };
    _.without = function (array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
        if (array == null)
            return [];
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null)
            iteratee = _.iteratee(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            if (isSorted) {
                if (!i || seen !== value)
                    result.push(value);
                seen = value;
            } else if (iteratee) {
                var computed = iteratee(value, i, array);
                if (_.indexOf(seen, computed) < 0) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (_.indexOf(result, value) < 0) {
                result.push(value);
            }
        }
        return result;
    };
    _.union = function () {
        return _.uniq(flatten(arguments, true, true, []));
    };
    _.intersection = function (array) {
        if (array == null)
            return [];
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = array.length; i < length; i++) {
            var item = array[i];
            if (_.contains(result, item))
                continue;
            for (var j = 1; j < argsLength; j++) {
                if (!_.contains(arguments[j], item))
                    break;
            }
            if (j === argsLength)
                result.push(item);
        }
        return result;
    };
    _.difference = function (array) {
        var rest = flatten(slice.call(arguments, 1), true, true, []);
        return _.filter(array, function (value) {
            return !_.contains(rest, value);
        });
    };
    _.zip = function (array) {
        if (array == null)
            return [];
        var length = _.max(arguments, 'length').length;
        var results = Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = _.pluck(arguments, i);
        }
        return results;
    };
    _.object = function (list, values) {
        if (list == null)
            return {};
        var result = {};
        for (var i = 0, length = list.length; i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };
    _.indexOf = function (array, item, isSorted) {
        if (array == null)
            return -1;
        var i = 0, length = array.length;
        if (isSorted) {
            if (typeof isSorted == 'number') {
                i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
            } else {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        for (; i < length; i++)
            if (array[i] === item)
                return i;
        return -1;
    };
    _.lastIndexOf = function (array, item, from) {
        if (array == null)
            return -1;
        var idx = array.length;
        if (typeof from == 'number') {
            idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
        }
        while (--idx >= 0)
            if (array[idx] === item)
                return idx;
        return -1;
    };
    _.range = function (start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = step || 1;
        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);
        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }
        return range;
    };
    var Ctor = function () {
    };
    _.bind = function (func, context) {
        var args, bound;
        if (nativeBind && func.bind === nativeBind)
            return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func))
            throw new TypeError('Bind must be called on a function');
        args = slice.call(arguments, 2);
        bound = function () {
            if (!(this instanceof bound))
                return func.apply(context, args.concat(slice.call(arguments)));
            Ctor.prototype = func.prototype;
            var self = new Ctor();
            Ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (_.isObject(result))
                return result;
            return self;
        };
        return bound;
    };
    _.partial = function (func) {
        var boundArgs = slice.call(arguments, 1);
        return function () {
            var position = 0;
            var args = boundArgs.slice();
            for (var i = 0, length = args.length; i < length; i++) {
                if (args[i] === _)
                    args[i] = arguments[position++];
            }
            while (position < arguments.length)
                args.push(arguments[position++]);
            return func.apply(this, args);
        };
    };
    _.bindAll = function (obj) {
        var i, length = arguments.length, key;
        if (length <= 1)
            throw new Error('bindAll must be passed function names');
        for (i = 1; i < length; i++) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
        }
        return obj;
    };
    _.memoize = function (func, hasher) {
        var memoize = function (key) {
            var cache = memoize.cache;
            var address = hasher ? hasher.apply(this, arguments) : key;
            if (!_.has(cache, address))
                cache[address] = func.apply(this, arguments);
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = function (func) {
        return _.delay.apply(_, [
            func,
            1
        ].concat(slice.call(arguments, 1)));
    };
    _.throttle = function (func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options)
            options = {};
        var later = function () {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        };
        return function () {
            var now = _.now();
            if (!previous && options.leading === false)
                previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };
    _.debounce = function (func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        var later = function () {
            var last = _.now() - timestamp;
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout)
                        context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout)
                timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    };
    _.wrap = function (func, wrapper) {
        return _.partial(wrapper, func);
    };
    _.negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        };
    };
    _.compose = function () {
        var args = arguments;
        var start = args.length - 1;
        return function () {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--)
                result = args[i].call(this, result);
            return result;
        };
    };
    _.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };
    _.before = function (times, func) {
        var memo;
        return function () {
            if (--times > 0) {
                memo = func.apply(this, arguments);
            } else {
                func = null;
            }
            return memo;
        };
    };
    _.once = _.partial(_.before, 2);
    _.keys = function (obj) {
        if (!_.isObject(obj))
            return [];
        if (nativeKeys)
            return nativeKeys(obj);
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key))
                keys.push(key);
        return keys;
    };
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };
    _.pairs = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [
                keys[i],
                obj[keys[i]]
            ];
        }
        return pairs;
    };
    _.invert = function (obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };
    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key]))
                names.push(key);
        }
        return names.sort();
    };
    _.extend = function (obj) {
        if (!_.isObject(obj))
            return obj;
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    };
    _.pick = function (obj, iteratee, context) {
        var result = {}, key;
        if (obj == null)
            return result;
        if (_.isFunction(iteratee)) {
            iteratee = createCallback(iteratee, context);
            for (key in obj) {
                var value = obj[key];
                if (iteratee(value, key, obj))
                    result[key] = value;
            }
        } else {
            var keys = concat.apply([], slice.call(arguments, 1));
            obj = new Object(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                key = keys[i];
                if (key in obj)
                    result[key] = obj[key];
            }
        }
        return result;
    };
    _.omit = function (obj, iteratee, context) {
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
        } else {
            var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
            iteratee = function (value, key) {
                return !_.contains(keys, key);
            };
        }
        return _.pick(obj, iteratee, context);
    };
    _.defaults = function (obj) {
        if (!_.isObject(obj))
            return obj;
        for (var i = 1, length = arguments.length; i < length; i++) {
            var source = arguments[i];
            for (var prop in source) {
                if (obj[prop] === void 0)
                    obj[prop] = source[prop];
            }
        }
        return obj;
    };
    _.clone = function (obj) {
        if (!_.isObject(obj))
            return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    var eq = function (a, b, aStack, bStack) {
        if (a === b)
            return a !== 0 || 1 / a === 1 / b;
        if (a == null || b == null)
            return a === b;
        if (a instanceof _)
            a = a._wrapped;
        if (b instanceof _)
            b = b._wrapped;
        var className = toString.call(a);
        if (className !== toString.call(b))
            return false;
        switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a)
                return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
        }
        if (typeof a != 'object' || typeof b != 'object')
            return false;
        var length = aStack.length;
        while (length--) {
            if (aStack[length] === a)
                return bStack[length] === b;
        }
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && 'constructor' in a && 'constructor' in b && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) {
            return false;
        }
        aStack.push(a);
        bStack.push(b);
        var size, result;
        if (className === '[object Array]') {
            size = a.length;
            result = size === b.length;
            if (result) {
                while (size--) {
                    if (!(result = eq(a[size], b[size], aStack, bStack)))
                        break;
                }
            }
        } else {
            var keys = _.keys(a), key;
            size = keys.length;
            result = _.keys(b).length === size;
            if (result) {
                while (size--) {
                    key = keys[size];
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))
                        break;
                }
            }
        }
        aStack.pop();
        bStack.pop();
        return result;
    };
    _.isEqual = function (a, b) {
        return eq(a, b, [], []);
    };
    _.isEmpty = function (obj) {
        if (obj == null)
            return true;
        if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))
            return obj.length === 0;
        for (var key in obj)
            if (_.has(obj, key))
                return false;
        return true;
    };
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    _.each([
        'Arguments',
        'Function',
        'String',
        'Number',
        'Date',
        'RegExp'
    ], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return _.has(obj, 'callee');
        };
    }
    if (typeof /./ !== 'function') {
        _.isFunction = function (obj) {
            return typeof obj == 'function' || false;
        };
    }
    _.isFinite = function (obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    _.isNaN = function (obj) {
        return _.isNumber(obj) && obj !== +obj;
    };
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };
    _.isNull = function (obj) {
        return obj === null;
    };
    _.isUndefined = function (obj) {
        return obj === void 0;
    };
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function (value) {
        return value;
    };
    _.constant = function (value) {
        return function () {
            return value;
        };
    };
    _.noop = function () {
    };
    _.property = function (key) {
        return function (obj) {
            return obj[key];
        };
    };
    _.matches = function (attrs) {
        var pairs = _.pairs(attrs), length = pairs.length;
        return function (obj) {
            if (obj == null)
                return !length;
            obj = new Object(obj);
            for (var i = 0; i < length; i++) {
                var pair = pairs[i], key = pair[0];
                if (pair[1] !== obj[key] || !(key in obj))
                    return false;
            }
            return true;
        };
    };
    _.times = function (n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = createCallback(iteratee, context, 1);
        for (var i = 0; i < n; i++)
            accum[i] = iteratee(i);
        return accum;
    };
    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    _.now = Date.now || function () {
        return new Date().getTime();
    };
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);
    var createEscaper = function (map) {
        var escaper = function (match) {
            return map[match];
        };
        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);
    _.result = function (object, property) {
        if (object == null)
            return void 0;
        var value = object[property];
        return _.isFunction(value) ? object[property]() : value;
    };
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        '\'': '\'',
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
    var escapeChar = function (match) {
        return '\\' + escapes[match];
    };
    _.template = function (text, settings, oldSettings) {
        if (!settings && oldSettings)
            settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        var index = 0;
        var source = '__p+=\'';
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;
            if (escape) {
                source += '\'+\n((__t=(' + escape + '))==null?\'\':_.escape(__t))+\n\'';
            } else if (interpolate) {
                source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
            } else if (evaluate) {
                source += '\';\n' + evaluate + '\n__p+=\'';
            }
            return match;
        });
        source += '\';\n';
        if (!settings.variable)
            source = 'with(obj||{}){\n' + source + '}\n';
        source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';
        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        var template = function (data) {
            return render.call(this, data, _);
        };
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';
        return template;
    };
    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };
    var result = function (obj) {
        return this._chain ? _(obj).chain() : obj;
    };
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };
    _.mixin(_);
    _.each([
        'pop',
        'push',
        'reverse',
        'shift',
        'sort',
        'splice',
        'unshift'
    ], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0)
                delete obj[0];
            return result.call(this, obj);
        };
    });
    _.each([
        'concat',
        'join',
        'slice'
    ], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });
    _.prototype.value = function () {
        return this._wrapped;
    };
    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function () {
            return _;
        });
    }
}.call(this));
define('Events', ['underscore'], function (_) {
    'use strict';
    var slice = Array.prototype.slice, eventSplitter = /\s+/;
    var Events = {
        on: function (events, callback, context) {
            var calls, event, node, tail, list;
            if (!callback) {
                return this;
            }
            events = events.split(eventSplitter);
            calls = this._callbacks || (this._callbacks = {});
            while (!!(event = events.shift())) {
                list = calls[event];
                node = list ? list.tail : {};
                node.next = tail = {};
                node.context = context;
                node.callback = callback;
                calls[event] = {
                    tail: tail,
                    next: list ? list.next : node
                };
            }
            return this;
        },
        off: function (events, callback, context) {
            var event, calls, node, tail, cb, ctx;
            if (!(calls = this._callbacks)) {
                return;
            }
            if (!(events || callback || context)) {
                delete this._callbacks;
                return this;
            }
            events = events ? events.split(eventSplitter) : _.keys(calls);
            while (!!(event = events.shift())) {
                node = calls[event];
                delete calls[event];
                if (!node || !(callback || context)) {
                    continue;
                }
                tail = node.tail;
                while ((node = node.next) !== tail) {
                    cb = node.callback;
                    ctx = node.context;
                    if (callback && cb !== callback || context && ctx !== context) {
                        this.on(event, cb, ctx);
                    }
                }
            }
            return this;
        },
        trigger: function (events) {
            var event, node, calls, tail, args, all, rest;
            if (!(calls = this._callbacks)) {
                return this;
            }
            all = calls.all;
            events = events.split(eventSplitter);
            rest = slice.call(arguments, 1);
            while (!!(event = events.shift())) {
                if (!!(node = calls[event])) {
                    tail = node.tail;
                    while ((node = node.next) !== tail) {
                        node.callback.apply(node.context || this, rest);
                    }
                }
                if (!!(node = all)) {
                    tail = node.tail;
                    args = [event].concat(rest);
                    while ((node = node.next) !== tail) {
                        node.callback.apply(node.context || this, args);
                    }
                }
            }
            return this;
        }
    };
    Events.bind = Events.on;
    Events.unbind = Events.off;
    return Events;
});
define('SC.ComponentContainer', ['underscore'], function (_) {
    'use strict';
    function sealComponent(component, component_name) {
        _.each(component, function (value, prop) {
            Object.defineProperty(component, prop, {
                get: function () {
                    return value;
                },
                set: function () {
                    throw new Error('You cannot override property ' + prop + ' of component ' + component_name);
                }
            });
        });
        return component;
    }
    return {
        _components: {},
        registerComponent: function registerComponent(component) {
            if (component && component.componentName) {
                this._components[component.componentName] = sealComponent(component, component.componentName);
                return;
            }
            throw {
                status: SC.ERROR_IDENTIFIERS.invalidParameter.status,
                code: SC.ERROR_IDENTIFIERS.invalidParameter.code,
                message: 'Invalid component parameter, make sure you specify a componentName property and getProxy method'
            };
        },
        getComponent: function getComponent(component_name) {
            return this._components[component_name] || null;
        }
    };
});
define('SC.Models.Init', ['underscore'], function (_) {
    'use strict';
    var wrapped_objects = {};
    var suite_script_functions_to_wrap = [
        'nlapiLoadRecord',
        'nlapiSearchRecord',
        'nlapiSubmitRecord',
        'nlapiCreateRecord',
        'nlapiLookupField'
    ];
    var container = null, session = null, customer = null, context = null, order = null;
    switch (nlapiGetContext().getExecutionContext()) {
    case 'suitelet':
        context = nlapiGetContext();
        break;
    case 'webstore':
    case 'webservices':
    case 'webapplication':
        container = nlapiGetWebContainer();
        session = container.getShoppingSession();
        customer = session.getCustomer();
        context = nlapiGetContext();
        order = session.getOrder();
        break;
    default:
        break;
    }
    function log(level, title, details) {
        var console = require('Console'), levels = {
                'DEBUG': 'log',
                'AUDIT': 'info',
                'EMERGENCY': 'error',
                'ERROR': 'warn'
            };
        console[levels[level]](title, details);
    }
    function wrapObject(object, class_name) {
        if (!wrapped_objects[class_name]) {
            wrapped_objects[class_name] = {};
            for (var method_name in object) {
                if (method_name !== 'prototype') {
                    wrapped_objects[class_name][method_name] = wrap(object, method_name, class_name);
                }
            }
        }
        return wrapped_objects[class_name];
    }
    function wrap(object, method_name, class_name, original_function) {
        return function () {
            var result, function_name = class_name + '.' + method_name + '()', start = Date.now();
            try {
                if (original_function) {
                    result = original_function.apply(object, arguments);
                } else {
                    console.log('Executing ' + object[method_name] + ' Length: ' + object[method_name].length + ' ToString: ' + object[method_name].toString());
                    result = object[method_name].apply(object, arguments);
                }
            } catch (e) {
                log('ERROR', function_name, 'Arguments: ' + JSON.stringify(arguments) + ' Exception: ' + JSON.stringify(e));
                throw e;
            }
            log('DEBUG', function_name, 'Arguments: ' + JSON.stringify(arguments) + ' Time: ' + (Date.now() - start) + 'ms RemainingUsage: ' + nlapiGetContext().getRemainingUsage());
            return result;
        };
    }
    function getCurrentLocation() {
        var location = context.getLocation();
        if (SC.Configuration.isSCIS) {
            location = JSON.parse(context.getSessionObject('location'));
            location = location && location.internalid;
        }
        return location;
    }
    if (SC.debuggingMode) {
        _.each(suite_script_functions_to_wrap, function (method_name) {
            this[method_name] = wrap(this, method_name, 'SuiteScript', this[method_name]);
        }, this);
        return {
            container: wrapObject(container, 'WebContainer'),
            session: wrapObject(session, 'ShoppingSession'),
            customer: wrapObject(customer, 'Customer'),
            context: wrapObject(context, 'Context'),
            order: wrapObject(order, 'Order'),
            getCurrentLocation: getCurrentLocation
        };
    } else {
        return {
            container: container,
            session: session,
            customer: customer,
            context: context,
            order: order,
            getCurrentLocation: getCurrentLocation
        };
    }
});
define('Utils', [
    'SC.Models.Init',
    'underscore'
], function (ModelsInit, _) {
    'use strict';
    function _getColumnLabel(column) {
        var formula = column.getFormula();
        if (formula) {
            return column.getLabel() || column.getName();
        } else {
            return column.getName();
        }
    }
    var Utils = {
        deepCopy: function deepCopy(obj) {
            if (_.isFunction(obj) || this.isInstanceOfnlobjRecord(obj)) {
                return null;
            }
            var copy = {}, self = this;
            if (_.isArray(obj)) {
                copy = [];
                _.each(obj, function (value) {
                    !_.isFunction(value) && copy.push(self.deepCopy(value));
                });
            } else if (_.isObject(obj)) {
                for (var i = 0; i < Object.keys(obj).length; i++) {
                    var attr = Object.keys(obj)[i];
                    var value = obj[attr];
                    if (!_.isFunction(value) && _.isString(attr) && attr.indexOf('_') !== 0) {
                        copy[attr] = self.deepCopy(value);
                    }
                }
            } else {
                copy = obj;
            }
            return copy;
        },
        isInstanceOfnlobjRecord: function (record) {
            return record && !_.isString(record) && !_.isNumber(record) && !_.isBoolean(record) && _.isFunction(record.getRecordType) && _.isFunction(record.getId);
        },
        isDateType: function (field) {
            return field === 'trandate' || field === 'createddate' || field === 'datecreated';
        },
        transformDateFormat: function (format) {
            return format.toUpperCase().replace('MONTH', 'MMMM').replace('MON', 'MMM');
        },
        transformTimeFormat: function (format) {
            return format.toUpperCase().replace('FMHH', 'hh').replace('FMMI', 'mm').replace('hh24', 'HH').replace('AM', 'A');
        },
        mapSearchResult: function mapSearchResult(columns, apiElement) {
            var element = {};
            columns.forEach(function (column) {
                var col = column.searchColumn, name = col.getName(), text = apiElement.getText(name, col.getJoin(), col.getSummary()), value = apiElement.getValue(name, col.getJoin(), col.getSummary()), has_function = col.getFunction(), fieldName = column.fieldName, is_datetype = Utils.isDateType(fieldName);
                element[fieldName] = is_datetype && !has_function ? nlapiStringToDate(value) : value;
                if (text) {
                    element[fieldName + '_text'] = text;
                }
            });
            return element;
        },
        mapSearchResults: function mapSearchResults(searchColumns, searchResults) {
            if (!searchColumns || !searchResults) {
                return [];
            }
            var nameToCol = {}, columns = [];
            _.each(searchColumns, function (col) {
                var name = _getColumnLabel(col);
                columns.push({ searchColumn: col });
                nameToCol[name] = (nameToCol[name] || 0) + 1;
            });
            _.each(columns, function (column) {
                var searchColumn = column.searchColumn, isANameClash = nameToCol[_getColumnLabel(searchColumn)] > 1, coulumnJoim = searchColumn.getJoin();
                column.fieldName = _getColumnLabel(searchColumn);
                if (isANameClash && coulumnJoim) {
                    column.fieldName += '_' + coulumnJoim;
                }
            });
            return searchResults.map(function (apiElement) {
                return Utils.mapSearchResult(columns, apiElement);
            });
        },
        mapLoadResult: function mapLoadResult(columns, record) {
            var record_info = {};
            columns.forEach(function (name) {
                var value = record.getFieldValue(name);
                if (name === 'image' && !!value) {
                    var imageRecord = nlapiLoadFile(value);
                    if (!!imageRecord) {
                        record_info[name] = imageRecord.getURL();
                    } else {
                        record_info[name] = '';
                    }
                } else {
                    record_info[name] = value;
                }
            });
            return record_info;
        },
        loadAndExecuteSearch: function loadAndExecuteSearch(searchName, filters) {
            var savedSearch = nlapiLoadSearch(null, searchName);
            var filtersSS = savedSearch.getFilters();
            savedSearch.setFilterExpression(filters);
            savedSearch.addFilters(filtersSS);
            var runSearch = savedSearch.runSearch();
            var searchResults = runSearch.getResults(0, 1000);
            return Utils.mapSearchResults(savedSearch.getColumns(), searchResults);
        },
        loadAndMapSearch: function loadAndMapSearch(searchName, filters) {
            var savedSearch;
            filters = filters || [];
            try {
                savedSearch = nlapiLoadSearch(null, searchName);
            } catch (err) {
                console.log('Unable to load search ' + searchName, err);
                return [];
            }
            var searchResults = nlapiSearchRecord(null, searchName, filters);
            return Utils.mapSearchResults(savedSearch.getColumns(), searchResults);
        },
        mapOptions: function mapOptions(record_options) {
            var options_rows = record_options.split('\x04');
            var options_items = options_rows.map(function (row) {
                return row.split('\x03');
            });
            var options = {};
            options_items.forEach(function (item) {
                options[item[0]] = {
                    name: item[0],
                    desc: item[2],
                    value: item[3]
                };
            });
            return options;
        },
        makeid: function makeid(maxLength) {
            return Math.random().toString(36).substring(2, maxLength + 2 || 5);
        },
        getMolecule: function getMolecule(request) {
            var regex = /https:\/\/system(.*)\.netsuite\.com/;
            var molecule = request.getURL().match(regex);
            return molecule && molecule[1] || '';
        },
        formatReceiptCurrency: function formatReceiptCurrency(value) {
            var parsedValue = parseFloat(value);
            if (parsedValue < 0) {
                if (value.substring) {
                    return '($ ' + value.substring(1) + ')';
                }
                return '($ ' + value.toFixed(2).substring(1) + ')';
            }
            return '$ ' + parsedValue.toFixed(2);
        },
        sanitizeString: function (text) {
            return text ? text.replace(/<br>/g, '\n').replace(/</g, '&lt;').replace(/\>/g, '&gt;') : '';
        },
        formatCurrency: function (value, symbol) {
            var value_float = parseFloat(value);
            if (isNaN(value_float)) {
                value_float = parseFloat(0);
            }
            var negative = value_float < 0;
            value_float = Math.abs(value_float);
            value_float = parseInt((value_float + 0.005) * 100, 10) / 100;
            var value_string = value_float.toString(), groupseparator = ',', decimalseparator = '.', negativeprefix = '(', negativesuffix = ')', settings = SC && SC.ENVIRONMENT && SC.ENVIRONMENT.siteSettings ? SC.ENVIRONMENT.siteSettings : {};
            if (window.hasOwnProperty('groupseparator')) {
                groupseparator = window.groupseparator;
            } else if (settings.hasOwnProperty('groupseparator')) {
                groupseparator = settings.groupseparator;
            }
            if (window.hasOwnProperty('decimalseparator')) {
                decimalseparator = window.decimalseparator;
            } else if (settings.hasOwnProperty('decimalseparator')) {
                decimalseparator = settings.decimalseparator;
            }
            if (window.hasOwnProperty('negativeprefix')) {
                negativeprefix = window.negativeprefix;
            } else if (settings.hasOwnProperty('negativeprefix')) {
                negativeprefix = settings.negativeprefix;
            }
            if (window.hasOwnProperty('negativesuffix')) {
                negativesuffix = window.negativesuffix;
            } else if (settings.hasOwnProperty('negativesuffix')) {
                negativesuffix = settings.negativesuffix;
            }
            value_string = value_string.replace('.', decimalseparator);
            var decimal_position = value_string.indexOf(decimalseparator);
            if (!~decimal_position) {
                value_string += decimalseparator + '00';
                decimal_position = value_string.indexOf(decimalseparator);
            } else if (value_string.indexOf(decimalseparator) === value_string.length - 2) {
                value_string += '0';
            }
            var thousand_string = '';
            for (var i = value_string.length - 1; i >= 0; i--) {
                thousand_string = (i > 0 && i < decimal_position && (decimal_position - i) % 3 === 0 ? groupseparator : '') + value_string[i] + thousand_string;
            }
            if (!symbol) {
                if (typeof ModelsInit.session !== 'undefined' && ModelsInit.session.getShopperCurrency) {
                    try {
                        symbol = ModelsInit.session.getShopperCurrency().symbol;
                    } catch (e) {
                    }
                } else if (settings.shopperCurrency) {
                    symbol = settings.shopperCurrency.symbol;
                } else if (SC && SC.ENVIRONMENT && SC.ENVIRONMENT.currentCurrency) {
                    symbol = SC.ENVIRONMENT.currentCurrency.symbol;
                }
                if (!symbol) {
                    symbol = '$';
                }
            }
            value_string = symbol + thousand_string;
            return negative ? negativeprefix + value_string + negativesuffix : value_string;
        },
        isDepartmentMandatory: function () {
            return this.isFeatureEnabled('DEPARTMENTS');
        },
        isLocationMandatory: function () {
            return this.isFeatureEnabled('LOCATIONS');
        },
        isClassMandatory: function () {
            return this.isFeatureEnabled('CLASSES');
        },
        isFulfillmentRequestEnabled: function () {
            return this.isFeatureEnabled('FULFILLMENTREQUEST');
        },
        isFeatureEnabled: function (feature) {
            return ModelsInit.context.getFeature(feature);
        },
        isCheckoutDomain: function isCheckoutDomain() {
            return ModelsInit.session.isCheckoutSupported();
        },
        isShoppingDomain: function isShoppingDomain() {
            return ModelsInit.session.isShoppingSupported();
        },
        isSingleDomain: function isSingleDomain() {
            return this.isShoppingDomain() && this.isCheckoutDomain();
        },
        isInShopping: function isInShopping(request) {
            return this.isShoppingDomain() && (request.getHeader('X-SC-Touchpoint') === 'shopping' || request.getParameter('X-SC-Touchpoint') === 'shopping');
        },
        isHttpsSupported: function isHttpsSupported() {
            return ~ModelsInit.session.getSiteSettings(['touchpoints']).touchpoints.home.indexOf('https');
        },
        isInCheckout: function isInCheckout(request) {
            var self = this;
            if (!self.isSingleDomain()) {
                return self.isCheckoutDomain();
            } else {
                var paypal_complete = ModelsInit.context.getSessionObject('paypal_complete') === 'T', is_in_checkout = request.getHeader('X-SC-Touchpoint') === 'checkout' || request.getHeader('X-SC-Touchpoint') === 'myaccount' || request.getParameter('X-SC-Touchpoint') === 'checkout' || request.getParameter('X-SC-Touchpoint') === 'myaccount';
                return self.isCheckoutDomain() && (is_in_checkout || paypal_complete);
            }
        },
        _isAccountingPreferenceEnabled: function (preference) {
            var accountingPreferences = nlapiLoadConfiguration('accountingpreferences');
            return accountingPreferences.getFieldValue(preference) === 'T';
        },
        toCurrency: function (amount) {
            var r = parseFloat(amount);
            return isNaN(r) ? 0 : r;
        },
        recordTypeExists: function (record_type_name) {
            try {
                nlapiCreateSearch(record_type_name, null, [], []);
            } catch (error) {
                return false;
            }
            return true;
        },
        recordTypeHasField: function (record_type_name, field_name) {
            try {
                nlapiLookupField(record_type_name, 1, field_name);
                return true;
            } catch (error) {
                return false;
            }
        },
        getTransactionType: function (internalid) {
            try {
                return nlapiLookupField('transaction', internalid, 'recordtype');
            } catch (error) {
                return '';
            }
        },
        getItemOptionsObject: function (options_string) {
            var options_object = [];
            if (options_string && options_string !== '- None -') {
                var split_char_3 = String.fromCharCode(3), split_char_4 = String.fromCharCode(4);
                _.each(options_string.split(split_char_4), function (option_line) {
                    option_line = option_line.split(split_char_3);
                    options_object.push({
                        id: option_line[0],
                        name: option_line[2],
                        value: option_line[3],
                        displayvalue: option_line[4],
                        mandatory: option_line[1]
                    });
                });
            }
            return options_object;
        },
        setPaymentMethodToResult: function (record, result) {
            var paymentmethod = {
                    type: record.getFieldValue('paymethtype'),
                    primary: true,
                    name: record.getFieldText('paymentmethod')
                }, ccnumber = record.getFieldValue('ccnumber');
            if (ccnumber) {
                paymentmethod.type = 'creditcard';
                paymentmethod.creditcard = {
                    ccnumber: ccnumber,
                    ccexpiredate: record.getFieldValue('ccexpiredate'),
                    ccname: record.getFieldValue('ccname'),
                    internalid: record.getFieldValue('creditcard'),
                    paymentmethod: {
                        ispaypal: 'F',
                        name: record.getFieldText('paymentmethod'),
                        creditcard: 'T',
                        internalid: record.getFieldValue('paymentmethod')
                    }
                };
            }
            if (record.getFieldValue('ccstreet')) {
                paymentmethod.ccstreet = record.getFieldValue('ccstreet');
            }
            if (record.getFieldValue('cczipcode')) {
                paymentmethod.cczipcode = record.getFieldValue('cczipcode');
            }
            if (record.getFieldValue('terms')) {
                paymentmethod.type = 'invoice';
                paymentmethod.purchasenumber = record.getFieldValue('otherrefnum');
                paymentmethod.paymentterms = {
                    internalid: record.getFieldValue('terms'),
                    name: record.getFieldText('terms')
                };
            }
            result.paymentmethods = [paymentmethod];
        },
        trim: function trim(str) {
            return str.replace(/^\s+|\s+$/gm, '');
        },
        stringEndsWith: function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        },
        getPathFromObject: function (object, path, default_value) {
            if (!path) {
                return object;
            } else if (object) {
                var tokens = path.split('.'), prev = object, n = 0;
                while (!_.isUndefined(prev) && n < tokens.length) {
                    prev = prev[tokens[n++]];
                }
                if (!_.isUndefined(prev)) {
                    return prev;
                }
            }
            return default_value;
        },
        setPathFromObject: function (object, path, value) {
            if (!path) {
                return;
            } else if (!object) {
                return;
            }
            var tokens = path.split('.'), prev = object;
            for (var token_idx = 0; token_idx < tokens.length - 1; ++token_idx) {
                var current_token = tokens[token_idx];
                if (_.isUndefined(prev[current_token])) {
                    prev[current_token] = {};
                }
                prev = prev[current_token];
            }
            prev[_.last(tokens)] = value;
        },
        getTodayDate: function () {
            this.today = this.today || new Date().getTime();
            return new Date(this.today);
        }
    };
    return Utils;
});
define('Console', ['underscore'], function (_) {
    'use strict';
    if (typeof console === 'undefined') {
        console = {};
    }
    var maxDetailsLength = 3995, maxTitleLength = 95;
    function basicClone(value) {
        var t = typeof value;
        if (t === 'function') {
            return 'function';
        } else if (!value || t !== 'object') {
            return value;
        } else {
            var o = {};
            Object.keys(value).forEach(function (key) {
                var val = value[key];
                var t2 = typeof val;
                if (t2 === 'string' || t2 === 'number' || t2 === 'boolean') {
                    o[key] = val;
                } else {
                    o[key] = t2;
                }
            });
            return o;
        }
    }
    function stringify(value) {
        if (value && value.toJSON) {
            return value.toJSON();
        } else {
            value = basicClone(value);
            return JSON.stringify(value);
        }
    }
    var console_methods = 'assert clear count debug dir dirxml exception group groupCollapsed groupEnd info log profile profileEnd table time timeEnd trace warn'.split(' '), idx = console_methods.length, noop = function () {
        };
    while (--idx >= 0) {
        var method = console_methods[idx];
        if (typeof console[method] === 'undefined') {
            console[method] = noop;
        }
    }
    if (typeof console.memory === 'undefined') {
        console.memory = {};
    }
    _.each({
        'log': 'DEBUG',
        'info': 'AUDIT',
        'error': 'EMERGENCY',
        'warn': 'ERROR'
    }, function (value, key) {
        console[key] = function () {
            var title, details;
            if (arguments.length > 1) {
                title = arguments[0];
                title = typeof title === 'object' ? stringify(title) : title;
                details = arguments[1];
                details = typeof details === 'object' ? stringify(details) : details;
            } else {
                title = '';
                details = arguments[0] || 'null';
            }
            if (details && details.length > maxDetailsLength) {
                details = details.match(new RegExp('.{1,' + maxDetailsLength + '}', 'g'));
            } else {
                details = [details];
            }
            _.each(details, function (detail, key, list) {
                var newTitle = list.length > 1 ? title.substring(0, maxTitleLength) + '(' + (key + 1) + ')' : title;
                nlapiLogExecution(value, newTitle, detail);
            });
        };
    });
    _.extend(console, {
        timeEntries: [],
        trace: function () {
            try {
                ''.foobar();
            } catch (err) {
                var stack = err.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@').split('\n');
                console.log(stack);
            }
        },
        time: function (text) {
            if (typeof text === 'string') {
                console.timeEntries[text] = Date.now();
            }
        },
        timeEnd: function (text) {
            if (typeof text === 'string') {
                if (!arguments.length) {
                    console.warn('TypeError:', 'Not enough arguments');
                } else {
                    if (typeof console.timeEntries[text] !== 'undefined') {
                        console.log(text + ':', Date.now() - console.timeEntries[text] + 'ms');
                        delete console.timeEntries[text];
                    }
                }
            }
        }
    });
    return console;
});
define('Configuration', [
    'Utils',
    'underscore',
    'SC.Models.Init',
    'Console'
], function (Utils, _, ModelsInit) {
    'use strict';
    function mergeConfigurationObjects(target, source) {
        if (!_.isObject(target)) {
            return source;
        }
        if (_.isArray(source) && _.isArray(target)) {
            target.length = source.length;
        }
        _.each(source, function (value, key) {
            if (key in target) {
                target[key] = mergeConfigurationObjects(target[key], value);
            } else {
                target[key] = value;
            }
        });
        return target;
    }
    SC.Configuration = {
        get: function (path, defaultValue) {
            return Utils.getPathFromObject(this, path, defaultValue);
        }
    };
    var domain = ModelsInit.session.getSiteSettings(['touchpoints']).touchpoints.home.match(/^http(s?)\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[2];
    SC.Configuration = mergeConfigurationObjects(SC.Configuration, typeof ConfigurationManifestDefaults === 'undefined' ? {} : ConfigurationManifestDefaults);
    if (Utils.recordTypeExists('customrecord_ns_sc_configuration')) {
        var siteid = ModelsInit.session.getSiteSettings(['siteid']).siteid, config_key = domain ? siteid + '|' + domain : siteid + '|all', search = nlapiCreateSearch('customrecord_ns_sc_configuration', [new nlobjSearchFilter('custrecord_ns_scc_key', null, 'is', config_key)], [new nlobjSearchColumn('custrecord_ns_scc_value')]), result = search.runSearch().getResults(0, 1000);
        var configuration = result.length && JSON.parse(result[result.length - 1].getValue('custrecord_ns_scc_value')) || {};
        SC.Configuration = mergeConfigurationObjects(SC.Configuration, configuration);
    }
    SC.Configuration.hosts = [];
    if (SC.Configuration.multiDomain && SC.Configuration.multiDomain.hosts && SC.Configuration.multiDomain.hosts.languages) {
        _.each(SC.Configuration.multiDomain.hosts.languages, function (language) {
            var storedHost = _.find(SC.Configuration.hosts, function (host) {
                return host.title === language.host;
            });
            function getLanguageObj() {
                return {
                    title: language.title,
                    host: language.domain,
                    locale: language.locale
                };
            }
            if (!storedHost) {
                SC.Configuration.hosts.push({
                    title: language.host,
                    languages: [getLanguageObj()],
                    currencies: _.filter(SC.Configuration.multiDomain.hosts.currencies, function (currency) {
                        return currency.host === language.host;
                    })
                });
            } else {
                storedHost.languages.push(getLanguageObj());
            }
        });
    }
    SC.Configuration.categories = ModelsInit.context.getSetting('FEATURE', 'COMMERCECATEGORIES') === 'T' ? SC.Configuration.categories : false;
    if (typeof __sc_ssplibraries_t0 !== 'undefined') {
        SC.Configuration.__sc_ssplibraries_time = new Date().getTime() - __sc_ssplibraries_t0;
    }
    return SC.Configuration;
});
define('Application.Error', [], function () {
    'use strict';
    return {
        badRequestError: {
            status: 400,
            code: 'ERR_BAD_REQUEST',
            message: 'Bad Request'
        },
        unauthorizedError: {
            status: 401,
            code: 'ERR_USER_NOT_LOGGED_IN',
            message: 'Not logged In'
        },
        sessionTimedOutError: {
            status: 401,
            code: 'ERR_USER_SESSION_TIMED_OUT',
            message: 'User session timed out'
        },
        forbiddenError: {
            status: 403,
            code: 'ERR_INSUFFICIENT_PERMISSIONS',
            message: 'Insufficient permissions'
        },
        notFoundError: {
            status: 404,
            code: 'ERR_RECORD_NOT_FOUND',
            message: 'Not found'
        },
        methodNotAllowedError: {
            status: 405,
            code: 'ERR_METHOD_NOT_ALLOWED',
            message: 'Sorry, you are not allowed to perform this action.'
        },
        invalidItemsFieldsAdvancedName: {
            status: 500,
            code: 'ERR_INVALID_ITEMS_FIELDS_ADVANCED_NAME',
            message: 'Please check if the fieldset is created.'
        },
        orderIdRequired: {
            status: 400,
            code: 'ORDER_REQUIRED',
            message: 'You must specify an Order Id.'
        },
        notImplemented: {
            status: 501,
            code: 'NOT_IMPLEMENTED',
            message: 'Not implemented.'
        },
        noSiteId: {
            status: 400,
            code: 'NO_SITE_ID',
            message: 'No siteId set in session.'
        },
        missingSiteId: {
            status: 400,
            code: 'MISSING_SITE_ID',
            message: 'Site parameter is required.'
        },
        noOrderIdOrCreditMemoId: {
            status: 400,
            code: 'ORDER_ID_OR_CREDIT_MEMO_ID',
            message: 'You must specify at least orderId or creditMemoId.'
        },
        notApplicableCreditMemo: {
            status: 400,
            code: 'NOT_APPLICABLE_CREDIT_MEMO',
            message: 'Credit Memo is not applicable to this order. Please assign the credit memo\'s customer to the invoice and check the credit memo balance.'
        },
        refundMethodRequired: {
            status: 400,
            code: 'REFUND_METHOD_REQUIRED',
            message: 'You must specify the refund method.'
        },
        invalidOrderId: {
            status: 400,
            code: 'INVALID_ORDER_ID',
            message: 'Invalid id for this order'
        },
        invalidReturnedQuantity: {
            status: 400,
            code: 'INVALID_RETURNED_QUANTITY',
            message: 'The quantity being returned exceeds the available quantity.'
        },
        customerNotFound: {
            status: 400,
            code: 'CUSTOMER_NOT_FOUND',
            message: 'Customer not found.'
        },
        customerNotExist: {
            status: 400,
            code: 'CUSTOMER_NOT_EXIST',
            message: 'Customer doesn\'t exist.'
        },
        customerRequired: {
            status: 400,
            code: 'CUSTOMER_REQUIRED',
            message: 'Customer is requred.'
        },
        entityIdRequired: {
            status: 400,
            code: 'ENTITY_ID_REQUIRED',
            message: 'entityId required.'
        },
        unexpectedError: {
            status: 400,
            code: 'UNEXPECTED_ERROR',
            message: 'Unexpected Error'
        },
        deviceNotFound: {
            status: 400,
            code: 'DEVICE_NOT_FOUND',
            message: 'Device was not found!'
        },
        ParameterMissing: {
            status: 400,
            code: 'PARAMETER_MISSING',
            message: 'Missing parameter.'
        },
        printingTechnologyNotFound: {
            status: 400,
            code: 'PRINTING_TECHNOLOGY_NOT_FOUND',
            message: 'Printing technology not found.'
        },
        invalidURL: {
            status: 400,
            code: 'INVALID_URL',
            message: 'Invalid request URL.'
        },
        invalidParameter: {
            status: 400,
            code: 'INVALID_PARAMETER',
            message: 'Invalid parameter.'
        },
        missingParamenter: {
            status: 400,
            code: 'MISSING_PARAMETER',
            message: 'Missing parameter.'
        },
        notFoundEmployeeLocation: {
            status: 400,
            code: 'NOT_FOUND_EMPLOYEE_LOCATION',
            message: 'Current user does not have a location.'
        },
        notAvailableEmployeeLocation: {
            status: 400,
            code: 'EMPLOYEE_LOCATION_NOT_AVAILABLE',
            message: 'You dont have the device location available.'
        },
        requiredSalesAssociateLocation: {
            status: 400,
            code: 'REQUIRED_SALES_ASSOCIATE_LOCATION',
            message: 'The sales associate requires a location to create the order'
        },
        invalidTransactionType: {
            status: 400,
            code: 'INVALID_TRANSACTION_TYPE',
            message: 'Invalid transaction type.'
        },
        locationAddressMissingFields: {
            status: 400,
            code: 'LOCATION_ADDRESS_MISSING_FIELDS',
            message: 'Location address is missing required fields. Please complete.'
        },
        locationSettingsNotFound: {
            status: 400,
            code: 'LOCATION_SETTINGS_NOT_FOUND',
            message: 'Location setting not found for current location.'
        },
        locationIsRequired: {
            status: 400,
            code: 'LOCATION_IS_REQUIRED',
            message: 'Location is required.'
        },
        impossibleApplyCoupon: {
            status: 400,
            code: 'IMPOSSIBLE_APPLY_CUPON',
            message: 'Couldn\'t apply coupon.'
        },
        savedSearchInvalidColumn: {
            status: 400,
            code: 'SAVED_SEARCH_INVALID_COLUMN',
            message: 'Invalid column index: '
        },
        savedSearchNotFound: {
            status: 400,
            code: 'SAVED_SEARCH_NOT_FOUND',
            message: 'Couldn\'t get saved search.'
        },
        savedSearchMissingParameter: {
            status: 400,
            code: 'SAVED_SEARCH_MISSING_PARAMETER',
            message: 'Missing parameter.'
        },
        itemNotInSubsidiary: {
            status: 400,
            code: 'ITEM_NOT_IN_SUBSIDIARY',
            message: 'Item is not configured for current subsidiary.'
        },
        giftAuthcodeAlreadyExists: {
            status: 400,
            code: 'GIFT_AUTH_CODE_ALREADY_EXIST',
            message: 'A Gift Card with the same authorization code already exists.'
        },
        unapprovedPayment: {
            status: 400,
            code: 'UNAPPROVED_PAYMENT',
            message: 'Unapproved Payment'
        },
        notFoundPayment: {
            status: 400,
            code: 'NOT_FOUND_PAYMENT',
            message: 'No payments found'
        },
        necessarySubmitOrder: {
            status: 400,
            code: 'NECESSARY_SUBMIT_ORDER',
            message: 'The order needs to be submitted to update payments.'
        },
        notFoundPaymentMethodForUser: {
            status: 400,
            code: 'NOT_FOUND_PAYMENT_METHOD_FOR_USER',
            message: 'Payment Method not found for the current user'
        },
        forceCancellablePayment: {
            status: 400,
            code: 'FORCE_CANCELLABLE_PAYMENT',
            message: 'Tried to force-cancel a "cancellable" payment'
        },
        itemNotConfiguredForSubsidiary: {
            status: 400,
            code: 'ITEM_NOT_CONFIGURED_FOR_SUBSIDIARY',
            message: 'Item is not configured for current subsidiary'
        },
        transactionHasBeenResumed: {
            status: 400,
            code: 'TRANSACTION_HAS_BEEN_RESUMED',
            message: 'The transaction has already been resumed.'
        },
        loadBeforeSubmit: {
            status: 400,
            code: 'LOAD_BEFORE_SUBMIT',
            message: 'Please load a record before calling Transaction.Model.Submit method.'
        },
        unknownRecord: {
            status: 400,
            code: 'UNKNOWN_RECORD',
            message: 'Unknown record type.'
        },
        missingDrawerConfiguration: {
            status: 400,
            code: 'MISSING_DRAWER_CONFIGURATION',
            message: 'SCIS STORE SAFE ACCOUNT/SCIS CASH DRAWER DIFFERENCE fields are not configured for current location.'
        },
        invalidStartingCash: {
            status: 400,
            code: 'INVALID_STARTING_CASH',
            message: 'Starting cash must be a positive number greather than cero.'
        },
        cashDrawerIsBeignUsed: {
            status: 400,
            code: 'CASH_DRAWER_IS_BEIGN_USED',
            message: 'This cash drawer is being used by other user, please select a diferent one.'
        }
    };
});
var SC = {};
define('Application', [
    'underscore',
    'Events',
    'SC.ComponentContainer',
    'SC.Models.Init',
    'Configuration',
    'Application.Error',
    'Utils',
    'Console'
], function (_, Events, SCComponentContainer, ModelsInit, Configuration, ApplicationError, Utils) {
    'use strict';
    var Application = _.extend({
        init: function () {
        },
        getEnvironment: function getEnvironment(request) {
            SC.Configuration.cms.useCMS = SC.Configuration.cms.useCMS && ModelsInit.context.getSetting('FEATURE', 'ADVANCEDSITEMANAGEMENT') === 'T';
            var siteSettings = ModelsInit.session.getSiteSettings([
                    'currencies',
                    'languages'
                ]), result = {
                    baseUrl: ModelsInit.session.getAbsoluteUrl('/{{file}}'),
                    currentHostString: Application.getHost(),
                    availableHosts: Configuration.hosts || [],
                    availableLanguages: siteSettings.languages || [],
                    availableCurrencies: siteSettings.currencies || [],
                    companyId: ModelsInit.context.getCompany(),
                    casesManagementEnabled: ModelsInit.context.getSetting('FEATURE', 'SUPPORT') === 'T',
                    giftCertificatesEnabled: ModelsInit.context.getSetting('FEATURE', 'GIFTCERTIFICATES') === 'T',
                    currencyCodeSpecifiedOnUrl: '',
                    useCMS: Configuration.cms.useCMS
                };
            if (result.availableHosts.length && Utils.isShoppingDomain()) {
                var pushLanguage = function (language) {
                        result.availableLanguages.push(_.extend({}, language, available_languages_object[language.locale]));
                    }, pushCurrency = function (currency) {
                        result.availableCurrencies.push(_.extend({}, currency, available_currencies_object[currency.code]));
                    };
                for (var i = 0; i < result.availableHosts.length; i++) {
                    var host = result.availableHosts[i];
                    if (host.languages && host.languages.length) {
                        for (var n = 0; n < host.languages.length; n++) {
                            var language = host.languages[n];
                            if (language.host === result.currentHostString) {
                                result = _.extend(result, {
                                    currentHost: host,
                                    currentLanguage: language
                                });
                                var available_languages_object = _.object(_.pluck(result.availableLanguages, 'locale'), result.availableLanguages);
                                result.availableLanguages = [];
                                _.each(host.languages, pushLanguage);
                                break;
                            }
                        }
                    }
                    if (result.currentHost) {
                        var available_currencies_object = _.object(_.pluck(result.availableCurrencies, 'code'), result.availableCurrencies);
                        result.availableCurrencies = [];
                        _.each(host.currencies, pushCurrency);
                        break;
                    }
                }
            }
            var currency_codes = _.pluck(result.availableCurrencies, 'code');
            if (request.getParameter('cur') && ~currency_codes.indexOf(request.getParameter('cur'))) {
                result.currentCurrency = _.find(result.availableCurrencies, function (currency) {
                    return currency.code === request.getParameter('cur');
                });
                result.currencyCodeSpecifiedOnUrl = result.currentCurrency.code;
            } else if (ModelsInit.session.getShopperCurrency().code && ~currency_codes.indexOf(ModelsInit.session.getShopperCurrency().code)) {
                result.currentCurrency = _.find(result.availableCurrencies, function (currency) {
                    return currency.code === ModelsInit.session.getShopperCurrency().code;
                });
                result.currencyCodeSpecifiedOnUrl = result.currentCurrency.code;
            } else if (result.availableCurrencies && result.availableCurrencies.length) {
                result.currentCurrency = _.find(result.availableCurrencies, function (currency) {
                    result.currencyCodeSpecifiedOnUrl = currency.code;
                    return currency.isdefault === 'T';
                });
            }
            result.currentCurrency && ModelsInit.session.setShopperCurrency(result.currentCurrency.internalid);
            result.currentCurrency = _.find(result.availableCurrencies, function (currency) {
                return currency.code === ModelsInit.session.getShopperCurrency().code;
            });
            if (!result.currentLanguage) {
                var shopper_preferences = ModelsInit.session.getShopperPreferences(), shopper_locale = shopper_preferences.language.locale, locales = _.pluck(result.availableLanguages, 'locale');
                if (request.getParameter('lang') && ~locales.indexOf(request.getParameter('lang'))) {
                    result.currentLanguage = _.find(result.availableLanguages, function (language) {
                        return language.locale === request.getParameter('lang');
                    });
                } else if (shopper_locale && ~locales.indexOf(shopper_locale)) {
                    result.currentLanguage = _.find(result.availableLanguages, function (language) {
                        return language.locale === shopper_locale;
                    });
                } else if (result.availableLanguages && result.availableLanguages.length) {
                    result.currentLanguage = _.find(result.availableLanguages, function (language) {
                        return language.isdefault === 'T';
                    });
                }
            }
            result.currentLanguage && ModelsInit.session.setShopperLanguageLocale(result.currentLanguage.locale);
            result.currentPriceLevel = ModelsInit.session.getShopperPriceLevel().internalid ? ModelsInit.session.getShopperPriceLevel().internalid : ModelsInit.session.getSiteSettings(['defaultpricelevel']).defaultpricelevel;
            return result;
        },
        getPermissions: function getPermissions() {
            var purchases_permissions = [
                    ModelsInit.context.getPermission('TRAN_SALESORD'),
                    ModelsInit.context.getPermission('TRAN_CUSTINVC'),
                    ModelsInit.context.getPermission('TRAN_CASHSALE')
                ], purchases_returns_permissions = [
                    ModelsInit.context.getPermission('TRAN_RTNAUTH'),
                    ModelsInit.context.getPermission('TRAN_CUSTCRED')
                ];
            return {
                transactions: {
                    tranCashSale: ModelsInit.context.getPermission('TRAN_CASHSALE'),
                    tranCustCred: ModelsInit.context.getPermission('TRAN_CUSTCRED'),
                    tranCustDep: ModelsInit.context.getPermission('TRAN_CUSTDEP'),
                    tranCustPymt: ModelsInit.context.getPermission('TRAN_CUSTPYMT'),
                    tranStatement: ModelsInit.context.getPermission('TRAN_STATEMENT'),
                    tranCustInvc: ModelsInit.context.getPermission('TRAN_CUSTINVC'),
                    tranItemShip: ModelsInit.context.getPermission('TRAN_ITEMSHIP'),
                    tranSalesOrd: ModelsInit.context.getPermission('TRAN_SALESORD'),
                    tranEstimate: ModelsInit.context.getPermission('TRAN_ESTIMATE'),
                    tranRtnAuth: ModelsInit.context.getPermission('TRAN_RTNAUTH'),
                    tranDepAppl: ModelsInit.context.getPermission('TRAN_DEPAPPL'),
                    tranSalesOrdFulfill: ModelsInit.context.getPermission('TRAN_SALESORDFULFILL'),
                    tranFind: ModelsInit.context.getPermission('TRAN_FIND'),
                    tranPurchases: _.max(purchases_permissions),
                    tranPurchasesReturns: _.max(purchases_returns_permissions)
                },
                lists: {
                    regtAcctRec: ModelsInit.context.getPermission('REGT_ACCTREC'),
                    regtNonPosting: ModelsInit.context.getPermission('REGT_NONPOSTING'),
                    listCase: ModelsInit.context.getPermission('LIST_CASE'),
                    listContact: ModelsInit.context.getPermission('LIST_CONTACT'),
                    listCustJob: ModelsInit.context.getPermission('LIST_CUSTJOB'),
                    listCompany: ModelsInit.context.getPermission('LIST_COMPANY'),
                    listIssue: ModelsInit.context.getPermission('LIST_ISSUE'),
                    listCustProfile: ModelsInit.context.getPermission('LIST_CUSTPROFILE'),
                    listExport: ModelsInit.context.getPermission('LIST_EXPORT'),
                    listFind: ModelsInit.context.getPermission('LIST_FIND'),
                    listCrmMessage: ModelsInit.context.getPermission('LIST_CRMMESSAGE')
                }
            };
        },
        getHost: function () {
            return request.getURL().match(/http(s?):\/\/([^\/]*)\//)[2];
        },
        sendContent: function (content, options) {
            options = _.extend({
                status: 200,
                cache: false
            }, options || {});
            Application.trigger('before:Application.sendContent', content, options);
            response.setHeader('Custom-Header-Status', parseInt(options.status, 10).toString());
            var content_type = false;
            if (_.isArray(content) || _.isObject(content)) {
                content_type = 'JSON';
                content = JSON.stringify(content);
            }
            if (request.getParameter('jsonp_callback')) {
                content_type = 'JAVASCRIPT';
                content = request.getParameter('jsonp_callback') + '(' + content + ');';
            }
            if (options.cache) {
                response.setCDNCacheable(options.cache);
            }
            content_type && response.setContentType(content_type);
            response.write(content);
            Application.trigger('after:Application.sendContent', content, options);
        },
        processError: function (e) {
            var status = 500, code = 'ERR_UNEXPECTED', message = 'error';
            if (e instanceof nlobjError) {
                code = e.getCode();
                message = e.getDetails();
                status = badRequestError.status;
            } else if (_.isObject(e) && !_.isUndefined(e.status)) {
                status = e.status;
                code = e.code;
                message = e.message;
            } else {
                var error = nlapiCreateError(e);
                code = error.getCode();
                message = error.getDetails() !== '' ? error.getDetails() : error.getCode();
            }
            if (code === 'INSUFFICIENT_PERMISSION') {
                status = forbiddenError.status;
                code = forbiddenError.code;
                message = forbiddenError.message;
            }
            var content = {
                errorStatusCode: parseInt(status, 10).toString(),
                errorCode: code,
                errorMessage: message
            };
            if (e.errorDetails) {
                content.errorDetails = e.errorDetails;
            }
            return content;
        },
        sendError: function (e) {
            Application.trigger('before:Application.sendError', e);
            var content = Application.processError(e), content_type = 'JSON';
            response.setHeader('Custom-Header-Status', content.errorStatusCode);
            if (request.getParameter('jsonp_callback')) {
                content_type = 'JAVASCRIPT';
                content = request.getParameter('jsonp_callback') + '(' + JSON.stringify(content) + ');';
            } else {
                content = JSON.stringify(content);
            }
            response.setContentType(content_type);
            response.write(content);
            Application.trigger('after:Application.sendError', e);
        },
        getPaginatedSearchResults: function (options) {
            options = options || {};
            var results_per_page = options.results_per_page || Configuration.suitescriptResultsPerPage, page = options.page || 1, columns = options.columns || [], filters = options.filters || [], record_type = options.record_type, range_start = page * results_per_page - results_per_page, range_end = page * results_per_page, do_real_count = _.any(columns, function (column) {
                    return column.getSummary();
                }), result = {
                    page: page,
                    recordsPerPage: results_per_page,
                    records: []
                };
            if (!do_real_count || options.column_count) {
                var column_count = options.column_count || new nlobjSearchColumn('internalid', null, 'count'), count_result = nlapiSearchRecord(record_type, null, filters, [column_count]);
                result.totalRecordsFound = parseInt(count_result[0].getValue(column_count), 10);
            }
            if (do_real_count || result.totalRecordsFound > 0 && result.totalRecordsFound > range_start) {
                var search = nlapiCreateSearch(record_type, filters, columns).runSearch();
                result.records = search.getResults(range_start, range_end);
                if (do_real_count && !options.column_count) {
                    result.totalRecordsFound = search.getResults(0, 1000).length;
                }
            }
            return result;
        },
        getAllSearchResults: function (record_type, filters, columns) {
            var search = nlapiCreateSearch(record_type, filters, columns);
            search.setIsPublic(true);
            var searchRan = search.runSearch(), bolStop = false, intMaxReg = 1000, intMinReg = 0, result = [];
            while (!bolStop && ModelsInit.context.getRemainingUsage() > 10) {
                var extras = searchRan.getResults(intMinReg, intMaxReg);
                result = Application.searchUnion(result, extras);
                intMinReg = intMaxReg;
                intMaxReg += 1000;
                if (extras.length < 1000) {
                    bolStop = true;
                }
            }
            return result;
        },
        addFilterSite: function (filters) {
            var search_filter_array = this.getSearchFilterArray();
            search_filter_array.length && filters.push(new nlobjSearchFilter('website', null, 'anyof', search_filter_array));
        },
        addFilterItem: function (filters) {
            var search_filter_array = this.getSearchFilterArray();
            search_filter_array.length && filters.push(new nlobjSearchFilter('website', 'item', 'anyof', search_filter_array));
        },
        getSearchFilterArray: function () {
            var site_id = ModelsInit.session.getSiteSettings(['siteid']).siteid, filter_site = Configuration.filterSite, search_filter_array = [];
            if (ModelsInit.context.getFeature('MULTISITE') && site_id && filter_site.option && 'all' !== filter_site.option) {
                if (filter_site.option === 'siteIds' && filter_site.ids) {
                    search_filter_array = filter_site.ids;
                }
                search_filter_array.push(site_id, '@NONE@');
            }
            return _.uniq(search_filter_array);
        },
        searchUnion: function (target, array) {
            return target.concat(array);
        },
        getNonManageResourcesPathPrefix: function () {
            if (BuildTimeInf.isSCLite) {
                if (SC.Configuration.unmanagedResourcesFolderName) {
                    return 'site/' + SC.Configuration.unmanagedResourcesFolderName + '/';
                } else {
                    return 'default/';
                }
            }
            return '';
        },
        getFaviconPath: function () {
            if (SC.Configuration.faviconPath && SC.Configuration.faviconPath !== '') {
                return SC.Configuration.faviconPath + '/';
            } else if (isExtended && themeAssetsPath !== '') {
                return themeAssetsPath;
            }
            return this.getNonManageResourcesPathPrefix();
        }
    }, Events, SCComponentContainer);
    return Application;
});
var badRequestError = {
        status: 400,
        code: 'ERR_BAD_REQUEST',
        message: 'Bad Request'
    }, unauthorizedError = {
        status: 401,
        code: 'ERR_USER_NOT_LOGGED_IN',
        message: 'Not logged In'
    }, sessionTimedOutError = {
        status: 401,
        code: 'ERR_USER_SESSION_TIMED_OUT',
        message: 'User session timed out'
    }, forbiddenError = {
        status: 403,
        code: 'ERR_INSUFFICIENT_PERMISSIONS',
        message: 'Insufficient permissions'
    }, notFoundError = {
        status: 404,
        code: 'ERR_RECORD_NOT_FOUND',
        message: 'Not found'
    }, methodNotAllowedError = {
        status: 405,
        code: 'ERR_METHOD_NOT_ALLOWED',
        message: 'Sorry, you are not allowed to perform this action.'
    }, invalidItemsFieldsAdvancedName = {
        status: 500,
        code: 'ERR_INVALID_ITEMS_FIELDS_ADVANCED_NAME',
        message: 'Please check if the fieldset is created.'
    };
SC.ERROR_IDENTIFIERS = require('Application.Error');
define('Backbone.Validation', [], function () {
    var Backbone = {};
    Backbone.Validation = function (_) {
        'use strict';
        var defaultOptions = {
            forceUpdate: false,
            selector: 'name',
            labelFormatter: 'sentenceCase',
            valid: Function.prototype,
            invalid: Function.prototype
        };
        var formatFunctions = {
            formatLabel: function (attrName, model) {
                return defaultLabelFormatters[defaultOptions.labelFormatter](attrName, model);
            },
            format: function () {
                var args = Array.prototype.slice.call(arguments), text = args.shift();
                return text.replace(/\{(\d+)\}/g, function (match, number) {
                    return typeof args[number] !== 'undefined' ? args[number] : match;
                });
            }
        };
        var flatten = function (obj, into, prefix) {
            into = into || {};
            prefix = prefix || '';
            _.each(obj, function (val, key) {
                if (obj.hasOwnProperty(key)) {
                    if (val && typeof val === 'object' && !(val instanceof Date || val instanceof RegExp)) {
                        flatten(val, into, prefix + key + '.');
                    } else {
                        into[prefix + key] = val;
                    }
                }
            });
            return into;
        };
        var Validation = function () {
            var getValidatedAttrs = function (model) {
                return _.reduce(_.keys(model.validation || {}), function (memo, key) {
                    memo[key] = void 0;
                    return memo;
                }, {});
            };
            var getValidators = function (model, attr) {
                var attrValidationSet = model.validation ? model.validation[attr] || {} : {};
                if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
                    attrValidationSet = { fn: attrValidationSet };
                }
                if (!_.isArray(attrValidationSet)) {
                    attrValidationSet = [attrValidationSet];
                }
                return _.reduce(attrValidationSet, function (memo, attrValidation) {
                    _.each(_.without(_.keys(attrValidation), 'msg'), function (validator) {
                        memo.push({
                            fn: defaultValidators[validator],
                            val: attrValidation[validator],
                            msg: attrValidation.msg
                        });
                    });
                    return memo;
                }, []);
            };
            var validateAttr = function (model, attr, value, computed) {
                return _.reduce(getValidators(model, attr), function (memo, validator) {
                    var ctx = _.extend({}, formatFunctions, defaultValidators), result = validator.fn.call(ctx, value, attr, validator.val, model, computed);
                    if (result === false || memo === false) {
                        return false;
                    }
                    if (result && !memo) {
                        return validator.msg || result;
                    }
                    return memo;
                }, '');
            };
            var validateModel = function (model, attrs) {
                var error, invalidAttrs = {}, isValid = true, computed = _.clone(attrs), flattened = flatten(attrs);
                _.each(flattened, function (val, attr) {
                    error = validateAttr(model, attr, val, computed);
                    if (error) {
                        invalidAttrs[attr] = error;
                        isValid = false;
                    }
                });
                return {
                    invalidAttrs: invalidAttrs,
                    isValid: isValid
                };
            };
            var mixin = function (view, options) {
                return {
                    preValidate: function (attr, value) {
                        return validateAttr(this, attr, value, _.extend({}, this.attributes));
                    },
                    isValid: function (option) {
                        var flattened = flatten(this.attributes);
                        if (_.isString(option)) {
                            return !validateAttr(this, option, flattened[option], _.extend({}, this.attributes));
                        }
                        if (_.isArray(option)) {
                            return _.reduce(option, function (memo, attr) {
                                return memo && !validateAttr(this, attr, flattened[attr], _.extend({}, this.attributes));
                            }, true, this);
                        }
                        if (option === true) {
                            this.validate();
                        }
                        return this.validation ? this._isValid : true;
                    },
                    validate: function (attrs, setOptions) {
                        var model = this, validateAll = !attrs, opt = _.extend({}, options, setOptions), validatedAttrs = getValidatedAttrs(model), allAttrs = _.extend({}, validatedAttrs, model.attributes, attrs), changedAttrs = flatten(attrs || allAttrs), result = validateModel(model, allAttrs);
                        model._isValid = result.isValid;
                        _.each(validatedAttrs, function (val, attr) {
                            var invalid = result.invalidAttrs.hasOwnProperty(attr);
                            if (!invalid) {
                                opt.valid(view, attr, opt.selector);
                            }
                        });
                        _.each(validatedAttrs, function (val, attr) {
                            var invalid = result.invalidAttrs.hasOwnProperty(attr), changed = changedAttrs.hasOwnProperty(attr);
                            if (invalid && (changed || validateAll)) {
                                opt.invalid(view, attr, result.invalidAttrs[attr], opt.selector);
                            }
                        });
                        if (!opt.forceUpdate && _.intersection(_.keys(result.invalidAttrs), _.keys(changedAttrs)).length > 0) {
                            return result.invalidAttrs;
                        }
                    }
                };
            };
            var bindModel = function (view, model, options) {
                _.extend(model, mixin(view, options));
            };
            var unbindModel = function (model) {
                delete model.validate;
                delete model.preValidate;
                delete model.isValid;
            };
            var collectionAdd = function (model) {
                bindModel(this.view, model, this.options);
            };
            var collectionRemove = function (model) {
                unbindModel(model);
            };
            return {
                version: '0.8.0',
                configure: function (options) {
                    _.extend(defaultOptions, options);
                },
                bind: function (view, options) {
                    var model = view.model, collection = view.collection;
                    options = _.extend({}, defaultOptions, defaultCallbacks, options);
                    if (typeof model === 'undefined' && typeof collection === 'undefined') {
                        throw 'Before you execute the binding your view must have a model or a collection.\n' + 'See http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.';
                    }
                    if (model) {
                        bindModel(view, model, options);
                    } else if (collection) {
                        collection.each(function (model) {
                            bindModel(view, model, options);
                        });
                        collection.bind('add', collectionAdd, {
                            view: view,
                            options: options
                        });
                        collection.bind('remove', collectionRemove);
                    }
                },
                unbind: function (view) {
                    var model = view.model, collection = view.collection;
                    if (model) {
                        unbindModel(view.model);
                    }
                    if (collection) {
                        collection.each(function (model) {
                            unbindModel(model);
                        });
                        collection.unbind('add', collectionAdd);
                        collection.unbind('remove', collectionRemove);
                    }
                },
                mixin: mixin(null, defaultOptions)
            };
        }();
        var defaultCallbacks = Validation.callbacks = {
            valid: function (view, attr, selector) {
                view.$('[' + selector + '~="' + attr + '"]').removeClass('invalid').removeAttr('data-error');
            },
            invalid: function (view, attr, error, selector) {
                view.$('[' + selector + '~="' + attr + '"]').addClass('invalid').attr('data-error', error);
            }
        };
        var defaultPatterns = Validation.patterns = {
            digits: /^\d+$/,
            number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
        };
        var defaultMessages = Validation.messages = {
            required: '{0} is required',
            acceptance: '{0} must be accepted',
            min: '{0} must be greater than or equal to {1}',
            max: '{0} must be less than or equal to {1}',
            range: '{0} must be between {1} and {2}',
            length: '{0} must be {1} characters',
            minLength: '{0} must be at least {1} characters',
            maxLength: '{0} must be at most {1} characters',
            rangeLength: '{0} must be between {1} and {2} characters',
            oneOf: '{0} must be one of: {1}',
            equalTo: '{0} must be the same as {1}',
            pattern: '{0} must be a valid {1}'
        };
        var defaultLabelFormatters = Validation.labelFormatters = {
            none: function (attrName) {
                return attrName;
            },
            sentenceCase: function (attrName) {
                return attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function (match, index) {
                    return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
                }).replace('_', ' ');
            },
            label: function (attrName, model) {
                return model.labels && model.labels[attrName] || defaultLabelFormatters.sentenceCase(attrName, model);
            }
        };
        var defaultValidators = Validation.validators = function () {
            var trim = String.prototype.trim ? function (text) {
                return text === null ? '' : String.prototype.trim.call(text);
            } : function (text) {
                var trimLeft = /^\s+/, trimRight = /\s+$/;
                return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
            };
            var isNumber = function (value) {
                return _.isNumber(value) || _.isString(value) && value.match(defaultPatterns.number);
            };
            var hasValue = function (value) {
                return !(_.isNull(value) || _.isUndefined(value) || _.isString(value) && trim(value) === '');
            };
            return {
                fn: function (value, attr, fn, model, computed) {
                    if (_.isString(fn)) {
                        fn = model[fn];
                    }
                    return fn.call(model, value, attr, computed);
                },
                required: function (value, attr, required, model, computed) {
                    var isRequired = _.isFunction(required) ? required.call(model, value, attr, computed) : required;
                    if (!isRequired && !hasValue(value)) {
                        return false;
                    }
                    if (isRequired && !hasValue(value)) {
                        return this.format(defaultMessages.required, this.formatLabel(attr, model));
                    }
                },
                acceptance: function (value, attr, accept, model) {
                    if (value !== 'true' && (!_.isBoolean(value) || value === false)) {
                        return this.format(defaultMessages.acceptance, this.formatLabel(attr, model));
                    }
                },
                min: function (value, attr, minValue, model) {
                    if (!isNumber(value) || value < minValue) {
                        return this.format(defaultMessages.min, this.formatLabel(attr, model), minValue);
                    }
                },
                max: function (value, attr, maxValue, model) {
                    if (!isNumber(value) || value > maxValue) {
                        return this.format(defaultMessages.max, this.formatLabel(attr, model), maxValue);
                    }
                },
                range: function (value, attr, range, model) {
                    if (!isNumber(value) || value < range[0] || value > range[1]) {
                        return this.format(defaultMessages.range, this.formatLabel(attr, model), range[0], range[1]);
                    }
                },
                length: function (value, attr, length, model) {
                    if (!hasValue(value) || trim(value).length !== length) {
                        return this.format(defaultMessages.length, this.formatLabel(attr, model), length);
                    }
                },
                minLength: function (value, attr, minLength, model) {
                    if (!hasValue(value) || trim(value).length < minLength) {
                        return this.format(defaultMessages.minLength, this.formatLabel(attr, model), minLength);
                    }
                },
                maxLength: function (value, attr, maxLength, model) {
                    if (!hasValue(value) || trim(value).length > maxLength) {
                        return this.format(defaultMessages.maxLength, this.formatLabel(attr, model), maxLength);
                    }
                },
                rangeLength: function (value, attr, range, model) {
                    if (!hasValue(value) || trim(value).length < range[0] || trim(value).length > range[1]) {
                        return this.format(defaultMessages.rangeLength, this.formatLabel(attr, model), range[0], range[1]);
                    }
                },
                oneOf: function (value, attr, values, model) {
                    if (!_.include(values, value)) {
                        return this.format(defaultMessages.oneOf, this.formatLabel(attr, model), values.join(', '));
                    }
                },
                equalTo: function (value, attr, equalTo, model, computed) {
                    if (value !== computed[equalTo]) {
                        return this.format(defaultMessages.equalTo, this.formatLabel(attr, model), this.formatLabel(equalTo, model));
                    }
                },
                pattern: function (value, attr, pattern, model) {
                    if (!hasValue(value) || !value.toString().match(defaultPatterns[pattern] || pattern)) {
                        return this.format(defaultMessages.pattern, this.formatLabel(attr, model), pattern);
                    }
                }
            };
        }();
        return Validation;
    }(_);
    return Backbone.Validation;
});
define('SC.EventWrapper', [
    'Application',
    'Backbone.Validation',
    'underscore'
], function (Application, BackboneValidation, _) {
    'use strict';
    return {
        name: 'SCEventWrapper',
        extend: function (model) {
            if (!model.name && !this.name) {
                throw {
                    status: 400,
                    code: 'ERR_MISSING_MODEL_NAME',
                    message: 'Missing model name.'
                };
            }
            var new_model = {};
            _.extend(new_model, this, model);
            _.each(new_model, function extendFunctionWithEvents(value, key) {
                if (typeof value === 'function' && key !== 'extend') {
                    new_model[key] = wrapFunctionWithEvents(key, new_model, value);
                }
            });
            return new_model;
        }
    };
    function wrapFunctionWithEvents(methodName, model, fn) {
        return _.wrap(fn, function wrapFunctionWithEvents(func) {
            var args = _.toArray(arguments).slice(1);
            Application.trigger.apply(Application, [
                'before:' + model.name + '.' + methodName,
                this
            ].concat(args));
            var result = func.apply(this, args);
            Application.trigger.apply(Application, [
                'after:' + model.name + '.' + methodName,
                this,
                result
            ].concat(args));
            return result;
        });
    }
});
define('ServiceController.Validations', [
    'underscore',
    'Utils',
    'Application',
    'SC.Models.Init'
], function (_, Utils, Application, ModelsInit) {
    'use strict';
    return {
        _evaluatePermissions: function (user_permissions, required_permissions, permissions_operator) {
            permissions_operator = permissions_operator || 'and';
            var evaluation = permissions_operator !== 'or';
            if (permissions_operator !== 'and' && permissions_operator !== 'or') {
                console.log('Invalid permissions operator. Allowed values are: or, and');
                return false;
            }
            if (!_.isArray(required_permissions)) {
                console.log('Invalid permissions format in controller', this.name);
                return false;
            }
            _.each(required_permissions, function (perm) {
                var tokens = perm.split('.');
                var partial_evaluation = !(tokens.length === 3 && tokens[2] < 5 && user_permissions && user_permissions[tokens[0]] && user_permissions[tokens[0]][tokens[1]] < tokens[2]);
                if (permissions_operator === 'or') {
                    evaluation = evaluation || partial_evaluation;
                } else {
                    evaluation = evaluation && partial_evaluation;
                }
            });
            return evaluation;
        },
        requirePermissions: function (options) {
            var required_permissions = (options.list || []).concat(options.extraList || []);
            if (!this._evaluatePermissions(Application.getPermissions(), required_permissions, options.operator)) {
                throw forbiddenError;
            }
        },
        requireSecure: function () {
            if (!Utils.isCheckoutDomain()) {
                throw methodNotAllowedError;
            }
        },
        requireLoggedInPPS: function () {
            var isRegistrationDisabled = ModelsInit.session.getSiteSettings(['registration']).registration.registrationmandatory === 'T';
            if (!isRegistrationDisabled && ModelsInit.session.getSiteSettings(['siteloginrequired']).siteloginrequired === 'T' && !ModelsInit.session.isLoggedIn2()) {
                throw unauthorizedError;
            }
        },
        requireLogin: function () {
            if (!ModelsInit.session.isLoggedIn2()) {
                throw unauthorizedError;
            }
        },
        checkLoggedInCheckout: function () {
            if (Utils.isInCheckout(request) && !ModelsInit.session.isLoggedIn2()) {
                throw unauthorizedError;
            }
        }
    };
});
define('ServiceController', [
    'SC.EventWrapper',
    'Application',
    'SC.Models.Init',
    'ServiceController.Validations',
    'underscore'
], function (SCEventWrapper, Application, ModelsInit, ServiceControllerValidations, _) {
    'use strict';
    return SCEventWrapper.extend({
        name: 'ServiceController',
        getMethod: function () {
            return this.request.getMethod().toLowerCase();
        },
        options: {},
        _deepObjectExtend: function _deepObjectExtend(target, source) {
            for (var prop in source) {
                if (prop in target) {
                    this._deepObjectExtend(target[prop], source[prop]);
                } else {
                    target[prop] = source[prop];
                }
            }
            return target;
        },
        getOptions: function (method) {
            return this._deepObjectExtend(this.options.common || {}, this.options[method] || {});
        },
        validateRequest: function (validation_options) {
            _.each(validation_options, function (validation_option, validation_name) {
                if (_.isFunction(ServiceControllerValidations[validation_name])) {
                    ServiceControllerValidations[validation_name](validation_option);
                }
            });
        },
        handle: function (request, response) {
            this.request = request;
            this.response = response;
            this.method = this.getMethod();
            this.data = JSON.parse(this.request.getBody() || '{}');
            try {
                this.validateRequest(this.getOptions(this.method));
                if (_.isFunction(this[this.method])) {
                    var result = this[this.method]();
                    if (result) {
                        return this.sendContent(result);
                    }
                } else {
                    return this.sendError(methodNotAllowedError);
                }
            } catch (e) {
                return this.sendError(e);
            }
        },
        sendContent: function (content, options) {
            options = _.extend({
                status: 200,
                cache: false
            }, options || {});
            Application.trigger('before:ServiceController.sendContent', content, options);
            this.response.setHeader('Custom-Header-Status', parseInt(options.status, 10).toString());
            var content_type = false;
            if (_.isArray(content) || _.isObject(content)) {
                content_type = 'JSON';
                content = JSON.stringify(content);
            }
            if (this.request.getParameter('jsonp_callback')) {
                content_type = 'JAVASCRIPT';
                content = request.getParameter('jsonp_callback') + '(' + content + ');';
            }
            if (options.cache) {
                this.response.setCDNCacheable(options.cache);
            }
            content_type && this.response.setContentType(content_type);
            this.response.write(content);
            Application.trigger('after:ServiceController.sendContent', content, options);
        },
        processError: function (e) {
            var status = 500, code = 'ERR_UNEXPECTED', message = 'error';
            if (e instanceof nlobjError) {
                code = e.getCode();
                message = e.getDetails();
                status = badRequestError.status;
            } else if (_.isObject(e) && !_.isUndefined(e.status)) {
                status = e.status;
                code = e.code;
                message = e.message;
            } else {
                var error = nlapiCreateError(e);
                code = error.getCode();
                message = error.getDetails() !== '' ? error.getDetails() : error.getCode();
            }
            if (code === 'INSUFFICIENT_PERMISSION') {
                status = forbiddenError.status;
                code = forbiddenError.code;
                message = forbiddenError.message;
            }
            var content = {
                errorStatusCode: parseInt(status, 10).toString(),
                errorCode: code,
                errorMessage: message
            };
            if (e.errorDetails) {
                content.errorDetails = e.errorDetails;
            }
            if (e.messageParams) {
                content.errorMessageParams = e.messageParams;
            }
            return content;
        },
        sendError: function (e) {
            _.extend(e, { 'serviceControllerName': this.name });
            console.log(this.name, e);
            Application.trigger('before:ServiceController.sendError', e);
            var content = this.processError(e), content_type = 'JSON';
            this.response.setHeader('Custom-Header-Status', content.errorStatusCode);
            if (this.request.getParameter('jsonp_callback')) {
                content_type = 'JAVASCRIPT';
                content = this.request.getParameter('jsonp_callback') + '(' + JSON.stringify(content) + ');';
            } else {
                content = JSON.stringify(content);
            }
            this.response.setContentType(content_type);
            this.response.write(content);
            Application.trigger('after:ServiceController.sendError', e);
        }
    });
});
define('SC.Model', [
    'SC.EventWrapper',
    'Backbone.Validation',
    'underscore'
], function (SCEventWrapper, BackboneValidation, _) {
    'use strict';
    var SCModel = SCEventWrapper.extend({
        name: 'SCModel',
        validate: function validate(data) {
            if (this.validation) {
                var validator = _.extend({
                        validation: this.validation,
                        attributes: data
                    }, BackboneValidation.mixin), invalidAttributes = validator.validate();
                if (!validator.isValid()) {
                    throw {
                        status: 400,
                        code: 'ERR_BAD_REQUEST',
                        message: invalidAttributes
                    };
                }
            }
        }
    });
    return SCModel;
});
define('Profile.Model', [
    'SC.Model',
    'SC.Models.Init',
    'Utils'
], function (SCModel, ModelsInit, Utils) {
    'use strict';
    return SCModel.extend({
        name: 'Profile',
        validation: {
            firstname: {
                required: true,
                msg: 'First Name is required'
            },
            lastname: {
                required: true,
                msg: 'Last Name is required'
            },
            email: {
                required: true,
                pattern: 'email',
                msg: 'Email is required'
            },
            confirm_email: {
                equalTo: 'email',
                msg: 'Emails must match'
            }
        },
        isSecure: Utils.isInCheckout(request),
        get: function () {
            var profile = {};
            if (ModelsInit.session.isLoggedIn2() && this.isSecure) {
                this.fields = this.fields || [
                    'isperson',
                    'email',
                    'internalid',
                    'name',
                    'overduebalance',
                    'phoneinfo',
                    'companyname',
                    'firstname',
                    'lastname',
                    'middlename',
                    'emailsubscribe',
                    'campaignsubscriptions',
                    'paymentterms',
                    'creditlimit',
                    'balance',
                    'creditholdoverride'
                ];
                profile = ModelsInit.customer.getFieldValues(this.fields);
                profile.phone = profile.phoneinfo.phone;
                profile.altphone = profile.phoneinfo.altphone;
                profile.fax = profile.phoneinfo.fax;
                profile.type = profile.isperson ? 'INDIVIDUAL' : 'COMPANY';
                profile.creditlimit = parseFloat(profile.creditlimit || 0);
                profile.creditlimit_formatted = Utils.formatCurrency(profile.creditlimit);
                profile.balance = parseFloat(profile.balance || 0);
                profile.balance_formatted = Utils.formatCurrency(profile.balance);
                profile.balance_available = profile.creditlimit - profile.balance;
                profile.balance_available_formatted = Utils.formatCurrency(profile.balance_available);
            } else {
                profile = ModelsInit.customer.getFieldValues([
                    'addressbook',
                    'balance',
                    'campaignsubscriptions',
                    'companyname',
                    'creditcards',
                    'creditholdoverride',
                    'creditlimit',
                    'email',
                    'emailsubscribe',
                    'firstname',
                    'internalid',
                    'isperson',
                    'lastname',
                    'middlename',
                    'name',
                    'paymentterms',
                    'phoneinfo',
                    'vatregistration'
                ]);
                profile.isLoggedIn = ModelsInit.session.isLoggedIn2() ? 'T' : 'F';
                profile.isRecognized = ModelsInit.session.isRecognized() ? 'T' : 'F';
                profile.isGuest = ModelsInit.customer.isGuest() ? 'T' : 'F';
                profile.priceLevel = ModelsInit.session.getShopperPriceLevel().internalid ? ModelsInit.session.getShopperPriceLevel().internalid : ModelsInit.session.getSiteSettings('defaultpricelevel');
                profile.internalid = nlapiGetUser() + '';
            }
            profile.isGuest = ModelsInit.customer.isGuest() ? 'T' : 'F';
            profile.subsidiary = ModelsInit.session.getShopperSubsidiary();
            profile.language = ModelsInit.session.getShopperLanguageLocale();
            profile.currency = ModelsInit.session.getShopperCurrency();
            profile.priceLevel = ModelsInit.session.getShopperPriceLevel().internalid ? ModelsInit.session.getShopperPriceLevel().internalid : ModelsInit.session.getSiteSettings(['defaultpricelevel']).defaultpricelevel;
            return profile;
        },
        update: function (data) {
            var login = nlapiGetLogin();
            if (data.current_password && data.password && data.password === data.confirm_password) {
                return login.changePassword(data.current_password, data.password);
            }
            this.currentSettings = ModelsInit.customer.getFieldValues();
            var customerUpdate = { internalid: parseInt(nlapiGetUser(), 10) };
            customerUpdate.firstname = data.firstname;
            if (data.lastname !== '') {
                customerUpdate.lastname = data.lastname;
            }
            if (this.currentSettings.lastname === data.lastname) {
                delete this.validation.lastname;
            }
            customerUpdate.companyname = data.companyname;
            customerUpdate.phoneinfo = {
                altphone: data.altphone,
                phone: data.phone,
                fax: data.fax
            };
            if (data.phone !== '') {
                customerUpdate.phone = data.phone;
            }
            if (this.currentSettings.phone === data.phone) {
                delete this.validation.phone;
            }
            customerUpdate.emailsubscribe = data.emailsubscribe && data.emailsubscribe !== 'F' ? 'T' : 'F';
            if (!(this.currentSettings.companyname === '' || this.currentSettings.isperson || ModelsInit.session.getSiteSettings(['registration']).registration.companyfieldmandatory !== 'T')) {
                this.validation.companyname = {
                    required: true,
                    msg: 'Company Name is required'
                };
            }
            if (!this.currentSettings.isperson) {
                delete this.validation.firstname;
                delete this.validation.lastname;
            }
            if (data.email && data.email !== this.currentSettings.email && data.email === data.confirm_email && data.isGuest === 'T') {
                customerUpdate.email = data.email;
            } else if (data.new_email && data.new_email === data.confirm_email && data.new_email !== this.currentSettings.email) {
                ModelsInit.session.login({
                    email: data.email,
                    password: data.current_password
                });
                login.changeEmail(data.current_password, data.new_email, true);
            }
            data.confirm_email = data.email;
            this.validate(data);
            ModelsInit.customer.updateProfile(customerUpdate);
            if (data.campaignsubscriptions) {
                ModelsInit.customer.updateCampaignSubscriptions(data.campaignsubscriptions);
            }
            return this.get();
        }
    });
});
define('StoreItem.Model', [
    'SC.Model',
    'SC.Models.Init',
    'underscore'
], function (SCModel, ModelsInit, _) {
    'use strict';
    return SCModel.extend({
        name: 'StoreItem',
        preloadItems: function (items, fieldset_name) {
            var self = this, items_by_id = {}, parents_by_id = {}, fieldKeys = SC.Configuration.fieldKeys, itemsFieldsStandardKeys = fieldKeys && fieldKeys.itemsFieldsStandardKeys || [];
            if (!itemsFieldsStandardKeys.length) {
                return {};
            }
            items = items || [];
            this.preloadedItems = this.preloadedItems || {};
            items.forEach(function (item) {
                if (!item.id || !item.type || item.type === 'Discount' || item.type === 'OthCharge' || item.type === 'Markup') {
                    return;
                }
                if (!self.getPreloadedItem(item.id, fieldset_name)) {
                    items_by_id[item.id] = {
                        internalid: new String(item.id).toString(),
                        itemtype: item.type,
                        itemfields: itemsFieldsStandardKeys
                    };
                }
            });
            if (!_.size(items_by_id)) {
                return this.preloadedItems;
            }
            var items_details = this.getItemFieldValues(items_by_id, fieldset_name);
            _.each(items_details, function (item) {
                if (item && typeof item.itemid !== 'undefined') {
                    if (item.itemoptions_detail && item.itemoptions_detail.matrixtype === 'child') {
                        parents_by_id[item.itemoptions_detail.parentid] = {
                            internalid: new String(item.itemoptions_detail.parentid).toString(),
                            itemtype: item.itemtype,
                            itemfields: itemsFieldsStandardKeys
                        };
                    }
                    self.setPreloadedItem(item.internalid, item, fieldset_name);
                }
            });
            if (_.size(parents_by_id)) {
                var parents_details = this.getItemFieldValues(parents_by_id, fieldset_name);
                _.each(parents_details, function (item) {
                    if (item && typeof item.itemid !== 'undefined') {
                        self.setPreloadedItem(item.internalid, item, fieldset_name);
                    }
                });
            }
            _.each(this.preloadedItems, function (item) {
                if (item.itemoptions_detail && item.itemoptions_detail.matrixtype === 'child') {
                    item.matrix_parent = self.getPreloadedItem(item.itemoptions_detail.parentid, fieldset_name);
                }
            });
            return this.preloadedItems;
        },
        getItemFieldValues: function (items_by_id, fieldset_name) {
            var item_ids = _.values(items_by_id), is_advanced = ModelsInit.session.getSiteSettings(['sitetype']).sitetype === 'ADVANCED';
            if (is_advanced) {
                try {
                    fieldset_name = _.isUndefined(fieldset_name) ? SC.Configuration.fieldKeys.itemsFieldsAdvancedName : fieldset_name;
                    return ModelsInit.session.getItemFieldValues(fieldset_name, _.pluck(item_ids, 'internalid')).items;
                } catch (e) {
                    throw invalidItemsFieldsAdvancedName;
                }
            } else {
                return ModelsInit.session.getItemFieldValues(item_ids);
            }
        },
        get: function (id, type, fieldset_name) {
            this.preloadedItems = this.preloadedItems || {};
            if (!this.getPreloadedItem(id, fieldset_name)) {
                this.preloadItems([{
                        id: id,
                        type: type
                    }], fieldset_name);
            }
            return this.getPreloadedItem(id, fieldset_name);
        },
        getPreloadedItem: function (id, fieldset_name) {
            return this.preloadedItems[this.getItemKey(id, fieldset_name)];
        },
        setPreloadedItem: function (id, item, fieldset_name) {
            this.preloadedItems[this.getItemKey(id, fieldset_name)] = item;
        },
        getItemKey: function (id, fieldset_name) {
            fieldset_name = _.isUndefined(fieldset_name) && SC.Configuration.fieldKeys ? SC.Configuration.fieldKeys.itemsFieldsAdvancedName : fieldset_name;
            return id + '#' + fieldset_name;
        },
        set: function (item, fieldset_name) {
            this.preloadedItems = this.preloadedItems || {};
            if (item.internalid) {
                this.setPreloadedItem(item.internalid, item, fieldset_name);
            }
        }
    });
});
define('SiteSettings.Model', [
    'SC.Model',
    'SC.Models.Init',
    'underscore',
    'Utils'
], function (SCModel, ModelsInit, _, Utils) {
    'use strict';
    var settings_cache, is_https_supported = Utils.isHttpsSupported();
    return SCModel.extend({
        name: 'SiteSettings',
        get: function () {
            var i, countries, shipToCountries, settings;
            if (settings_cache) {
                settings = settings_cache;
            } else {
                settings = ModelsInit.session.getSiteSettings();
                if (settings.shipallcountries === 'F') {
                    if (settings.shiptocountries) {
                        shipToCountries = {};
                        for (i = 0; i < settings.shiptocountries.length; i++) {
                            shipToCountries[settings.shiptocountries[i]] = true;
                        }
                    }
                }
                var allCountries = ModelsInit.session.getCountries();
                if (shipToCountries) {
                    countries = {};
                    for (i = 0; i < allCountries.length; i++) {
                        if (shipToCountries[allCountries[i].code]) {
                            countries[allCountries[i].code] = allCountries[i];
                        }
                    }
                } else {
                    countries = {};
                    for (i = 0; i < allCountries.length; i++) {
                        countries[allCountries[i].code] = allCountries[i];
                    }
                }
                var allStates = ModelsInit.session.getStates();
                if (allStates) {
                    for (i = 0; i < allStates.length; i++) {
                        if (countries[allStates[i].countrycode]) {
                            countries[allStates[i].countrycode].states = allStates[i].states;
                        }
                    }
                }
                settings.countries = countries;
                settings.phoneformat = ModelsInit.context.getPreference('phoneformat');
                settings.minpasswordlength = ModelsInit.context.getPreference('minpasswordlength');
                settings.campaignsubscriptions = ModelsInit.context.getFeature('CAMPAIGNSUBSCRIPTIONS');
                settings.analytics.confpagetrackinghtml = _.escape(settings.analytics.confpagetrackinghtml);
                settings.quantitypricing = ModelsInit.context.getFeature('QUANTITYPRICING');
                settings.groupseparator = window.groupseparator;
                settings.decimalseparator = window.decimalseparator;
                settings.negativeprefix = window.negativeprefix;
                settings.negativesuffix = window.negativesuffix;
                settings.dateformat = window.dateformat;
                settings.longdateformat = window.longdateformat;
                settings.isMultiShippingRoutesEnabled = this.isMultiShippingRoutesEnabled();
                settings.isPickupInStoreEnabled = this.isPickupInStoreEnabled();
                settings.isAutoapplyPromotionsEnabled = this.isAutoapplyPromotionsEnabled();
                settings.isSCISIntegrationEnabled = this.isSCISIntegrationEnabled();
                settings.checkoutSupported = Utils.isCheckoutDomain();
                settings.shoppingSupported = Utils.isShoppingDomain();
                settings.isHttpsSupported = is_https_supported;
                settings.isSingleDomain = settings.checkoutSupported && settings.shoppingSupported;
                delete settings.entrypoints;
                settings_cache = settings;
            }
            settings.is_logged_in = ModelsInit.session.isLoggedIn2();
            settings.shopperCurrency = ModelsInit.session.getShopperCurrency();
            settings.touchpoints = this.getTouchPoints();
            return settings;
        },
        isPickupInStoreEnabled: function () {
            return SC.Configuration.isPickupInStoreEnabled && ModelsInit.context.getSetting('FEATURE', 'STOREPICKUP') === 'T';
        },
        isSCISIntegrationEnabled: function () {
            return SC.Configuration.isSCISIntegrationEnabled && Utils.recordTypeHasField('salesorder', 'custbody_ns_pos_transaction_status');
        },
        isMultiShippingRoutesEnabled: function () {
            return SC.Configuration.isMultiShippingEnabled && ModelsInit.context.getSetting('FEATURE', 'MULTISHIPTO') === 'T';
        },
        isAutoapplyPromotionsEnabled: function () {
            return ModelsInit.session.getSiteSettings(['autoapplypromotionsenabled']).autoapplypromotionsenabled === 'T';
        },
        getTouchPoints: function () {
            var settings = ModelsInit.session.getSiteSettings([
                'touchpoints',
                'sitetype'
            ]);
            if (!is_https_supported && settings.sitetype === 'ADVANCED') {
                settings.touchpoints.storelocator = settings.touchpoints.login.replace('is=login', 'is=storelocator');
            }
            return settings.touchpoints;
        }
    });
});
define('ExternalPayment.Model', [
    'SC.Model',
    'underscore',
    'SC.Models.Init',
    'SiteSettings.Model',
    'Utils'
], function (SCModel, _, ModelsInit, SiteSettings, Utils) {
    'use strict';
    return SCModel.extend({
        name: 'ExternalPayment',
        errorCode: [
            'externalPaymentValidationStatusFail',
            'externalPaymentRequestInvalidParameters',
            'externalPaymentMissingImplementation',
            'externalPaymentRecordValidationStatusFail'
        ],
        generateUrl: function (id, record_type) {
            this.siteSettings = this.siteSettings || SiteSettings.get();
            var parameters = [
                'nltranid=' + id,
                'orderId=' + id,
                'n=' + this.siteSettings.siteid,
                'recordType=' + record_type,
                'goToExternalPayment=T'
            ];
            return ModelsInit.session.getAbsoluteUrl('/external_payment.ssp?' + parameters.join('&'));
        },
        goToExternalPayment: function (request) {
            var record_type = request.getParameter('recordType'), id = request.getParameter('orderId') || request.getParameter('nltranid'), touchpoint = request.getParameter('touchpoint'), result = { parameters: {} }, record = this._loadRecord(record_type, id);
            if (!this._validateRecordStatus(record)) {
                result.touchpoint = touchpoint;
                result.parameters.errorCode = 'externalPaymentValidationStatusFail';
            } else {
                ModelsInit.context.setSessionObject('external_nltranid_' + id, id);
                result.url = record.getFieldValue('redirecturl');
            }
            return result;
        },
        backFromExternalPayment: function (request) {
            var id = request.getParameter('orderId') || request.getParameter('nltranid'), record_type = request.getParameter('recordType'), touchpoint = request.getParameter('touchpoint'), result = {
                    touchpoint: touchpoint,
                    parameters: {
                        nltranid: id,
                        recordType: record_type,
                        externalPayment: this._isDone(request, record_type) ? 'DONE' : this._isReject(request, record_type) ? 'FAIL' : ''
                    }
                };
            if (!this._preventDefault(request, record_type)) {
                var record = this._loadRecord(record_type, id);
                if (!this._validateRecordStatus(record)) {
                    result.parameters.errorCode = 'externalPaymentRecordValidationStatusFail';
                } else if (!this._validateStatusFromRequest(request, record_type) || !this._validateTransactionId(id)) {
                    result.parameters.errorCode = 'externalPaymentRequestInvalidParameters';
                } else {
                    var method_name = '_updatePaymentMethod' + record_type.toUpperCase();
                    if (_.isFunction(this[method_name])) {
                        this[method_name](record, request);
                    } else {
                        result.parameters.errorCode = 'externalPaymentMissingImplementation';
                    }
                }
            }
            ModelsInit.context.setSessionObject('external_nltranid_' + id, '');
            return result;
        },
        getParametersFromRequest: function (request) {
            var nltranid = parseInt(request.getParameter('nltranid') || request.getParameter('orderId'), 10), record_type = request.getParameter('recordType'), external_payment = request.getParameter('externalPayment'), error_code = request.getParameter('errorCode'), result;
            if ((external_payment === 'DONE' || external_payment === 'FAIL') && !_.isNaN(nltranid) && record_type && Utils.recordTypeExists(record_type)) {
                result = {
                    recordType: record_type,
                    nltranid: nltranid,
                    externalPayment: external_payment,
                    errorCode: error_code ? _.contains(this.errorCode, error_code) ? error_code : 'externalPaymentRequestInvalidParameters' : ''
                };
            }
            return result;
        },
        _updatePaymentMethodCUSTOMERPAYMENT: function (record, request) {
            var record_type = 'customerpayment';
            if (this._isDone(request, record_type)) {
                record.setFieldValue('datafromredirect', this._getDataFromRedirect(request, record_type));
                record.setFieldValue('chargeit', 'T');
                nlapiSubmitRecord(record);
            }
        },
        _updatePaymentMethodSALESORDER: function (record, request) {
            var record_type = 'salesorder';
            if (this._isDone(request, record_type)) {
                record.setFieldValue('datafromredirect', this._getDataFromRedirect(request, record_type));
                record.setFieldValue('getauth', 'T');
                record.setFieldValue('paymentprocessingmode', 'PROCESS');
                nlapiSubmitRecord(record, false, true);
            }
        },
        _isDone: function (request, record_type) {
            var status = this._getStatusFromRequest(request, record_type), status_accept_value = this._getConfiguration(record_type, 'statusAcceptValue', 'ACCEPT'), status_hold_value = this._getConfiguration(record_type, 'statusHoldValue', 'HOLD');
            return status === status_accept_value || status === status_hold_value;
        },
        _isReject: function (request, record_type) {
            var status = this._getStatusFromRequest(request, record_type), status_reject_value = this._getConfiguration(record_type, 'statusRejectValue', 'REJECT');
            return status === status_reject_value;
        },
        _loadRecord: function (record_type, id) {
            return nlapiLoadRecord(record_type, id);
        },
        _validateRecordStatus: function (record) {
            return record.getFieldValue('paymenteventholdreason') === 'FORWARD_REQUESTED';
        },
        _getStatusFromRequest: function (request, record_type) {
            return request.getParameter(this._getConfiguration(record_type, 'statusParameterName', 'status'));
        },
        _validateStatusFromRequest: function (request, record_type) {
            var status = this._getStatusFromRequest(request, record_type), status_accept_value = this._getConfiguration(record_type, 'statusAcceptValue', 'ACCEPT'), status_hold_value = this._getConfiguration(record_type, 'statusHoldValue', 'HOLD'), status_reject_value = this._getConfiguration(record_type, 'statusRejectValue', 'REJECT');
            return status === status_accept_value || status === status_hold_value || status === status_reject_value;
        },
        _validateTransactionId: function (nltranid) {
            return ModelsInit.context.getSessionObject('external_nltranid_' + nltranid) === nltranid;
        },
        _getDataFromRedirect: function (request, record_type) {
            var request_parameters = request.getAllParameters(), configration_parameters = this._getConfiguration(record_type, 'parameters', [
                    'tranid',
                    'authcode',
                    'status'
                ]), data_from_redirect = [];
            _.each(_.keys(request_parameters), function (parameter_name) {
                if (_.contains(configration_parameters, parameter_name)) {
                    data_from_redirect.push(parameter_name + '=' + request_parameters[parameter_name]);
                }
            });
            console.log(JSON.stringify(data_from_redirect));
            return data_from_redirect.join('&');
        },
        _preventDefault: function (request, record_type) {
            var prevent_default_value = this._getConfiguration(record_type, 'preventDefaultValue', 'T'), prevent_default_parameter_name = this._getConfiguration(record_type, 'preventDefaultParameterName', 'preventDefault');
            return request.getParameter(prevent_default_parameter_name) === prevent_default_value;
        },
        _getConfiguration: function (record_type, property, default_value) {
            this.siteSettings = this.siteSettings || SiteSettings.get();
            var external_payment_configuration = this.siteSettings.externalPayment || {}, record_configuration = external_payment_configuration[record_type.toUpperCase()] || {};
            if (_.isUndefined(record_configuration[property])) {
                return default_value;
            } else {
                return record_configuration[property];
            }
        }
    });
});
define('CustomFields.Utils', ['Configuration'], function (Configuration) {
    'use strict';
    return {
        getCustomFieldsIdToBeExposed: function (recordType) {
            if (Configuration.customFields) {
                return Configuration.customFields[recordType] || [];
            }
            return [];
        }
    };
});
define('LiveOrder.Model', [
    'SC.Model',
    'Application',
    'Profile.Model',
    'StoreItem.Model',
    'SC.Models.Init',
    'SiteSettings.Model',
    'Utils',
    'ExternalPayment.Model',
    'underscore',
    'CustomFields.Utils'
], function (SCModel, Application, Profile, StoreItem, ModelsInit, SiteSettings, Utils, ExternalPayment, _, CustomFieldsUtils) {
    'use strict';
    return SCModel.extend({
        name: 'LiveOrder',
        isSecure: Utils.isCheckoutDomain(),
        isMultiShippingEnabled: SiteSettings.isMultiShippingRoutesEnabled(),
        isPickupInStoreEnabled: SiteSettings.isPickupInStoreEnabled(),
        isAutoapplyPromotionsEnabled: SiteSettings.isAutoapplyPromotionsEnabled(),
        get: function get() {
            var order_fields = this.getFieldValues(), result = {};
            try {
                result.lines = this.getLines(order_fields);
            } catch (e) {
                if (e.code === 'ERR_CHK_ITEM_NOT_FOUND') {
                    return this.get();
                } else {
                    throw e;
                }
            }
            order_fields = this.hidePaymentPageWhenNoBalance(order_fields);
            result.lines_sort = this.getLinesSort();
            result.latest_addition = ModelsInit.context.getSessionObject('latest_addition');
            result.promocodes = this.getPromoCodes(order_fields);
            if (this.automaticallyRemovedPromocodes) {
                result.automaticallyremovedpromocodes = this.automaticallyRemovedPromocodes;
            }
            result.ismultishipto = this.getIsMultiShipTo(order_fields);
            if (result.ismultishipto) {
                result.multishipmethods = this.getMultiShipMethods(result.lines);
                result.shipmethods = [];
                result.shipmethod = null;
            } else {
                result.shipmethods = this.getShipMethods(order_fields);
                result.shipmethod = order_fields.shipmethod ? order_fields.shipmethod.shipmethod : null;
            }
            result.addresses = this.getAddresses(order_fields);
            result.billaddress = order_fields.billaddress ? order_fields.billaddress.internalid : null;
            result.shipaddress = !result.ismultishipto ? order_fields.shipaddress.internalid : null;
            result.paymentmethods = this.getPaymentMethods(order_fields);
            result.isPaypalComplete = ModelsInit.context.getSessionObject('paypal_complete') === 'T';
            result.touchpoints = SiteSettings.getTouchPoints();
            result.agreetermcondition = order_fields.agreetermcondition === 'T';
            result.summary = order_fields.summary;
            result.options = this.getTransactionBodyField();
            result.purchasenumber = order_fields.purchasenumber;
            return result;
        },
        update: function update(data) {
            var current_order = this.get();
            if (this.isAutoapplyPromotionsEnabled) {
                this.setOldPromocodes();
            }
            if (this.isMultiShippingEnabled) {
                if (this.isSecure && ModelsInit.session.isLoggedIn2()) {
                    ModelsInit.order.setEnableItemLineShipping(!!data.ismultishipto);
                    if (!current_order.ismultishipto && data.ismultishipto) {
                        this.automaticallyRemovedPromocodes = this.getAutomaticallyRemovedPromocodes(current_order);
                    }
                }
                if (data.ismultishipto) {
                    ModelsInit.order.removeShippingAddress();
                    ModelsInit.order.removeShippingMethod();
                    this.splitLines(data, current_order);
                    this.setShippingAddressAndMethod(data, current_order);
                }
            }
            if (!this.isMultiShippingEnabled || !data.ismultishipto) {
                this.setShippingAddress(data, current_order);
                this.setShippingMethod(data, current_order);
            }
            this.setPromoCodes(data, current_order);
            this.setBillingAddress(data, current_order);
            this.setPaymentMethods(data, current_order);
            this.setPurchaseNumber(data, current_order);
            this.setTermsAndConditions(data, current_order);
            this.setTransactionBodyField(data, current_order);
        },
        submit: function submit(threedsecure) {
            var confirmation, payment = ModelsInit.order.getPayment();
            if (!threedsecure && payment && payment.paymentterms === 'CreditCard' && SC.Configuration.isThreeDSecureEnabled) {
                return this.process3DSecure();
            } else {
                var paypal_address = _.find(ModelsInit.customer.getAddressBook(), function (address) {
                    return !address.phone && address.isvalid === 'T';
                });
                confirmation = ModelsInit.order.submit();
                this.removePaypalAddress(paypal_address);
                ModelsInit.context.setSessionObject('paypal_complete', 'F');
                if (this.isMultiShippingEnabled) {
                    ModelsInit.order.setEnableItemLineShipping(false);
                }
                this.setPurchaseNumber();
                if (confirmation.statuscode !== 'redirect') {
                    confirmation = _.extend(this.getConfirmation(confirmation.internalid), confirmation);
                } else {
                    confirmation.redirecturl = ExternalPayment.generateUrl(confirmation.internalid, 'salesorder');
                }
            }
            return confirmation;
        },
        addAddress: function addAddress(address, addresses) {
            if (!address) {
                return null;
            }
            addresses = addresses || {};
            if (!address.fullname) {
                address.fullname = address.attention ? address.attention : address.addressee;
            }
            if (!address.company) {
                address.company = address.attention ? address.addressee : null;
            }
            delete address.attention;
            delete address.addressee;
            if (!address.internalid) {
                address.internalid = (address.country || '') + '-' + (address.state || '') + '-' + (address.city || '') + '-' + (address.zip || '') + '-' + (address.addr1 || '') + '-' + (address.addr2 || '') + '-' + (address.fullname || '') + '-' + address.company;
                address.internalid = address.internalid.replace(/\s/g, '-');
            }
            if (address.internalid !== '-------null') {
                addresses[address.internalid] = address;
            }
            return address.internalid;
        },
        hidePaymentPageWhenNoBalance: function hidePaymentPageWhenNoBalance(order_fields) {
            if (this.isSecure && ModelsInit.session.isLoggedIn2() && order_fields.payment && ModelsInit.session.getSiteSettings(['checkout']).checkout.hidepaymentpagewhennobalance === 'T' && order_fields.summary.total === 0) {
                ModelsInit.order.removePayment();
                order_fields = this.getFieldValues();
            }
            return order_fields;
        },
        redirectToPayPal: function redirectToPayPal() {
            var touchpoints = SiteSettings.getTouchPoints(), continue_url = ModelsInit.session.getAbsoluteUrl('') + (/\/$/.test(ModelsInit.session.getAbsoluteUrl('')) ? touchpoints.checkout.replace('/', '') : touchpoints.checkout), joint = ~continue_url.indexOf('?') ? '&' : '?';
            continue_url = continue_url + joint + 'paypal=DONE&fragment=' + request.getParameter('next_step');
            ModelsInit.session.proceedToCheckout({
                cancelurl: touchpoints.viewcart,
                continueurl: continue_url,
                createorder: 'F',
                type: 'paypalexpress',
                shippingaddrfirst: 'T',
                showpurchaseorder: 'T'
            });
        },
        redirectToPayPalExpress: function redirectToPayPalExpress() {
            var touchpoints = SiteSettings.getTouchPoints(), continue_url = ModelsInit.session.getAbsoluteUrl('') + (/\/$/.test(ModelsInit.session.getAbsoluteUrl('')) ? touchpoints.checkout.replace('/', '') : touchpoints.checkout), joint = ~continue_url.indexOf('?') ? '&' : '?';
            continue_url = continue_url + joint + 'paypal=DONE';
            ModelsInit.session.proceedToCheckout({
                cancelurl: touchpoints.viewcart,
                continueurl: continue_url,
                createorder: 'F',
                type: 'paypalexpress'
            });
        },
        getConfirmation: function getConfirmation(internalid) {
            var confirmation = { internalid: internalid };
            try {
                var record = nlapiLoadRecord('salesorder', confirmation.internalid);
                confirmation = this.confirmationCreateResult(record);
            } catch (e) {
                console.warn('Cart Confirmation could not be loaded, reason: ' + JSON.stringify(e));
            }
            return confirmation;
        },
        confirmationCreateResult: function confirmationCreateResult(placed_order) {
            var self = this, result = {
                    internalid: placed_order.getId(),
                    tranid: placed_order.getFieldValue('tranid'),
                    summary: {
                        subtotal: Utils.toCurrency(placed_order.getFieldValue('subtotal')),
                        subtotal_formatted: Utils.formatCurrency(placed_order.getFieldValue('subtotal')),
                        taxtotal: Utils.toCurrency(placed_order.getFieldValue('taxtotal')),
                        taxtotal_formatted: Utils.formatCurrency(placed_order.getFieldValue('taxtotal')),
                        tax2total: Utils.toCurrency(placed_order.getFieldValue('tax2total')),
                        tax2total_formatted: Utils.formatCurrency(placed_order.getFieldValue('tax2total')),
                        shippingcost: Utils.toCurrency(placed_order.getFieldValue('shippingcost')),
                        shippingcost_formatted: Utils.formatCurrency(placed_order.getFieldValue('shippingcost')),
                        handlingcost: Utils.toCurrency(placed_order.getFieldValue('althandlingcost')),
                        handlingcost_formatted: Utils.formatCurrency(placed_order.getFieldValue('althandlingcost')),
                        discounttotal: Utils.toCurrency(placed_order.getFieldValue('discounttotal')),
                        discounttotal_formatted: Utils.formatCurrency(placed_order.getFieldValue('discounttotal')),
                        giftcertapplied: Utils.toCurrency(placed_order.getFieldValue('giftcertapplied')),
                        giftcertapplied_formatted: Utils.formatCurrency(placed_order.getFieldValue('giftcertapplied')),
                        total: Utils.toCurrency(placed_order.getFieldValue('total')),
                        total_formatted: Utils.formatCurrency(placed_order.getFieldValue('total'))
                    }
                }, i = 0;
            result.promocodes = [];
            var promocode = placed_order.getFieldValue('promocode');
            if (promocode) {
                result.promocodes.push({
                    internalid: promocode,
                    code: placed_order.getFieldText('couponcode'),
                    isvalid: true,
                    discountrate_formatted: ''
                });
            }
            for (i = 1; i <= placed_order.getLineItemCount('promotions'); i++) {
                if (placed_order.getLineItemValue('promotions', 'applicabilitystatus', i) !== 'NOT_APPLIED') {
                    result.promocodes.push({
                        internalid: placed_order.getLineItemValue('promotions', 'couponcode', i),
                        code: placed_order.getLineItemValue('promotions', 'couponcode_display', i),
                        isvalid: placed_order.getLineItemValue('promotions', 'promotionisvalid', i) === 'T',
                        discountrate_formatted: ''
                    });
                }
            }
            result.paymentmethods = [];
            for (i = 1; i <= placed_order.getLineItemCount('giftcertredemption'); i++) {
                result.paymentmethods.push({
                    type: 'giftcertificate',
                    giftcertificate: {
                        code: placed_order.getLineItemValue('giftcertredemption', 'authcode_display', i),
                        amountapplied: placed_order.getLineItemValue('giftcertredemption', 'authcodeapplied', i),
                        amountapplied_formatted: Utils.formatCurrency(placed_order.getLineItemValue('giftcertredemption', 'authcodeapplied', i)),
                        amountremaining: placed_order.getLineItemValue('giftcertredemption', 'authcodeamtremaining', i),
                        amountremaining_formatted: Utils.formatCurrency(placed_order.getLineItemValue('giftcertredemption', 'authcodeamtremaining', i)),
                        originalamount: placed_order.getLineItemValue('giftcertredemption', 'giftcertavailable', i),
                        originalamount_formatted: Utils.formatCurrency(placed_order.getLineItemValue('giftcertredemption', 'giftcertavailable', i))
                    }
                });
            }
            result.lines = [];
            for (i = 1; i <= placed_order.getLineItemCount('item'); i++) {
                var line_item = {
                    item: {
                        id: placed_order.getLineItemValue('item', 'item', i),
                        type: placed_order.getLineItemValue('item', 'itemtype', i)
                    },
                    quantity: parseInt(placed_order.getLineItemValue('item', 'quantity', i), 10),
                    rate: parseInt(placed_order.getLineItemValue('item', 'rate', i), 10),
                    options: self.parseLineOptionsFromSuiteScript(placed_order.getLineItemValue('item', 'options', i))
                };
                if (self.isPickupInStoreEnabled) {
                    if (placed_order.getLineItemValue('item', 'itemfulfillmentchoice', i) === '1') {
                        line_item.fulfillmentChoice = 'ship';
                    } else if (placed_order.getLineItemValue('item', 'itemfulfillmentchoice', i) === '2') {
                        line_item.fulfillmentChoice = 'pickup';
                    }
                }
                result.lines.push(line_item);
            }
            StoreItem.preloadItems(_(result.lines).pluck('item'));
            _.each(result.lines, function (line) {
                line.item = StoreItem.get(line.item.id, line.item.type);
            });
            return result;
        },
        backFromPayPal: function backFromPayPal() {
            var customer_values = Profile.get(), bill_address = ModelsInit.order.getBillingAddress(), ship_address = ModelsInit.order.getShippingAddress();
            if (customer_values.isGuest === 'T' && ModelsInit.session.getSiteSettings(['registration']).registration.companyfieldmandatory === 'T') {
                customer_values.companyname = 'Guest Shopper';
                ModelsInit.customer.updateProfile(customer_values);
            }
            if (ship_address.internalid && ship_address.isvalid === 'T' && !bill_address.internalid) {
                ModelsInit.order.setBillingAddress(ship_address.internalid);
            }
            ModelsInit.context.setSessionObject('paypal_complete', 'T');
        },
        removePaypalAddress: function removePaypalAddress(paypal_address) {
            try {
                if (SC.Configuration.removePaypalAddress && paypal_address && paypal_address.internalid) {
                    ModelsInit.customer.removeAddress(paypal_address.internalid);
                }
            } catch (e) {
                var error = Application.processError(e);
                console.warn('Error ' + error.errorStatusCode + ': ' + error.errorCode + ' - ' + error.errorMessage);
            }
        },
        addLine: function addLine(line_data) {
            var item = {
                internalid: line_data.item.internalid.toString(),
                quantity: _.isNumber(line_data.quantity) ? parseInt(line_data.quantity, 10) : 1,
                options: this.parseLineOptionsToCommerceAPI(line_data.options)
            };
            if (this.isPickupInStoreEnabled && line_data.fulfillmentChoice === 'pickup' && line_data.location) {
                item.fulfillmentPreferences = {
                    fulfillmentChoice: 'pickup',
                    pickupLocationId: parseInt(line_data.location, 10)
                };
            }
            var line_id = ModelsInit.order.addItem(item);
            if (this.isMultiShippingEnabled && line_data.fulfillmentChoice !== 'pickup') {
                line_data.shipaddress && ModelsInit.order.setItemShippingAddress(line_id, line_data.shipaddress);
                line_data.shipmethod && ModelsInit.order.setItemShippingMethod(line_id, line_data.shipmethod);
            }
            ModelsInit.context.setSessionObject('latest_addition', line_id);
            var lines_sort = this.getLinesSort();
            lines_sort.unshift(line_id);
            this.setLinesSort(lines_sort);
            return line_id;
        },
        addLines: function addLines(lines_data) {
            var items = [], self = this;
            if (this.isAutoapplyPromotionsEnabled) {
                this.setOldPromocodes();
            }
            _.each(lines_data, function (line_data) {
                var item = {
                    internalid: line_data.item.internalid.toString(),
                    quantity: _.isNumber(line_data.quantity) ? parseInt(line_data.quantity, 10) : 1,
                    options: self.parseLineOptionsToCommerceAPI(line_data.options)
                };
                if (self.isPickupInStoreEnabled && line_data.fulfillmentChoice === 'pickup' && line_data.location) {
                    item.fulfillmentPreferences = {
                        fulfillmentChoice: 'pickup',
                        pickupLocationId: parseInt(line_data.location, 10)
                    };
                }
                items.push(item);
            });
            var lines_ids = ModelsInit.order.addItems(items), latest_addition = _.last(lines_ids).orderitemid, lines_sort = this.getLinesSort();
            lines_sort.unshift(latest_addition);
            this.setLinesSort(lines_sort);
            ModelsInit.context.setSessionObject('latest_addition', latest_addition);
            return lines_ids;
        },
        removeLine: function removeLine(line_id) {
            if (this.isAutoapplyPromotionsEnabled) {
                this.setOldPromocodes();
            }
            ModelsInit.order.removeItem(line_id);
            var lines_sort = this.getLinesSort();
            lines_sort = _.without(lines_sort, line_id);
            this.setLinesSort(lines_sort);
        },
        updateLine: function updateLine(line_id, line_data) {
            var lines_sort = this.getLinesSort(), current_position = _.indexOf(lines_sort, line_id), original_line_object = ModelsInit.order.getItem(line_id, [
                    'quantity',
                    'internalid',
                    'options',
                    'fulfillmentPreferences'
                ]);
            this.removeLine(line_id);
            if (!_.isNumber(line_data.quantity) || line_data.quantity > 0) {
                var new_line_id;
                try {
                    new_line_id = this.addLine(line_data);
                } catch (e) {
                    var roll_back_item = {
                        item: { internalid: parseInt(original_line_object.internalid, 10) },
                        quantity: parseInt(original_line_object.quantity, 10)
                    };
                    if (original_line_object.options && original_line_object.options.length) {
                        roll_back_item.options = {};
                        _.each(original_line_object.options, function (option) {
                            roll_back_item.options[option.id.toLowerCase()] = option.value;
                        });
                    }
                    new_line_id = this.addLine(roll_back_item);
                    e.errorDetails = {
                        status: 'LINE_ROLLBACK',
                        oldLineId: line_id,
                        newLineId: new_line_id
                    };
                    throw e;
                }
                lines_sort = _.without(lines_sort, line_id, new_line_id);
                lines_sort.splice(current_position, 0, new_line_id);
                this.setLinesSort(lines_sort);
            }
        },
        splitLines: function splitLines(data, current_order) {
            _.each(data.lines, function (line) {
                if (line.splitquantity) {
                    var splitquantity = typeof line.splitquantity === 'string' ? parseInt(line.splitquantity, 10) : line.splitquantity, original_line = _.find(current_order.lines, function (order_line) {
                            return order_line.internalid === line.internalid;
                        }), remaining = original_line ? original_line.quantity - splitquantity : -1;
                    if (remaining > 0 && splitquantity > 0) {
                        ModelsInit.order.splitItem({
                            'orderitemid': original_line.internalid,
                            'quantities': [
                                splitquantity,
                                remaining
                            ]
                        });
                    }
                }
            });
        },
        getFieldValues: function (requested_field_keys) {
            var order_field_keys = {}, isCheckout = Utils.isInCheckout(request) && ModelsInit.session.isLoggedIn2(), field_keys = isCheckout ? SC.Configuration.orderCheckoutFieldKeys : SC.Configuration.orderShoppingFieldKeys;
            if (requested_field_keys) {
                field_keys = {
                    keys: requested_field_keys.keys || field_keys.keys,
                    items: requested_field_keys.items || field_keys.items
                };
            }
            order_field_keys.items = field_keys.items;
            _.each(field_keys.keys, function (key) {
                order_field_keys[key] = null;
            });
            if (this.isMultiShippingEnabled) {
                if (!_.contains(order_field_keys.items, 'shipaddress')) {
                    order_field_keys.items.push('shipaddress');
                }
                if (!_.contains(order_field_keys.items, 'shipmethod')) {
                    order_field_keys.items.push('shipmethod');
                }
                order_field_keys.ismultishipto = null;
            }
            if (this.isPickupInStoreEnabled) {
                if (!_.contains(order_field_keys.items, 'fulfillmentPreferences')) {
                    order_field_keys.items.push('fulfillmentPreferences');
                }
            }
            return ModelsInit.order.getFieldValues(order_field_keys, false);
        },
        removeAllPromocodes: function removeAllPromocodes(promocodes_to_remove) {
            if (promocodes_to_remove) {
                _.each(promocodes_to_remove, function (promo) {
                    ModelsInit.order.removePromotionCode(promo.code);
                });
            } else {
                ModelsInit.order.removeAllPromotionCodes();
            }
        },
        getPromoCodes: function getPromoCodes(order_fields) {
            var result = [];
            var self = this;
            if (order_fields.promocodes && order_fields.promocodes.length) {
                _.each(order_fields.promocodes, function (promo_code) {
                    var promocode = {
                        internalid: promo_code.internalid,
                        code: promo_code.promocode,
                        isvalid: promo_code.isvalid === 'T',
                        discountrate_formatted: '',
                        errormsg: promo_code.errormsg,
                        name: promo_code.discount_name,
                        rate: promo_code.discount_rate,
                        type: promo_code.discount_type
                    };
                    if (self.isAutoapplyPromotionsEnabled) {
                        promocode.isautoapplied = promo_code.is_auto_applied;
                        promocode.applicabilitystatus = promo_code.applicability_status ? promo_code.applicability_status : '';
                        promocode.applicabilityreason = promo_code.applicability_reason ? promo_code.applicability_reason : '';
                        if (promo_code.applicability_status !== 'NOT_AVAILABLE' && !_.isUndefined(self.old_promocodes)) {
                            var old_promocode = self.old_promocodes ? _.find(self.old_promocodes, function (old_promo_code) {
                                return old_promo_code.internalid === promo_code.internalid;
                            }) : '';
                            if (!old_promocode || old_promocode.applicability_status !== promo_code.applicability_status || !promo_code.is_auto_applied && promo_code.applicability_reason !== old_promocode.applicability_reason) {
                                promocode.notification = true;
                            }
                        }
                    }
                    result.push(promocode);
                });
                if (this.isAutoapplyPromotionsEnabled) {
                    delete this.old_promocodes;
                }
            }
            return result;
        },
        getAutomaticallyRemovedPromocodes: function getAutomaticallyRemovedPromocodes(current_order) {
            var latest_promocodes = _.pluck(_.where(ModelsInit.order.getFieldValues(['promocodes']).promocodes, { isvalid: 'T' }), 'promocode'), current_promocodes = _.pluck(_.where(current_order.promocodes, { isvalid: true }), 'code'), removed_promocodes = _.difference(current_promocodes, latest_promocodes);
            return _.filter(current_order.promocodes, function (promocode) {
                return _.indexOf(removed_promocodes, promocode.code) >= 0;
            });
        },
        setPromoCodes: function setPromoCodes(data, current_order) {
            var self = this, only_in_current_order = _.filter(current_order.promocodes, function (promocode) {
                    return !_.findWhere(data.promocodes, { 'code': promocode.code });
                }), only_in_data = _.filter(data.promocodes, function (promocode) {
                    return !_.findWhere(current_order.promocodes, { 'code': promocode.code });
                });
            this.removeAllPromocodes(only_in_current_order);
            data.promocodes = data.promocodes || [];
            var valid_promocodes = _.filter(only_in_data, function (promocode) {
                return promocode.isvalid !== false;
            });
            if (!SC.Configuration.get('promocodes.allowMultiples', true) && valid_promocodes.length > 1) {
                valid_promocodes = [valid_promocodes[0]];
            } else {
                valid_promocodes = only_in_data;
            }
            _.each(valid_promocodes, function (promo) {
                try {
                    ModelsInit.order.applyPromotionCode(promo.code);
                } catch (e) {
                    var order_fields = self.getFieldValues(), promos = self.getPromoCodes(order_fields), is_in_current_order = !!_.find(promos, function (p) {
                            return promo.code === p.code;
                        });
                    if (e.code === 'ERR_WS_INVALID_COUPON' && !is_in_current_order) {
                        throw e;
                    }
                }
            });
        },
        getMultiShipMethods: function getMultiShipMethods(lines) {
            var multishipmethods = {};
            _.each(lines, function (line) {
                if (line.shipaddress) {
                    multishipmethods[line.shipaddress] = multishipmethods[line.shipaddress] || [];
                    multishipmethods[line.shipaddress].push(line.internalid);
                }
            });
            _.each(_.keys(multishipmethods), function (address) {
                var methods = ModelsInit.order.getAvailableShippingMethods(multishipmethods[address], address);
                _.each(methods, function (method) {
                    method.internalid = method.shipmethod;
                    method.rate_formatted = Utils.formatCurrency(method.rate);
                    delete method.shipmethod;
                });
                multishipmethods[address] = methods;
            });
            return multishipmethods;
        },
        getShipMethods: function getShipMethods(order_fields) {
            var shipmethods = _.map(order_fields.shipmethods, function (shipmethod) {
                var rate = Utils.toCurrency(shipmethod.rate.replace(/^\D+/g, '')) || 0;
                return {
                    internalid: shipmethod.shipmethod,
                    name: shipmethod.name,
                    shipcarrier: shipmethod.shipcarrier,
                    rate: rate,
                    rate_formatted: shipmethod.rate
                };
            });
            return shipmethods;
        },
        getLinesSort: function getLinesSort() {
            return ModelsInit.context.getSessionObject('lines_sort') ? ModelsInit.context.getSessionObject('lines_sort').split(',') : [];
        },
        getPaymentMethods: function getPaymentMethods(order_fields) {
            var paymentmethods = [], giftcertificates = ModelsInit.order.getAppliedGiftCertificates(), payment = order_fields && order_fields.payment, paypal = payment && _.findWhere(ModelsInit.session.getPaymentMethods(), { ispaypal: 'T' }), credit_card = payment && payment.creditcard;
            if (credit_card && credit_card.paymentmethod && credit_card.paymentmethod.creditcard === 'T') {
                paymentmethods.push({
                    type: 'creditcard',
                    primary: true,
                    creditcard: {
                        internalid: credit_card.internalid || '-temporal-',
                        ccnumber: credit_card.ccnumber,
                        ccname: credit_card.ccname,
                        ccexpiredate: credit_card.expmonth + '/' + credit_card.expyear,
                        ccsecuritycode: credit_card.ccsecuritycode,
                        expmonth: credit_card.expmonth,
                        expyear: credit_card.expyear,
                        paymentmethod: {
                            internalid: credit_card.paymentmethod.internalid,
                            name: credit_card.paymentmethod.name,
                            creditcard: credit_card.paymentmethod.creditcard === 'T',
                            ispaypal: credit_card.paymentmethod.ispaypal === 'T',
                            isexternal: credit_card.paymentmethod.isexternal === 'T',
                            key: credit_card.paymentmethod.key
                        }
                    }
                });
            } else if (paypal && payment.paymentmethod === paypal.internalid) {
                paymentmethods.push({
                    type: 'paypal',
                    primary: true,
                    complete: ModelsInit.context.getSessionObject('paypal_complete') === 'T',
                    internalid: paypal.internalid,
                    name: paypal.name,
                    creditcard: paypal.creditcard === 'T',
                    ispaypal: paypal.ispaypal === 'T',
                    isexternal: paypal.isexternal === 'T',
                    key: paypal.key
                });
            } else if (credit_card && credit_card.paymentmethod && credit_card.paymentmethod.isexternal === 'T') {
                paymentmethods.push({
                    type: 'external_checkout_' + credit_card.paymentmethod.key,
                    primary: true,
                    internalid: credit_card.paymentmethod.internalid,
                    name: credit_card.paymentmethod.name,
                    creditcard: credit_card.paymentmethod.creditcard === 'T',
                    ispaypal: credit_card.paymentmethod.ispaypal === 'T',
                    isexternal: credit_card.paymentmethod.isexternal === 'T',
                    key: credit_card.paymentmethod.key,
                    errorurl: payment.errorurl,
                    thankyouurl: payment.thankyouurl
                });
            } else if (order_fields.payment && order_fields.payment.paymentterms === 'Invoice') {
                var customer_invoice = ModelsInit.customer.getFieldValues([
                    'paymentterms',
                    'creditlimit',
                    'balance',
                    'creditholdoverride'
                ]);
                paymentmethods.push({
                    type: 'invoice',
                    primary: true,
                    paymentterms: customer_invoice.paymentterms,
                    creditlimit: parseFloat(customer_invoice.creditlimit || 0),
                    creditlimit_formatted: Utils.formatCurrency(customer_invoice.creditlimit),
                    balance: parseFloat(customer_invoice.balance || 0),
                    balance_formatted: Utils.formatCurrency(customer_invoice.balance),
                    creditholdoverride: customer_invoice.creditholdoverride
                });
            }
            if (giftcertificates && giftcertificates.length) {
                _.forEach(giftcertificates, function (giftcertificate) {
                    paymentmethods.push({
                        type: 'giftcertificate',
                        giftcertificate: {
                            code: giftcertificate.giftcertcode,
                            amountapplied: Utils.toCurrency(giftcertificate.amountapplied || 0),
                            amountapplied_formatted: Utils.formatCurrency(giftcertificate.amountapplied || 0),
                            amountremaining: Utils.toCurrency(giftcertificate.amountremaining || 0),
                            amountremaining_formatted: Utils.formatCurrency(giftcertificate.amountremaining || 0),
                            originalamount: Utils.toCurrency(giftcertificate.originalamount || 0),
                            originalamount_formatted: Utils.formatCurrency(giftcertificate.originalamount || 0)
                        }
                    });
                });
            }
            return paymentmethods;
        },
        getTransactionBodyField: function getTransactionBodyField() {
            var options = {};
            if (this.isSecure) {
                var fieldsIdToBeExposed = CustomFieldsUtils.getCustomFieldsIdToBeExposed('salesorder');
                _.each(ModelsInit.order.getCustomFieldValues(), function (option) {
                    if (_.find(fieldsIdToBeExposed, function (fieldIdToBeExposed) {
                            return option.name === fieldIdToBeExposed;
                        })) {
                        options[option.name] = option.value.indexOf(String.fromCharCode(5)) !== -1 ? option.value.split(String.fromCharCode(5)) : option.value;
                    }
                });
            }
            return options;
        },
        getAddresses: function getAddresses(order_fields) {
            var self = this, addresses = {}, address_book = ModelsInit.session.isLoggedIn2() && this.isSecure ? ModelsInit.customer.getAddressBook() : [];
            address_book = _.object(_.pluck(address_book, 'internalid'), address_book);
            if (order_fields.ismultishipto === 'T') {
                _.each(order_fields.items || [], function (line) {
                    if (line.shipaddress && !addresses[line.shipaddress]) {
                        self.addAddress(address_book[line.shipaddress], addresses);
                    }
                });
            } else {
                this.addAddress(order_fields.shipaddress, addresses);
            }
            this.addAddress(order_fields.billaddress, addresses);
            return _.values(addresses);
        },
        getLines: function getLines(order_fields) {
            var lines = [];
            if (order_fields.items && order_fields.items.length) {
                var self = this, items_to_preload = [], address_book = ModelsInit.session.isLoggedIn2() && this.isSecure ? ModelsInit.customer.getAddressBook() : [], item_ids_to_clean = [];
                address_book = _.object(_.pluck(address_book, 'internalid'), address_book);
                _.each(order_fields.items, function (original_line) {
                    var total = original_line.promotionamount ? Utils.toCurrency(original_line.promotionamount) : Utils.toCurrency(original_line.amount), discount = Utils.toCurrency(original_line.promotiondiscount) || 0, line_to_add;
                    line_to_add = {
                        internalid: original_line.orderitemid,
                        quantity: original_line.quantity,
                        rate: parseFloat(original_line.rate),
                        rate_formatted: original_line.rate_formatted,
                        amount: Utils.toCurrency(original_line.amount),
                        tax_rate1: original_line.taxrate1,
                        tax_type1: original_line.taxtype1,
                        tax_rate2: original_line.taxrate2,
                        tax_type2: original_line.taxtype2,
                        tax1_amount: original_line.tax1amt,
                        tax1_amount_formatted: Utils.formatCurrency(original_line.tax1amt),
                        discount: discount,
                        total: total,
                        item: original_line.internalid,
                        itemtype: original_line.itemtype,
                        options: self.parseLineOptionsFromCommerceAPI(original_line.options),
                        shipaddress: original_line.shipaddress,
                        shipmethod: original_line.shipmethod,
                        discounts_impact: original_line.discounts_impact
                    };
                    if (self.isPickupInStoreEnabled && original_line.fulfillmentPreferences) {
                        line_to_add.location = original_line.fulfillmentPreferences.pickupLocationId;
                        line_to_add.fulfillmentChoice = original_line.fulfillmentPreferences.fulfillmentChoice;
                    }
                    lines.push(line_to_add);
                    if (line_to_add.shipaddress && !address_book[line_to_add.shipaddress]) {
                        line_to_add.shipaddress = null;
                        line_to_add.shipmethod = null;
                        item_ids_to_clean.push(line_to_add.internalid);
                    } else {
                        items_to_preload.push({
                            id: original_line.internalid,
                            type: original_line.itemtype
                        });
                    }
                });
                if (item_ids_to_clean.length) {
                    ModelsInit.order.setItemShippingAddress(item_ids_to_clean, null);
                    ModelsInit.order.setItemShippingMethod(item_ids_to_clean, null);
                }
                var restart = false;
                StoreItem.preloadItems(items_to_preload);
                lines.forEach(function (line) {
                    line.item = StoreItem.get(line.item, line.itemtype);
                    if (!line.item) {
                        self.removeLine(line.internalid);
                        restart = true;
                    } else {
                        line.rate_formatted = Utils.formatCurrency(line.rate);
                        line.amount_formatted = Utils.formatCurrency(line.amount);
                        line.tax_amount_formatted = Utils.formatCurrency(line.tax_amount);
                        line.discount_formatted = Utils.formatCurrency(line.discount);
                        line.total_formatted = Utils.formatCurrency(line.total);
                    }
                });
                if (restart) {
                    throw { code: 'ERR_CHK_ITEM_NOT_FOUND' };
                }
                var lines_sort = this.getLinesSort();
                if (lines_sort.length) {
                    lines = _.sortBy(lines, function (line) {
                        return _.indexOf(lines_sort, line.internalid);
                    });
                } else {
                    this.setLinesSort(_.pluck(lines, 'internalid'));
                }
            }
            return lines;
        },
        getLinesOnly: function getLinesOnly() {
            var field_values = this.getFieldValues({
                keys: [],
                items: null
            });
            return this.getLines(field_values);
        },
        getSummary: function getSummary() {
            var summary = this.getFieldValues({
                keys: ['summary'],
                items: []
            }).summary;
            return _.clone(summary);
        },
        parseLineOptionsToCommerceAPI: function parseLineOptionsToCommerceAPI(options) {
            var result = {};
            _.each(options || [], function (option) {
                if (option && option.value && option.cartOptionId) {
                    result[option.cartOptionId] = option.value.internalid;
                }
            });
            return result;
        },
        parseLineOptionsFromCommerceAPI: function parseLineOptionsFromCommerceAPI(options) {
            return _.map(options, function (option) {
                var option_label = Utils.trim(option.name);
                option_label = Utils.stringEndsWith(option_label, ':') ? option_label.substr(0, option_label.length - 1) : option_label;
                return {
                    value: {
                        label: option.displayvalue,
                        internalid: option.value
                    },
                    cartOptionId: option.id.toLowerCase(),
                    label: option_label
                };
            });
        },
        parseLineOptionsFromSuiteScript: function parseLineOptionsFromSuiteScript(options_string) {
            var options_object = [];
            if (options_string && options_string !== '- None -') {
                var split_char_3 = String.fromCharCode(3), split_char_4 = String.fromCharCode(4);
                _.each(options_string.split(split_char_4), function (option_line) {
                    option_line = option_line.split(split_char_3);
                    options_object.push({
                        cartOptionId: option_line[0].toLowerCase(),
                        label: option_line[2],
                        value: {
                            label: option_line[4],
                            internalid: option_line[3]
                        },
                        ismandatory: option_line[1] === 'T'
                    });
                });
            }
            return options_object;
        },
        getIsMultiShipTo: function getIsMultiShipTo(order_fields) {
            return this.isMultiShippingEnabled && order_fields.ismultishipto === 'T';
        },
        setLinesSort: function setLinesSort(lines_sort) {
            return ModelsInit.context.setSessionObject('lines_sort', lines_sort || []);
        },
        setBillingAddress: function setBillingAddress(data, current_order) {
            if (data.sameAs) {
                data.billaddress = data.shipaddress;
            }
            if (data.billaddress !== current_order.billaddress) {
                if (data.billaddress) {
                    if (data.billaddress && !~data.billaddress.indexOf('null')) {
                        ModelsInit.order.setBillingAddress(new String(data.billaddress).toString());
                    }
                } else if (this.isSecure) {
                    ModelsInit.order.removeBillingAddress();
                }
            }
        },
        setShippingAddressAndMethod: function setShippingAddressAndMethod(data, current_order) {
            var current_package, packages = {}, item_ids_to_clean = [], original_line;
            _.each(data.lines, function (line) {
                original_line = _.find(current_order.lines, function (order_line) {
                    return order_line.internalid === line.internalid;
                });
                if (original_line && original_line.item && original_line.item.isfulfillable !== false) {
                    if (line.shipaddress) {
                        packages[line.shipaddress] = packages[line.shipaddress] || {
                            shipMethodId: null,
                            itemIds: []
                        };
                        packages[line.shipaddress].itemIds.push(line.internalid);
                        if (!packages[line.shipaddress].shipMethodId && line.shipmethod) {
                            packages[line.shipaddress].shipMethodId = line.shipmethod;
                        }
                    } else {
                        item_ids_to_clean.push(line.internalid);
                    }
                }
            });
            if (item_ids_to_clean.length) {
                ModelsInit.order.setItemShippingAddress(item_ids_to_clean, null);
                ModelsInit.order.setItemShippingMethod(item_ids_to_clean, null);
            }
            _.each(_.keys(packages), function (address_id) {
                current_package = packages[address_id];
                ModelsInit.order.setItemShippingAddress(current_package.itemIds, parseInt(address_id, 10));
                if (current_package.shipMethodId) {
                    ModelsInit.order.setItemShippingMethod(current_package.itemIds, parseInt(current_package.shipMethodId, 10));
                }
            });
        },
        setShippingAddress: function setShippingAddress(data, current_order) {
            if (data.shipaddress !== current_order.shipaddress) {
                if (data.shipaddress) {
                    if (this.isSecure && !~data.shipaddress.indexOf('null')) {
                        ModelsInit.order.setShippingAddress(new String(data.shipaddress).toString());
                    } else {
                        var address = _.find(data.addresses, function (address) {
                            return address.internalid === data.shipaddress;
                        });
                        address && ModelsInit.order.estimateShippingCost(address);
                    }
                } else if (this.isSecure) {
                    ModelsInit.order.removeShippingAddress();
                } else {
                    ModelsInit.order.estimateShippingCost({
                        zip: null,
                        country: null
                    });
                    ModelsInit.order.removeShippingMethod();
                }
            }
        },
        setPurchaseNumber: function setPurchaseNumber(data) {
            if (ModelsInit.session.isLoggedIn2()) {
                if (data && data.purchasenumber) {
                    ModelsInit.order.setPurchaseNumber(data.purchasenumber);
                } else {
                    ModelsInit.order.removePurchaseNumber();
                }
            }
        },
        setPaymentMethods: function setPaymentMethods(data) {
            var gift_certificate_methods = _.where(data.paymentmethods, { type: 'giftcertificate' }), non_certificate_methods = _.difference(data.paymentmethods, gift_certificate_methods);
            if (this.isSecure && non_certificate_methods && non_certificate_methods.length && ModelsInit.session.isLoggedIn2()) {
                _.each(non_certificate_methods, function (paymentmethod) {
                    if (paymentmethod.type === 'creditcard' && paymentmethod.creditcard) {
                        var credit_card = paymentmethod.creditcard, require_cc_security_code = ModelsInit.session.getSiteSettings(['checkout']).checkout.requireccsecuritycode === 'T', cc_obj = credit_card && {
                                ccnumber: credit_card.ccnumber,
                                ccname: credit_card.ccname,
                                ccexpiredate: credit_card.ccexpiredate,
                                expmonth: credit_card.expmonth,
                                expyear: credit_card.expyear,
                                paymentmethod: {
                                    internalid: credit_card.paymentmethod.internalid,
                                    name: credit_card.paymentmethod.name,
                                    creditcard: credit_card.paymentmethod.creditcard ? 'T' : 'F',
                                    ispaypal: credit_card.paymentmethod.ispaypal ? 'T' : 'F',
                                    key: credit_card.paymentmethod.key
                                }
                            };
                        if (credit_card.internalid !== '-temporal-') {
                            cc_obj.internalid = credit_card.internalid;
                        } else {
                            cc_obj.internalid = null;
                            cc_obj.savecard = 'F';
                        }
                        if (credit_card.ccsecuritycode) {
                            cc_obj.ccsecuritycode = credit_card.ccsecuritycode;
                        }
                        if (!require_cc_security_code || require_cc_security_code && credit_card.ccsecuritycode) {
                            try {
                                if (cc_obj.internalid || !cc_obj.internalid && !~cc_obj.ccnumber.indexOf('*')) {
                                    ModelsInit.order.removePayment();
                                    ModelsInit.order.setPayment({
                                        paymentterms: 'CreditCard',
                                        creditcard: cc_obj,
                                        paymentmethod: cc_obj.paymentmethod.key
                                    });
                                    ModelsInit.context.setSessionObject('paypal_complete', 'F');
                                }
                            } catch (e) {
                                if (e && e.code && e.code === 'ERR_WS_INVALID_PAYMENT') {
                                    ModelsInit.order.removePayment();
                                }
                                throw e;
                            }
                        } else if (require_cc_security_code && !credit_card.ccsecuritycode) {
                            ModelsInit.order.removePayment();
                        }
                    } else if (paymentmethod.type === 'invoice') {
                        ModelsInit.order.removePayment();
                        try {
                            ModelsInit.order.setPayment({ paymentterms: 'Invoice' });
                        } catch (e) {
                            if (e && e.code && e.code === 'ERR_WS_INVALID_PAYMENT') {
                                ModelsInit.order.removePayment();
                            }
                            throw e;
                        }
                        ModelsInit.context.setSessionObject('paypal_complete', 'F');
                    } else if (paymentmethod.type === 'paypal') {
                        if (ModelsInit.context.getSessionObject('paypal_complete') !== 'T') {
                            ModelsInit.order.removePayment();
                            var paypal = _.findWhere(ModelsInit.session.getPaymentMethods(), { ispaypal: 'T' });
                            paypal && ModelsInit.order.setPayment({
                                paymentterms: '',
                                paymentmethod: paypal.key
                            });
                        }
                    } else if (paymentmethod.type && ~paymentmethod.type.indexOf('external_checkout')) {
                        ModelsInit.order.removePayment();
                        ModelsInit.order.setPayment({
                            paymentmethod: paymentmethod.key,
                            thankyouurl: paymentmethod.thankyouurl,
                            errorurl: paymentmethod.errorurl
                        });
                    } else {
                        ModelsInit.order.removePayment();
                    }
                });
            } else if (this.isSecure && ModelsInit.session.isLoggedIn2()) {
                ModelsInit.order.removePayment();
            }
            gift_certificate_methods = _.map(gift_certificate_methods, function (gift_certificate) {
                return gift_certificate.giftcertificate;
            });
            this.setGiftCertificates(gift_certificate_methods);
        },
        setGiftCertificates: function setGiftCertificates(gift_certificates) {
            ModelsInit.order.removeAllGiftCertificates();
            _.forEach(gift_certificates, function (gift_certificate) {
                ModelsInit.order.applyGiftCertificate(gift_certificate.code);
            });
        },
        setShippingMethod: function setShippingMethod(data, current_order) {
            if ((!this.isMultiShippingEnabled || !data.ismultishipto) && this.isSecure && data.shipmethod !== current_order.shipmethod) {
                var shipmethod = _.findWhere(current_order.shipmethods, { internalid: data.shipmethod });
                if (shipmethod) {
                    ModelsInit.order.setShippingMethod({
                        shipmethod: shipmethod.internalid,
                        shipcarrier: shipmethod.shipcarrier
                    });
                } else {
                    ModelsInit.order.removeShippingMethod();
                }
            }
        },
        setTermsAndConditions: function setTermsAndConditions(data) {
            var require_terms_and_conditions = ModelsInit.session.getSiteSettings(['checkout']).checkout.requiretermsandconditions;
            if (require_terms_and_conditions.toString() === 'T' && this.isSecure && !_.isUndefined(data.agreetermcondition) && ModelsInit.session.isLoggedIn2()) {
                ModelsInit.order.setTermsAndConditions(data.agreetermcondition);
            }
        },
        setTransactionBodyField: function setTransactionBodyField(data) {
            if (this.isSecure && !_.isEmpty(data.options) && ModelsInit.session.isLoggedIn2()) {
                _.each(data.options, function (value, key) {
                    if (Array.isArray(value)) {
                        data.options[key] = value.join(String.fromCharCode(5));
                    }
                });
                ModelsInit.order.setCustomFieldValues(data.options);
            }
        },
        getOptionByCartOptionId: function getOptionByCartOptionId(options, cart_option_id) {
            return _.findWhere(options, { cartOptionId: cart_option_id });
        },
        setOldPromocodes: function setOldPromocodes() {
            var order_fields = this.getFieldValues();
            this.old_promocodes = order_fields.promocodes;
        },
        process3DSecure: function process3DSecure() {
            var orderHandlerUrl = ModelsInit.session.getAbsoluteUrl('checkout', '../threedsecure.ssp'), confirmation = ModelsInit.order.submit({
                    paymentauthorization: {
                        type: 'threedsecure',
                        noredirect: 'T',
                        termurl: orderHandlerUrl
                    }
                });
            if (confirmation.statuscode === 'error') {
                if (confirmation.reasoncode === 'ERR_WS_REQ_PAYMENT_AUTHORIZATION') {
                    return confirmation;
                }
                throw confirmation;
            } else {
                confirmation = _.extend(this.getConfirmation(confirmation.internalid), confirmation);
            }
            return confirmation;
        }
    });
});
define('Address.Model', [
    'SC.Model',
    'SC.Models.Init',
    'Backbone.Validation',
    'underscore'
], function (SCModel, ModelsInit, BackboneValidation, _) {
    'use strict';
    var countries, states = {};
    return SCModel.extend({
        name: 'Address',
        validation: {
            addressee: {
                required: true,
                msg: 'Full Name is required'
            },
            addr1: {
                required: true,
                msg: 'Address is required'
            },
            country: {
                required: true,
                msg: 'Country is required'
            },
            state: function (value, attr, computedState) {
                var selected_country = computedState.country;
                if (selected_country) {
                    if (!states[selected_country]) {
                        states[selected_country] = ModelsInit.session.getStates([selected_country]);
                    }
                    if (selected_country && states[selected_country] && !value) {
                        return 'State is required';
                    }
                } else {
                    return 'Country is required';
                }
            },
            city: {
                required: true,
                msg: 'City is required'
            },
            zip: function (value, attr, computedState) {
                var selected_country = computedState.country;
                countries = countries || ModelsInit.session.getCountries();
                if (!selected_country && !value || selected_country && countries[selected_country] && countries[selected_country].isziprequired === 'T' && !value) {
                    return 'State is required';
                }
            },
            phone: function (value) {
                if (SC.Configuration.addresses && SC.Configuration.addresses.isPhoneMandatory && !value) {
                    return 'Phone Number is required';
                }
            }
        },
        isValid: function (data) {
            data = this.unwrapAddressee(_.clone(data));
            var validator = _.extend({
                validation: this.validation,
                attributes: data
            }, BackboneValidation.mixin);
            validator.validate();
            return validator.isValid();
        },
        wrapAddressee: function (address) {
            if (address.attention && address.addressee) {
                address.fullname = address.attention;
                address.company = address.addressee;
            } else {
                address.fullname = address.addressee;
                address.company = null;
            }
            delete address.attention;
            delete address.addressee;
            return address;
        },
        unwrapAddressee: function (address) {
            if (address.company && address.company.trim().length > 0) {
                address.attention = address.fullname;
                address.addressee = address.company;
            } else {
                address.addressee = address.fullname;
                address.attention = null;
            }
            delete address.fullname;
            delete address.company;
            delete address.check;
            return address;
        },
        get: function (id) {
            return this.wrapAddressee(ModelsInit.customer.getAddress(id));
        },
        getDefaultBilling: function () {
            return _.find(ModelsInit.customer.getAddressBook(), function (address) {
                return address.defaultbilling === 'T';
            });
        },
        getDefaultShipping: function () {
            return _.find(ModelsInit.customer.getAddressBook(), function (address) {
                return address.defaultshipping === 'T';
            });
        },
        list: function () {
            var self = this;
            return _.map(ModelsInit.customer.getAddressBook(), function (address) {
                return self.wrapAddressee(address);
            });
        },
        update: function (id, data) {
            data = this.unwrapAddressee(data);
            this.validate(data);
            data.internalid = id;
            return ModelsInit.customer.updateAddress(data);
        },
        create: function (data) {
            data = this.unwrapAddressee(data);
            this.validate(data);
            return ModelsInit.customer.addAddress(data);
        },
        remove: function (id) {
            return ModelsInit.customer.removeAddress(id);
        }
    });
});
define('CreditCard.Model', [
    'SC.Model',
    'SC.Models.Init',
    'underscore'
], function (SCModel, ModelsInit, _) {
    'use strict';
    return SCModel.extend({
        name: 'CreditCard',
        validation: {
            ccname: {
                required: true,
                msg: 'Name is required'
            },
            paymentmethod: {
                required: true,
                msg: 'Card Type is required'
            },
            ccnumber: {
                required: true,
                msg: 'Card Number is required'
            },
            expmonth: {
                required: true,
                msg: 'Expiration is required'
            },
            expyear: {
                required: true,
                msg: 'Expiration is required'
            }
        },
        get: function (id) {
            return ModelsInit.customer.getCreditCard(id);
        },
        getDefault: function () {
            return _.find(ModelsInit.customer.getCreditCards(), function (credit_card) {
                return credit_card.ccdefault === 'T';
            });
        },
        list: function () {
            return _.filter(ModelsInit.customer.getCreditCards(), function (credit_card) {
                return credit_card.paymentmethod;
            });
        },
        update: function (id, data) {
            this.validate(data);
            data.internalid = id;
            return ModelsInit.customer.updateCreditCard(data);
        },
        create: function (data) {
            this.validate(data);
            return ModelsInit.customer.addCreditCard(data);
        },
        remove: function (id) {
            return ModelsInit.customer.removeCreditCard(id);
        }
    });
});
define('Account.Model', [
    'SC.Model',
    'Application',
    'SC.Models.Init',
    'Profile.Model',
    'LiveOrder.Model',
    'Address.Model',
    'CreditCard.Model',
    'SiteSettings.Model',
    'underscore'
], function (SCModel, Application, ModelsInit, Profile, LiveOrder, Address, CreditCard, SiteSettings, _) {
    'use strict';
    return SCModel.extend({
        name: 'Account',
        login: function (email, password, redirect) {
            ModelsInit.session.login({
                email: email,
                password: password
            });
            var user = Profile.get();
            user.isLoggedIn = ModelsInit.session.isLoggedIn2() ? 'T' : 'F';
            user.isRecognized = ModelsInit.session.isRecognized() ? 'T' : 'F';
            var ret = {
                touchpoints: ModelsInit.session.getSiteSettings(['touchpoints']).touchpoints,
                user: user
            };
            if (!redirect) {
                var Environment = Application.getEnvironment(request), language = Environment && Environment.currentLanguage || {};
                language.url = language.locale && ModelsInit.session.getAbsoluteUrl('/languages/' + language.locale + '.js') || '';
                _.extend(ret, {
                    cart: LiveOrder.get(),
                    address: Address.list(),
                    creditcard: CreditCard.list(),
                    language: language,
                    currency: Environment && Environment.currentCurrency || ''
                });
            }
            return ret;
        },
        forgotPassword: function (email) {
            try {
                ModelsInit.session.sendPasswordRetrievalEmail2(email);
            } catch (e) {
                var error = Application.processError(e);
                if (error.errorCode !== 'ERR_WS_CUSTOMER_LOGIN') {
                    throw e;
                }
            }
            return { success: true };
        },
        resetPassword: function (params, password) {
            if (!ModelsInit.session.doChangePassword(params, password)) {
                throw new Error('An error has occurred');
            } else {
                return { success: true };
            }
        },
        registerAsGuest: function (user) {
            var site_settings = SiteSettings.get();
            if (site_settings.registration.companyfieldmandatory === 'T') {
                user.companyname = 'Guest Shopper';
            }
            ModelsInit.session.registerGuest(user);
            user = Profile.get();
            user.isLoggedIn = ModelsInit.session.isLoggedIn2() ? 'T' : 'F';
            user.isRecognized = ModelsInit.session.isRecognized() ? 'T' : 'F';
            return {
                touchpoints: ModelsInit.session.getSiteSettings(['touchpoints']).touchpoints,
                user: user,
                cart: LiveOrder.get(),
                address: Address.list(),
                creditcard: CreditCard.list()
            };
        },
        register: function (user_data) {
            if (ModelsInit.customer.isGuest()) {
                var guest_data = ModelsInit.customer.getFieldValues();
                ModelsInit.customer.setLoginCredentials({
                    internalid: guest_data.internalid,
                    email: user_data.email,
                    password: user_data.password
                });
                ModelsInit.session.login({
                    email: user_data.email,
                    password: user_data.password
                });
                ModelsInit.customer.updateProfile({
                    internalid: guest_data.internalid,
                    firstname: user_data.firstname,
                    lastname: user_data.lastname,
                    companyname: user_data.company,
                    emailsubscribe: user_data.emailsubscribe && user_data.emailsubscribe !== 'F' ? 'T' : 'F'
                });
            } else {
                user_data.emailsubscribe = user_data.emailsubscribe && user_data.emailsubscribe !== 'F' ? 'T' : 'F';
                ModelsInit.session.registerCustomer({
                    firstname: user_data.firstname,
                    lastname: user_data.lastname,
                    companyname: user_data.company,
                    email: user_data.email,
                    password: user_data.password,
                    password2: user_data.password2,
                    emailsubscribe: user_data.emailsubscribe && user_data.emailsubscribe !== 'F' ? 'T' : 'F'
                });
            }
            var user = Profile.get();
            user.isLoggedIn = ModelsInit.session.isLoggedIn2() ? 'T' : 'F';
            user.isRecognized = ModelsInit.session.isRecognized() ? 'T' : 'F';
            return {
                touchpoints: ModelsInit.session.getSiteSettings(['touchpoints']).touchpoints,
                user: user,
                cart: LiveOrder.get(),
                address: Address.list(),
                creditcard: CreditCard.list()
            };
        }
    });
});
define('Account.ForgotPassword.ServiceController', [
    'ServiceController',
    'Account.Model'
], function (ServiceController, AccountModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Account.ForgotPassword.ServiceController',
        post: function () {
            return AccountModel.forgotPassword(this.data.email);
        }
    });
});
define('Account.Login.ServiceController', [
    'ServiceController',
    'Account.Model'
], function (ServiceController, AccountModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Account.Login.ServiceController',
        post: function () {
            return AccountModel.login(this.data.email, this.data.password, this.data.redirect);
        }
    });
});
define('Account.Register.ServiceController', [
    'ServiceController',
    'Account.Model'
], function (ServiceController, AccountModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Account.Register.ServiceController',
        post: function () {
            return AccountModel.register(this.data);
        }
    });
});
define('Account.RegisterAsGuest.ServiceController', [
    'ServiceController',
    'Account.Model'
], function (ServiceController, AccountModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Account.RegisterAsGuest.ServiceController',
        post: function () {
            return AccountModel.registerAsGuest(this.data);
        }
    });
});
define('Account.ResetPassword.ServiceController', [
    'ServiceController',
    'Account.Model'
], function (ServiceController, AccountModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Account.ResetPassword.ServiceController',
        post: function () {
            return AccountModel.resetPassword(this.data.params, this.data.password);
        }
    });
});
define('Address.ServiceController', [
    'ServiceController',
    'Application',
    'Address.Model'
], function (ServiceController, Application, AddressModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Address.ServiceController',
        options: { common: { requireLogin: true } },
        get: function () {
            var id = this.request.getParameter('internalid');
            return id ? AddressModel.get(id) : AddressModel.list() || [];
        },
        post: function () {
            var id = AddressModel.create(this.data);
            this.sendContent(AddressModel.get(id), { 'status': 201 });
        },
        put: function () {
            var id = this.request.getParameter('internalid');
            AddressModel.update(id, this.data);
            return AddressModel.get(id);
        },
        delete: function () {
            var id = this.request.getParameter('internalid');
            AddressModel.remove(id);
            return { 'status': 'ok' };
        }
    });
});
define('Case.Model', [
    'SC.Model',
    'Application',
    'Utils',
    'underscore'
], function (SCModel, Application, Utils, _) {
    'use strict';
    return SCModel.extend({
        name: 'Case',
        configuration: SC.Configuration.cases,
        dummy_date: new Date(),
        getNew: function () {
            var case_record = nlapiCreateRecord('supportcase');
            var category_field = case_record.getField('category');
            var category_options = category_field.getSelectOptions();
            var category_option_values = [];
            _(category_options).each(function (category_option) {
                var category_option_value = {
                    id: category_option.id,
                    text: category_option.text
                };
                category_option_values.push(category_option_value);
            });
            var origin_field = case_record.getField('origin');
            var origin_options = origin_field.getSelectOptions();
            var origin_option_values = [];
            _(origin_options).each(function (origin_option) {
                var origin_option_value = {
                    id: origin_option.id,
                    text: origin_option.text
                };
                origin_option_values.push(origin_option_value);
            });
            var status_field = case_record.getField('status');
            var status_options = status_field.getSelectOptions();
            var status_option_values = [];
            _(status_options).each(function (status_option) {
                var status_option_value = {
                    id: status_option.id,
                    text: status_option.text
                };
                status_option_values.push(status_option_value);
            });
            var priority_field = case_record.getField('priority');
            var priority_options = priority_field.getSelectOptions();
            var priority_option_values = [];
            _(priority_options).each(function (priority_option) {
                var priority_option_value = {
                    id: priority_option.id,
                    text: priority_option.text
                };
                priority_option_values.push(priority_option_value);
            });
            var newRecord = {
                categories: category_option_values,
                origins: origin_option_values,
                statuses: status_option_values,
                priorities: priority_option_values
            };
            return newRecord;
        },
        getColumnsArray: function () {
            return [
                new nlobjSearchColumn('internalid'),
                new nlobjSearchColumn('casenumber'),
                new nlobjSearchColumn('title'),
                new nlobjSearchColumn('status'),
                new nlobjSearchColumn('origin'),
                new nlobjSearchColumn('category'),
                new nlobjSearchColumn('company'),
                new nlobjSearchColumn('createddate'),
                new nlobjSearchColumn('lastmessagedate'),
                new nlobjSearchColumn('priority'),
                new nlobjSearchColumn('email')
            ];
        },
        get: function (id) {
            var filters = [
                    new nlobjSearchFilter('internalid', null, 'is', id),
                    new nlobjSearchFilter('isinactive', null, 'is', 'F')
                ], columns = this.getColumnsArray(), result = this.searchHelper(filters, columns, 1, true);
            if (result.records.length >= 1) {
                return result.records[0];
            } else {
                throw notFoundError;
            }
        },
        search: function (customer_id, list_header_data) {
            var filters = [new nlobjSearchFilter('isinactive', null, 'is', 'F')], columns = this.getColumnsArray(), selected_filter = parseInt(list_header_data.filter, 10);
            if (!_.isNaN(selected_filter)) {
                filters.push(new nlobjSearchFilter('status', null, 'anyof', selected_filter));
            }
            this.setSortOrder(list_header_data.sort, list_header_data.order, columns);
            return this.searchHelper(filters, columns, list_header_data.page, false);
        },
        searchHelper: function (filters, columns, page, join_messages) {
            var self = this, result = Application.getPaginatedSearchResults({
                    record_type: 'supportcase',
                    filters: filters,
                    columns: columns,
                    page: page
                });
            result.records = _.map(result.records, function (case_record) {
                var current_record_id = case_record.getId(), created_date = nlapiStringToDate(case_record.getValue('createddate')), last_message_date = nlapiStringToDate(case_record.getValue('lastmessagedate')), support_case = {
                        internalid: current_record_id,
                        caseNumber: case_record.getValue('casenumber'),
                        title: case_record.getValue('title'),
                        grouped_messages: [],
                        status: {
                            id: case_record.getValue('status'),
                            name: case_record.getText('status')
                        },
                        origin: {
                            id: case_record.getValue('origin'),
                            name: case_record.getText('origin')
                        },
                        category: {
                            id: case_record.getValue('category'),
                            name: case_record.getText('category')
                        },
                        company: {
                            id: case_record.getValue('company'),
                            name: case_record.getText('company')
                        },
                        priority: {
                            id: case_record.getValue('priority'),
                            name: case_record.getText('priority')
                        },
                        createdDate: nlapiDateToString(created_date ? created_date : self.dummy_date, 'date'),
                        lastMessageDate: nlapiDateToString(last_message_date ? last_message_date : self.dummy_date, 'date'),
                        email: case_record.getValue('email')
                    };
                if (join_messages) {
                    self.appendMessagesToCase(support_case);
                }
                return support_case;
            });
            return result;
        },
        stripHtmlFromMessage: function (message) {
            return message.replace(/<br\s*[\/]?>/gi, '\n').replace(/<(?:.|\n)*?>/gm, '');
        },
        appendMessagesToCase: function (support_case) {
            var message_columns = {
                    message_col: new nlobjSearchColumn('message', 'messages'),
                    message_date_col: new nlobjSearchColumn('messagedate', 'messages').setSort(true),
                    author_col: new nlobjSearchColumn('author', 'messages'),
                    message_id: new nlobjSearchColumn('internalid', 'messages')
                }, message_filters = [
                    new nlobjSearchFilter('internalid', null, 'is', support_case.internalid),
                    new nlobjSearchFilter('internalonly', 'messages', 'is', 'F')
                ], message_records = Application.getAllSearchResults('supportcase', message_filters, _.values(message_columns)), grouped_messages = [], messages_count = 0, self = this;
            _(message_records).each(function (message_record) {
                var customer_id = nlapiGetUser() + '', message_date_tmp = nlapiStringToDate(message_record.getValue('messagedate', 'messages')), message_date = message_date_tmp ? message_date_tmp : self.dummy_date, message_date_to_group_by = message_date.getFullYear() + '-' + (message_date.getMonth() + 1) + '-' + message_date.getDate(), message = {
                        author: message_record.getValue('author', 'messages') === customer_id ? 'You' : message_record.getText('author', 'messages'),
                        text: self.stripHtmlFromMessage(message_record.getValue('message', 'messages')),
                        messageDate: nlapiDateToString(message_date, 'timeofday'),
                        internalid: message_record.getValue('internalid', 'messages'),
                        initialMessage: false
                    };
                if (grouped_messages[message_date_to_group_by]) {
                    grouped_messages[message_date_to_group_by].messages.push(message);
                } else {
                    grouped_messages[message_date_to_group_by] = {
                        date: self.getMessageDate(message_date),
                        messages: [message]
                    };
                }
                messages_count++;
                if (messages_count === message_records.length) {
                    message.initialMessage = true;
                }
            });
            support_case.grouped_messages = _(grouped_messages).values();
            support_case.messages_count = messages_count;
        },
        getMessageDate: function (validJsDate) {
            var today = new Date(), today_dd = today.getDate(), today_mm = today.getMonth(), today_yyyy = today.getFullYear(), dd = validJsDate.getDate(), mm = validJsDate.getMonth(), yyyy = validJsDate.getFullYear();
            if (today_dd === dd && today_mm === mm && today_yyyy === yyyy) {
                return 'Today';
            }
            return nlapiDateToString(validJsDate, 'date');
        },
        create: function (customerId, data) {
            customerId = customerId || nlapiGetUser() + '';
            var newCaseRecord = nlapiCreateRecord('supportcase');
            data.title && newCaseRecord.setFieldValue('title', Utils.sanitizeString(data.title));
            data.message && newCaseRecord.setFieldValue('incomingmessage', Utils.sanitizeString(data.message));
            data.category && newCaseRecord.setFieldValue('category', data.category);
            data.email && newCaseRecord.setFieldValue('email', data.email);
            customerId && newCaseRecord.setFieldValue('company', customerId);
            var default_values = this.configuration.defaultValues;
            newCaseRecord.setFieldValue('status', default_values.statusStart.id);
            newCaseRecord.setFieldValue('origin', default_values.origin.id);
            return nlapiSubmitRecord(newCaseRecord);
        },
        setSortOrder: function (sort, order, columns) {
            switch (sort) {
            case 'createdDate':
                columns[7].setSort(order > 0);
                break;
            case 'lastMessageDate':
                columns[8].setSort(order > 0);
                break;
            default:
                columns[1].setSort(order > 0);
            }
        },
        update: function (id, data) {
            if (data && data.status) {
                if (data.reply && data.reply.length > 0) {
                    nlapiSubmitField('supportcase', id, [
                        'incomingmessage',
                        'messagenew',
                        'status'
                    ], [
                        Utils.sanitizeString(data.reply),
                        'T',
                        data.status.id
                    ]);
                } else {
                    nlapiSubmitField('supportcase', id, ['status'], data.status.id);
                }
            }
        }
    });
});
define('Case.Fields.ServiceController', [
    'ServiceController',
    'Case.Model'
], function (ServiceController, CaseModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Case.Fields.ServiceController',
        options: {
            common: {
                requireLogin: true,
                requirePermissions: { list: ['lists.listCase.1'] }
            }
        },
        get: function () {
            return CaseModel.getNew();
        }
    });
});
define('Case.ServiceController', [
    'ServiceController',
    'Case.Model'
], function (ServiceController, CaseModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Case.ServiceController',
        options: {
            common: {
                requireLogin: true,
                requirePermissions: { list: ['lists.listCase.1'] }
            }
        },
        get: function () {
            var id = this.request.getParameter('internalid') || this.data.internalid;
            if (id) {
                return CaseModel.get(id);
            } else {
                var list_header_data = {
                    filter: this.request.getParameter('filter'),
                    order: this.request.getParameter('order'),
                    sort: this.request.getParameter('sort'),
                    from: this.request.getParameter('from'),
                    to: this.request.getParameter('to'),
                    page: this.request.getParameter('page')
                };
                return CaseModel.search(nlapiGetUser() + '', list_header_data);
            }
        },
        post: function () {
            var new_case_id = CaseModel.create(nlapiGetUser() + '', this.data);
            return CaseModel.get(new_case_id);
        },
        put: function () {
            var id = this.request.getParameter('internalid') || this.data.internalid;
            CaseModel.update(id, this.data);
            return CaseModel.get(id);
        }
    });
});
define('Categories.Model', [
    'SC.Model',
    'SC.Models.Init',
    'Application',
    'Configuration',
    'underscore'
], function (SCModel, ModelsInit, Application, Configuration, _) {
    'use strict';
    return SCModel.extend({
        name: 'Category',
        categoryColumns: {
            boolean: [
                'displayinsite',
                'isinactive',
                'isprimaryurl'
            ],
            sideMenu: {
                'sortBy': 'sequencenumber',
                'fields': [
                    'name',
                    'internalid',
                    'sequencenumber',
                    'urlfragment',
                    'displayinsite'
                ]
            },
            subCategories: {
                'sortBy': 'sequencenumber',
                'fields': [
                    'name',
                    'description',
                    'internalid',
                    'sequencenumber',
                    'urlfragment',
                    'thumbnailurl',
                    'displayinsite'
                ]
            },
            category: {
                'fields': [
                    'internalid',
                    'name',
                    'description',
                    'pagetitle',
                    'pageheading',
                    'pagebannerurl',
                    'addtohead',
                    'metakeywords',
                    'metadescription',
                    'displayinsite',
                    'urlfragment',
                    'idpath',
                    'fullurl',
                    'isprimaryurl'
                ]
            },
            breadcrumb: {
                'fields': [
                    'internalid',
                    'name',
                    'displayinsite'
                ]
            },
            menu: {
                'sortBy': 'sequencenumber',
                'fields': [
                    'internalid',
                    'name',
                    'sequencenumber',
                    'displayinsite'
                ]
            },
            mapping: {
                'internalid': 'subcatid',
                'name': 'subcatnameoverride',
                'description': 'subcatdescoverride',
                'pagetitle': 'subcatpagetitleoverride',
                'pageheading': 'subcatpageheadingoverride',
                'pagebannerurl': 'subcatpagebannerurloverride',
                'addtohead': 'subcataddtoheadoverride',
                'metakeywords': 'subcatmetakeywordsoverride',
                'metadescription': 'subcatmetadescoverride',
                'displayinsite': 'subcatdisplayinsiteoverride',
                'sequencenumber': 'subcatsequencenumber',
                'thumbnailurl': 'subcatthumbnailurloverride',
                'urlfragment': 'subcaturlfragmentoverride'
            }
        },
        getColumns: function (element) {
            var config = Configuration.categories;
            return _.union(this.categoryColumns[element].fields, config[element].fields);
        },
        getSortBy: function (element) {
            var config = Configuration.categories;
            return config[element].sortBy || this.categoryColumns[element].sortBy;
        },
        get: function (fullurl) {
            var cmsRequestT0 = new Date().getTime();
            var self = this;
            var category = {
                parenturl: fullurl.substring(0, fullurl.lastIndexOf('/')),
                urlfragment: fullurl.substring(fullurl.lastIndexOf('/') + 1)
            };
            if (category.parenturl) {
                category.siblings = this.getCategories(category.parenturl, null, this.getColumns('sideMenu'));
                _.each(category.siblings, function (sibling) {
                    if (sibling.urlfragment === category.urlfragment) {
                        category.internalid = sibling.internalid;
                    }
                    self.fixBooleans(sibling);
                });
                this.sortBy(category.siblings, this.getSortBy('sideMenu'));
            }
            if (category.internalid || !category.internalid && !category.parenturl) {
                var categories = this.getCategories(category.parenturl, {
                    'internalid': category.internalid,
                    'fullurl': fullurl
                }, this.getColumns('category'));
                if (categories.length) {
                    _.extend(category, categories[0]);
                } else {
                    throw notFoundError;
                }
            } else {
                throw notFoundError;
            }
            category.categories = this.getCategories(fullurl, null, this.getColumns('subCategories'));
            _.each(category.categories, function (subcategory) {
                self.fixBooleans(subcategory);
            });
            this.sortBy(category.categories, this.getSortBy('subCategories'));
            category.breadcrumb = this.getBreadcrumb(category.idpath);
            this.fixBooleans(category);
            var bread = { 'fullurl': category.fullurl };
            _.each(this.getColumns('breadcrumb'), function (column) {
                bread[column] = category[column];
            });
            category.breadcrumb.push(bread);
            category._debug_requestTime = new Date().getTime() - cmsRequestT0;
            return category;
        },
        getCategories: function (parenturl, categoryIds, columns) {
            var categories = [];
            var categoriesData;
            if (parenturl) {
                var categoriesOverride = this.getCategoriesOverride(parenturl, categoryIds ? categoryIds.internalid : null, columns);
                var i = categoriesOverride.length;
                if (i) {
                    var categoryids = categoryIds ? categoryIds : _.pluck(categoriesOverride, 'internalid');
                    categoriesData = this.getCategoriesData(parenturl, categoryids, columns);
                    var processColumn = function (column) {
                        category[column] = category[column] || categoryData[column];
                    };
                    while (i--) {
                        var categoryData = categoriesData[categoriesOverride[i].internalid];
                        if (categoryData) {
                            var category = categoriesOverride[i];
                            _.each(columns, processColumn);
                            category.fullurl = parenturl + '/' + category.urlfragment;
                            category.canonical = categoryData.canonical;
                            if (category.displayinsite === 'T') {
                                categories.push(category);
                            }
                        }
                    }
                }
            } else {
                categoriesData = _.values(this.getCategoriesData(parenturl, categoryIds, columns));
                _.each(categoriesData, function (category) {
                    if (category.displayinsite === 'T') {
                        category.fullurl = '/' + category.urlfragment;
                        categories.push(category);
                    }
                });
            }
            return categories;
        },
        getCategoriesOverride: function (parenturl, categoryid, columns) {
            var overrides = [], siteId = ModelsInit.session.getSiteSettings(['siteid']).siteid, searchFilters = [
                    new nlobjSearchFilter('fullurl', null, 'is', parenturl),
                    new nlobjSearchFilter('site', null, 'is', siteId)
                ], searchColumns = [], toSubCategory = this.categoryColumns.mapping;
            if (categoryid) {
                searchFilters.push(new nlobjSearchFilter('subcatid', null, 'is', categoryid));
            }
            _.each(columns, function (column) {
                toSubCategory[column] && searchColumns.push(new nlobjSearchColumn(toSubCategory[column]));
            });
            var result = Application.getAllSearchResults('commercecategory', searchFilters, searchColumns);
            _.each(result, function (line) {
                if (line.getValue(toSubCategory.internalid)) {
                    var override = {};
                    _.each(columns, function (column) {
                        override[column] = line.getValue(toSubCategory[column]);
                    });
                    overrides.push(override);
                }
            });
            return overrides;
        },
        getCategoriesData: function (parenturl, categoryIds, columns) {
            var categories = {}, siteId = ModelsInit.session.getSiteSettings(['siteid']).siteid, searchFilters = [
                    new nlobjSearchFilter('isinactive', null, 'is', 'F'),
                    new nlobjSearchFilter('site', null, 'is', siteId)
                ], searchColumns = [];
            if (_.isArray(categoryIds)) {
                searchFilters.push(new nlobjSearchFilter('internalid', null, 'anyof', categoryIds));
                searchFilters.push(new nlobjSearchFilter('isprimaryurl', null, 'is', 'T'));
            } else {
                var fullurlFilter = new nlobjSearchFilter('fullurl', null, 'is', categoryIds.fullurl);
                searchFilters.push(fullurlFilter);
                if (categoryIds.internalid) {
                    fullurlFilter.setLeftParens(1).setOr(true);
                    searchFilters.push(new nlobjSearchFilter('isprimaryurl', null, 'is', 'T').setLeftParens(1));
                    searchFilters.push(new nlobjSearchFilter('internalid', null, 'is', categoryIds.internalid).setRightParens(2));
                }
            }
            _.each(columns, function (column) {
                searchColumns.push(new nlobjSearchColumn(column));
            });
            var result = Application.getAllSearchResults('commercecategory', searchFilters, searchColumns);
            _.each(result, function (line) {
                var category = {};
                _.each(columns, function (column) {
                    category[column] = line.getValue(column);
                });
                var cat = categories[line.getValue('internalid')];
                if (cat) {
                    if (cat.isprimaryurl) {
                        cat.idpath = category.idpath;
                        cat.canonical = cat.fullurl;
                    } else {
                        cat.canonical = category.fullurl;
                    }
                } else {
                    categories[line.getValue('internalid')] = category;
                }
            });
            return categories;
        },
        fixBooleans: function (catObject) {
            _.each(this.categoryColumns.boolean, function (column) {
                if (catObject[column]) {
                    catObject[column] = catObject[column] ? catObject[column] === 'T' ? true : false : '';
                }
            });
        },
        getBreadcrumb: function (idpath) {
            var self = this, ids = idpath.split('|'), breadcrumb = [], siteId = ModelsInit.session.getSiteSettings(['siteid']).siteid, filters = [new nlobjSearchFilter('site', null, 'is', siteId)], searchColumns = [
                    new nlobjSearchColumn('isinactive'),
                    new nlobjSearchColumn('fullurl'),
                    new nlobjSearchColumn('idpath').setSort(false)
                ], columns = this.getColumns('breadcrumb'), toSubCategory = this.categoryColumns.mapping;
            _.each(columns, function (column) {
                searchColumns.push(new nlobjSearchColumn(column));
                toSubCategory[column] && searchColumns.push(new nlobjSearchColumn(toSubCategory[column]));
            });
            ids.splice(ids.length - 1, 1);
            for (var i = 1; i < ids.length - 1; i++) {
                var current = new nlobjSearchFilter('internalid', null, 'is', ids[i]);
                if (i === 1) {
                    current.setLeftParens(2);
                } else {
                    current.setLeftParens(1);
                }
                var currentChildren = new nlobjSearchFilter('subcatid', null, 'is', ids[i + 1]);
                if (i === ids.length - 2) {
                    currentChildren.setRightParens(2);
                } else {
                    currentChildren.setRightParens(1).setOr(true);
                }
                filters.push(current);
                filters.push(new nlobjSearchFilter('idpath', null, 'is', ids.slice(0, i + 1).join('|') + '|'));
                filters.push(currentChildren);
            }
            if (filters.length > 1) {
                var result = Application.getAllSearchResults('commercecategory', filters, searchColumns);
                var category = {};
                _.each(result, function (crumb, index) {
                    if (crumb.getValue('isinactive') === 'T') {
                        throw notFoundError;
                    }
                    _.each(columns, function (column) {
                        category[column] = category[column] || crumb.getValue(column);
                    });
                    if (category.displayinsite === 'F') {
                        throw notFoundError;
                    }
                    category.fullurl = crumb.getValue('fullurl');
                    breadcrumb.push(category);
                    if (index !== result.length - 1) {
                        category = {};
                        _.each(columns, function (column) {
                            category[column] = crumb.getValue(toSubCategory[column]);
                        });
                    }
                });
            }
            _.each(breadcrumb, function (category) {
                self.fixBooleans(category);
            });
            return breadcrumb;
        },
        getCategoryTree: function (level) {
            var cmsRequestT0 = new Date().getTime();
            var self = this, result = [], siteId = ModelsInit.session.getSiteSettings(['siteid']).siteid, filters = [
                    new nlobjSearchFilter('nestlevel', null, 'lessthanorequalto', level),
                    new nlobjSearchFilter('isinactive', null, 'is', 'F'),
                    new nlobjSearchFilter('site', null, 'is', siteId)
                ], searchColumns = [
                    new nlobjSearchColumn('fullurl'),
                    new nlobjSearchColumn('nestlevel'),
                    new nlobjSearchColumn('idpath').setSort(false)
                ], bag = {}, overrides = {}, columns = this.getColumns('menu'), toSubCategory = this.categoryColumns.mapping;
            _.each(columns, function (column) {
                searchColumns.push(new nlobjSearchColumn(column));
                toSubCategory[column] && searchColumns.push(new nlobjSearchColumn(toSubCategory[column]));
            });
            Application.getAllSearchResults('commercecategory', filters, searchColumns).forEach(function (line) {
                var idPath = line.getValue('idpath');
                if (!bag[idPath]) {
                    var current = { categories: [] }, override = overrides[idPath];
                    _.each(columns, function (column) {
                        current[column] = override && override[column] || line.getValue(column);
                    });
                    self.fixBooleans(current);
                    current.fullurl = line.getValue('fullurl');
                    current.level = line.getValue('nestlevel');
                    var parentIdPathArr = idPath.split('|');
                    if (parentIdPathArr.length > 3) {
                        parentIdPathArr.splice(parentIdPathArr.length - 2, 1);
                    } else {
                        parentIdPathArr = [];
                    }
                    current.parentIdPath = parentIdPathArr.join('|');
                    if (current.displayinsite) {
                        if (!current.parentIdPath) {
                            result.push(current);
                        } else {
                            bag[current.parentIdPath] && bag[current.parentIdPath].categories.push(current);
                        }
                        bag[idPath] = current;
                    }
                }
                var childId = line.getValue('subcatid');
                if (childId) {
                    var childIdPath = idPath + childId + '|';
                    var child = {};
                    _.each(columns, function (column) {
                        child[column] = line.getValue(toSubCategory[column]);
                    });
                    overrides[childIdPath] = child;
                }
            });
            this.sortBy(result, this.getSortBy('menu'));
            if (result.length) {
                result[0]._debug_requestTime = new Date().getTime() - cmsRequestT0;
            }
            return result;
        },
        sortBy: function (categories, property) {
            if (categories) {
                var self = this;
                property = property || 'sequencenumber';
                _.each(categories, function (category) {
                    self.sortBy(category.categories, property);
                });
                categories.sort(function (a, b) {
                    var numberA = Number(a[property]), numberB = Number(b[property]);
                    if (!isNaN(numberA) && !isNaN(numberB)) {
                        return numberA - numberB;
                    } else {
                        return (a[property] + '').localeCompare(b[property] + '', {}, { numeric: true });
                    }
                });
            }
        }
    });
});
define('Categories.ServiceController', [
    'ServiceController',
    'Categories.Model'
], function (ServiceController, CategoriesModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Categories.ServiceController',
        options: { common: { requireLoggedInPPS: true } },
        get: function () {
            var fullurl = this.request.getParameter('fullurl');
            if (fullurl) {
                return CategoriesModel.get(fullurl);
            } else {
                var menuLevel = this.request.getParameter('menuLevel');
                if (menuLevel) {
                    return CategoriesModel.getCategoryTree(menuLevel);
                }
            }
        }
    });
});
define('CreditCard.ServiceController', [
    'ServiceController',
    'CreditCard.Model'
], function (ServiceController, CreditCardModel) {
    'use strict';
    return ServiceController.extend({
        name: 'CreditCard.ServiceController',
        options: { common: { requireLogin: true } },
        get: function () {
            var id = this.request.getParameter('internalid');
            return id ? CreditCardModel.get(id) : CreditCardModel.list() || [];
        },
        post: function () {
            var id = CreditCardModel.create(this.data);
            this.sendContent(CreditCardModel.get(id), { 'status': 201 });
        },
        put: function () {
            var id = this.request.getParameter('internalid');
            CreditCardModel.update(id, this.data);
            return CreditCardModel.get(id);
        },
        delete: function () {
            var id = this.request.getParameter('internalid');
            CreditCardModel.remove(id);
            return { 'status': 'ok' };
        }
    });
});
define('LiveOrder.GiftCertificate.ServiceController', [
    'ServiceController',
    'LiveOrder.Model'
], function (ServiceController, LiveOrderModel) {
    'use strict';
    return ServiceController.extend({
        name: 'LiveOrder.GiftCertificate.ServiceController',
        post: function () {
            LiveOrderModel.setGiftCertificates(this.data.giftcertificates);
            return LiveOrderModel.get() || {};
        }
    });
});
define('LiveOrder.Line.ServiceController', [
    'ServiceController',
    'SC.Models.Init',
    'LiveOrder.Model',
    'underscore'
], function (ServiceController, ModelsInit, LiveOrderModel, _) {
    'use strict';
    return ServiceController.extend({
        name: 'LiveOrder.Line.ServiceController',
        options: { common: { checkLoggedInCheckout: true } },
        post: function () {
            LiveOrderModel.addLines(_.isArray(this.data) ? this.data : [this.data]);
            return LiveOrderModel.get() || {};
        },
        put: function () {
            var id = this.request.getParameter('internalid');
            if (this.data.options && this.data.options.void) {
                LiveOrderModel.voidLine(id);
            } else if (this.data.options && this.data.options['return']) {
                LiveOrderModel.returnLine(id);
            } else {
                LiveOrderModel.updateLine(id, this.data);
            }
            return LiveOrderModel.get() || {};
        },
        delete: function () {
            var id = this.request.getParameter('internalid');
            LiveOrderModel.removeLine(id);
            return LiveOrderModel.get() || {};
        }
    });
});
define('LiveOrder.ServiceController', [
    'ServiceController',
    'LiveOrder.Model',
    'SiteSettings.Model'
], function (ServiceController, LiveOrderModel, SiteSettings) {
    'use strict';
    return ServiceController.extend({
        name: 'LiveOrder.ServiceController',
        options: {
            put: { checkLoggedInCheckout: true },
            post: { checkLoggedInCheckout: true }
        },
        get: function () {
            return LiveOrderModel.get();
        },
        post: function () {
            LiveOrderModel.update(this.data);
            var confirmation = LiveOrderModel.submit(), order_info = LiveOrderModel.get();
            order_info.confirmation = confirmation;
            order_info.touchpoints = SiteSettings.getTouchPoints();
            return order_info;
        },
        put: function () {
            LiveOrderModel.update(this.data);
            return LiveOrderModel.get();
        }
    });
});
define('Transaction.Model', [
    'SC.Model',
    'SC.Models.Init',
    'Application',
    'Utils',
    'underscore',
    'CustomFields.Utils'
], function (SCModel, ModelsInit, Application, Utils, _, CustomFieldsUtils) {
    'use strict';
    var StoreItem, AddressModel;
    try {
        StoreItem = require('StoreItem.Model');
    } catch (e) {
    }
    try {
        AddressModel = require('Address.Model');
    } catch (e) {
    }
    return SCModel.extend({
        name: 'Transaction',
        storeItem: StoreItem,
        isMultiCurrency: ModelsInit.context.getFeature('MULTICURRENCY'),
        isMultiSite: ModelsInit.context.getFeature('MULTISITE'),
        now: new Date().getTime(),
        list: function (data) {
            this.preList();
            var self = this;
            this.data = data;
            this.amountField = this.isMultiCurrency ? 'fxamount' : 'amount';
            this.filters = {
                'entity': [
                    'entity',
                    'is',
                    nlapiGetUser()
                ],
                'mainline_operator': 'and',
                'mainline': [
                    'mainline',
                    'is',
                    'T'
                ]
            };
            this.columns = {
                'trandate': new nlobjSearchColumn('trandate'),
                'internalid': new nlobjSearchColumn('internalid'),
                'tranid': new nlobjSearchColumn('tranid'),
                'status': new nlobjSearchColumn('status'),
                'amount': new nlobjSearchColumn(this.amountField)
            };
            if (this.isMultiCurrency) {
                this.columns.currency = new nlobjSearchColumn('currency');
            }
            if (this.data.from && this.data.to) {
                this.filters.date_operator = 'and';
                this.data.from = this.data.from.split('-');
                this.data.to = this.data.to.split('-');
                this.filters.date = [
                    'trandate',
                    'within',
                    new Date(this.data.from[0], this.data.from[1] - 1, this.data.from[2]),
                    new Date(this.data.to[0], this.data.to[1] - 1, this.data.to[2])
                ];
            } else if (this.data.from) {
                this.filters.date_from_operator = 'and';
                this.data.from = this.data.from.split('-');
                this.filters.date_from = [
                    'trandate',
                    'onOrAfter',
                    new Date(this.data.from[0], this.data.from[1] - 1, this.data.from[2])
                ];
            } else if (this.data.to) {
                this.filters.date_to_operator = 'and';
                this.data.to = this.data.to.split('-');
                this.filters.date_to = [
                    'trandate',
                    'onOrBefore',
                    new Date(this.data.to[0], this.data.to[1] - 1, this.data.to[2])
                ];
            }
            if (this.data.internalid) {
                this.data.internalid = _.isArray(this.data.internalid) ? this.data.internalid : this.data.internalid.split(',');
                this.filters.internalid_operator = 'and';
                this.filters.internalid = [
                    'internalid',
                    'anyof',
                    this.data.internalid
                ];
            }
            if (this.data.createdfrom) {
                this.filters.createdfrom_operator = 'and';
                this.filters.createdfrom = [
                    'createdfrom',
                    'is',
                    this.data.createdfrom
                ];
            }
            if (this.data.types) {
                this.filters.types_operator = 'and';
                this.filters.types = [
                    'type',
                    'anyof',
                    this.data.types.split(',')
                ];
            }
            if (this.isMultiSite) {
                var site_id = ModelsInit.session.getSiteSettings(['siteid']).siteid, filter_site = SC.Configuration.filterSite || SC.Configuration.filter_site, search_filter_array = null;
                if (_.isString(filter_site) && filter_site === 'current') {
                    search_filter_array = [
                        site_id,
                        '@NONE@'
                    ];
                } else if (_.isString(filter_site) && filter_site === 'all') {
                    search_filter_array = [];
                } else if (_.isArray(filter_site)) {
                    search_filter_array = filter_site;
                    search_filter_array.push('@NONE@');
                } else if (_.isObject(filter_site) && filter_site.option) {
                    switch (filter_site.option) {
                    case 'all':
                        search_filter_array = [];
                        break;
                    case 'siteIds':
                        search_filter_array = filter_site.ids;
                        break;
                    default:
                        search_filter_array = [
                            site_id,
                            '@NONE@'
                        ];
                        break;
                    }
                }
                if (search_filter_array && search_filter_array.length) {
                    this.filters.site_operator = 'and';
                    this.filters.site = [
                        'website',
                        'anyof',
                        _.uniq(search_filter_array)
                    ];
                }
            }
            this.setExtraListFilters();
            this.setExtraListColumns();
            if (this.data.sort) {
                _.each(this.data.sort.split(','), function (column_name) {
                    if (self.columns[column_name]) {
                        self.columns[column_name].setSort(self.data.order >= 0);
                    }
                });
            }
            if (this.data.page === 'all') {
                this.search_results = Application.getAllSearchResults('transaction', _.values(this.filters), _.values(this.columns));
            } else {
                this.search_results = Application.getPaginatedSearchResults({
                    record_type: 'transaction',
                    filters: _.values(this.filters),
                    columns: _.values(this.columns),
                    page: this.data.page || 1,
                    results_per_page: this.data.results_per_page
                });
            }
            var records = _.map((this.data.page === 'all' ? this.search_results : this.search_results.records) || [], function (record) {
                var result = {
                    recordtype: record.getRecordType(),
                    internalid: record.getValue('internalid'),
                    tranid: record.getValue('tranid'),
                    trandate: record.getValue('trandate'),
                    status: {
                        internalid: record.getValue('status'),
                        name: record.getText('status')
                    },
                    amount: Utils.toCurrency(record.getValue(self.amountField)),
                    amount_formatted: Utils.formatCurrency(record.getValue(self.amountField)),
                    currency: self.isMultiCurrency ? {
                        internalid: record.getValue('currency'),
                        name: record.getText('currency')
                    } : null
                };
                return self.mapListResult(result, record);
            });
            if (this.data.page === 'all') {
                this.results = records;
            } else {
                this.results = this.search_results;
                this.results.records = records;
            }
            this.postList();
            return this.results;
        },
        setExtraListColumns: function () {
        },
        setExtraListFilters: function () {
        },
        mapListResult: function (result) {
            return result;
        },
        getTransactionRecord: function (record_type, id) {
            if (this.record) {
                return this.record;
            }
            return nlapiLoadRecord(record_type, id);
        },
        get: function (record_type, id) {
            this.preGet();
            this.recordId = id;
            this.recordType = record_type;
            this.result = {};
            if (record_type && id) {
                this.record = this.getTransactionRecord(record_type, id);
                this.getRecordFields();
                this.getRecordSummary();
                this.getRecordPromocodes();
                this.getRecordPaymentMethod();
                this.getPurchaseOrderNumber();
                this.getRecordAddresses();
                this.getRecordShippingMethods();
                this.getLines();
                this.getExtraRecordFields();
                this.getTransactionBodyCustomFields();
            }
            this.postGet();
            this.result.addresses = _.values(this.result.addresses || {});
            this.result.shipmethods = _.values(this.result.shipmethods || {});
            this.result.lines = _.values(this.result.lines || {});
            return this.result;
        },
        getRecordFields: function () {
            this.result.internalid = this.recordId;
            this.result.recordtype = this.recordType;
            this.result.tranid = this.record.getFieldValue('tranid');
            this.result.memo = this.record.getFieldValue('memo');
            this.result.trandate = this.record.getFieldValue('trandate');
            if (this.isMultiCurrency) {
                this.result.currency = {
                    internalid: this.record.getFieldValue('currency'),
                    name: this.record.getFieldValue('currencyname')
                };
            }
            this.getCreatedFrom();
            this.getStatus();
        },
        getCreatedFrom: function () {
            var created_from_internalid = this.record.getFieldValue('createdfrom'), record_type = '';
            if (created_from_internalid) {
                record_type = Utils.getTransactionType(created_from_internalid);
            }
            this.result.createdfrom = {
                internalid: created_from_internalid,
                name: this.record.getFieldText('createdfrom'),
                recordtype: record_type || ''
            };
        },
        getStatus: function () {
            this.result.status = {
                internalid: this.record.getFieldValue('status'),
                name: this.record.getFieldText('status')
            };
        },
        getExtraRecordFields: function () {
        },
        setTransactionBodyCustomFields: function () {
            var self = this;
            var customFieldsId = CustomFieldsUtils.getCustomFieldsIdToBeExposed(this.recordType);
            _.each(this.data.options, function (value, id) {
                if (_.find(customFieldsId, function (configFieldId) {
                        return id === configFieldId;
                    })) {
                    self.record.setFieldValue(id, value);
                }
            });
        },
        getTransactionBodyCustomFields: function () {
            var options = {};
            var self = this;
            var customFieldsId = CustomFieldsUtils.getCustomFieldsIdToBeExposed(this.recordType);
            _.each(customFieldsId, function (id) {
                options[id] = self.record.getFieldValue(id);
            });
            this.result.options = options;
        },
        getRecordPromocodes: function () {
            this.result.promocodes = [];
            var promocode = this.record.getFieldValue('promocode');
            if (promocode) {
                this.result.promocodes.push({
                    internalid: promocode,
                    code: this.record.getFieldText('couponcode'),
                    isvalid: true,
                    discountrate_formatted: ''
                });
            }
            for (var i = 1; i <= this.record.getLineItemCount('promotions'); i++) {
                if (this.record.getLineItemValue('promotions', 'applicabilitystatus', i) !== 'NOT_APPLIED') {
                    this.result.promocodes.push({
                        internalid: this.record.getLineItemValue('promotions', 'couponcode', i),
                        code: this.record.getLineItemValue('promotions', 'couponcode_display', i),
                        isvalid: this.record.getLineItemValue('promotions', 'promotionisvalid', i) === 'T',
                        discountrate_formatted: ''
                    });
                }
            }
        },
        getTerms: function () {
            if (this.record.getFieldValue('terms')) {
                return {
                    internalid: this.record.getFieldValue('terms'),
                    name: this.record.getFieldText('terms')
                };
            }
            return null;
        },
        getPurchaseOrderNumber: function () {
            this.result.purchasenumber = this.record.getFieldValue('otherrefnum');
        },
        getRecordPaymentMethod: function () {
            var paymentmethod = {
                    type: this.record.getFieldValue('paymethtype'),
                    primary: true,
                    name: this.record.getFieldText('paymentmethod')
                }, terms = this.getTerms(), ccnumber = this.record.getFieldValue('ccnumber');
            if (ccnumber) {
                paymentmethod.type = 'creditcard';
                paymentmethod.creditcard = {
                    ccnumber: ccnumber,
                    ccexpiredate: this.record.getFieldValue('ccexpiredate'),
                    ccname: this.record.getFieldValue('ccname'),
                    internalid: this.record.getFieldValue('creditcard'),
                    paymentmethod: {
                        ispaypal: 'F',
                        name: this.record.getFieldText('paymentmethod'),
                        creditcard: 'T',
                        internalid: this.record.getFieldValue('paymentmethod')
                    }
                };
            }
            if (terms) {
                paymentmethod.type = 'invoice';
                paymentmethod.paymentterms = terms;
            }
            if (paymentmethod.type) {
                this.result.paymentmethods = [paymentmethod];
            } else {
                this.result.paymentmethods = [];
            }
        },
        getRecordSummary: function () {
            this.result.summary = {
                subtotal: Utils.toCurrency(this.record.getFieldValue('subtotal')),
                subtotal_formatted: Utils.formatCurrency(this.record.getFieldValue('subtotal')),
                taxtotal: Utils.toCurrency(this.record.getFieldValue('taxtotal')),
                taxtotal_formatted: Utils.formatCurrency(this.record.getFieldValue('taxtotal')),
                tax2total: Utils.toCurrency(this.record.getFieldValue('tax2total')),
                tax2total_formatted: Utils.formatCurrency(this.record.getFieldValue('tax2total')),
                shippingcost: Utils.toCurrency(this.record.getFieldValue('shippingcost')),
                shippingcost_formatted: Utils.formatCurrency(this.record.getFieldValue('shippingcost')),
                handlingcost: Utils.toCurrency(this.record.getFieldValue('althandlingcost')),
                handlingcost_formatted: Utils.formatCurrency(this.record.getFieldValue('althandlingcost')),
                estimatedshipping: 0,
                estimatedshipping_formatted: Utils.formatCurrency(0),
                taxonshipping: Utils.toCurrency(0),
                taxonshipping_formatted: Utils.formatCurrency(0),
                discounttotal: Utils.toCurrency(this.record.getFieldValue('discounttotal')),
                discounttotal_formatted: Utils.formatCurrency(this.record.getFieldValue('discounttotal')),
                taxondiscount: Utils.toCurrency(0),
                taxondiscount_formatted: Utils.formatCurrency(0),
                discountrate: Utils.toCurrency(this.record.getFieldValue('discountrate')),
                discountrate_formatted: Utils.formatCurrency(this.record.getFieldValue('discountrate')),
                discountedsubtotal: Utils.toCurrency(0),
                discountedsubtotal_formatted: Utils.formatCurrency(0),
                giftcertapplied: Utils.toCurrency(this.record.getFieldValue('giftcertapplied')),
                giftcertapplied_formatted: Utils.formatCurrency(this.record.getFieldValue('giftcertapplied')),
                total: Utils.toCurrency(this.record.getFieldValue('total')),
                total_formatted: Utils.formatCurrency(this.record.getFieldValue('total'))
            };
        },
        _addTransactionColumnFieldsToOptions: function () {
        },
        getLines: function () {
            this.result.lines = {};
            var items_to_preload = [], amount, self = this, line_id;
            for (var i = 1; i <= this.record.getLineItemCount('item'); i++) {
                if (this.record.getLineItemValue('item', 'itemtype', i) === 'Discount' && this.record.getLineItemValue('item', 'discline', i)) {
                    var discline = this.record.getLineItemValue('item', 'discline', i);
                    line_id = self.result.internalid + '_' + discline;
                    amount = Math.abs(parseFloat(this.record.getLineItemValue('item', 'amount', i)));
                    this.result.lines[line_id].discount = this.result.lines[line_id].discount ? this.result.lines[line_id].discount + amount : amount;
                    this.result.lines[line_id].total = this.result.lines[line_id].amount + this.result.lines[line_id].tax_amount - this.result.lines[line_id].discount;
                    this.result.lines[line_id].discount_name = this.record.getLineItemValue('item', 'item_display', i);
                } else {
                    var rate = Utils.toCurrency(this.record.getLineItemValue('item', 'rate', i)), item_id = this.record.getLineItemValue('item', 'item', i), item_type = this.record.getLineItemValue('item', 'itemtype', i);
                    amount = Utils.toCurrency(this.record.getLineItemValue('item', 'amount', i));
                    var tax_amount = Utils.toCurrency(this.record.getLineItemValue('item', 'tax1amt', i)) || 0, total = amount + tax_amount;
                    line_id = this.record.getLineItemValue('item', 'id', i);
                    this.result.lines[line_id] = {
                        internalid: line_id,
                        quantity: parseInt(this.record.getLineItemValue('item', 'quantity', i), 10),
                        rate: rate,
                        amount: amount,
                        tax_amount: tax_amount,
                        tax_rate: this.record.getLineItemValue('item', 'taxrate1', i),
                        tax_code: this.record.getLineItemValue('item', 'taxcode_display', i),
                        isfulfillable: this.record.getLineItemValue('item', 'fulfillable', i) === 'T',
                        location: this.record.getLineItemValue('item', 'location', i),
                        discount: 0,
                        total: total,
                        item: item_id,
                        type: item_type,
                        options: self.parseLineOptions(this.record.getLineItemValue('item', 'options', i)),
                        shipaddress: this.record.getLineItemValue('item', 'shipaddress', i) ? this.result.listAddresseByIdTmp[this.record.getLineItemValue('item', 'shipaddress', i)] : null,
                        shipmethod: this.record.getLineItemValue('item', 'shipmethod', i) || null,
                        index: i
                    };
                    items_to_preload[item_id] = {
                        id: item_id,
                        type: item_type
                    };
                    self.getExtraLineFields(this.result.lines[line_id], this.record, i);
                }
            }
            var preloaded_items = this.preLoadItems(_.values(items_to_preload));
            _.each(this.result.lines, function (line) {
                line.rate_formatted = Utils.formatCurrency(line.rate);
                line.amount_formatted = Utils.formatCurrency(line.amount);
                line.tax_amount_formatted = Utils.formatCurrency(line.tax_amount);
                line.discount_formatted = Utils.formatCurrency(line.discount);
                line.total_formatted = Utils.formatCurrency(line.total);
                line.item = preloaded_items[line.item] || { itemid: line.item };
                self._addTransactionColumnFieldsToOptions(line);
            });
            delete this.result.listAddresseByIdTmp;
        },
        parseLineOptions: function parseLineOptions(options_string) {
            var self = this;
            var options_object = [];
            if (options_string && options_string !== '- None -') {
                var split_char_3 = String.fromCharCode(3), split_char_4 = String.fromCharCode(4);
                _.each(options_string.split(split_char_4), function (option_line) {
                    option_line = option_line.split(split_char_3);
                    options_object.push(self.transactionModelGetLineOptionBuilder(option_line[0], option_line[2], self.transactionModelGetLineOptionValueBuilder(option_line[4], option_line[3]), option_line[1] === 'T'));
                });
            }
            return options_object;
        },
        transactionModelGetLineOptionBuilder: function (internalId, label, value, mandatory) {
            return {
                cartOptionId: internalId.toLowerCase(),
                label: label,
                value: value,
                ismandatory: mandatory || false
            };
        },
        transactionModelGetLineOptionValueBuilder: function (label, internalId) {
            return {
                label: label,
                internalid: internalId
            };
        },
        preLoadItems: function (items_to_preload) {
            return this.storeItem ? this.loadItemsWithStoreItem(items_to_preload) : this.loadItemsWithSuiteScript(items_to_preload);
        },
        loadItemsWithStoreItem: function (items_to_preload) {
            var result = {}, self = this, items_to_query = [], inactive_item = {};
            this.storeItem.preloadItems(items_to_preload);
            _.each(this.result.lines, function (line) {
                if (line.item) {
                    var item = self.storeItem.get(line.item, line.type);
                    if (!item || _.isUndefined(item.itemid)) {
                        items_to_query.push({ id: line.item });
                    } else {
                        result[line.item] = item;
                    }
                }
            });
            inactive_item = this.loadItemsWithSuiteScript(items_to_query);
            _.each(inactive_item, function (value, key) {
                result[key] = value;
            });
            return result;
        },
        loadItemsWithSuiteScript: function (items_to_query) {
            var result = {};
            if (items_to_query.length > 0) {
                items_to_query = _.pluck(items_to_query, 'id');
                var filters = [
                        new nlobjSearchFilter('entity', null, 'is', nlapiGetUser()),
                        new nlobjSearchFilter('internalid', null, 'is', this.result.internalid),
                        new nlobjSearchFilter('internalid', 'item', 'anyof', items_to_query)
                    ], columns = [
                        new nlobjSearchColumn('internalid', 'item'),
                        new nlobjSearchColumn('type', 'item'),
                        new nlobjSearchColumn('parent', 'item'),
                        new nlobjSearchColumn('displayname', 'item'),
                        new nlobjSearchColumn('storedisplayname', 'item'),
                        new nlobjSearchColumn('itemid', 'item')
                    ], inactive_items_search = Application.getAllSearchResults('transaction', filters, columns), loaded_item;
                _.each(inactive_items_search, function (item) {
                    loaded_item = {
                        internalid: item.getValue('internalid', 'item'),
                        itemtype: item.getValue('type', 'item'),
                        displayname: item.getValue('displayname', 'item'),
                        storedisplayname: item.getValue('storedisplayname', 'item'),
                        itemid: item.getValue('itemid', 'item')
                    };
                    result[item.getValue('internalid', 'item')] = loaded_item;
                });
            }
            return result;
        },
        getExtraLineFields: function () {
        },
        getRecordShippingMethods: function () {
            var self = this;
            if (this.record.getLineItemCount('shipgroup') <= 0) {
                self.addShippingMethod({
                    internalid: this.record.getFieldValue('shipmethod'),
                    name: this.record.getFieldText('shipmethod'),
                    rate: Utils.toCurrency(this.record.getFieldValue('shipping_rate')),
                    rate_formatted: Utils.formatCurrency(this.record.getFieldValue('shipping_rate')),
                    shipcarrier: this.record.getFieldValue('carrier')
                });
            }
            for (var i = 1; i <= this.record.getLineItemCount('shipgroup'); i++) {
                self.addShippingMethod({
                    internalid: this.record.getLineItemValue('shipgroup', 'shippingmethodref', i),
                    name: this.record.getLineItemValue('shipgroup', 'shippingmethod', i),
                    rate: Utils.toCurrency(this.record.getLineItemValue('shipgroup', 'shippingrate', i)),
                    rate_formatted: Utils.formatCurrency(this.record.getLineItemValue('shipgroup', 'shippingrate', i)),
                    shipcarrier: this.record.getLineItemValue('shipgroup', 'shippingcarrier', i)
                });
            }
            this.result.shipmethod = this.record.getFieldValue('shipmethod');
        },
        getTransactionType: function (ids) {
            ids = _.isArray(ids) ? ids : [ids];
            var results = {}, filters = [new nlobjSearchFilter('internalid', null, 'anyof', ids)], columns = [new nlobjSearchColumn('recordtype')];
            if (ids && ids.length) {
                _.each(Application.getAllSearchResults('transaction', filters, columns) || [], function (record) {
                    results[record.getId()] = record.getValue('recordtype');
                });
            }
            return results;
        },
        getRecordAddresses: function () {
            this.result.addresses = {};
            this.result.listAddresseByIdTmp = {};
            for (var i = 1; i <= this.record.getLineItemCount('iladdrbook'); i++) {
                this.result.listAddresseByIdTmp[this.record.getLineItemValue('iladdrbook', 'iladdrinternalid', i)] = this.addAddress({
                    internalid: this.record.getLineItemValue('iladdrbook', 'iladdrshipaddr', i),
                    country: this.record.getLineItemValue('iladdrbook', 'iladdrshipcountry', i),
                    state: this.record.getLineItemValue('iladdrbook', 'iladdrshipstate', i),
                    city: this.record.getLineItemValue('iladdrbook', 'iladdrshipcity', i),
                    zip: this.record.getLineItemValue('iladdrbook', 'iladdrshipzip', i),
                    addr1: this.record.getLineItemValue('iladdrbook', 'iladdrshipaddr1', i),
                    addr2: this.record.getLineItemValue('iladdrbook', 'iladdrshipaddr2', i),
                    attention: this.record.getLineItemValue('iladdrbook', 'iladdrshipattention', i),
                    addressee: this.record.getLineItemValue('iladdrbook', 'iladdrshipaddressee', i),
                    phone: this.record.getLineItemValue('iladdrbook', 'iladdrshipphone', i)
                });
            }
            this.result.shipaddress = this.record.getFieldValue('shipaddress') ? this.addAddress({
                internalid: this.record.getFieldValue('shipaddress'),
                country: this.record.getFieldValue('shipcountry'),
                state: this.record.getFieldValue('shipstate'),
                city: this.record.getFieldValue('shipcity'),
                zip: this.record.getFieldValue('shipzip'),
                addr1: this.record.getFieldValue('shipaddr1'),
                addr2: this.record.getFieldValue('shipaddr2'),
                attention: this.record.getFieldValue('shipattention'),
                addressee: this.record.getFieldValue('shipaddressee'),
                phone: this.record.getFieldValue('shipphone')
            }) : null;
            this.result.billaddress = this.record.getFieldValue('billaddress') ? this.addAddress({
                internalid: this.record.getFieldValue('billaddress'),
                country: this.record.getFieldValue('billcountry'),
                state: this.record.getFieldValue('billstate'),
                city: this.record.getFieldValue('billcity'),
                zip: this.record.getFieldValue('billzip'),
                addr1: this.record.getFieldValue('billaddr1'),
                addr2: this.record.getFieldValue('billaddr2'),
                attention: this.record.getFieldValue('billattention'),
                addressee: this.record.getFieldValue('billaddressee'),
                phone: this.record.getFieldValue('billphone')
            }) : null;
        },
        addShippingMethod: function (shipping_method) {
            this.result.shipmethods = this.result.shipmethods || {};
            if (!this.result.shipmethods[shipping_method.internalid]) {
                this.result.shipmethods[shipping_method.internalid] = shipping_method;
            }
            return shipping_method.internalid;
        },
        addAddress: function (address) {
            this.result.addresses = this.result.addresses || {};
            address.fullname = address.attention ? address.attention : address.addressee;
            address.company = address.attention ? address.addressee : null;
            delete address.attention;
            delete address.addressee;
            address.internalid = this.getAddressInternalId(address);
            if (AddressModel && AddressModel.isValid) {
                address.isvalid = AddressModel.isValid(address) ? 'T' : 'F';
            }
            if (!this.result.addresses[address.internalid]) {
                this.result.addresses[address.internalid] = address;
            }
            return address.internalid;
        },
        getAddressInternalId: function (address) {
            var address_internalid = (address.country || '') + '-' + (address.state || '') + '-' + (address.city || '') + '-' + (address.zip || '') + '-' + (address.addr1 || '') + '-' + (address.addr2 || '') + '-' + (address.fullname || '') + '-' + (address.company || '');
            return address_internalid.replace(/\s/g, '-');
        },
        update: function (record_type, id, data_model) {
            if (record_type && id) {
                this.recordId = id;
                this.data = data_model;
                this.record = this.getTransactionRecord(record_type, id);
                this.currentRecord = this.get(record_type, id);
                this.setPaymentMethod();
                this.setAddress('ship', this.data.shipaddress, 'billaddress');
                this.setAddress('bill', this.data.billaddress, 'shipaddress');
                this.setLines();
                this.setMemo();
                this.setTransactionBodyCustomFields();
            }
        },
        setMemo: function () {
            this.record.setFieldValue('memo', null);
            if (this.data.memo) {
                this.record.setFieldValue('memo', this.data.memo);
            }
        },
        setPaymentMethod: function () {
            var self = this, method_name = '';
            this.removePaymentMethod();
            if (this.data.paymentmethods) {
                _.each(this.data.paymentmethods, function (payment_method) {
                    method_name = 'setPaymentMethod' + payment_method.type.toUpperCase();
                    if (_.isFunction(self[method_name])) {
                        self[method_name](payment_method);
                    }
                });
            }
        },
        setAddress: function (prefix, address_id, other_address_name) {
            this.removeAddress(prefix);
            if (address_id) {
                if (!this.hasCurrentCustomerAddress(address_id)) {
                    var old_address_model = _.find(this.data.addresses, { internalid: address_id }), old_address_id = address_id;
                    address_id = this.createAddress(old_address_model);
                    this.data.addresses = _.reject(this.data.addresses, function (address) {
                        return address.internalid === old_address_id;
                    });
                    old_address_model.internalid = address_id;
                    this.data.addresses.push(old_address_model);
                    if (other_address_name && this.data[other_address_name] === old_address_id) {
                        this.data[other_address_name] = address_id;
                    }
                }
                this.record.setFieldValue(prefix + 'addresslist', address_id);
            }
        },
        hasCurrentCustomerAddress: function (address_id) {
            try {
                return AddressModel ? !!AddressModel.get(address_id) : true;
            } catch (e) {
                return false;
            }
        },
        createAddress: function (address_model) {
            return AddressModel && AddressModel.create(_.clone(address_model));
        },
        removeAddress: function (prefix) {
            var empty_value = '';
            this.record.setFieldValue(prefix + 'country', empty_value);
            this.record.setFieldValue(prefix + 'address', empty_value);
            this.record.setFieldValue(prefix + 'state', empty_value);
            this.record.setFieldValue(prefix + 'city', empty_value);
            this.record.setFieldValue(prefix + 'zip', empty_value);
            this.record.setFieldValue(prefix + 'addr1', empty_value);
            this.record.setFieldValue(prefix + 'addr2', empty_value);
            this.record.setFieldValue(prefix + 'attention', empty_value);
            this.record.setFieldValue(prefix + 'addressee', empty_value);
            this.record.setFieldValue(prefix + 'phone', empty_value);
        },
        setLines: function () {
            this.removeAllItemLines();
            if (this.data.lines) {
                var self = this;
                _.each(this.data.lines, function (line) {
                    self.record.selectNewLineItem('item');
                    self.record.setCurrentLineItemValue('item', 'item', line.item.internalid);
                    self.record.setCurrentLineItemValue('item', 'quantity', line.quantity);
                    self.record.setCurrentLineItemValue('item', 'itemtype', line.item.type);
                    self.record.setCurrentLineItemValue('item', 'id', line.internalid);
                    self._addTransactionColumnFieldsToOptions(line);
                    _.each(line.options, function (option_value, option_id) {
                        self.record.setCurrentLineItemValue('item', option_id, option_value);
                    });
                    self.setLinesAddUpdateLine(line, self.record);
                    self.record.commitLineItem('item');
                });
            }
        },
        setLinesRemoveLines: function () {
        },
        setLinesAddUpdateLine: function () {
        },
        removeAllItemLines: function () {
            var items_count = this.record.getLineItemCount('item');
            this.setLinesRemoveLines(this.record);
            for (var i = 1; i <= items_count; i++) {
                this.record.removeLineItem('item', i);
            }
        },
        setPaymentMethodINVOICE: function (payment_method) {
            this.record.setFieldValue('terms', payment_method.terms.internalid);
            this.record.setFieldValue('otherrefnum', payment_method.purchasenumber);
        },
        setPaymentMethodCREDITCARD: function (payment_method) {
            if (!payment_method.creditcard.ccname) {
                throw {
                    status: 500,
                    code: 'ERR_WS_INVALID_PAYMENT',
                    message: 'Please enter your name as it appears on your card.'
                };
            }
            var credit_card = payment_method.creditcard;
            this.record.setFieldValue('creditcard', credit_card.internalid);
            this.record.setFieldValue('paymentmethod', credit_card.paymentmethod.internalid);
            this.record.setFieldValue('creditcardprocessor', credit_card.paymentmethod.merchantid);
            if (credit_card.ccsecuritycode) {
                this.record.setFieldValue('ccsecuritycode', credit_card.ccsecuritycode);
            }
        },
        setPaymentMethodEXTERNAL: function (payment_method) {
            this.record.setFieldValue('paymentmethod', payment_method.internalid);
            this.record.setFieldValue('creditcardprocessor', payment_method.merchantid);
            this.record.setFieldValue('returnurl', payment_method.returnurl);
            this.record.setFieldValue('getauth', 'T');
        },
        removePaymentMethod: function () {
            this.record.setFieldValue('paymentterms', null);
            this.record.setFieldValue('paymentmethod', null);
            this.record.setFieldValue('thankyouurl', null);
            this.record.setFieldValue('errorurl', null);
            this.record.setFieldValue('returnurl', null);
            this.record.setFieldValue('terms', null);
            this.record.setFieldValue('otherrefnum', null);
            this.record.setFieldValue('creditcard', null);
        },
        preSubmitRecord: function () {
        },
        postSubmitRecord: function (confirmation_result) {
            return confirmation_result;
        },
        submit: function () {
            if (!this.record) {
                throw SC.ERROR_IDENTIFIERS.loadBeforeSubmit;
            }
            this.preSubmitRecord();
            var new_record_id = nlapiSubmitRecord(this.record), result = { internalid: new_record_id };
            return this.postSubmitRecord(result);
        },
        preList: function () {
        },
        postList: function () {
        },
        preGet: function () {
        },
        postGet: function () {
        }
    });
});
define('ReorderItems.Model', [
    'SC.Model',
    'SC.Models.Init',
    'Application',
    'StoreItem.Model',
    'SiteSettings.Model',
    'Utils',
    'underscore',
    'Transaction.Model'
], function (SCModel, ModelsInit, Application, StoreItem, SiteSettings, Utils, _, Transaction) {
    'use strict';
    return SCModel.extend({
        name: 'OrderItem',
        isMultiSite: ModelsInit.context.getFeature('MULTISITE'),
        search: function (order_id, query_filters) {
            var filters = {
                    'entity': [
                        'entity',
                        'is',
                        nlapiGetUser()
                    ],
                    'entity_operator': 'and',
                    'quantity': [
                        'quantity',
                        'greaterthan',
                        0
                    ],
                    'quantity_operator': 'and',
                    'mainline': [
                        'mainline',
                        'is',
                        'F'
                    ],
                    'mainline_operator': 'and',
                    'cogs': [
                        'cogs',
                        'is',
                        'F'
                    ],
                    'cogs_operator': 'and',
                    'taxline': [
                        'taxline',
                        'is',
                        'F'
                    ],
                    'taxline_operator': 'and',
                    'shipping': [
                        'shipping',
                        'is',
                        'F'
                    ],
                    'shipping_operator': 'and',
                    'transactiondiscount': [
                        'transactiondiscount',
                        'is',
                        'F'
                    ],
                    'transactiondiscount_operator': 'and',
                    'item_is_active': [
                        'item.isinactive',
                        'is',
                        'F'
                    ],
                    'item_is_active_operator': 'and',
                    'item_type': [
                        'item.type',
                        'noneof',
                        'GiftCert'
                    ]
                }, columns = [
                    new nlobjSearchColumn('internalid', 'item', 'group'),
                    new nlobjSearchColumn('type', 'item', 'group'),
                    new nlobjSearchColumn('parent', 'item', 'group'),
                    new nlobjSearchColumn('options', null, 'group'),
                    new nlobjSearchColumn('onlinecustomerprice', 'item', 'max'),
                    new nlobjSearchColumn('trandate', null, 'max'),
                    new nlobjSearchColumn('internalid', null, 'count')
                ], item_name = new nlobjSearchColumn('formulatext', 'item', 'group');
            item_name.setFormula('case when LENGTH({item.storedisplayname}) > 0 then {item.storedisplayname} else (case when LENGTH({item.displayname}) > 0 then {item.displayname} else {item.itemid} end) end');
            columns.push(item_name);
            var site_settings = SiteSettings.get();
            if (site_settings.isSCISIntegrationEnabled) {
                filters.scisrecords_operator = 'and';
                filters.scisrecords = [
                    [
                        [
                            'type',
                            'anyof',
                            [
                                'CashSale',
                                'CustInvc'
                            ]
                        ],
                        'and',
                        [
                            'createdfrom',
                            'is',
                            '@NONE@'
                        ],
                        'and',
                        [
                            'location.locationtype',
                            'is',
                            SC.Configuration.locationTypeMapping.store.internalid
                        ],
                        'and',
                        [
                            'source',
                            'is',
                            '@NONE@'
                        ]
                    ],
                    'or',
                    [[
                            'type',
                            'anyof',
                            ['SalesOrd']
                        ]]
                ];
            } else {
                filters.type_operator = 'and';
                filters.type = [
                    'type',
                    'anyof',
                    ['SalesOrd']
                ];
            }
            if (this.isMultiSite) {
                var site_id = ModelsInit.session.getSiteSettings(['siteid']).siteid, filter_site_option = SC.Configuration.filterSite.option, filter_site_ids = SC.Configuration.filterSite.ids, search_filter_array = null;
                if (filter_site_option === 'current') {
                    search_filter_array = [
                        site_id,
                        '@NONE@'
                    ];
                } else if (filter_site_option === 'siteIds') {
                    search_filter_array = filter_site_ids;
                    search_filter_array.push('@NONE@');
                }
                if (search_filter_array && search_filter_array.length) {
                    filters.site_operator = 'and';
                    filters.site = [
                        'website',
                        'anyof',
                        _.uniq(search_filter_array)
                    ];
                    filters.item_website_operator = 'and';
                    filters.item_website = [
                        'item.website',
                        'anyof',
                        _.uniq(search_filter_array)
                    ];
                }
            }
            if (order_id) {
                filters.order_operator = 'and';
                filters.order_id = [
                    'internalid',
                    'is',
                    order_id
                ];
                columns.push(new nlobjSearchColumn('tranid', null, 'group'));
            }
            if (query_filters.date.from && query_filters.date.to) {
                filters.date_operator = 'and';
                query_filters.date.from = query_filters.date.from.split('-');
                query_filters.date.to = query_filters.date.to.split('-');
                filters.date = [
                    'trandate',
                    'within',
                    new Date(query_filters.date.from[0], query_filters.date.from[1] - 1, query_filters.date.from[2]),
                    new Date(query_filters.date.to[0], query_filters.date.to[1] - 1, query_filters.date.to[2])
                ];
            }
            switch (query_filters.sort) {
            case 'name':
                item_name.setSort(query_filters.order > 0);
                break;
            case 'price':
                columns[4].setSort(query_filters.order > 0);
                break;
            case 'date':
                columns[5].setSort(query_filters.order > 0);
                break;
            case 'quantity':
                columns[6].setSort(query_filters.order > 0);
                break;
            default:
                columns[6].setSort(true);
                break;
            }
            var result = Application.getPaginatedSearchResults({
                    record_type: 'transaction',
                    filters: _.values(filters),
                    columns: columns,
                    page: query_filters.page,
                    column_count: new nlobjSearchColumn('formulatext', null, 'count').setFormula('CONCAT({item}, {options})')
                }), items_info = _.map(result.records, function (line) {
                    return {
                        id: line.getValue('internalid', 'item', 'group'),
                        type: line.getValue('type', 'item', 'group')
                    };
                });
            if (items_info.length) {
                StoreItem.preloadItems(items_info);
                result.records = _.map(result.records, function (line) {
                    return {
                        item: StoreItem.get(line.getValue('internalid', 'item', 'group'), line.getValue('type', 'item', 'group')),
                        tranid: line.getValue('tranid', null, 'group') || null,
                        options: Transaction.parseLineOptions(line.getValue('options', null, 'group')),
                        trandate: line.getValue('trandate', null, 'max')
                    };
                });
            }
            return result;
        }
    });
});
define('ReorderItems.ServiceController', [
    'ServiceController',
    'ReorderItems.Model',
    'SiteSettings.Model'
], function (ServiceController, ReorderItemsModel, SiteSettingsModel) {
    'use strict';
    var enabled = SiteSettingsModel.get().isSCISIntegrationEnabled;
    return ServiceController.extend({
        name: 'ReorderItems.ServiceController',
        options: {
            common: {
                requireLogin: true,
                requirePermissions: {
                    list: [
                        enabled ? 'transactions.tranPurchases.1' : 'transactions.tranSalesOrd.1',
                        'transactions.tranFind.1'
                    ]
                }
            }
        },
        get: function () {
            return ReorderItemsModel.search(this.request.getParameter('order_id'), {
                date: {
                    from: this.request.getParameter('from'),
                    to: this.request.getParameter('to')
                },
                page: this.request.getParameter('page') || 1,
                sort: this.request.getParameter('sort'),
                order: this.request.getParameter('order')
            });
        }
    });
});
define('Transaction.Model.Extensions', [
    'Application',
    'Utils',
    'underscore'
], function (Application, Utils, _) {
    'use strict';
    return {
        getAdjustments: function (options) {
            options = options || {};
            var applied_to_transaction = options.appliedToTransaction || [this.result.internalid], types = options.types || [
                    'CustCred',
                    'DepAppl',
                    'CustPymt'
                ], ids = [], adjustments = {}, amount_field = this.isMultiCurrency ? 'appliedtoforeignamount' : 'appliedtolinkamount', filters = [
                    new nlobjSearchFilter('appliedtotransaction', null, 'anyof', applied_to_transaction),
                    new nlobjSearchFilter(amount_field, null, 'isnotempty'),
                    new nlobjSearchFilter('type', null, 'anyof', types)
                ], columns = [
                    new nlobjSearchColumn('total'),
                    new nlobjSearchColumn('tranid'),
                    new nlobjSearchColumn('trandate').setSort(true),
                    new nlobjSearchColumn('type'),
                    new nlobjSearchColumn(amount_field)
                ], search_results = Application.getAllSearchResults('transaction', filters, columns);
            _.each(search_results || [], function (payout) {
                var internal_id = payout.getId(), duplicated_adjustment = adjustments[internal_id];
                if (options.paymentMethodInformation) {
                    ids.push(internal_id);
                }
                if (!duplicated_adjustment) {
                    adjustments[internal_id] = {
                        internalid: internal_id,
                        tranid: payout.getValue('tranid'),
                        recordtype: payout.getRecordType(),
                        amount: Utils.toCurrency(payout.getValue(amount_field)),
                        amount_formatted: Utils.formatCurrency(payout.getValue(amount_field)),
                        trandate: payout.getValue('trandate')
                    };
                } else {
                    duplicated_adjustment.amount += Utils.toCurrency(payout.getValue(amount_field));
                    duplicated_adjustment.amount_formatted = Utils.formatCurrency(duplicated_adjustment.amount);
                }
            });
            if (options.paymentMethodInformation && ids.length) {
                filters = [
                    new nlobjSearchFilter('mainline', null, 'is', 'T'),
                    new nlobjSearchFilter('internalid', null, 'anyof', ids),
                    new nlobjSearchFilter('type', null, 'anyof', types)
                ];
                columns = [
                    new nlobjSearchColumn('internalid'),
                    new nlobjSearchColumn('type'),
                    new nlobjSearchColumn('ccexpdate'),
                    new nlobjSearchColumn('ccholdername'),
                    new nlobjSearchColumn('ccnumber'),
                    new nlobjSearchColumn('paymentmethod'),
                    new nlobjSearchColumn('tranid')
                ];
                search_results = Application.getAllSearchResults('transaction', filters, columns);
                _.each(search_results || [], function (payout) {
                    var internal_id = payout.getId(), adjustment = adjustments[internal_id], paymentmethod = {
                            name: payout.getText('paymentmethod'),
                            internalid: payout.getValue('tranid')
                        }, ccnumber = payout.getValue('ccnumber');
                    if (ccnumber) {
                        paymentmethod.type = 'creditcard';
                        paymentmethod.creditcard = {
                            ccnumber: ccnumber,
                            ccexpiredate: payout.getValue('ccexpdate'),
                            ccname: payout.getValue('ccholdername'),
                            paymentmethod: {
                                ispaypal: 'F',
                                name: paymentmethod.name,
                                creditcard: 'T',
                                internalid: payout.getValue('tranid')
                            }
                        };
                    }
                    if (adjustment) {
                        adjustment.paymentmethod = paymentmethod;
                    }
                });
            }
            this.result.adjustments = _.values(adjustments);
        },
        getSalesRep: function () {
            var salesrep_id = this.record.getFieldValue('salesrep'), salesrep_name = this.record.getFieldText('salesrep');
            if (salesrep_id) {
                this.result.salesrep = {
                    name: salesrep_name,
                    internalid: salesrep_id
                };
                var search_result = nlapiLookupField(this.result.recordtype, this.result.internalid, [
                    'salesrep.phone',
                    'salesrep.email',
                    'salesrep.entityid',
                    'salesrep.mobilephone',
                    'salesrep.fax'
                ]);
                if (search_result) {
                    this.result.salesrep.phone = search_result['salesrep.phone'];
                    this.result.salesrep.email = search_result['salesrep.email'];
                    this.result.salesrep.fullname = search_result['salesrep.entityid'];
                    this.result.salesrep.mobilephone = search_result['salesrep.mobilephone'];
                    this.result.salesrep.fax = search_result['salesrep.fax'];
                }
            }
        }
    };
});
define('ReturnAuthorization.Model', [
    'Transaction.Model',
    'Utils',
    'Application',
    'StoreItem.Model',
    'SiteSettings.Model',
    'underscore'
], function (Transaction, Utils, Application, StoreItem, SiteSettings, _) {
    'use strict';
    return Transaction.extend({
        name: 'ReturnAuthorization',
        validation: {},
        isSCISIntegrationEnabled: SiteSettings.isSCISIntegrationEnabled(),
        getExtraRecordFields: function () {
            this.result.isCancelable = this.isCancelable();
            if (this.isSCISIntegrationEnabled && this.result.recordtype === 'creditmemo') {
                this.result.amountpaid = Utils.toCurrency(this.record.getFieldValue('amountpaid'));
                this.result.amountpaid_formatted = Utils.formatCurrency(this.record.getFieldValue('amountpaid'));
                this.result.amountremaining = Utils.toCurrency(this.record.getFieldValue('amountremaining'));
                this.result.amountremaining_formatted = Utils.formatCurrency(this.record.getFieldValue('amountremaining'));
                this.getApply();
            }
        },
        isCancelable: function () {
            return this.result.recordtype === 'returnauthorization' && this.result.status.internalid === 'pendingApproval';
        },
        getExtraLineFields: function (result, record, i) {
            result.reason = this.result.recordtype === 'creditmemo' ? '' : record.getLineItemValue('item', 'description', i);
        },
        getApply: function () {
            var self = this, ids = [];
            this.result.applies = {};
            for (var i = 1; i <= this.record.getLineItemCount('apply'); i++) {
                if (self.record.getLineItemValue('apply', 'apply', i) === 'T') {
                    var internalid = self.record.getLineItemValue('apply', 'internalid', i);
                    ids.push(internalid);
                    self.result.applies[internalid] = {
                        line: i,
                        internalid: internalid,
                        tranid: self.record.getLineItemValue('apply', 'refnum', i),
                        applydate: self.record.getLineItemValue('apply', 'applydate', i),
                        recordtype: self.record.getLineItemValue('apply', 'type', i),
                        currency: self.record.getLineItemValue('apply', 'currency', i),
                        amount: Utils.toCurrency(self.record.getLineItemValue('apply', 'amount', i)),
                        amount_formatted: Utils.formatCurrency(self.record.getLineItemValue('apply', 'amount', i))
                    };
                }
            }
            if (ids && ids.length) {
                _.each(this.getTransactionType(ids) || {}, function (recordtype, internalid) {
                    self.result.applies[internalid].recordtype = recordtype;
                });
            }
            this.result.applies = _.values(this.result.applies);
        },
        update: function (id, data, headers) {
            if (data.status === 'cancelled') {
                var url = 'https://' + Application.getHost() + '/app/accounting/transactions/returnauthmanager.nl?type=cancel&id=' + id;
                nlapiRequestURL(url, null, headers);
            }
        },
        create: function (data) {
            var return_authorization = nlapiTransformRecord(data.type, data.id, 'returnauthorization'), transaction_lines = this.getTransactionLines(data.id);
            this.setLines(return_authorization, data.lines, transaction_lines);
            return_authorization.setFieldValue('memo', data.comments);
            return nlapiSubmitRecord(return_authorization);
        },
        getTransactionLines: function (transaction_internalid) {
            var filters = {
                    mainline: [
                        'mainline',
                        'is',
                        'F'
                    ],
                    mainline_operator: 'and',
                    internalid: [
                        'internalid',
                        'is',
                        transaction_internalid
                    ]
                }, columns = [
                    new nlobjSearchColumn('line'),
                    new nlobjSearchColumn('rate')
                ];
            var search_results = Application.getAllSearchResults('transaction', _.values(filters), columns), item_lines = [];
            _.each(search_results, function (search_result) {
                var item_line = {
                    line: transaction_internalid + '_' + search_result.getValue('line'),
                    rate: search_result.getValue('rate')
                };
                item_lines.push(item_line);
            });
            return item_lines;
        },
        getCreatedFrom: function () {
            var created_from_internalid, created_from_name, recordtype, tranid;
            if (this.isSCISIntegrationEnabled && this.result.recordtype === 'creditmemo') {
                created_from_internalid = this.record.getFieldValue('custbody_ns_pos_created_from');
                created_from_name = this.record.getFieldText('custbody_ns_pos_created_from');
            } else {
                created_from_internalid = nlapiLookupField(this.result.recordtype, this.result.internalid, 'createdfrom');
                created_from_name = created_from_internalid && nlapiLookupField(this.result.recordtype, this.result.internalid, 'createdfrom', true);
            }
            recordtype = created_from_internalid ? Utils.getTransactionType(created_from_internalid) : '';
            tranid = recordtype ? nlapiLookupField(recordtype, created_from_internalid, 'tranid') : '';
            this.result.createdfrom = {
                internalid: created_from_internalid,
                name: created_from_name,
                recordtype: recordtype,
                tranid: tranid
            };
        },
        getStatus: function () {
            this.result.status = {
                internalid: nlapiLookupField(this.result.recordtype, this.result.internalid, 'status'),
                name: nlapiLookupField(this.result.recordtype, this.result.internalid, 'status', true)
            };
        },
        findLine: function (line_id, lines) {
            return _.findWhere(lines, { id: line_id });
        },
        setLines: function (return_authorization, lines, transaction_lines) {
            var line_count = return_authorization.getLineItemCount('item'), add_line = true, i = 1;
            while (i <= line_count) {
                var line_item_value = return_authorization.getLineItemValue('item', 'id', i);
                add_line = this.findLine(line_item_value, lines);
                if (add_line) {
                    var transaction_line = _.findWhere(transaction_lines, { line: line_item_value });
                    if (transaction_line) {
                        return_authorization.setLineItemValue('item', 'rate', i, transaction_line.rate);
                    }
                    return_authorization.setLineItemValue('item', 'quantity', i, add_line.quantity);
                    return_authorization.setLineItemValue('item', 'description', i, add_line.reason);
                } else {
                    return_authorization.setLineItemValue('item', 'quantity', i, 0);
                }
                i++;
            }
        },
        setExtraListFilters: function () {
            if (this.data.getLines && this.data.page === 'all') {
                delete this.filters.mainline;
                delete this.filters.mainline_operator;
                this.filters.shipping_operator = 'and';
                this.filters.shipping = [
                    'shipping',
                    'is',
                    'F'
                ];
                this.filters.taxline_operator = 'and';
                this.filters.taxline = [
                    'taxline',
                    'is',
                    'F'
                ];
                this.filters.quantity_operator = 'and';
                this.filters.quantity = [
                    'quantity',
                    'notequalto',
                    0
                ];
                this.filters.cogs_operator = 'and';
                this.filters.cogs = [
                    'cogs',
                    'is',
                    'F'
                ];
                this.filters.transactiondiscount_operator = 'and';
                this.filters.transactiondiscount = [
                    'transactiondiscount',
                    'is',
                    'F'
                ];
            }
            if (this.isSCISIntegrationEnabled) {
                this.filters.scisrecords_operator = 'and';
                this.filters.scisrecords = [
                    [
                        [
                            'type',
                            'anyof',
                            ['CustCred']
                        ],
                        'and',
                        [
                            'location.locationtype',
                            'is',
                            SC.Configuration.locationTypeMapping.store.internalid
                        ],
                        'and',
                        [
                            'source',
                            'is',
                            '@NONE@'
                        ]
                    ],
                    'or',
                    [[
                            'type',
                            'anyof',
                            ['RtnAuth']
                        ]]
                ];
            } else {
                this.filters.type_operator = 'and';
                this.filters.type = [
                    'type',
                    'anyof',
                    ['RtnAuth']
                ];
            }
            if (this.data.createdfrom) {
                delete this.filters.createdfrom;
                delete this.filters.createdfrom_operator;
                this.data.createdfrom = _.isArray(this.data.createdfrom) ? this.data.createdfrom : this.data.createdfrom.split(',');
                var internal_ids = [], filters = [[
                            [
                                'createdfrom',
                                'anyof',
                                this.data.createdfrom
                            ],
                            'and',
                            [
                                'type',
                                'anyof',
                                ['RtnAuth']
                            ]
                        ]], columns = nlobjSearchColumn('internalid');
                if (this.isSCISIntegrationEnabled) {
                    filters.push('or');
                    filters.push([
                        [
                            'custbody_ns_pos_created_from',
                            'anyof',
                            this.data.createdfrom
                        ],
                        'and',
                        [
                            [
                                'type',
                                'anyof',
                                ['CustCred']
                            ],
                            'and',
                            [
                                'location.locationtype',
                                'is',
                                SC.Configuration.locationTypeMapping.store.internalid
                            ],
                            'and',
                            [
                                'source',
                                'is',
                                '@NONE@'
                            ]
                        ]
                    ]);
                }
                internal_ids = _(Application.getAllSearchResults('transaction', _.values(filters), columns) || []).pluck('id');
                if (this.data.internalid && this.data.internalid.length) {
                    internal_ids = _.intersection(internal_ids, this.data.internalid);
                }
                internal_ids = internal_ids.length ? internal_ids : [0];
                this.filters.internalid_operator = 'and';
                this.filters.internalid = [
                    'internalid',
                    'anyof',
                    internal_ids
                ];
            }
        },
        setExtraListColumns: function () {
            if (this.data.getLines && this.data.page === 'all') {
                this.columns.mainline = new nlobjSearchColumn('mainline');
                this.columns.internalid_item = new nlobjSearchColumn('internalid', 'item');
                this.columns.type_item = new nlobjSearchColumn('type', 'item');
                this.columns.parent_item = new nlobjSearchColumn('parent', 'item');
                this.columns.displayname_item = new nlobjSearchColumn('displayname', 'item');
                this.columns.storedisplayname_item = new nlobjSearchColumn('storedisplayname', 'item');
                this.columns.rate = new nlobjSearchColumn('rate');
                this.columns.total = new nlobjSearchColumn('total');
                this.columns.options = new nlobjSearchColumn('options');
                this.columns.line = new nlobjSearchColumn('line').setSort();
                this.columns.quantity = new nlobjSearchColumn('quantity');
            }
        },
        mapListResult: function (result, record) {
            result.amount = Math.abs(result.amount || 0);
            result.amount_formatted = Utils.formatCurrency(result.amount);
            result.lines = record.getValue(this.columns.lines);
            if (this.data.getLines) {
                result.mainline = record.getValue('mainline');
            }
            return result;
        },
        postList: function () {
            if (this.data.getLines && this.data.page === 'all') {
                this.results = _.where(this.results, { mainline: '*' });
                var items_to_preload = {}, self = this;
                _.each(this.search_results || [], function (record) {
                    if (record.getValue('mainline') !== '*') {
                        var record_id = record.getId(), result = _.findWhere(self.results, { internalid: record_id });
                        if (result) {
                            result.lines = result.lines || [];
                            var item_id = record.getValue('internalid', 'item'), item_type = record.getValue('type', 'item');
                            if (item_type !== 'Discount') {
                                result.lines.push({
                                    internalid: record_id + '_' + record.getValue('line'),
                                    quantity: Math.abs(record.getValue('quantity')),
                                    rate: Utils.toCurrency(record.getValue('rate')),
                                    rate_formatted: Utils.formatCurrency(record.getValue('rate')),
                                    tax_amount: Utils.toCurrency(Math.abs(record.getValue('taxtotal'))),
                                    tax_amount_formatted: Utils.formatCurrency(Math.abs(record.getValue('taxtotal'))),
                                    amount: Utils.toCurrency(Math.abs(record.getValue(self.amountField))),
                                    amount_formatted: Utils.formatCurrency(Math.abs(record.getValue(self.amountField))),
                                    options: self.parseLineOptions(record.getValue('options')),
                                    item: {
                                        internalid: item_id,
                                        type: item_type,
                                        parent: record.getValue('parent', 'item'),
                                        displayname: record.getValue('displayname', 'item'),
                                        storedisplayname: record.getValue('storedisplayname', 'item'),
                                        itemid: record.getValue('itemid', 'item')
                                    }
                                });
                                items_to_preload[item_id] = {
                                    id: item_id,
                                    type: item_type
                                };
                            }
                        }
                    }
                });
                this.store_item = StoreItem;
                this.store_item.preloadItems(_.values(items_to_preload));
                _.each(this.results, function (result) {
                    _.each(result.lines, function (line) {
                        var item_details = self.store_item.get(line.item.internalid, line.item.type);
                        if (item_details && !_.isUndefined(item_details.itemid)) {
                            line.item = item_details;
                        }
                    });
                });
            } else if (this.results.records && this.results.records.length) {
                var filters = {}, columns = [
                        new nlobjSearchColumn('internalid', null, 'group'),
                        new nlobjSearchColumn('quantity', null, 'sum')
                    ], quantities = {};
                filters.internalid = [
                    'internalid',
                    'anyof',
                    _(this.results.records || []).pluck('internalid')
                ];
                filters.mainline_operator = 'and';
                filters.mainline = [
                    'mainline',
                    'is',
                    'F'
                ];
                filters.cogs_operator = 'and';
                filters.cogs = [
                    'cogs',
                    'is',
                    'F'
                ];
                filters.taxline_operator = 'and';
                filters.taxline = [
                    'taxline',
                    'is',
                    'F'
                ];
                filters.shipping_operator = 'and';
                filters.shipping = [
                    'shipping',
                    'is',
                    'F'
                ];
                Application.getAllSearchResults('transaction', _.values(filters), columns).forEach(function (record) {
                    quantities[record.getValue('internalid', null, 'group')] = record.getValue('quantity', null, 'sum');
                });
                _.each(this.results.records, function (record) {
                    record.quantity = Math.abs(quantities[record.internalid] || 0);
                });
            }
        },
        postGet: function () {
            var filters = {}, columns = [
                    new nlobjSearchColumn('createdfrom'),
                    new nlobjSearchColumn('tranid', 'createdfrom')
                ], self = this, isCreditMemo = this.result.recordtype === 'creditmemo', record_type = '', created_from_internalid = '', created_from_name = '', cretaed_from_tranid = '';
            filters.internalid = [
                'internalid',
                'is',
                this.result.internalid
            ];
            if (isCreditMemo) {
                columns.push(new nlobjSearchColumn('line'));
                columns.push(new nlobjSearchColumn('custcol_ns_pos_returnreason'));
                filters.mainline_operator = 'and';
                filters.mainline = [
                    'mainline',
                    'is',
                    'F'
                ];
                filters.cogs_operator = 'and';
                filters.cogs = [
                    'cogs',
                    'is',
                    'F'
                ];
                filters.taxline_operator = 'and';
                filters.taxline = [
                    'taxline',
                    'is',
                    'F'
                ];
                filters.shipping_operator = 'and';
                filters.shipping = [
                    'shipping',
                    'is',
                    'F'
                ];
            } else {
                filters.createdfrom_operator = 'and';
                filters.createdfrom = [
                    'createdfrom',
                    'noneof',
                    '@NONE@'
                ];
            }
            Application.getAllSearchResults('transaction', _.values(filters), columns).forEach(function (record) {
                created_from_internalid = record.getValue('createdfrom');
                created_from_name = record.getText('createdfrom');
                cretaed_from_tranid = record.getValue('tranid', 'createdfrom');
                if (isCreditMemo) {
                    var line = self.result.lines[self.result.internalid + '_' + record.getValue('line')];
                    if (line) {
                        line.reason = record.getText('custcol_ns_pos_returnreason');
                    }
                }
            });
            if (created_from_internalid) {
                record_type = Utils.getTransactionType(created_from_internalid);
            }
            this.result.createdfrom = {
                internalid: created_from_internalid,
                name: created_from_name,
                recordtype: record_type || '',
                tranid: cretaed_from_tranid
            };
            this.result.lines = _.reject(this.result.lines, function (line) {
                return line.quantity === 0;
            });
        }
    });
});
function log(level, title, details) {
    'use strict';
    var console = require('Console'), levels = {
            'DEBUG': 'log',
            'AUDIT': 'info',
            'EMERGENCY': 'error',
            'ERROR': 'warn'
        };
    console[levels[level]](title, details);
}
var wrapped_objects = {};
function wrapObject(object, class_name) {
    'use strict';
    if (!wrapped_objects[class_name]) {
        wrapped_objects[class_name] = {};
        for (var method_name in object) {
            if (method_name !== 'prototype') {
                wrapped_objects[class_name][method_name] = wrap(object, method_name, class_name);
            }
        }
    }
    return wrapped_objects[class_name];
}
function wrap(object, method_name, class_name, original_function) {
    'use strict';
    return function () {
        var result, is_secure = ~request.getURL().indexOf('https:'), function_name = class_name + '.' + method_name + '()', file = '/' + request.getParameter('sitepath').replace(session.getAbsoluteUrl(is_secure ? 'checkout' : 'shopping', '/'), ''), start = Date.now();
        try {
            if (original_function) {
                result = original_function.apply(object, arguments);
            } else {
                result = object[method_name].apply(object, arguments);
            }
        } catch (e) {
            log('ERROR', file + ' | ' + function_name, ' | Arguments: ' + JSON.stringify(arguments) + ' | Exception: ' + JSON.stringify(e));
            throw e;
        }
        log('DEBUG', file + ' | ' + function_name, 'Time: ' + (Date.now() - start) + 'ms | Remaining Usage: ' + nlapiGetContext().getRemainingUsage() + ' | Arguments: ' + JSON.stringify(arguments));
        return result;
    };
}
var container = null, session = null, customer = null, context = null, order = null;
switch (nlapiGetContext().getExecutionContext()) {
case 'suitelet':
    context = nlapiGetContext();
    break;
case 'webstore':
case 'webservices':
case 'webapplication':
    container = nlapiGetWebContainer();
    session = container.getShoppingSession();
    customer = session.getCustomer();
    context = nlapiGetContext();
    order = session.getOrder();
    break;
default:
    break;
}
function getCurrentLocation() {
    'use strict';
    var location = context.getLocation();
    if (SC.Configuration.isSCIS) {
        location = JSON.parse(context.getSessionObject('location'));
        location = location && location.internalid;
    }
    return location;
}
define('Models.Init', ['underscore'], function (_) {
    'use strict';
    if (SC.debuggingMode) {
        var suite_script_functions_to_wrap = [
            'nlapiLoadRecord',
            'nlapiSearchRecord',
            'nlapiSubmitRecord',
            'nlapiCreateRecord',
            'nlapiLookupField'
        ];
        _.each(suite_script_functions_to_wrap, function (method_name) {
            this[method_name] = wrap(this, method_name, 'SuiteScript', this[method_name]);
        }, this);
        return {
            container: wrapObject(container, 'WebContainer'),
            session: wrapObject(session, 'ShoppingSession'),
            customer: wrapObject(customer, 'Customer'),
            context: wrapObject(context, 'Context'),
            order: wrapObject(order, 'Order'),
            getCurrentLocation: getCurrentLocation
        };
    } else {
        return {
            container: container,
            session: session,
            customer: customer,
            context: context,
            order: order,
            getCurrentLocation: getCurrentLocation
        };
    }
});
define('OrderHistory.Model', [
    'Application',
    'Utils',
    'StoreItem.Model',
    'Transaction.Model',
    'Transaction.Model.Extensions',
    'SiteSettings.Model',
    'SC.Model',
    'ReturnAuthorization.Model',
    'ExternalPayment.Model',
    'Models.Init',
    'underscore'
], function (Application, Utils, StoreItem, Transaction, TransactionModelExtensions, SiteSettings, SCModel, ReturnAuthorization, ExternalPayment, ModelsInit, _) {
    'use strict';
    return Transaction.extend({
        name: 'OrderHistory',
        isPickupInStoreEnabled: SiteSettings.isPickupInStoreEnabled(),
        isSCISIntegrationEnabled: SiteSettings.isSCISIntegrationEnabled(),
        setExtraListColumns: function () {
            this.columns.trackingnumbers = new nlobjSearchColumn('trackingnumbers');
            if (!this.isSCISIntegrationEnabled) {
                return;
            }
            this.columns.origin = new nlobjSearchColumn('formulatext');
            this.columns.origin.setFormula('case when LENGTH({source})>0 then 2 else (case when {location.locationtype.id} = \'' + SC.Configuration.locationTypeMapping.store.internalid + '\' then 1 else 0 end) end');
        },
        setExtraListFilters: function () {
            if (this.data.filter === 'status:open') {
                this.filters.type_operator = 'and';
                this.filters.type = [
                    'type',
                    'anyof',
                    ['SalesOrd']
                ];
                this.filters.status_operator = 'and';
                this.filters.status = [
                    'status',
                    'anyof',
                    [
                        'SalesOrd:A',
                        'SalesOrd:B',
                        'SalesOrd:D',
                        'SalesOrd:E',
                        'SalesOrd:F'
                    ]
                ];
            } else if (this.isSCISIntegrationEnabled) {
                if (this.data.filter === 'origin:instore') {
                    this.filters.scisrecords_operator = 'and';
                    this.filters.scisrecords = [
                        [
                            'type',
                            'anyof',
                            [
                                'CashSale',
                                'CustInvc',
                                'SalesOrd'
                            ]
                        ],
                        'and',
                        [
                            'createdfrom.type',
                            'noneof',
                            ['SalesOrd']
                        ],
                        'and',
                        [
                            'location.locationtype',
                            'is',
                            SC.Configuration.locationTypeMapping.store.internalid
                        ],
                        'and',
                        [
                            'source',
                            'is',
                            '@NONE@'
                        ]
                    ];
                } else {
                    this.filters.scisrecords_operator = 'and';
                    this.filters.scisrecords = [
                        [
                            [
                                'type',
                                'anyof',
                                [
                                    'CashSale',
                                    'CustInvc'
                                ]
                            ],
                            'and',
                            [
                                'createdfrom.type',
                                'noneof',
                                ['SalesOrd']
                            ],
                            'and',
                            [
                                'location.locationtype',
                                'is',
                                SC.Configuration.locationTypeMapping.store.internalid
                            ],
                            'and',
                            [
                                'source',
                                'is',
                                '@NONE@'
                            ]
                        ],
                        'or',
                        [[
                                'type',
                                'anyof',
                                ['SalesOrd']
                            ]]
                    ];
                }
            } else {
                this.filters.type_operator = 'and';
                this.filters.type = [
                    'type',
                    'anyof',
                    ['SalesOrd']
                ];
            }
        },
        mapListResult: function (result, record) {
            result = result || {};
            result.trackingnumbers = record.getValue('trackingnumbers') ? record.getValue('trackingnumbers').split('<BR>') : null;
            if (this.isSCISIntegrationEnabled) {
                result.origin = parseInt(record.getValue(this.columns.origin), 10);
            }
            return result;
        },
        getExtraRecordFields: function () {
            this.getReceipts();
            this.getReturnAuthorizations();
            var origin = 0, applied_to_transaction;
            if (this.isSCISIntegrationEnabled && !this.record.getFieldValue('source') && this.record.getFieldValue('location') && nlapiLookupField(this.result.recordtype, this.result.internalid, 'location.locationtype') === SC.Configuration.locationTypeMapping.store.internalid) {
                origin = 1;
            } else if (this.record.getFieldValue('source')) {
                origin = 2;
            }
            this.result.origin = origin;
            if (this.result.recordtype === 'salesorder') {
                applied_to_transaction = _(_.where(this.result.receipts || [], { recordtype: 'invoice' })).pluck('internalid');
            } else if (this.result.recordtype === 'invoice') {
                applied_to_transaction = [this.result.internalid];
            }
            this.getFulfillments();
            if (applied_to_transaction && applied_to_transaction.length) {
                this.getAdjustments({
                    paymentMethodInformation: true,
                    appliedToTransaction: applied_to_transaction
                });
            }
            this.result.ismultishipto = this.record.getFieldValue('ismultishipto') === 'T';
            this.getLinesGroups();
            this.result.receipts = _.values(this.result.receipts);
            this.result.isReturnable = this.isReturnable();
            this.getPaymentEvent();
            this.result.isCancelable = this.isCancelable();
        },
        getTerms: function () {
            var terms = nlapiLookupField(this.result.recordtype, this.result.internalid, 'terms');
            if (terms) {
                return {
                    internalid: terms,
                    name: nlapiLookupField(this.result.recordtype, this.result.internalid, 'terms', true)
                };
            }
            return null;
        },
        getStatus: function () {
            this.result.status = {
                internalid: nlapiLookupField(this.result.recordtype, this.result.internalid, 'status'),
                name: nlapiLookupField(this.result.recordtype, this.result.internalid, 'status', true)
            };
        },
        getLinesGroups: function () {
            var self = this;
            _.each(this.result.lines, function (line) {
                var line_group_id = '';
                if (self.result.recordtype === 'salesorder') {
                    if (self.isPickupInStoreEnabled && line.fulfillmentChoice === 'pickup' || !self.result.ismultishipto && (!line.isfulfillable || !self.result.shipaddress) || self.result.ismultishipto && (!line.shipaddress || !line.shipmethod)) {
                        if (self.isSCISIntegrationEnabled && self.result.origin === 1 || self.isPickupInStoreEnabled && line.fulfillmentChoice === 'pickup') {
                            line_group_id = 'instore';
                        } else {
                            line_group_id = 'nonshippable';
                        }
                    } else {
                        line_group_id = 'shippable';
                    }
                } else {
                    line_group_id = 'instore';
                }
                line.linegroup = line_group_id;
            });
        },
        getFulfillments: function () {
            if (this.result.recordtype !== 'salesorder') {
                var location = this.record.getFieldValue('location');
                _.each(this.result.lines, function (line) {
                    line.quantityfulfilled = line.quantity;
                    line.location = location;
                });
                return;
            }
            this.result.fulfillments = {};
            var self = this, filters = [
                    new nlobjSearchFilter('internalid', null, 'is', this.result.internalid),
                    new nlobjSearchFilter('mainline', null, 'is', 'F'),
                    new nlobjSearchFilter('shipping', null, 'is', 'F'),
                    new nlobjSearchFilter('taxline', null, 'is', 'F')
                ], columns = [
                    new nlobjSearchColumn('line'),
                    new nlobjSearchColumn('fulfillingtransaction'),
                    new nlobjSearchColumn('quantityshiprecv'),
                    new nlobjSearchColumn('actualshipdate'),
                    new nlobjSearchColumn('quantity', 'fulfillingtransaction'),
                    new nlobjSearchColumn('item', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipmethod', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipto', 'fulfillingtransaction'),
                    new nlobjSearchColumn('trackingnumbers', 'fulfillingtransaction'),
                    new nlobjSearchColumn('trandate', 'fulfillingtransaction'),
                    new nlobjSearchColumn('status', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipaddress', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipaddress1', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipaddress2', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipaddressee', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipattention', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipcity', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipcountry', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipstate', 'fulfillingtransaction'),
                    new nlobjSearchColumn('shipzip', 'fulfillingtransaction')
                ];
            var pick_pack_ship_is_enabled = !!Utils.isFeatureEnabled('PICKPACKSHIP');
            if (pick_pack_ship_is_enabled) {
                columns.push(new nlobjSearchColumn('quantitypicked'));
                columns.push(new nlobjSearchColumn('quantitypacked'));
            }
            Application.getAllSearchResults('salesorder', filters, columns).forEach(function (ffline) {
                var fulfillment_id = ffline.getValue('fulfillingtransaction'), line_internalid = self.result.internalid + '_' + ffline.getValue('line'), line = _.findWhere(self.result.lines, { internalid: line_internalid });
                if (fulfillment_id) {
                    var shipaddress = self.addAddress({
                        internalid: ffline.getValue('shipaddress', 'fulfillingtransaction'),
                        country: ffline.getValue('shipcountry', 'fulfillingtransaction'),
                        state: ffline.getValue('shipstate', 'fulfillingtransaction'),
                        city: ffline.getValue('shipcity', 'fulfillingtransaction'),
                        zip: ffline.getValue('shipzip', 'fulfillingtransaction'),
                        addr1: ffline.getValue('shipaddress1', 'fulfillingtransaction'),
                        addr2: ffline.getValue('shipaddress2', 'fulfillingtransaction'),
                        attention: ffline.getValue('shipattention', 'fulfillingtransaction'),
                        addressee: ffline.getValue('shipaddressee', 'fulfillingtransaction')
                    }, self.result);
                    self.result.fulfillments[fulfillment_id] = self.result.fulfillments[fulfillment_id] || {
                        internalid: fulfillment_id,
                        shipaddress: shipaddress,
                        shipmethod: self.addShippingMethod({
                            internalid: ffline.getValue('shipmethod', 'fulfillingtransaction'),
                            name: ffline.getText('shipmethod', 'fulfillingtransaction')
                        }),
                        date: ffline.getValue('actualshipdate'),
                        trackingnumbers: ffline.getValue('trackingnumbers', 'fulfillingtransaction') ? ffline.getValue('trackingnumbers', 'fulfillingtransaction').split('<BR>') : null,
                        lines: [],
                        status: {
                            internalid: ffline.getValue('status', 'fulfillingtransaction'),
                            name: ffline.getText('status', 'fulfillingtransaction')
                        }
                    };
                    self.result.fulfillments[fulfillment_id].lines.push({
                        internalid: line_internalid,
                        quantity: parseInt(ffline.getValue('quantity', 'fulfillingtransaction'), 10)
                    });
                }
                if (line) {
                    if (line.fulfillmentChoice && line.fulfillmentChoice === 'pickup') {
                        line.quantityfulfilled = parseInt(ffline.getValue('quantityshiprecv') || 0, 10);
                        line.quantitypicked = pick_pack_ship_is_enabled ? parseInt(ffline.getValue('quantitypicked') || 0, 10) - line.quantityfulfilled : 0;
                        line.quantitybackordered = line.quantity - line.quantityfulfilled - line.quantitypicked;
                    } else {
                        line.quantityfulfilled = parseInt(ffline.getValue('quantityshiprecv') || 0, 10);
                        line.quantitypacked = pick_pack_ship_is_enabled ? parseInt(ffline.getValue('quantitypacked') || 0, 10) - line.quantityfulfilled : 0;
                        line.quantitypicked = pick_pack_ship_is_enabled ? parseInt(ffline.getValue('quantitypicked') || 0, 10) - line.quantitypacked - line.quantityfulfilled : 0;
                        line.quantitybackordered = line.quantity - line.quantityfulfilled - line.quantitypacked - line.quantitypicked;
                    }
                }
            });
            this.result.fulfillments = _.values(this.result.fulfillments);
        },
        isReturnable: function () {
            if (this.result.recordtype === 'salesorder') {
                var status_id = this.record.getFieldValue('statusRef');
                return status_id !== 'pendingFulfillment' && status_id !== 'pendingApproval' && status_id !== 'closed' && status_id !== 'canceled';
            } else {
                return true;
            }
        },
        getReceipts: function () {
            this.result.receipts = Transaction.list({
                createdfrom: this.result.internalid,
                types: 'CustInvc,CashSale',
                page: 'all'
            });
        },
        getReturnAuthorizations: function () {
            var created_from = _(this.result.receipts || []).pluck('internalid');
            created_from.push(this.result.internalid);
            this.result.returnauthorizations = ReturnAuthorization.list({
                createdfrom: created_from,
                page: 'all',
                getLines: true
            });
        },
        postGet: function () {
            this.result.lines = _.reject(this.result.lines, function (line) {
                return line.quantity === 0;
            });
        },
        getPaymentEvent: function () {
            if (this.record.getFieldValue('paymethtype') === 'external_checkout') {
                this.result.paymentevent = {
                    holdreason: this.record.getFieldValue('paymenteventholdreason'),
                    redirecturl: ExternalPayment.generateUrl(this.result.internalid, this.result.recordtype)
                };
            } else {
                this.result.paymentevent = {};
            }
        },
        update: function (id, data, headers) {
            var result = 'OK';
            if (data.status === 'cancelled') {
                var url = 'https://' + Application.getHost() + '/app/accounting/transactions/salesordermanager.nl?type=cancel&xml=T&id=' + id, cancel_response = nlapiRequestURL(url, null, headers);
                if (cancel_response.getCode() === 206) {
                    if (nlapiLookupField('salesorder', id, 'statusRef') !== 'cancelled') {
                        result = 'ERR_ALREADY_APPROVED_STATUS';
                    } else {
                        result = 'ERR_ALREADY_CANCELLED_STATUS';
                    }
                }
            }
            return result;
        },
        isCancelable: function () {
            return this.result.recordtype === 'salesorder' && this.result.status.internalid === 'pendingApproval';
        },
        getCreatedFrom: function () {
            var fields = [
                    'createdfrom.tranid',
                    'createdfrom.internalid',
                    'createdfrom.type'
                ], result = nlapiLookupField(this.recordType, this.recordId, fields);
            if (result) {
                this.result.createdfrom = {
                    internalid: result['createdfrom.internalid'],
                    name: result['createdfrom.tranid'],
                    recordtype: result['createdfrom.type']
                };
            }
        },
        getAdjustments: TransactionModelExtensions.getAdjustments,
        getLines: function () {
            Transaction.getLines.apply(this, arguments);
            if (this.isPickupInStoreEnabled) {
                var self = this;
                _.each(this.result.lines, function (line) {
                    line.location = self.record.getLineItemValue('item', 'location', line.index);
                    var item_fulfillment_choice = self.record.getLineItemValue('item', 'itemfulfillmentchoice', line.index);
                    if (item_fulfillment_choice === '1') {
                        line.fulfillmentChoice = 'ship';
                    } else if (item_fulfillment_choice === '2') {
                        line.fulfillmentChoice = 'pickup';
                    }
                });
            }
        },
        getTransactionRecord: function (record_type, id) {
            if (this.isPickupInStoreEnabled && record_type === 'salesorder' && SC.Configuration.pickupInStoreSalesOrderCustomFormId) {
                return nlapiLoadRecord(record_type, id, { customform: SC.Configuration.pickupInStoreSalesOrderCustomFormId });
            } else {
                return Transaction.getTransactionRecord.apply(this, arguments);
            }
        },
        _addTransactionColumnFieldsToOptions: function (line) {
            var self = this;
            var lineFieldsId = self.record.getAllLineItemFields('item');
            _.each(lineFieldsId, function (field) {
                if (field.indexOf('custcol') === 0) {
                    var lineId = line.index;
                    var fieldValue = self.record.getLineItemValue('item', field, lineId);
                    if (fieldValue !== null) {
                        var fieldInf = self.record.getLineItemField('item', field, lineId);
                        line.options.push(self.transactionModelGetLineOptionBuilder(field, fieldInf.label, self.transactionModelGetLineOptionValueBuilder(undefined, fieldValue), fieldInf.mandatory));
                    }
                }
            });
        }
    });
});
define('OrderHistory.ServiceController', [
    'ServiceController',
    'OrderHistory.Model'
], function (ServiceController, OrderHistoryModel) {
    'use strict';
    return ServiceController.extend({
        name: 'OrderHistory.ServiceController',
        options: {
            common: {
                requireLogin: true,
                requirePermissions: {
                    list: [
                        'transactions.tranFind.1',
                        OrderHistoryModel.isSCISIntegrationEnabled ? 'transactions.tranPurchases.1' : 'transactions.tranSalesOrd.1'
                    ]
                }
            }
        },
        get: function () {
            var recordtype = this.request.getParameter('recordtype'), id = this.request.getParameter('internalid');
            if (recordtype && id) {
                return OrderHistoryModel.get(recordtype, id);
            } else {
                return OrderHistoryModel.list({
                    filter: this.request.getParameter('filter'),
                    order: this.request.getParameter('order'),
                    sort: this.request.getParameter('sort'),
                    from: this.request.getParameter('from'),
                    to: this.request.getParameter('to'),
                    origin: this.request.getParameter('origin'),
                    page: this.request.getParameter('page') || 1,
                    results_per_page: this.request.getParameter('results_per_page')
                });
            }
        },
        put: function () {
            var id = this.request.getParameter('internalid'), cancel_result = OrderHistoryModel.update(id, this.data, this.request.getAllHeaders()), record = OrderHistoryModel.get(this.data.recordtype, id);
            record.cancel_response = cancel_result;
            return record;
        }
    });
});
define('Profile.ServiceController', [
    'ServiceController',
    'SC.Models.Init',
    'Profile.Model'
], function (ServiceController, ModelsInit, ProfileModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Profile.ServiceController',
        options: {
            common: { requireLoggedInPPS: true },
            put: { requireLogin: true }
        },
        get: function () {
            return ProfileModel.get();
        },
        put: function () {
            ProfileModel.update(this.data);
            return ProfileModel.get();
        }
    });
});
define('SiteSettings.ServiceController', [
    'ServiceController',
    'SiteSettings.Model'
], function (ServiceController, SiteSettingsModel) {
    'use strict';
    return ServiceController.extend({
        name: 'SiteSettings.ServiceController',
        options: { common: { requireLoggedInPPS: true } },
        get: function () {
            return SiteSettingsModel.get();
        }
    });
});
define('Receipt.Model', [
    'Application',
    'Utils',
    'Transaction.Model'
], function (Application, Utils, TransactionModel) {
    'use strict';
    return TransactionModel.extend({
        name: 'Receipt',
        getStatus: function () {
            this.result.status = {
                internalid: nlapiLookupField(this.result.recordtype, this.result.internalid, 'status'),
                name: nlapiLookupField(this.result.recordtype, this.result.internalid, 'status', true)
            };
        },
        getCreatedFrom: function () {
            var created_from_internalid = nlapiLookupField(this.result.recordtype, this.result.internalid, 'createdfrom'), recordtype = created_from_internalid ? Utils.getTransactionType(created_from_internalid) : '', tranid = recordtype ? nlapiLookupField(recordtype, created_from_internalid, 'tranid') : '';
            this.result.createdfrom = {
                internalid: created_from_internalid,
                name: nlapiLookupField(this.result.recordtype, this.result.internalid, 'createdfrom', true) || '',
                recordtype: recordtype,
                tranid: tranid
            };
        }
    });
});
define('Receipt.ServiceController', [
    'ServiceController',
    'Receipt.Model'
], function (ServiceController, ReceiptModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Receipt.ServiceController',
        options: {
            common: {
                requireLogin: true,
                requirePermissions: {
                    list: [
                        'transactions.tranFind.1',
                        'transactions.tranCashSale.1'
                    ]
                }
            }
        },
        get: function () {
            var id = this.request.getParameter('internalid'), status = this.request.getParameter('status'), page = this.request.getParameter('page');
            return id ? ReceiptModel.get('cashsale', id) : ReceiptModel.list({
                types: 'CashSale',
                status: status,
                page: page
            });
        }
    });
});
define('ReturnAuthorization.ServiceController', [
    'ServiceController',
    'ReturnAuthorization.Model'
], function (ServiceController, ReturnAuthorizationModel) {
    'use strict';
    return ServiceController.extend({
        name: 'ReturnAuthorization.ServiceController',
        options: {
            common: {
                requireLogin: true,
                requirePermissions: {
                    list: [
                        ReturnAuthorizationModel.isSCISIntegrationEnabled ? 'transactions.tranPurchasesReturns.1' : 'transactions.tranRtnAuth.1',
                        'transactions.tranFind.1'
                    ]
                }
            },
            post: { requirePermissions: { extraList: ['transactions.tranRtnAuth.2'] } }
        },
        get: function () {
            var recordtype = this.request.getParameter('recordtype'), id = this.request.getParameter('internalid');
            return id && recordtype ? ReturnAuthorizationModel.get(recordtype, id) : ReturnAuthorizationModel.list({
                order: this.request.getParameter('order'),
                sort: this.request.getParameter('sort'),
                from: this.request.getParameter('from'),
                to: this.request.getParameter('to'),
                page: this.request.getParameter('page')
            });
        },
        post: function () {
            var id = ReturnAuthorizationModel.create(this.data);
            this.sendContent(ReturnAuthorizationModel.get('returnauthorization', id), { 'status': 201 });
        }
    });
});
define('Transaction.ServiceController', [
    'ServiceController',
    'Transaction.Model'
], function (ServiceController, TransactionModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Transaction.ServiceController',
        options: { common: { requireLogin: true } },
        get: function () {
            var id = this.request.getParameter('internalid'), record_type = this.request.getParameter('recordtype');
            if (id && record_type) {
                return TransactionModel.get(record_type, id);
            } else {
                return TransactionModel.list({
                    filter: this.request.getParameter('filter'),
                    order: this.request.getParameter('order'),
                    sort: this.request.getParameter('sort'),
                    from: this.request.getParameter('from'),
                    to: this.request.getParameter('to'),
                    page: this.request.getParameter('page') || 1,
                    types: this.request.getParameter('types'),
                    createdfrom: this.request.getParameter('createdfrom')
                });
            }
        }
    });
});
define('Location.Model', [
    'SC.Model',
    'Application',
    'Utils',
    'Models.Init',
    'SiteSettings.Model',
    'underscore'
], function (SCModel, Application, Utils, ModelsInit, SiteSettings, _) {
    'use strict';
    return SCModel.extend({
        name: 'Location',
        columns: {
            'address1': new nlobjSearchColumn('address1'),
            'address2': new nlobjSearchColumn('address2'),
            'address3': new nlobjSearchColumn('address3'),
            'city': new nlobjSearchColumn('city'),
            'country': new nlobjSearchColumn('country'),
            'state': new nlobjSearchColumn('state'),
            'internalid': new nlobjSearchColumn('internalid'),
            'isinactive': new nlobjSearchColumn('isinactive'),
            'isoffice': new nlobjSearchColumn('isoffice'),
            'makeinventoryavailable': new nlobjSearchColumn('makeinventoryavailable'),
            'makeinventoryavailablestore': new nlobjSearchColumn('makeinventoryavailablestore'),
            'namenohierarchy': new nlobjSearchColumn('namenohierarchy'),
            'phone': new nlobjSearchColumn('phone'),
            'tranprefix': new nlobjSearchColumn('tranprefix'),
            'zip': new nlobjSearchColumn('zip'),
            'latitude': new nlobjSearchColumn('latitude'),
            'longitude': new nlobjSearchColumn('longitude'),
            'locationtype:': new nlobjSearchColumn('locationtype')
        },
        list: function (data) {
            return this.search(data);
        },
        get: function (data) {
            this.result = {};
            this.data = data;
            var internalid = _.isArray(this.data.internalid) ? this.data.internalid : this.data.internalid.split(','), search_results = this.search(data);
            if (internalid.length === 1) {
                this.result = search_results[0];
            } else {
                this.result = search_results;
            }
            return this.result;
        },
        isPickupInStoreEnabled: SiteSettings.isPickupInStoreEnabled(),
        search: function (data) {
            var result = {}, records = [], self = this;
            this.filters = [];
            this.data = data;
            this.filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
            if (this.data.locationtype) {
                var location_type = _.isArray(this.data.locationtype) ? this.data.locationtype : this.data.locationtype.split(',');
                this.filters.push(new nlobjSearchFilter('locationtype', null, 'anyof', location_type));
            }
            if (this.data.latitude && this.data.longitude) {
                this.filters.push(new nlobjSearchFilter('latitude', null, 'isnotempty'));
                this.filters.push(new nlobjSearchFilter('longitude', null, 'isnotempty'));
                var formula = this.getDistanceFormulates();
                if (this.data.radius) {
                    this.filters.push(new nlobjSearchFilter('formulanumeric', null, 'lessthan', this.data.radius).setFormula(formula));
                }
                this.filters.push(new nlobjSearchFilter('formulanumeric', null, 'noneof', '@NONE@'));
                this.columns.distance = new nlobjSearchColumn('formulanumeric').setFormula(formula).setFunction('roundToTenths');
            }
            if (this.data.internalid) {
                var internalid = _.isArray(this.data.internalid) ? this.data.internalid : this.data.internalid.split(',');
                this.filters.push(new nlobjSearchFilter('internalid', null, 'anyof', internalid));
            }
            if (this.data.subsidiary) {
                var subsidiary = _.isArray(this.data.subsidiary) ? this.data.subsidiary : this.data.subsidiary.split(',');
                this.filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof', subsidiary));
            }
            if (this.data.sort) {
                _.each(this.data.sort.split(','), function (column_name) {
                    if (self.columns[column_name]) {
                        self.columns[column_name].setSort(self.data.order >= 0);
                    }
                });
            }
            if (this.isPickupInStoreEnabled) {
                this.columns.allowstorepickup = new nlobjSearchColumn('allowstorepickup');
                this.columns.timezone = new nlobjSearchColumn('timezone');
                this.columns.nextpickupcutofftime = new nlobjSearchColumn('nextpickupcutofftime');
            }
            if (this.data.page === 'all') {
                this.search_results = Application.getAllSearchResults('location', _.values(this.filters), _.values(this.columns));
            } else {
                this.search_results = Application.getPaginatedSearchResults({
                    record_type: 'location',
                    filters: _.values(this.filters),
                    columns: _.values(this.columns),
                    page: this.data.page || 1,
                    results_per_page: this.data.results_per_page
                });
            }
            var results = (this.data.page === 'all' ? this.search_results : this.search_results.records) || [] || [];
            if (this.isPickupInStoreEnabled) {
                this.searchServiceHoursResults = this.searchServiceHours(_.map(results, function (record) {
                    return record.getId();
                }));
            }
            _.each(results, function (record) {
                records.push(self.getRecordValues(record));
            });
            if (this.data.page === 'all' || this.data.internalid) {
                result = records;
            } else {
                result = this.search_results;
                result.records = records;
            }
            return result;
        },
        searchServiceHours: function (ids) {
            if (!ids || !ids.length) {
                return [];
            }
            var filters = [
                    new nlobjSearchFilter('internalid', null, 'anyof', ids),
                    new nlobjSearchFilter('starttime', null, 'isnotempty')
                ], columns = [
                    new nlobjSearchColumn('ismonday'),
                    new nlobjSearchColumn('istuesday'),
                    new nlobjSearchColumn('iswednesday'),
                    new nlobjSearchColumn('isthursday'),
                    new nlobjSearchColumn('isfriday'),
                    new nlobjSearchColumn('issaturday'),
                    new nlobjSearchColumn('issunday'),
                    new nlobjSearchColumn('starttime'),
                    new nlobjSearchColumn('endtime'),
                    new nlobjSearchColumn('internalid')
                ];
            return Application.getAllSearchResults('location', filters, columns);
        },
        getServiceHours: function (id) {
            var records = _.filter(this.searchServiceHoursResults || [], function (record) {
                return record.getId() === id;
            });
            return _.map(records, function (record) {
                return {
                    starttime: record.getValue('starttime'),
                    endtime: record.getValue('endtime'),
                    monday: record.getValue('ismonday'),
                    tuesday: record.getValue('istuesday'),
                    wednesday: record.getValue('iswednesday'),
                    thursday: record.getValue('isthursday'),
                    friday: record.getValue('isfriday'),
                    saturday: record.getValue('issaturday'),
                    sunday: record.getValue('issunday')
                };
            });
        },
        getFriendlyName: function (id) {
            if (SC.Configuration.storeLocator && SC.Configuration.storeLocator.customFriendlyName) {
                try {
                    return nlapiLookupField('location', id, SC.Configuration.storeLocator.customFriendlyName);
                } catch (error) {
                    return '';
                }
            }
            return '';
        },
        getDistanceFormulates: function () {
            var PI = Math.PI, R = SC.Configuration.storeLocator.distanceUnit === 'mi' ? 3959 : 6371, lat = this.data.latitude * PI / 180, lon = this.data.longitude * PI / 180, formula = R + ' * (2 * ATAN2(SQRT((SIN((' + lat + '- ({latitude} * ' + PI + ' / 180)) / 2) *' + 'SIN((' + lat + '- ({latitude} * ' + PI + ' / 180)) / 2) + ' + 'COS(({latitude} * ' + PI + ' / 180)) * COS(' + lat + ') *' + 'SIN((' + lon + '- ({longitude} * ' + PI + ' / 180)) /2) *' + 'SIN((' + lon + '- ({longitude} * ' + PI + ' / 180)) /2))),' + 'SQRT(1 - (SIN((' + lat + '- ({latitude} * ' + PI + ' / 180)) / 2) *' + 'SIN((' + lat + '- ({latitude} * ' + PI + ' / 180)) / 2) +' + 'COS(({latitude} * ' + PI + ' / 180)) * COS(' + lat + ') * ' + 'SIN((' + lon + '- ({longitude} * ' + PI + ' / 180)) /2) * ' + 'SIN((' + lon + '- ({longitude} * ' + PI + ' / 180)) /2)))))';
            return formula;
        },
        getRecordValues: function (record) {
            var map_result = {}, id = record.getValue('internalid'), friendlyName = this.getFriendlyName(id);
            map_result.recordtype = record.getRecordType();
            map_result.internalid = id;
            map_result.address1 = record.getValue('address1');
            map_result.address2 = record.getValue('address2');
            map_result.address3 = record.getValue('address3');
            map_result.city = record.getValue('city');
            map_result.country = record.getValue('country');
            map_result.state = record.getValue('state');
            map_result.isoffice = record.getValue('isoffice');
            map_result.makeinventoryavailable = record.getValue('makeinventoryavailable');
            map_result.makeinventoryavailablestore = record.getValue('makeinventoryavailablestore');
            map_result.name = friendlyName !== '' ? friendlyName : record.getValue('namenohierarchy');
            map_result.phone = record.getValue('phone');
            map_result.zip = record.getValue('zip');
            map_result.location = {
                latitude: record.getValue('latitude'),
                longitude: record.getValue('longitude')
            };
            map_result.locationtype = record.getValue('locationtype');
            if (this.data.latitude && this.data.longitude) {
                var distance = Math.round(record.getValue('formulanumeric') * 10) / 10;
                if (!_.isUndefined(distance)) {
                    map_result.distance = Math.round(record.getValue('formulanumeric') * 10) / 10;
                    map_result.distanceunit = SC.Configuration.storeLocator.distanceUnit;
                }
            }
            if (this.isPickupInStoreEnabled) {
                map_result.servicehours = this.getServiceHours(id);
                map_result.timezone = {
                    text: record.getText('timezone'),
                    value: record.getValue('timezone')
                };
                map_result.allowstorepickup = record.getValue('allowstorepickup') === 'T';
                if (map_result.allowstorepickup) {
                    map_result.nextpickupcutofftime = record.getValue('nextpickupcutofftime');
                    var next_pickup_cut_off_time_date = map_result.nextpickupcutofftime && map_result.nextpickupcutofftime !== ' ' && nlapiStringToDate(map_result.nextpickupcutofftime);
                    if (next_pickup_cut_off_time_date) {
                        var current_date = Utils.getTodayDate(), days_of_the_week = [
                                'sunday',
                                'monday',
                                'tuesday',
                                'wednesday',
                                'thursday',
                                'friday',
                                'saturday'
                            ];
                        if (current_date.getDay() === next_pickup_cut_off_time_date.getDay()) {
                            map_result.nextpickupday = 'today';
                        } else if (current_date.getDay() + 1 === next_pickup_cut_off_time_date.getDay()) {
                            map_result.nextpickupday = 'tomorrow';
                        } else {
                            map_result.nextpickupday = days_of_the_week[next_pickup_cut_off_time_date.getDay()];
                        }
                        map_result.nextpickuphour = nlapiDateToString(next_pickup_cut_off_time_date, 'timeofday');
                    } else {
                        map_result.nextpickupday = null;
                        map_result.nextpickuphour = null;
                        map_result.nextpickupcutofftime = null;
                    }
                }
            }
            return map_result;
        }
    });
});
define('Location.ServiceController', [
    'ServiceController',
    'Location.Model'
], function (ServiceController, LocationModel) {
    'use strict';
    return ServiceController.extend({
        name: 'Location.ServiceController',
        get: function () {
            var id = this.request.getParameter('internalid');
            if (id) {
                return LocationModel.get({ internalid: id });
            } else {
                return LocationModel.list({
                    'latitude': this.request.getParameter('latitude'),
                    'longitude': this.request.getParameter('longitude'),
                    'radius': this.request.getParameter('radius'),
                    'sort': this.request.getParameter('sort'),
                    'page': this.request.getParameter('page'),
                    'locationtype': this.request.getParameter('locationtype'),
                    'results_per_page': this.request.getParameter('results_per_page')
                });
            }
        }
    });
});
define('Quote.Model', [
    'Transaction.Model',
    'Transaction.Model.Extensions',
    'Utils',
    'Application',
    'underscore'
], function (TransactionModel, TransactionModelExtensions, Utils, Application, _) {
    'use strict';
    var QuoteToSalesOrderValidatorModel;
    try {
        QuoteToSalesOrderValidatorModel = require('QuoteToSalesOrderValidator.Model');
    } catch (e) {
    }
    return TransactionModel.extend({
        name: 'Quote',
        _isCreatingARecord: function () {
            return this.recordId === 'null';
        },
        getTransactionRecord: function () {
            if (this.record) {
                return this.record;
            }
            if (!this._isCreatingARecord()) {
                return TransactionModel.getTransactionRecord.apply(this, arguments);
            }
            return nlapiCreateRecord('estimate', { recordmode: 'dynamic' });
        },
        getExtraRecordFields: function () {
            if (!this._isCreatingARecord()) {
                this.getEntityStatus();
            }
            this.result.statusRef = this.record.getFieldValue('statusRef');
            this.result.message = Utils.sanitizeString(this.record.getFieldValue('message'));
            this.result.allowToPurchase = Application.getPermissions().transactions.tranSalesOrd >= 2;
            this.result.isOpen = this.record.getFieldValue('statusRef') === 'open';
            if (!this._isCreatingARecord()) {
                this.getSalesRep();
                this.result.purchasablestatus = QuoteToSalesOrderValidatorModel ? QuoteToSalesOrderValidatorModel.getQuoteToSalesOrderValidation(this.result) : {};
            } else {
                this.result.salesrep = {
                    name: this.record.getFieldText('salesrep'),
                    internalid: this.record.getFieldValue('salesrep')
                };
            }
            this.getDiscountInformation();
            this.getDueDate();
        },
        getRecordAddresses: function () {
            this.result.addresses = {};
            this.result.listAddresseByIdTmp = {};
            for (var i = 1; i <= this.record.getLineItemCount('iladdrbook'); i++) {
                this.result.listAddresseByIdTmp[this.record.getLineItemValue('iladdrbook', 'iladdrinternalid', i)] = this.addAddress({
                    internalid: this.record.getLineItemValue('iladdrbook', 'iladdrinternalid', i),
                    country: this.record.getLineItemValue('iladdrbook', 'iladdrshipcountry', i),
                    state: this.record.getLineItemValue('iladdrbook', 'iladdrshipstate', i),
                    city: this.record.getLineItemValue('iladdrbook', 'iladdrshipcity', i),
                    zip: this.record.getLineItemValue('iladdrbook', 'iladdrshipzip', i),
                    addr1: this.record.getLineItemValue('iladdrbook', 'iladdrshipaddr1', i),
                    addr2: this.record.getLineItemValue('iladdrbook', 'iladdrshipaddr2', i),
                    attention: this.record.getLineItemValue('iladdrbook', 'iladdrshipattention', i),
                    addressee: this.record.getLineItemValue('iladdrbook', 'iladdrshipaddressee', i),
                    phone: this.record.getLineItemValue('iladdrbook', 'iladdrshipphone', i)
                });
            }
            this.result.shipaddress = this.addAddress({
                internalid: this.record.getFieldValue('shipaddresslist'),
                country: this.record.getFieldValue('shipcountry'),
                state: this.record.getFieldValue('shipstate'),
                city: this.record.getFieldValue('shipcity'),
                zip: this.record.getFieldValue('shipzip'),
                addr1: this.record.getFieldValue('shipaddr1'),
                addr2: this.record.getFieldValue('shipaddr2'),
                attention: this.record.getFieldValue('shipattention'),
                addressee: this.record.getFieldValue('shipaddressee'),
                phone: this.record.getFieldValue('shipphone')
            });
            this.result.billaddress = this.addAddress({
                internalid: this.record.getFieldValue('billaddresslist'),
                country: this.record.getFieldValue('billcountry'),
                state: this.record.getFieldValue('billstate'),
                city: this.record.getFieldValue('billcity'),
                zip: this.record.getFieldValue('billzip'),
                addr1: this.record.getFieldValue('billaddr1'),
                addr2: this.record.getFieldValue('billaddr2'),
                attention: this.record.getFieldValue('billattention'),
                addressee: this.record.getFieldValue('billaddressee'),
                phone: this.record.getFieldValue('billphone')
            });
        },
        getAddressInternalId: function (address) {
            if (_.isNaN(parseInt(address.internalid, 10))) {
                return TransactionModel.getAddressInternalId.apply(this, arguments);
            }
            return address.internalid;
        },
        _getQuoteStatus: function (estimate_id) {
            var estimates = nlapiSearchRecord('estimate', null, [
                [
                    'internalid',
                    'is',
                    estimate_id
                ],
                'and',
                [
                    'mainline',
                    'is',
                    'T'
                ]
            ], [new nlobjSearchColumn('entitystatus')]);
            return estimates[0];
        },
        getEntityStatus: function () {
            var estimate_aux = this._getQuoteStatus(this.record.getId());
            this.result.entitystatus = {
                id: estimate_aux.getValue('entitystatus'),
                name: estimate_aux.getText('entitystatus')
            };
        },
        getDiscountInformation: function () {
            this.result.discount = this.record.getFieldValue('discountitem') ? {
                internalid: this.record.getFieldValue('discountitem'),
                name: this.record.getFieldText('discountitem'),
                rate: this.record.getFieldValue('discountrate')
            } : null;
        },
        getDueDate: function () {
            var duedate = this.record.getFieldValue('duedate'), now = new Date().getTime();
            this.result.duedate = duedate;
            this.result.isOverdue = this.isDateInterval(new Date(nlapiStringToDate(duedate)).getTime() - now);
            this.result.isCloseOverdue = this.isDateInterval(new Date(nlapiStringToDate(duedate)).getTime() - (now + this.getDaysBeforeExpiration()));
            this.result.expectedclosedate = this.record.getFieldValue('expectedclosedate');
        },
        setExtraListColumns: function () {
            this.columns.duedate = new nlobjSearchColumn('duedate');
            this.columns.expectedclosedate = new nlobjSearchColumn('expectedclosedate');
            this.columns.entitystatus = new nlobjSearchColumn('entitystatus');
            this.columns.total = new nlobjSearchColumn('total');
        },
        setExtraListFilters: function () {
            if (this.data.filter && this.data.filter !== 'ALL') {
                this.filters.entitystatus_operator = 'and';
                this.filters.entitystatus = [
                    'entitystatus',
                    'is',
                    this.data.filter
                ];
            }
        },
        mapListResult: function (result, record) {
            var duedate = record.getValue('duedate'), now = new Date().getTime();
            result.duedate = duedate;
            result.isOverdue = this.isDateInterval(new Date(nlapiStringToDate(duedate)).getTime() - now);
            result.isCloseOverdue = this.isDateInterval(new Date(nlapiStringToDate(duedate)).getTime() - (now + this.getDaysBeforeExpiration()));
            result.expectedclosedate = record.getValue('expectedclosedate');
            result.entitystatus = {
                id: record.getValue('entitystatus'),
                name: record.getText('entitystatus')
            };
            result.total = Utils.toCurrency(record.getValue('total'));
            result.total_formatted = Utils.formatCurrency(record.getValue('total'));
            return result;
        },
        isDateInterval: function (date) {
            return date <= 0 && -1 * date / 1000 / 60 / 60 / 24 >= 1;
        },
        getDaysBeforeExpiration: function () {
            return SC.Configuration.quote.daysToExpire * 24 * 60 * 60 * 1000;
        },
        getSalesRepFromId: function (quote_id) {
            var salesrep = {};
            var search_result = nlapiLookupField('estimate', quote_id, [
                'salesrep.phone',
                'salesrep.email',
                'salesrep.entityid',
                'salesrep.mobilephone',
                'salesrep.fax',
                'salesrep'
            ]);
            if (search_result) {
                salesrep.phone = search_result['salesrep.phone'];
                salesrep.email = search_result['salesrep.email'];
                salesrep.fullname = search_result['salesrep.entityid'];
                salesrep.name = search_result['salesrep.entityid'];
                salesrep.mobilephone = search_result['salesrep.mobilephone'];
                salesrep.fax = search_result['salesrep.fax'];
                salesrep.internalid = search_result.salesrep;
            }
            return salesrep;
        },
        postSubmitRecord: function (confirmation_result) {
            var created_salesorder = nlapiLookupField('estimate', confirmation_result.internalid, ['tranid']) || {};
            confirmation_result.tranid = created_salesorder.tranid;
            confirmation_result.salesrep = this.getSalesRepFromId(confirmation_result.internalid);
            confirmation_result.confirmationnumber = created_salesorder.tranid;
            return confirmation_result;
        },
        getSalesRep: TransactionModelExtensions.getSalesRep
    });
});
define('Quote.ServiceController', [
    'ServiceController',
    'Quote.Model'
], function (ServiceController, QuoteModel) {
    'use strict';
    try {
        return ServiceController.extend({
            name: 'Quote.ServiceController',
            options: {
                common: {
                    requireLogin: true,
                    requirePermissions: {
                        list: [
                            'transactions.tranEstimate.1',
                            'transactions.tranFind.1'
                        ]
                    }
                }
            },
            get: function () {
                var id = this.request.getParameter('internalid');
                if (id) {
                    return QuoteModel.get('estimate', id);
                } else {
                    return QuoteModel.list({
                        filter: this.request.getParameter('filter'),
                        order: this.request.getParameter('order'),
                        sort: this.request.getParameter('sort'),
                        from: this.request.getParameter('from'),
                        to: this.request.getParameter('to'),
                        page: this.request.getParameter('page') || 1,
                        types: this.request.getParameter('types')
                    });
                }
            },
            post: function () {
                QuoteModel.update('estimate', this.data.internalid || 'null', this.data);
                var order_info = QuoteModel.get('estimate', this.data.internalid || 'null');
                order_info.confirmation = QuoteModel.submit();
                return order_info;
            },
            put: function () {
                QuoteModel.update('estimate', this.data.internalid, this.data);
                return QuoteModel.get('estimate', this.data.internalid);
            }
        });
    } catch (e) {
        console.warn('QuotePos.Service.ss' + e.name, e);
        this.sendError(e);
    }
});
define('jQuery.Deferred', function () {
    var deletedIds = [];
    var slice = deletedIds.slice;
    var concat = deletedIds.concat;
    var push = deletedIds.push;
    var indexOf = deletedIds.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var strundefined = typeof undefined;
    var version = '1.11.1', jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);
        }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: '',
        length: 0,
        toArray: function () {
            return slice.call(this);
        },
        get: function (num) {
            return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function (elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function (callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };
    jQuery.extend = jQuery.fn.extend = function () {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== 'object' && !jQuery.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),
        isReady: true,
        error: function (msg) {
            throw new Error(msg);
        },
        noop: function () {
        },
        isFunction: function (obj) {
            return jQuery.type(obj) === 'function';
        },
        isArray: Array.isArray || function (obj) {
            return jQuery.type(obj) === 'array';
        },
        isWindow: function (obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function (obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
        },
        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        isPlainObject: function (obj) {
            var key;
            if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }
            for (key in obj) {
            }
            return key === undefined || hasOwn.call(obj, key);
        },
        type: function (obj) {
            if (obj == null) {
                return obj + '';
            }
            return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
        },
        globalEval: function (data) {
            if (data && jQuery.trim(data)) {
                (window.execScript || function (data) {
                    window['eval'].call(window, data);
                })(data);
            }
        },
        camelCase: function (string) {
            return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
        },
        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function (obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        trim: function (text) {
            return text == null ? '' : (text + '').replace(rtrim, '');
        },
        makeArray: function (arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function (elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }
            return -1;
        },
        merge: function (first, second) {
            var len = +second.length, j = 0, i = first.length;
            while (j < len) {
                first[i++] = second[j++];
            }
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        grep: function (elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function (elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function (fn, context) {
            var args, proxy, tmp;
            if (typeof context === 'string') {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        now: function () {
            return +new Date();
        },
        support: support
    });
    jQuery.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (i, name) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });
    function isArraylike(obj) {
        var length = obj.length, type = jQuery.type(obj);
        if (type === 'function' || jQuery.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
    }
    var rnotwhite = /\S+/g;
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function (options) {
        options = typeof options === 'string' ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [], stack = !options.once && [], fire = function (data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false;
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            }, self = {
                add: function () {
                    if (list) {
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                var type = jQuery.type(arg);
                                if (type === 'function') {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && type !== 'string') {
                                    add(arg);
                                }
                            });
                        }(arguments));
                        if (firing) {
                            firingLength = list.length;
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                remove: function () {
                    if (list) {
                        jQuery.each(arguments, function (_, arg) {
                            var index;
                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                has: function (fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
                },
                empty: function () {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                disable: function () {
                    list = stack = memory = undefined;
                    return this;
                },
                disabled: function () {
                    return !list;
                },
                lock: function () {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                locked: function () {
                    return !stack;
                },
                fireWith: function (context, args) {
                    if (list && (!fired || stack)) {
                        args = args || [];
                        args = [
                            context,
                            args.slice ? args.slice() : args
                        ];
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function () {
                    return !!fired;
                }
            };
        return self;
    };
    jQuery.extend({
        Deferred: function (func) {
            var tuples = [
                    [
                        'resolve',
                        'done',
                        jQuery.Callbacks('once memory'),
                        'resolved'
                    ],
                    [
                        'reject',
                        'fail',
                        jQuery.Callbacks('once memory'),
                        'rejected'
                    ],
                    [
                        'notify',
                        'progress',
                        jQuery.Callbacks('memory')
                    ]
                ], state = 'pending', promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function () {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                    } else {
                                        newDefer[tuple[0] + 'With'](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                }, deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function () {
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + 'With'](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + 'With'] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function (subordinate) {
            var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function (i, contexts, values) {
                    return function (value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);
                        } else if (!--remaining) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    if (typeof define === 'function' && define.amd) {
        define('jquery', [], function () {
            return jQuery;
        });
    }
    var _jQuery = window.jQuery, _$ = window.$;
    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
});
define('SC.CancelableEvents', [
    'Utils',
    'underscore',
    'jQuery.Deferred'
], function (Utils, _, jQuery) {
    'use strict';
    return {
        cancelableOn: function cancelableOn(event_name, handler) {
            this._cancelableOn(this, event_name, handler);
        },
        cancelableOff: function cancelableOff(event_name, handler) {
            if (!_.isString(event_name) || !_.isFunction(handler)) {
                throw {
                    status: SC.ERROR_IDENTIFIERS.invalidParameter.status,
                    code: SC.ERROR_IDENTIFIERS.invalidParameter.code,
                    message: 'Parameter "event_name" and "handler" must be String and Function respectively'
                };
            }
            this._cancelableOff(this, event_name, handler);
        },
        _cancelableOff: function _cancelableOff(events_container_entity, event_name, handler) {
            if (!events_container_entity || !events_container_entity._cancelableEvents || !events_container_entity._cancelableEvents[event_name] || !events_container_entity._cancelableEvents[event_name].length) {
                return events_container_entity;
            }
            events_container_entity._cancelableEvents[event_name] = _.reject(events_container_entity._cancelableEvents[event_name], function (event_object) {
                return event_object.fn === handler;
            });
            return events_container_entity;
        },
        _cancelableOn: function _cancelableOn(events_container_entity, event_name, handler) {
            events_container_entity._cancelableEvents = events_container_entity._cancelableEvents || {};
            var event_handlers = events_container_entity._cancelableEvents[event_name] = events_container_entity._cancelableEvents[event_name] || [];
            event_handlers.push({ fn: handler });
            return events_container_entity;
        },
        cancelableDisable: function cancelableDisable(event_name) {
            if (!_.isString(event_name)) {
                throw {
                    status: SC.ERROR_IDENTIFIERS.invalidParameter.status,
                    code: SC.ERROR_IDENTIFIERS.invalidParameter.code,
                    message: 'Parameter "event_name" must be String'
                };
            }
            this._cancelableDisable(this, event_name);
        },
        _cancelableDisable: function _cancelableDisable(events_container_entity, event_name) {
            events_container_entity._cancelableEvents = events_container_entity._cancelableEvents || {};
            events_container_entity._cancelableDisabledEvents = events_container_entity._cancelableDisabledEvents || {};
            events_container_entity._cancelableDisabledEvents[event_name] = events_container_entity._cancelableDisabledEvents[event_name] || [];
            if (_.isEmpty(events_container_entity._cancelableDisabledEvents[event_name])) {
                events_container_entity._cancelableDisabledEvents[event_name] = events_container_entity._cancelableEvents[event_name] || [];
                events_container_entity._cancelableEvents[event_name] = [];
            }
            return events_container_entity;
        },
        cancelableEnable: function cancelableEnable(event_name) {
            if (!_.isString(event_name)) {
                throw {
                    status: SC.ERROR_IDENTIFIERS.invalidParameter.status,
                    code: SC.ERROR_IDENTIFIERS.invalidParameter.code,
                    message: 'Parameter "event_name" must be String'
                };
            }
            this._cancelableEnable(this, event_name);
        },
        _cancelableEnable: function _cancelableEnable(events_container_entity, event_name) {
            events_container_entity._cancelableEvents = events_container_entity._cancelableEvents || {};
            events_container_entity._cancelableDisabledEvents = events_container_entity._cancelableDisabledEvents || {};
            events_container_entity._cancelableDisabledEvents[event_name] = events_container_entity._cancelableDisabledEvents[event_name] || [];
            if (!_.isEmpty(events_container_entity._cancelableDisabledEvents[event_name])) {
                events_container_entity._cancelableEvents[event_name] = _.union(events_container_entity._cancelableEvents[event_name] || [], events_container_entity._cancelableDisabledEvents[event_name]);
                events_container_entity._cancelableDisabledEvents[event_name] = [];
            }
            return events_container_entity;
        },
        cancelableTrigger: function cancelableTrigger(event_name) {
            var args = Array.prototype.slice.call(arguments).slice(1);
            return this._cancelableTrigger(this, event_name, args, true);
        },
        cancelableTriggerUnsafe: function cancelableTriggerUnsafe(event_name) {
            var args = Array.prototype.slice.call(arguments).slice(1);
            return this._cancelableTrigger(this, event_name, args, false);
        },
        _cancelableTrigger: function _cancelableTrigger(events_container_entity, event_name, args, safe_parameters) {
            var self = this;
            if (!events_container_entity || !events_container_entity._cancelableEvents || !events_container_entity._cancelableEvents[event_name] || !events_container_entity._cancelableEvents[event_name].length) {
                return jQuery.Deferred().resolve();
            } else {
                var event_handler_promises = _.map(events_container_entity._cancelableEvents[event_name], function (event_handler_container) {
                    try {
                        return event_handler_container.fn.apply(null, safe_parameters ? _.map(args, self._getSafeParameter) : args);
                    } catch (e) {
                        console.log('SCA_EXTENSIBILITY_LAYER_ERROR', 'Exception on event handler for event ' + event_name, e);
                        console.log('SCA_EXTENSIBILITY_LAYER_ERROR_STACK', e.stack);
                        return jQuery.Deferred().reject(e);
                    }
                });
                return jQuery.when.apply(jQuery, event_handler_promises);
            }
        },
        _getSafeParameter: function _getSafeParameter(original_intent) {
            return _.isUndefined(original_intent) ? original_intent : Utils.deepCopy(original_intent);
        }
    };
});
define('SC.BaseComponent', [
    'SC.CancelableEvents',
    'Application',
    'Utils',
    'jQuery.Deferred',
    'underscore'
], function (SCCancelableEvents, Application, Utils, jQuery, _) {
    'use strict';
    var methods_to_async;
    var _asyncToSync = function _asyncToSync(async_fn) {
        return function synchronousWrapper() {
            var result_sync, result_error, args = Array.prototype.slice.call(arguments);
            async_fn.apply(this, args).done(function asyncSuccess(result) {
                result_sync = result;
            }).fail(function asyncFail(error) {
                result_error = error;
            });
            if (result_error) {
                throw result_error;
            }
            return result_sync;
        };
    };
    var base_component = _.extend({
        extend: function extend(child_component) {
            if (!child_component || !child_component.componentName && !this.componentName) {
                return this._reportError('INVALID_PARAM', 'Invalid SC.Component. Property "componentName" is required.');
            }
            methods_to_async = _.filter(_.keys(child_component), function (key) {
                return _.isFunction(child_component[key]) && key.indexOf('_') !== 0;
            });
            return _.extend({}, this, child_component);
        },
        _reportError: function _reportError(code, description) {
            var error = new Error(description);
            error.name = code;
            throw error;
        },
        _asyncErrorHandle: function _asyncErrorHandle(deferred) {
            return function (error) {
                if (error) {
                    deferred.reject();
                    throw error;
                }
            };
        },
        _exposeAPIEvent: function _exposeAPIEvent() {
            var result = jQuery.Deferred(), args = Array.prototype.slice.call(arguments);
            this.cancelableTrigger.apply(this, args).fail(this._asyncErrorHandle(result)).done(result.resolve);
            return result;
        },
        _generateSyncMethods: function _generateSyncMethods() {
            var self = this;
            _.each(methods_to_async, function (method_name) {
                self[method_name + 'Sync'] = _asyncToSync(self[method_name]);
            });
        },
        _suscribeToInnerEvents: function _suscribeToInnerEvents(innerToOuterMap) {
            var self = this;
            _.map(innerToOuterMap, function (innerToOuter) {
                Application.on(innerToOuter.inner, function () {
                    var args = Utils.deepCopy(Array.prototype.slice.call(arguments, 1));
                    args = innerToOuter.normalize ? innerToOuter.normalize.call(self, args) : args;
                    args = _.isArray(args) ? args : [args];
                    args.unshift(innerToOuter.outer);
                    _.each(innerToOuter.disableEvents || [], function (event_name) {
                        self.cancelableDisable(event_name);
                    });
                    _.each(innerToOuter.enableEvents || [], function (event_name) {
                        self.cancelableEnable(event_name);
                    });
                    return self._exposeAPIEvent.apply(self, args);
                });
            });
        }
    }, SCCancelableEvents);
    base_component.on = base_component.cancelableOn;
    base_component.off = base_component.cancelableOff;
    return base_component;
});
define('Cart.Component.DataValidator', function () {
    'use strict';
    var new_line_schema = {
        required: true,
        type: 'object',
        properties: {
            internalid: { type: 'string' },
            quantity: {
                required: true,
                type: 'number'
            },
            item: {
                required: true,
                type: 'object',
                properties: {
                    internalid: {
                        required: true,
                        type: 'number'
                    },
                    itemtype: {
                        required: true,
                        type: 'string'
                    }
                }
            },
            options: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        cartOptionId: {
                            required: true,
                            type: 'string'
                        },
                        value: {
                            required: true,
                            type: 'object',
                            properties: {
                                internalid: {
                                    required: true,
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            shipaddress: { type: 'string' },
            shipmethod: { type: 'string' },
            amount: { type: 'number' },
            note: { type: 'string' }
        }
    };
    var edit_line_schema = {
        required: true,
        type: 'object',
        properties: {
            internalid: {
                required: true,
                type: 'string'
            },
            quantity: {
                required: true,
                type: 'number'
            },
            item: {
                required: true,
                type: 'object',
                properties: {
                    internalid: {
                        required: true,
                        type: 'number'
                    }
                }
            },
            options: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        cartOptionId: {
                            required: true,
                            type: 'string'
                        },
                        value: {
                            required: true,
                            type: 'object',
                            properties: {
                                internalid: {
                                    required: true,
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            shipaddress: { type: 'string' },
            shipmethod: { type: 'string' },
            amount: { type: 'number' },
            note: { type: 'string' }
        }
    };
    return {
        newLineSchema: new_line_schema,
        editLineSchema: edit_line_schema
    };
});
define('ICart.Component', [
    'SC.BaseComponent',
    'Cart.Component.DataValidator',
    'SC.Models.Init',
    'Utils',
    'Application',
    'underscore'
], function (SCBaseComponent, CartComponentDataValidator, ModelsInit, Utils, Application, _) {
    'use strict';
    var StoreItem;
    try {
        StoreItem = require('StoreItem.Model');
    } catch (e) {
    }
    var isMyJsonValid, new_line_validator = isMyJsonValid && isMyJsonValid(CartComponentDataValidator.newLineSchema), edit_line_validator = isMyJsonValid && isMyJsonValid(CartComponentDataValidator.editLineSchema);
    var format = function format(entity, commonAttrs) {
            var formatted = { extras: {} };
            _.keys(entity).forEach(function (attr) {
                if (_.contains(commonAttrs, attr)) {
                    formatted[attr] = entity[attr];
                } else {
                    formatted.extras[attr] = entity[attr];
                }
            });
            return formatted;
        }, icart_component = SCBaseComponent.extend({
            componentName: 'Cart',
            _validateLine: function _validateLine(line) {
                if (new_line_validator && !new_line_validator(line)) {
                    var errors = _.reduce(new_line_validator.errors, function (memo, error) {
                        return memo + ' ' + error.field + ' ' + error.message;
                    }, '');
                    this._reportError('INVALID_PARAM', 'Invalid line: ' + errors);
                }
            },
            _validateEditLine: function _validateEditLine(line) {
                if (edit_line_validator && !edit_line_validator(line)) {
                    var errors = _.reduce(edit_line_validator.errors, function (memo, error) {
                        return memo + ' ' + error.field + ' ' + error.message;
                    }, '');
                    this._reportError('INVALID_PARAM', 'Invalid line: ' + errors);
                }
            },
            addLine: function addLine(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            addLines: function addLines(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            getLines: function getLines() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            removeLine: function removeLine(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            updateLine: function updateLine(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            getSummary: function getSummary() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            submit: function submit() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            addPayment: function addPayment() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            addPromotion: function addPromotion() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            removePromotion: function removePromotion() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            estimateShipping: function estimateShipping() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            removeShipping: function removeShipping() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            voidLine: function voidLine() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            unvoidLine: function unvoidLine() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            updateCustomer: function updateCustomer() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            addLineSync: function addLineSync(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            addLinesSync: function addLinesSync(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            getLinesSync: function getLinesSync(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            removeLineSync: function removeLineSync(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            updateLineSync: function updateLineSync(data) {
                data = data;
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            getSummarySync: function getSummarySync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            submitSync: function submitSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            addPaymentSync: function addPaymentSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            addPromotionSync: function addPromotionSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            removePromotionSync: function removePromotionSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            estimateShippingSync: function estimateShippingSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            removeShippingSync: function removeShippingSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            voidLineSync: function voidLineSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            unvoidLineSync: function unvoidLineSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            updateCustomerSync: function updateCustomerSync() {
                throw SC.ERROR_IDENTIFIERS.notImplemented;
            },
            _normalizeSummary: function _normalizeSummary(summary) {
                var commonSummaryAttrs = [
                    'total',
                    'taxtotal',
                    'tax2total',
                    'discounttotal',
                    'subtotal',
                    'shippingcost',
                    'handlingcost',
                    'giftcertapplied'
                ];
                return format(summary, commonSummaryAttrs);
            },
            _normalizeLine: function _normalizeLine(line) {
                line.item = StoreItem ? StoreItem.get(line.item.internalid, line.item.itemtype || line.item.type, 'details') : line.item;
                var commonLineAttrs = [
                    'internalid',
                    'item',
                    'quantity',
                    'amount',
                    'rate',
                    'tax_amount',
                    'tax_code',
                    'itemtype',
                    'options'
                ];
                var commonItemAttrs = [
                    'internalid',
                    'itemid',
                    'displayname',
                    'isinactive',
                    'itemtype',
                    'minimumquantity'
                ];
                var formatted_line = format(line, commonLineAttrs);
                formatted_line.item = format(line.item, commonItemAttrs);
                return formatted_line;
            },
            _normalizeAddLineBefore: function _normalizeAddLineBefore(data) {
                return { line: this._normalizeLine(data[0]) };
            },
            _normalizeAddLineAfter: function _normalizeAddLineAfter(data) {
                return {
                    result: data[0],
                    line: this._normalizeLine(data[1])
                };
            },
            _normalizeRemoveLineBefore: function _normalizeRemoveLineBefore(data) {
                return { internalid: data[0] };
            },
            _normalizeRemoveLineAfter: function _normalizeRemoveLineAfter(data) {
                return {
                    result: data[0],
                    internalid: data[1]
                };
            },
            _normalizeUpdateLineBefore: function _normalizeUpdateLineBefore(data) {
                return { line: this._normalizeLine(data[1]) };
            },
            _normalizeUpdateLineAfter: function _normalizeUpdateLineAfter(data) {
                return {
                    result: data[0],
                    line: this._normalizeLine(data[2])
                };
            },
            _normalizeSubmitBefore: function _normalizeSubmitBefore() {
                return {};
            },
            _normalizeSubmitAfter: function _normalizeSubmitAfter(data) {
                return { result: data[0] };
            }
        });
    return icart_component;
});
define('Cart.Component', [
    'ICart.Component',
    'LiveOrder.Model',
    'Application',
    'Utils',
    'jQuery.Deferred',
    'underscore'
], function (ICartComponent, LiveOrderModel, Application, Utils, jQuery, _) {
    'use strict';
    var cart_component = ICartComponent.extend({
        addLine: function addLine(data) {
            var deferred = jQuery.Deferred();
            try {
                this._validateLine(data.line);
                deferred.resolve(LiveOrderModel.addLine(data.line));
            } catch (e) {
                deferred.reject(e);
            }
            return deferred;
        },
        addLines: function addLines(data) {
            var deferred = jQuery.Deferred();
            try {
                var self = this;
                _.map(data.lines, function (line) {
                    self._validateLine(line);
                });
                var lines = _.map(LiveOrderModel.addLines(data.lines), function (added_line) {
                    return added_line.orderitemid;
                });
                deferred.resolve(lines);
            } catch (e) {
                deferred.reject(e);
            }
            return deferred;
        },
        getLines: function getLines() {
            var deferred = jQuery.Deferred();
            try {
                var self = this;
                var lines = _.map(LiveOrderModel.getLinesOnly(), function (line) {
                    return self._normalizeLine(line);
                });
                deferred.resolve(lines);
            } catch (e) {
                deferred.reject(e);
            }
            return deferred;
        },
        removeLine: function removeLine(data) {
            var deferred = jQuery.Deferred();
            try {
                if (!data.internalid || !_.isString(data.internalid)) {
                    this._reportError('INVALID_PARAM', 'Invalid id: Must be a defined string');
                }
                deferred.resolve(LiveOrderModel.removeLine(data.internalid));
            } catch (e) {
                deferred.reject(e);
            }
            return deferred;
        },
        updateLine: function updateLine(data) {
            var deferred = jQuery.Deferred();
            try {
                this._validateEditLine(data.line);
                deferred.resolve(LiveOrderModel.updateLine(data.line.internalid, data.line));
            } catch (e) {
                deferred.reject(e);
            }
            return deferred;
        },
        getSummary: function getSummary() {
            var deferred = jQuery.Deferred();
            try {
                var summary = LiveOrderModel.getSummary();
                deferred.resolve(this._normalizeSummary(summary));
            } catch (e) {
                deferred.reject(e);
            }
            return deferred;
        },
        submit: function submit() {
            var deferred = jQuery.Deferred();
            try {
                deferred.resolve(LiveOrderModel.submit());
            } catch (e) {
                deferred.reject(e);
            }
            return deferred;
        }
    });
    cart_component._generateSyncMethods();
    var innerToOuterMap = [
        {
            inner: 'before:LiveOrder.addLine',
            outer: 'beforeAddLine',
            normalize: cart_component._normalizeAddLineBefore
        },
        {
            inner: 'after:LiveOrder.addLine',
            outer: 'afterAddLine',
            normalize: cart_component._normalizeAddLineAfter
        },
        {
            inner: 'before:LiveOrder.removeLine',
            outer: 'beforeRemoveLine',
            normalize: cart_component._normalizeRemoveLineBefore
        },
        {
            inner: 'after:LiveOrder.removeLine',
            outer: 'afterRemoveLine',
            normalize: cart_component._normalizeRemoveLineAfter
        },
        {
            inner: 'before:LiveOrder.submit',
            outer: 'beforeSubmit',
            normalize: cart_component._normalizeSubmitBefore
        },
        {
            inner: 'after:LiveOrder.submit',
            outer: 'afterSubmit',
            normalize: cart_component._normalizeSubmitAfter
        },
        {
            inner: 'before:LiveOrder.updateLine',
            outer: 'beforeUpdateLine',
            normalize: cart_component._normalizeUpdateLineBefore,
            disableEvents: [
                'beforeAddLine',
                'afterAddLine',
                'beforeRemoveLine',
                'afterRemoveLine'
            ]
        },
        {
            inner: 'after:LiveOrder.updateLine',
            outer: 'afterUpdateLine',
            normalize: cart_component._normalizeUpdateLineAfter,
            enableEvents: [
                'beforeAddLine',
                'afterAddLine',
                'beforeRemoveLine',
                'afterRemoveLine'
            ]
        }
    ];
    cart_component._suscribeToInnerEvents(innerToOuterMap);
    Application.on('before:LiveOrder.addLines', function (model, lines) {
        var lines_copy = Utils.deepCopy(lines);
        var lines_deferred = _.map(lines_copy, function (line) {
                var args = cart_component._normalizeAddLineBefore([line]);
                return cart_component.cancelableTrigger('beforeAddLine', args);
            }), result = jQuery.Deferred();
        jQuery.when.apply(jQuery, lines_deferred).fail(cart_component._asyncErrorHandle(result)).done(result.resolve);
        return result;
    });
    Application.on('after:LiveOrder.addLines', function (model, lines_ids, lines) {
        var lines_copy = Utils.deepCopy(lines);
        var lines_ids_copy = Utils.deepCopy(lines_ids);
        var lines_deferred = _.map(lines_copy, function (line) {
                try {
                    var line_id = _.find(lines_ids_copy, function (line_id) {
                        return line_id.internalid === line.item.internalid.toString();
                    }).orderitemid;
                    var args = cart_component._normalizeAddLineAfter([
                        line_id,
                        line
                    ]);
                    return cart_component.cancelableTrigger('afterAddLine', args);
                } catch (e) {
                    return jQuery.Deferred().reject(e);
                }
            }), result = jQuery.Deferred();
        jQuery.when.apply(jQuery, lines_deferred).fail(cart_component._asyncErrorHandle(result)).done(result.resolve);
        return result;
    });
    Application.registerComponent(cart_component);
});
define('SCSB', [
    'Account.ForgotPassword.ServiceController',
    'Account.Login.ServiceController',
    'Account.Register.ServiceController',
    'Account.RegisterAsGuest.ServiceController',
    'Account.ResetPassword.ServiceController',
    'Address.ServiceController',
    'Case.Fields.ServiceController',
    'Case.ServiceController',
    'Categories.ServiceController',
    'CreditCard.ServiceController',
    'LiveOrder.GiftCertificate.ServiceController',
    'LiveOrder.Line.ServiceController',
    'LiveOrder.ServiceController',
    'ReorderItems.ServiceController',
    'OrderHistory.ServiceController',
    'Profile.ServiceController',
    'SiteSettings.ServiceController',
    'Receipt.ServiceController',
    'ReturnAuthorization.ServiceController',
    'Transaction.ServiceController',
    'Location.ServiceController',
    'ExternalPayment.Model',
    'Quote.ServiceController',
    'SC.BaseComponent',
    'Cart.Component'
], function () {
});
ConfigurationManifestDefaults = {
	"addresses": {
		"isPhoneMandatory": true
	},
	"layout": {
		"colorPalette": [
			{
				"paletteId": "default",
				"colorName": "black",
				"colorValue": "#212121"
			},
			{
				"paletteId": "default",
				"colorName": "gray",
				"colorValue": "#9c9c9c"
			},
			{
				"paletteId": "default",
				"colorName": "grey",
				"colorValue": "#9c9c9c"
			},
			{
				"paletteId": "default",
				"colorName": "white",
				"colorValue": "#fff"
			},
			{
				"paletteId": "default",
				"colorName": "brown",
				"colorValue": "#804d3b"
			},
			{
				"paletteId": "default",
				"colorName": "beige",
				"colorValue": "#eedcbe"
			},
			{
				"paletteId": "default",
				"colorName": "blue",
				"colorValue": "#0f5da3"
			},
			{
				"paletteId": "default",
				"colorName": "light-blue",
				"colorValue": "#8fdeec"
			},
			{
				"paletteId": "default",
				"colorName": "purple",
				"colorValue": "#9b4a97"
			},
			{
				"paletteId": "default",
				"colorName": "lilac",
				"colorValue": "#ceadd0"
			},
			{
				"paletteId": "default",
				"colorName": "red",
				"colorValue": "#f63440"
			},
			{
				"paletteId": "default",
				"colorName": "pink",
				"colorValue": "#ffa5c1"
			},
			{
				"paletteId": "default",
				"colorName": "orange",
				"colorValue": "#ff5200"
			},
			{
				"paletteId": "default",
				"colorName": "peach",
				"colorValue": "#ffcc8c"
			},
			{
				"paletteId": "default",
				"colorName": "yellow",
				"colorValue": "#ffde00"
			},
			{
				"paletteId": "default",
				"colorName": "light-yellow",
				"colorValue": "#ffee7a"
			},
			{
				"paletteId": "default",
				"colorName": "green",
				"colorValue": "#00af43"
			},
			{
				"paletteId": "default",
				"colorName": "lime",
				"colorValue": "#c3d600"
			},
			{
				"paletteId": "default",
				"colorName": "teal",
				"colorValue": "#00ab95"
			},
			{
				"paletteId": "default",
				"colorName": "aqua",
				"colorValue": "#28e1c5"
			},
			{
				"paletteId": "default",
				"colorName": "burgandy",
				"colorValue": "#9c0633"
			},
			{
				"paletteId": "default",
				"colorName": "navy",
				"colorValue": "#002d5d"
			}
		],
		"lightColors": [
			"white"
		]
	},
	"imageNotAvailable": "img/no_image_available.jpeg",
	"imageSizeMapping": [
		{
			"id": "thumbnail",
			"value": "thumbnail"
		},
		{
			"id": "main",
			"value": "main"
		},
		{
			"id": "tinythumb",
			"value": "tinythumb"
		},
		{
			"id": "zoom",
			"value": "zoom"
		},
		{
			"id": "fullscreen",
			"value": "fullscreen"
		},
		{
			"id": "homeslider",
			"value": "homeslider"
		},
		{
			"id": "homecell",
			"value": "homecell"
		}
	],
	"bronto": {
		"accountId": "",
		"adapterUrl": "https://cdn.bronto.com/netsuite/configure.js"
	},
	"addToCartBehavior": "showCartConfirmationModal",
	"addToCartFromFacetsView": false,
	"promocodes": {
		"allowMultiples": false
	},
	"matrixchilditems": {
		"enabled": false,
		"fieldset": "matrixchilditems_search"
	},
	"showTaxDetailsPerLine": false,
	"summaryTaxLabel": "Tax",
	"cases": {
		"defaultValues": {
			"statusStart": {
				"id": "1"
			},
			"statusClose": {
				"id": "5"
			},
			"origin": {
				"id": "-5"
			}
		}
	},
	"categories": {
		"menuLevel": 3,
		"addToNavigationTabs": true,
		"sideMenu": {
			"sortBy": "sequencenumber",
			"additionalFields": [],
			"uncollapsible": false,
			"showMax": 5,
			"collapsed": false
		},
		"subCategories": {
			"sortBy": "sequencenumber",
			"fields": []
		},
		"category": {
			"fields": []
		},
		"breadcrumb": {
			"fields": []
		},
		"menu": {
			"sortBy": "sequencenumber",
			"fields": []
		}
	},
	"checkoutApp": {
		"skipLogin": false,
		"checkoutSteps": "Standard",
		"paypalLogo": "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
		"invoiceTermsAndConditions": "<h4>Invoice Terms and Conditions</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>"
	},
	"isMultiShippingEnabled": false,
	"removePaypalAddress": true,
	"isThreeDSecureEnabled": false,
	"autoPopulateNameAndEmail": true,
	"forms": {
		"loginAsGuest": {
			"showName": false,
			"showEmail": true
		},
		"address": {
			"showAddressLineTwo": true
		}
	},
	"cms": {
		"useCMS": true,
		"escToLoginDisabled": false,
		"baseUrl": "",
		"adapterVersion": "3"
	},
	"defaultSearchUrl": "search",
	"searchApiMasterOptions": [
		{
			"id": "Facets",
			"fieldset": "search",
			"include": "facets"
		},
		{
			"id": "itemDetails",
			"fieldset": "details",
			"include": "facets"
		},
		{
			"id": "relatedItems",
			"fieldset": "relateditems_details"
		},
		{
			"id": "correlatedItems",
			"fieldset": "correlateditems_details"
		},
		{
			"id": "merchandisingZone"
		},
		{
			"id": "typeAhead",
			"fieldset": "typeahead"
		},
		{
			"id": "itemsSearcher",
			"fieldset": "itemssearcher"
		},
		{
			"id": "CmsAdapterSearch",
			"fieldset": "search"
		}
	],
	"defaultPaginationSettings": {
		"showPageList": true,
		"pagesToShow": 9,
		"showPageIndicator": false
	},
	"defaultPaginationSettingsPhone": {
		"showPageList": false,
		"pagesToShow": 9,
		"showPageIndicator": true
	},
	"defaultPaginationSettingsTablet": {
		"showPageList": true,
		"pagesToShow": 4,
		"showPageIndicator": true
	},
	"paymentmethods": [
		{
			"key": "5,5,1555641112",
			"regex": "^4[0-9]{12}(?:[0-9]{3})?$",
			"description": "VISA"
		},
		{
			"key": "4,5,1555641112",
			"regex": "^(5[1-5][0-9]{14}|2(2(2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7([0-1][0-9]|20))[0-9]{12})$",
			"description": "Master Card"
		},
		{
			"key": "6,5,1555641112",
			"regex": "^3[47][0-9]{13}$",
			"description": "American Express"
		},
		{
			"key": "3,5,1555641112",
			"regex": "^6(?:011|5[0-9]{2})[0-9]{12}$",
			"description": "Discover"
		},
		{
			"key": "16,5,1555641112",
			"regex": "^(?:5[0678]\\\\d\\\\d|6304|6390|67\\\\d\\\\d)\\\\d{8,15}$",
			"description": "Maestro"
		},
		{
			"key": "17,3,1555641112",
			"regex": "",
			"description": "This company allows both private individuals and businesses to accept payments over the Internet"
		}
	],
	"creditCard": {
		"showCreditCardHelp": true,
		"creditCardHelpTitle": "Enter the title of the credit card help link. This title is displayed only if the Show Credit Card Help property is enabled.",
		"imageCvvAllCards": "",
		"imageCvvAmericanCard": "",
		"creditCardShowSecureInfo": "<p class=\"order-wizard-paymentmethod-creditcard-secure-info\">We take all reasonable steps to protect our customers personal information against loss, misuse and alteration. We use encryption technology whenever receiving and transferring your personal information on our site. <strong>When you are viewing a page that is requesting personal information, the URL in the address bar at top of your browser will start with \"https\". </strong> This indicates your transaction session is secured through Secure Sockets Layer (SSL). If the web page you are viewing does not start with \"https\", please contact us.</p>"
	},
	"customFields": {
		"salesorder": []
	},
	"tracking": {
		"googleAdWordsConversion": {
			"id": "AW-985285439",
			"value": 0,
			"label": "h8hpCPr4pIMBEL-G6dUD"
		},
		"GoogleAnalyticsFour": {
			"propertyID": "G-GY69EY0XSY",
			"domainName": "fourthwc.net",
			"domainNameSecure": "netsuite.com"
		},
		"googleUniversalAnalytics": {
			"propertyID": "",
			"domainName": "",
			"domainNameSecure": ""
		}
	},
	"ItemOptions": {
		"showOnlyTheListedOptions": false,
		"optionsConfiguration": [
			{
				"cartOptionId": "custcol13",
				"label": "Color",
				"urlParameterName": "color",
				"colors": "default",
				"index": 10,
				"templateSelector": "product_views_option_color.tpl",
				"showSelectorInList": false,
				"templateFacetCell": "product_views_option_facets_color.tpl",
				"templateSelected": "transaction_line_views_selected_option_color.tpl"
			},
			{
				"cartOptionId": "GIFTCERTFROM",
				"urlParameterName": "from",
				"label": "From"
			},
			{
				"cartOptionId": "GIFTCERTRECIPIENTNAME",
				"urlParameterName": "to",
				"label": "To"
			},
			{
				"cartOptionId": "GIFTCERTRECIPIENTEMAIL",
				"urlParameterName": "to-email",
				"label": "To email"
			},
			{
				"cartOptionId": "GIFTCERTMESSAGE",
				"urlParameterName": "message",
				"label": "Message"
			}
		],
		"defaultTemplates": {
			"selectorByType": [
				{
					"type": "select",
					"template": "product_views_option_tile.tpl"
				},
				{
					"type": "date",
					"template": "product_views_option_date.tpl"
				},
				{
					"type": "email",
					"template": "product_views_option_email.tpl"
				},
				{
					"type": "url",
					"template": "product_views_option_url.tpl"
				},
				{
					"type": "password",
					"template": "product_views_option_password.tpl"
				},
				{
					"type": "float",
					"template": "product_views_option_float.tpl"
				},
				{
					"type": "integer",
					"template": "product_views_option_integer.tpl"
				},
				{
					"type": "datetimetz",
					"template": "product_views_option_datetimetz.tpl"
				},
				{
					"type": "percent",
					"template": "product_views_option_percent.tpl"
				},
				{
					"type": "currency",
					"template": "product_views_option_currency.tpl"
				},
				{
					"type": "textarea",
					"template": "product_views_option_textarea.tpl"
				},
				{
					"type": "phone",
					"template": "product_views_option_phone.tpl"
				},
				{
					"type": "timeofday",
					"template": "product_views_option_timeofday.tpl"
				},
				{
					"type": "checkbox",
					"template": "product_views_option_checkbox.tpl"
				},
				{
					"type": "default",
					"template": "product_views_option_text.tpl"
				}
			],
			"facetCellByType": [
				{
					"type": "default",
					"template": "product_views_option_facets_color.tpl"
				}
			],
			"selectedByType": [
				{
					"type": "default",
					"template": "transaction_line_views_selected_option.tpl"
				}
			]
		}
	},
	"listHeader": {
		"filterRangeQuantityDays": 0
	},
	"transactionRecordOriginMapping": [
		{
			"id": "backend",
			"origin": 0,
			"name": "",
			"detailedName": "Purchase"
		},
		{
			"id": "inStore",
			"origin": 1,
			"name": "In Store",
			"detailedName": "In Store Purchase"
		},
		{
			"id": "online",
			"origin": 2,
			"name": "Online",
			"detailedName": "Online Purchase"
		}
	],
	"overview": {
		"customerSupportURL": "",
		"homeBanners": [],
		"homeRecentOrdersQuantity": 3
	},
	"productline": {
		"multiImageOption": [
			"custcol4",
			"custcol3"
		]
	},
	"quote": {
		"daysToExpire": 7,
		"disclaimerSummary": "To place the order please contact <strong>Contact Center</strong> at <strong>(000)-XXX-XXXX</strong> or send an email to <a href=\"mailto:xxxx@xxxx.com\">xxxx@xxxx.com</a>",
		"disclaimer": "For immediate assistance contact <strong>Contact Center</strong> at <strong>(000)-XXX-XXXX</strong> or send an email to <a href=\"mailto:xxxx@xxxx.com\">xxxx@xxxx.com</a>",
		"defaultPhone": "(000)-XXX-XXXX",
		"defaultEmail": "xxxx@xxxx.com"
	},
	"recentlyViewedItems": {
		"useCookie": true,
		"numberOfItemsDisplayed": "6"
	},
	"returnAuthorization": {
		"cancelUrlRoot": "https://system.netsuite.com",
		"reasons": [
			{
				"text": "Wrong Item Shipped",
				"id": 1,
				"order": 1
			},
			{
				"text": "Did not fit",
				"id": 2,
				"order": 2
			},
			{
				"text": "Quality did not meet my standards",
				"id": 3,
				"order": 3
			},
			{
				"text": "Not as pictured on the Website",
				"id": 4,
				"order": 4
			},
			{
				"text": "Damaged during shipping",
				"id": 5,
				"order": 5
			},
			{
				"text": "Changed my mind",
				"id": 6,
				"order": 6
			},
			{
				"text": "Item was defective",
				"id": 7,
				"order": 7
			},
			{
				"text": "Arrived too late",
				"id": 8,
				"order": 8
			},
			{
				"text": "Other",
				"id": 9,
				"order": 9,
				"isOther": true
			}
		]
	},
	"isSCISIntegrationEnabled": true,
	"locationTypeMapping": {
		"store": {
			"internalid": "1",
			"name": "Store"
		}
	},
	"addThis": {
		"enable": false,
		"pubId": "ra-50abc2544eed5fa5",
		"toolboxClass": "addthis_default_style addthis_toolbox addthis_button_compact",
		"servicesToShow": [
			{
				"key": "facebook",
				"value": "Facebook"
			},
			{
				"key": "google_plusone",
				"value": ""
			},
			{
				"key": "email",
				"value": "Email"
			},
			{
				"key": "expanded",
				"value": "More"
			}
		],
		"options": [
			{
				"key": "username",
				"value": ""
			},
			{
				"key": "data_track_addressbar",
				"value": true
			}
		]
	},
	"facebook": {
		"enable": false,
		"appId": "",
		"popupOptions": {
			"status": "no",
			"resizable": "yes",
			"scrollbars": "yes",
			"personalbar": "no",
			"directories": "no",
			"location": "no",
			"toolbar": "no",
			"menubar": "no",
			"width": 500,
			"height": 250,
			"left": 0,
			"top": 0
		}
	},
	"googlePlus": {
		"enable": true,
		"popupOptions": {
			"status": "no",
			"resizable": "yes",
			"scrollbars": "yes",
			"personalbar": "no",
			"directories": "no",
			"location": "no",
			"toolbar": "no",
			"menubar": "no",
			"width": 600,
			"height": 600,
			"left": 0,
			"top": 0
		}
	},
	"pinterest": {
		"enableHover": true,
		"enableButton": true,
		"imageSize": "main",
		"popupOptions": {
			"status": "no",
			"resizable": "yes",
			"scrollbars": "yes",
			"personalbar": "no",
			"directories": "no",
			"location": "no",
			"toolbar": "no",
			"menubar": "no",
			"width": 680,
			"height": 300,
			"left": 0,
			"top": 0
		}
	},
	"twitter": {
		"enable": true,
		"popupOptions": {
			"status": "no",
			"resizable": "yes",
			"scrollbars": "yes",
			"personalbar": "no",
			"directories": "no",
			"location": "no",
			"toolbar": "no",
			"menubar": "no",
			"width": 632,
			"height": 250,
			"left": 0,
			"top": 0
		},
		"via": ""
	},
	"faviconPath": "",
	"filterSite": {
		"option": "current"
	},
	"orderShoppingFieldKeys": {
		"keys": [
			"shipaddress",
			"summary",
			"promocodes"
		],
		"items": [
			"amount",
			"promotionamount",
			"promotiondiscount",
			"orderitemid",
			"quantity",
			"minimimquantity",
			"onlinecustomerprice_detail",
			"internalid",
			"options",
			"itemtype",
			"rate",
			"rate_formatted",
			"taxrate1",
			"taxtype1",
			"taxrate2",
			"taxtype2",
			"tax1amt",
			"discounts_impact"
		]
	},
	"orderCheckoutFieldKeys": {
		"keys": [
			"giftcertificates",
			"shipaddress",
			"billaddress",
			"payment",
			"summary",
			"promocodes",
			"shipmethod",
			"shipmethods",
			"agreetermcondition",
			"purchasenumber"
		],
		"items": [
			"amount",
			"promotionamount",
			"promotiondiscount",
			"orderitemid",
			"quantity",
			"minimumquantity",
			"onlinecustomerprice_detail",
			"internalid",
			"rate",
			"rate_formatted",
			"options",
			"itemtype",
			"itemid",
			"taxrate1",
			"taxtype1",
			"taxrate2",
			"taxtype2",
			"tax1amt",
			"discounts_impact"
		]
	},
	"suitescriptResultsPerPage": 20,
	"fieldKeys": {
		"itemsFieldsAdvancedName": "order",
		"itemsFieldsStandardKeys": [
			"canonicalurl",
			"displayname",
			"internalid",
			"itemid",
			"itemoptions_detail",
			"itemtype",
			"minimumquantity",
			"onlinecustomerprice_detail",
			"pricelevel1",
			"pricelevel1_formatted",
			"isinstock",
			"ispurchasable",
			"isbackordable",
			"outofstockmessage",
			"stockdescription",
			"showoutofstockmessage",
			"storedisplayimage",
			"storedisplayname2",
			"storedisplaythumbnail",
			"isfullfillable"
		]
	},
	"extraTranslations": []
};
BuildTimeInf={isSCLite: undefined}

require.config({"paths":{"Backbone.Validation":"backbone-validation.server.custom"},"shim":{"Backbone.Validation":{"exports":"Backbone.Validation"}},"baseUrl":"","configFile":null,"exclude":[],"excludeShallow":[],"findNestedDependencies":false,"loader":null,"preserveComments":false,"wrapShim":true});
