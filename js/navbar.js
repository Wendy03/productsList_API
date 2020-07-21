export default {
  template: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      	<a class="navbar-brand" href="#top">Coffee</a>
      	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      	<span class="navbar-toggler-icon"></span>
      	</button>
      	<div class="collapse navbar-collapse" id="navbarSupportedContent">
      		<ul class="navbar-nav mr-auto">
      			<li class="nav-item">
      				<a class="nav-link" href="#">Home</a>
      			</li>
      			<li class="nav-item">
      				<a class="nav-link" href="#">商品 </a>
      			</li>
      			<li class="nav-item">
      				<a class="nav-link" href="#">活動</a>
      			</li>
      		</ul>
      		<ul class="navbar-nav">
      			<li class="nav-item">
      				<a class="btn btn-outline-light btn-block" href="#" @click.prevent="signout">登出</a>
      			</li>
      		</ul>
      	</div>
      </nav>`,
  methods: {
    signout() {
      localStorage.removeItem('token');
      // document.cookie = `hexToken=; expires=; path=/`;
      window.location = 'index.html';
    },
  },
};
