var _II = {};

(function(_ii) {

    if(_.isUndefined(_ii)) {
        _ii = {};
    }

    function summarizeObject(obj) {
        return [
            "Object {", _.take(_.keys(obj), 4).join(":_, "), "..}"
        ].join("");
    };

    _ii.describe = function(obj) {
        if(obj instanceof Object)
            return summarizeObject(obj);

        return obj;
    };

    _ii.errors = {};

    _ii.errors.failedGet = function(obj, keyString) {
        return Error(
            [
                '(_II ERROR) Failed get on ', _ii.describe(obj),
                ' for keystring(', keyString, ') '
            ].join("")
        );
    };

    _ii.errors.failedGetType = function(obj, keyString, typ) {
        return Error(
            [
                '(_II ERROR) Failed get on ', _ii.describe(obj),
                ' for keystring(', keyString, ') ',
                'not of type(', typ, ')'
            ].join("")
        );
    };

    _ii.errors.badArg = function(functionName, expected, pos) {
        var position = pos || "First";

        return Error(
            [
                '(_II Error) ',
                position, " arguement of '", functionName,
                "' must be ", expected
            ].join("")
        );
    };

    _ii.isNone = function(arg) {
        return (
            _.isUndefined(arg) || _.isNull(arg) || _.isNaN(arg)
        );
    };

    _ii.nonEmpty = function(obj) {
        return !(_ii.isNone(obj) || _.isEmpty(obj));
    };

    _ii.nonEmptyObj = function(obj) {
        return (_ii.nonEmpty() && _.isObject(obj));
    };

    _ii.nonEmptyArray = function(arr) {
        return (
            _ii.nonEmpty(arr) && (arr instanceof Array)
        );
    };

    _ii.nonEmptyStrings = function(obj) {

        return (
            _ii.nonEmpty(obj) &&
            _.every(obj, function(field) { return !(_.isNull(field) || _.isUndefined(field)) }) &&
            _.every(obj, function(field) { return (typeof field == 'string') }) &&
            _.every(obj, function(field) { return field.length > 0 })
        );
    };

    _ii.nonEmptyString = function(str) {
        return (
            !(_.isNull(str) || _.isUndefined(str)) &&
            (typeof str == 'string') &&
            (str.length > 0)
        );
    };

    _ii.nonEmptyNumber = function(n) {
        return (
            !(_.isNull(n) || _.isUndefined(n) || _.isNaN(n)) && _.isNumber(n)
        );
    };

    _ii.greaterThanZero = function(n) {
        return (!_ii.nonEmptyNumber(n) && n > 0);
    };

    _ii.dateTypeOrNull = function(date) {

        if(date instanceof Date) return date;

        if(_ii.nonEmptyString(date)) return (new Date(date));

        return null;
    };

    _ii.sameElements = function(argA, argB) {
        if(_.any([argA, argB], function(arg) {
                return !((arg instanceof Array) || (arg instanceof Object));
            })
        ) throw Error("'sameElements' function requires two arguements that are either an Array or object");

        let listA = _.values(argA);
        let listB = _.values(argB);

        if(listA.length !== listB.length) return false;

        return _.every(listA, function(element) { return listB.includes(element) });
    };

    _ii.hasKey = function(obj, keyString) {
        if(!_ii.nonEmptyString(keyString))
            throw _ii.badArg('hasKey', 'a non-empty String', 'Second');

        try {
            var tryVal = obj;

            let nested = _.initial(keyString.split("."));
            let test = _.last(keyString.split("."));

            _.each(nested, function(key) {
                tryVal = tryVal[key];
            });

            return _.has(tryVal, test);
        }
        catch(e) {
            return false;
        }
    };

    _ii.hasKeys = function(obj, keys) {
        if(!(obj instanceof Object))
            throw _ii.errors.badArg('hasKeys', 'an Object');

        if(!(keys instanceof Array))
            throw _ii.errors.badArg('hasKeys', 'an Array', 'Second');

        return _.every(keys, function(key) {
            return _ii.hasKey(obj, key);
        });
    };

    _ii.isMissing = function(obj, key) {
        return !_ii.hasKey(obj, key)
    };

    _ii.isMissingAny = function(obj, keys) {

        if(!(obj instanceof Object))
            throw _ii.errors.badArg('isMissingAny', 'an Object');

        if(!(keys instanceof Array))
            throw _ii.errors.badArg('isMissingAny', 'an Array', 'Second');

        return _.any(keys, function(key) {
            return _ii.isMissing(obj, key);
        });
    };

    _ii.getOrElse = function(obj, keyString, fallback) {

        if(!_ii.nonEmptyString(keyString)) return fallback;

        if(_ii.isMissing(obj, keyString)) return fallback;

        var tryVal = obj;

        _.each(keyString.split("."), function(key) {
            tryVal = tryVal[key];
        });

        if(_ii.isNone(tryVal)) return fallback;

        return tryVal;
    };

    _ii.getArrayOrElse = function(obj, keyString, fb) {

        let fallback = fb || [];

        let tryGet = _ii.getOrElse(obj, keyString, fallback);

        let result = (_ii.nonEmptyArray(tryGet)) ? tryGet : fallback;

        return result;
    }


    _ii.getStringOrElse = function(obj, keyString, fb) {

        let fallback = fb || "";

        let tryGet = _ii.getOrElse(obj, keyString, fallback)

        let result = (_ii.nonEmptyString(tryGet)) ? tryGet : fallback;

        return result;
    }

    _ii.getIntOrElse = function(obj, keyString, fb) {

        let fallback = fb || NaN;

        let tryGet = _ii.getOrElse(obj, keyString, fallback)

        let result = (_ii.nonEmptyNumber(tryGet)) ? tryGet : fallback;

        return result;
    };

    _ii.parseIntOrElse = function(num, fallback) {
        try {
            let n = parseInt(num);
            if(!_ii.nonEmptyNumber(n)) return fallback;

            return n;
        }
        catch(e) {
            return fallback;
        }
    };

    _ii.get = _ii.getOrElse;
    _ii.getArray = _ii.getArrayOrElse;
    _ii.getString = _ii.getStringOrElse;
    _ii.getInt = _ii.getIntOrElse;

    _ii.println = function(tag, val) {
        console.log("\n-------------------- " +tag);
        console.log(val);
        console.log("--------------------\n");
    };

})(_II);