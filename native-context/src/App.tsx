import { PokemonProvider, usePokemon } from "./pokemonStore";

const PokemonList = () => {
  const { pokemon, loading, setSearch } = usePokemon();
  return (
    <>
      <input
        type={"text"}
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      {!loading ? (
        pokemon.map((p) => <div key={p.id}>{p.name}</div>)
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

function App() {
  return (
    <PokemonProvider>
      <PokemonList />
    </PokemonProvider>
  );
}

export default App;
