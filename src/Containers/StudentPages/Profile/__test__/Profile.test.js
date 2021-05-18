import React from 'react';
import Profile from '../Profile';
import { render, screen } from '@testing-library/react';

it("Profile renders without crashing",()=>{
   const div = document.createElement('div');
   render(<Profile/>,div);
})