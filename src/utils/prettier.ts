import prettier from 'prettier';
import JSONParser from 'prettier/parser-babel';
// import CSSParser from 'prettier/parser-postcss';
import HtmlParser from 'prettier/parser-html';

type Formatter = {
  fileType: 'json' | 'javascript' | 'typescript' | 'css' | 'html';
  format: (content: string) => string;
};

const formatters: Formatter[] = [
  {
    fileType: 'json',
    format: (content) => formatWithBabel(content, 'json'),
  },
  {
    fileType: 'javascript',
    format: (content) => formatWithBabel(content, 'babel'),
  },
  {
    fileType: 'typescript',
    format: (content) => formatWithBabel(content, 'babel-ts'),
  },
  //   {
  //     fileType: 'css',
  //     format: tryCSSFormat,
  //   },
  {
    fileType: 'html',
    format: formatHtml,
  },
];

export const formatWithPrettier = (value: string) => {
  for (let formatter of formatters) {
    try {
      const result = formatter.format(value);
      console.log('lang', formatter.fileType);

      return {
        formatted: result,
        fileType: formatter.fileType,
      };
    } catch (ex) {}
  }
  return null;
};

function formatWithBabel(
  content: string,
  parser: keyof typeof JSONParser.parsers
) {
  return prettier.format(content, {
    parser: parser,
    plugins: [JSONParser],
  });
}

// function tryCSSFormat(content: string) {
//   try {
//     return {
//       error: false as const,
//       formatted: prettier.format(content, {
//         parser: 'css',
//         plugins: [CSSParser],
//       }),
//     };
//   } catch (ex: any) {
//     return {
//       error: true as const,
//       message: ex.message,
//     };
//   }
// }

function formatHtml(content: string) {
  return prettier.format(content, {
    parser: 'html',
    plugins: [HtmlParser],
  });
}
