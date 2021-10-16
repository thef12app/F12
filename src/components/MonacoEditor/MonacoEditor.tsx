import React, { useEffect, useRef } from 'react';
import {
  editor as monacoEditor,
  languages as monacoLanguages,
} from 'monaco-editor';

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

      return () => monaco.dispose();
    }
  }, []);
  return <div ref={editorRoot} className={wrapperClass}></div>;
};
