import { Beer } from "../../Interface/beer";

const API = {
  fetchBeers(): Promise<Beer[]> {
    return fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json());
  }
}

export default API