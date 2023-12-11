import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React from 'react';

import WorkLayout from './components/WorkLayout';
import HobbyLayout from './components/HobbyLayout';
import NotFound from './components/NotFound';

import Intro from './pages/Intro';
import WorkInfo from './pages/WorkInfo';
import WorkProjects from './pages/WorkProjects';
import WorkStudy from './pages/WorkStudy';
import WorkHome from './pages/WorkHome';
import HobbyHome from './pages/HobbyHome';
import HobbyGame from './pages/HobbyGame';
import HobbyMovieDramaAnimation from './pages/HobbyMovieAnimation';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path='/work' element={<WorkLayout />}>
          <Route index element={<WorkHome />}/>
          <Route path='info' element={<WorkInfo />}/>  
          <Route path='projects' element={<WorkProjects />}/>
          <Route path='study' element={<WorkStudy />} >
          </Route>
        </Route>
        <Route path='/hobby' element={<HobbyLayout />}>
          <Route index element={<HobbyHome />} />
          <Route path='game' element={<HobbyGame />} />
          <Route path='mda' element={<HobbyMovieDramaAnimation />} />
        </Route> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
};

export default App;