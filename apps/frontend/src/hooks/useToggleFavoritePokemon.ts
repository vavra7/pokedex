import { useMutation } from '@apollo/client';

import { favoritePokemonMutation, unfavoritePokemonMutation } from '../api/pokemon.gql';
import {
  FavoritePokemonMutation,
  FavoritePokemonMutationVariables,
  UnfavoritePokemonMutation,
  UnfavoritePokemonMutationVariables
} from '../types/__generated__/pokemon.gql.types';
import { useToastNotification } from './useToasNotification';

type ToggleFavoritePokemonType = (id: string, setTo: boolean) => Promise<void>;

export function useToggleFavoritePokemon(): ToggleFavoritePokemonType {
  const { addNotification } = useToastNotification();

  const [sendFavorite] = useMutation<FavoritePokemonMutation, FavoritePokemonMutationVariables>(
    favoritePokemonMutation
  );

  const [sendUnfavorite] = useMutation<
    UnfavoritePokemonMutation,
    UnfavoritePokemonMutationVariables
  >(unfavoritePokemonMutation);

  const favoritePokemon: ToggleFavoritePokemonType = async (id, setTo) => {
    if (setTo) {
      await sendFavorite({
        variables: { id },
        optimisticResponse: {
          favoritePokemon: {
            __typename: 'Pokemon',
            id,
            isFavorite: true
          }
        },
        onCompleted: () => {
          addNotification({
            message: 'Pokemon added to favorites',
            type: 'success'
          });
        }
      });
    } else {
      await sendUnfavorite({
        variables: { id },
        optimisticResponse: {
          unFavoritePokemon: {
            __typename: 'Pokemon',
            id,
            isFavorite: false
          }
        },
        onCompleted: () => {
          addNotification({
            message: 'Pokemon removed from favorites',
            type: 'success'
          });
        }
      });
    }
  };

  return favoritePokemon;
}
