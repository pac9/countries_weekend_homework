const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const Countries = function(url){
  this.url = url;
  // console.log(url);
  this.countries = [];
  // console.log(this.countries);
};

Countries.prototype.getData = function () {
  const request = new RequestHelper(this.url);
  request.get((data) => {
    this.handleData(data);
    // this.uniqueRegions();
    const uniqueRegions = this.getRegionList();
    // console.log(uniqueRegions);
    PubSub.publish('Countries:countries-data-ready', this.countries);
    PubSub.publish('Countries:countries-regions-ready', uniqueRegions);

  });
};

//don't seem to be calling this anywhere
Countries.prototype.uniqueRegions = function () {
  //create copy of original array
   const allRegions = this.countries.map((country)=>{
   return country.name})

//filter through the array to get unique elements
   const uniqueArray = allRegions.filter((value, index, self) => {
   return self.indexOf(value) === index;
   })
   return uniqueArray
   console.log(uniqueArray);

};


Countries.prototype.getRegionList = function (region) {
  console.log(region);
  const arrayOfRegions = [];
  const uniqueArray = this.countries.forEach((country) => {
    if (country.region === region){
      arrayOfRegions.push(country);
    }
  })
  return arrayOfRegions;
  // console.log(arrayOfRegions);
};

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('CountriesOpeningPageView:change', (evt) => {
   const countries = this.getRegionList(evt.detail);
   PubSub.publish('Countries:countries-region-selected-ready', countries);
 });
};

Countries.prototype.handleData = function (data) {
  this.countries = data;
  PubSub.publish('Countries:countries-ready-to-be_loaded', this.countries);
  // console.log(this.countries);
};

module.exports = Countries;
