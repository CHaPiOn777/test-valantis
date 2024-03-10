import { FC } from 'react';
import stylesLoader from './Loader.module.css';

type TLoader = {
  children: React.ReactNode;
  loader: boolean;
}
export const Loader: FC<TLoader> = ({ children, loader }) => {
  return (
    <>
     {
        !loader ?
          children :
          <div className={`${stylesLoader.loader}`}></div>
      }
    </>
  );
};
