var apiData = null;
var qtdPais = 0;

var popTotalDisplay = document.querySelector('#totalPopulationList');
var populacaoTotalMundial = 0;

var paisQtdDisplayDefaultElement = document.querySelector('#countCountries');
var paisQtdDisplayDefault = 0;

var favCountry = [];


var untreatedWorldPopulation = 250;
var untreatedFavWorldPopulation = 0;


var popFavTotalDisplay = document.querySelector('#favCountries');
var popFavulacaoTotalMundial = 0;

var paisFavQtdDisplayDefaultElement = document.querySelector('#totalPopulationFavorites');
var paisFavQtdDisplay = 0;

var searchField = document.querySelector("#searchField");
var btnClearSearchField = document.querySelector("#clearSearchField");

var countriesThatCanBeSearched = [];

var tempPopulation = 0;
var tempQttCountries = 0;

var displayBefore = document.querySelector('#beforLoad');
var displayAfter = document.querySelector('#afterLoad');

var continentIsChecked = "";

var countrySelected = null;

var listOfContries = document.querySelector("#countryList");
var clickedCountryDetails = document.querySelector("#countryDetail");