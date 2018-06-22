#!/usr/bin/env node
const program = require('commander');

program.version('Poketask 0.4.3', '-v, --version');

require('./commands/init')(program);
require('./commands/gi')(program);
require('./commands/li')(program);

program.parse(process.argv);
