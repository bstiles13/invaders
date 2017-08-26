<template>
  <div class='container'>
        <div class="start card grey darken-4">
          <div class="card-content white-text">
            <span class="card-title">HOW TO PLAY:</span>
            <p>USE ARROW KEYS TO MOVE</p>
            <p>USE SPACEBAR TO SHOOT</p>
          </div>
          <div class="card-action">
            <a class="play waves-effect waves-light btn-large red darken-3"><i class="material-icons right">power_settings_new</i>Play</a>
          </div>
        </div>
        <div id="canvas"></div>
        <ul class="results collection with-header">
          <li class="collection-header grey darken-4"><h4>Game Over</h4></li>
          <li v-show="submitted != true" class="collection-item grey darken-3"><span>Score: {{score}}</span></li>
          <li v-if="loggedIn" class="collection-item grey darken-3">
            <a v-if="submitted" class="submit-score waves-effect waves-light btn blue darken-4 disabled">Submitted</a>
            <a v-else v-on:click="submit" class="submit-score waves-effect waves-light btn blue darken-4">Submit Score</a>
          </li>
          <li v-else class="collection-item grey darken-3"><a href="/auth/facebook" class="waves-effect waves-light btn blue darken-4">Log In & Submit</a></li>          
          <li class="collection-item grey darken-3"><a href='/' class="play again waves-effect waves-light btn blue darken-4">Play Again</a></li>         
          <li class="collection-item grey darken-3"><router-link to="/scores" class="see-scores waves-effect waves-light btn blue darken-4">Scores</router-link></li>
        </ul>
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
      loggedIn: false,
      score: 0,
      submitted: false
    }
  },
  created () {
      this.checkLogin();
      this.checkScore();
  },
    methods: {
		checkLogin() {
			var that = this;
			fetch("/confirm", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin" })
      .then(function(response) {
				return response.json();
			}).then(function(myBlob) {
        console.log("HOME CHECK: " + JSON.stringify(myBlob));
        Object.keys(myBlob).length === 0 ? false : that.loggedIn = true;
			});
		},
    checkScore() {
      var that = this;
      setInterval(function() {
        that.score = localStorage.getItem("score");
      }, 200);
    },
    submit() {
      var that = this;
      var latestScore = localStorage.getItem("score");
      fetch("/submit", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", mode: 'cors',
        cache: 'default', body: JSON.stringify({ "score": latestScore })
      }).then(function(response) {
				return response.json();
			}).then(function(myBlob) {
        console.log("success");
        localStorage.setItem("score", 0);
        that.submitted = true;
			});
    }
	}
}
</script>

<style scoped>
  .results {
      /*border: none;*/
      position: absolute;
      margin: 0 auto;
      margin-top: 100px;
  }
  .collection-item {
    text-align: center;
  }
  .collection-item a {
    width: 100;
  }
  .collection-item span {
    color: white;
  }
  .collection-header {
    color: white;
  }
  .start {
    min-width: 300px;
    text-align: center;
    border: 1px solid ivory;
  }
</style>
