import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import DashboardRouters from './routers/dashboardRouters';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App w-screen h-screen">
      <DashboardRouters />
    </div>
  );
}

export default App;
