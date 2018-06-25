/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const utils = require('./utils');

function appendGitignore(location, gitignores, templatesFolder, templatesUsed) {
  const regexps = gitignores.map(gitignore => utils.toRegExp(`${gitignore}.gitignore`));

  return new Promise((resolve) => {
    fs.readdir(templatesFolder, (err, templates) => {
      if (err) throw err;
      resolve(templates);
    });
  }).then((templates) => {
    let fileData = '';
    regexps.forEach((regexp) => {
      templates.forEach((template) => {
        if (regexp.test(template)) {
          const templatePlace = path.join(templatesFolder, template);
          const templateData = fs.readFileSync(templatePlace, 'utf8');
          fileData = fileData.concat(`\n# ${template}\n`);
          fileData = fileData.concat(`${templateData}`);
          templatesUsed.push(template);
        }
      });
    });
    return fileData;
  }).then((fileData) => {
    fs.appendFile(path.join(location, '.gitignore'), fileData, (err) => {
      if (err) throw err;
    });
  });
}

function createGitignore(location, gitignores) {
  const templatesFolder = [
    path.join(__dirname, '../../gitignore'),
    path.join(__dirname, '../../gitignore/Global'),
  ];
  const templatesUsed = [];
  const fileData = '# Created by https://github.com/drihu/poketask\n';

  fs.writeFileSync(path.join(location, '.gitignore'), fileData);

  Promise.all([
    appendGitignore(location, gitignores, templatesFolder[0], templatesUsed),
    appendGitignore(location, gitignores, templatesFolder[1], templatesUsed),
  ]).then(() => {
    console.log(chalk.blue(`.gitignore created with ${templatesUsed.join(', ')}`));
  });
}

function createEditorconfig(location) {
  const templatesFolder = path.join(__dirname, '../../assets');

  new Promise((resolve) => {
    utils.copyFile(
      path.join(templatesFolder, '.editorconfig'),
      path.join(location, '.editorconfig'),
    );
    resolve();
  }).then(() => {
    console.log(chalk.blue('.editorconfig created'));
  });
}

function createGitattributes(location) {
  const templatesFolder = path.join(__dirname, '../../assets');

  new Promise((resolve) => {
    utils.copyFile(
      path.join(templatesFolder, '.gitattributes'),
      path.join(location, '.gitattributes'),
    );
    resolve();
  }).then(() => {
    console.log(chalk.blue('.gitattributes created'));
  });
}

function createLicense(location, { year, author, license }) {
  const templatesFolder = path.join(__dirname, '../../choosealicense.com/_licenses');
  const regexp = utils.toRegExp(`${license}.txt`);

  new Promise((resolve) => {
    fs.readdir(templatesFolder, (err, templates) => {
      if (err) throw err;
      templates.forEach((template) => {
        if (regexp.test(template)) resolve(template);
      });
    });
  }).then((template) => {
    const templatePlace = path.join(templatesFolder, template);
    const templateData = fs.readFileSync(templatePlace, 'utf8');
    const licenseData = templateData
      .replace(/^---[\s\S]*---\n\n/gi, '')
      .replace(/\[year\]/gi, year)
      .replace(/\[fullname\]/gi, author);

    fs.writeFile(path.join(location, 'LICENSE'), licenseData, (err) => {
      if (err) throw err;
      console.log(chalk.blue(`LICENSE created under ${license.toUpperCase()}`));
    });
  });
}

function createReadme(location, {
  name,
  description,
  year,
  author,
  license,
}) {
  const templatesFolder = path.join(__dirname, '../../assets');
  const templatePlace = path.join(templatesFolder, 'README.ejs');

  new Promise((resolve) => {
    fs.readFile(templatePlace, 'utf8', (err, templateData) => {
      if (err) throw err;
      resolve(templateData);
    });
  }).then((templateData) => {
    const readmeData = ejs.render(templateData, {
      name,
      description,
      year,
      author,
      license,
    });

    fs.writeFile(path.join(location, 'README.md'), readmeData, (err) => {
      if (err) throw err;
      console.log(chalk.blue('README.md created'));
    });
  });
}

module.exports = {
  createEditorconfig,
  createGitattributes,
  createGitignore,
  createLicense,
  createReadme,
};
