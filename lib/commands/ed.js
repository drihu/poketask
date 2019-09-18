const creator = require('../utils/creator');

const userLocation = process.cwd();

function commandEd(program) {
  program
    .command('ed')
    .description('create a .editorconfig')
    .action(() => {
      creator.createEditorconfig(userLocation);
    });
}

module.exports = commandEd;
