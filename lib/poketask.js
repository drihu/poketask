#!/usr/bin/env node
const program = require('commander');

program.version('poketask version 0.5.0', '-v, --version');

require('./commands/init')(program);
require('./commands/ga')(program);
require('./commands/gi')(program);
require('./commands/li')(program);

program.parse(process.argv);
