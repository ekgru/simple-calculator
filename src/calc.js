import React from "react";
import Display from "./display";
import Button from "./button";
export default class Calc extends React.Component {
  constructor() {
    super();
    this.state = {
      a: "0",
      b: "",
      aIsResult: false,
      operator: "",
      isSecondNumb: false,
    };
  }
  inputNumber(number) {
    if (this.state.aIsResult && this.state.operator === "") {
      this.clearAll();
    }
    this.state.isSecondNumb
      ? this.setState((prevState) => {
          return {
            b: prevState.b === "0" ? number : prevState.b + number,
          };
        })
      : this.setState((prevState) => {
          return {
            a: prevState.a === "0" ? number : prevState.a + number,
          };
        });
  }

  chooseOperator(operator) {
    this.setState({ operator: operator, isSecondNumb: true });
  }
  getResult() {
    switch (this.state.operator) {
      case "":
        return this.state.a;
      case "+":
        return +this.state.a + +this.state.b;
      case "-":
        return this.state.a - this.state.b;
      case "/":
        return this.state.a / this.state.b;
      case "*":
        return this.state.a * this.state.b;
      case "^":
        return Math.pow(this.state.a, this.state.b);
    }
  }
  deleteLastSymbol() {
    this.state.b.length > 0
      ? this.setState((prevState) => ({ b: prevState.b.slice(0, -1) }))
      : this.state.operator
      ? this.setState(() => ({ isSecondNumb: false, operator: "" }))
      : this.setState((prevState) => ({ a: prevState.a.slice(0, -1) || "0" }));
  }
  clearAll() {
    this.setState({
      a: "0",
      b: "",
      aIsResult: false,
      operator: "",
      isSecondNumb: false,
    });
  }
  dotUpdate(state) {
    const hasDot = /\D/.test(this.state[state]);
    if (!hasDot) {
      this.setState((prevState) => {
        return { [state]: (prevState[state] || "0") + "." };
      });
    }
  }
  inputDot() {
    if (this.state.aIsResult && this.state.operator === "") {
      this.clearAll();
    }
    this.state.isSecondNumb ? this.dotUpdate("b") : this.dotUpdate("a");
  }
  displayResult(res) {
    this.setState({
      a: res + "",
      b: "",
      operator: "",
      aIsResult: true,
      isSecondNumb: false,
    });
  }
  render() {
    let operators = ["+", "-", "/", "*", "^"];
    let operatorBtns = operators.map((el, index) => (
      <Button key={index} symbol={el} action={() => this.chooseOperator(el)} />
    ));
    let numberBtns = new Array(10)
      .fill(0)
      .map((el, index) => (
        <Button
          key={9 - index}
          symbol={9 - index}
          action={() => this.inputNumber((9 - index) +'')}
        />
      ));
    return (
      <div id="calc">
        <Display display={this.state.a + this.state.operator + this.state.b} />
        <div className="calc-numb-btns">
          {numberBtns}
          <Button symbol={"."} action={() => this.inputDot()} />
        </div>
        <div className="calc-oper-btns">
          {operatorBtns}
          <Button
            symbol="="
            action={() => this.displayResult(this.getResult())}
          />
          <Button symbol="←" action={() => this.deleteLastSymbol()} />
          <Button symbol="C" action={() => this.clearAll()} />
        </div>
      </div>
    );
  }
}
