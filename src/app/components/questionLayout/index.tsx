import React,{ FC } from 'react';
interface Props {
  className: string;
}

const QuesstionLayout: FC<Props> = ({children, ...props}) => {
  return <div className={props.className} >
    {children}  
  </div>;
}

export default QuesstionLayout;
