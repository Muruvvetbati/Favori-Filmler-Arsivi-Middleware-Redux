import { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Movie from './components/Movie.jsx';
import FavMovie from './components/FavMovie.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { listeyeEkle, oncekiFilm, sonrakiFilm } from './store/actions/index.js';

function App() {
  const sira = useSelector((store) => store.sira);
  const favMovies = useSelector((store) => store.favMovies);
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  function oncekiFilmlerHandler() {
    dispatch(oncekiFilm());
  }

  function sonrakiFilmlerHandler() {
    dispatch(sonrakiFilm());
  }

  function listeyeEkleHandler() {
    dispatch(listeyeEkle());
  }

  return (
    <div className="wrapper max-w-2xl mx-auto">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Filmler
        </NavLink>
        <NavLink
          to="/listem"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Listem
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          {movies.length > 0 ? (
            <>
              <Movie sira={sira} />

              <div className="flex gap-3 justify-end py-3">
                {sira > 0 && (
                  <button
                    onClick={oncekiFilmlerHandler}
                    className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
                  >
                    Önceki
                  </button>
                )}
                {sira < movies.length - 1 && (
                  <button
                    onClick={sonrakiFilmlerHandler}
                    className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
                  >
                    Sıradaki
                  </button>
                )}

                <button
                  onClick={() => listeyeEkleHandler()}
                  className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
                >
                  Listeme ekle
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">Eklenecek yeni film bulunamadı...</div>
          )}
        </Route>

        <Route path="/listem">
          <div>
            {favMovies.map((movie) => (
              <FavMovie key={movie.id} title={movie.title} id={movie.id} />
            ))}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
