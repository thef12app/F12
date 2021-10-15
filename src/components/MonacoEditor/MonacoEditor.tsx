import React, { useEffect, useRef, useState } from 'react';
import { editor as monacoEditor } from 'monaco-editor';

export interface MonacoEditorProps {
  onEditorCreate: (editor: monacoEditor.IStandaloneCodeEditor) => void;
  wrapperClass?: string;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  onEditorCreate,
  wrapperClass,
}) => {
  const editorRoot = useRef(null);

  useEffect(() => {
    if (editorRoot.current) {
      const monaco = monacoEditor.create(editorRoot.current, {
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        padding: {
          top: 16,
          bottom: 16,
        },
      });
      monaco.setValue(`
        {
          action: "Hit format to format this JSON or paste JSON here"
        }
      `);
      onEditorCreate(monaco);

      return () => monaco.dispose();
    }
  }, []);
  return <div ref={editorRoot} className={wrapperClass}></div>;
};
