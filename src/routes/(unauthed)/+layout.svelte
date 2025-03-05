<script>
    let { children } = $props();
</script>

<style>
    .bg-gradient-radial {
        background: radial-gradient(circle, #d9770630 0%, transparent 60%);
    }
</style>

<div class="h-screen bg-gradient-to-br from-gray-900 to-zinc-800 relative overflow-hidden flex flex-col items-center justify-center text-amber-600">
    <!-- Gradient overlay element -->
    <div class="absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-radial z-0"></div>
    {@render children()}
</div>