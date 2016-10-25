var _ = require('lodash');
var papa = require('papaparse');
var fs = require('fs');

var data = papa.parse(fs.readFileSync('./gdpGrowth.csv', 'utf8')).data;

var groupedData = _.groupBy(data, '0');

for(var fileName in groupedData){
	var individualData = groupedData[fileName];
	individualData = individualData.map(function(each) {
		each = each.slice(2);
		each.splice(1,2);
		return each;
	})
	individualData = papa.unparse(individualData);
	fileName = fileName.split(' ').join('').split(',')[0] + '.csv';
	fs.writeFileSync(fileName, individualData);
}



