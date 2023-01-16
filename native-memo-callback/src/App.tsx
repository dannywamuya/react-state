import { useCallback, useMemo, useState } from "react";
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

const SortedNames = ({
  names,
  sortFunc,
}: {
  names: string[];
  sortFunc: (a: string, b: string) => number;
}) => {
  /**
   * Every time the component is mounted, we get the first log.
   * The log in the useMemo will only be logged if the dependencies change -> names or sortFunc
   * The sort func is wrapped in a useCallback so it doesn't change
   * between renders unless it's dependencies change
   */
  console.log("sorted names render");
  const list = useMemo(() => {
    console.log("sort function run");
    return names.sort(sortFunc);
  }, [names, sortFunc]);

  return <>{list.join(", ")}</>;
};

function App() {
  const [names] = useState(["John", "Ringo", "George", "Paul"]);
  const [count, setCount] = useState(0);

  /**
   * A compare function that is wrapped in useCallback to keep the function
   * from being recreated between renders if there's no change to it's inputs
   * Otherwise it will be recreated every time after renders
   */
  const sortFunction = useCallback(
    (a: string, b: string) => a.localeCompare(b) * -1,
    []
  );

  return (
    <div className="App">
      <ExpensiveCalculator />
      <SortedNames names={names} sortFunc={sortFunction} />
      <div>
        <button onClick={() => setCount(count + 1)}>Add {count}</button>
      </div>
    </div>
  );
}

export default App;
