import isReactComponent from './isReactComponent'
import getEntryIdentifier from './getEntryIdentifier'

function isFragment(path) {
  const name = path.node.name;

  return (name.object &&
    name.object.name === 'React' &&
    name.property &&
    name.property.name === 'Fragment') || (
      name.name && name.name === 'Fragment'
    );
}

const ClassDeclaration = (t, property) => {
  return (path2) => {
    if (!isReactComponent(path2)) {
      return;
    }
    const name = getEntryIdentifier(path2);

    if (name) {
      path2.traverse({
        ClassMethod: path3 => {
          if (path3.node.key.name === 'render') {
            path3.traverse({
              JSXOpeningElement(path4) {
                checkElementAndAddAttribute(t, path4, name, property);
              },
            })
          }
        },
      })
    }
  };
};

const ClassExpression = ClassDeclaration; 

const ArrowFunctionExpression = (t, property) => {
  return (path2) => {
    if (!isReactComponent(path2)) {
      return;
    }
    const name = getEntryIdentifier(path2);
    path2.traverse({
      JSXOpeningElement(path3) {
        checkElementAndAddAttribute(t, path3, name, property);
      },
    })
  };
};

const FunctionDeclaration = (t, property) => {
  return (path2) => {
    if (!isReactComponent(path2)) {
      return;
    }
    const name = getEntryIdentifier(path2);
    if (name) {
      path2.traverse({
        JSXOpeningElement(path3) {
          checkElementAndAddAttribute(t, path3, name, property);
        },
      })
    }
  };
};

const checkElementAndAddAttribute = (t, path, name, property) => {
  // if its not react fragment
  if (!isFragment(path)) {
    path.node.attributes.unshift(
      t.jSXAttribute(
        t.jSXIdentifier(property),
        t.stringLiteral(name)
      )
    );
  }

  path.stop();
}

export default function ({ types: t }) {
  return {
    manipulateOptions: (opts, parserOptions) => {
      parserOptions.plugins.push('jsx');
    },
    visitor: {
      Program(path, state) {
        const property = state.opts.property || 'data-name';

        path.traverse({
          ClassDeclaration: ClassDeclaration(t, property),
          ClassExpression: ClassExpression(t, property),
          ArrowFunctionExpression: ArrowFunctionExpression(t, property),
          FunctionDeclaration: FunctionDeclaration(t, property)
        });
      }
    }
  }
};
