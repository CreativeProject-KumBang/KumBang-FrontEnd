import React, { useEffect, useState } from 'react';

const SkeletonBoardDetail = ({ type }) => {
    const classes = `skeleton ${type}`;
    return <div className={classes}></div>;
  };
  
  export default SkeletonBoardDetail;