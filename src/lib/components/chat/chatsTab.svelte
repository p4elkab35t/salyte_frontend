<script lang="ts">
    // name: "Bob Brown",
    //     profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
    //     profileID: "author3",
    //     lastMessage: {
    //         content: "I agree with your points.",
    //         timestamp: "2021-09-01T12:45:00Z"
    //     }

    interface ChatsTabProps {
        chats: {
            name: string;
            profilePic: string;
            profileID: string;
            lastMessage: {
                content: string;
                timestamp: string;
            }
            chatID: string;
        }[];
    }

    let { chats }: ChatsTabProps = $props();

</script>

<style>

</style>

<div class="-mt-8">
    {#if chats.length === 0}
    <div class="flex justify-between items-center p-2">
        <h1 class="text-5xl font-bold">No Chats Yet</h1>
        <!-- <button class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded cursor-pointer">New Chat</button> -->
    </div>
    {:else}
    <div class="flex justify-between items-center p-2">
        <h1 class="text-5xl font-bold">Chats</h1>
        <!-- <button class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded cursor-pointer">New Chat</button> -->
    </div>
    <div class="flex flex-col bg-zinc-100">
        {#each chats as chat (chat.chatID)}
        <a href="/message/{chat.chatID}">
            <div class="flex relative items-center justify-between gap-2 pl-2 pr-6 pb-2 pt-2 cursor-pointer hover:bg-zinc-200" >
                <div class="flex flex-row gap-2 max-w-full">
                    <img src={chat.profilePic} alt="profile-pic" class="w-14 h-14 rounded-sm bg-zinc-300" />
                    <!-- vertical line -->
                    <div class="w-0.5 h-14 bg-zinc-500"></div>

                    <div class="flex flex-col max-w-[65%] whitespace-nowrap overflow-hidden ">
                        <h2 class="text-zinc-900 text-lg font-bold">{chat.name}</h2>
                        <p class="text-zinc-700 whitespace-nowrap overflow-hidden ">{chat.lastMessage.content}</p>
                    </div>
                </div>
                <p class="text-zinc-600 absolute md:block hidden right-4">{chat.lastMessage.timestamp}</p>
            </div>
        </a>
        <hr class="border-zinc-600" />
        {/each}
    </div>
    {/if}
</div>