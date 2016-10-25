var papa = require('papaparse');
var _ = require('lodash');
var fs = require('fs');
var text = fs.readFileSync('./data/data.csv', 'utf8');
var data = papa.parse(text).data;

data = data.filter(function(eachLine){
	return eachLine.join('').match(/\w+/g) != null;
});

var allSeries = [ 
	 'GDP growth (annual %)',
  'GDP (current US$)',
  'GDP per capita (current US$)',
  'GNI per capita',
  'Exports of goods and services (% of GDP)',
  'Foreign direct investment',
  'GNI per capita',
  'GINI index (World Bank estimate)',
  'Inflation',
  'Inflation',
  'Internet users (per 100 people)',
  'Imports of goods and services (% of GDP)',
  'Life expectancy at birth',
  'Adult literacy rate',
  'Unemployment',
  'Poverty headcount ratio at national poverty lines (% of population)',
  'Agriculture',
  'CO2 emissions (metric tons per capita)',
  'Central government debt',
  'Population' ];

var parseRecords = function(){
	var mapToObject = function(eachRow){
		return {seriesName:eachRow[0].split(',')[0], countryName:eachRow[2], 
			"2000": eachRow[5], "2001":eachRow[6], "2002":eachRow[7], 
			"2003":eachRow[8], "2004":eachRow[9], "2005":eachRow[10], 
			"2006":eachRow[11], "2007":eachRow[12], "2008":eachRow[13], 
			"2009":eachRow[14], "2010":eachRow[15], "2011":eachRow[15], 
			"2012":eachRow[17], "2013":eachRow[18], "2014":eachRow[19], "2015":eachRow[20]};
	};
	return _.map(data, mapToObject);
};

var groupByCountry = function(parsedData){
	return _.groupBy(parsedData, 'countryName');
};

var writeSeriesDataToFile = function(groupedData){
	_.forEach(groupedData, function(fileData, fileName){
		fileData = fileData.filter(function(record){
			return allSeries.indexOf(record.seriesName) >= 0;
		});
		fs.writeFileSync("data/" + fileName.replace(' ','')+".csv", papa.unparse(fileData));
	});
};

var seriesName = function(someCountryData){
	var allSeriesNames = [];
	someCountryData.forEach(function(each){
		allSeriesNames.push(each.seriesName);
	});
	return allSeriesNames;
};

var dataPerCountry = groupByCountry(parseRecords());
writeSeriesDataToFile(dataPerCountry);

var allSeriesNames = function(dataPerCountry){
	for(var country in dataPerCountry){
		var allSeriesNames = seriesName(dataPerCountry[country]);
		return allSeriesNames;
	}
};
var allSeriesName = allSeriesNames(dataPerCountry);




