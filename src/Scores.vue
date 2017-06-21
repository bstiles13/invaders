<template>
	<div>
      <ul class="collection with-header">
        <li class="collection-header"><h4>Global</h4></li>
        <li class="collection-item" v-for="score in globals"><div>{{score.user}}<a href="#!" class="secondary-content">{{score.score}}</a></div></li>
      </ul>

			<ul class="collection with-header">
        <li class="collection-item" v-for="score in personals"><div>{{score.user}}<a href="#!" class="secondary-content">{{score.score}}</a></div></li>
      </ul>

			<ul class="collection with-header">
        <li class="collection-header"><h4>Friends</h4></li>
        <li class="collection-item"><div>User1<a href="#!" class="secondary-content">Score</a></div></li>
        <li class="collection-item"><div>User2<a href="#!" class="secondary-content">Score</a></div></li>
        <li class="collection-item"><div>User3<a href="#!" class="secondary-content">Score</a></div></li>
        <li class="collection-item"><div>User4<a href="#!" class="secondary-content">Score</a></div></li>
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
			friends: []
    }
  },
	created() {
  	this.fetchData();
	},
	methods: {
		fetchData() {
				// this.globals = [{user: 'Bill', score: 100}, {user: 'Tom', score: 50}];
			var that = this;
			fetch('/getscores').then(function(response) {
				return response.json();
			}).then(function(myBlob) {
				that.globals = myBlob;
			});
		}
	}
}
</script>

<style>

</style>
