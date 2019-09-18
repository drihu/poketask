# Poketask

![license](https://img.shields.io/badge/license-MIT-green.svg)

> A simple command to start any project. Run the command to create a .gitignore, .gitattributes, .editorconfig, README.md and a LICENSE with a one-line command.

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

Example:

```bash
$ poketask init
With poketask you'll be able to generate the following files:
README.md, LICENSE, .gitignore, .gitattributes & .editorconfig

Press ^C at any time to quit.
? package name: my-package
? description: description here
? author name: Pablo Marmol
? license: mit
? gitignore templates: node laravel visualstudiocode
--
.editorconfig created
.gitattributes created
.gitignore created with VisualStudioCode.gitignore, Node.gitignore, Laravel.gitignore
LICENSE created under MIT
README.md created
```

### Command gi (Gitignore)

If you just want to get the gitignore file, it will then create a single .gitignore. You need to specify the gitignore templates.

```bash
poketask gi <template> <template> ...
```

Example:

```bash
$ poketask gi node laravel visualstudiocode
.gitignore created with VisualStudioCode.gitignore, Node.gitignore, Laravel.gitignore
```

The project uses the github gitignore templates and also accepts multiple gitignores.

The list of gitignore templates can be found [here](https://github.com/github/gitignore).

### Command ga (Gitattributes)

If you just want to get the gitattributes file, it will then create a single .gitattributes.

```bash
poketask ga
```

Example:

```bash
$ poketask ga
.gitattributes created
```

### Command ed (Editorconfig)

If you just want to get the editorconfig file, it will then create a single .editorconfig.

```bash
poketask ed
```

Example:

```bash
$ poketask ed
.editorconfig created
```

### Command li (License)

If you just want to get the LICENSE file. Use the next command.

```bash
poketask li
```

Example:

```bash
$ poketask li
? author name: Pablo Marmol
? license: mit
--
LICENSE created under MIT
```

The list of license templates is [here](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses).

## Thanks

Thanks to [LYCrachel](https://github.com/LYCrachel) and [bradleylandis](https://github.com/bradleylandis) for the improvements.

## License

Copyright &copy; 2018 Ricardo Huamani

Licensed under the terms of the MIT license.
