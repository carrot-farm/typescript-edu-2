// ===== number, boolean, string
const size: number = 123;
const isBig: boolean = size >= 100;
const msg: string = isBig ? '크다' : '작다';

// ===== number array
const values: number[] = [1, 2, 3];
const values2: Array<number> = [1, 2, 3];

// ===== string
values.push('a');
values2.push('b');

// ===== 튜플 타입
const data: [string, number] = [msg, size]; // 문자열과 숫자열로 구성된 튜플 타입 정의.
data[0].substr(1); // 첫번째는 문자열이라 메소드가 정상 작동.
data[1].substr(1); // 숫자인데 문자열 메소드를 호출 해서 에러가 난다.

// ===== any
let value: any;
value = 123;
value = '456';
value = () => { };

// ===== void
function f1(): void {
    console.log('hello');
}

// ===== never
// 항상 예외처리
function f2(): void{
    throw new Error('some error');
}
// 루프가 종료되지 않음
function f3(): void{
    while (true) {
        // ...
    }
}

// ===== object
let v: object;
v = { name: 'abc' };
console.log(v.name); // 속성값에 대한 타입 정보가 없기 때문에 에러가 발생한다.
console.log(v.prop1); // 상동

// ===== 교차타입 (합집합 연산)
let cc1: 3 & 3 ;
cc1 = 3; // 위의 조건을 모두 만족하는 값
cc1 = 55;

// ===== 유니온타입 (교집합 연산)
let cc2: 3 | 55 ;
cc2 = 3; // 위의 조건을 모두 만족하는 값
cc2 = 55;

// ===== 교차타입과 유니온타입
let v1: (1 | 3 | 5) & (3 | 5 | 7);
v1 = 3; // 3, 5 만 올 수 있다.
v1 = 1; // 3, 5 외의 값이 왔기 때문에 타입 에러


// ===== 타입에 별칭 주기
type Width = number | string; // number | string 타입에 'Width'라는 별칭 부여
let width: Width;
width = 100;
width = '100px';


// ===== 열거형 타입 ( enum 키워드를 사용해 정의 )
enum Fruit { // 열거형을 이용해 과일을 정의
    Apple,
    Banana,
    Orange,
}
const vf1: Fruit = Fruit.Apple; // 열거형 타입의 원소인 Apple을 값으로 사용했다.
const vf2: Fruit.Apple | Fruit.Orange = Fruit.Orange; // Fruit의 속성값을 유니온 타입으로 정의

// ===== 명시적으로 원소값 입력하기.
enum Fruit2 {
    Apple, // 열거형 타입의 첫번째 원소에 값을 할당하지 않으면 자동으로 0이 할당.
    Bababa = 5, // 숫자나 문자 할당 가능
    Orange, // 값을 입력하지 않으면 이전원소에서 1만큼 증가한 값이 할당된다.
}
console.log(Fruit2.Apple, Fruit2.Bababa, Fruit2.Orange) // 0, 5, 6

// ===== 열거형 타입의 객체 사용
// 열거형 타입을 사용할 경우 일반적으로 양방향 맵핑이 되서 어느쪽에서나 접근이 가능하다.
enum Fruit3 {
    Apple,
    Banana = 5,
    Orange,
}
console.log(Fruit3.Banana); // 5
console.log(Fruit3['Banana']); // 5
console.log(Fruit3[5]); // Banana

// ===== 열거형 타입의 문자열 할당
// 문자열 사용시에는 같은 값이 있을 경우 충돌을 방지하기 위해 단반향으로만 맵핑된다.
enum Language{
    Korean = 'ko',
    English = 'en',
    Japanese = 'jp',
}

