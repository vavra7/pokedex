import { useQuery } from '@apollo/client';
import cn from 'classnames';
import { FC, useState } from 'react';
import React from 'react';

import { pokemonByIdQuery } from '../../api/pokemon.gql';
import {
  PokemonByIdQuery,
  PokemonByIdQueryVariables
} from '../../types/__generated__/pokemon.gql.types';
import styles from './modalPreview.module.scss';

export interface ModalPreviewProps {
  id: string;
}

const ModalPreview: FC<ModalPreviewProps> = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { data } = useQuery<PokemonByIdQuery, PokemonByIdQueryVariables>(pokemonByIdQuery, {
    variables: {
      id
    }
  });

  const pokemon = data?.pokemonById;

  return (
    <>
      <button onClick={() => setOpen(true)} className={cn('icon', styles.button)}>
        preview
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} className={styles.overlay} />
          <div className={styles.modal}>
            {pokemon && (
              <div className={styles.grid}>
                <div className={styles.name}>{pokemon.name}</div>
                <div>Types:</div>
                <div>{pokemon.types.join(', ')}</div>
                <div>CP:</div>
                <div>{pokemon.maxCP}</div>
                <div>HP:</div>
                <div>{pokemon.maxHP}</div>
                <div>Weight:</div>
                <div>
                  {pokemon.weight.minimum} - {pokemon.weight.maximum}
                </div>
                <div>Height:</div>
                <div>
                  {pokemon.height.minimum} - {pokemon.height.maximum}
                </div>
              </div>
            )}
            <button onClick={() => setOpen(false)} className={cn('icon', styles.close)}>
              close
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ModalPreview;
