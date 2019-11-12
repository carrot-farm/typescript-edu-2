import React, {createRef, Component} from 'react';
// ====  이벤트시에 발생하는 타입 정의
type EventObject = React.SyntheticEvent<HTMLElement>;

// ===== props 인터페이스
interface Props {
  containerStyle: React.CSSProperties; // 리액트 DOM 요소에 입력하는 스타일 객체의 타입
  theme :string; // 기본값이 있는 속성은 선택적 처리를 안해도 된다.
}

// ===== 기본 props
const defaultProps = {
  theme: 'dark',
};

// ===== state interface
interface State {
  name: string;
  age: number | undefined;
}

// ===== 메인 컴포넌트
class App extends Component<Props, State>{
  // ===== state 설정
  state = {
    name: 'mike',
    age: undefined,
  };

  // ===== 기본 props 설정
  static defaultProps = defaultProps;

  // =====
  pRef = createRef<HTMLParagraphElement>();

  // ===== 클릭시 이벤트 1
  onClick1 = (e: EventObject) => { // 기본 이벤트 객체
    console.log(e.currentTarget.dataset['food']);
  };

  // ===== 클릭시 이벤트 2
  onClick2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`${e.clientX}, ${e.clientY}`);
  };

  // ===== 렌더링
  render(){
    const { containerStyle, theme } = this.props;
    const {name, age} = this.state;
    return(
      <div style={containerStyle}>
        <p ref={this.pRef}>{name}</p>
        <p>{`${name} ${age}`}</p>
        <p>{`theme is ${theme}`}</p>
        <button data-food="soup" onClick={this.onClick1}>
          버튼 1
        </button>
        <button onClick={this.onClick2}>버튼 2</button>
      </div>
    )
  }
}

export default App;
