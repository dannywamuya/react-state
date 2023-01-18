import { Pokemon, PokemonProvider, usePokemon } from "./pokemonStore";
import { Input, Flex, Image, Text, Grid } from "@chakra-ui/react";

const SearchBox = ({ onChange }: { onChange: (p: string) => void }) => {
  return (
    <Input
      type={"text"}
      placeholder="Search Pokemon"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const SinglePokemon = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Flex
      key={pokemon.id}
      align={"center"}
      direction={"column"}
      boxShadow={"lg"}
      p={"2"}
      borderRadius={"md"}
    >
      <Image
        bg={"black"}
        p={"1"}
        borderRadius={"full"}
        boxSize={"150px"}
        alt=""
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
      />
      <Text p={"1"}>{pokemon.name}</Text>
    </Flex>
  );
};

const PokemonList = () => {
  const { pokemon, loading, setSearch } = usePokemon();
  return (
    <Flex p={"4"} direction={"column"} gap={"2"}>
      <SearchBox onChange={setSearch} />
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={6}
      >
        {!loading ? (
          pokemon.map((p) => <SinglePokemon pokemon={p} key={p.id} />)
        ) : (
          <div>loading...</div>
        )}
      </Grid>
    </Flex>
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
