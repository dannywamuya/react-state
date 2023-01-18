import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Router, ReactLocation } from "@tanstack/react-location";
import routes from "./routes";
import { PokemonProvider } from "./pokemonStore";

const queryClient = new QueryClient();
const locationClient = new ReactLocation();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router location={locationClient} routes={routes}>
          <PokemonProvider>
            <Outlet />
          </PokemonProvider>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
