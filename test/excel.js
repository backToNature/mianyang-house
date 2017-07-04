const xlsx = require('node-xlsx').default;

// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/excel.xls`));
// Parse a file 
const workSheetsFromFile = xlsx.parse(`${__dirname}/excel.xls`);

console.log(workSheetsFromFile[0].data[0])


