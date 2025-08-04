import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Users } from 'lucide-react';

const RubricBuilder = ({ rubric, setRubric }) => {
  const [editingCriterion, setEditingCriterion] = useState(null);
  const [newCriterion, setNewCriterion] = useState({
    name: '',
    maxPoints: 10
  });
  const [participantInput, setParticipantInput] = useState('');
  const [numberOfParticipants, setNumberOfParticipants] = useState('');

  const handleRubricChange = (field, value) => {
    setRubric(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addCriterion = () => {
    if (!newCriterion.name.trim()) {
      alert('Please enter a criterion name.');
      return;
    }

    const criterion = {
      id: Date.now(),
      ...newCriterion
    };

    setRubric(prev => ({
      ...prev,
      criteria: [...prev.criteria, criterion]
    }));

    setNewCriterion({
      name: '',
      maxPoints: 10
    });
  };

  const updateCriterion = (criterionId, updatedCriterion) => {
    setRubric(prev => ({
      ...prev,
      criteria: prev.criteria.map(c => 
        c.id === criterionId ? { ...c, ...updatedCriterion } : c
      )
    }));
    setEditingCriterion(null);
  };

  const removeCriterion = (criterionId) => {
    setRubric(prev => ({
      ...prev,
      criteria: prev.criteria.filter(c => c.id !== criterionId)
    }));
  };

  const addParticipant = () => {
    if (!participantInput.trim()) {
      alert('Please enter a participant name.');
      return;
    }

    const participant = {
      id: Date.now(),
      name: participantInput.trim()
    };

    setRubric(prev => ({
      ...prev,
      participants: [...prev.participants, participant]
    }));

    setParticipantInput('');
  };

  const removeParticipant = (participantId) => {
    setRubric(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== participantId)
    }));
  };

  const addMultipleParticipants = () => {
    const count = parseInt(numberOfParticipants);
    if (isNaN(count) || count <= 0) {
      alert('Please enter a valid number of participants.');
      return;
    }

    const newParticipants = [];
    for (let i = 1; i <= count; i++) {
      newParticipants.push({
        id: Date.now() + i,
        name: `Participant ${i}`
      });
    }

    setRubric(prev => ({
      ...prev,
      participants: [...prev.participants, ...newParticipants]
    }));

    setNumberOfParticipants('');
  };

  return (
    <div>
      {/* Rubric Basic Info */}
      <div className="form-group">
        <label className="form-label">Competition Title</label>
        <input
          type="text"
          className="input"
          value={rubric.title}
          onChange={(e) => handleRubricChange('title', e.target.value)}
          placeholder="Enter competition title (e.g., Science Fair Competition)"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="input"
          value={rubric.description}
          onChange={(e) => handleRubricChange('description', e.target.value)}
          placeholder="Enter a brief description of the competition"
          rows="3"
          style={{ resize: 'vertical' }}
        />
      </div>

      {/* Participants Section */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>
          <Users size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Participants ({rubric.participants.length})
        </h3>

        {/* Add Multiple Participants */}
        <div className="grid grid-2" style={{ marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label">Quick Add Participants</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="number"
                className="input"
                value={numberOfParticipants}
                onChange={(e) => setNumberOfParticipants(e.target.value)}
                placeholder="Number of participants"
                min="1"
                max="50"
                style={{ flex: '1' }}
              />
              <button className="btn btn-secondary" onClick={addMultipleParticipants}>
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Add Individual Participant</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input"
                value={participantInput}
                onChange={(e) => setParticipantInput(e.target.value)}
                placeholder="Participant name"
                style={{ flex: '1' }}
              />
              <button className="btn btn-secondary" onClick={addParticipant}>
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Participants List */}
        {rubric.participants.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {rubric.participants.map((participant, index) => (
              <div key={participant.id} style={{ 
                padding: '12px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '500' }}>{participant.name}</span>
                <button
                  className="btn btn-danger"
                  onClick={() => removeParticipant(participant.id)}
                  style={{ padding: '4px 8px', fontSize: '12px' }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Existing Criteria */}
      {rubric.criteria.length > 0 && (
        <div className="form-group" style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>Criteria ({rubric.criteria.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {rubric.criteria.map((criterion, index) => (
              <div key={criterion.id} className="card" style={{ marginBottom: '0' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h4 style={{ margin: '0', color: '#333' }}>
                    {index + 1}. {criterion.name}
                  </h4>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditingCriterion(criterion.id)}
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCriterion(criterion.id)}
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
                
                <p style={{ color: '#495057', fontSize: '14px' }}>
                  <strong>Max Points:</strong> {criterion.maxPoints}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Criterion */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>
          <Plus size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Add New Criterion
        </h3>

        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Criterion Name</label>
            <input
              type="text"
              className="input"
              value={newCriterion.name}
              onChange={(e) => setNewCriterion(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Creativity, Technical Skill, Presentation"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Maximum Points</label>
            <input
              type="number"
              className="input"
              value={newCriterion.maxPoints}
              onChange={(e) => setNewCriterion(prev => ({ ...prev, maxPoints: parseInt(e.target.value) || 0 }))}
              min="1"
              max="100"
            />
          </div>
        </div>

        <button className="btn btn-primary" onClick={addCriterion}>
          <Plus size={16} />
          Add Criterion
        </button>
      </div>
    </div>
  );
};

export default RubricBuilder; 