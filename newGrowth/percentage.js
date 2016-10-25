var papa = require('papaparse');
var _ = require('lodash');
var fs = require('fs');
var text = fs.readFileSync(process.argv[2], 'utf8');
var data = papa.parse(text).data.slice(1);

var removeDots = function(record){
	return record.map(function(each){
		return each == '..' ? 0 : parseFloat(each);
	});
}

var changeToPercentage = function(){
	return data.map(function(eachDataRecord){
		var onlyData = eachDataRecord.slice(0,16);
		onlyData = removeDots(onlyData);
		var factor = 100 / Math.max.apply(this, onlyData);
		return onlyData.map(function(each) {
			if(!isNaN(each)) return each * factor; 
			return each;
		});
	});

}

console.log(changeToPercentage());