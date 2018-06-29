const Countries = require('../models/countries');
const PubSub = require('../helpers/pub_sub');
const CountryDetailView = require('./country_detail_view');

const CountriesOpeningPageView = function(container){
  this.container = container;
};

CountriesOpeningPageView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:countries-ready-to-be_loaded', (evt) => {
    this.renderCountriesList(evt.detail);
  });
};

CountriesOpeningPageView.prototype.renderCountriesList = function (countries) {
  console.log(countries);
  countries.forEach((country) => {
    const countryItem = this.createCountryListItem(country);
    this.container.appendChild(countryItem);
  });
};

CountriesOpeningPageView.prototype.createCountryListItem = function (country) {
  const countryDetailView = new CountryDetailView();
  const countryDetail = countryDetailView.createCountryDetail(country);
  return countryDetail;
};


module.exports = CountriesOpeningPageView;



// CountriesOpeningPageView.prototype.createCountryListItem = function (country) {
//   const countryDetailView = new MunroDetailView();
//   const munroDetail = munroDetailView.createMunroDetail(munro);
//   return munroDetail;
// };
