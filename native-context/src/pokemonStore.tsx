import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

type PokemonState = {
  pokemon: Pokemon[];
  loading: boolean;
  search: string;
};

type PokemonAction =
  | {
      type: "SET_POKEMON";
      payload: Pokemon[];
    }
  | { type: "SET_LOADING" }
  | { type: "SET_SEARCH"; payload: string };

type PokemonReducerType = (
  state: PokemonState,
  action: PokemonAction
) => PokemonState;

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as ReturnType<typeof usePokemonSource>
);

export const usePokemon = () => {
  return useContext(PokemonContext);
};

const usePokemonSource = () => {
  // State Reducer
  const [{ loading, pokemon, search }, dispatch] =
    useReducer<PokemonReducerType>(
      (state, action) => {
        switch (action.type) {
          case "SET_POKEMON":
            return { ...state, pokemon: action.payload, loading: false };
          case "SET_LOADING":
            return { ...state, pokemon: [], loading: true };
          case "SET_SEARCH":
            return {
              ...state,
              search: action.payload,
            };
          default:
            return state;
        }
      },
      { pokemon: [], loading: false, search: "" }
    );

  // Initial Data Fetch
  useEffect(() => {
    fetch("/pokemon.json")
      .then(async (res) => {
        dispatch({
          type: "SET_LOADING",
        });
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return res.json();
      })
      .then((data) => dispatch({ payload: [...data], type: "SET_POKEMON" }));
  }, []);

  // setSearch callback that is created only once because it does not change or have and dependencies
  // The setSearch only dispatches the action.
  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", payload: search });
  }, []);

  // Store filtered pokemon in a memo so that it's only searched again if the search
  // value changes or the pokemon list changes
  const filteredPokemon = useMemo(
    () =>
      search
        ? pokemon.filter((v) =>
            v.name.toLowerCase().includes(search.toLowerCase())
          )
        : pokemon,
    [search, pokemon]
  );

  // Store a list of sorted pokemon that is recomputed whenever filtered pokemon changes
  const sortedPokemon = useMemo(
    () => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon]
  );

  return { pokemon: sortedPokemon, loading, setSearch };
};

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
};
