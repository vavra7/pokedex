import { useQuery } from '@apollo/client';
import cn from 'classnames';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React from 'react';

import { pokemonByNameQuery } from '../../api/pokemon.gql';
import { useToggleFavoritePokemon } from '../../hooks/useToggleFavoritePokemon';
import {
  PokemonByNameQuery,
  PokemonByNameQueryVariables
} from '../../types/__generated__/pokemon.gql.types';
import { Col, Container, Row } from '../gridSystem';
import GridItem from './gridItem';
import styles from './pokemonDetail.module.scss';

const PokemonDetail: FC = () => {
  const { query, back } = useRouter();

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggleFavorite = useToggleFavoritePokemon();

  const { data } = useQuery<PokemonByNameQuery, PokemonByNameQueryVariables>(pokemonByNameQuery, {
    variables: {
      name: query.name as string
    }
  });

  const pokemon = data?.pokemonByName;

  return (
    <>
      <Container>
        {pokemon && (
          <article className={styles.article}>
            <div className={styles['image-container']}>
              <button onClick={back} className={cn('icon', 'fill', styles.back)}>
                arrow_back
              </button>
              <img src={pokemon.image} alt={pokemon.name} />
              <audio ref={audioRef} src={pokemon.sound} />
              <button
                onClick={() => audioRef.current?.play()}
                className={cn('icon', 'fill', styles.sound)}
              >
                volume_up
              </button>
            </div>
            <div className={styles.content1}>
              <h1 className={styles.name}>{pokemon.name}</h1>
              <span className={styles.types}>{pokemon.types.join(', ')}</span>
              <button
                onClick={() => toggleFavorite(pokemon.id, !pokemon.isFavorite)}
                className={cn('icon', { fill: pokemon.isFavorite }, styles.like)}
              >
                favorite
              </button>
              <div className={styles['cp-graph']}>
                <div className={cn(styles['graph-bg'], 'hp')}>
                  <div
                    className={cn(styles['graph-determinate'], 'hp')}
                    style={{ width: `${(pokemon.maxHP / 5000) * 100}%` }}
                  />
                </div>
              </div>
              <div className={cn(styles['cp-value'], 'cp')}>CP: {pokemon.maxCP}</div>
              <div className={styles['hp-graph']}>
                <div className={styles['graph-bg']}>
                  <div
                    className={cn(styles['graph-determinate'], 'cp')}
                    style={{ width: `${(pokemon.maxCP / 5000) * 100}%` }}
                  />
                </div>
              </div>
              <div className={styles['hp-value']}>HP: {pokemon.maxHP}</div>
            </div>
            <div className={styles.content2}>
              <div className={styles.left}>
                <div className={styles.title}>Weight</div>
                <div>
                  {pokemon.weight.minimum} - {pokemon.weight.maximum}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.title}>Height</div>
                <div>
                  {pokemon.height.minimum} - {pokemon.height.maximum}
                </div>
              </div>
            </div>
          </article>
        )}
      </Container>
      {pokemon?.evolutions.length ? (
        <Container>
          <Row>
            <Col sm={12}>
              <h2>Evolution</h2>
            </Col>
            {pokemon.evolutions.map(evolution => (
              <Col sm={12} md={6} lg={4} xl={3} key={evolution.id}>
                <GridItem
                  id={evolution.id}
                  image={evolution.image}
                  isFavorite={evolution.isFavorite}
                  name={evolution.name}
                />
              </Col>
            ))}
          </Row>
        </Container>
      ) : null}
    </>
  );
};

export default PokemonDetail;
