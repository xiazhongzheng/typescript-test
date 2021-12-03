export default {}
// 保留元组类型T中的A类型
// type Filter<T, K, KK extends K[] = []> = T extends [infer L, ...infer R] ? (
//   L extends K ? Filter<R, K, [...KK, L]> : Filter<R, K, KK>
// ) : KK


// any是string | number | symbol的联合，extends会触发分配率，用[]包裹起来，防止触发分配率
type Filter<T, K, KK extends K[] = []> = T extends [infer L, ...infer R] ? (
  [L] extends [K] ? Filter<R, K, [...KK, L]> : Filter<R, K, KK>
) : KK
type A = Filter<[1,'BFE', 2, true, 'dev'], number> // [1, 2]
type B = Filter<[1,'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
type C = Filter<[1,'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']