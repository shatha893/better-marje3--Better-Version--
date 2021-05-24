import React from 'react';
import noResultsSVG from '../../../../Assets/no_results.svg';
import classes from './noResults.module.css';

const noResults = (props)=>{
   return(
      <div className={props.isShown?classes.noResContainer:classes.hideNoResults}>
         <img 
         src={noResultsSVG} 
         alt="no results"
         className={classes.img}/>
         <p className={classes.noResultsText}> No Results to Show </p>
      </div> );
}

export default noResults;