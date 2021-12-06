export default {}

// const常量，只针对这个常量本身，不针对对象里面的字段（类型扩展）
const a = 'a'
// a = 'b'不允许
const obj = { a: 'a' }
obj.a = 'b' // 允许

const obj1 = { a: 'a' } as const
// obj1.a = 'b' // 不允许

// const断言 as const 或者 <const>
/**特点：
 *  没有类型扩展的字面类型
    对象字面量获取只读属性
    数组字面量成为只读元组
 */

const setCount = (n: number) => {
  return <const>{
    type: 'SET_COUNT',
    payload: n
  }
}


const setCount1 = (n: number) => {
  return {
    type: 'SET_COUNT',
    payload: n
  } as const
}


const action = setCount(3);
// action has type
//  { readonly type: "SET_COUNT"; readonly payload: number };

const resetCount = () => {
  return <const>{
    type: 'RESET_COUNT'
  }
}

type CountActions = ReturnType<typeof setCount> | ReturnType<typeof resetCount>;


// 没有const断言时的写法  对于reduce非常有用
interface SetCount2 {
  type: 'SET_COUNT';
  payload: number;
}

interface ResetCount2 {
  type: 'RESET_COUNT';
}

const setCount2 = (n: number): SetCount2 => {
  return {
    type: 'SET_COUNT',
    payload: n,
  }
}

const resetCount2 = (): ResetCount2 => {
  return {
    type: 'RESET_COUNT',
  }
}

type CountActions2 = SetCount2 | ResetCount2