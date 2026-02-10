import React, { useState } from 'react';
import { Upload, FileText, ArrowRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherResources = () => {
    const [inputText, setInputText] = useState('');
    const [simplifiedText, setSimplifiedText] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSimplify = () => {
        if (!inputText.trim()) return;

        setIsProcessing(true);

        // Simulating processing delay
        setTimeout(() => {
            // Logic: Split by periods, exclamation marks, question marks, or new lines.
            // Filter out empty strings.
            const sentences = inputText
                .split(/([.!?\n]+)/)
                .reduce((acc, current, idx, arr) => {
                    if (idx % 2 === 0 && current.trim()) {
                        let punctuation = arr[idx + 1] || '';
                        // If the split char was a newline, treat it properly
                        if (punctuation.includes('\n')) {
                            acc.push(current.trim());
                        } else {
                            acc.push(current.trim() + punctuation);
                        }
                    }
                    return acc;
                }, [])
                .filter(s => s.length > 0);

            setSimplifiedText(sentences);
            setIsProcessing(false);
        }, 800);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Mock file reading
            const reader = new FileReader();
            reader.onload = (e) => {
                setInputText(e.target.result || "Sample text contents from file...");
            };
            // For real text files (this is a mock for binary files mostly in browser)
            // assuming text file for now or just setting dummy text
            setInputText(`Uploaded content from ${file.name}:\n\nAutism is a developmental disorder. It affects communication and behavior. Autism is known as a "spectrum" disorder because there is wide variation in the type and severity of symptoms people experience.`);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1>Teacher Resources</h1>
                <p style={{ color: '#6b7280' }}>Upload documents or text to simplify for students</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={20} />
                        Input Text
                    </h3>

                    <div style={{ marginBottom: '1rem', padding: '1.5rem', border: '2px dashed #e5e7eb', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <input
                            type="file"
                            id="fileUpload"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                            accept=".txt,.md"
                        />
                        <label
                            htmlFor="fileUpload"
                            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '50%', color: '#3b82f6' }}>
                                <Upload size={24} />
                            </div>
                            <span style={{ color: '#4b5563', fontWeight: 500 }}>Click to upload file</span>
                            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>TXT or MD files supported</span>
                        </label>
                    </div>

                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Or paste your text here..."
                        style={{
                            width: '100%',
                            height: '300px',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            fontSize: '1rem'
                        }}
                    />

                    <button
                        onClick={handleSimplify}
                        disabled={isProcessing || !inputText}
                        style={{
                            marginTop: '1rem',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: (isProcessing || !inputText) ? 0.7 : 1
                        }}
                    >
                        {isProcessing ? <RefreshCw className="spin" size={20} /> : <ArrowRight size={20} />}
                        {isProcessing ? 'Processing...' : 'Simplify Content'}
                    </button>
                </div>

                <div className="card" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#15803d' }}>Simplified Output</h3>

                    {simplifiedText.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {simplifiedText.map((sentence, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    style={{
                                        background: 'white',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                                        borderLeft: '4px solid #34d399',
                                        fontSize: '1.25rem',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {sentence}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86efac' }}>
                            <p>Simplified content will appear here</p>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default TeacherResources;
