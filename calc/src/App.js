import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [lastResult, setLastResult] = useState(null);
  const [justEvaluated, setJustEvaluated] = useState(false); // Track if "=" was pressed

  const handleNumbers = (e) => {
    const number = e.target.textContent;

    // Replace display if "justEvaluated" is true or reset if "0"
    if (display === "0" || justEvaluated) {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
    setJustEvaluated(false);
  };

  const handleOperator = (e) => {
    const operator = e.target.textContent;

    if (justEvaluated) {
      setDisplay(lastResult + operator);
      setJustEvaluated(false);
      return;
    }

    // Handle negative sign as a unary operator
    if (operator === "-" && (display === "0" || /[\+\-\*\/]$/.test(display))) {
      setDisplay(display + operator);
      return;
    }

    // Handle consecutive operators, prioritizing the last one
    const lastChar = display[display.length - 1];
    if (/[\+\-\*\/]$/.test(lastChar)) {
      setDisplay(display.slice(0, -1) + operator);
    } else {
      setDisplay(display + operator);
    }
  };
  const isEqualTo = () => {
    try {
      const result = eval(display); // Evaluate the expression
      setDisplay(result.toString());
      setLastResult(result); // Store the result for further operations
      setJustEvaluated(true);
    } catch {
      setDisplay("Error");
    }
  };

  const clearOut = () => {
    setDisplay("0");
    setLastResult(null);
    setJustEvaluated(false);
  };

  const setDecimal = () => {
    const parts = display.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];

    if (!lastPart.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">
          {display}
        </div>
        <div id="clear" className="row" onClick={clearOut}>
          AC
        </div>
        <div id="seven" onClick={handleNumbers}>
          7
        </div>
        <div id="eight" onClick={handleNumbers}>
          8
        </div>
        <div id="nine" onClick={handleNumbers}>
          9
        </div>
        <div id="multiply" onClick={handleOperator}>
          *
        </div>
        <div id="four" onClick={handleNumbers}>
          4
        </div>
        <div id="five" onClick={handleNumbers}>
          5
        </div>
        <div id="six" onClick={handleNumbers}>
          6
        </div>
        <div id="divide" onClick={handleOperator}>
          /
        </div>
        <div id="one" onClick={handleNumbers}>
          1
        </div>
        <div id="two" onClick={handleNumbers}>
          2
        </div>
        <div id="three" onClick={handleNumbers}>
          3
        </div>
        <div id="add" onClick={handleOperator}>
          +
        </div>
        <div id="zero" onClick={handleNumbers}>
          0
        </div>
        <div id="decimal" onClick={setDecimal}>
          .
        </div>
        <div id="equals" onClick={isEqualTo}>
          =
        </div>
        <div id="subtract" onClick={handleOperator}>
          -
        </div>
      </div>
    </div>
  );
}

export default App;
