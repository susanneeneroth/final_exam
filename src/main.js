new Vue({

  el: "#myapp",
  data: {
    apiKey: '2f5c977f1fe4c5d58ff8c30431e6d7c8',
    searchValue: '',
    posts: [],
    page: 2
  },



  // methods: {
  //   showInfo: function (name) {
  //     console.log(name);
  //   }
  // },

  mounted: function () {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=2f5c977f1fe4c5d58ff8c30431e6d7c8")
      .then(response => response.json())
      .then(postResponse => {
        this.posts = postResponse.results;
      })
  }
})