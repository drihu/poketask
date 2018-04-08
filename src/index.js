#!/usr/bin/env node
const program = require('commander');

program
  .version('0.3.3', '-v, --version');

require('./commands/init')(program);

program.parse(process.argv);
