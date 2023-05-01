export default function transform(fileInfo, api) {
  const j = api.jscodeshift;
  const ast = j(fileInfo.source);

  // Check if the file already has a react-intl import statement
  let hasIntlImport = false;
  ast.find(j.ImportDeclaration).forEach((node) => {
    if (node.value.source.value === "react-intl") {
      hasIntlImport = true;
    }
  });

  // Add react-intl import statement if it doesn't already exist
  if (!hasIntlImport) {
    const reactIntlImport = j.importDeclaration(
      [j.importSpecifier(j.identifier("FormattedMessage"))],
      j.literal("react-intl")
    );
    ast.get().node.program.body.unshift(reactIntlImport);
  }

  // Search for hard-coded text strings and replace them with FormattedMessage components
  ast.find(j.JSXText).forEach((node) => {
    const { value } = node.value;
    // Ignore JSXText nodes that only contain whitespace and newline characters
    if (/^\s*$/.test(value)) {
      console.log(j.JSXText.check(node.parent));
      return;
    }

    const id = `messages.${value.replace(/\W/g, "_")}`;

    node.replace(
      j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier("FormattedMessage"), [
          j.jsxAttribute(j.jsxIdentifier("id"), j.stringLiteral(id)),
          j.jsxAttribute(
            j.jsxIdentifier("defaultMessage"),
            j.stringLiteral(value)
          ),
        ]),
        j.jsxClosingElement(j.jsxIdentifier("FormattedMessage"))
      )
    );
  });

  return ast.toSource();
}
