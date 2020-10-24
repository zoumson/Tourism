import React from 'react';
import './Tag.css';

export default function Tag(props) {
  /* Attributes */
  const { tag } = props;
  /* Custom styling */
  const style = {
    container: {
      padding: '1px',
      marginLeft: '5px',
      borderRadius: '10px',
      borderStyle: 'solid',
      borderColor: '#28b0dc',
      borderWidth: '1px',
      color: '#28b0dc',
      cursor: 'default',
      height: '20px',
    },
  };
  return (
    <div className="tag-container" style={style.container}>
      <div>{tag}</div>
    </div>
  );
}
