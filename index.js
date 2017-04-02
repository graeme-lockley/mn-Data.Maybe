"use strict";


/*
 * Maybe a =
 *   Just a
 * | Nothing
 */
function Just(something) {
    return [0, something];
}


const Nothing = [1];


// withDefault: a -> Maybe a -> a
function withDefault(value) {
    return maybe => maybe[0] === 1 ? value : maybe[1];
}
assumption(withDefault(10)(Just(1)) === 1);
assumption(withDefault(10)(Nothing) === 10);


// map: (a -> b) -> Maybe a -> Maybe b
function map(f) {
    return maybe => maybe[0] === 1 ? Nothing : Just(f(maybe[1]));
}
assumption(withDefault(0)(map(x => x * 2)(Just(10))) === 20);
assumption(withDefault(0)(map(x => x * 2)(Nothing)) === 0);


// map2: (a -> b -> c) -> Maybe a -> Maybe b -> Maybe c
function map2(f) {
    return a => b => a[0] === 1 || b[0] === 1 ? Nothing : Just(f(a[1])(b[1]));
}
assumption(withDefault(0)(map2(a => b => a * b)(Just(10))(Just(20))) === 200);
assumption(withDefault(0)(map2(a => b => a * b)(Nothing)(Just(20))) === 0);
assumption(withDefault(0)(map2(a => b => a * b)(Just(10))(Nothing)) === 0);


// andThen: (a -> Maybe b) -> Maybe a -> Maybe b
function andThen(callback) {
    return maybe => maybe[0] === 1 ? Nothing : callback(maybe[1]);
}
assumption(withDefault(0)(andThen(a => Just(a * 20))(Just(10))) === 200);
assumption(withDefault(0)(andThen(a => Nothing)(Just(10))) === 0);
assumption(withDefault(0)(andThen(a => Just(a * 20))(Nothing)) === 0);


module.exports = {
    Just,
    Nothing,

    withDefault,
    map,
    map2,
    andThen
};