import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ClipboardList, FileText, GraduationCap } from 'lucide-react';
import { students } from '../data/mockData';
import AETFramework from '../components/AETFramework';
import SubjectsSection from '../components/SubjectsSection';
import AssignmentsSection from '../components/AssignmentsSection';
import ReportCardSection from '../components/ReportCardSection';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const student = students.find(s => s.id === parseInt(id));
    const [activeTab, setActiveTab] = useState('aet');

    if (!student) {
        return <div>Student not found</div>;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'aet':
                return <AETFramework studentId={student.id} />;
            case 'subjects':
                return <SubjectsSection />;
            case 'assignments':
                return <AssignmentsSection />;
            case 'reports':
                return <ReportCardSection />;
            default:
                return <AETFramework studentId={student.id} />;
        }
    };

    const tabs = [
        { id: 'aet', label: 'AET Framework', icon: ClipboardList },
        { id: 'subjects', label: 'Subjects', icon: BookOpen },
        { id: 'assignments', label: 'Assignments', icon: FileText },
        { id: 'reports', label: 'Report Card', icon: GraduationCap },
    ];

    return (
        <div>
            <button
                onClick={() => navigate('/dashboard')}
                style={{ background: 'transparent', color: '#6b7280', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: `hsl(${student.id * 50}, 70%, 80%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: `hsl(${student.id * 50}, 80%, 30%)`
                    }}>
                        {student.name.charAt(0)}
                    </div>
                    <div>
                        <h1 style={{ marginBottom: '0.25rem' }}>{student.name}</h1>
                        <p style={{ color: '#6b7280' }}>{student.diagnosis} • Age {student.age}</p>
                    </div>
                </div>
                <button style={{ background: 'white', color: '#ef4444', border: '1px solid #fecaca' }}>Edit Profile</button>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            background: 'transparent',
                            borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
                            color: activeTab === tab.id ? '#4f46e5' : '#6b7280',
                            borderRadius: 0,
                            padding: '1rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 500
                        }}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {renderContent()}
        </div>
    );
};

export default StudentDetails;
