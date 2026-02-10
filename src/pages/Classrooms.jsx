import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classrooms as initialClassrooms, students as initialStudents } from '../data/mockData';
import { Users, GraduationCap, ChevronRight, Plus, Edit2, Trash2, X, Check, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const Classrooms = () => {
    const navigate = useNavigate();
    const [classrooms, setClassrooms] = useState(initialClassrooms);
    // Using initialStudents for count calculation. 
    // Note: In a real app with backend/Context, this would reflect live updates from Dashboard.
    const [students] = useState(initialStudents);

    const [isAdding, setIsAdding] = useState(false);
    const [newClass, setNewClass] = useState({ name: '', teacher: '' });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', teacher: '' });

    const getStudentCount = (classroomId) => {
        return students.filter(s => s.classroomId === classroomId).length;
    };

    const handleAddClass = () => {
        if (!newClass.name) return;
        const newId = Math.max(...classrooms.map(c => c.id), 0) + 1;
        setClassrooms([...classrooms, { ...newClass, id: newId, students: 0 }]);
        setNewClass({ name: '', teacher: '' });
        setIsAdding(false);
    };

    const handleDeleteClass = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this classroom?')) {
            setClassrooms(classrooms.filter(c => c.id !== id));
        }
    };

    const startEditing = (e, classroom) => {
        e.stopPropagation();
        setEditingId(classroom.id);
        setEditForm({ name: classroom.name, teacher: classroom.teacher });
    };

    const saveEdit = (e) => {
        e.stopPropagation();
        setClassrooms(classrooms.map(c =>
            c.id === editingId ? { ...c, ...editForm } : c
        ));
        setEditingId(null);
    };

    const cancelEdit = (e) => {
        e.stopPropagation();
        setEditingId(null);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>My Classrooms</h1>
                    <p style={{ color: '#6b7280' }}>Select a classroom to view students</p>
                </div>
                <button onClick={() => setIsAdding(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={20} />
                    Add Classroom
                </button>
            </div>

            {isAdding && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                    style={{ marginBottom: '2rem', border: '2px solid #4f46e5' }}
                >
                    <h3 style={{ marginBottom: '1rem' }}>New Classroom</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Classroom Name (e.g. Class 4D)"
                            value={newClass.name}
                            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                        />
                        <input
                            type="text"
                            placeholder="Teacher Name"
                            value={newClass.teacher}
                            onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => setIsAdding(false)} style={{ background: '#f3f4f6', color: '#374151' }}>Cancel</button>
                        <button onClick={handleAddClass}>Create Classroom</button>
                    </div>
                </motion.div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {classrooms.map((classroom, index) => (
                    <motion.div
                        key={classroom.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card"
                        style={{
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            borderLeft: `4px solid hsl(${classroom.id * 60}, 70%, 50%)`,
                            position: 'relative'
                        }}
                        onClick={() => navigate(`/classroom/${classroom.id}`)}
                        whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    >
                        {editingId === classroom.id ? (
                            <div onClick={(e) => e.stopPropagation()}>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}
                                    autoFocus
                                />
                                <input
                                    type="text"
                                    value={editForm.teacher}
                                    onChange={(e) => setEditForm({ ...editForm, teacher: e.target.value })}
                                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                                />
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={saveEdit} style={{ background: '#dcfce7', color: '#16a34a', padding: '0.5rem' }}><Save size={18} /></button>
                                    <button onClick={cancelEdit} style={{ background: '#fee2e2', color: '#ef4444', padding: '0.5rem' }}><X size={18} /></button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <div style={{
                                        background: `hsl(${classroom.id * 60}, 70%, 90%)`,
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        color: `hsl(${classroom.id * 60}, 70%, 40%)`
                                    }}>
                                        <GraduationCap size={24} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        <button
                                            onClick={(e) => startEditing(e, classroom)}
                                            style={{ padding: '0.5rem', background: 'transparent', color: '#6b7280' }}
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteClass(e, classroom.id)}
                                            style={{ padding: '0.5rem', background: 'transparent', color: '#ef4444' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <ChevronRight size={20} color="#9ca3af" style={{ marginLeft: '0.5rem' }} />
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{classroom.name}</h3>
                                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{classroom.teacher}</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563', background: '#f3f4f6', padding: '0.5rem', borderRadius: '0.375rem', width: 'fit-content' }}>
                                    <Users size={16} />
                                    <span>{getStudentCount(classroom.id)} Students</span>
                                </div>
                            </>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Classrooms;
