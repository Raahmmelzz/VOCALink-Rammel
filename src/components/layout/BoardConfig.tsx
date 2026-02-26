import React, { useState } from 'react';
import "../../styles/DashboardComponent.css";
interface Board {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
}

const BoardConfig: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, name: 'Food', status: 'Active' },
    { id: 2, name: 'Emotions', status: 'Inactive' }
  ]);
  const [newBoardName, setNewBoardName] = useState<string>('');

  const handleAddBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;

    const newBoard: Board = { id: Date.now(), name: newBoardName, status: 'Active' };
    setBoards([...boards, newBoard]);
    setNewBoardName(''); 
  };

  return (
    <div className="board-container">
      <h2 className="page-title">VocalInk Board Manager</h2>
      
      <form onSubmit={handleAddBoard} className="input-group">
        <input 
          type="text" 
          value={newBoardName} 
          onChange={(e) => setNewBoardName(e.target.value)} 
          placeholder="New Board Name..." 
          className="student-input"
        />
        <button type="submit" className="btn-primary">Add Board</button>
      </form>

      <ul className="student-list" style={{ marginTop: '20px' }}>
        {boards.map(board => (
          <li key={board.id} className="student-item">{board.name} ({board.status})</li>
        ))}
      </ul>
    </div>
  );
};

export default BoardConfig;