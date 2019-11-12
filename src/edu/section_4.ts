/** ============================
 *  타임의 호환성
 ============================ */
// ===== 숫자와 문자열의 타입 호환성
function func1(a: number, b: number | string) {
    const v1: number | string = a; // number는 number | string에 할당 가능하다.
    const v2: number = b; // 타입에러(number | string 은 number에 할당 가능하지 않다.)
}
function func2(a: 1 | 2) {
    const v1: 1 | 3 = a; // 타입에러
    const v2: 1 | 2 | 3 = a;
}



// ===== 인터페이스와 타입 호환성
/** 타입스크립트는 값 자체의 타입 보다는 내부 구조에 기반해서 호환성을 검사한다.
 * 다음과 같은 경우 호환이 가능하다.
 */
interface Person9{
    name: string;
    age: number;
}
interface Product4{
    name: string;
    age: number;
}
const person: Person9 = { name: 'mike', age: 23 };
const product: Product4 = person; // 같은 구조의 타입을 가지기 때문에 호환 가능하다.



// ===== 선택 속성이 타입 호환성에 미치는 영향
// # 선택 속성 때문에 할당 가능하지 않은 예
interface Person10{
    name: string;
    age?: number;
}
interface Product5{
    name: string;
    age: number;
}
const person10: Person10 = { name: 'mike', age: 23 };
const product10: Product5 = person10; // Person10의 집합이 더 크기 때문에 에러가 난다.
// # 선택 속성 때문에 할당 가능한 예
interface Person11{
    name: string;
    age: number;
}
interface Product6{
    name: string;
    age?: number;
}
const person11: Person10 = { name: 'mike', age: 23 };
const product11: Product6 = person11; // Product6 집합이 더 크기 때문에 할당 가능하다.



// ===== 함수 타입의 호환성
// # 함수 타입의 호환성
type F1 = (a: number, b: string) => number;
type F2 = (a: number) => number;
type F3 = (a: number) => number | string;

let f1: F1 = (a, b) => 1;
let f2: F2 = (a) => 1;
let f3: F3 = (a) => 1;
f1 = f1;
f2 = f1; // f1의 매개 변수가 더 많으므로 할당가능하지 않다.
f2 = f3; // f3의 반환 타입은 f2로 할당 가능하지 않다.


// ===== map 메서드를 통해 알아보는 함수 타입의 호환성
function addOne(value: number){
  return value + 1;
}
const result = [1, 2, 3].map<number>(addOne); // 제네릭의 nuber는 addOne의 반환 타입을 의미
// (value: number, index: number, array: number[]) => number;