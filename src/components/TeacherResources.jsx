import React, { useState } from 'react';
import { Upload, FileText, ArrowRight, RefreshCw, Plus, Folder, Trash2, Edit2, Printer, X, Save, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherResources = () => {
    // Categories State
    const [categories, setCategories] = useState([
        { id: 'books', name: 'Books' },
        { id: 'aet', name: 'AET Content' },
        { id: 'presentations', name: 'Presentations' },
        { id: 'simplifier', name: 'Text Simplifier', isSystem: true } // System category
    ]);

    // Files State (Mock Database)
    const [files, setFiles] = useState({
        books: [
            { id: 1, name: 'Autism Guide 101.pdf', type: 'PDF', date: '2023-10-25' },
            { id: 2, name: 'Sensory Needs.docx', type: 'DOCX', date: '2023-11-02' }
        ],
        aet: [],
        presentations: []
    });

    const [activeCategory, setActiveCategory] = useState(null); // 'null' means showing category list
    const [isEditingCategory, setIsEditingCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    // Text Simplifier State
    const [inputText, setInputText] = useState('');
    const [simplifiedText, setSimplifiedText] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // Category Notes State
    const [categoryNotes, setCategoryNotes] = useState({
        aet: "Record AET specific observations or curriculum alignment notes here."
    });
    const [isSavingNotes, setIsSavingNotes] = useState(false);
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    // --- Category Management ---
    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        const newId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
        setCategories([...categories, { id: newId, name: newCategoryName }]);
        setFiles(prev => ({ ...prev, [newId]: [] })); // Initialize file storage for new category
        setNewCategoryName('');
        setIsAddingCategory(false);
    };

    const handleDeleteCategory = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Delete this category and all its files?')) {
            setCategories(categories.filter(c => c.id !== id));
            const newFiles = { ...files };
            delete newFiles[id];
            setFiles(newFiles);
        }
    };

    const startEditingCategory = (e, cat) => {
        e.stopPropagation();
        setIsEditingCategory(cat.id);
        setEditCategoryName(cat.name);
    };

    const saveCategoryEdit = (e) => {
        e.stopPropagation();
        if (!editCategoryName.trim()) return;
        setCategories(categories.map(c =>
            c.id === isEditingCategory ? { ...c, name: editCategoryName } : c
        ));
        setIsEditingCategory(null);
    };

    const cancelCategoryEdit = (e) => {
        e.stopPropagation();
        setIsEditingCategory(null);
    };

    // --- File Management ---
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && activeCategory) {
            const newFile = {
                id: Date.now(),
                name: file.name,
                type: file.name.split('.').pop().toUpperCase(),
                date: new Date().toLocaleDateString()
            };
            setFiles(prev => ({
                ...prev,
                [activeCategory.id]: [...(prev[activeCategory.id] || []), newFile]
            }));
        }
    };

    const handleDeleteFile = (fileId) => {
        if (window.confirm('Delete this file?')) {
            setFiles(prev => ({
                ...prev,
                [activeCategory.id]: prev[activeCategory.id].filter(f => f.id !== fileId)
            }));
        }
    };

    const handlePrintFile = (file) => {
        alert(`Printing ${file.name}...`);
        window.print();
    };

    // --- Text Simplifier Logic ---
    const handleSimplify = () => {
        if (!inputText.trim()) return;
        setIsProcessing(true);
        setTimeout(() => {
            const sentences = inputText.match(/[^.!?]+[.!?]+/g) || [inputText];
            setSimplifiedText(sentences.map(s => s.trim()));
            setIsProcessing(false);
        }, 800);
    };

    const handleSimplifierFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setInputText(e.target.result || "");
            };
            reader.readAsText(file);
        }
    };

    const handleSaveCategoryNotes = () => {
        setIsSavingNotes(true);
        // Simulate a save operation
        setTimeout(() => {
            setIsSavingNotes(false);
            setShowSavedMessage(true);
            setTimeout(() => setShowSavedMessage(false), 2000);
        }, 600);
    };


    // --- Render Views ---

    const renderCategoryGrid = () => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Resource Hub</h1>
                    <p style={{ color: '#6b7280' }}>Manage your educational materials</p>
                </div>
                <button onClick={() => setIsAddingCategory(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={20} />
                    New Category
                </button>
            </div>

            {isAddingCategory && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                    style={{ marginBottom: '2rem', border: '2px solid #4f46e5' }}
                >
                    <h3 style={{ marginBottom: '1rem' }}>Create New Category</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                            autoFocus
                        />
                        <button onClick={handleAddCategory}>Create</button>
                        <button onClick={() => setIsAddingCategory(false)} style={{ background: '#f3f4f6', color: '#374151' }}>Cancel</button>
                    </div>
                </motion.div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="card"
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '2rem',
                            borderTop: `4px solid ${cat.id === 'simplifier' ? '#10b981' : '#4f46e5'}`,
                            position: 'relative'
                        }}
                        onClick={() => setActiveCategory(cat)}
                        whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    >
                        {isEditingCategory === cat.id ? (
                            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%' }}>
                                <input
                                    type="text"
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', textAlign: 'center' }}
                                    autoFocus
                                />
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                    <button onClick={saveCategoryEdit} style={{ padding: '0.25rem', background: '#dcfce7', color: '#16a34a' }}><Check size={16} /></button>
                                    <button onClick={cancelCategoryEdit} style={{ padding: '0.25rem', background: '#fee2e2', color: '#ef4444' }}><X size={16} /></button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {cat.id === 'simplifier' ? (
                                    <RefreshCw size={48} color="#10b981" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                                ) : (
                                    <Folder size={48} color="#4f46e5" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                                )}
                                <h3 style={{ fontSize: '1.25rem' }}>{cat.name}</h3>
                                {cat.id !== 'simplifier' && (
                                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                        {files[cat.id]?.length || 0} Files
                                    </p>
                                )}

                                {!cat.isSystem && (
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.25rem' }}>
                                        <button
                                            onClick={(e) => startEditingCategory(e, cat)}
                                            style={{ padding: '0.25rem', background: 'transparent', color: '#9ca3af' }}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteCategory(e, cat.id)}
                                            style={{ padding: '0.25rem', background: 'transparent', color: '#ef4444' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );

    const renderTextSimplifier = () => (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={20} />
                        Input Text
                    </h3>

                    <div style={{ marginBottom: '1rem', padding: '1.25rem', border: '2px dashed #e5e7eb', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <input
                            type="file"
                            id="simplifierFileUpload"
                            style={{ display: 'none' }}
                            onChange={handleSimplifierFileUpload}
                            accept=".txt,.md,.doc,.docx"
                        />
                        <label
                            htmlFor="simplifierFileUpload"
                            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '50%', color: '#3b82f6' }}>
                                <Upload size={20} />
                            </div>
                            <span style={{ color: '#4b5563', fontWeight: 500, fontSize: '0.875rem' }}>Upload file to simplify</span>
                        </label>
                    </div>

                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Or paste text here..."
                        style={{
                            width: '100%',
                            height: '220px',
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
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );

    const renderFileCategory = () => (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Folder size={32} color="#4f46e5" />
                    <div>
                        <h2 style={{ margin: 0 }}>{activeCategory.name}</h2>
                        <p style={{ margin: 0, color: '#6b7280' }}>Category Manager</p>
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="file"
                        id="category-upload"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                    <label
                        htmlFor="category-upload"
                        className="btn"
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#4f46e5', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}
                    >
                        <Upload size={20} />
                        Upload File
                    </label>
                </div>
            </div>

            {/* Notes Section for AET Content or any category */}
            <div style={{ marginBottom: '2rem', padding: '1rem', background: '#fefce8', border: '1px solid #fef08a', borderRadius: '0.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#854d0e' }}>
                    <Check size={18} />
                    Category Notes
                </h4>
                <textarea
                    value={categoryNotes[activeCategory.id] || ''}
                    onChange={(e) => setCategoryNotes({ ...categoryNotes, [activeCategory.id]: e.target.value })}
                    placeholder="Add notes for this category..."
                    style={{
                        width: '100%',
                        height: '100px',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        border: '1px solid #fde047',
                        background: 'white',
                        resize: 'vertical',
                        marginBottom: '0.75rem'
                    }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={handleSaveCategoryNotes}
                        disabled={isSavingNotes}
                        style={{ padding: '0.5rem 1.5rem', background: '#eab308', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {isSavingNotes ? <RefreshCw size={16} className="spin" /> : <Save size={16} />}
                        {isSavingNotes ? 'Saving...' : 'Save Notes'}
                    </button>
                    {showSavedMessage && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ color: '#16a34a', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                            <Check size={16} /> Saved!
                        </motion.span>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(files[activeCategory.id] || []).length === 0 ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af', border: '2px dashed #e5e7eb', borderRadius: '0.5rem' }}>
                        <Upload size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>No files in this category yet.</p>
                        <p style={{ fontSize: '0.875rem' }}>Upload PDFs, Word docs, or images.</p>
                    </div>
                ) : (
                    (files[activeCategory.id] || []).map(file => (
                        <div key={file.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            background: '#f9fafb',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <FileText size={24} color="#6b7280" />
                                <div>
                                    <p style={{ margin: 0, fontWeight: 500 }}>{file.name}</p>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>Added: {file.date} • {file.type}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => handlePrintFile(file)} style={{ padding: '0.5rem', background: 'transparent', color: '#374151' }} title="Print">
                                    <Printer size={18} />
                                </button>
                                <button onClick={() => handleDeleteFile(file.id)} style={{ padding: '0.5rem', background: 'transparent', color: '#ef4444' }} title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div>
            {activeCategory && (
                <button
                    onClick={() => setActiveCategory(null)}
                    style={{ background: 'transparent', color: '#6b7280', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}
                >
                    <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                    Back to Resources
                </button>
            )}

            {!activeCategory ? renderCategoryGrid() : (
                activeCategory.id === 'simplifier' ? renderTextSimplifier() : renderFileCategory()
            )}
        </div>
    );
};

export default TeacherResources;
