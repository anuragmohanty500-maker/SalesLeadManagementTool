import React from 'react';
import LeadList from './LeadList';
import LeadDetails from './LeadDetails';
import ActivityLog from './ActivityLog';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="lead-list">
        <h1>Sales Lead Management Tool</h1>
        <LeadList />
      </div>
      <div className="lead-details">
        <LeadDetails />
         <ActivityLog />
      </div>
    </div>
  );
};

export default App;
