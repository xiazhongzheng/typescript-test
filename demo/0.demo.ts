export default {}
// infer 类型推导
type MyReturnType<T> = T extends (...args:any[]) => infer R ? R : never
type str = MyReturnType<() => 'str'>
type num = MyReturnType<() => 123>