<template>
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper grey darken-3">
            <a href="/" class="brand-logo center">INVADERS</a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                <li><a href="/scores">Scores</a></li>
                <li>
                    <a v-if="loggedIn" href="/logout" class="waves-effect waves-light btn light-blue darken-3"><i class="material-icons left">person</i>Log Out</a>
                    <a v-else href="/auth/facebook" class="waves-effect waves-light btn light-blue darken-3"><i class="material-icons left">person</i>Sign In</a>
                </li>
            </ul>
            <ul class="side-nav" id="mobile-demo">
                <li><a href="/scores">Scores</a></li>
                <li><a href="/login">Sign In</a></li>
            </ul>
        </div>
    </nav>
    </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      loggedIn: false
    }
  },
  created () {
      this.checkLogin();
  },
    methods: {
		checkLogin() {
				// this.globals = [{user: 'Bill', score: 100}, {user: 'Tom', score: 50}];
			var that = this;
			fetch('/confirm').then(function(response) {
				return response.json();
			}).then(function(myBlob) {
                // console.log(myBlob);
                // console.log(loggedIn);
                Object.keys(myBlob).length === 0 ? false : that.loggedIn = true;
				// that.loggedIn = true;
			});
		}
	}
}
</script>

<style>

</style>
