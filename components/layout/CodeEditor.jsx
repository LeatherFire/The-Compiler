import React, { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useDispatch } from 'react-redux';
import { updateMenuName } from '@/redux/appName';

const CodeEditor = ({ width, height, languge, onCodeChange }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);
  const [language , setLanguage] = useState('python');
  const [code, setCode] = useState('');

  const handleClick = (name) => {
    console.log(name);
    dispatch(updateMenuName({ name })); // Redux store'u güncelle
  };

  const changelanguage = () => {
    if (languge === 'c++') {
      setLanguage('cpp');
    } else if (languge === 'GOLANG') {
      setLanguage('go');
    } else {
      setLanguage(languge);
    }
  };

  // useEffect kancası ile dil değişimini izleyip key değerini güncelliyoruz
  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Key değerini artırarak MonacoEditor'u yeniden render ediyoruz
    changelanguage();
  }, [languge]);

  const handleCodeChange = (newValue) => {
    setCode(newValue);
    if (onCodeChange) {
      onCodeChange(newValue); // Üst bileşene kod değişimini bildir
    }
  };

  return (
    <MonacoEditor 
      key={key} // Key değerini burada kullanıyoruz
      onClick={() => handleClick('VSCode')}
      width={width - 2}
      height={height - 10}
      defaultLanguage={language}
      defaultValue={`// Write your ${language} code here`}
      value={code}
      onChange={handleCodeChange}
      options={{
        roundedSelection: true,
        roundedEditor: true,
        "acceptSuggestionOnCommitCharacter": true,
        "acceptSuggestionOnEnter": "on",
        "accessibilitySupport": "auto",
        "autoIndent": false,
        "automaticLayout": true,
        "codeLens": true,
        "colorDecorators": true,
        "contextmenu": true,
        "cursorBlinking": "blink",
        "cursorSmoothCaretAnimation": false,
        "cursorStyle": "line",
        "disableLayerHinting": false,
        "disableMonospaceOptimizations": false,
        "dragAndDrop": false,
        "fixedOverflowWidgets": false,
        "folding": true,
        "foldingStrategy": "auto",
        "fontLigatures": false,
        "formatOnPaste": false,
        "formatOnType": false,
        "hideCursorInOverviewRuler": false,
        "highlightActiveIndentGuide": true,
        "links": true,
        "mouseWheelZoom": false,
        "multiCursorMergeOverlapping": true,
        "multiCursorModifier": "alt",
        "overviewRulerBorder": true,
        "overviewRulerLanes": 2,
        "quickSuggestions": true,
        "quickSuggestionsDelay": 100,
        "readOnly": false,
        "renderControlCharacters": false,
        "renderFinalNewline": true,
        "renderIndentGuides": true,
        "renderLineHighlight": "all",
        "renderWhitespace": "none",
        "revealHorizontalRightPadding": 30,
        "roundedSelection": true,
        "rulers": [],
        "scrollBeyondLastColumn": 5,
        "scrollBeyondLastLine": true,
        "selectOnLineNumbers": true,
        "selectionClipboard": true,
        "selectionHighlight": true,
        "showFoldingControls": "mouseover",
        "smoothScrolling": false,
        "suggestOnTriggerCharacters": true,
        "wordBasedSuggestions": true,
        "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
        "wordWrap": "off",
        "wordWrapBreakAfterCharacters": "\t})]?|&,;",
        "wordWrapBreakBeforeCharacters": "{([+",
        "wordWrapBreakObtrusiveCharacters": ".",
        "wordWrapColumn": 80,
        "wordWrapMinified": true,
        "wrappingIndent": "none"
      }}
    />
  );
};

export default CodeEditor;
