// src/App.tsx
import React from 'react';
import IssueCredential from './components/IssueCredential';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Verifiable Credentials with MetaMask</h1>
      <IssueCredential />
    </div>
  );
};

export default App;
