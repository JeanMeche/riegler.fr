(function (Prism) {
  Prism.languages.angular = Prism.languages.extend('markup', {
    'deferEtc': {
      pattern:
        // matches the content of the outer most parenthesis after defer/placeholder/loading
        /@(defer|placeholder|loading)\s*\(?[^)(]*(?:\([^)(]*(?:\([^)(]*(?:\([^)(]*\)[^)(]*)*\)[^)(]*)*\)[^)(]*)*\)?/gi,
      inside: {
        'keyword': /(?:@defer|@placeholder|@loading|prefetch)/,
        'operator': /\b(when|on)\b/,
        'number': {
          pattern: /\b(minimum\s|after\s|\()\s*\d+(?:s|ms|)/gi,
          lookbehind: true,
        },
        'builtin': {
          pattern:
            /(?:viewport|timer|minimum|after|hover|idle|immediate|interaction|\$index|\$count|\$odd|\$even|\$first|\$last)/,
        },

        'function':
          /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      },
    },
    'ctrlFlow': {
      pattern:
        // matches the content of the outer most parenthesis after defer/placeholder/loading
        /@(if|for|switch)\s*\([^)(]*(?:\([^)(]*(?:\([^)(]*(?:\([^)(]*\)[^)(]*)*\)[^)(]*)*\)[^)(]*)*\)/gi,
      inside: {
        'keyword': /(?:@for|@if|@switch|@case|track|let)/,
        'operator': /\b(of)\b/,
        'function':
          /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        'builtin': {pattern: /\$index|\$count|\$odd|\$even|\$first|\$last/},
      },
    },

    'keyword': {
      pattern: /(?:@if|@for|@switch|@loading|@error|@placeholder)\b/,
      lookbehind: true,
    },
    'operator': /\b\(.*(?:on|when|of|track|let).*\)\b/,
    'function':
      /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  });

  Prism.languages.ng = Prism.languages.angular;
})(Prism);
