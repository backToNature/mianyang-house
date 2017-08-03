const xlsx = require('node-xlsx').default;
const fs = require('fs');
const path = require('path');
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/excel.xls`));
// Parse a file 
// const workSheetsFromFile = xlsx.parse(`${__dirname}/building.xls`);
//
// let list = [];
// if (workSheetsFromFile.length && workSheetsFromFile[0].data && workSheetsFromFile[0].data.length) {
//     workSheetsFromFile[0].data.forEach((item, index) => {
//         if (index !== 0) {
//             if (item[0]) {
//                 list.push({
//                     name: item[0],
//                     address: item[1],
//                     description: item[2],
//                     lng: item[3],
//                     lat: item[4],
//                 });
//             }
//         }
//     });
//     console.log(list);
// }



// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
// let buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
// fs.writeFileSync(path.join(__dirname, 'test.xls'), buffer);
// console.log(__dirname)







