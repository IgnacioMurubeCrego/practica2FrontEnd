import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  query: string;
};

export default function Page() {
  return (
    <div class="main">
      <div class="titulo">
        SEARCH CHARACTER
      </div>
      <form action={`/personaje`} method="GET">
        <input class="input" type="text" name="name" />
        <button class="button" type="submit">Search</button>
      </form>
    </div>
  );
}
