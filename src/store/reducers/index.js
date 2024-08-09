import { movies } from '../../data';

import {
  LISTEDEN_CIKAR,
  LISTEYE_EKLE,
  ONCEKI_FILM,
  SONRAKI_FILM,
} from '../actions';

const initİalState = {
  movies: movies,
  sira: 0,
  favMovies: [],
};

export default function reducer(state = initİalState, action) {
  switch (action.type) {
    case SONRAKI_FILM:
      return { ...state, sira: state.sira + 1 };

    case ONCEKI_FILM:
      return { ...state, sira: state.sira - 1 };

    case LISTEYE_EKLE:
      const activeMovie = state.movies[state.sira];
      return {
        ...state,
        favMovies: [...state.favMovies, activeMovie],
        movies: state.movies.filter((m) => m.id !== activeMovie.id),
        sira:
          state.movies.length - state.sira === 1
            ? state.sira === 0
              ? 0
              : state.sira - 1
            : state.sira,
      };

    case LISTEDEN_CIKAR:
      return {
        ...state,
        favMovies: state.favMovies.filter((m) => m.id !== action.payload),
        movies: [
          ...state.movies,
          state.favMovies.find((m) => m.id === action.payload),
        ],
      };

    default:
      return state;
  }
}
