import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/usersSlice";

const UserDetails = ({ user }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', lastName: '', age: '', email: '' });

  // Если user обновился, обновляем локальный стейт
  useEffect(() => {
    if (user) {
      setForm({ name: user.name, lastName: user.lastName, age: user.age, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user) {
      dispatch(updateUser({ id: user.id, data: form }));
    }
  };

  if (!user) {
    return <div className="p-4 w-1/2">Выберите пользователя</div>; // Сообщение, если пользователя нет
  }

  return (
    <div className="p-4 w-1/2">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
        Сохранить
      </button>
    </div>
  );
};

export default UserDetails;

