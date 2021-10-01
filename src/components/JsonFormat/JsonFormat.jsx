import React, { useState } from 'react';

import prettier from 'prettier';
import JSONParser from 'prettier/parser-babel';
import { useRef, useEffect } from 'react';
import { editor as monacoEditor } from 'monaco-editor';
import styles from './JsonFormat.module.scss';
import copy from 'copy-to-clipboard';

export const JsonFormat = () => {
  const editorRoot = useRef(null);
  const [editor, setEditor] = useState();

  const format = () => {
    const value = editor.getValue().trim();
    const formatted = formatWithPrettier(value);
    if (value != formatted) {
      editor.setValue(formatted);
    }
  };

  const copyToClipboard = () => {
    const value = editor.getValue();
    copy(value);
  };

  useEffect(() => {
    if (editorRoot.current) {
      const monaco = monacoEditor.create(editorRoot.current, {
        minimap: {
          enabled: false,
        },
      });
      monaco.setValue(`
        {
          action: "Hit format to format this JSON or paste JSON here"
        }
      `);
      setEditor(monaco);

      return () => monaco.dispose();
    }
  }, []);

  const formatWithPrettier = (value) => {
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
  return (
    <div className={styles.jsonEditor}>
      <div className={styles.actionBtnContainer}>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
        <button onClick={format}>Format</button>
      </div>
      <div ref={editorRoot} className={styles.editorRoot}></div>
    </div>
  );
};
