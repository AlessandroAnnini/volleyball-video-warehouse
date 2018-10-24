import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import AddVideo from './AddVideo';
import VideoList from './VideoList';

const App = () => (
  <Router>
    <div>
      <Header />
      <main>
        <Route exact path="/" component={VideoList} />
        <Route exact path="/addVideo" component={AddVideo} />
      </main>
    </div>
  </Router>
);

export default App;
