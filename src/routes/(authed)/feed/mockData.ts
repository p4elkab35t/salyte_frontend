import type { PostCardProps } from "$lib/components/post/postCard.svelte";

const mockPosts: PostCardProps[] = [
    {
        timestamp: "2021-09-01T12:00:00Z",
        title: "Post 1",
        content: "This is the content of post 1",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "John Doe",
            bio: "A passionate writer and tech enthusiast.",
            profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
            profileID: "123456789"
        },
        commentsNumber: 5,
        postId: "1",
        lastComment: {
            author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter1"
            },
            content: "Great post! I really enjoyed reading it.",
            timestamp: "2021-09-01T12:30:00Z"
        }
    },
    {
        timestamp: "2021-09-01T12:00:00Z",
        title: "Post 1",
        content: "This is the content of post 1",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "John Doe",
            bio: "Tech blogger and developer.",
            profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
            profileID: "author2"
        },
        commentsNumber: 5,
        postId: "1",
        lastComment: {
            author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter2"
            },
            content: "Interesting perspective. Thanks for sharing!",
            timestamp: "2021-09-01T12:45:00Z"
        }
    },
    {
        timestamp: "2021-09-01T12:00:00Z",
        title: "Post 1",
        content: "This is the content of post 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "John Doe",
            bio: "Software engineer and tech enthusiast.",
            profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
            profileID: "author3"
        },
        commentsNumber: 5,
        postId: "1",
        lastComment: {
            author: {
                name: "Charlie Davis",
                profilePic: "https://randomuser.me/api/portraits/men/77.jpg",
                profileID: "commenter3"
            },
            content: "This is a very detailed post. Well done!",
            timestamp: "2021-09-01T13:00:00Z"
        }
    },
    {
        timestamp: "2021-09-02T14:00:00Z",
        title: "Post 2",
        content: "This is the content of post 2",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Jane Smith",
            bio: "UX designer and creative thinker.",
            profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
            profileID: "author4"
        },
        commentsNumber: 10,
        postId: "2",
        lastComment: {
            author: {
                name: "Diana Evans",
                profilePic: "https://randomuser.me/api/portraits/women/77.jpg",
                profileID: "commenter4"
            },
            content: "I agree with your points. Keep it up!",
            timestamp: "2021-09-02T14:30:00Z"
        }
    },
    {
        timestamp: "2021-09-03T16:00:00Z",
        title: "Post 3",
        content: "This is the content of post 3",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Alice Johnson",
            bio: "Data scientist and AI researcher.",
            profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
            profileID: "author5"
        },
        commentsNumber: 8,
        postId: "3",
        lastComment: {
            author: {
                name: "Evan Foster",
                profilePic: "https://randomuser.me/api/portraits/men/88.jpg",
                profileID: "commenter5"
            },
            content: "This is very insightful. Thanks for sharing!",
            timestamp: "2021-09-03T16:30:00Z"
        }
    },
    {
        timestamp: "2021-09-04T18:00:00Z",
        title: "Post 4",
        content: "This is the content of post 4",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Bob Brown",
            bio: "Product manager with 10 years experience.",
            profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
            profileID: "author6"
        },
        commentsNumber: 12,
        postId: "4",
        lastComment: {
            author: {
                name: "Fiona Green",
                profilePic: "https://randomuser.me/api/portraits/women/99.jpg",
                profileID: "commenter6"
            },
            content: "Great insights! Looking forward to more posts.",
            timestamp: "2021-09-04T18:30:00Z"
        }
    },
    {
        timestamp: "2021-09-05T20:00:00Z",
        title: "Post 5",
        content: "This is the content of post 5",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Charlie Davis",
            bio: "DevOps engineer and cloud specialist.",
            profilePic: "https://randomuser.me/api/portraits/men/77.jpg",
            profileID: "author7"
        },
        commentsNumber: 15,
        postId: "5",
        lastComment: {
            author: {
                name: "George Harris",
                profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
                profileID: "commenter7"
            },
            content: "This is very helpful. Thanks!",
            timestamp: "2021-09-05T20:30:00Z"
        }
    },
    {
        timestamp: "2021-09-06T22:00:00Z",
        title: "Post 6",
        content: "This is the content of post 6",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Diana Evans",
            bio: "Frontend developer and UI specialist.",
            profilePic: "https://randomuser.me/api/portraits/women/77.jpg",
            profileID: "author8"
        },
        commentsNumber: 18,
        postId: "6",
        lastComment: {
            author: {
                name: "Hannah Irving",
                profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
                profileID: "commenter8"
            },
            content: "I learned a lot from this post. Thank you!",
            timestamp: "2021-09-06T22:30:00Z"
        }
    },
    {
        timestamp: "2021-09-07T10:00:00Z",
        title: "Post 7",
        content: "This is the content of post 7",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Evan Foster",
            bio: "Mobile app developer and tech writer.",
            profilePic: "https://randomuser.me/api/portraits/men/88.jpg",
            profileID: "author9"
        },
        commentsNumber: 0,
        postId: "7",
    },
    {
        timestamp: "2021-09-08T12:00:00Z",
        title: "Post 8",
        content: "This is the content of post 8",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Fiona Green",
            bio: "Cybersecurity expert and speaker.",
            profilePic: "https://randomuser.me/api/portraits/women/99.jpg",
            profileID: "author10"
        },
        commentsNumber: 22,
        postId: "8",
        lastComment: {
            author: {
                name: "John Doe",
                profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
                profileID: "commenter10"
            },
            content: "This is very informative. Thanks for sharing!",
            timestamp: "2021-09-08T12:30:00Z"
        }
    },
    {
        timestamp: "2021-09-09T14:00:00Z",
        title: "Post 9",
        content: "This is the content of post 9",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "George Harris",
            bio: "Blockchain developer and crypto enthusiast.",
            profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
            profileID: "author11"
        },
        commentsNumber: 25,
        postId: "9",
        lastComment: {
            author: {
                name: "Jane Smith",
                profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
                profileID: "commenter11"
            },
            content: "This is a great read. Keep it up!",
            timestamp: "2021-09-09T14:30:00Z"
        }
    },
    {
        timestamp: "2021-09-10T16:00:00Z",
        title: "Post 10",
        content: "This is the content of post 10",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Hannah Irving",
            bio: "Game designer and 3D artist.",
            profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
            profileID: "author12"
        },
        commentsNumber: 28,
        postId: "10",
        lastComment: {
            author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter12"
            },
            content: "This is very well written. Thanks!",
            timestamp: "2021-09-10T16:30:00Z"
        }
    },
    {
        timestamp: "2021-09-11T18:00:00Z",
        title: "Post 11",
        content: "This is the content of post 11",
        reaction: {
            isLiked: Math.random() < 0.5,
            count: Math.floor(Math.random() * 100)
        },
        author: {
            name: "Ian Jackson",
            bio: "Backend developer and system architect.",
            profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
            profileID: "author13"
        },
        commentsNumber: 30,
        postId: "11",
        lastComment: {
            author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            },
            content: "This is a great post. Keep up the good work!",
            timestamp: "2021-09-11T18:30:00Z"
        }
    }
];

