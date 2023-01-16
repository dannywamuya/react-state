import { useReducer } from "react";
import "./App.css";

const NameList = () => {
  const [state, dispatch] = useReducer<(state: any, action: any) => any>(
    (state, action) => {
      switch (action.type) {
        case "SET_NAME":
          return { ...state, name: action.payload };
        case "ADD_NAME":
          return { names: [...state.names, state.name], name: "" };
        default:
          break;
      }
    },
    { name: "", names: [] }
  );
  return (
    <>
      <div>Name: {state.name}</div>
      <div>
        Names:
        <ul>
          {state.names.map((n: any, idx: any) => (
            <li key={`${n}_${idx}`}>{n}</li>
          ))}
        </ul>
      </div>
      <input
        type={"text"}
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />
      <button onClick={() => dispatch({ type: "ADD_NAME" })}>Add Name</button>
    </>
  );
};

const UserForm = () => {
  const [state, dispatch] = useReducer<(state: any, payload: any) => any>(
    (state: any, action: any) => ({
      ...state,
      ...action,
    }),
    {
      firstName: "",
      lastName: "",
    }
  );

  return (
    <>
      <form>
        <input
          type={"text"}
          value={state.firstName}
          placeholder="Enter First Name"
          onChange={(e) => dispatch({ firstName: e.target.value })}
        />
        <input
          type={"text"}
          value={state.lastName}
          placeholder="Enter First Name"
          onChange={(e) => dispatch({ lastName: e.target.value })}
        />
      </form>
      <div>FirstName: {state.firstName}</div>
      <div>LastName: {state.lastName}</div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <NameList />
      <UserForm />
    </div>
  );
}

export default App;
