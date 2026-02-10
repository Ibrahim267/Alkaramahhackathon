import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import StudentDetails from './pages/StudentDetails';
import TeacherResources from './components/TeacherResources';

import Classrooms from './pages/Classrooms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="classrooms" element={<Classrooms />} />
          <Route path="classroom/:id" element={<Dashboard />} />
          <Route path="student/:id" element={<StudentDetails />} />
          <Route path="resources" element={<TeacherResources />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
