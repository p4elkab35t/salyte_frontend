<script lang="ts">
	import Nav from '$lib/components/nav/nav.svelte';

	let { children } = $props();
</script>

<div class="w-full flex flex-col items-center bg-zinc-800 min-h-screen text-amber-600 relative overflow-hidden">
    <div class="top-[-50%] right-[-50%] w-full bg-zinc-400 z-0 h-0 sm:h-20"></div>
    <aside class="bg-zinc-400 fixed sm:top-0 sm:bottom-auto top-auto bottom-0 w-full z-10 max-h-20 xl:max-w-[1076px]">
        <Nav />
    </aside>
    <main class="lg:px-32 w-full xl:max-w-[1076px] py-10 text-zinc-100 h-full">
        {@render children()}
    </main>
    <footer class="bg-zinc-900 w-full text-zinc-100 pt-4 pb-3 mb-0 mt-auto">
        <p class="text-center text-zinc-100 text-xl">© 2025 Salyte / Designed By Pavel Fedorov</p>
    </footer>
</div>

<style>
</style>
