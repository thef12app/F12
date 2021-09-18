import React from 'react';

import prettier from 'prettier';
import JSONParser from 'prettier/parser-babel';
import { useRef, useEffect } from 'react';
import { editor as monacoEditor } from 'monaco-editor';
import './JsonFormat.scss';

export const JsonFormat = () => {
  const editorRoot = useRef(null);

  useEffect(() => {
    if (editorRoot.current) {
      const monaco = monacoEditor.create(editorRoot.current, {
        minimap: {
          enabled: false,
        },
      });
      monaco.onDidChangeModelContent((e) => {
        const value = monaco.getValue();
        const formatted = onChange(value);
        if (value != formatted) {
          monaco.setValue(formatted);
        }
      });

      return () => monaco.dispose();
    }
  }, []);

  const onChange = (value) => {
    try {
      const formatted = prettier.format(value, {
        parser: 'json',
        plugins: [JSONParser],
      });
      return formatted;
    } catch (ex) {
      console.error(ex);
      return value;
    }
  };
  return <div ref={editorRoot} className="editor-root"></div>;
};
