<script lang="ts">
	import type { Snippet } from "svelte";

    interface inputFormProps {
        children: Snippet
        formLabel: string
        isSubmitting?: boolean
    }

    let { children, formLabel, isSubmitting = $bindable() }: inputFormProps = $props();
</script>

<style>
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
    .animate-pulse {
        animation: pulse 1.3s infinite;
    }
</style>

<div class="flex flex-col items-center justify-center md:-translate-y-6 md:justify-between md:pt-7 md:p-7 lg:p-15 bg-zinc-100 md:rounded-2xl rounded-none w-screen h-screen md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[400px] {isSubmitting ? 'animate-pulse' : ''}">
    <h2 class="text-amber-600 text-2xl lg:text-3xl font-bold -translate-y-12 md:-translate-y-4 lg:-translate-y-8">
        {formLabel}
    </h2>
    <form class="flex flex-col items-center justify-center gap-6 -translate-y-1">
        {@render children?.()}
    </form>
</div>
