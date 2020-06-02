new Vue({

  el: "#myapp",
  data: {
    apiKey: '2f5c977f1fe4c5d58ff8c30431e6d7c8',
    searchValue: '',
    posts: [],
    page: 2,
  },

  // computed: {
  //   filteredMovies: function () {
  //     return this.movies.filter((movie) => {
  //       let lowerMovie = movie.toLowerCase();
  //       let lowerSearchValue = this.searchValue.toLowerCase();
  //       return lowerMovie.includes(lowerSearchValue);
  //     });
  //   }
  // },



  watch: {
    searchValue: function (value, oldValue) {
      console.log(value, oldValue);
    }
  },

  methods: {
    getPopularMovies() {
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=2f5c977f1fe4c5d58ff8c30431e6d7c8")
        .then(response => response.json())
        .then(res => {
          if (this.searchValue) {
            this.posts = res.results.filter(posts =>
              posts.name.toLowerCase().includes(this.searchValue.toLowerCase())
            );
          } else {
            this.posts = res.results;
          }
        });
    }
  },
  created() {
    this.getPopularMovies();
  },

  // computed: {
  //   getPopularMovies() {
  //     return this.posts.filter(posts => {
  //       return posts.title.toLowerCase().includes(this.searchValue.toLowerCase())
  //     })
  //   }
  // }

  // mounted: function () {
  //   fetch("https://api.themoviedb.org/3/movie/popular?api_key=2f5c977f1fe4c5d58ff8c30431e6d7c8")
  //     .then(response => response.json())
  //     .then(postResponse => {
  //       this.posts = postResponse.results;
  //     })
  //     .catch(error => console.log(error))
  // }
})