import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/classrooms');
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'white',
                    padding: '3rem',
                    borderRadius: '1rem',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Brain size={48} color="#4F46E5" style={{ margin: '0 auto 1rem' }} />
                    <h1 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: '#6b7280' }}>Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Email Address</label>
                        <input
                            type="email"
                            defaultValue="teacher@school.com"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #d1d5db',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Password</label>
                        <input
                            type="password"
                            defaultValue="password"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #d1d5db',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            marginTop: '1rem',
                            padding: '0.875rem',
                            fontSize: '1rem',
                            fontWeight: 500
                        }}
                    >
                        Sign In
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
