import { FC } from 'react';
import { Image } from '../../types';
import ImageCard from '../ImageCard/ImageCard';
import style from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (likes: number, author: string, srcModal: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={style.gallery}>
      {images.map(image => {
        return (
          <li className={style.card} key={image.id}>
            <ImageCard
              likes={image.likes}
              author={image.user.name}
              srcModal={image.urls.regular}
              alt={image.alt_description}
              srcSmall={image.urls.small}
              onImageClick={onImageClick}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ImageGallery;
