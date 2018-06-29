

const CountryDetailView = function(){

}


CountryDetailView.prototype.createCountryDetail = function (country) {
  const countryDetail = document.createElement('div');
  countryDetail.classList.add('country-detail');

  const name = document.createElement('h3');
  name.textContent = country.name;
  countryDetail.appendChild(name);

  const detailsList = document.createElement('ul');
  const capital = this.createCountryListItem('Capital', country.capital);
  detailsList.appendChild(capital);

  const population = this.createCountryListItem('Population', country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  detailsList.appendChild(population);

  countryDetail.appendChild(detailsList);
  return countryDetail;
};

CountryDetailView.prototype.createCountryListItem = function (label, property) {
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
};

module.exports = CountryDetailView;
