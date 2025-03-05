<script lang="ts">
    interface ButtonProps {
        buttonText: string,
        submitFunction: () => void
    }

    let { buttonText, submitFunction }: ButtonProps = $props();
</script>

<style>

</style>


<button class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded" onclick="{submitFunction}">
    {buttonText}
</button>