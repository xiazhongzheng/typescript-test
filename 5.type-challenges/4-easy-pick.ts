type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

interface Todo {
    title: string
    description: string
    completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>
type a = Pick<Todo, 'title'>



type aa = 'title' | 'completed' | 'description'
type bb = keyof Todo

type aaa = aa extends bb ? true : false
type bbb = bb extends aa ? true : false

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}