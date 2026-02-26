import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ManageStudents from "../pages/students/ManageStudents";
import SpeechContexts from "../pages/tts/SpeechContexts";
// 1. Add your import here
import BoardConfig from "../components/layout/BoardConfig"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* The Dashboard Parent Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="students" element={<ManageStudents />} />
        <Route path="tts" element={<SpeechContexts />} />
        
        {/* 2. Add the Board Management route here */}
        <Route path="boards" element={<BoardConfig />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}