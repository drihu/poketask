#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const co = require('co');
const ejs = require('ejs');
const program = require('commander');
const prompt = require('co-prompt');
const utils = require('../utils');

const location = process.cwd();
const packageObj = utils.jsonFileToObj(path.join(location, 'package.json'));
const gitignoreTemplatesFolder = path.join(__dirname, '../gitignore');
const licenseTemplatesFolder = path.join(__dirname, '../choosealicense.com/_licenses');

program
  .version('0.3.3', '-v, --version');

program
  .command('init')
  .description('create a README.md, LICENSE, .gitignore, .gitattributes & .editorconfig')
  .action(() => {
    co(function* init() {
      console.log('With poketask you\'ll be able to generate the following files:');
      console.log('README.md, LICENSE, .gitignore, .gitattributes & .editorconfig');
      console.log('\nPress ^C at any time to quit.');

      const name = packageObj.name
        ? (yield prompt(`package name: (${packageObj.name}) `)) || packageObj.name
        : yield prompt('package name: ');

      const description = packageObj.description
        ? (yield prompt(`description: (${packageObj.description}) `)) || packageObj.description
        : yield prompt('description: ');

      const author = packageObj.author
        ? (yield prompt(`author name: (${packageObj.author}) `)) || packageObj.author
        : yield prompt('author name: ');

      const license = packageObj.license
        ? (yield prompt(`license: (${packageObj.license}) `)) || packageObj.license
        : yield prompt('license: ');

      const gitkeywords = utils.toArrayOfWords(yield prompt('gitignore template: '));

      console.log('--');

      // Generate .gitignore
      fs.readdir(gitignoreTemplatesFolder, (err, templates) => {
        if (err) throw err;

        const gitignoreFile = path.join(location, '.gitignore');
        fs.writeFileSync(gitignoreFile, '');

        gitkeywords.forEach((gitkeyword) => {
          const gitkeywordRegExp = utils.toRegExp(`${gitkeyword}.gitignore`);

          templates.forEach((template) => {
            if (gitkeywordRegExp.test(template)) {
              const templatePlace = path.join(gitignoreTemplatesFolder, template);
              const templateData = fs.readFileSync(templatePlace, 'utf8');

              fs.appendFile(gitignoreFile, templateData, (e) => {
                if (e) throw e;
              });
            }
          });
        });

        console.log('.gitignore created');
      });

      // Generate .editorconfig
      utils.copyFile(
        path.join(__dirname, '../assets/.editorconfig'),
        path.join(location, '.editorconfig'),
      );

      // Generate .gitattributes
      utils.copyFile(
        path.join(__dirname, '../assets/.gitattributes'),
        path.join(location, '.gitattributes'),
      );

      // Generate LICENSE
      fs.readdir(licenseTemplatesFolder, (err, templates) => {
        if (err) throw err;
        const licenseRegExp = utils.toRegExp(`${license}.txt`);

        templates.forEach((template) => {
          if (licenseRegExp.test(template)) {
            const templatePlace = path.join(licenseTemplatesFolder, template);
            const templateData = fs.readFileSync(templatePlace, 'utf8')
              .replace(/^---[\s\S]*---\n\n/gi, '')
              .replace(/\[year\]/gi, new Date().getFullYear())
              .replace(/\[fullname\]/gi, author);

            fs.writeFile(path.join(location, 'LICENSE'), templateData, (e) => {
              if (e) throw e;
              console.log('LICENSE created');
            });
          }
        });
      });

      // Generate README.md
      fs.readFile(
        path.join(__dirname, '../assets/README.ejs'),
        'utf8',
        (err, data) => {
          if (err) throw err;
          const readmeData = ejs.render(data, {
            name,
            description,
            author,
            year: new Date().getFullYear(),
            license: license.toUpperCase(),
          });
          fs.writeFile(path.join(location, 'README.md'), readmeData, (e) => {
            if (e) throw e;
            console.log('README.md created');
          });
        },
      );

      process.stdin.pause();
    });
  });

program.parse(process.argv);
