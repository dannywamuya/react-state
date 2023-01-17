import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  /** Using the idRef seems unsafe as it leads to undefined behaviour
   * The count interval is not as expected.
   */
  const idRef = useRef(1);

  const [names, setNames] = useState([
    {
      id: idRef.current++,
      name: "Jack",
    },
    {
      id: idRef.current++,
      name: "John",
    },
  ]);

  /** Access dom elements with refs*/
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /** Get value from dom input element */
  const onAddName = () => {
    if (inputRef.current) {
      setNames([
        ...names,
        {
          id: idRef.current++,
          name: inputRef.current.value,
        },
      ]);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="App">
      <div>
        {names.map((n) => (
          <li key={n.id}>
            {n.id} - {n.name}
          </li>
        ))}
      </div>
      <input type={"text"} ref={inputRef} />
      <button onClick={onAddName}>Add Name</button>
    </div>
  );
}

export default App;
