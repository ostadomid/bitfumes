var db = require('./db.json')
var db2 = db.quotes.map((e, i) => ({ id: i + 1, ...e }));
const fs = require('fs')

fs.writeFileSync('./db2.json', JSON.stringify({ "quotes": db2 }));