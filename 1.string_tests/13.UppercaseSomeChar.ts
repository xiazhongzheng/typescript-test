export default {}

type myUppercase<T extends string, M extends string, R extends string = ''> = T extends `${infer F}${infer L}` ? (
    F extends M ? (myUppercase<L, M, `${R}${Uppercase<M>}`>) : (myUppercase<L, M, `${R}${F}`>)
) : R
type SomeStringUppercaseA = myUppercase<'abcd', 'a'>;
type myUppercaseAll<T, M extends string> = T extends string ? myUppercase<T, M> : never


type SomeStringContainsA = "abc" | "abca" | "abcd";
type SomeStringUppercaseAllA = myUppercaseAll<SomeStringContainsA, 'a'>;
function upperCaseA(input: SomeStringContainsA): SomeStringUppercaseAllA {
    return input.split("").map((ch) => {
        if (ch === 'a') return 'A';
        return ch;
    }).join('') as SomeStringUppercaseAllA;
}
let input: SomeStringContainsA = "abca";
let output: SomeStringUppercaseAllA = upperCaseA(input);