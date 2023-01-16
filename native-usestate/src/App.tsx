import { useState } from "react";
import "./App.css";

function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Counter : {count}</button>;
}

function NameList() {
  const [list, setList] = useState(["Jack", "Jill", "John"]);

  /** This can be used when an expensive calculation needs to run before the component is rendered. It
   * guarantees that the state is updated only once when the component is created.
   */
  const [name, setName] = useState(() => "Ben");

  const onAddName = () => {
    if (name) {
      setList([...list, name]);

      /** The following code will not run normally and only updates the array contents after re-render.
       * Therefore list will be appended only after a change in the component state triggers a re-render
       */
      // list.push(name);
    }
    setName("");
  };

  return (
    <>
      <ul>
        {list.map((v, idx) => (
          <li key={`${idx}_${v}`}>{v}</li>
        ))}
      </ul>
      <input
        type={"text"}
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>
      <button onClick={onAddName}>Add Name</button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
      <NameList />
    </div>
  );
}

export default App;
