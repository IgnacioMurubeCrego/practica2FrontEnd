import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "https://esm.sh/axios@1.8.1";

export type SwapiResponse = {
  results: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  }[];
};

type Data = {
  character: SwapiResponse;
};
// /personaje
// /personaje?name=luke
// const {...}=
export const handler: Handlers<Data> = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const name = url.searchParams.get("name") || "";
    try {
      // la peticion a la API
      const response = await Axios.get<SwapiResponse>(
        `https://swapi.dev/api/people/?search=${name}&format=json`,
      );
      if (response.data.results.length === 0) {
        return new Response(
          `Ningún personaje encontrado con nombre : ${name}`,
          { status: 404 },
        );
      }
      const character = response.data.results[0];
      return ctx.render({ ...character }, { status: 200 });
    } catch (_e) {
      return new Response("Ha habido un error", { status: 400 });
    }
  },
};

export default function Page(props: PageProps) {
  const character = props.data;
  return (
    <div class="info">
      <h1>{character.name}</h1>
      <h3>Height: {character.height}</h3>
      <h3>Mass: {character.mass}</h3>
      <h3>Hair Color: {character.hair_color}</h3>
      <h3>Skin Color: {character.skin_color}</h3>
      <h3>Eye Color: {character.eye_color}</h3>
      <h3>Birth Year: {character.birth_year}</h3>
      <h3>Gender: {character.gender}</h3>
      <h3>Height: {character.height}</h3>
      <h3>Home world: {character.homeworld}</h3>
      <div>
        <h2>Films:</h2>
        <ul>
          {character.films.map((f: string) => {
            return <li>{f}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2>Species:</h2>
        <ul>
          {character.species.map((s: string) => {
            return <li>{s}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2>Vehicles:</h2>
        <ul>
          {character.vehicles.map((v: string) => {
            return <li>{v}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2>Starships:</h2>
        <ul>
          {character.starships.map((s: string) => {
            return <li>{s}</li>;
          })}
        </ul>
      </div>
      <h3>Created: {character.created}</h3>
      <h3>Edited: {character.edited}</h3>
    </div>
  );
}
