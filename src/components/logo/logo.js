import React from 'react';
import lightBulbLogo from '../../Assets/light_bulb_logo.png';
import classes from './logo.module.css';

const logo = ()=>(
    <div className={classes.Logo}>
        <img src={lightBulbLogo} alt="Light Bulb Logo"/>
    </div>
);

export default logo;