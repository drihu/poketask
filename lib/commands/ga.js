const creator = require('../utils/creator');

const userLocation = process.cwd();

function commandGa(program) {
  program
    .command('ga')
    .description('create a .gitattributes')
    .action(() => {
      creator.createGitattributes(userLocation);
    });
}

module.exports = commandGa;
