'use strict';
const { program } = require('commander'),
  validate = require('./validate'),
  transform = require('./transform'),
  fs = require("fs"),
  { pipeline } = require('stream');

program
  .storeOptionsAsProperties(false)
  .option('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode')
program.parse(process.argv);
const programOptions = program.opts();

process.on('exit', function (code) {
  return process.stdout.write(`\nApp terminated with code ${code}\n`);
});

validate.checkRequiredParams(programOptions);

const transform_stream = new transform(programOptions),
  readStream = programOptions.input ? fs.createReadStream(programOptions.input) : process.stdin,
  writeStream = programOptions.output ? fs.createWriteStream(programOptions.output, { flags: 'a', encoding: 'utf8' }) : process.stdout;

let num = 0;

readStream.on('error', err => sendError(err, 'reading', programOptions.input));
writeStream.on('error', err => sendError(err, 'writing', programOptions.output));

if(!programOptions.input) process.stdout.write(`Write text for ${programOptions.action}: `);

pipeline(
  readStream,
  transform_stream,
  writeStream,
  console.error
)

function sendError(err, txt, file) {
  if (err.code == 'ENOENT') {
    process.stderr.write(`Error ${txt} file ${file}. Check file path`);
    process.exit(1);
  } else {
    console.error(err);
  }
}