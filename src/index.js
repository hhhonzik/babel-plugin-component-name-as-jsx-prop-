import isReactComponent from './isReactComponent'
import getEntryIdentifier from './getEntryIdentifier'

function isFragment(path) {
  const name = path.node.name;

  return (name.object &&
    name.object.name === 'React' &&
    name.property &&
    name.property.name === 'Fragment');
}

export default function ({ types: t }) {
  const checkElementAndAddAttribute = (path, name, property) => {
    // if its not react fragment
    if (!isFragment(path)) {
      path.node.attributes.unshift(
        t.jSXAttribute(
          t.jSXIdentifier(property),
          t.stringLiteral(name),
          // t.JSXExpressionContainer(t.Identifier('this.constructor.name')),
        ),
      );
    }

    path.stop()
  }
  return {
    manipulateOptions: (opts, parserOptions) => {
      parserOptions.plugins.push('jsx')
    },
    visitor: {
      Program(path, state) {
        const property = state.opts.property || 'data-name'

        path.traverse({
          ClassDeclaration: path2 => {
            if (!isReactComponent(path2)) {
              return
            }
            const name = getEntryIdentifier(path2)

            if (name) {
              path2.traverse({
                ClassMethod: path3 => {
                  if (path3.node.key.name === 'render') {
                    path3.traverse({
                      JSXOpeningElement(path4) {
                        checkElementAndAddAttribute(path4, name, property);
                      },
                    })
                  }
                },
              })
            }
          },
          ArrowFunctionExpression: path2 => {
            if (!isReactComponent(path2)) {
              return
            }
            const name = getEntryIdentifier(path2);
            path2.traverse({
              JSXOpeningElement(path3) {
                checkElementAndAddAttribute(path3, name, property);
              },
            })

          },
          FunctionDeclaration: path2 => {
            if (!isReactComponent(path2)) {
              return
            }
            const name = getEntryIdentifier(path2)
            if (name) {
              path2.traverse({
                JSXOpeningElement(path3) {
                  checkElementAndAddAttribute(path3, name, property);
                },
              })
            }
          },
        })
      },
    },
  }
}
