<template>
      <nav>
        <div class="nav-wrapper grey darken-3">
            <a href="/" class="brand-logo center">INVADERS</a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                <li><a href="#" v-on:click="test" class='test'>test</a></li>
                <li><a href="/scores">Scores</a></li>
                <li><a href="/auth/facebook" class="waves-effect waves-light btn light-blue darken-3"><i class="material-icons left">person</i>Sign In</a></li>
            </ul>
            <ul class="side-nav" id="mobile-demo">
                <li><a href="/scores">Scores</a></li>
                <li><a href="/login">Sign In</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
      test: function(event) {
        event.preventDefault();
        fetch('/test').then(function(response) {
            return response.blob();
        }).then(function(myBlob) {
            console.log(myBlob);
        });
      }
  }
}
</script>

<style>

</style>
