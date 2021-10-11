import React, { useState } from 'react';

import prettier from 'prettier';
import JSONParser from 'prettier/parser-babel';
import { useRef, useEffect } from 'react';
import { editor as monacoEditor } from 'monaco-editor';
import styles from './JsonFormat.module.scss';
import copy from 'copy-to-clipboard';
import { Layout } from '../Layout/Layout';
import { Button } from 'antd';

export const JsonFormat = () => {
  const editorRoot = useRef(null);
  const [editor, setEditor] = useState<monacoEditor.IStandaloneCodeEditor>();

  const format = () => {
    if (editor) {
      const value = editor.getValue().trim();
      const formatted = formatWithPrettier(value);
      if (value != formatted) {
        editor.setValue(formatted);
      }
    }
  };

  const copyToClipboard = () => {
    if (editor) {
      const value = editor.getValue();
      copy(value);
    }
  };

  useEffect(() => {
    if (editorRoot.current) {
      const monaco = monacoEditor.create(editorRoot.current, {
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
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

  const formatWithPrettier = (value: string) => {
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
    <Layout
      actions={
        <div className={styles.actionBtnContainer}>
          <Button type="primary" onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
          <Button type="primary" onClick={format}>
            Format
          </Button>
        </div>
      }
      title={'JSON Formatter'}
    >
      <div className={styles.jsonEditor}>
        <div ref={editorRoot} className={styles.editorRoot}></div>
      </div>
    </Layout>
  );
};
