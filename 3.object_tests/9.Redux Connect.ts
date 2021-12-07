export default {}
// 实现Connect类型，能够自动地转化Redux Module对象中的函数类型

interface Module {
  count: number;
  message: string;

  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;

  syncMethod<T, U>(action: Action<T>): Action<U>;
}

interface Action<T> {
  payload?: T;
  type: string;
}

// 这个要求的结果
// type Result = {
//   asyncMethod<T, U>(input: T): Action<U>;
//   syncMethod<T, U>(action: T): Action<U>;
// }
type FunKey<M, k = keyof M> =  k extends keyof M ? (
  M[k] extends (...args: any) => any ? k : never
) : never
type Funkey1 = FunKey<Module>

// type Connect<M> = {
//   [k in FunKey<M>]: k extends keyof M ? (
//     M[k] extends (input: Promise<M[k]>) => Promise<M[k]> ? 
//     (M[k] extends (input: infer L) => infer R ? (input: L) => R : M[k] ) : M[k]
//   ) : never
// }
type Connect<M> = {
  [k in FunKey<M>]: k extends keyof M ? ( // 只保留函数
    M[k] extends <T, U>(input: Promise<T>) => Promise<Action<U>> ?  // 参数是Promise，返回值是Promise，则参数去掉Promise，返回值去掉Promise
    <T, U>(input: T) => Action<U> : (
      M[k] extends <T, U>(input: Action<T>) => Action<U> ? // 参数是Action，返回值是Action，则参数去掉Action
      <T, U>(input: T) => Action<U> : never
    )
  ) : never
}
type Result = Connect<Module>

// 重点：
// <T, U>(参数) = 返回值 什么用法 。。。


// 答案
type InferConnectFunctionParameterType<Func> =
    Func extends <T, U>(input: Promise<T>) => Promise<Action<U>> ? <T, U>(input: T) => Action<U> :
        Func extends (<T, U>(input: Action<T>) => Action<U>) ? (<T, U>(input: T) => Action<U>) : never

type Connect1<T, M extends string = { [k in keyof T]: k extends string ? T[k] extends Function ? k : never : never }[keyof T]> = {
    [k in M]: k extends keyof T ? InferConnectFunctionParameterType<T[k]> : never
}
type Result1 = Connect1<Module>

// 实现类型Connect，要求 Connect<Module> 的结果为上面的 Result
// 只要函数类型的属性；
// 如果函数是异步函数，要求自动解析出来Promise中的类型；