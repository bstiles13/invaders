<template>
  <div class='contact'>
			<h2>Leave a Message:</h2>
			<div class="field">
				<label class="label">Name</label>
				<p class="control has-icons-left">
					<input class="input" type="text" placeholder="Your Name">
					<span class="icon is-small is-left">
					<i class="fa fa-user-circle-o"></i>
					</span>
				</p>
				</div>

				<div class="field">
				<label class="label">Email</label>
				<p class="control has-icons-left">
					<input class="input" type="text" placeholder="Email input" value="hello@">
					<span class="icon is-small is-left">
					<i class="fa fa-envelope"></i>
					</span>
				</p>
				<!--<p class="help is-danger">This email is invalid</p>-->
				</div>

				<div class="field">
				<label class="label">Subject</label>
				<p class="control has-icons-left">
					<input class="input" type="text" placeholder="Subject">
					<span class="icon is-small is-left">
					<i class="fa fa-file-text"></i>
					</span>
				</p>
				</div>

				<div class="field">
				<label class="label">Message</label>
				<p class="control">
					<textarea class="textarea" placeholder="Your message"></textarea>
				</p>
				</div>

				<div class="field is-grouped">
				<p class="control">
					<button class="button submit">Submit</button>
				</p>
			</div>
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
