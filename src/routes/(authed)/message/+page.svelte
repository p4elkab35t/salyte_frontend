<script lang="ts">
    import ChatsTab from "$lib/components/chat/chatsTab.svelte";
    import { chats } from "../feed/mockData";

</script>

<style>

</style>

<div>
    <ChatsTab chats={chats}/>
</div>