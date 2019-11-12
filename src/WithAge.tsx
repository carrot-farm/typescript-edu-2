/** ========================================
 * 고차 컴포넌트에서의 타입 정의
 ======================================== */
import React from 'react';

// ===== 고차 컴포넌트가 추가로 입력 받는 속성 값.
interface Props {
  baseAge: number;
}

// ===== 입력된 컴포넌트에 고차 컴포넌트가 추가로 포함시키는 속성값.
export interface InjectedProps {
  age: number;
}

// 입력되는 속성값 타입을 제네릭으로 받는다.
const withAge = function<ComponentProps extends object>(
  // 입력되는 컴포넌트는 자식의 속성값에 더해 InjectedProps를 추가로 받는다.
  Component: React.ComponentType<ComponentProps & InjectedProps>,
) {
  // ComponentProps & Props 는 출력되는 속성값을 타입이다.
  class WrappedComponent extends React.Component<ComponentProps & Props> {
    render(){
      const { baseAge } = this.props
      // age 속성값 추가
      return <Component age={baseAge + 5} />;
    };
  }

  return WrappedComponent;
};

export default withAge;