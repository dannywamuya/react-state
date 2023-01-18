import { Route } from "@tanstack/react-location";
import App, { NotFound, PokemonDetail } from "./App";

const routes: Route[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
