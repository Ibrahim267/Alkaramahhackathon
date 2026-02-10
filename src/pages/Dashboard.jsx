import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Search, MapPin, ArrowLeft } from 'lucide-react';
import { students, classrooms } from '../data/mockData';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();
    const { id: classroomId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    const classroom = classrooms.find(c => c.id === parseInt(classroomId));

    // Filter students by classroom if classroomId is present
    const filteredStudents = students.filter(student => {
        const matchesClass = classroomId ? student.classroomId === parseInt(classroomId) : true;
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesClass && matchesSearch;
    });

    return (
        <div>
            {classroomId && (
                <button
                    onClick={() => navigate('/classrooms')}
                    style={{ background: 'transparent', color: '#6b7280', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}
                >
                    <ArrowLeft size={16} />
                    Back to Classrooms
                </button>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>{classroom ? `${classroom.name} Students` : 'Student Profiles'}</h1>
                    <p style={{ color: '#6b7280' }}>Manage and track student progress</p>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={20} />
                    Add Student
                </button>
            </div>

            <div style={{ marginBottom: '2rem', position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {filteredStudents.map((student, index) => (
                    <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card"
                        style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                        onClick={() => navigate(`/student/${student.id}`)}
                        whileHover={{ y: -5 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: `hsl(${student.id * 50}, 70%, 80%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: `hsl(${student.id * 50}, 80%, 30%)`,
                                fontSize: '1.25rem'
                            }}>
                                {student.name.charAt(0)}
                            </div>
                            <span style={{
                                background: '#e0e7ff',
                                color: '#4338ca',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '999px',
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}>
                                {student.diagnosis}
                            </span>
                        </div>
                        <h3>{student.name}</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Age: {student.age}</p>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>Guardian: {student.guardian}</p>

                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
