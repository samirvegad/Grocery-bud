import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <div className={`alert alert-${type} text-center`} role='alert'>
      {msg}
    </div>
  );
};

export default Alert;
