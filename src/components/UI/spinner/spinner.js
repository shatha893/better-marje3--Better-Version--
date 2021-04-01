import React from 'react';
import { css } from "@emotion/core";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const spinner = (props)=>(
    <ClimbingBoxLoader color={"#591CA8"} loading={props.loading} 
    css={css`display: block;
    margin:auto;
    padding:200px;
    width:100%;
    background-color:white`}
    size={15}/>
);

export default spinner;
