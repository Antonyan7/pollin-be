/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
  meta: {
    messages: {
      avoidFirestoreNow: 'Avoid using Firestore Timestamp.now() function',
    },
    hasSuggestions: true,
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (node.object.name === 'Timestamp' && node.property.name === 'now') {
          context.report({
            node,
            messageId: 'avoidFirestoreNow',
          })
        }
      },
    }
  },
}
