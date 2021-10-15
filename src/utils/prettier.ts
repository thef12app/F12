import prettier from 'prettier';
import JSONParser from 'prettier/parser-babel';
import HtmlParser from 'prettier/parser-html';
import { formatCss } from './sandbox-event-emitter';

type Formatter = {
  fileType: 'json' | 'javascript' | 'typescript' | 'css' | 'html';
  format: (content: string) => string | Promise<string>;
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
  {
    fileType: 'css',
    format: tryCSSFormat,
  },
  {
    fileType: 'html',
    format: formatHtml,
  },
];

export const formatWithPrettier = async (value: string) => {
  for (let formatter of formatters) {
    try {
      const result = await formatter.format(value);
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

function tryCSSFormat(content: string) {
  return formatCss(content);
}

function formatHtml(content: string) {
  return prettier.format(content, {
    parser: 'html',
    plugins: [HtmlParser],
  });
}
