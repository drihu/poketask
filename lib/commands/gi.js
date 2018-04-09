/* eslint-disable no-console */
const inquirer = require('inquirer');
const create = require('../utils/create');
const utils = require('../utils/utils');

const userLocation = process.cwd();

function commandGi(program) {
  program
    .command('gi')
    .description('create a useful .gitignore')
    .action(() => {
      inquirer.prompt([
        {
          name: 'gitignores',
          message: 'gitignore templates:',
        },
      ]).then((answer) => {
        console.log('--');
        const gitignores = utils.toArrayOfWords(answer.gitignores);
        create.createGitignore(userLocation, gitignores);
      });
    });
}

module.exports = commandGi;
