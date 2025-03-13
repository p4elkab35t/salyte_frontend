<script lang="ts">
    interface chatCardProps {
        ID: string;
        Name: string;
        LastMessage?: string;
        LastMessageTime?: string;
        LastMessageAuthor?: string;
    }

    let { ID, Name, LastMessage, LastMessageTime, LastMessageAuthor }: chatCardProps = $props();
</script>

<style>

</style>

<a href={`/message/${ID}`} class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
    <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
        {Name.substring(0, 2).toUpperCase()}
    </div>
    <div class="ml-3 flex-1 overflow-hidden">
        <div class="flex justify-between items-center">
            <span class="font-medium text-gray-800">{Name}</span>
            {#if LastMessageTime}
                <span class="text-xs text-gray-500">{LastMessageTime}</span>
            {/if}
        </div>
        <div class="flex text-sm text-gray-500 truncate">
            {#if LastMessageAuthor}
                <span class="font-medium mr-1">{LastMessageAuthor}:</span>
            {/if}
            <span class="truncate">{LastMessage || 'No messages yet'}</span>
        </div>
    </div>
</a>
