import { useEffect, useState } from "react";
import "./App.css";

const StopWatch = () => {
  const [time, setTime] = useState(0);

  /** This is bad as setInterval runs multiple times when time is updated.
   * It eventually leads to perfomance bottlenecks
   */

  // setInterval(() => {
  //   setTime(time + 1);
  //   console.log(time);
  // }, 1000);

  /** Here, setInterval runs only once when the component is mounted and that
   * causes setTime to not update every second but stays the same value
   */

  // useEffect(() => {
  //   setInterval(() => {
  //     setTime(time + 1);
  //     console.log(time);
  //   }, 1000);
  // }, []);

  /** This causes a bad loop as setTime is called infinitely when the useEffect checks
   * whether time has changed
   */
  // useEffect(() => {
  //   setInterval(() => {
  //     setTime(time + 1);
  //     console.log(time);
  //   }, 1000);
  // }, [time]);

  /** This is perfect since it has a callback that takes the older time value
   * and returns a new value and also has a clean up function
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        console.log(t);
        return t + 1;
      });
    }, 1000);

    /** This clean up allows us to clear the setInterval when
     * the old useEffect is being rid off and the new one is starting
     */

    return () => clearInterval(interval);
  }, []);

  return <>Time: {time}</>;
};

function App() {
  const [names, setNames] = useState<string[]>([]);

  /**This is bad because it leads to an infinite loop as names is set
   * and the component re-renders leading to the fetch call again */

  // fetch("/names.json")
  //   .then((res) => res.json())
  //   .then((n: string[]) => setNames(n));

  /**This is better as the fetch is only called once when the component mounts */
  useEffect(() => {
    fetch("/names.json")
      .then((res) => res.json())
      .then((n: string[]) => setNames(n));
  }, []);

  /** It is better to have a callback that takes the name
   * and fetches the details directly as that prevents us from running
   * into issues with useEffect and also reduces the code used
   */

  // const [selectedName, setSelectedName] = useState<string>();

  const [selectedNameDetails, setSelectedNameDetails] = useState<any>();

  /** This is okay but may lead to issues as it is not always safe to
   * use a useEffect because of inifite loop risks and un
   */

  // useEffect(() => {
  //   if (selectedName) {
  //     fetch(`/${selectedName}.json`)
  //       .then((res) => res.json())
  //       .then((n: any) => setSelectedNameDetails(n));
  //   }
  // }, [selectedName]);

  /**This is better as it removes the need to combine useState and useEffect */
  const onSelectedName = (name: string) => {
    fetch(`/${name}.json`)
      .then((res) => res.json())
      .then((n: any) => setSelectedNameDetails(n));
  };

  return (
    <div className="App">
      <div>
        <StopWatch />
      </div>
      {names.map((name) => (
        <button key={name} onClick={() => onSelectedName(name)}>
          {name}
        </button>
      ))}
      <div>{JSON.stringify(selectedNameDetails, null, 2)}</div>
    </div>
  );
}

export default App;
