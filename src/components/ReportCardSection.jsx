import React, { useState } from 'react';
import { Upload, FileText, Trash2, Download } from 'lucide-react';

const ReportCardSection = () => {
    const [reports, setReports] = useState([
        { id: 1, name: "Term 1 Report Card.pdf", date: "2023-12-15" },
    ]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newReport = {
                id: Date.now(),
                name: file.name,
                date: new Date().toISOString().split('T')[0]
            };
            setReports([...reports, newReport]);
        }
    };

    const handleDelete = (id) => {
        setReports(reports.filter(r => r.id !== id));
    };

    return (
        <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Student Report Cards</h3>

            <div style={{ padding: '2rem', border: '2px dashed #e5e7eb', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '2rem' }}>
                <input
                    type="file"
                    id="report-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                <label
                    htmlFor="report-upload"
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                >
                    <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '50%', color: '#3b82f6' }}>
                        <Upload size={32} />
                    </div>
                    <span style={{ color: '#4b5563', fontWeight: 500, fontSize: '1.125rem' }}>Upload Report Card</span>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>PDF, DOCX, or Images</span>
                </label>
            </div>

            <h4 style={{ marginBottom: '1rem', color: '#6b7280' }}>Uploaded Reports</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {reports.map(report => (
                    <div
                        key={report.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            background: '#f9fafb',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <FileText size={24} color="#4f46e5" />
                            <div>
                                <p style={{ margin: 0, fontWeight: 500 }}>{report.name}</p>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Uploaded on {report.date}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button style={{ padding: '0.5rem', background: 'transparent', color: '#4f46e5' }}>
                                <Download size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(report.id)}
                                style={{ padding: '0.5rem', background: 'transparent', color: '#ef4444' }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {reports.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' }}>No reports available.</p>
                )}
            </div>
        </div>
    );
};

export default ReportCardSection;
