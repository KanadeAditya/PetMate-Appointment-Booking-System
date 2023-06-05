import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import AllRoutes from './routes/Allrouts';

function App() {
  return (
    <div className="App">
        <Navbar />
      
        <AllRoutes  />
    </div>
  );
}

export default App;
