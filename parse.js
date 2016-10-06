var papa = require('papaparse');
var _ = require('lodash');
var fs = require('fs');

var gdpGrowth = fs.readFileSync('./world-gdp-growth.csv','utf8');
var unemploymentRate = fs.readFileSync('./world-unemployment.csv','utf8');

var gdpGrowthParsed = papa.parse(gdpGrowth).data;
var unemploymentRateParsed = papa.parse(unemploymentRate).data[0];
console.log(gdpGrowthParsed)
// _.filter(_.groupBy(gdpGrowthParsed,'Country Name'),function(file){
	// console.log(_.groupBy(gdpGrowthParsed,'Country Name'));
// })