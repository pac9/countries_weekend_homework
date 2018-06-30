const Countries = require('./models/countries');
const CountriesOpeningPageView = require('./views/countries_opening_page_view');

document.addEventListener('DOMContentLoaded', () => {

const countries = new Countries('https://restcountries.eu/rest/v2/all');
countries.getData();
// console.log(countries);

const container = document.querySelector('#countries-list');
  const countriesOpeningPageView = new CountriesOpeningPageView(container);
countriesOpeningPageView.bindEvents();

});
