export default {}

// Array里面传的值，是数组的元素的类型
type Animals = Array<{ type: string, name: string }>; // { type: string, name: string }[]
// [number] 通过下标获取元素的类型
type Animal = Animals[number]; // { type: string, name: string }
// conditional+infer 推断元素的类型
type Animal1 = Animals extends (infer T)[] ? T : never // { type: string, name: string }

var a:Animals = [{type: '', name: '1'}]
var b: Animal = {type: '', name: '1'}
var c: Animal1 = {type: '', name: '1'}

// const 断言
const valid_answers = ['yes', 'no', 'answer'] as const;
type Answer = (typeof valid_answers) // readonly ["yes", "no", "answer"]
const ans: Answer = ["yes", "no", "answer"]
type Answer1 = (typeof valid_answers)[number]; // "yes" | "no" | "answer"
const ans1: Answer1 = 'yes';// 没问题
// const ans2: Answer = 'nope';// 编译不通过


const valid_answers1 = [{type: '1'}, {name: 'xiao li'}] as const;
type Answer2 = typeof valid_answers1
const anss2: Answer2 = [{type: '1'}, {name: 'xiao li'}]
type Answer3 = Answer2[number]
const anss3: Answer3 = {type: '1'}

type Foo = { x: Array<{ y: string }> };
type TypeY = Foo['x'][number]['y'];

