/* eslint-disable @typescript-eslint/explicit-function-return-type */
const emailRegex = /[A-z0-9+]+@[A-z0-9.]+\.[A-z]{2,3}/
const allowedEmailRegex = /fhealthdev\+[A-Za-z0-9+_]*@gmail\.com/
module.exports = {
  meta: {
    messages: {
      avoidOtherEmails: 'Avoid using other than specified emails (fhealthdev+...+@gmail.com', // todo add variables, maybe?
    },
    hasSuggestions: true,
  },
  create(context) {
    return {
      Identifier(node) {
        if (
          typeof node?.parent?.init?.value === 'string' &&
          node.parent.init.value.match(emailRegex) &&
          !node.parent.init.value.match(allowedEmailRegex)
        ) {
          context.report({
            node,
            messageId: 'avoidOtherEmails',
          })
        }
      },
      ObjectExpression(node) {
        if (
          node?.properties?.find(
            (e) =>
              typeof e?.value?.value === 'string' &&
              e.value.value.match(emailRegex) &&
              !e.value.value.match(allowedEmailRegex),
          )
        ) {
          context.report({
            node,
            messageId: 'avoidOtherEmails',
          })
        }
      },
      ExpressionStatement(node) {
        if (
          typeof node.expression?.right?.value === 'string' &&
          node.expression.right.value.match(emailRegex) &&
          !node.expression.right.value.match(allowedEmailRegex)
        ) {
          context.report({
            node,
            messageId: 'avoidOtherEmails',
          })
        }
      },
    }
  },
}
