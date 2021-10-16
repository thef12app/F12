import prettier from 'prettier';
import BabelParser from 'prettier/parser-babel';
import HtmlParser from 'prettier/parser-html';
import { formatCss } from './sandbox-event-emitter';

type Formatter = {
  fileType: Languages;
  format: (content: string) => string | Promise<string>;
};

export const formatters: Formatter[] = [
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
    format: (content) => tryCSSFormat(content, 'css'),
  },
  {
    fileType: 'scss',
    format: (content) => tryCSSFormat(content, 'scss'),
  },
  {
    fileType: 'less',
    format: (content) => tryCSSFormat(content, 'less'),
  },
  {
    fileType: 'html',
    format: formatHtml,
  },
];

export const supportedLanguages = formatters.map((f) => f.fileType);

export const formatWithPrettier = async (
  value: string,
  lang: Languages | 'auto'
) => {
  const selectedFormatters =
    lang === 'auto'
      ? formatters
      : formatters.filter((f) => f.fileType === lang);

  for (let formatter of selectedFormatters) {
    try {
      const result = await formatter.format(value);
      console.log('lang', formatter.fileType);

      return {
        formatted: result,
        fileType: formatter.fileType,
      };
    } catch (ex) {
      // ignore
    }
  }
  return null;
};

function formatWithBabel(
  content: string,
  parser: keyof typeof BabelParser.parsers
) {
  return prettier.format(content, {
    parser: parser,
    plugins: [BabelParser],
  });
}

function tryCSSFormat(content: string, parser: 'css' | 'scss' | 'less') {
  return formatCss(content, parser);
}

function formatHtml(content: string) {
  return prettier.format(content, {
    parser: 'html',
    plugins: [HtmlParser],
  });
}

export async function detectLanguage(
  content: string
): Promise<Languages | null> {
  for (let lang of formatters) {
    try {
      const langDetected = !!lang.format(content);
      if (langDetected) {
        return lang.fileType;
      }
    } catch (ex) {
      // ignore
    }
  }

  return null;
}
export type Languages =
  | 'json'
  | 'javascript'
  | 'typescript'
  | 'css'
  | 'html'
  | 'scss'
  | 'less';
