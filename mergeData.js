var _ = require('lodash');
var papa = require('papaparse');
var fs = require('fs');

// 'Country Name',  0
//       '2000 [YR2000]', 1
//       '2001 [YR2001]',2
//       '2002 [YR2002]',3
//       '2003 [YR2003]',4
//       '2004 [YR2004]',5
//       '2005 [YR2005]',6
//       '2006 [YR2006]',7
//       '2007 [YR2007]',8
//       '2008 [YR2008]',9
//       '2009 [YR2009]',10
//       '2010 [YR2010]',11
//       '2011 [YR2011]',12
//       '2012 [YR2012]',13
//       '2013 [YR2013]',14
//       '2014 [YR2014]',15
//       '2015 [YR2015]'16

var allFiles = process.argv.slice(2);

var countryNames = fs.readFileSync('files.txt', 'utf8').split('\n');

var allFileData = allFiles.map(function(fileName) { 
	return {fileName:fileName, data:fs.readFileSync(fileName, 'utf8')};
});

var countryWiseData = allFileData.map(function(eachFileData){
	var fileName = eachFileData.fileName;
	var data = eachFileData.data.split('\r\n');
	var countryWise = data.map(function(each){
		var entry = each.split(',');
		return {country:entry[0],type:fileName.split('/')[2].split('.')[0], "2000 [YR2000]":entry[1],"2001 [YR2001]":entry[2],"2002 [YR2002]":entry[3],"2003 [YR2003]":entry[4],"2004 [YR2004]":entry[5],"2005 [YR2005]":entry[6],"2006 [YR2006]":entry[7],"2007 [YR2007]":entry[8],"2008 [YR2008]":entry[9],"2009 [YR2009]":entry[10],"2010 [YR2010]":entry[11],"2011 [YR2011]":entry[12],"2012 [YR2012]":entry[13],"2013 [YR2013]":entry[14],"2014 [YR2014]":entry[15],"2015 [YR2015]":entry[16]};
	})
	return countryWise;
});


countryWiseData = _.flatten(countryWiseData);

countryNames.forEach(function(countryName) {
	var countryData = countryWiseData.filter(function(each){
		return each.country == countryName;
	});
	console.log(papa.unparse(_.groupBy(countryData, 'country')[countryName]));
})




