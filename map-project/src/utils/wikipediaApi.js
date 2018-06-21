const wikipediaAPI =
  "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

export function getLocationSummary(locationTitle) {
  return fetch(wikipediaAPI + locationTitle, {
    headers: {
      "content-type": "application/json"
    }
  }).then(resp => resp.json());
}
