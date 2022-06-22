import React, { useEffect, useState } from 'react';

import { startCase } from 'lodash';
import { editor as monacoEditor } from 'monaco-editor';
import styles from './Formatter.module.scss';
import copy from 'copy-to-clipboard';
import { MonacoEditor } from '../MonacoEditor/MonacoEditor';
import {
  detectLanguage,
  formatWithPrettier,
  Languages,
  supportedLanguages,
} from '../../utils/prettier';
import { Button, Dropdown, Tooltip } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { VscCheck, VscCopy } from 'react-icons/vsc';

const f12Dark = {
  base: 'vs-dark',
  inherit: true,
  colors: {
    'editor.background': '#16181a',
  },
};

const f12Light = {
  base: 'vs',
  inherit: true,
  colors: {
    'editor.background': '#f0f3f5',
  },
};

export const Formatter = () => {
  const darkMode = useDarkMode();
  const [editor, setEditor] = useState<monacoEditor.IStandaloneCodeEditor>();
  const [language, setLanguage] = useState<Languages | 'auto'>('auto');
  const [detectedLanguage, setDetectedLanguage] = useState<Languages | null>(
    null
  );

  const format = async () => {
    if (editor) {
      const value = editor.getValue().trim();
      const formatted = await formatWithPrettier(value, language);
      if (formatted && formatted.formatted.trim() !== value.trim()) {
        console.log(`'${formatted.formatted}'`, `'${value}'`);

        editor.setValue(formatted.formatted);
        setDetectedLanguage(formatted.fileType);
        // message.success('Formatted!');
      } else {
        // message.info('Code Already formatted');
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

  useEffect(() => {
    if (!editor) {
      return;
    }
    if (darkMode.value) {
      monacoEditor.setTheme('f12-dark');
    } else {
      monacoEditor.setTheme('f12-light');
    }
  }, [darkMode]);

  const copyToClipboard = () => {
    if (editor) {
      const value = editor.getValue();
      copy(value);
      // message.success('Copied!');
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
          <Dropdown>
            <Dropdown.Button style={{ fontSize: 12 }} ripple={false} bordered>
              Language: {language}{' '}
              {language === 'auto' &&
                detectedLanguage &&
                `(${detectedLanguage})`}
            </Dropdown.Button>
            <Dropdown.Menu
              selectedKeys={[language]}
              selectionMode="single"
              onSelectionChange={async (e) => {
                // @ts-ignore
                setLanguage(e.currentKey as Languages | 'auto');
                if (e.valueOf() === 'auto' && editor) {
                  const lang = await detectLanguage(editor.getValue());
                  setDetectedLanguage(lang);
                }
              }}
            >
              {['auto', ...supportedLanguages].map((s) => (
                <Dropdown.Item key={s}>{startCase(s)}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.actionBtnContainer}>
          <Tooltip content="Format" placement="left">
            <Button auto bordered onClick={format} icon={<VscCheck />}></Button>
          </Tooltip>
          <Tooltip content="Copy" placement="left">
            <Button
              auto
              bordered
              onClick={copyToClipboard}
              icon={<VscCopy />}
            ></Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
