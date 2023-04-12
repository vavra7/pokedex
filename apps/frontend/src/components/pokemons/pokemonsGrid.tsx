import { FC } from 'react';
import React from 'react';

import { usePokemonGrid } from '../../hooks/usePokemonGrid';
import { Col, Container, Row } from '../gridSystem';
import GridItem from './gridItem';
import ListItem from './listItem';
import Pagination from './pagination';

const PokemonsGrid: FC = () => {
  const { pokemonConnection, filters, displayAsList } = usePokemonGrid();

  return (
    <Container>
      <Row>
        {pokemonConnection?.edges
          .filter(pokemon => (filters.isFavorite ? pokemon.isFavorite === true : true))
          .map(pokemon => {
            if (displayAsList) {
              return (
                <Col sm={12} key={pokemon.id}>
                  <ListItem pokemon={pokemon} />
                </Col>
              );
            } else {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={pokemon.id}>
                  <GridItem
                    id={pokemon.id}
                    image={pokemon.image}
                    isFavorite={pokemon.isFavorite}
                    name={pokemon.name}
                    types={pokemon.types}
                  />
                </Col>
              );
            }
          })}
      </Row>
      <Row>
        <Col sm={12}>
          <Pagination />
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonsGrid;
