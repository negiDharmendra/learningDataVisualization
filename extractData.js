var _ = require('lodash');
var papa = require('papaparse');
var fs = require('fs');

var data = papa.parse(fs.readFileSync('5789d71e-926d-4c20-a5de-256abbc9cfc5_Data.csv', 'utf8')).data;

var groupedData = _.groupBy(data, '0');
var header = groupedData[Object.keys(groupedData)[0]][0];
header = header.slice(2);
header.splice(1, 2);


Object.keys(groupedData).slice(1).forEach(function(fileName) {
    var individualData = groupedData[fileName];
    individualData = individualData.map(function(each) {
        each = each.slice(2);
        each.splice(1, 2);
        return each;
    })
    individualData.unshift(header)
    individualData = papa.unparse(individualData);
    fileName.substr(/\W+/g, '');
    if (fileName != '') {
        fileName = fileName.split(' ').join('').split(',')[0] + '.csv';
        fs.writeFileSync(fileName, individualData);
        console.log(fileName + " has been created and saved in current folder");
    }
})
