# Poketask
> A simple command to start any project. Run the command to create a README.md, LICENSE, .gitignore, .gitattributes, and .editorconfig with a one-line command.

Currently, it is compatible with older Node versions.

## Installation
```bash
npm install -g poketask
```

## Usage
It is recommended to execute the command after *npm init* in your project's root folder. It will then create a README.md, LICENSE, .gitignore, .gitattributes and .editorconfig.
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
The project uses the github gitignore templates and also accepts multiple gitignore workspaces and license templates.

The list of gitignore templates can be found [here](https://github.com/github/gitignore). And the list of license templates is [here](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses).

## License
Copyright &copy; 2018 Ricardo Huamani

Licensed under the terms of the MIT license.
