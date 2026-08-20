import React from 'react'

export interface IconProps {
  className : string,
  Component : React.ComponentType | React.ReactElement | string | null,   
  src : string,         
  alt : string | null,
  size : number,
  color : string,
  ariaLabel : string,
  onClick : React.MouseEventHandler<HTMLSpanElement>,
} 