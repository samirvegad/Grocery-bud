import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'Please enter a value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Value changed');
    } else {
      showAlert(true, 'success', 'Item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form className='card card-body' onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
            <h3 className='text-center'>Grocery Bud</h3>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                placeholder='e.g. eggs'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className='input-group-append'>
                <button type='submit' className='btn btn-primary'>
                  {isEditing ? 'Edit' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
          {list.length > 0 && (
            <div className='card card-body mt-3'>
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button className='btn btn-danger mt-3' onClick={clearList}>
                Clear Items
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
