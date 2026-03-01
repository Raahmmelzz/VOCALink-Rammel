import { useState, useEffect } from "react";
import DashboardCard from "../../components/layout/DashboardCard";

interface Student {
  id: string;
  name: string;
  grade: string;
  need: string;
  address: string;
  guardian: string;
  contact: string;
}

export default function ManageStudents() {
  const [students, setStudents] = useState<Student[]>(() => {
    const savedData = localStorage.getItem("vocalink_students");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [newStudent, setNewStudent] = useState({
    name: "", grade: "", need: "", address: "", guardian: "", contact: ""
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Student | null>(null);

  useEffect(() => {
    localStorage.setItem("vocalink_students", JSON.stringify(students));
  }, [students]);

  // pang capitalize sa name and guardian
  const formatText = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleAddStudent = () => {
    const isFormIncomplete = Object.values(newStudent).some(val => val.trim() === "");
    if (isFormIncomplete) {
      alert("Please fill up all fields before creating a profile.");
      return;
    }

    if (newStudent.contact.length !== 11) {
      alert("Contact number must be exactly 11 digits.");
      return;
    }

    const studentToAdd: Student = { 
      id: crypto.randomUUID(), 
      ...newStudent,
      name: formatText(newStudent.name),
      guardian: formatText(newStudent.guardian)
    };

    setStudents([...students, studentToAdd]);
    setNewStudent({ name: "", grade: "", need: "", address: "", guardian: "", contact: "" });
  };

  const startEdit = (student: Student) => {
    setEditingId(student.id);
    setEditFormData({ ...student });
  };

  const saveEdit = () => {
    if (!editFormData) return;
    
    const isEditIncomplete = Object.values(editFormData).some(val => val.trim() === "");
    if (isEditIncomplete || editFormData.contact.length !== 11) {
      alert("All fields must be filled and contact must be 11 digits.");
      return;
    }

    setStudents(students.map(s => s.id === editingId ? {
      ...editFormData,
      name: formatText(editFormData.name),
      guardian: formatText(editFormData.guardian)
    } : s));
    
    setEditingId(null);
    setEditFormData(null);
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: "bold",
    color: "#475569",
    marginBottom: "4px",
    textTransform: "uppercase"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      
      <DashboardCard>
        <h2 style={{ color: "#2aa7ff", margin: "0 0 8px 0" }}>Manage Students</h2>
        <p className="user-email" style={{ marginBottom: "20px" }}>Register a new student profile below.</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "100%" }}>
          {/* Row 1: Name and Grade */}
          <div>
            <label style={labelStyle}>Student Full Name</label>
            <input className="student-input" style={{ width: "100%" }} placeholder="John Pork" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} />
          </div>
          <div>
            <label style={labelStyle}>Grade</label>
            <input className="student-input" style={{ width: "100%" }} placeholder="Grade Level" value={newStudent.grade} onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})} />
          </div>
          
          {/* Row 2: Need and Address */}
          <div>
            <label style={labelStyle}>Special Need</label>
            <input className="student-input" style={{ width: "100%" }} placeholder="Need" value={newStudent.need} onChange={(e) => setNewStudent({...newStudent, need: e.target.value})} />
          </div>
          <div>
            <label style={labelStyle}>Home Address</label>
            <input className="student-input" style={{ width: "100%" }} placeholder="Address" value={newStudent.address} onChange={(e) => setNewStudent({...newStudent, address: e.target.value})} />
          </div>

          {/* Row 3: Guardian and Contact */}
          <div>
            <label style={labelStyle}>Guardian Name</label>
            <input className="student-input" style={{ width: "100%" }} placeholder="John Wick" value={newStudent.guardian} onChange={(e) => setNewStudent({...newStudent, guardian: e.target.value})} />
          </div>
          <div>
            <label style={labelStyle}>Contact Number</label>
            <input 
              className="student-input" 
              style={{ width: "100%" }} 
              placeholder="09123456789" 
              value={newStudent.contact} 
              maxLength={11}
              onChange={(e) => setNewStudent({...newStudent, contact: e.target.value.replace(/\D/g, "")})} 
            />
          </div>

          <button onClick={handleAddStudent} className="btn-primary" style={{ gridColumn: "span 2", marginTop: "8px", height: "42px" }}>
            + Create Student Profile
          </button>
        </div>
      </DashboardCard>

      <DashboardCard>
        <h3 className="sidebar-title" style={{ width: "100%", marginBottom: "20px" }}>Current Students</h3>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          {students.map((student) => (
            <div key={student.id} style={{ width: "100%", padding: "20px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
              {editingId === student.id ? (
              
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%" }}>
                  <div><label style={labelStyle}>Name</label><input className="student-input" style={{ width: "100%" }} value={editFormData?.name} onChange={(e) => setEditFormData({...editFormData!, name: e.target.value})} /></div>
                  <div><label style={labelStyle}>Grade</label><input className="student-input" style={{ width: "100%" }} value={editFormData?.grade} onChange={(e) => setEditFormData({...editFormData!, grade: e.target.value})} /></div>
                  <div><label style={labelStyle}>Need</label><input className="student-input" style={{ width: "100%" }} value={editFormData?.need} onChange={(e) => setEditFormData({...editFormData!, need: e.target.value})} /></div>
                  <div><label style={labelStyle}>Address</label><input className="student-input" style={{ width: "100%" }} value={editFormData?.address} onChange={(e) => setEditFormData({...editFormData!, address: e.target.value})} /></div>
                  <div><label style={labelStyle}>Guardian</label><input className="student-input" style={{ width: "100%" }} value={editFormData?.guardian} onChange={(e) => setEditFormData({...editFormData!, guardian: e.target.value})} /></div>
                  <div><label style={labelStyle}>Contact</label><input className="student-input" style={{ width: "100%" }} maxLength={11} value={editFormData?.contact} onChange={(e) => setEditFormData({...editFormData!, contact: e.target.value.replace(/\D/g, "")})} /></div>
                  
                  <div style={{ gridColumn: "span 2", display: "flex", gap: "12px", marginTop: "10px" }}>
                    <button onClick={saveEdit} className="btn-primary" style={{ flex: 1, background: "#10b981" }}>Save</button>
                    <button onClick={() => setEditingId(null)} className="logout-btn" style={{ flex: 1, background: "#64748b" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="user-info">
                    <span className="user-name" style={{ fontSize: "1.2rem", display: "block" }}>{student.name}</span>
                    <span className="user-email" style={{ fontSize: "0.9rem", display: "block" }}>Grade {student.grade} • {student.need}</span>
                    <div style={{ marginTop: "8px", fontSize: "0.8rem", color: "#64748b" }}>
                      <strong>Guardian:</strong> {student.guardian} | <strong>Contact:</strong> {student.contact}<br/>
                      <strong>Address:</strong> {student.address}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", zIndex: 10 }}>
                     <button onClick={() => startEdit(student)} className="btn-primary" style={{ background: "#3b82f6", width: 'auto', padding: '8px 20px' }}>Edit</button>
                     <button onClick={() => setStudents(students.filter(s => s.id !== student.id))} className="logout-btn" style={{ width: "auto", padding: '8px 20px' }}>Remove</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}