import { useState } from "react";
import "./App.css";

function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Counter : {count}</button>;
}

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
