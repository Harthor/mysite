import 'highlight.js/styles/monokai-sublime.min.css'
import hljs from 'highlight.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode> 
  // document.querySelector('#root')
)

hljs.configure({
  languages: ['javascripts', 'ruby', 'python']
})
