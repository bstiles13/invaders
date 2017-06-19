<template>
  <div class='container'>
        <a class="play waves-effect waves-light btn-large"><i class="material-icons right">power_settings_new</i>Play</a>
        <div id="canvas"></div>
        <audio autoplay>
          <source src="./assets/javascript/resistance.mp3" type="audio/mpeg"> Your browser does not support the audio element.
        </audio>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style>

</style>
