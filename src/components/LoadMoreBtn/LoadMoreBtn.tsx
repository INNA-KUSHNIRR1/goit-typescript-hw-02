import { FC } from 'react';
import style from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}
const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button type="submit" className={style.btn} onClick={onClick}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
