/** ============================
 *  맵드 타입
 * . 몇 가지 규칙으로 새로운 인터페이스를 만들 수 있다.
 * . 주로 기존인터페이스의 모든 속성을 선택 속성 또는 읽기 전용으로 만들 때 주로 사용된다.
 ============================ */

// ===== 모든 속성을 선택 속성 또는 읽기 전용으로 변경.
interface Person{
  name: string;
  age: number;
}
// 맵드 타입을 적용해 만들수 있는 인터페이스의 예
interface PersonOptional{
  name?: string;
  age?: number;
}
interface PersonReadOnly{
  readonly name: string;
  readonly age: number;
}

// ===== 두개의 속성을 불 타입으로 만드는 맵드 타입
type T1 = { [K in 'prop1' | 'prop2' ]: boolean}; // 'in' 키워드 오른쪽에는 문자열의 유니온 타입이 올 수 있다.
// { prop1: boolean; prop2: boolean; } // 맵드 타입으로 만들어진 T1의 모습.


// ===== 인터페이스의 모든 속성을 불 타입 및 선택 속성으로 만들어주는 맵드 타입
type MakeBoolean<T> = { [P in keyof T] ?: boolean };
const pMap: MakeBoolean<Person> = {}; // 위에서 정의한 Person을 불리언으로 변경한다.
pMap.name = true; // boolean이어도 에러 안남
pMap.age = false;
pMap.name = '당근'; // 타입 에러


/** ============================
 *  Partial 과 Readonly 타입
 * . 타입스크립트 내장 타입인 Partial과 Readonly 는 맵드 타입으로 만들어 졌다.
 ============================ */

 // ===== 맵드 타입으로 구현하는 Partial과 Readonly
 type T2 = Person['name']; // string (interface에서 특정 문법을 추출시 사용.)
 type Readonly1<T> = {readonly [P in keyof T]: T[P]}; // 인터페이스의 모든 타입을 읽기전용으로 만들어주는 맵드 타입
 type Partial1<T> = { [P in keyof T]?: T[P] }; // 인터페이스의 모든 속성이 유니온 타입으로 만들어 진다.
 type T4 = Readonly1<Person>;
 type T3 = Partial1<Person>;


 /** ============================
 *  Pick 내장 타입
 * . 인터페이스에서 원하는 속성만 추출.
 ============================ */
// ===== Pick 내장 타입
// pick은 인터페이스 T와 해당 인터페이스의 속성 이름 K를 입력으로 받는다.
type Pick1<T, K extends keyof T> = { [P in K]: T[P] };
interface Person {
  name: string;
  age: number;
  language: string;
}
type T5 = Pick1<Person, 'name'|'language'>;
// type T5 = {name: string; language: string}; // Person에서 name, language를 추출한 결과다.

/** ============================
 *  Record 내장 타입
 * . 입력된 모든 속성을 같은 타입으로 만들어 주는 맵드 타입.
 ============================ */
type Record1<K extends string, T> = { [P in K]: T };
type T6 = Record1<'p1' | 'p2', Person>;
// type T6 = {p1: Person; p2: Person};