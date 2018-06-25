const inquirer = require('inquirer');
const creator = require('../utils/create');
const utils = require('../utils/utils');

const userLocation = process.cwd();

function commandGi(program) {
  program
    .command('gi [args...]')
    .description('create a .gitignore')
    .action((args) => {
      if (args.length > 0) {
        const gitignores = args;
        creator.createGitignore(userLocation, gitignores);
      } else {
        inquirer.prompt([
          {
            name: 'gitignores',
            message: 'gitignore templates:',
          },
        ]).then((answer) => {
          console.log('--');
          const gitignores = utils.toArrayOfWords(answer.gitignores);
          creator.createGitignore(userLocation, gitignores);
        });
      }
    });
}

module.exports = commandGi;
