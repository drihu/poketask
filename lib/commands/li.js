/* eslint-disable no-console */
const inquirer = require('inquirer');
const path = require('path');
const create = require('../utils/create');
const utils = require('../utils/utils');

const userLocation = process.cwd();
const userPackage = utils.fromJsonFileToObj(path.join(userLocation, 'package.json'));

function commandLi(program) {
  program
    .command('li')
    .description('create a license')
    .action(() => {
      inquirer.prompt([
        {
          name: 'author',
          message: 'author name:',
          default: userPackage.author,
        },
        {
          name: 'license',
          message: 'license:',
          default: userPackage.license,
        },
      ]).then((answer) => {
        console.log('--');
        create.createLicense(userLocation, {
          license: answer.license,
          year: new Date().getFullYear(),
          author: answer.author,
        });
      });
    });
}

module.exports = commandLi;
