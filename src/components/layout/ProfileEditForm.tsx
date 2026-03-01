import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileEditForm() {
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  
  
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    organization: user?.organization || "",
    bio: user?.bio || ""
  });

  const handleDiscard = () => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        organization: user.organization || "",
        bio: user.bio || ""
      });
      alert("Changes discarded!");
    }
  };
  // Reset form if external user state changes
  useEffect(() => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      organization: user?.organization || "",
      bio: user?.bio || ""
    });
  }, [user]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulated network sync
    setTimeout(() => {
      updateUser(formData);
      setIsSaving(false);
    }, 800);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={formData.username} 
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Organization / School</label>
        <input 
          type="text" 
          placeholder="e.g. Vocalink Learning Center"
          value={formData.organization} 
          onChange={(e) => setFormData({...formData, organization: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Professional Bio</label>
        <textarea 
          placeholder="Describe your focus in special education..."
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="secondary-btn" onClick={handleDiscard}>
  Discard
</button>
        <button type="submit" className="save-btn" disabled={isSaving}>
          {isSaving ? "Syncing..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}