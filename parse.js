var papa = require('papaparse');
var _ = require('lodash');
var fs = require('fs');
var files = process.argv[2];
var parsedFileData = function(file) {
    var text = fs.readFileSync(file, 'utf8');
    return papa.parse(text).data;
}

var getAllYears = function(year) {
    return year.split(' ')[0];
}

var groupByYear = function(records, infoType) {
    var dataForAllCountries = {};
    
    records.slice(1).forEach(function(record) {
    	var result = {};
    	result.data = []
        var country = record[0];
        var feilds = ['InfoType'].concat(records[0].slice(1).map(getAllYears));
        result.data.push(feilds);
        result.data.push([infoType].concat(record.slice(1)));
        dataForAllCountries[country]  =result;
    })
    return dataForAllCountries;
}

var foo =  groupByYear(parsedFileData(files),files.match(/\w+/g)[0]);
console.log(papa.unparse(foo.India));

// 2000 [YR2000]	2001 [YR2001]	2002 [YR2002]	2003 [YR2003]	2004 [YR2004]	
// 2005 [YR2005]	2006 [YR2006]	2007 [YR2007]	2008 [YR2008]	2009 [YR2009]	2010 [YR2010]	
// 2011 [YR2011]	2012 [YR2012]	2013 [YR2013]	2014 [YR2014]	2015 [YR2015]




// [{India:{2000}}]
