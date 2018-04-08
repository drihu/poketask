/* eslint-disable no-console */
const co = require('co');
const fs = require('fs');
const path = require('path');
const prompt = require('co-prompt');
const utils = require('../utils');

const userLocation = process.cwd();
const gitignoreTemplatesFolder = path.join(__dirname, '../../gitignore');

function commandGi(program) {
  program
    .command('gi')
    .description('create a useful .gitignore')
    .action(() => {
      co(function* gi() {
        const gitkeywords = utils.toArrayOfWords(yield prompt('gitignore template: '));

        // Generate .gitignore
        fs.readdir(gitignoreTemplatesFolder, (err, templates) => {
          if (err) throw err;

          const gitignoreFile = path.join(userLocation, '.gitignore');
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

        process.stdin.pause();
      });
    });
}

module.exports = commandGi;
