<script>
	import InputField from '$lib/components/login/inputField.svelte';
	import InputForm from '$lib/components/login/inputForm.svelte';
	import Button from '$lib/components/general/button.svelte';
	import { AuthAPI } from '$lib/api/auth';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	let email = $state('');
	let password = $state('');
	let isSubmitting = $state(false);

	const submit = async () => {
		isSubmitting = true;
		AuthAPI.login({email, password}).then((response) => {
			console.log(response);
			isSubmitting = false;
			return response;
		}).then((response) => {
			if(response.token && response.user_id)authStore.setAuth(response.token, response.user_id);
			goto('/feed')
		});
		console.log(email, password);
	};
</script>

<div class="felx self-center content-center place-self-center">
	<InputForm formLabel="Sign In" bind:isSubmitting>
		<InputField fieldName="email" inputType="email" bind:inputValue={email} />
		<InputField fieldName="password" inputType="password" bind:inputValue={password} />
		<Button buttonText="Sign In" submitFunction={submit} />
		<a
			href="/signup"
			class="text-amber-600 hover:text-amber-700 hover:underline p-8 -translate-y-9 lg:-translate-y-7"
			>I am a new user here</a
		>
	</InputForm>
</div>

<style>
	/* Add your global styles here */
</style>
