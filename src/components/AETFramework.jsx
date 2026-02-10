import React, { useState } from 'react';
import { aetCategories } from '../data/mockData';
import { CheckCircle, Circle, Save, Trash2, Edit2, Plus, X, Check } from 'lucide-react';

const AETFramework = ({ studentId }) => {
    const [activeCategory, setActiveCategory] = useState(aetCategories[0].id);
    const [notes, setNotes] = useState('');
    const [newItemText, setNewItemText] = useState('');
    const [editingItemId, setEditingItemId] = useState(null);
    const [editingText, setEditingText] = useState('');

    // Mock state for checklist items (in a real app, this would come from props or API)
    const [checklist, setChecklist] = useState({
        comm: [
            { id: 1, text: "Uses visual supports to express needs", completed: true },
            { id: 2, text: "Initiates interaction with peers", completed: false },
        ],
        semh: [
            { id: 3, text: "Identifies own emotions", completed: false },
        ],
        sensory: [],
        cog: []
    });

    const handleToggle = (catId, itemId) => {
        if (editingItemId === itemId) return; // Prevent toggle while editing
        setChecklist(prev => ({
            ...prev,
            [catId]: prev[catId].map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    const handleAddNote = () => {
        alert(`Note saved for ${activeCategory}: ${notes}`);
        setNotes('');
    };

    const handleAddItem = () => {
        if (!newItemText.trim()) return;
        const newItem = {
            id: Date.now(),
            text: newItemText,
            completed: false
        };
        setChecklist(prev => ({
            ...prev,
            [activeCategory]: [...(prev[activeCategory] || []), newItem]
        }));
        setNewItemText('');
    };

    const handleDeleteItem = (itemId) => {
        setChecklist(prev => ({
            ...prev,
            [activeCategory]: prev[activeCategory].filter(item => item.id !== itemId)
        }));
    };

    const startEditing = (item) => {
        setEditingItemId(item.id);
        setEditingText(item.text);
    };

    const saveEdit = (itemId) => {
        if (!editingText.trim()) return;
        setChecklist(prev => ({
            ...prev,
            [activeCategory]: prev[activeCategory].map(item =>
                item.id === itemId ? { ...item, text: editingText } : item
            )
        }));
        setEditingItemId(null);
        setEditingText('');
    };

    const cancelEdit = () => {
        setEditingItemId(null);
        setEditingText('');
    };

    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>AET Framework</h2>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {aetCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        style={{
                            background: activeCategory === cat.id ? '#4f46e5' : '#f3f4f6',
                            color: activeCategory === cat.id ? 'white' : '#374151',
                            padding: '0.5rem 1rem',
                            borderRadius: '999px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#4b5563' }}>Progression Checklist</h3>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            placeholder="Add new item..."
                            style={{
                                flex: 1,
                                padding: '0.5rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #d1d5db',
                                outline: 'none'
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                        />
                        <button
                            onClick={handleAddItem}
                            style={{ padding: '0.5rem', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {checklist[activeCategory]?.length > 0 ? (
                            checklist[activeCategory].map(item => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.5rem',
                                        borderRadius: '0.375rem',
                                        background: '#f9fafb'
                                    }}
                                >
                                    {editingItemId === item.id ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                            <input
                                                type="text"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                autoFocus
                                                style={{
                                                    flex: 1,
                                                    padding: '0.25rem',
                                                    borderRadius: '0.25rem',
                                                    border: '1px solid #4f46e5',
                                                    outline: 'none'
                                                }}
                                            />
                                            <button onClick={() => saveEdit(item.id)} style={{ padding: '0.25rem', background: '#dcfce7', color: '#16a34a' }}>
                                                <Check size={16} />
                                            </button>
                                            <button onClick={cancelEdit} style={{ padding: '0.25rem', background: '#fee2e2', color: '#ef4444' }}>
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div onClick={() => handleToggle(activeCategory, item.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flex: 1 }}>
                                                {item.completed ?
                                                    <CheckCircle size={20} color="#10b981" /> :
                                                    <Circle size={20} color="#d1d5db" />
                                                }
                                                <span style={{
                                                    textDecoration: item.completed ? 'line-through' : 'none',
                                                    color: item.completed ? '#9ca3af' : '#1f2937'
                                                }}>
                                                    {item.text}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                <button
                                                    onClick={() => startEditing(item)}
                                                    style={{ padding: '0.25rem', background: 'transparent', color: '#6b7280' }}
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteItem(item.id)}
                                                    style={{ padding: '0.25rem', background: 'transparent', color: '#ef4444' }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No checklist items for this category yet.</p>
                        )}
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#4b5563' }}>Teacher Notes</h3>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add observations or progress notes here..."
                        style={{
                            width: '100%',
                            height: '150px',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #d1d5db',
                            resize: 'vertical',
                            marginBottom: '1rem',
                            fontFamily: 'inherit'
                        }}
                    />
                    <button onClick={handleAddNote} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Save size={18} />
                        Save Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AETFramework;
