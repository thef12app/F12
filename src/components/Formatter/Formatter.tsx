import React, { useState } from 'react';

import prettier from 'prettier';
import JSONParser from 'prettier/parser-babel';
import { editor as monacoEditor } from 'monaco-editor';
import styles from './Formatter.module.scss';
import copy from 'copy-to-clipboard';
import { Button, message } from 'antd';
import { MonacoEditor } from '../MonacoEditor/MonacoEditor';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';

export const Formatter = () => {
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
      message.success('Copied!');
    }
  };

  const onEditorCreate = (monaco: monacoEditor.IStandaloneCodeEditor) => {
    monaco.setValue(`
        {
          action: "Hit format to format this JSON or paste JSON here"
        }
      `);
    setEditor(monaco);
  };

  const formatWithPrettier = (value: string) => {
    try {
      const formatted = prettier.format(value, {
        parser: 'json',
        plugins: [JSONParser],
      });
      message.success('Formatted!');
      return formatted;
    } catch (ex: any) {
      console.error(ex);
      return value;
    }
  };

  return (
    <>
      <div className={styles.jsonEditor}>
        <div className={styles.actionBtnContainer}>
          <Button
            type="primary"
            ghost
            onClick={format}
            icon={<CheckOutlined />}
            size="middle"
          >
            Format
          </Button>
          <Button
            type="default"
            onClick={copyToClipboard}
            icon={<CopyOutlined />}
            size="middle"
          >
            Copy
          </Button>
        </div>
        <MonacoEditor
          onEditorCreate={onEditorCreate}
          wrapperClass={styles.editorRoot}
        />
      </div>
    </>
  );
};
