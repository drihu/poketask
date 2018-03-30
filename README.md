# Poketask
> A simple command to start any project. Create a README.md, LICENSE, .gitignore, .gitattributes and .editorconfig with one command line.

Now it's compatible with older Node versions

## Installation
```bash
npm install -g poketask
```

## Usage
In your project's root folder. It will create a README.md, LICENSE, .gitignore, .gitattributes and .editorconfig
```bash
poketask init
```
Example
```bash
package name: my-package
description: description here
author: Pablo Marmol
license: mit
gitignore workspace: node laravel
```
It accepts multiple gitignore workspaces and license templates. It uses the github gitignore templates. You can see the list of options [here](https://github.com/github/gitignore). And the list of license templates [here](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses).

## License
MIT &copy; Ricardo Huamani
