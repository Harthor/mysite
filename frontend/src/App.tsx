import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import React from 'react';

import Layout from './components/Layout';
import NotFound from './components/NotFound';

import Intro from './pages/Intro';
import PostDetail from './pages/PostDetail';
import PostList from './pages/PostList'
import WritePost from './pages/WritePost';
import Home from './pages/Home';

import ScrollToTop from './components/ScrollToTop';

import 'highlight.js/styles/github.css';



const App: React.FC = () => {

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path=":category/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":section/:page" element={<PostList />} />
          <Route path=":section/post/create" element={<WritePost />} />
          <Route path=":section/post/:id" element={<PostDetail />} />
        </Route>
        <Route path="not-found" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