export default mockPosts;


export const mockComments = [
    {
        postId: "1",
        comments: [
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "Great post! I really enjoyed reading it.", timestamp: "2021-09-01T12:30:00Z" },
            { author: {
                name: "Ian Jackson",
                bio: "Backend developer and system architect.",
                profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
                profileID: "author13"
            }, content: "Interesting perspective. Thanks for sharing!", timestamp: "2021-09-01T12:45:00Z" },
            { author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter12"
            }, content: "This is a very detailed post. Well done!", timestamp: "2021-09-01T13:00:00Z" },
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "Great post! I really enjoyed reading it.", timestamp: "2021-09-01T12:30:00Z" },
            { author: {
                name: "Ian Jackson",
                bio: "Backend developer and system architect.",
                profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
                profileID: "author13"
            }, content: "Interesting perspective. Thanks for sharing!", timestamp: "2021-09-01T12:45:00Z" },
            { author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter12"
            }, content: "This is a very detailed post. Well done!", timestamp: "2021-09-01T13:00:00Z" },
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "Great post! I really enjoyed reading it.", timestamp: "2021-09-01T12:30:00Z" },
            { author: {
                name: "Ian Jackson",
                bio: "Backend developer and system architect.",
                profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
                profileID: "author13"
            }, content: "Interesting perspective. Thanks for sharing!", timestamp: "2021-09-01T12:45:00Z" },
            { author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter12"
            }, content: "This is a very detailed post. Well done!", timestamp: "2021-09-01T13:00:00Z" },
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "Great post! I really enjoyed reading it.", timestamp: "2021-09-01T12:30:00Z" },
            { author: {
                name: "Ian Jackson",
                bio: "Backend developer and system architect.",
                profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
                profileID: "author13"
            }, content: "Interesting perspective. Thanks for sharing!", timestamp: "2021-09-01T12:45:00Z" },
            { author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter12"
            }, content: "This is a very detailed post. Well done!", timestamp: "2021-09-01T13:00:00Z" },
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "Great post! I really enjoyed reading it.", timestamp: "2021-09-01T12:30:00Z" },
            { author: {
                name: "Ian Jackson",
                bio: "Backend developer and system architect.",
                profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
                profileID: "author13"
            }, content: "Interesting perspective. Thanks for sharing!", timestamp: "2021-09-01T12:45:00Z" },
            { author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter12"
            }, content: "This is a very detailed post. Well done!", timestamp: "2021-09-01T13:00:00Z" },
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "Great post! I really enjoyed reading it.", timestamp: "2021-09-01T12:30:00Z" },
            { author: {
                name: "Ian Jackson",
                bio: "Backend developer and system architect.",
                profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
                profileID: "author13"
            }, content: "Interesting perspective. Thanks for sharing!", timestamp: "2021-09-01T12:45:00Z" },
            { author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter12"
            }, content: "This is a very detailed post. Well done!", timestamp: "2021-09-01T13:00:00Z" },
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "Great post! I really enjoyed reading it.", timestamp: "2021-09-01T12:30:00Z" },
            { author: {
                name: "Ian Jackson",
                bio: "Backend developer and system architect.",
                profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
                profileID: "author13"
            }, content: "Interesting perspective. Thanks for sharing!", timestamp: "2021-09-01T12:45:00Z" },
            { author: {
                name: "Alice Johnson",
                profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
                profileID: "commenter12"
            }, content: "This is a very detailed post. Well done!", timestamp: "2021-09-01T13:00:00Z" },
        ]
    },
    {
        postId: "2",
        comments: [
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "I agree with your points. Keep it up!", timestamp: "2021-09-02T14:30:00Z" },
            { author: {
                name: "Bob Brown",
                profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
                profileID: "commenter13"
            }, content: "This is very insightful. Thanks for sharing!", timestamp: "2021-09-03T16:30:00Z" }
        ]},
]