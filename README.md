# Poketask
[![license](https://img.shields.io/badge/license-MIT-green.svg)]()

> A simple command to start any project. Run the command to create a README.md, LICENSE, .gitignore, .gitattributes, and .editorconfig with a one-line command.

Currently, it is compatible with Node >= 8.0.0

## Installation
```bash
npm install -g poketask
```

## Usage
### Command init
It is recommended to execute the command after *npm init* in your project's root folder. It will then create a README.md, LICENSE, .gitignore, .gitattributes and .editorconfig.
```bash
poketask init
```
Example
```bash
? package name: my-package
? description: description here
? author name: Pablo Marmol
? license: mit
? gitignore templates: node laravel visualstudiocode
```

### Command gi (Gitignore)
If you just want to get the gitignore file, it will then create a single .gitignore. You need to specify the gitignore templates.
```bash
poketask gi
```
```bash
? gitignore templates: node laravel visualstudiocode
```
The project uses the github gitignore templates and also accepts multiple gitignores.

The list of gitignore templates can be found [here](https://github.com/github/gitignore).

### Command li (License)
If you just want to get the LICENSE file. Use the nex command.
```bash
poketask li
```
```bash
? author name: Pablo Marmol
? license: mit
```
The list of license templates is [here](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses).

## License
Copyright &copy; 2018 Ricardo Huamani

Licensed under the terms of the MIT license.
