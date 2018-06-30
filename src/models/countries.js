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
    // PubSub.publish('Countries:countries-ready-to-be_loaded', data);
  });
};

Countries.prototype.handleData = function (data) {
  this.countries = data;
  PubSub.publish('Countries:countries-ready-to-be_loaded', this.countries);
  // console.log(this.countries);
};

module.exports = Countries;
