import cn from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

import { useToggleFavoritePokemon } from '../../hooks/useToggleFavoritePokemon';
import styles from './gridItem.module.scss';
import ModalPreview from './modalPreview';

export interface GridItemProps {
  id: string;
  name: string;
  image: string;
  isFavorite: boolean;
  types?: string[];
}

const GridItem: FC<GridItemProps> = ({ name, image, id, isFavorite, types }) => {
  const toggleFavorite = useToggleFavoritePokemon();

  return (
    <article className={cn('pokemon-card', styles.self)}>
      <div className={styles['image-container']}>
        <Link href={`/${name.toLocaleLowerCase()}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className={styles.content}>
        <Link className={styles.name} href={`/${name.toLocaleLowerCase()}`}>
          <h2>{name}</h2>
        </Link>
        {types?.length && <span className={styles.types}>{types.join(', ')}</span>}
        <div className={styles.modal}>
          <ModalPreview id={id} />
        </div>
        <button
          onClick={() => toggleFavorite(id, !isFavorite)}
          className={cn('icon', { fill: isFavorite }, styles.like)}
        >
          favorite
        </button>
      </div>
    </article>
  );
};

export default GridItem;
