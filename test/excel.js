const xlsx = require('node-xlsx').default;
const fs = require('fs');
const path = require('path');
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/excel.xls`));
// Parse a file 
// const workSheetsFromFile = xlsx.parse(`${__dirname}/excel.xls`);
//
// console.log(workSheetsFromFile[0].data[0])



const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
let buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
fs.writeFileSync(path.join(__dirname, 'test.xls'), buffer);
// console.log(__dirname)







