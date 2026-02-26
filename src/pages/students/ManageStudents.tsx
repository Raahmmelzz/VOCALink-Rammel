import { useState, useEffect } from "react";
import DashboardCard from "../../components/layout/DashboardCard";
import "../../styles/DashboardLayout.css";

export default function ManageStudents() {
  const [students, setStudents] = useState<string[]>(() => {
    const savedData = localStorage.getItem("vocalink_students");
    return savedData ? JSON.parse(savedData) : ["Rammel Pacamo", "Marvin Bisakol", "Charlie Kirk"];
  });

  const [newStudentName, setNewStudentName] = useState("");

  useEffect(() => {
    localStorage.setItem("vocalink_students", JSON.stringify(students));
  }, [students]);

  const handleAddStudent = () => {
    if (newStudentName.trim() === "") return;
    setStudents([...students, newStudentName.trim()]);
    setNewStudentName("");
  };

  const handleDeleteStudent = (indexToRemove: number) => {
    setStudents(students.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="manage-students-container">
      
      <DashboardCard>
        <div>
          <h2 className="page-title">Manage Students</h2>
          <p className="page-desc">
            This is your student roster. You can add or remove students here.
          </p>
        </div>
        
        <div className="input-group">
          <input 
            type="text" 
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddStudent()}
            placeholder="Enter student name..."
            className="student-input"
          />
          <button onClick={handleAddStudent} className="btn-primary">
            + Add
          </button>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="roster-header">
          <h3 className="roster-title">Current Roster</h3>
          <span className="badge">Total: {students.length}</span>
        </div>
        
        {students.length === 0 ? (
          <p className="empty-state">No students in the roster yet.</p>
        ) : (
          <ul className="student-list">
            {students.map((student, index) => (
              <li key={index} className="student-item">
                <span className="student-name">{student}</span>
                <button 
                  onClick={() => handleDeleteStudent(index)}
                  className="btn-danger"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </DashboardCard>
    </div>    
  );
}