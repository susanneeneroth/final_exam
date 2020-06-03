class Api {
  constructor(key) {
    this.key = key;
    this.baseUrl = 'https://api.themoviedb.org/3';
  }

  searchMovies(query, page = 1) {
    const queryString = this.queryString({
      query,
      page
    });
    const url = `${this.baseUrl}/search/movie?${queryString}`;

    return fetch(url).then(response => response.json());
  }

  getMovieDetails(id) {
    const queryString = this.queryString();
    const url = `${this.baseUrl}/movie/${id}?${queryString}`;

    return fetch(url).then(response => response.json());
  }

  getGenres() {
    const queryString = this.queryString();
    const url = `${this.baseUrl}/genre/movie/list?${queryString}`;

    return fetch(url).then(response => response.json());
  }

  queryString(obj = {}) {
    obj.api_key = this.key;
    obj.language = 'en-US';

    return Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&');
  }
}

const api = new Api('2f5c977f1fe4c5d58ff8c30431e6d7c8');


const movieComponent = {
  props: {
    summary: {
      default: {},
    },
  },

  data() {
    return {
      isLoading: false,
      detailsLoaded: false,
      details: {},
    };
  },

  computed: {
    description() {
      if (this.details.overview) {
        return this.details.overview;
      }

      return this.truncate(this.summary.overview);
    },

    posterImage() {
      return `http://image.tmdb.org/t/p/w185/${this.details.poster_path}`;
    },
  },

  methods: {
    loadDetails() {
      if (this.detailsLoaded) {
        return;
      }

      this.isLoading = true;

      api.getMovieDetails(this.summary.id)
        .then((response) => {
          this.isLoading = false;
          this.detailsLoaded = true;
          this.details = response;
        });
    },

    truncate(str, max = 150) {
      if (str.length <= max) {
        return str;
      }

      return `${str.substr(0, max)}...`;
    }
  },
};

new Vue({
  el: '.js-instance',
  name: 'vue-instance',

  components: {
    movieComponent,
  },

  data() {
    return {
      isLoading: false,

      query: '',
      page: 1,

      genres: {},

      movies: {
        results: [],
        total_pages: 0,
      },
    };
  },

  watch: {
    query() {
      if (this.query.length >= 2) {
        this.searchMovie();
      }
    },

    page() {
      this.searchMovie();
    },
  },

  created() {
    this.searchMovie = _.debounce(this.searchMovie, 500);
    this.getGenres();
  },

  methods: {

    getGenres() {
      this.isLoading = true;

      api.getGenres().then((result) => {
        this.isLoading = false;
        this.genres = result.genres.reduce((memo, genre) => {
          memo[genre.id] = genre.name;

          return memo;
        }, {});
      });
    },

    searchMovie() {
      this.isLoading = true;

      api.searchMovies(this.query, this.page)
        .then((response) => {
          this.isLoading = false;

          response.results.forEach((movie) => {
            movie.genres = movie.genre_ids.reduce((memo, genreId) => {
              memo.push({
                id: genreId,
                name: this.getGenreName(genreId)
              });

              return memo;
            }, []);
          });

          window.scrollTo(0, 0);
          this.movies = response;
        });
    },

    getGenreName(id) {
      const genre = this.genres[id];

      if (!genre) {
        return;
      }

      return genre;
    }
  },
});