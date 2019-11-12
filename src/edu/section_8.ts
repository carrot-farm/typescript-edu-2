/** ============================
 *  조건부 타입으로 직접 만들어 보는 유틸리티 타입
 ============================ */
// ===== 인터페이스에서 문자열 속성만 추출해서 사용하는 유틸리티 타입
// 타입 T에서 값이 문자열인 모든 속성의 이름을 유니온 타입으로 만들어 주는 타입.
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends String ? K : never
}[keyof T]; // [keyof T]는 모든 인터페이스에서 모든 속성의 타입을 유니온으로 추출한다.(이때 never는 제거된다.)
// StringProperties는 인터페이스에서 문자열인 모든 속성을 추출하는 유틸리티 타입이다.
type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T23 = StringPropertyNames<Person>; // "name" |  "nation"
type T24 = StringProperties<Person>; // {name: string; nation: string;}


/** ============================
 *  일부 속성만 제거해 주는 유틸리티 타입
 ============================ */
type Omit1<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
interface Person2{
  name: string;
  age: number;
  nation: string;
}
type T25 = Omit1<Person2, 'nation' | 'age'>; // Person2에서 nation과 age 타입 제거
const p5: T25 = {
  name: 'mike',
  age: 25, // age는 제거 되었기 때문에 타입 에러.
}


/** ============================
 *  인터페이스를 덮어 쓰는 유틸리티 타입
 ============================ */
// T에 U를 덮어쓴다.
type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
interface Person3 {
  name: string;
  age: number;
}
type T26 = Overwrite<Person3, {age: string, nation: string}>;
const p6: T26 = {
  name: 'mike',
  age: '23', // number에서 string으로 변경됨
  nation: 'korea', // 추가됨
}
