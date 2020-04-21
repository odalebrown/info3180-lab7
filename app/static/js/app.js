/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <a class="navbar-brand" href="#">VueJS App</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">News</a>
                  </li>
                </ul>
              </div>
            </nav>
        </header>
    `,
    data: function() {
      return {};
    }
});
/* New list Component */
Vue.component('news-list', {
template: `
    <div>
       <div class = "news">
            <h2 News </h2>
            <ul class = "news__list">
              <li v-for="article in articles"class="news__item">
                {{ article.title }}
                {{article.description}}
                <img :src = "article.urlToImage">
              </li>
            </ul>
        </div>
      <div class="form-inline d-flex justify-content-center">
            <div class="form-group mx-sm-3 mb-2">
                <label class="sr-only" for="search">Search</label>
                <input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
                <p>You are searching for {{ searchTerm }}</p>
                <button class="btn btn-primary mb-2" @click="searchNews">Search</button>
             </div>
      </div>
    </div>
    `,
    created: function(){
        let self = this;
        fetch('http://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=92b0ce3b21e94a5e9c5b005ba5c6a517')
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            self.articles = data.articles;
        });
    },
    data: function()
    {
        return {
            articles:[],
            searchTerm: ''
        }
    },
    methods: {
        searchNews: function() {
            let self = this;
            fetch('https://newsapi.org/v2/everything?q='+self.searchTerm + '&language=en&apiKey=<api-key>')
            .then(function(response) {
                return response.json();
             })
             .then(function(data) {
                 console.log(data);
                     self.articles = data.articles;
            });
        }
    }
});
Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        welcome: 'Hello World! Welcome to VueJS'
    }
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here

        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});