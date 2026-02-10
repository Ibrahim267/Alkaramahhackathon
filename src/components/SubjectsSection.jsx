import React, { useState } from 'react';
import { subjects as initialSubjects } from '../data/mockData';
import { Plus, Trash2, Save, BookOpen } from 'lucide-react';

const SubjectsSection = () => {
    const [subjects, setSubjects] = useState(initialSubjects.map(s => ({ name: s, notes: '' })));
    const [newSubject, setNewSubject] = useState('');
    const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);

    const handleAddSubject = () => {
        if (!newSubject.trim()) return;
        setSubjects([...subjects, { name: newSubject, notes: '' }]);
        setNewSubject('');
    };

    const handleDeleteSubject = (index, e) => {
        e.stopPropagation();
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
        if (activeSubjectIndex >= newSubjects.length) {
            setActiveSubjectIndex(Math.max(0, newSubjects.length - 1));
        }
    };

    const handleNoteChange = (e) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[activeSubjectIndex].notes = e.target.value;
        setSubjects(updatedSubjects);
    };

    const handleSaveNotes = () => {
        alert(`Notes saved for ${subjects[activeSubjectIndex].name}`);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
            <div className="card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={20} />
                    Subjects
                </h3>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="Add subject..."
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                            border: '1px solid #d1d5db',
                            outline: 'none',
                            width: '100%'
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                    />
                    <button
                        onClick={handleAddSubject}
                        style={{ padding: '0.5rem', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                    {subjects.map((subject, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveSubjectIndex(index)}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '0.375rem',
                                background: activeSubjectIndex === index ? '#4f46e5' : '#f3f4f6',
                                color: activeSubjectIndex === index ? 'white' : '#374151',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontWeight: 500 }}>{subject.name}</span>
                            <button
                                onClick={(e) => handleDeleteSubject(index, e)}
                                style={{
                                    background: 'transparent',
                                    color: activeSubjectIndex === index ? '#e0e7ff' : '#9ca3af',
                                    padding: '0.25rem',
                                    display: 'flex'
                                }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {subjects.length === 0 && (
                        <p style={{ color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>No subjects added.</p>
                    )}
                </div>
            </div>

            <div className="card">
                {subjects.length > 0 ? (
                    <>
                        <h3 style={{ marginBottom: '1rem' }}>Notes for {subjects[activeSubjectIndex].name}</h3>
                        <textarea
                            value={subjects[activeSubjectIndex].notes}
                            onChange={handleNoteChange}
                            placeholder={`Enter curriculum notes, progress, or lesson plans for ${subjects[activeSubjectIndex].name}...`}
                            style={{
                                width: '100%',
                                height: '300px',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #e5e7eb',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                marginBottom: '1rem'
                            }}
                        />
                        <button onClick={handleSaveNotes} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Save size={18} />
                            Save Notes
                        </button>
                    </>
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                        <p>Select or add a subject to view notes</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectsSection;
