import React from 'react';
import Login from '../Login';
import { render, screen } from '@testing-library/react';

it("Header renders without crashing",()=>{
   const div = document.createElement('div');
   render(<Login.WrappedComponent/>,div);
})