export default {}
// 有且只有一个属性


// 实现一个叫做 UnionToBooleanProps 的泛型，使得以下需求成立
// type UnionToBooleanProps<T extends string> = {
//   [k in T]?: [k] extends [T] ? true | false : never
// }

// 答案
type UnionToBooleanProps<T extends string, TT extends string = T> =
    T extends any ? // 分配率。。。。经过T extends any之后，T是单个info、success、warning、error
    // 而TT还是联合类型，所以Exclude<TT, T>，就是除了T之外的其他三个类型，是可选的
    // [k in T] 中，T是必选的。。。
        { [k in Exclude<TT, T>]?: void } & { [k in T]: boolean; }
        : never

type MessageStringType = "info" | "success" | "warning" | "error";
type OneMessageTypes = UnionToBooleanProps<MessageStringType>
type Props = OneMessageTypes & { id: string; }
function Component(props: Props) {
    return <></>
}

const a = <Component id="abc" info={true}/>           //correct
const b = <Component id="abc" success={false}/>        //correct
// const b1 = <Component id="abc" success={undefined}/>        //wrong
// const c = <Component id="abc"/>                //wrong
// const d = <Component id="abc" info success/>   //wrong

// 组件Component所接收的属性，有且只有一个 "info" | "success" | "warning" | "error" 中的值；