/** ============================
 *  조건부 타입
 * . 입력된 제네릭 타입에 따라 타입을 결정할 수 있다.
 * . extends와 ? 기호를 사용해서 정의한다.
 ============================ */
// ===== 기본적인 조건부 타입
// T extends U ? X : Y // 조건부 타입의 기본 구조
type IsStringType<T> = T extends string ? 'yes' : 'no'; // 입력된 타입이 string 일 경우 yes 아닐경우 no
type T7 = IsStringType<string>; // 'yes'
type T8 = IsStringType<number>; // 'no'
// 유니온 타입을 이용시
type T9 = IsStringType<string | number>; // 'yes' | 'no'
type T10 = IsStringType<string> | IsStringType<number>; // 위와 같다.



/** ============================
 *  Exclude, Extract 내장 타입
 * . Exclude: 첫번째 서브타입에서 두번째 서브타입에 해당하는 타입을 제거
 * . Extract: 두번째 서브타입에서 첫번째 서브타입에 해당하는 타입을 제거.
 ============================ */
// ===== 기본 사용 예
type T11 = number | string | never; // string |  number;(never는 제거된다.)
type Exclude1<T, U> = T extends U ? never : T; // Exclude의 원형
type T12 = Exclude1<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3 | 7(U의 서브타입인 1, 5, 9 가 있을 경우 제거)
type T13 =  Exclude1<string | number | (()=>void), Function>; // strring | number(Fucntion 제거)
type Extract1<T, U> = T extends U ? T : never; // Extract의 원형
type T14 = Extract1<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5



/** ============================
 *  ReturnType 내장 타입
 * . 함수의 반환 타입을 추출한다.
 * . 입력된 타입이 함수이면 함수의 반환 타입이 사용되고 그렇지 않으면 any 타입이 사용된다.
 * . infer 키워드를 통해 함수의 반환 타입을 저장할 수 있다.
 * . infer는 조건부 타입을 정의할 때 extends 키워드 뒤에 사용된다.
 ============================ */
// ===== 기본 사용 예
type ReturnType1<T> = T extends (...args: any[]) => infer R ? R : any; // 리턴 타입의 원형
type T15 = ReturnType1<()=>string>; // string
function f4(s : string): number {
  return s.length;
}
type T16 = ReturnType1<typeof f1>; // number

// ===== infer 키워드를 중첩해서 사용하는 예
type Unpacked<T> = T extends (infer U)[] // 타입 T가 U의 배열이면 U가 사용된다.
  ? U
  : T extends (...args: any[]) => infer U // 함수면 반환 타입이 사용된다.
    ? U
    : T extends Promise<infer U> ? U : T; // 프로미스면 프로미스에 입력된 제네릭 타입이 사용된다.
type T17 = Unpacked<string>; // string (아무것도 만족하지 않기 때문에 자기 자식이 된다.)
type T18 = Unpacked<string[]>; // string
type T19 = Unpacked<() => string>; // string
type T20 = Unpacked<Promise<string>>; // string
type T21 = Unpacked<Promise<string>[]>; // Promise<string> (Promise<string>의 배열이므로 Promise<string>이 된다.)
type T22 = Unpacked<Unpacked<Promise<string>>>; // string




