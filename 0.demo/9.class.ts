export default {};
// 类 必须初始化表达式，或者 在构造函数中明确赋值
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T = (x, y) => {
    return x;
  };
  constructor(initData: T) {
    this.zeroValue = initData;
  }
}

let myGenericNumber = new GenericNumber<number>(0);
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

interface Person<T> {
  name: string;
  age: number;
  eat: (a: T) => T;
}
// 实现接口
class Man implements Person<string> {
  name = "";
  age = 0;
  eat = (a: string) => {
    return a;
  };
}
