export default {}

type name = 'firstName' | 'lastName';
interface Obj {
  firstName: 'firstNamefirstName',
  lastName: 'lastNamelastName'
}

type TName = {
  [key in name]: Obj[key];
};
// keyof取对象的key，组成联合类型
type name1 = keyof Obj

type TName1 = {
  [key in name1]: Obj[key];
};