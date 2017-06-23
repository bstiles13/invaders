<template>
	<div class='collection-container'>
      <ul class="collection with-header">
        <li class="collection-header"><h4>Global Scores</h4></li>
        <li class="collection-columns collection-item">User<span class="secondary-content">Score</span></li>
        <li class="collection-item" v-for="score in globals"><div>{{score.user}}<a href="#!" class="secondary-content">{{score.score}}</a></div></li>
      </ul>

			<ul v-show="loggedIn" class="collection with-header">
        <li class="collection-header"><h4>Your Scores</h4></li>
        <li class="collection-columns collection-item">User<span class="secondary-content">Score</span></li>
        <li class="collection-item" v-for="score in personals"><div>{{score.user}}<a href="#!" class="secondary-content">{{score.score}}</a></div></li>
      </ul>

			<ul v-show="loggedIn" class="collection with-header">
        <li class="collection-header">
					<h4>Friends<br></h4><br><div class="new-friend"><input v-model="friend" placeholder="Add friend"><button class="grey darken-4" v-on:click="addFriend">Add</button></div>
				</li>
        <li class="collection-columns collection-item">User<span class="secondary-content">Score</span></li>
        <li class="collection-item" v-for="score in friends"><div>{{score.user}}<a href="#!" class="secondary-content">{{score.score}}</a></div></li>
      </ul>
	</div>
</template>

<script>
export default {
  name: 'scores',
  data() {
    return {
      globals: [{user: 'Joe', score: 700}, {user: 'Bob', score: 800}],
			personals: [{user: 'Me', score: 500}, {user: 'Me', score: 400}],
			friends: [],
      loggedIn: false,
			loggedUser: "",
			friend: ""
    }
  },
	created() {
  	this.fetchData();
	},
	mounted() {
    this.checkLogin(this.myScores, this.myFriends);
		// this.myScores();
	},
	methods: {
		fetchData() {
			var that = this;
			fetch('/getscores').then(function(response) {
				return response.json();
			}).then(function(myBlob) {
				that.globals = myBlob;
			});
		},
		checkLogin(func, func1) {
			var that = this;
			fetch("/confirm", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin" })
            .then(function(response) {
				return response.json();
			}).then(function(myBlob) {
                Object.keys(myBlob).length === 0 ? false : that.loggedIn = true;
                Object.keys(myBlob).length === 0 ? false : that.loggedUser = myBlob.username;
								func();
								func1();
			});
		},
		myScores() {
			var that = this;
			if (that.loggedIn) {
				console.log("LOGGED IN");
			fetch("/myscores", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin" })
			.then(function(response) {
				return response.json();
			}).then(function(myBlob) {
        console.log("SCORE CHECK: " + JSON.stringify(myBlob));
				that.personals = myBlob;
			});
			}
		},
		myFriends() {
			var that = this;
			if (that.loggedIn) {
			fetch("/myfriends", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin" })
			.then(function(response) {
				return response.json();
			}).then(function(myBlob) {
				console.log(myBlob);
				that.friends = myBlob;
			});
			}
		},
		addFriend() {
			var that = this;
			if (that.loggedIn) {
				console.log(that.friend);
				fetch("/addfriend", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", mode: 'cors',
					cache: 'default', body: JSON.stringify({ "friend": that.friend })
				}).then(function(response) {
					return response.json();
				}).then(function(myBlob) {
					that.myFriends();
				});
			}
		}
	}
}
</script>

<style>
	.collection-container {
		display: flex;
		align-items: flex-start;
		width: 90%;
		margin: 0 auto;
	}
	.collection {
		flex: 1;
		margin: 30px 10px;
	}
	.new-friend {
		display: flex;
		align-items: flex-start;
	}
	.new-friend button {
		margin-top: 10px;
	}
	.collection-columns {
		font-weight: bolder;
		color: black;
	}
</style>
