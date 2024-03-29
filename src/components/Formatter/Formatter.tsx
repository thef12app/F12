import React, { useEffect, useState } from 'react';

import { startCase } from 'lodash';
import { editor as monacoEditor } from 'monaco-editor';
import styles from './Formatter.module.scss';
import copy from 'copy-to-clipboard';
import { Button, Dropdown, Menu, message, Tooltip } from 'antd';
import { MonacoEditor } from '../MonacoEditor/MonacoEditor';
import { CheckOutlined, CopyOutlined, DownOutlined } from '@ant-design/icons';
import {
  detectLanguage,
  formatWithPrettier,
  Languages,
  supportedLanguages,
} from '../../utils/prettier';

export const Formatter = () => {
  const [editor, setEditor] = useState<monacoEditor.IStandaloneCodeEditor>();
  const [language, setLanguage] = useState<Languages | 'auto'>('auto');
  const [detectedLanguage, setDetectedLanguage] = useState<Languages | null>(
    null
  );
  const menu = (
    <Menu
      selectedKeys={[language]}
      onClick={async (e) => {
        setLanguage(e.key as Languages | 'auto');
        if (e.key === 'auto' && editor) {
          const lang = await detectLanguage(editor.getValue());
          setDetectedLanguage(lang);
        }
      }}
    >
      {[
        <Menu.Item key={'auto'}>Auto</Menu.Item>,
        ...supportedLanguages.map((s) => (
          <Menu.Item key={s}>{startCase(s)}</Menu.Item>
        )),
      ]}
    </Menu>
  );

  const format = async () => {
    if (editor) {
      const value = editor.getValue().trim();
      const formatted = await formatWithPrettier(value, language);
      if (formatted && formatted.formatted.trim() !== value.trim()) {
        console.log(`'${formatted.formatted}'`, `'${value}'`);

        editor.setValue(formatted.formatted);
        setDetectedLanguage(formatted.fileType);
        message.success('Formatted!');
      } else {
        message.info('Code Already formatted');
      }
    }
  };

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (language === 'auto' && detectedLanguage) {
      monacoEditor.setModelLanguage(editor.getModel()!, detectedLanguage);
    } else if (language !== 'auto') {
      monacoEditor.setModelLanguage(editor.getModel()!, language);
    }
  }, [detectedLanguage, language]);

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
    monaco.onDidPaste(async () => {
      const lang = await detectLanguage(monaco.getValue());
      if (lang) {
        setDetectedLanguage(lang);
      }
    });
    setEditor(monaco);
  };

  return (
    <>
      <div className={styles.jsonEditor}>
        <MonacoEditor
          onEditorCreate={onEditorCreate}
          wrapperClass={styles.editorRoot}
        />
        <div className={styles.languageSelectWrapper}>
          <Dropdown overlay={menu} placement="topRight">
            <Button size="small" style={{ fontSize: 12 }}>
              Language: {language}{' '}
              {language === 'auto' &&
                detectedLanguage &&
                `(${detectedLanguage})`}{' '}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className={styles.actionBtnContainer}>
          <Tooltip title="Format" placement="left">
            <Button
              title="Format"
              onClick={format}
              icon={<CheckOutlined />}
              type="text"
            ></Button>
          </Tooltip>
          <Tooltip title="Copy" placement="left">
            <Button
              title="Copy to Clipboard"
              onClick={copyToClipboard}
              icon={<CopyOutlined />}
              type="text"
            ></Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
