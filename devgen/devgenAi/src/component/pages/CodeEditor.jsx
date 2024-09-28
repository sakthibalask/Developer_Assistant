import React, { useEffect, useState } from 'react';
import '../../assets/css/CodeEditor.css';
import Editor from "react-simple-code-editor";
import Prism, { languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism.css'; // You can use any theme you like
import axios from 'axios';

const CodeEditor = () => {
  const [codes, setCodes] = useState({
    HTML: '',
    CSS: '',
    React: '',
    Python: ''
  });

  const highlightWithLanguage = (code, language) => {
    const languageMap = {
      react: 'javascript', 
      "react.js": "javascript",// Map React to JavaScript
      "jest": "javascript",
      javascript: 'javascript',
      HTML: 'markup',
      CSS: 'css',
      Python: 'python',
      Java: 'java',
      Bash: 'bash',
      "terminal": 'bash'
    };

    // Convert language to lowercase for mapping
    const mappedLanguage = languageMap[language.toLowerCase()] || language.toLowerCase();
    
    // Ensure we are only using valid languages
    if (!Prism.languages[mappedLanguage]) {
      console.warn(`No grammar found for language: ${mappedLanguage}`);
      return code; // Return code as-is if no grammar is found
    }

    return Prism.highlight(code, Prism.languages[mappedLanguage], mappedLanguage);
  };

  const handleCodeChange = (language, newCode) => {
    setCodes(prevCodes => ({
      ...prevCodes,
      [language]: newCode
    }));
  };

  const [codeEditorData, setCodeEditorData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    try{
        const fetchedChatId = sessionStorage.getItem('currentChat');
        if(fetchedChatId == null){
          const fetchedCodeData = sessionStorage.getItem("codes");
          setCodeEditorData(JSON.parse(fetchedCodeData));
        }else{
          const fetchedCodeData = sessionStorage.getItem(fetchedChatId);
          if (fetchedCodeData) {
            setCodeEditorData(JSON.parse(fetchedCodeData)['fetchedCode']);
          }
        }
    }catch(error){
      console.error(error);
      
    }
  }, []);

  useEffect(() => {
    try{
      if (codeEditorData.length > 0) {
        const formattedData = codeEditorData.map(entry => ({
          language: entry.language,
          code: entry.code.join("\n")
        }));
        setData(formattedData);
      }
    }catch(error){
      console.error(error);
      
    }
  }, [codeEditorData]);

  return (
    <div className="editor-container">
      <div className="editor-left">
        {data.map(({ language, code }, index) => (
          <div className="editor-box" key={index}>
            <label>
              {language.toLowerCase() === "html" && <span><i className={`ri-html5-line`}></i> {language}</span>}
              {language.toLowerCase() === "css" && <span><i className={`ri-css3-line`}></i> {language}</span>}
              {language.toLowerCase() === "javascript" && <span><i className="ri-javascript-line"></i> {language}</span>}
              {language.toLowerCase() === "react" && <span><i className="ri-reactjs-line"></i> {language}</span>}
              {language.toLowerCase() === "react.js" && <span><i className="ri-reactjs-line"></i> {language}</span>}
              {language.toLowerCase() === "jest" && <span><i className="ri-reactjs-line"></i> {language}</span>}
              {language.toLowerCase() === "python" && <span><i className='bx bxl-python'></i> {language}</span>}
              {language.toLowerCase() === "bash" && <span><i className="ri-terminal-line"></i> Terminal</span>}
              {language.toLowerCase() === "terminal" && <span><i className="ri-terminal-line"></i> Terminal</span>}
              <span className="editor-icon"><i className='bx bx-copy'></i></span>
            </label>
            <Editor
              value={code}
              onValueChange={newCode => handleCodeChange(language, newCode)}
              highlight={code => highlightWithLanguage(code, language)}
              className="editor-textarea"
              style={{
                overflowY: 'scroll',
                scrollBehavior: 'smooth',
                width: '320px',
                height: '150px',
                backgroundColor: 'black',
                color: 'white'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeEditor;
