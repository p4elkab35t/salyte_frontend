<script lang="ts">
    interface inputFieldProps {
        fieldName: string
        inputType: string
        inputValue?: string
    }
    let { fieldName, inputType, inputValue = $bindable() }: inputFieldProps = $props();
</script>

<style>

</style>

<div class="flex flex-col transition-all  justify-center text-amber-600 text-lg relative">
    <input bind:value={inputValue} type="{inputType}" id="{fieldName}" name="{fieldName}" class="transition-all peer border rounded-sm p-2 outline-none text-zinc-600 focus:text-amber-600 placeholder-shown:border-zinc-600 focus:border-amber-600 focus:placeholder-transparent" placeholder="{fieldName}" required>
    <label for="{fieldName}" class="transition-all peer-placeholder-shown:text-zinc-600 peer-placeholder-shown:translate-y-6 -top-4 peer-focus:-translate-0 -tranaslate-y-6 left-2 peer-focus:text-amber-600 text-zinc-600 bg-zinc-100 w-min absolute">{fieldName}</label>
</div>
