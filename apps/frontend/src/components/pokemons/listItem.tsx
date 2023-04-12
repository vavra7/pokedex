import cn from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

import { useToggleFavoritePokemon } from '../../hooks/useToggleFavoritePokemon';
import { PokemonFragment } from '../../types/__generated__/pokemon.gql.types';
import styles from './listItem.module.scss';
import ModalPreview from './modalPreview';

export interface ListItemProps {
  pokemon: PokemonFragment;
}

const ListItem: FC<ListItemProps> = ({ pokemon }) => {
  const toggleFavorite = useToggleFavoritePokemon();

  return (
    <article className={styles.self}>
      <div className={styles['image-container']}>
        <Link href={`/${pokemon.name.toLocaleLowerCase()}`}>
          <img src={pokemon.image} alt={pokemon.name} />
        </Link>
      </div>
      <div className={styles.content}>
        <Link className={styles.name} href={`/${pokemon.name.toLocaleLowerCase()}`}>
          <h2>{pokemon.name}</h2>
        </Link>
        <span className={styles.types}>{pokemon.types.join(', ')}</span>
        <div className={styles.modal}>
          <ModalPreview id={pokemon.id} />
        </div>
        <button
          onClick={() => toggleFavorite(pokemon.id, !pokemon.isFavorite)}
          className={cn('icon', { fill: pokemon.isFavorite }, styles.like)}
        >
          favorite
        </button>
      </div>
    </article>
  );
};

export default ListItem;
