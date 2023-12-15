import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React from 'react';

import WorkLayout from './components/WorkLayout';
import HobbyLayout from './components/HobbyLayout';
import NotFound from './components/NotFound';

import Intro from './pages/Intro';
import WorkInfo from './pages/WorkInfo';
import WorkProjects from './pages/WorkProjects';
import WorkHome from './pages/WorkHome';
import HobbyHome from './pages/HobbyHome';
import PostDetail from './pages/PostDetail';
import PostList from './pages/PostList'
import WritePost from './pages/WritePost';
import Layout from './components/Layout';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path=":subject/*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":category/:page" element={<PostList />} />
          <Route path=":category/post/create" element={<WritePost />} />
          <Route path=":category/post/:id" element={<PostDetail />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

// 이게 저렇게 깔끔해지네;
{/* <Route path='/work' element={<WorkLayout />}>
  <Route index element={<WorkHome />}/>
  <Route path='info' element={<WorkInfo />}/>  
  <Route path='projects' element={<WorkProjects />}/>
  <Route path='study/:page' element={<PostList subject="work" category="study"/>} />
  <Route path='study/post/create' element={<WritePost category=""/>} />
  <Route path='study/post/:id' element={<PostDetail />} />
</Route>
<Route path='/hobby' element={<HobbyLayout />}>
  <Route index element={<HobbyHome />} />
  <Route path='game/:page' element={<PostList subject="hobby" category="game" />} />
  <Route path='game/post/create' element={<WritePost category="game"/>} />
  <Route path='game/post/:id' element={<PostDetail/>} />
  <Route path='ma/:page' element={<PostList subject="hobby" category="ma" />} />
  <Route path='ma/post/create' element={<WritePost category="ma"/>} />
  <Route path='ma/post/:id' element={<PostDetail/>} />

</Route>  */}