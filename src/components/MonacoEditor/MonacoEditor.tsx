import React, { useEffect, useRef } from 'react';
import {
  editor as monacoEditor,
  languages as monacoLanguages,
} from 'monaco-editor';
import useDarkMode from 'use-dark-mode';

monacoLanguages.css.cssDefaults.setOptions({
  validate: false,
});
monacoLanguages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true,
});

export interface MonacoEditorProps {
  onEditorCreate: (editor: monacoEditor.IStandaloneCodeEditor) => void;
  wrapperClass?: string;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  onEditorCreate,
  wrapperClass,
}) => {
  const editorRoot = useRef(null);
  const darkMode = useDarkMode();

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
        language: 'javascript',
      });
      monaco.setValue(`
        {
          action: "Hit format to format this JSON or paste JSON here"
        }
      `);
      onEditorCreate(monaco);
      monacoEditor.defineTheme('f12-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#16181a',
        },
      });
      monacoEditor.defineTheme('f12-light', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#f0f3f5',
        },
      });

      return () => monaco.dispose();
    }
  }, []);

  useEffect(() => {
    if (darkMode.value) {
      monacoEditor.setTheme('f12-dark');
    } else {
      monacoEditor.setTheme('f12-light');
    }
  }, [darkMode]);
  return <div ref={editorRoot} className={wrapperClass}></div>;
};
