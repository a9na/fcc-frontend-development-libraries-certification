import React from 'react';
import math from 'mathjs'; 

const Calculator = () => {
  const [input, setInput] = React.useState("0");
  const [equation, setEquation] = React.useState("");
  const [allowDecimal, setAllowDecimal] = React.useState(true);

  const onNumberClick = (n) => {
    if (n === ".") {
      if (input.includes(".")) {
        return;
      }
      setAllowDecimal(false);
      setInput(prev => prev === "0" ? "0." : prev + n);
    } else if (/^[0-9]$/.test(n)) {
      setInput(prev => prev === "0" ? n : prev + n);
    } else {
      if (/[+\-*/]$/.test(input)) {
        setInput(prev => prev.slice(0, -1) + n);
      } else {
        setInput(prev => prev + n);
      }
      setAllowDecimal(true);
    }
  };

  const onEqualClick = () => {
    try {
      const result = math.evaluate(input).toString();
      setEquation(input);
      setInput(result);
      setAllowDecimal(!result.includes("."));
    } catch (error) {
      setInput("Error");
    }
  };

  const onClear = () => {
    setInput("0");
    setEquation("");
    setAllowDecimal(true);
  };

  const onUndo = () => {
    setInput(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
  };

  return (
    <div className="Calculator">
      <input id="equation" value={equation} readOnly />
      <input id="display" value={input} readOnly />
      <div id="numbers-operators">
        <div id='numbers'>
          <button id="one" onClick={() => onNumberClick("1")}>1</button>
          <button id="two" onClick={() => onNumberClick("2")}>2</button>
          <button id="three" onClick={() => onNumberClick("3")}>3</button>
          <button id="four" onClick={() => onNumberClick("4")}>4</button>
          <button id="five" onClick={() => onNumberClick("5")}>5</button>
          <button id="six" onClick={() => onNumberClick("6")}>6</button>
          <button id="seven" onClick={() => onNumberClick("7")}>7</button>
          <button id="eight" onClick={() => onNumberClick("8")}>8</button>
          <button id="nine" onClick={() => onNumberClick("9")}>9</button>
          <button id="decimal" onClick={() => onNumberClick(".")}>.</button>
          <button id="zero" onClick={() => onNumberClick("0")}>0</button>
          <button id="undo" onClick={onUndo}>←</button>
        </div>
        <div id='operators'>
          <button id='clear' onClick={onClear}>AC</button>
          <button id="add" onClick={() => onNumberClick("+")}>+</button>
          <button id="subtract" onClick={() => onNumberClick("-")}>-</button>
          <button id="multiply" onClick={() => onNumberClick("*")}>*</button>
          <button id="divide" onClick={() => onNumberClick("/")}>/</button>
          <button id="equals" onClick={onEqualClick}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
