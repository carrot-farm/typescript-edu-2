/** ============================
 *  제너릭
 ============================ */

// ===== 제너릭
/** 제너릭은 타입 정보가 동적으로 결정되는 타입이다.
* 제네릭을 통해 같은 규칙을 여러 타입에 적용할 수 있기 때문에
* 타입 코드를 작성할 때 발생할 수 있는 중복 코드를 제거할 수 있다. */
/** . 별도의 제한을 하지 않으면 아무 값이나 들어갈 수 있다. */

// # 리팩토링이 필요한 코드
/** 아래 2개의 코드가 중복이 상당히 많다. */
function makeNumberArray(defaultValue: number, size: number): number[] { // 숫자 배열 생성
  const arr: number [] = [];
  for( let i = 0; i < size ; i++){
    arr.push(defaultValue);
  }
  return arr;
}
function makeStringArray(defaultValue: string, size: number): string[]{ // 문자 배열 생성
  const arr: string[] = [];
  for(let i = 0; i < size; i++){
    arr.push(defaultValue);
  }
  return arr;
}
const arr1 = makeNumberArray(1, 10);
const arr2 = makeStringArray('empty', 10);

// # 함수 오버로드로 개선한 코드
/** 책에서는 오버 로드시 defaultValue가 number와 string만을 허용해야 하는데 실제는 any를 포함하게 된다. */
function makeArray(defaultValue: number, size: number): number[];
function makeArray(defaultValue: string, size: number): string[];
function makeArray(defaultValue: string | number, size: number){
  const arr = [];
  for(let i = 0; i < size; i++){
    arr.push(defaultValue);
  }
  return arr;
}
const overloadArr1 = makeArray(1, 10);
const overloadArr2 = makeArray('emply', 10);

// # 제네릭을 사용해 해결한 코드
// 타입 'T'는 함수를 사용하는 시점에서 입력되기 때문에 어떤타입인지 결정되지 않는다.
function makeArray1<T>(defaultValue: T, size: number): T[]{
  const arr: T[] = [];
  for(let i = 0; i< size ; i++){
    arr.push(defaultValue);
  }
  return arr;
}
const arr3 = makeArray1<number>(1, 10); // 타입을 number로 넘긴다.
const arr4 = makeArray1<string>('emply', 10); // 타입을 string으로 넘긴다.
// 첫번째 인자를 넘기면 타입 T도 알 수 있기 때문에 호출 시 타입 T의 정보를 명시적으로 전달하지 않아도 된다.
const arr5 = makeArray1(1, 10);
const arr6 = makeArray1('empty', 10);


// ===== 제네릭으로 스택 구현하기
// # 클래스에서 제네릭 사용
class Stack<D>{
  private items: D[] = []; // 타입 D를 아이템으로 하는 배열을 정의

  // push 메서드는 type D인 아이템을 입력으로 받는다.
  push(item: D){
    this.items.push(item);
  }

  // pop 메서드의 반환 타입은 D이다.
  pop(){
    return this.items.pop();
  }
}
// 숫자를 저장하는 스택 사용
const numberStack = new Stack<number>();
numberStack.push(10);
const v1 = numberStack.pop();
// 문자를 저장하는 스택 사용
const stringStack = new Stack<string>();
stringStack.push('empty');
const v2 = stringStack.pop();
// 검증
let myStack :  Stack<number>;
myStack = numberStack;
myStack = stringStack; // 타입에러 : 숫자 스택에 문자열 스택을 할당할 수 없다.


// ===== extends 키워드로 제네릭 타입 제한하기.
/** 별도의 제한을 하지 않으면 아무 타입이나 들어 갈 수 있기 때문에 제한을 한다. */
// # 제네릭 타입제한1
function identify<T extends number | string>(p1: T): T{ // T타입을 string | number로 제한
  return p1;
}
identify(1);
identify('a');
identify([]); // 타입 에러
// # 제네릭 타입 제한2
interface Person { // 인터페이스
  name: string;
  age: number;
}
interface Korean extends Person{ // 타입 제한 확장
  liveInSeoul: boolean;
}
function swapProperty<T extends Person>(
  p1: T,
  p2: T,
  name: keyof Person, // Person의 name 속성이어야 한다.
): void {
  const temp = p1[name];
  // 책의 내용대로 라면 문제없이 스왑 되어야 하는데 에러 검출.
  p1[name] = p2[name];
  p2[name] = temp;
}

const p1: Korean = {
  name: '홍길동',
  age: 23,
  liveInSeoul: false,
};
const p2: Korean = {
  name: '김삿갓',
  age: 31,
  liveInSeoul: false,
};
// p1, p2는 Person에 할당 가능하기 때문에 타입에러가 발생하지 않는다고 하는데 정작 에러 발생
swapProperty(p1, p2, 'age');

// # extends 조건을 만족하지 않는 코드
interface Product{
  name: string;
  price: number;
}
const p3: Product = {
  name: '시계',
  price: 1000,
}
const p4: Product = {
  name: '자전거',
  price: 2000,
};
// swapProperty(p1, p2, 'name');
