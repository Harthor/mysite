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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path='/work' element={<WorkLayout />}>
          <Route index element={<WorkHome />}/>
          <Route path='info' element={<WorkInfo />}/>  
          <Route path='projects' element={<WorkProjects />}/>
          <Route path='study/:page' element={<PostList subject="work" category="study"/>} />
          <Route path='study/post/:id' element={<PostDetail />} />
        </Route>
        <Route path='/hobby' element={<HobbyLayout />}>
          <Route index element={<HobbyHome />} />
          <Route path='game/:page' element={<PostList subject="hobby" category="game" />} />
          <Route path='game/post/:id' element={<PostDetail/>} />
          <Route path='ma/:page' element={<PostList subject="hobby" category="ma" />} />
          <Route path='ma/post/:id' element={<PostDetail/>} />

        </Route> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
};

export default App;