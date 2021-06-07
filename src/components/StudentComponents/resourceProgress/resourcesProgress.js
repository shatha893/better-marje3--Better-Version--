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
                {props.pendingResources.map(pendingResource=>{
                    return(
                        <Resource 
                        key={pendingResource.id}
                        Id={pendingResource.id}
                        handleRemoveResource={(key)=>props.handleRemoveResource(key)}
                        resourceName={pendingResource.name} 
                        className={classes.SingleResource}/>
                    );
                })}
               
               
            </div>
            <p className={classes.Subtitle}>already uploaded</p>
            <div>
            {props.uploadedResources.map(uploadedResource=>{
                    return(
                        <Resource 
                        key={uploadedResource.id}
                        handleRemoveResource={(key)=>props.handleRemoveResource(key)}
                        resourceName={uploadedResource.name} 
                        className={classes.SingleResource}/>
                    );
                })}
            </div>
        </div>
    );
}
export default resourcesProgress;
