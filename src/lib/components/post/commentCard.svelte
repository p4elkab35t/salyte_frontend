<script lang="ts">
    import { SocialAPI } from '$lib/api/social';
    import ProfileCard from '../profile/profileCard.micro.svelte';
    import type { profileProps } from '../profile/profileCard.micro.svelte';

    export interface CommentCardProps {
        authorID: string;
        timestamp: string;
        content: string;
        commentID: string;
    }

    const getAuthor = async (profileId: string) => {
        return SocialAPI.getProfile('profile', profileId);
    }

    const { authorID, timestamp, content, commentID }: CommentCardProps = $props();
</script>

<style>
    .comment-card {
        background-color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 0.5rem;
        border: 1px solid #e5e7eb;
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .comment-content {
        color: #374151;
    }

    .comment-timestamp {
        color: #6b7280;
        font-size: 0.875rem;
    }
</style>

<div class="comment-card" id="comment{commentID}">
    <!-- Comment Header -->
    <div class="comment-header">
        {#await getAuthor(authorID)}
            <h1>Loading...</h1>
        {:then author}
            <ProfileCard name={author.Username} profilePic={author.ProfilePictureURL} profileID={author.ProfileID} bio={author.Bio} />
        {/await}
        <span class="comment-timestamp">{timestamp}</span>
    </div>

    <!-- Comment Content -->
    <div class="comment-content">
        <p>{content}</p>
    </div>
</div>