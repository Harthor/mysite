import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import React from 'react';

import Layout from './components/Layout';
import NotFound from './components/NotFound';

import Intro from './pages/Intro';
import PostDetail from './pages/PostDetail';
import PostList from './pages/PostList'
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import ScrollToTop from './components/ScrollToTop';

import 'highlight.js/styles/github.css';



const App: React.FC = () => {

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/" element={<Layout />}>
          <Route path=":category">
            <Route index element={<Home />} />
            <Route path=":section/:page" element={<PostList />} />
            <Route path=":section/post/create" element={<CreatePost />} />
            <Route path=":section/post/:slug" element={<PostDetail />} />
          </Route>
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="not-found" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
