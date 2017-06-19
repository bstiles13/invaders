<template>
      <nav>
        <div class="nav-wrapper grey darken-3">
            <a href="#" class="brand-logo center">INVADERS</a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                <li><a href="#">Scores</a></li>
                <li><a href="#">Sign In</a></li>
            </ul>
            <ul class="side-nav" id="mobile-demo">
                <li><a href="#">Scores</a></li>
                <li><a href="#">Sign In</a></li>
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
  }
}
</script>

<style>

</style>
