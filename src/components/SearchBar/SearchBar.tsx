import clsx from 'clsx';
import style from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { ChangeEvent, FC, FormEvent } from 'react';

interface SearchBarProps {
  submit: (textInput: string) => void;
  isBtnDisabled: boolean;
  setIsBtnDisabled: (isBtnDisabled: boolean) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  submit,
  isBtnDisabled,
  setIsBtnDisabled,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const textInput = (
      form.elements.namedItem('text') as HTMLInputElement
    ).value.trim();

    if (textInput === '') {
      toast('Please, write the text for the search images', {
        duration: 4000,
        position: 'top-center',
        style: {
          color: 'rgb(189, 187, 187)',
          backgroundColor: 'rgba(146, 148, 248, 0.4)',
          borderRadius: '0px',
        },
      });
      return;
    }

    submit(textInput);
    form.reset();
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    text !== '' && setIsBtnDisabled(false);
  };

  return (
    <header className={style.header}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="text"
          onInput={handleInput}
        />
        <button
          className={clsx(isBtnDisabled ? style.btnDisabled : style.btn)}
          type="submit"
          disabled={isBtnDisabled}
        >
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};
export default SearchBar;
