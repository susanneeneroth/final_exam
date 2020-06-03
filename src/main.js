new Vue({
  el: "#myapp",
  data: {
    searchValue: '',
    posts: [],
    query: '',
    showModal: ''
  },

  computed: {
    getPopularMovies() {
      return this.posts.filter(posts => {
        return posts.title.toLowerCase().includes(this.searchValue.toLowerCase())
      })
    }
  },

  watch: {
    searchValue: function (value, oldValue) {
      console.log(value, oldValue);
    }
  },

  mounted: function () {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=2f5c977f1fe4c5d58ff8c30431e6d7c8")
      .then(response => response.json())
      .then(postResponse => {
        this.posts = postResponse.results;
      })
      .catch(error => console.log(error))
  }
});



// Tested solutions
// computed: {
//   // A computed property that holds only those data that match the searchString.
//   filteredData: function () {
//     var search_array = this.item,
//       searchString = this.searchString;

//     if (!searchString) {
//       return search_array;
//     }

//     searchString = searchString.trim().toLowerCase();

//     search_array = search_array.filter(item => {
//       if (post.name.toLowerCase().indexOf(searchString) !== -1) {
//         return item;
//       }
//     })

//     // Return an array with the filtered data.
//     return search_array;
//   }
// },

// computed: {
//   filteredMovies: function () {
//     return this.movies.filter((movie) => {
//       let lowerMovie = movie.toLowerCase();
//       let lowerSearchValue = this.searchValue.toLowerCase();
//       return lowerMovie.includes(lowerSearchValue);
//     });
//   }
// },

// methods: {
//   getPopularMovies() {
//     fetch("https://api.themoviedb.org/3/movie/popular?api_key=2f5c977f1fe4c5d58ff8c30431e6d7c8")
//       .then(response => response.json())
//       .then(res => {
//         if (this.searchValue) {
//           this.posts = res.results.filter(posts =>
//             posts.name.toLowerCase().includes(this.searchValue.toLowerCase())
//           );
//         } else {
//           this.posts = res.results;
//         }
//       });
//   }
// },