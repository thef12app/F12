import React, { useEffect, useRef, useState } from 'react';
import { editor as monacoEditor } from 'monaco-editor';
import styles from './DiffEditor.module.scss';
import { useTheme } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';

const { createDiffEditor, createModel } = monacoEditor;

export const DiffEditor = () => {
  const { theme } = useTheme();
  const darkMode = useDarkMode();

  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current) {
      const original = createModel('This is a sample');
      const modified = createModel('This is a sample!');
      const editor = createDiffEditor(editorRef.current, {
        originalEditable: true,
        automaticLayout: true,
        padding: {
          top: 16,
          bottom: 16,
        },
        minimap: {
          enabled: false,
        },
      });

      editor.setModel({
        original,
        modified,
      });
    }
  }, [editorRef.current]);

  return (
    <div
      className={styles.editorRoot}
      style={{
        borderWidth: theme?.borderWeights?.normal.value || 1,
        borderStyle: 'solid',
        borderColor: theme?.colors.primaryBorder.value || '#000',
      }}
      ref={editorRef}
    ></div>
  );
};
