import React from 'react';
import Header from '../header';
import { render, screen } from '@testing-library/react';

it("Header renders without crashing",()=>{
   const div = document.createElement('div');
   render(<Header.WrappedComponent/>);
})