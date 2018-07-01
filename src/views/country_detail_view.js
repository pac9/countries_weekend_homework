const Countries = require('../models/countries.js');
const PubSub = require('../helpers/pub_sub');

const CountryDetailView = function(){

}

CountryDetailView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:countries-region-selected-ready', (evt) => {
    this.createCountryDetail(evt.detail);
  });

};

CountryDetailView.prototype.createCountryDetail = function (country) {
  this.container.innerHTML = "";
  country.forEach((region) => {
  const countryDetail = document.createElement('div');
  countryDetail.classList.add('country-detail');

  const name = document.createElement('h3');
  name.textContent = country.name;
  countryDetail.appendChild(name);

  const detailsList = document.createElement('ul');
  const capital = this.createCountryListItem('Capital', country.capital);
  detailsList.appendChild(capital);

  const population = this.createCountryListItem('Population', country.population.toLocaleString());
  detailsList.appendChild(population);

  const flags = document.createElement('img');
  flags.src = `${country.flag}`;
  const src = document.getElementById(country.flag);
  const flag = this.createCountryListItem('Image', src);
  detailsList.appendChild(flags);


  countryDetail.appendChild(detailsList);
});

  return countryDetail;
};

CountryDetailView.prototype.createCountryListItem = function (label, property) {
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
};

module.exports = CountryDetailView;
