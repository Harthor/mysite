import React from 'react';

import WorkLayout from './components/WorkLayout';
import HobbyLayout from './components/HobbyLayout';
import NotFound from './components/NotFound';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Info from './pages/Info';
import Projects from './pages/Projects';
import Study from './pages/Study';
import WorkHome from './pages/WorkHome';
import HobbyHome from './pages/HobbyHome';
import Home from './pages/Home';
import Game from './pages/Game';
import MovieDramaAnimation from './pages/MovieDramaAnimation';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/work' element={<WorkLayout />}>
          <Route index element={<WorkHome />}/>
          <Route path='info' element={<Info />}/>  
          <Route path='projects' element={<Projects />}/>
          <Route path='study' element={<Study />}/>
        </Route>
        <Route path='/hobby' element={<HobbyLayout />}>
          <Route index element={<HobbyHome />} />
          <Route path='game' element={<Game />}></Route>
          <Route path='mda' element={<MovieDramaAnimation />}></Route>
        </Route> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
};

export default App;