// ClassCard.js
import React from 'react';
import { Button } from '@mui/material';
import { BsFillArchiveFill } from 'react-icons/bs';

const buttonStyle = {
  marginTop: '-20px',
  padding: '39px',
  '&:hover': {
    backgroundColor: '#45a049',
  },
};

const addButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#4CAF50',
  color: 'white',
};

const assignButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'darkmagenta',
  color: 'white',
  marginLeft: '-20px',
};

const ClassCard = ({ classCount, handleOpen }) => {
  return (
    <div className="flex-container">
      <div className='stucard'>
        <div className='card-inner'>
          <h3>CLASSES</h3>
          <BsFillArchiveFill className='card_icon' />
        </div>
        <h1>{classCount}</h1>
      </div>
      <div>
        <Button onClick={handleOpen} style={addButtonStyle}>
          <BsFillArchiveFill style={{ marginRight: '10px', fontSize: '1.5em', verticalAlign: 'middle' }} />
          Add New Class
        </Button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default ClassCard;
