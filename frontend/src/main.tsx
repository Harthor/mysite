// 여기서 임포트되는 것들은 전역에서 임포트되며, 앱의 초기 로드 시 1회 로드된다.
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css';
import { Provider } from 'react-redux';
import store from './store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
