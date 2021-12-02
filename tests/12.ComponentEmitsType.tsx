export default {}
import {GetListenName} from "./10.CamelCase";
import {GetKebabCase} from "./9.KebabCase"
// 定义组件的监听事件类型

// 实现 ComponentEmitsType<Emits> 类型，将
/*
{
    'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
    'close-item': (data: { item: any, index: number }) => true,
}
*/
// 转化为类型
/*
{
    onHandleOpen?: (flag: boolean) => void,
    onPreviewItem?: (data: { item: any, index: number }) => void,
    onCloseItem?: (data: { item: any, index: number }) => void,
}
*/

// Partial 原生方法，属性是可选的
// Convert 把key转成on开头的驼峰命名，把函数转成返回值为void
type RemoveReturn<T> = T extends (...args: infer A) => any ? (...args: A) => void : T
type Convert<T> = { [k in GetListenName<keyof T>]: GetKebabCase<k> extends keyof T ? RemoveReturn<T[GetKebabCase<k>]> : never }
// type Convert<T> = { [k in keyof T as GetListenName<k>]: RemoveReturn<T[k]> }
// type Convert<T> = { [k in GetListenName<keyof T>]: RemoveReturn<T[k]> }
type ComponentEmitsType<Emits> = { (props: Partial<Convert<Emits>>): any }

function createComponent<Emits extends Record<string, any>>(emits: Emits): ComponentEmitsType<Emits> {return [{emits}] as any}

// 最后返回的 Component变量类型为一个合法的React组件类型，并且能够通过`on事件驼峰命名`的方式，监听定义的事件，并且能够自动推导出事件的参数类型
const Component = createComponent({
    'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
    'close-item': (data: { item: any, index: number }) => true,
})
console.log(
    <Component
        // onHandleOpen 的类型为 (flag: boolean) => void
        onHandleOpen={val => console.log(val.valueOf())}
        // onPreviewItem 的类型为 (data: { item: any, index: number }) => void
        onPreviewItem={val => {
            const {item, index} = val
            const a: number = item
            console.log(a, index.toFixed(2))
        }}
        // 所有的监听事件属性都是可选属性，可以不传处理函数句柄
        onCloseItem={val => [{val}]}
        // onCloseItem1={val => [{val}]}
    />,
    // 代码提示
    // <Component 
    //     on
    // />
)

// 提示，定义组件的props类型方式为 { (props: Partial<Convert<Emits>>): any }
// 比如 Comp 可以接收属性 {name:string, age:number, flag:boolean, id?:string}，其中id为可选属性，那么可以这样写

const Comp: { (props: { name: string, age: number, flag: boolean, id?: string }): any } = Function as any

console.log(<Comp name="" age={1} flag/>)           // 正确
console.log(<Comp name="" age={1} flag id="111"/>)  // 正确
// console.log(<Comp name={1} age={1} flag/>)          // 错误，name为字符串类型
// console.log(<Comp age={1} flag/>)                   // 错误，缺少必须属性name:string