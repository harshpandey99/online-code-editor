import React, { useState, useEffect} from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode, faSync} from '@fortawesome/free-solid-svg-icons'


function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css',  '')
  const [js, setJs] = useLocalStorage('js',  '')
  const [srcDoc, setSrcDoc] = useState('')
  
  useEffect(() => {
  const timeout = setTimeout(() => {
   setSrcDoc ( `
   <html>
   <body> ${html} </body>
   <style> ${css} </style>
   <script> ${js} </script>
   </html>
   `
   )
  }, 250)

    return () => clearTimeout(timeout);
},  [html,css,js,setSrcDoc]);
  
    const clearAll =() => {
      setHtml(" ");
      setCss("");
      setJs("");
      setSrcDoc(" ");
    };

  return (
   <> 
    <div className=" header">
       <button className=" faCode code-btn"> 
       <FontAwesomeIcon icon={faCode} size='2x'  />
       </button> 
       <button className=" faSync refresh-btn" onClick={clearAll}
       >
         <FontAwesomeIcon icon={faSync}  />
         </button>  
       Code Editor  
       </div> 


    <div className="pane top-pane"  >
    <Editor 
    language="xml"
    displayName="HTML"
    value={html}
    onChange={setHtml}
    />
    <Editor 
    language="css"
    displayName="CSS"
    value={css}
    onChange={setCss}
    />
    <Editor 
    language="javascript"
    displayName="JS"
    value={js}
    onChange={setJs}
    />
    </div>
    
    <div className="pane">
      <iframe 
      srcDoc= {srcDoc}
      title="output"
      sandbox="allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
      />
       </div>

    </>
  )
}

export default App ; 

