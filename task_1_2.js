import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath = 'csv/nodejs-hw1-ex1.csv';

const readStream = fs.createReadStream(csvFilePath);

const writeStream = fs.createWriteStream('csv/nodejs-hw1-ex1.txt');

readStream.pipe(
	csv()
		.on('data', data => data.toString('utf8'))
		.on('error', err => console.log(err))
).pipe(writeStream);
