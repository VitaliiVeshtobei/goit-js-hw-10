import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  serchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.serchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  if (`${evt.target.value.trim()}` === '') {
    refs.countryList.innerHTML = '';
    return;
  }
  fetchCountries(`${evt.target.value.trim()}`)
    .then(countries => {
      if (countries.length - 1 > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 1) {
        return renderCountryInfo(countries);
      }
      renderCountryList(countries);
    })

    .catch(onFetchError);
}

function renderCountryList(countries) {
  const markupCountryList = countries
    .map(country => {
      return `<li class="country-element"><img src="${country.flags.svg}" width = 50 ><span class="name-country">${country.name.common}</span></li>`;
    })
    .join('');
  refs.countryList.innerHTML = markupCountryList;
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}

function renderCountryInfo(countries) {
  const markupCountryInfo = countries
    .map(country => {
      return `<h1><img src="${
        country.flags.svg
      }" width = 50 ><span class="name-country">${
        country.name.common
      }</span></h1>
      <p>Capital: ${country.capital}</p><p>Population: ${
        country.population
      }</p><p>Languages: ${Object.values(country.languages)}</p>`;
    })
    .join('');
  refs.countryInfo.innerHTML = markupCountryInfo;
}
