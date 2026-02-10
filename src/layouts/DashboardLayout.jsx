import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Users, BookOpen, FileText, LogOut, LayoutDashboard, Brain, Book } from 'lucide-react';
import style from './DashboardLayout.module.css';

const DashboardLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className={style.layout}>
            <aside className={style.sidebar}>
                <div className={style.logo}>
                    <Brain size={32} color="var(--primary-color)" />
                    <h1>Teach Smart</h1>
                </div>
                <nav className={style.nav}>
                    <NavLink to="/classrooms" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>
                        <Users size={20} />
                        Classrooms
                    </NavLink>
                    <NavLink to="/resources" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>
                        <BookOpen size={20} />
                        Resources
                    </NavLink>
                </nav>
                <div className={style.footer}>
                    <button onClick={handleLogout} className={style.logoutBtn}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
            <main className={style.content}>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
