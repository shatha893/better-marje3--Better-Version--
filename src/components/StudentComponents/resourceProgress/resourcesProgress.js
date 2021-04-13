import React from 'react';
import classes from './resourcesProgress.module.css';
import Divider from '@material-ui/core/Divider';
import Resource from './resource/resource';

const resourcesProgress = (props) =>{
    return(
        <div className={classes.Content}>
            <p className={classes.Title}>{props.Title}</p>
            <Divider/>
            <p className={classes.Subtitle}>pending</p>
            <div>
               <Resource resourceName={"Calculus Exam"} className={classes.SingleResource}/> 
               <Resource resourceName={"Calculus Exam"} className={classes.SingleResource}/>
               <Resource resourceName={"Calculus Exam"} className={classes.SingleResource}/>
               <Resource resourceName={"Calculus Exam"} className={classes.SingleResource}/>
            </div>
            <p className={classes.Subtitle}>already uploaded</p>
            <div>
                <Resource resourceName={"C++ Exam"} className={classes.SingleResource}/> 
            </div>
        </div>
    );
}
export default resourcesProgress;
