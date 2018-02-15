import isReactComponent from './isReactComponent'
import getEntryIdentifier from './getEntryIdentifier'

export default function({ types: t }) {
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
                        path4.node.attributes.unshift(
                          t.jSXAttribute(
                            t.jSXIdentifier(property),
                            t.stringLiteral(name),
                            // t.JSXExpressionContainer(t.Identifier('this.constructor.name')),
                          ),
                        )
                        path4.stop()
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
                path3.node.attributes.unshift(
                  t.jSXAttribute(
                    t.jSXIdentifier(property),
                    t.stringLiteral(name),
                    // t.JSXExpressionContainer(t.Identifier('this.constructor.name')),
                  ),
                )
                path3.stop()
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
                  path3.node.attributes.unshift(
                    t.jSXAttribute(
                      t.jSXIdentifier(property),
                      t.stringLiteral(name),
                      // t.JSXExpressionContainer(t.Identifier('this.constructor.name')),
                    ),
                  )
                  path3.stop()
                },
              })
            }
          },
        })
      },
    },
  }
}
