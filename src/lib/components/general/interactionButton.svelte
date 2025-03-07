<script lang="ts">
	interface InteractionButtonProps {
		buttonText: string;
		submitFunction: () => void;
	}

	let { buttonText, submitFunction }: InteractionButtonProps = $props();
</script>

<button
	class="bg-amber-500 hover:bg-amber-600 text-white font-normal md:min-w-26 py-2 px-4 rounded-sm"
	onclick={submitFunction}
>
	{buttonText}
</button>
