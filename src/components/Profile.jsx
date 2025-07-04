import React, { useState } from "react";
import { useToast } from "./ToastProvider";


const mockUser = {
  name: "Jane Doe",
  email: "jane@example.com",
};

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(form);
    setEdit(false);
    setSuccess("Profile updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword("");
    setSuccess("Password changed successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        showToast("Profile picture updated!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Profile</h2>
      <div className="flex items-center mb-4">
        <img
          src={avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover border mr-4"
        />
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="block" />
      </div>
      {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
      {!edit ? (
        <div>
          <div className="mb-2"><span className="font-medium">Name:</span> {user.name}</div>
          <div className="mb-2"><span className="font-medium">Email:</span> {user.email}</div>
          <button onClick={() => setEdit(true)} className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input type="text" name="name" className="w-full border rounded px-3 py-2" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" name="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} required />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Save</button>
          <button type="button" onClick={() => setEdit(false)} className="ml-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
        </form>
      )}
      <form onSubmit={handlePasswordChange} className="mt-8 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Change Password</label>
          <input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" required />
        </div>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
