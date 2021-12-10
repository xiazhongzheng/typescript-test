export default {}
// (React)实现Hook函数useAsyncMethods
/**
 * React同学专属题目，Vue同学请看第三题；
使用hook函数以及hook组件实现，如果可以的话尽量不要使用class组件；
useAsyncMethods函数是一个hook函数，接收两个参数：(methods:Record<string, SimpleMethod>,alone?:boolean)
SimpleMethod类型 interface SimpleMethod {(...args: any[]): any}
返回值类型为一个对象，这个对象的类型与参数methods一致，不过会多出来一个属性 loading；loading是一个对象，对象的key类型为methods中的key，
除此之外还多了一个key，叫做global，loading对象所有属性值类型都是布尔值；这些属性的作用如下所示：
比如 const methods = useAsyncMethods({fun1:(val:string)=>{},fun2:(val:number)=>{}})
methods.fun1 与定义的时候的类型一致，只不过返回值一定是Promise的包装类型，不管原始的fun1是否为异步函数；
methods.fun2 也是一样，与定义的时候的类型一致；
methods.loading.fun1 可以用来判断 fun1是否执行完毕，同理 methods.loading.fun2也是；
methods.loading.global 任意一个函数没有执行完，这个值就是true，所有函数执行完毕之后，这个值就是false；
当methods.fun1没有执行完毕时，再次调用该函数无效，也就是在没有结束之前不会执行定义的时候的fun1函数；
当设置了alone参数为true的时候，只有当所有函数执行完毕之后才能执行下一个函数；也就是说，alone为false的时候，函数执行只跟自己是互斥的，
fun1执行完之后才能再次执行fun1； 与fun2无关；当设置了alone为true的时候，所有函数都是互斥的，fun1执行完之后才能执行fun1，fun2；
示例效果页面
http://martsforever-demo.gitee.io/template-plain-react-micro-base/
子应用 -> React子应用 -> 测试 createAsyncMethods 按钮
目前有四个按钮，每个按钮对应一个异步函数执行；
每个异步函数都会有一个state，是个数字类型的count，异步函数执行完之后count会加一；
 */

// 用来测试的示例代码
import React, {useState} from "react";
import {randomDelay, useAsyncMethods} from "@/pages/message/useAsyncMethods";
import {Button, Spin} from "antd";

const Demo1 = () => {

    const [method1, setMethod1] = useState(0)
    const [method2, setMethod2] = useState(0)
    const [method3, setMethod3] = useState(0)
    const [togetherMethod2and3, setTogetherMethod2and3] = useState(0)

    const methods = useAsyncMethods({
        method1: async (id: string) => {
            console.log('任务一开始')
            await randomDelay(1000, 3000)
            console.log('任务一结束')
            setMethod1(val => val + 1)
        },
        method2: async (start: number, end: number) => {
            console.log('任务二开始')
            await randomDelay(1000, 2000)
            console.log('任务二结束')
            setMethod2(val => val + 1)
            return start + end
        },
        method3: async (result: any) => {
            console.log('任务三开始', {result})
            await randomDelay(2000, 3000)
            console.log('任务三结束')
            setMethod3(val => val + 1)
        },
        togetherMethod2and3: async () => {
            console.log('任务四开始')
            // const ret = await methods.method2()                   // 错误，缺少必须参数start以及end
            const ret = await methods.method2(2, 3)
            // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
            await methods.method3(ret.toFixed(2))
            console.log('任务四结束')
            setTogetherMethod2and3(val => val + 1)
        },
    })

    return <>
        <div style={{backgroundColor: 'white', padding: '20px'}}>
            <h1>测试createAsyncMethods</h1>
            <h3>允许多个不同的异步同时执行，但是同一个异步函数不能同时执行多个，必须在函数执行完毕之后，才能开始再次执行该异步函数</h3>
            <Button.Group>
                <Button onClick={() => methods.method1('__')}>
                    <span>一号异步任务({method1})</span>
                    {!!methods.loading.method1 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method2(0, 1)}>
                    <span>二号异步任务({method2})</span>
                    {!!methods.loading.method2 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method3('?')}>
                    <span>三号异步任务({method3})</span>
                    {!!methods.loading.method3 && <Spin/>}
                </Button>
                <Button onClick={() => methods.togetherMethod2and3()}>
                    <span>四号异步任务({togetherMethod2and3})</span>
                    {!!methods.loading.togetherMethod2and3 && <Spin/>}
                </Button>
            </Button.Group>
        </div>
    </>
}


const Demo2 = () => {

    const [method1, setMethod1] = useState(0)
    const [method2, setMethod2] = useState(0)
    const [method3, setMethod3] = useState(0)
    const [togetherMethod2and3, setTogetherMethod2and3] = useState(0)

    const methods = useAsyncMethods((() => {
        const m = {
            method1: async (id: string) => {
                console.log('任务一开始')
                await randomDelay(1000, 3000)
                console.log('任务一结束')
                setMethod1(val => val + 1)
            },
            method2: async (start: number, end: number) => {
                console.log('任务二开始')
                await randomDelay(1000, 2000)
                console.log('任务二结束')
                setMethod2(val => val + 1)
                return start + end
            },
            method3: async (result: any) => {
                console.log('任务三开始', {result})
                await randomDelay(2000, 3000)
                console.log('任务三结束')
                setMethod3(val => val + 1)
            },
            togetherMethod2and3: async () => {
                console.log('任务四开始')
                // const ret = await methods.method2()                   // 错误，缺少必须参数start以及end
                const ret = await m.method2(2, 3)
                // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
                await m.method3(ret.toFixed(2))
                console.log('任务四结束')
                setTogetherMethod2and3(val => val + 1)
            },
        }
        return m
    })(), true)

    return <>
        <div style={{backgroundColor: 'white', padding: '20px'}}>
            <h3>无论是否为同一个异步函数，同一时刻仅能够有一个异步函数在执行</h3>
            <Button.Group>
                <Button onClick={() => methods.method1('__')}>
                    <span>一号异步任务({method1})</span>
                    {!!methods.loading.method1 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method2(0, 1)}>
                    <span>二号异步任务({method2})</span>
                    {!!methods.loading.method2 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method3('?')}>
                    <span>三号异步任务({method3})</span>
                    {!!methods.loading.method3 && <Spin/>}
                </Button>
                <Button onClick={() => methods.togetherMethod2and3()}>
                    <span>四号异步任务({togetherMethod2and3})</span>
                    {!!methods.loading.togetherMethod2and3 && <Spin/>}
                </Button>
            </Button.Group>
        </div>
    </>
}

export default () => {

    return <>
        <Demo1/>
        <Demo2/>
    </>
}

/**
 * 问题
Demo2中的useAsyncMethods为什么要这样创建；
 */