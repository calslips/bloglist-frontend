import React from 'react';

const Notification = ({ notice }) => {
  if (notice === null) {
    return null;
  }

  let noticeStyle;

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  notice.error
    ? noticeStyle = error
    : noticeStyle = success;

  return <div style={noticeStyle}>{notice.message}</div>;
};

export default Notification;