<script lang="ts">
    import { page } from "$app/state";
	interface NavItemProps {
		name: string;
		href: string;
        Svg: any;
	}

    // get second fref from url and compare with href

    let isActive = $state(false);
    
    let currentUrl = $derived(page.url.pathname.split('/')[1]);

	let { name, href, Svg }: NavItemProps = $props();

    $effect(()=>{
        isActive = `/${currentUrl}` === href;
    })
</script>

<style>
    :global(a>svg) {
        fill: #212121;
    }

    :global(svg) {
        width: 2rem;
        height: 2rem;
    }

    /* :global(a:hover > svg) {
        fill: #222277;
    }

    a:hover>p{
        color: #222277;
    } */
</style>

<li class="text-white py-6 px-2 p-0 text-center sm:w-max w-full flex flex-row h-full items-center justify-center hover:bg-zinc-500 hover:text-[#212121] {isActive?'bg-zinc-500 text-[#212121]':''}" >
    <a href={href} class="block text-xl text-[#212121] flex flex-row items-center justify-center px-2">
        <Svg />
	    <p class="sm:px-4 px-0 sm:block hidden">{name}</p>
    </a>
</li>
