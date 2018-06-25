const inquirer = require('inquirer');
const path = require('path');
const creator = require('../utils/creator');
const utils = require('../utils/utils');

const userLocation = process.cwd();
const userPackage = utils.fromJsonFileToObj(path.join(userLocation, 'package.json'));

function commandInit(program) {
  program
    .command('init')
    .description('create a README.md, LICENSE, .gitignore, .gitattributes & .editorconfig')
    .action(() => {
      console.log('With poketask you\'ll be able to generate the following files:');
      console.log('README.md, LICENSE, .gitignore, .gitattributes & .editorconfig');
      console.log('\nPress ^C at any time to quit.');

      inquirer.prompt([
        {
          name: 'name',
          message: 'package name:',
          default: userPackage.name,
        },
        {
          name: 'description',
          message: 'description:',
          default: userPackage.description,
        },
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
        {
          name: 'gitignores',
          message: 'gitignore templates:',
        },
      ]).then((answer) => {
        console.log('--');
        const gitignores = utils.toArrayOfWords(answer.gitignores);

        creator.createGitignore(userLocation, gitignores);

        creator.createEditorconfig(userLocation);

        creator.createGitattributes(userLocation);

        creator.createLicense(userLocation, {
          license: answer.license,
          year: new Date().getFullYear(),
          author: answer.author,
        });

        creator.createReadme(userLocation, {
          name: answer.name,
          description: answer.description,
          year: new Date().getFullYear(),
          author: answer.author,
          license: answer.license.toUpperCase(),
        });
      });
    });
}

module.exports = commandInit;
