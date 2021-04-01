import React from 'react';
import classes from './resource.module.css';

const resource = (props)=>{

    return(
        <div className={classes.Container}>
            <span>{props.resourceName}</span>
            <button className={classes.RemoveBtn}>REMOVE</button>
        </div>
    );

}
export default resource;
