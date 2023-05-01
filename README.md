# React-intl codemod

This is an attempt to replace strings rendered in JSX with `react-intl`'s <FormattedMessage> components, and then extract the strings into translations files.

## Usage

To run the codemod, you can run:

```
npm run mod -- PATH
```

To clean up the JSX, you can run:

```
npm run prettify
```

To extract the strings into a JSON file, you can run:

```
npm run extract-jsx
```

Or you can run all of these at once (full example with paths):

```
npm run mod -- ./src/*.jsx && npm run prettify -- ./src && npm run extract-jsx
```

## How it works

### Code Modification

This relies heavily on Facebook's `jscodeshift` tool, which is meant for large modifications to codebases. The `mod` script in the `package.json` runs the `transform.js` node script, which is doing most of the heavy lifting here. It replaces strings rendered in JSX with `react-intl`'s <FormattedMessage> components. In the end, these values will tie to JSON translations files, and be able to pull in the appropriate string based on the user's locale.

This was a rough pass at a codemod hacked together in a couple of hours that likely needs a good bit of cleanup and expanding on what it can modify.

Setting up tests and using TDD to cover more edge cases would be a good way to test the accuracy of this tool.

In this tool's current state, any modifications will require a lot of review before committing anything changes.

### String Extraction

The `extract-jsx` script calls the `@formatjs/cli`'s `extract` command, which generates the English JSON file with all of the automatically generated keys and the corresponding English values.

I did not spend much time on this part, basically copying from the `formatjs` docs [here](https://formatjs.io/docs/getting-started/message-extraction/).

We likely need to find a way to flatten the output, if we are going to stick with a flat JSON structure for our translations.

### Todo

- clean up; I assume there could be are more issues when ran on more than the 3 JSX files I've ran it on
- this only targets `JSXText`, so any strings that are declared above the `return` will not be translated.
- this works with `<FormattedMessage/>`, but I believe a lot of the code uses a wrapper component. I'm not sure how the `extract` command will work with another component.
- flatten JSON output
- I haven't used our translations library at all, so I think there will be some other things that need updating to work with it. 
- TDD would be a good way to cover more use-cases safely, without breaking functionality as you go. I'm not sure the best way to set it up, but I'd imagine it is possible.
