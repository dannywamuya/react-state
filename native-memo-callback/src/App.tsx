import { useMemo, useState } from "react";
import "./App.css";

const ExpensiveCalculator = () => {
  const [numbers, setNumbers] = useState([40, 30, 20]);

  /** We use use memo to memoize the total of the numbers so
   * that the calculation is ran only once unless the numbers change
   * useMemo compares the current dependency array with the previous
   * one and if they are similar, it will not run the computation again
   * as it would have the same result
   *  */
  const total = useMemo(() => numbers.reduce((p, c) => p + c, 0), [numbers]);

  return (
    <>
      <div>Total: {total}</div>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ExpensiveCalculator />
    </div>
  );
}

export default App;
