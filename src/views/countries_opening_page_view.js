const Countries = require('../models/countries');
const PubSub = require('../helpers/pub_sub');
const CountryDetailView = require('./country_detail_view');

const CountriesOpeningPageView = function(container, dropElement){
  this.container = container;
  // console.log(container);
  this.dropElement = dropElement;
  // console.log(dropElement);
};

CountriesOpeningPageView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:countries-ready-to-be_loaded', (evt) => {
    this.renderCountriesList(evt.detail);
  });
  PubSub.subscribe('Countries:countries-regions-ready', (evt) => {
    this.populateListOfRegions(evt.detail);
  });
  //
  this.dropElement.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('CountriesOpeningPageView:change', selectedIndex);
  })

  PubSub.subscribe('Countries:countries-region-selected-ready', (evt) => {
      this.createCountryDetail(evt.detail);
    });
};

CountriesOpeningPageView.prototype.populateListOfRegions = function (regions) {
   regions.forEach((region) => {
     console.log(region);
     const countryRegion = document.createElement('option');
     countryRegion.textContent = region;
     countryRegion.value = region;
     this.dropElement.appendChild(countryRegion);
   });
 };

CountriesOpeningPageView.prototype.renderCountriesList = function (countries) {
  // console.log(countries);
  countries.forEach((country) => {
    const countryItem = this.createCountryListItem(country);
    this.container.appendChild(countryItem);
  });
};

CountriesOpeningPageView.prototype.createCountryListItem = function (country) {
  const countryDetailView = new CountryDetailView();
  const countryDetail = countryDetailView.createCountryDetail(country);
  return countryDetail;
  console.log(countryDetail);
};

module.exports = CountriesOpeningPageView;
