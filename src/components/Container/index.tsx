import { ReactNode } from 'react';

export const Container: React.FC<{ children?: ReactNode }> = ({ children = <></> }) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Container;