// ===== 열거형 타입에서 사용할 사용자 함수
// # 원소의 갯수를 알려주는 함수
function getEnumLength(enumObject: any) {
    const keys = Object.keys(enumObject);
    // enum의 값이 숫자이면 두 개씩 들어가므로 문자열만 계산한다.
    return keys.reduce(
        (acc, key) => (typeof enumObject[key] === 'string' ? acc + 1 : acc),
        0
    );
}
// # 열거형 타입에 존재하는 값인지 검사하는 함수
function isValidEnumValue(enumObject: any, value: number | string) {
    if (typeof value === 'number') {
        // 값이 숫자일 경우 양방향 맵핑 되어 있는 지 확인.
        return !!enumObject[value];
    } else {
        // 값이 문자열이면 양방향 맵핑에 의해 생성된 키를 제거하고 해당 값이 존재하는지 검사
        return (
            Object.keys(enumObject)
                .filter(key => isNaN(Number(key)))
                .find(key => enumObject[key] === value) != null
        )
    }
}
// # 사용 예시
enum Fruit4{
    Apple,
    Banana,
    Orange,
}
enum Language2 {
    Korean = 'ko',
    English = 'en',
    Japanese = 'jp'
}
console.log(getEnumLength(Fruit4), getEnumLength(Language2)); // 3 3
console.log('1 in Fruit : ', isValidEnumValue(Fruit4, 1)  ); // true
console.log('5 in Fruit : ', isValidEnumValue(Fruit4, 5)  ); // false
console.log('ko in Language : ', isValidEnumValue(Language2, 'ko')  ); // true
console.log('korean in Language : ', isValidEnumValue(Language2, 'Korean')  ); // false
// # 테스트 코드
enum Fruit5{
    Apple,
    Banana,
    Orange,
}
const FRUIT_PTICE = { // 과인의 정보를 가진 객체
    [Fruit5.Apple]: 1000,
    [Fruit5.Banana]: 1500,
    [Fruit5.Orange]: 1000,
}
test('FRUIT_PRICE에 정의되지 않은 Fruit가 있는지 체크', () => {
    // 원소의 수량을 항상 동일하게 유지 하는지 체크
    expect(getEnumLength(Fruit5)).toBe(Object.keys(FRUIT_PTICE).length);
});

// ===== 상수 열거형 타입
// 열거형 타입은 컴파일 이후에도 남아있는데 열거형 타입의 객체에 접근하지 않는다면
// 상수 열거형 타입을 이용해 컴파일 결과에 열거형 타입의 객체를 남겨 놓지 않을 수 있다.
// # 열거형
const enum Fruit6{
    Apple,
    Bababa,
    Orange
}
const fruit: Fruit6 = Fruit6.Apple;
const enum Language3{
    Korean = 'ko',
    English = 'en',
    Japanese = 'jp',
}
const lang: Language3 = Language3.Korean;
// # 상수 열거형을 사용할 수 없는 경우
const enum Fruit7{
    Apple,
    Banana,
    Orange,
}
console.log(getEnumLength(Fruit7)); // error: 열거형 타입의 객체를 사용할 수 없다.

