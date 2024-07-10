import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='list-group'>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div key={id} className='list-group-item d-flex justify-content-between align-items-center'>
            {title}
            <div>
              <button
                type='button'
                className='btn btn-outline-success btn-sm mr-2'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='btn btn-outline-danger btn-sm'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
