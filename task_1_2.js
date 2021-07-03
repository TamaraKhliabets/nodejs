import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath = 'csv/node_mentoring_t1_2_input.csv';

csv()
      .fromFile(csvFilePath)
      .then(jsonObj => jsonObj.map(e => `\n${JSON.stringify(e)}`).join())
      .then(data => fs.writeFileSync('csv/node_mentoring_t1_2_output.txt', data, 'utf8'))
      .catch(err => console.log(err));
