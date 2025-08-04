import React, { useState } from 'react';
import RubricBuilder from './components/RubricBuilder';
import ScoreSheet from './components/ScoreSheet';
import { FileText, Download, Plus, Trophy } from 'lucide-react';

function App() {
  const [rubric, setRubric] = useState({
    title: '',
    description: '',
    criteria: [],
    participants: []
  });
  const [scoreSheet, setScoreSheet] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');

  const generateScoreSheet = () => {
    if (rubric.criteria.length === 0) {
      alert('Please add at least one criterion to generate a score sheet.');
      return;
    }

    if (rubric.participants.length === 0) {
      alert('Please add at least one participant to generate a score sheet.');
      return;
    }

    const newScoreSheet = {
      rubricTitle: rubric.title,
      rubricDescription: rubric.description,
      criteria: rubric.criteria,
      participants: rubric.participants.map(participant => ({
        id: participant.id,
        name: participant.name
      })),
      generatedAt: new Date().toLocaleString()
    };

    setScoreSheet(newScoreSheet);
    setActiveTab('scoreSheet');
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '10px' }}>
          <Trophy style={{ display: 'inline', marginRight: '12px' }} />
          Competition Score Sheet Generator
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
          Create rubrics and generate score sheet templates for competitions
        </p>
      </header>

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className={`btn ${activeTab === 'builder' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('builder')}
            >
              <Plus size={16} />
              Build Rubric
            </button>
            <button
              className={`btn ${activeTab === 'scoreSheet' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('scoreSheet')}
              disabled={!scoreSheet}
            >
              <FileText size={16} />
              Score Sheet Template
            </button>
          </div>
          
          {activeTab === 'builder' && rubric.criteria.length > 0 && rubric.participants.length > 0 && (
            <button className="btn btn-primary" onClick={generateScoreSheet}>
              <Download size={16} />
              Generate Template
            </button>
          )}
        </div>

        {activeTab === 'builder' && (
          <RubricBuilder rubric={rubric} setRubric={setRubric} />
        )}

        {activeTab === 'scoreSheet' && scoreSheet && (
          <ScoreSheet scoreSheet={scoreSheet} />
        )}
      </div>
    </div>
  );
}

export default App; 