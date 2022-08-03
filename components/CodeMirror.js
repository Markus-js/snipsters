import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { sql } from '@codemirror/lang-sql';
import { php } from '@codemirror/lang-php';
import { darcula } from '@uiw/codemirror-theme-darcula'
import { EditorView } from "@codemirror/view";

export default function CodeEditor({code, setCode, language, editable = true, placeholder}) {

  const selectLanguage = (language) => {
    switch (language) {
      case 'javascript':  return javascript();
      case 'java':        return java();
      case 'c++':         return cpp();
      case 'c':           return cpp();
      case 'sql':         return sql();
      case 'php':         return php();
      default:            return javascript();
    }
  }

  return (
    <CodeMirror
      value={code || ''}
      placeholder={placeholder}
      theme={darcula}
      extensions={[selectLanguage(language), EditorView.lineWrapping]}
      onChange={setCode}
      height='100%'
      minHeight='10rem'
      style={{
        overflowY: 'auto',
        flex: 1,
      }}
      basicSetup={{
        foldGutter: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        autocompletion: true,
      }}
      editable={editable}
    />
  );
}
