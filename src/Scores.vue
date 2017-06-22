<template>
	<div class='collection-container'>
      <ul class="collection with-header">
        <li class="collection-header"><h4>Global</h4></li>
        <li class="collection-item" v-for="score in globals"><div>{{score.user}}<a href="#!" class="secondary-content">{{score.score}}</a></div></li>
      </ul>

			<ul v-show="loggedIn" class="collection with-header">
        <li class="collection-header"><h4>Your Scores</h4></li>
        <li class="collection-item" v-for="score in personals"><div>{{score.user}}<a href="#!" class="secondary-content">{{score.score}}</a></div></li>
      </ul>

			<ul v-show="loggedIn" class="collection with-header">
        <li class="collection-header">
					<h4>Friends<br></h4><br><input v-model="friend" placeholder="edit me"><button v-on:click="addFriend">Add</button>
				</li>
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
			fetch('/confirm').then(function(response) {
				return response.json();
			}).then(function(myBlob) {
								console.log('loggedin');
                Object.keys(myBlob).length === 0 ? false : that.loggedIn = true;
                Object.keys(myBlob).length === 0 ? false : that.loggedUser = myBlob.username;
								// console.log('logged user: ' + that.loggedUser);
								// console.log('BLOB: ' + JSON.stringify(myBlob.username));
								// console.log('BLOB: ' + JSON.stringify(myBlob));
								func();
								func1();
			});

		},
		myScores() {
			var that = this;
			if (that.loggedIn) {
			fetch('/myscores').then(function(response) {
				return response.json();
			}).then(function(myBlob) {
				console.log(myBlob);
				that.personals = myBlob;
			});
			}
		},
		myFriends() {
			var that = this;
			if (that.loggedIn) {
			fetch('/myfriends').then(function(response) {
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
				var myHeaders = new Headers();
				myHeaders.append('Content-Type', 'application/json');

				fetch("/addfriend", {
					method: "POST",
					headers: myHeaders,
					mode: 'cors',
					cache: 'default',
					body: JSON.stringify({ "friend": that.friend })
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
</style>
