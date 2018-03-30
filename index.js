#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const co = require('co');
const ejs = require('ejs');
const program = require('commander');
const prompt = require('co-prompt');
const utils = require('./utils');

const location = process.cwd();
const packageObj = utils.jsonFileToObj(path.join(location, 'package.json'));

program
  .version('0.3.1');

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

      const keywords = utils.toArrayOfWords(yield prompt('gitignore workspace: '));

      console.log('--');

      // Generate .gitignore
      fs.readdir(path.join(__dirname, 'gitignore'), (err, files) => {
        if (err) throw err;

        const gitignore = path.join(location, '.gitignore');
        fs.writeFileSync(gitignore, '');

        keywords.forEach((keyword) => {
          const keywordRegExp = utils.toRegExp(`${keyword}.gitignore`);

          files.forEach((file) => {
            if (keywordRegExp.test(file)) {
              const filePlace = path.join(__dirname, `gitignore/${file}`);
              const fileData = fs.readFileSync(filePlace, 'utf8');

              fs.appendFile(gitignore, fileData, (e) => {
                if (e) throw e;
              });
            }
          });
        });

        console.log('.gitignore created');
      });

      // Generate .editorconfig
      utils.copyFile(
        path.join(__dirname, 'resources/.editorconfig'),
        path.join(location, '.editorconfig'),
      );

      // Generate .gitattributes
      utils.copyFile(
        path.join(__dirname, 'resources/.gitattributes'),
        path.join(location, '.gitattributes'),
      );

      // Generate LICENSE
      fs.readdir(path.join(__dirname, 'choosealicense.com/_licenses'), (err, files) => {
        if (err) throw err;
        const licenseRegExp = utils.toRegExp(`${license}.txt`);

        files.forEach((file) => {
          if (licenseRegExp.test(file)) {
            const licensePlace = path.join(__dirname, `choosealicense.com/_licenses/${file}`);
            const licenseData = fs.readFileSync(licensePlace, 'utf8')
              .replace(/^---[\s\S]*---\n\n/gi, '')
              .replace(/\[year\]/gi, new Date().getFullYear())
              .replace(/\[fullname\]/gi, author);

            fs.writeFile(path.join(location, 'LICENSE'), licenseData, (e) => {
              if (e) throw e;
              console.log('LICENSE created');
            });
          }
        });
      });

      // Generate README.md
      fs.readFile(
        path.join(__dirname, 'resources/README.ejs'),
        'utf8',
        (err, data) => {
          if (err) throw err;
          const newData = ejs.render(data, { name, description, author });
          fs.writeFile(path.join(location, 'README.md'), newData, (e) => {
            if (e) throw e;
            console.log('README.md created');
          });
        },
      );

      process.stdin.pause();
    });
  });

program.parse(process.argv);
