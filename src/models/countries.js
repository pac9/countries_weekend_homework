const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const Countries = function(url){
  this.url = url;
  // console.log(url);
  this.countries = [];
  console.log(this.countries);
  this.region = [];

};

// Countries.prototype.getData = function () {
//   const requestHelper = new RequestHelper(this.url);
//   // console.log(requestHelper);
//   requestHelper.get(data => this.handleData(data));
//     console.log(this.handleData(data));
//
// };
//
// Countries.prototype.handleData = function(data){
//   this.countries = data;
//   PubSub.publish('Countries:countries-ready-to-be_loaded', this.countries);
//   // console.log(data);
//
// }
// Countries.prototype.getData = function () {
//   const requestHelper = new RequestHelper(this.url);
//   requestHelper.get((data) => {
//     PubSub.publish('Countries:countries-ready-to-be_loaded', this.countries);
//    //   // console.log(data);
//   });
// }

Countries.prototype.getData = function () {
  const request = new RequestHelper(this.url);
  request.get((data) => {
    // this.handleData(data));
    PubSub.publish('Countries:countries-ready-to-be_loaded', data);
  });
};

// Countries.prototype.handleData = function (data) {
//   this.countries = data;
//   PubSub.publish('Countries:countries-ready-to-be_loaded', this.Countries);
// };
//
// module.exports = Countries;
// onst Munros = function () {
//   this.munrosData = [];
//   this.regions = [];
// }
//
// Munros.prototype.getData = function () {
//   const requestHelper = new RequestHelper('https://munroapi.herokuapp.com/api/munros')
//   requestHelper.get((data) => {
//     PubSub.publish('Munros:munros-ready', data);
//   });
// }

module.exports = Countries;
