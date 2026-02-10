import React, { useState } from 'react';
import { Save, Trash2, Edit2, X, Check, Clock, Plus } from 'lucide-react';

const NotesList = ({ notes = [], onUpdate, title = "Notes" }) => {
    const [newNote, setNewNote] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleAdd = () => {
        if (!newNote.trim()) return;
        const note = {
            id: Date.now(),
            content: newNote,
            timestamp: new Date().toLocaleString()
        };
        onUpdate([...notes, note]);
        setNewNote('');
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this note?')) {
            onUpdate(notes.filter(n => n.id !== id));
        }
    };

    const startEditing = (note) => {
        setEditingId(note.id);
        setEditContent(note.content);
    };

    const saveEdit = () => {
        if (!editContent.trim()) return;
        onUpdate(notes.map(n =>
            n.id === editingId ? { ...n, content: editContent, timestamp: `${n.timestamp} (edited)` } : n
        ));
        setEditingId(null);
        setEditContent('');
    };

    return (
        <div className="notes-section">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {title}
                <span style={{ fontSize: '0.75rem', background: '#e5e7eb', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>
                    {notes.length}
                </span>
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note..."
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        minHeight: '80px',
                        marginBottom: '0.5rem',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                    }}
                />
                <button
                    onClick={handleAdd}
                    disabled={!newNote.trim()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: newNote.trim() ? 1 : 0.5,
                        cursor: newNote.trim() ? 'pointer' : 'not-allowed'
                    }}
                >
                    <Plus size={16} />
                    Add Note
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notes.length === 0 ? (
                    <p style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '0.875rem' }}>No notes yet.</p>
                ) : (
                    notes.map(note => (
                        <div key={note.id} style={{
                            background: '#f9fafb',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb'
                        }}>
                            {editingId === note.id ? (
                                <div>
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #4f46e5',
                                            minHeight: '80px',
                                            marginBottom: '0.5rem',
                                            fontFamily: 'inherit'
                                        }}
                                        autoFocus
                                    />
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button onClick={() => setEditingId(null)} style={{ background: '#f3f4f6', color: '#374151', fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}>Cancel</button>
                                        <button onClick={saveEdit} style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}>Save</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.75rem' }}>
                                            <Clock size={12} />
                                            {note.timestamp}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <button onClick={() => startEditing(note)} style={{ padding: '0.25rem', background: 'transparent', color: '#6b7280' }}>
                                                <Edit2 size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(note.id)} style={{ padding: '0.25rem', background: 'transparent', color: '#ef4444' }}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', color: '#374151', fontSize: '0.9rem' }}>
                                        {note.content}
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ).reverse()}
            </div>
        </div>
    );
};

export default NotesList;
