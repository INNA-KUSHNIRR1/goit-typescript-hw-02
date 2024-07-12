export interface Image {
  id: string;
  likes: number;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
  user: { name: string };
}
export interface ImageModalProps {
  isOpen: boolean;
  likes: number|null;
  author: string|null;
  srcModal: string|null;
  closeModal: () => void;
}
