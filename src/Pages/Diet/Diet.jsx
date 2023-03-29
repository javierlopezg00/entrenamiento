import './Diet.scss';
import React, { useState, useEffect } from 'react';
import DietBox from '../../Components/DietBox/DietBox';

export default function Diet() {


  return (
    <div className="dietContainer"> 
      <DietBox></DietBox>
    </div>
  );
}
