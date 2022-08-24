export function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages
`).then(result => {
    console.log(result);
  });
}
