# React-intl codemod
This is an attempt to replace strings rendered in JSX with `react-intl`'s <FormattedMessage> components, and then extract the strings into translations files. 

## Usage

To run the codemod, you can run:
```
npm run mod -- PATH
```

To clean up the JSX, you can run:
```
npm run prettify -- PATH
```

To extract the strings into a JSON file, you can run:
```
npm run extract-jsx
```

Or you can run all of these at once:
```
npm run mod -- ./src/*.jsx && npm run prettify -- ./src && npm run extract-jsx
```

## How it works
The `mod` script uses Facebook's `jscodeshift` tool, which is meant for large modifications to codebases, to replace strings rendered in JSX with `react-intl`'s <FormattedMessage> components. These should tie to JSON translations files, and be able to pull in the appropriate string based on the user's locale. 

The `extract-jsx` script calls the `@formatjs/cli`'s `extract` command, which generates the English JSON file with all of the automatically generated keys and the corresponding English values. 