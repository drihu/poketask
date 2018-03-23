#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const co = require('co');
const ejs = require('ejs');
const program = require('commander');
const prompt = require('co-prompt');
const utils = require('./utils');

const location = process.cwd();

program
  .version('0.1.0');

program
  .command('init')
  .action(() => {
    co(function* init() {
      console.log('With poketask you\'ll be able to generate the following files:');
      console.log('README.md, LICENSE, .gitignore, .gitattributes & .editorconfig');
      const project = yield prompt('package name: ');
      const description = yield prompt('description: ');
      const author = yield prompt('author name: ');
      const gitignore = utils.firstLetterToUpperCase(yield prompt('gitignore: '));

      fs.copyFile(
        path.join(__dirname, 'resources/.editorconfig'),
        path.join(location, '.editorconfig'),
        (err) => {
          if (err) throw err;
          console.log('.editorconfig created');
        },
      );

      fs.copyFile(
        path.join(__dirname, 'resources/.gitattributes'),
        path.join(location, '.gitattributes'),
        (err) => {
          if (err) throw err;
          console.log('.gitattributes created');
        },
      );

      fs.copyFile(
        path.join(__dirname, `gitignore/${gitignore}.gitignore`),
        path.join(location, '.gitignore'),
        (err) => {
          if (err) throw err;
          console.log('.gitignore created');
        },
      );

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
