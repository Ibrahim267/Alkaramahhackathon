import React, { useState } from 'react';
import { Plus, Upload, File, X, FileText } from 'lucide-react';

const AssignmentsSection = () => {
    const [assignments, setAssignments] = useState([
        { id: 1, name: "Math Worksheet 1", file: "worksheet1.pdf", date: "2023-10-20" },
        { id: 2, name: "Science Project Guidelines", file: "project.docx", date: "2023-10-22" }
    ]);
    const [newAssignmentName, setNewAssignmentName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAddAssignment = () => {
        if (!newAssignmentName.trim() || !selectedFile) {
            alert("Please enter a name and select a file.");
            return;
        }

        const newAssignment = {
            id: Date.now(),
            name: newAssignmentName,
            file: selectedFile.name,
            date: new Date().toISOString().split('T')[0]
        };

        setAssignments([...assignments, newAssignment]);
        setNewAssignmentName('');
        setSelectedFile(null);

        // Reset file input
        const fileInput = document.getElementById('assignment-upload');
        if (fileInput) fileInput.value = '';
    };

    const handleDelete = (id) => {
        setAssignments(assignments.filter(a => a.id !== id));
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={20} />
                    Assignments List
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {assignments.map(assign => (
                        <div
                            key={assign.id}
                            style={{
                                padding: '1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'white'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#e0e7ff', padding: '0.75rem', borderRadius: '0.375rem', color: '#4f46e5' }}>
                                    <File size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{assign.name}</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                                        {assign.file} • {assign.date}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(assign.id)}
                                style={{ background: '#fee2e2', color: '#ef4444', padding: '0.5rem', borderRadius: '0.375rem' }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                    {assignments.length === 0 && (
                        <p style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No assignments uploaded yet.</p>
                    )}
                </div>
            </div>

            <div className="card" style={{ height: 'fit-content' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Add New Assignment</h3>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Assignment Name</label>
                    <input
                        type="text"
                        value={newAssignmentName}
                        onChange={(e) => setNewAssignmentName(e.target.value)}
                        placeholder="e.g., Math Homework 3"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #d1d5db',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Upload File</label>
                    <input
                        type="file"
                        id="assignment-upload"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label
                        htmlFor="assignment-upload"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            border: '1px dashed #d1d5db',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            background: '#f9fafb',
                            color: '#4b5563'
                        }}
                    >
                        <Upload size={20} />
                        {selectedFile ? (
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedFile.name}</span>
                        ) : (
                            <span>Choose file...</span>
                        )}
                    </label>
                </div>

                <button
                    onClick={handleAddAssignment}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={20} />
                    Add Assignment
                </button>
            </div>
        </div>
    );
};

export default AssignmentsSection;
