<script lang="ts">
    // import { user } from "$lib/stores/user.svelte";
    import { userProfileStore } from "$lib/stores/user";
	import { onMount } from "svelte";
    import { SocialAPI } from "$lib/api/social";
	import { profile } from "console";
	import { goto } from "$app/navigation";

    interface profileHeadProps {
        profileId: string;
        name: string;
        bio: string;
        profilePic: string;
    }

    interface profileUpdateRequest {
        ProfileID: string;
        Username: string;
        Bio: string | null;
        ProfilePictureURL: string | null;
        Visibility: string;
    }

    let profileData = $state({
        name: '',
        bio: '',
        profilePic: '',
        isFollowing: false,
    })

    let editing = $state(false);

    const profileProps: profileHeadProps = $props();
    
    let user = $state(userProfileStore.getProfile());


    let isOwner = $state(false);

    userProfileStore.subscribe((userProfile)=>{
        isOwner = userProfile.profileId === profileProps.profileId;
    })

    onMount(() => {
        user = userProfileStore.getProfile();
        profileData.name = profileProps.name;
        profileData.bio = profileProps.bio;
        profileData.profilePic = profileProps.profilePic;
    });

    const saveChanges = () => {
        if (user.displayName === '' || user.displayName === null || user.displayName === undefined)
        {
            console.error('Name cannot be empty');
            return;
        }

        if (user.profileId === '' || user.profileId === null || user.profileId === undefined)
        {
            console.error('Cannot find profileID');
            return;
        }

        const updateUserDataObject: profileUpdateRequest = {
            ProfileID: user.profileId,
            Username: user.displayName,
            Bio: user.bio,
            ProfilePictureURL: user.avatar,
            Visibility: 'public',
        }

        console.log(updateUserDataObject);

        SocialAPI.updateProfile(updateUserDataObject).then(() => {
            profileData.name = user.displayName ? user.displayName : profileData.name;
            profileData.bio = user.bio ? user.bio : profileData.bio;
            profileData.profilePic = user.avatar ? user.avatar : profileData.profilePic;
            userProfileStore.setProfile({
                userId: user.profileId,
                profileId: user.profileId,
                displayName: user.displayName,
                avatar: user.avatar,
                bio: user.bio,
            });
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            editing = !editing;
        });
    }

    const getFollowers = async () => {
        try{
            if(userProfileStore.getProfile().followingIDs === null || userProfileStore.getProfile().followingIDs === undefined)
            {
                profileData.isFollowing = false;
                return;
            }
            if(!userProfileStore){
                return;
            }
            userProfileStore.getProfile().followingIDs?.forEach((id) => {
                if(id === profileProps.profileId)
                {
                    profileData.isFollowing = true;
                }
            })
        }
        catch(error) {
            console.error(error);
        };
    }

    const followUser = async () => {
        profileData.isFollowing = true;
        SocialAPI.followUser(profileProps.profileId).then((res) => {
            if(res != null && res != undefined && res.error)
            {
                throw new Error(res.error);
            }
        }).catch((error) => {
            profileData.isFollowing = false;
            console.error(error);
        });
    }

    const unfollowUser = async () => {
        profileData.isFollowing = false;
        SocialAPI.unfollowUser(profileProps.profileId).then((res) => {
            if(res != null && res != undefined && res.error)
            {
                throw new Error(res.error);
            }
        }).catch((error) => {
            profileData.isFollowing = true;
            console.error(error);
        });
    }

    onMount(() => {
        getFollowers();
    });

</script>

<style>

</style>

<div class="profile-card w-full flex flex-row gap-10 border border-zinc-600 text-zinc-800 p-4 rounded-sm bg-zinc-300">
    <img class="profile-pic w-32 h-32 object-cover border rounded-sm" src={profileData.profilePic || 'default.jpg'} alt="{name}'s profile picture" />
    <div class="flex flex-col justify-between gap-4">
    {#if editing}
        <div class="flex flex-col">
            <h2 class="text-lg font-bold">Edit Profile</h2>
            <hr class="border-zinc-600" />
            <label for="name">
                Name:
                <input class="bg-white border p-0.5 w-full" type="text" bind:value={user.displayName} placeholder="Your name" />
            </label>
            
            <label for="bio">
                Bio:
                <input class="bg-white border p-0.5 w-full" type="text" bind:value={user.bio} placeholder="Bio" />
            </label>
            
            <label for="profilePic">
                Profile Picture URL:
                <input class="bg-white border p-0.5 w-full" type="url" bind:value={user.avatar} placeholder="Profile Picture URL" />
            </label>
            
        </div>
        <div>
          <button class="py-2 px-4 bg-emerald-700 text-zinc-100 hover:bg-emerald-800 cursor-pointer" onclick={saveChanges}>Save</button>
          <button class="py-2 px-4 bg-red-700 text-zinc-100 hover:bg-red-800 cursor-pointer" onclick={() => editing = !editing}>Cancel</button>
        </div>
    {:else}
        <div class="flex flex-col">
            <h2 class="text-3xl font-bold">{profileData.name}</h2>
            <p class="text-md text-zinc-600">{profileData.bio}</p>
        </div>
        {#if isOwner}
            <div>
                <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={() => editing = !editing}>Edit Profile</button>
                <!-- <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={() => console.log('Go to Settings')}>Settings</button> -->
            </div>
        {:else}
            <div>
                {#if profileData.isFollowing}
                    <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={unfollowUser}>Unfollow</button>
                {:else}
                    <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={followUser}>Follow</button>
                {/if}
                <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={()=>{goto(`/message/${profileProps.profileId}`)}}>Message</button>
            </div>
        {/if}
        <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={()=>{goto(`/profile/${profileProps.profileId}/following`)}}>Following</button>
        <button class="py-2 px-4 bg-amber-600 text-zinc-100 hover:bg-amber-700 cursor-pointer" onclick={()=>{goto(`/profile/${profileProps.profileId}/followers`)}}>Followers</button>
    {/if}
    </div>
  </div>