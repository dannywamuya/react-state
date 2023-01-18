import { Pokemon, usePokemon } from "./pokemonStore";
import {
  Input,
  Flex,
  Image,
  Text,
  Grid,
  Spinner,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useMatch, Link } from "@tanstack/react-location";

const SearchBox = ({ onChange }: { onChange: (p: string) => void }) => {
  return (
    <Input
      type={"text"}
      placeholder="Search Pokemon"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export const SinglePokemon = ({
  pokemon: { id, name },
}: {
  pokemon: Pokemon;
}) => {
  return (
    <Link key={id} to={`/pokemon/${id}`}>
      <Flex
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
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        />
        <Text p={"1"}>{name}</Text>
      </Flex>
    </Link>
  );
};

export const PokemonList = () => {
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
          <Spinner />
        )}
      </Grid>
    </Flex>
  );
};

export const NotFound = ({ message }: { message?: string }) => {
  return (
    <Flex w="100vw" h="100vh" align={"center"} justify="center">
      <Text
        fontSize={"xx-large"}
        color="white"
        fontWeight={"bold"}
        p="4"
        bg={"black"}
        borderRadius={"lg"}
      >
        {`${message ?? `404 Page`} Not Found`}
      </Text>
    </Flex>
  );
};

export const PokemonDetail = () => {
  const {
    params: { id },
  } = useMatch();

  const { pokemon } = usePokemon();

  const data = pokemon.find((p) => p.id === +id);

  if (!data) return <NotFound message={`Pokemon of ID ${id}`} />;

  return (
    <Flex w="full" h="100vh" p={"20"}>
      <Link to={"/"}>
        <Text
          p={"2"}
          ml={"-10"}
          bg="black"
          color={"white"}
          borderRadius={"lg"}
          fontSize={"2xl"}
          w="fit-content"
        >
          Home
        </Text>
      </Link>
      <Grid
        h={["100%"]}
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={"4"}
        alignItems={"center"}
      >
        <Flex
          bg={"black"}
          h="fit-content"
          borderRadius={"3xl"}
          boxShadow={"lg"}
        >
          <Image
            bg={"black"}
            p={"1"}
            borderRadius={"full"}
            boxSize={"450px"}
            alt=""
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          />
        </Flex>
        <Flex direction={"column"} align={["center", "center", "flex-end"]}>
          <UnorderedList listStyleType={"none"}>
            {Object.keys(data)
              .filter((k) => k !== "id")
              .map((key) => (
                <ListItem w="full" key={key}>
                  <Grid templateColumns={["repeat(2,1fr)"]} gap={"2"}>
                    <Text fontWeight={"bold"}>{key.toUpperCase()}</Text>
                    <Text align={"end"}>{data[key as keyof typeof data]}</Text>
                  </Grid>
                </ListItem>
              ))}
          </UnorderedList>
        </Flex>
      </Grid>
    </Flex>
  );
};

function App() {
  return <PokemonList />;
}

export default App;
