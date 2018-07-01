const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const Countries = function(url){
  this.url = url;
  // console.log(url);
  this.countries = [];
  // console.log(this.countries);
};

// Countries.prototype.getData = function () {
//   const request = new RequestHelper(this.url);
//   request.get((data) => {
//     this.handleData(data);
//     // PubSub.publish('Countries:countries-ready-to-be_loaded', data);
//   });
// };
Countries.prototype.getData = function () {
   const request = new RequestHelper(this.url);
   request.get((data) =>{
   const handleRequestComplete = (responseData) => {
     this.countries = responseData;
     const uniqueRegions = this.getRegionList();
     PubSub.publish('Countries:countries-data-ready', this.countries);
     PubSub.publish('Countries:countries-regions-ready', uniqueRegions);
   };
 });
}


Countries.prototype.uniqueRegions = function () {
  const allRegions = this.countries.map((country)=>{
    return country.name})

  const uniqueArray = allRegions.filter((value, index, self) => {
    return self.indexOf(value) === index;
  })
  return uniqueArray
  console.log(uniqueArray);

};

Countries.prototype.getRegionList = function (region) {
  const arrayOfRegions = [];
  const uniqueArray = this.countries.forEach((country) => {
    if (country.region === region){
      arrayOfRegions.push(country);
    }
  })
  return arrayOfRegions;
};

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt) => {
   const countries = this.getRegionList(evt.detail);
   PubSub.publish('Countries:countries-region-selected-ready', countries);
 });
};

// Countries.prototype.handleData = function (data) {
//   this.countries = data;
//   PubSub.publish('Countries:countries-ready-to-be_loaded', this.countries);
//   // console.log(this.countries);
// };

module.exports = Countries;
