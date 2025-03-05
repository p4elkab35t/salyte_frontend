<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';


	let { children } = $props();

    let path = $state("");

    onNavigate((onNavigate) => {
        if(onNavigate.type === "link"){
            if(onNavigate.to?.route.id === path){
                return;
            }
            if(!onNavigate.to){
                return;
            }
            if(!onNavigate.to?.route.id){
                return;
            }
            path = onNavigate.to.route.id;
        }

    });
</script>

<style>
    @media (min-width: 640px){
        .flip-animated{
        animation: flip 0.18s forwards ease-in-out ;
    }
    }
    
    @keyframes flip {
        0% {
            transform: rotateY(0deg);
        }
        50% {
            transform: rotateY(90deg);
        }
        100% {
            transform: rotateY(0deg);
        }
    }

</style>

<main class="min-w-screen min-h-svh flex flex-col  text-white">
    <header class="header md:p-8 top-4 bg-transparent md:text-white text-amber-600 p-0 fixed w-screen md:relative md:w-full">
        <h1 class="text-4xl font-bold text-center">
            Salyte
        </h1>
    </header>
    {#key path}
        <section class="flip-animated content w-full flex-grow md:px-8 md:py-4 p-0 content-center">
            {@render children()}
        </section>
    {/key}
    <footer class="footer md:mb-10 bg-transparent md:text-white bottom-4 text-amber-600 fixed w-screen md:relative md:w-full">
        <p class="text-center">
            &copy; 2025 Salyte <br/> Designed By Pavel Fedorov
        </p>
    </footer>
</main>