// ===== 함수타입
// 매개변수 타입, 반환 타입 필요.
function getInfoText(name: string, age: number): string {
    const nameText = name.substr(0, 10); // 문자열 메서드 사용. 문자열이 아니었다면 에러
    const ageText = age > 35 ? 'senior' : 'junior'; // age는 숫자이므로 다른숫자와 비교가능
    return `name: ${nameText}, age: ${ageText}`;
}
const r1: string = getInfoText('mike', 23);
const r2: string = getInfoText('mike', '23'); // 두번째 파라메터에 문자열이 들어와서 타입에러
const r3: number = getInfoText('mike', 23); // 리턴값으로 숫자를 지정했는데 문자열을 받아서 타입에러.
// # 변수는 함수 타입으로 정의
const getInfoText2: (name: string, age: number) => string = function (name, age) {
    const nameText = name.substr(0, 10);
    const ageText = age > 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}`;
}

// ===== 선택 매개변수
/** 선택매개변수는 반드시 입력하지 않아도 되는 매개변수. */
// # 사용예
function getInfoText3(name: string, age : number = 15, language?: string): string{
    const nameText = name.substr(0, 10);
    const ageText = age > 35 ? 'senior' : 'junior';
    const languageText = language ? language.substr(0, 10) : '';
    return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}
getInfoText3('mike', 23, 'ko');
getInfoText3('mike', 23); // 파라메터를 전달해도 에러가 나지 않는다.
getInfoText3('mike', 23, 32); // 타입에러
// # 선택 매개변수 오른쪽에 필수 매개변수를 정의 하면 에러가 난다.
function getInfoText4(name: string, language?: string, age: number): string {
    const nameText = name.substr(0, 10);
    const ageText = age > 35 ? 'senior' : 'junior';
    const languageText = language ? language.substr(0, 10) : '';
    return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}
// # 선택 매개변수 오른쪽에 필수 매개변수 정의시 에러 나지 않게 하려면 유니온 타입으로 undefined를 정의해준다.
function getInfoText5(name: string, language: string | undefined, age: number): string {
    const nameText = name.substr(0, 10);
    const ageText = age > 35 ? 'senior' : 'junior';
    const languageText = language ? language.substr(0, 10) : '';
    return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}
getInfoText5('mike', undefined, 23);

// ===== 매개변수의 기본값 정의 하기
function getInfoText6(name: string, age: number = 15, language= 'korean'): string{
    const nameText = name.substr(0, 10);
    const ageText = age > 35 ? 'senior' : 'junior';
    const languageText = language ? language.substr(0, 10) : '';
    return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}
// 다음의 경우 모두 에러없이 실행된다.
getInfoText6('mike');
getInfoText6('mike', 23);
getInfoText6('mike', 23, 'english');
// # 나머지 매개 변수는 배열로 정의 가능하다.
function getInfoText7(name: string, ...rest: string[]): string{
    // ...
}

// ===== this 타입
// this는 타입을 정의하지 않으면 any로 정의된다.
// any는 사용하지 않는 것이 좋으니 가급적 정의해 주자.
// # this 타입을 정의하지 않은 코드
function getParam(index: number): string{
    const params = this.splt(','); // split을 splt로 오타 냈지만 this는  any 타입 이기때문에 오류는 내지 않는다.
    if (index < 0 || params.length <= index) {
        return '';
    }
    return this.spit(',')[index];
}
// # this의 타입은 첫번째 매개변수 위치에 정의 가능하다.
function getParam2(this: string, index: number): string {
    const params = this.splt(','); // 타입에러
    //...
}

// ===== 원시 타입에 메서드 추가하기
// interface를 사용한다.
interface String { // interface를 이용해서 이미존재하는 문자열 타입에 메서드를 추가
    getParam(this: string, index: number): string;
}
String.prototype.getParam = getParam; // 문자열의 프로토 타입에 내가 작성한 위의 함수 등록
console.log('asdf, 1234, ok '.getParam(1)); // 문자열에서 getParam 호출 가능

// ===== 함수 오버로드 : 여러개의 타입 정의하기
// 하나의 함수에 여러개의 타입을 정의하고 싶을 때.
// 가정사항:
// * 두 매개변수가 문자열이면 문자열반환
// * 두 매개변수가 숫자면 숫자 반환
// * 두 매개변수를 서로 다른 타입으로 입력하면 안된다.
// # 오버로드 사용하지 않을 때
function add(x: number | string, y: number | string): number | string {
    if (typeof x === 'number' && typeof y === 'number') {
        return x + y;
    } else {
        const result = Number(x) + Number(y);
        return result.toString();
    }
}
// # 오버로드 사용
// 매개변수와 반환 타입 정의
function add1(x: number, y: number): number;
function add1(x: string, y: string): string;
// 실제 구현시 위에서 정의한 타입은 제외됨.
function add1(x: number | string, y: number | string): number | string{
    if (typeof x === 'number' && typeof y === 'number') {
        return x + y;
    } else {
        const result = Number(x) + Number(y);
        return result.toString();
    }
}
const rr1: number = add1(1, 2); // 두 매개변수 모두 숫자 타입이므로 에러 발생 안함.
console.log(add(1, '2')); // 타입 에러

// ===== 명명된 매개변수
// # 명명된 매개변수 타입 정의
function getInfoText8({
    // 매개변수 초기값과 이름 정의
    name,
    age = 15,
    language,
}: {
    // 매개변수 타입 정의
    name: string;
    age?: number;
    language?: string;
}): string {
    const nameText = name.substr(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}, language: ${language}`
}
// # 인터페이스를 사용한 매개변수 타입 재사용.
interface Param {
    name: string;
    age?: number;
    language?: string;
}
function getInfoText9({ name, age = 15, language }: Param): string{
    // ...
}

// ===== 인터페이스
/** 자바와는 달리 메서드외에 더 다양한 것을 정의한다. */
// # 객체의 속성 타입 정의
interface Person{
    name: string,
    age: number,
}
const p1: Person = { name: 'mike', age: 23 };
const p2: Person = { name: 'mike', age: 'ten' }; // 타입 에러

// # 선택속성 정의
interface Person1{
    name: string;
    age?: number;
}
const p1_1: Person1 = { name: 'mike' }; // 타입에러

