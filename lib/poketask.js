#!/usr/bin/env node
const program = require('commander');

program
  .version('0.4.0', '-v, --version');

require('./commands/init')(program);
require('./commands/gi')(program);

program.parse(process.argv);
