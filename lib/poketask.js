#!/usr/bin/env node
const program = require('commander');

program.version('poketask version 0.4.5', '-v, --version');

require('./commands/init')(program);
require('./commands/gi')(program);
require('./commands/li')(program);

program.parse(process.argv);
