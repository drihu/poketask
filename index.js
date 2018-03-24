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

program
  .version('0.2.0');

program
  .command('init')
  .description('create a README.md, LICENSE, .gitignore, .gitattributes & .editorconfig')
  .action(() => {
    co(function* init() {
      console.log('With poketask you\'ll be able to generate the following files:');
      console.log('README.md, LICENSE, .gitignore, .gitattributes & .editorconfig');
      console.log('\nPress ^C at any time to quit.');

      const project = yield prompt('package name: ');
      const description = yield prompt('description: ');
      const author = yield prompt('author name: ');
      const keywords = utils.toArrayOfWords(yield prompt('gitignore: '));

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

              fs.appendFile(gitignore, fileData, (er) => {
                if (er) throw er;
              });
            }
          });
        });

        console.log('.gitignore created');
      });

      // Generate .editorconfig
      fs.copyFile(
        path.join(__dirname, 'resources/.editorconfig'),
        path.join(location, '.editorconfig'),
        (err) => {
          if (err) throw err;
          console.log('.editorconfig created');
        },
      );

      // Generate .gitattributes
      fs.copyFile(
        path.join(__dirname, 'resources/.gitattributes'),
        path.join(location, '.gitattributes'),
        (err) => {
          if (err) throw err;
          console.log('.gitattributes created');
        },
      );

      // Generate LICENSE
      fs.readFile(
        path.join(__dirname, 'resources/LICENSE.ejs'),
        'utf8',
        (err, data) => {
          if (err) throw err;
          const newData = ejs.render(data, { author });
          fs.writeFile(path.join(location, 'LICENSE'), newData, (e) => {
            if (e) throw e;
            console.log('LICENSE created');
          });
        },
      );

      // Generate README.md
      fs.readFile(
        path.join(__dirname, 'resources/README.ejs'),
        'utf8',
        (err, data) => {
          if (err) throw err;
          const newData = ejs.render(data, { project, description, author });
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
