import style from './ImageCard.module.css';
import { FC } from 'react';

interface ImageCardProps {
  alt: string;
  srcSmall: string;
  likes: number;
  author: string;
  srcModal: string;
  onImageClick: (likes: number, author: string, srcModal: string) => void;
}
const ImageCard: FC<ImageCardProps> = ({
  likes,
  author,
  srcModal,
  alt,
  srcSmall,
  onImageClick,
}) => {
  return (
    <div className={style.card}>
      <img
        src={srcSmall}
        alt={alt}
        width="300"
        onClick={() => onImageClick(likes, author, srcModal)}
      />
    </div>
  );
};
export default ImageCard;
