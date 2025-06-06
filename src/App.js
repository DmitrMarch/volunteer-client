import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  const fetchItems = async () => {
    const res = await fetch('http://localhost/api/items');
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', description: '' });
    fetchItems();
  };

  const updateItem = async (id) => {
    const name = prompt('Enter new name:');
    const description = prompt('Enter new description:');
    if (name && description) {
      await fetch(`http://localhost/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      fetchItems();
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await fetch(`http://localhost/api/items/${id}`, { method: 'DELETE' });
      fetchItems();
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Items</h1>
      {items.map(item => (
        <div key={item.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <strong>Name:</strong> {item.name}<br />
          <strong>Description:</strong> {item.description}
          <div style={{ marginTop: '5px' }}>
            <button onClick={() => updateItem(item.id)}>Update</button>
            <button onClick={() => deleteItem(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </div>
        </div>
      ))}

      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;