// # undefined 를 이용한 타입 정의
interface Person2{
    name: string;
    age: number | undefined; // undefined 유니온 타입으로 정의
}
const p1_2: Person2 = { name: 'mike' }; // 타입에러
const p1_3: Person2 = { name: 'mike', age: undefined }; // undefined 사용시에는 명시를 해줘야 한다.

// # 읽기전용 속성
interface Person3{
    readonly name: string;
    age?: number;
}
const p3_1: Person3 = { name: 'mike' };
p3_1.name = 'jone'; // readonly 이기 때문에 컴파일에러


// # 정의되지 않은 속성값에 대한 처리
interface Person4{
    readonly name: string;
    age?: number;
}
const p4_1: Person4 = { name: 'mike', birthday: '1997-01-01' }; // 타입에러
const p4_2 = { name: 'mike', birthday: '1997-01-01' }; //
const p4_3: Person4 = p4_2; // 정의 되지 않은 속성이 있어도 에러가 발생하지 않는다.

// ===== 인터페이스로 정의 하는 인덱스 타입
// # 인덱스 타입
/** 속성이름을 구체적으로 정의하지 않고 값의 타입만을 정의하는 것. */
interface Person5{
    readonly name: string;
    age: number;
    [key: string]: string | number;
}
const p5_1: Person5 = {
    name: 'mike',
    age: '25', // 명시적으로 적용되어 있기 때문에 타입 에러
    birthday: '1997-01-01', // 인덱스 타입으로 정의되어 있기 때문에 타입 에러가 안남.
};

// ===== 여러개의 인덱스를 정의
// // # 속성이름의 타입으로 숫자와 문자열을 동시에 사용한 경우
// interface YearPriceMap {
//     [year: number]: A; // 타입에러
//     [year: string]: B; // 타입에러
// }
// # 여러개의 인덱스를 사용해정의해서 위의 조건을 만족
interface YearPriceMap1 {
    [year: number]: number;
    [year: string]: string | number;
}
const yearMap: YearPriceMap1 = {};
yearMap[1998] = 1000;
yearMap[1998] = 'abc'; // key가 number일 경우는 값도 number 여야 하는데 그러지 않았기 때문에 타입에러가 난다.
yearMap['2000'] = 1234;
yearMap[2000] = 'million'; // 위와 같은 이유로 타입에러

// ===== 인터페이스로 함수 타입 정의하기
// # 함수 타입을 인터페이스로 정의하기
interface GetInfoText10{
    (name: string, age: number): string; // (파라메터 정의) 리턴값 정의
}
const getInfoText10: GetInfoText10 = function (name, age) {
    const nameText = name.substr(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}`;
}

// # 함수 타입에 속성값 추가하기
interface GetInfoText11{
    (name: string, age: number): string; // 함수 타입
    totalCall: number;  // 속성값
}
const getInfoText11: GetInfoText11 = function (name, age) {
    getInfoText11.totalCall += 1;
    console.log(`totalCall : ${getInfoText11.totalCall}`);
    const nameText = name.substr(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}`;
};
getInfoText11.totalCall = 0; // 인터페이스에 정의한 속성값


// ===== 인터페이스로 클래스 구현하기
interface Person6 {
    name: string;
    age: number;
    isYoungerThan(age: number): boolean;
}
class SomePerson implements Person6{ // implements 키워드를 사용해서 인터페이스를 클래스로 구현.
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    isYoungerThan(age: number) {
        return this.age < age;
    }
}

// ===== 인터페이스를 확장하기
interface Person7{
    name: string;
    age: number;
}
interface Korean extends Person7{ // 확장된 인터페이스
    isLiveInSeoul: boolean;
}

// ===== 여러 개의 인터페이스 확장하기
interface Programmer{
    favoriteProgrammingLanguage: string;
}
interface Korean2 extends Person7, Programmer{ // Person7, Programmer 인터페이스 확장
    isLiveInSeoul: boolean;
}

// ===== 인터페이스 합치기
// # 교차 타입을 이용해서 인터페이스 합치기
interface Person8{
    name: string;
    age: number;
}
interface Product3{
    name: string;
    price: number;
}
type PP = Person8 & Product3; // 인터페이스
const pp: PP = { // 합쳐진 인터페이스 적용
    name: 'a',
    age: 23,
    price: 1000,
};