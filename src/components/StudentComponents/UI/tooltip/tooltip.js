import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const tooltip = (props) =>{
   return(<OverlayTrigger
      key={'top'}
      placement={'top'}
      overlay={<Tooltip>
                  {props.tooltipText}
               </Tooltip>}>
      {props.children}
    </OverlayTrigger>);
}

export default tooltip;