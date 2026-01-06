// Posts Module
const postsModule = (() => {
    // Sample posts data (would be fetched from server in a real app)
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || generateSamplePosts();
    
    // DOM Elements
    const featuredPostsGrid = document.getElementById('featured-posts-grid');
    const recentPostsList = document.getElementById('recent-posts-list');
    const createPostLink = document.getElementById('create-post-link');
    const createPostModal = document.getElementById('create-post-modal');
    const closeCreatePost = document.getElementById('close-create-post');
    const createPostForm = document.getElementById('create-post-form');
    const postDetailSection = document.getElementById('post-detail-section');
    const postDetailContent = document.getElementById('post-detail-content');
    const backToPostsBtn = document.getElementById('back-to-posts');
    const commentsList = document.getElementById('comments-list');
    const commentFormContainer = document.getElementById('comment-form-container');
    const myPostsSection = document.getElementById('my-posts-section');
    const myPostsList = document.getElementById('my-posts-list');
    const myPostsLink = document.getElementById('my-posts-link');
    const homeSection = document.getElementById('home-section');
    const featuredPostsSection = document.getElementById('featured-posts');
    const recentPostsSection = document.getElementById('recent-posts');
    
    // Initialize posts
    const init = () => {
        // Save sample posts to localStorage if none exist
        if (!localStorage.getItem('blogPosts')) {
            localStorage.setItem('blogPosts', JSON.stringify(posts));
        }
        
        bindEvents();
        displayFeaturedPosts();
        displayRecentPosts();
    };
    
    // Bind event listeners
    const bindEvents = () => {
        // Create post events
        if (createPostLink) {
            createPostLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (!auth.isLoggedIn()) {
                    alert('Please log in to create a post');
                    return;
                }
                createPostModal.style.display = 'flex';
            });
        }
        
        if (closeCreatePost) {
            closeCreatePost.addEventListener('click', () => {
                createPostModal.style.display = 'none';
                createPostForm.reset();
            });
        }
        
        if (createPostForm) {
            createPostForm.addEventListener('submit', handleCreatePost);
        }
        
        // Back to posts button
        if (backToPostsBtn) {
            backToPostsBtn.addEventListener('click', () => {
                hidePostDetail();
            });
        }
        
        // My posts link
        if (myPostsLink) {
            myPostsLink.addEventListener('click', (e) => {
                e.preventDefault();
                showMyPosts();
            });
        }
        
        // Auth state changes
        document.addEventListener('userLoggedIn', () => {
            // Refresh posts view when user logs in
            displayFeaturedPosts();
            displayRecentPosts();
        });
        
        document.addEventListener('userLoggedOut', () => {
            // Hide my posts section on logout
            if (myPostsSection) {
                myPostsSection.style.display = 'none';
            }
            
            // Go back to home if viewing post detail
            if (postDetailSection.style.display !== 'none') {
                hidePostDetail();
            }
            
            // Refresh posts view
            displayFeaturedPosts();
            displayRecentPosts();
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === createPostModal) {
                createPostModal.style.display = 'none';
            }
        });
    };
    
    // Generate sample posts for initial data
    function generateSamplePosts() {
        const samplePosts = [
            {
                id: '1',
                title: 'Getting Started with Web Development',
                content: 'Web development is an exciting field that combines creativity with technical skills. In this post, we\'ll explore the basics of HTML, CSS, and JavaScript and how they work together to create modern websites.\n\nHTML (HyperText Markup Language) provides the structure of a webpage. It uses tags to define elements like headings, paragraphs, images, and links. CSS (Cascading Style Sheets) is used for styling and layout. It determines how HTML elements appear on screen. JavaScript adds interactivity to websites, allowing for features like form validation, animations, and dynamic content updates.\n\nTo get started with web development, you\'ll need a text editor and a web browser. Popular text editors include Visual Studio Code, Sublime Text, and Atom. As you progress, you might want to learn about frameworks like React, Angular, or Vue.js, which simplify the development of complex web applications.',
                excerpt: 'Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.',
                category: 'technology',
                author: {
                    id: 'admin1',
                    username: 'TechGuru',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                },
                createdAt: '2025-02-15T14:22:00Z',
                updatedAt: null,
                imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
                comments: [
                    {
                        id: 'c1',
                        author: {
                            id: 'user1',
                            username: 'CodeNewbie',
                            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                        },
                        content: 'This is exactly what I needed to get started! Thanks for the clear explanation.',
                        createdAt: '2025-02-16T09:30:00Z',
                        likes: 5
                    }
                ],
                likes: 24,
                views: 152,
                featured: true
            },
            {
                id: '2',
                title: 'The Art of Travel Photography',
                content: 'Travel photography is about capturing the essence of a place through its landscapes, people, and culture. Whether you\'re using a professional DSLR camera or just your smartphone, these tips will help you take better travel photos.\n\nFirst, always be prepared. Keep your camera accessible and fully charged. Consider the lighting conditions - early morning and late afternoon offer the best natural light, known as "golden hour." When composing your shots, use the rule of thirds for balanced and interesting images. Include local people when appropriate (always ask for permission first) to add human interest and scale to your photos.\n\nDon\'t just photograph the obvious landmarks. Look for unique details, local markets, and everyday scenes that capture the authentic character of your destination. Finally, edit your photos thoughtfully to enhance their impact without making them look artificial.',
                excerpt: 'Improve your travel photography skills with these practical tips and creative approaches.',
                category: 'travel',
                author: {
                    id: 'admin2',
                    username: 'WorldExplorer',
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
                },
                createdAt: '2025-02-10T10:15:00Z',
                updatedAt: null,
                imageUrl: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552',
                comments: [],
                likes: 37,
                views: 215,
                featured: true
            },
            {
                id: '3',
                title: 'Healthy Eating on a Budget',
                content: 'Eating healthy doesn\'t have to break the bank. With some planning and smart shopping strategies, you can maintain a nutritious diet while keeping your food expenses in check.\n\nStart by planning your meals for the week and making a shopping list to avoid impulse purchases. Buy seasonal fruits and vegetables, as they\'re typically less expensive and at their nutritional peak. Consider frozen fruits and vegetables too - they\'re frozen at peak ripeness and often cheaper than fresh options.\n\nBuy grains, nuts, and beans in bulk, and opt for cheaper protein sources like eggs, canned tuna, and legumes instead of always choosing meat. Cook from scratch rather than buying processed foods, and don\'t be afraid to use leftovers creatively. Finally, grow your own herbs on a windowsill to save money and add fresh flavors to your meals.',
                excerpt: 'Discover practical strategies for eating nutritious meals without spending a fortune.',
                category: 'food',
                author: {
                    id: 'admin3',
                    username: 'NutritionPro',
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
                },
                createdAt: '2025-02-05T16:40:00Z',
                updatedAt: null,
                imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af',
                comments: [
                    {
                        id: 'c2',
                        author: {
                            id: 'user2',
                            username: 'BudgetChef',
                            avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
                        },
                        content: 'These are great tips! I\'d also recommend checking out local farmers markets near closing time for discounts.',
                        createdAt: '2025-02-06T14:20:00Z',
                        likes: 8
                    },
                    {
                        id: 'c3',
                        author: {
                            id: 'user3',
                            username: 'HealthyStudent',
                            avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
                        },
                        content: 'As a college student, I found this really helpful. Any specific meal prep ideas you could share?',
                        createdAt: '2025-02-08T19:15:00Z',
                        likes: 3
                    }
                ],
                likes: 42,
                views: 310,
                featured: false
            },
            {
                id: '4',
                title: 'Mindfulness Practices for Busy People',
                content: 'In today\'s fast-paced world, finding time for mindfulness can seem impossible. However, even brief moments of mindful awareness can reduce stress and improve mental clarity.\n\nStart with "micro-practices" throughout your day. For example, take three conscious breaths before checking your phone in the morning or while waiting for the elevator. Practice mindful eating by savoring one meal a day without distractions. Use daily activities like showering or walking as opportunities for mindfulness by fully focusing on the sensory experience.\n\nTry the "3-3-3" technique when feeling overwhelmed: name three things you can see, three things you can hear, and move three parts of your body. This quickly grounds you in the present moment. Additionally, use smartphone apps for short guided meditations during breaks. Remember, consistency matters more than duration - even one minute of mindfulness practice can make a difference when done regularly.',
                excerpt: 'Incorporate mindfulness into your busy schedule with these simple, effective techniques.',
                category: 'health',
                author: {
                    id: 'admin4',
                    username: 'MindfulLiving',
                    avatar: 'https://randomuser.me/api/portraits/women/95.jpg'
                },
                createdAt: '2025-01-28T08:50:00Z',
                updatedAt: null,
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
                comments: [],
                likes: 56,
                views: 423,
                featured: true
            },
            {
                id: '5',
                title: 'Understanding Cryptocurrency Basics',
                content: 'Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on decentralized networks based on blockchain technology. Unlike traditional currencies issued by governments, cryptocurrencies typically operate independently of a central authority.\n\nBitcoin, created in 2009, was the first cryptocurrency and remains the most well-known. Since then, thousands of alternative cryptocurrencies have been created, each with varying features and purposes. Some popular ones include Ethereum, which introduces smart contracts, and Solana, known for its high transaction speeds.\n\nThe blockchain is the underlying technology that powers cryptocurrencies. It\'s essentially a distributed digital ledger that records all transactions across a network of computers. This technology makes cryptocurrencies transparent and resistant to data modification.\n\nCryptocurrencies can be acquired through exchanges, where you can buy them using traditional currency, or through "mining," a process where computers solve complex mathematical problems to validate transactions and earn new coins. However, investing in cryptocurrency comes with risks due to their price volatility and evolving regulatory landscape.',
                excerpt: 'Learn the fundamental concepts of cryptocurrency and blockchain technology.',
                category: 'technology',
                author: {
                    id: 'admin1',
                    username: 'TechGuru',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                },
                createdAt: '2025-01-20T11:30:00Z',
                updatedAt: null,
                imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
                comments: [
                    {
                        id: 'c4',
                        author: {
                            id: 'user4',
                            username: 'CryptoEnthusiast',
                            avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
                        },
                        content: 'Great overview! I think it\'s also worth mentioning the difference between proof of work and proof of stake consensus mechanisms.',
                        createdAt: '2025-01-21T16:45:00Z',
                        likes: 12
                    }
                ],
                likes: 29,
                views: 275,
                featured: false
            }
        ];
        
        return samplePosts;
    }
    
    // Display featured posts in grid
    const displayFeaturedPosts = () => {
        if (!featuredPostsGrid) return;
        
        const featuredPosts = posts.filter(post => post.featured);
        
        if (featuredPosts.length === 0) {
            featuredPostsGrid.innerHTML = '<div class="featured-post-placeholder"><p>No featured posts yet.</p></div>';
            return;
        }
        
        let html = '';
        
        featuredPosts.forEach(post => {
            html += `
                <div class="post-card" data-post-id="${post.id}">
                    <div class="post-card-image">
                        <img src="${post.imageUrl}" alt="${post.title}">
                    </div>
                    <div class="post-card-content">
                        <div class="post-category">${post.category}</div>
                        <h3 class="post-card-title">${post.title}</h3>
                        <p class="post-card-excerpt">${post.excerpt}</p>
                        <div class="post-card-meta">
                            <div class="post-author">
                                <img src="${post.author.avatar}" alt="${post.author.username}">
                                <span>${post.author.username}</span>
                            </div>
                            <div class="post-stats">
                                <div class="post-likes"><i class="far fa-heart"></i> ${post.likes}</div>
                                <div class="post-comments"><i class="far fa-comment"></i> ${post.comments.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        featuredPostsGrid.innerHTML = html;
        
        // Add click event to post cards
        const postCards = featuredPostsGrid.querySelectorAll('.post-card');
        postCards.forEach(card => {
            card.addEventListener('click', () => {
                const postId = card.dataset.postId;
                showPostDetail(postId);
            });
        });
    };
    
    // Display recent posts in list
    const displayRecentPosts = () => {
        if (!recentPostsList) return;
        
        // Sort posts by date (newest first)
        const sortedPosts = [...posts].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        if (sortedPosts.length === 0) {
            recentPostsList.innerHTML = '<div class="post-placeholder"><p>No posts yet.</p></div>';
            return;
        }
        
        let html = '';
        
        // Take the first 5 most recent posts
        sortedPosts.slice(0, 5).forEach(post => {
            html += `
                <div class="post-list-item" data-post-id="${post.id}">
                    <div class="post-list-image">
                        <img src="${post.imageUrl}" alt="${post.title}">
                    </div>
                    <div class="post-list-content">
                        <div class="post-category">${post.category}</div>
                        <h3 class="post-list-title">${post.title}</h3>
                        <p class="post-list-excerpt">${post.excerpt}</p>
                        <div class="post-card-meta">
                            <div class="post-author">
                                <img src="${post.author.avatar}" alt="${post.author.username}">
                                <span>${post.author.username}</span>
                            </div>
                            <div class="post-stats">
                                <div class="post-likes"><i class="far fa-heart"></i> ${post.likes}</div>
                                <div class="post-comments"><i class="far fa-comment"></i> ${post.comments.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        recentPostsList.innerHTML = html;
        
        // Add click event to post list items
        const postItems = recentPostsList.querySelectorAll('.post-list-item');
        postItems.forEach(item => {
            item.addEventListener('click', () => {
                const postId = item.dataset.postId;
                showPostDetail(postId);
            });
        });
    };
    
    // Display user's own posts
    const showMyPosts = () => {
        if (!myPostsSection || !myPostsList) return;
        
        const currentUser = auth.getCurrentUser();
        if (!currentUser) {
            alert('Please log in to view your posts');
            return;
        }
        
        // Filter posts by current user
        const userPosts = posts.filter(post => post.author.id === currentUser.id);
        
        // Hide other sections
        homeSection.style.display = 'none';
        featuredPostsSection.style.display = 'none';
        recentPostsSection.style.display = 'none';
        postDetailSection.style.display = 'none';
        
        // Show my posts section
        myPostsSection.style.display = 'block';
        
        if (userPosts.length === 0) {
            myPostsList.innerHTML = `
                <div class="post-placeholder">
                    <p>You haven't created any posts yet.</p>
                    <button id="create-first-post" class="btn btn-primary" style="margin-top: 15px;">Create Your First Post</button>
                </div>
            `;
            
            // Add event listener to the create first post button
            const createFirstPostBtn = document.getElementById('create-first-post');
            if (createFirstPostBtn) {
                createFirstPostBtn.addEventListener('click', () => {
                    createPostModal.style.display = 'flex';
                });
            }
            
            return;
        }
        
        let html = '';
        
        userPosts.forEach(post => {
            html += `
                <div class="post-list-item" data-post-id="${post.id}">
                    <div class="post-list-image">
                        <img src="${post.imageUrl}" alt="${post.title}">
                    </div>
                    <div class="post-list-content">
                        <div class="post-category">${post.category}</div>
                        <h3 class="post-list-title">${post.title}</h3>
                        <p class="post-list-excerpt">${post.excerpt}</p>
                        <div class="post-card-meta">
                            <div class="post-stats">
                                <div class="post-likes"><i class="far fa-heart"></i> ${post.likes}</div>
                                <div class="post-comments"><i class="far fa-comment"></i> ${post.comments.length}</div>
                                <div class="post-views"><i class="far fa-eye"></i> ${post.views}</div>
                            </div>
                            <div class="post-actions">
                                <button class="btn btn-outline btn-sm edit-post-btn" data-post-id="${post.id}">Edit</button>
                                <button class="btn btn-outline btn-sm delete-post-btn" data-post-id="${post.id}">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        myPostsList.innerHTML = html;
        
        // Add click events to post items and buttons
        const postItems = myPostsList.querySelectorAll('.post-list-item');
        postItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Don't navigate to post detail if clicked on a button
                if (e.target.closest('.post-actions')) {
                    return;
                }
                
                const postId = item.dataset.postId;
                showPostDetail(postId);
            });
        });
        
        // Add event listeners to edit and delete buttons
        const editButtons = myPostsList.querySelectorAll('.edit-post-btn');
        const deleteButtons = myPostsList.querySelectorAll('.delete-post-btn');
        
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const postId = button.dataset.postId;
                editPost(postId);
            });
        });
        
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const postId = button.dataset.postId;
                if (confirm('Are you sure you want to delete this post?')) {
                    deletePost(postId);
                }
            });
        });
    };
    
    // Display full post details
    const showPostDetail = (postId) => {
        if (!postDetailSection || !postDetailContent) return;
        
        const post = posts.find(p => p.id === postId);
        if (!post) {
            alert('Post not found');
            return;
        }
        
        // Format the date
        const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Increment view count
        post.views++;
        savePosts();
        
        // Hide other sections
        homeSection.style.display = 'none';
        featuredPostsSection.style.display = 'none';
        recentPostsSection.style.display = 'none';
        myPostsSection.style.display = 'none';
        
        // Show post detail section
        postDetailSection.style.display = 'block';
        
        // Generate HTML for post content
        postDetailContent.innerHTML = `
            <div class="post-header">
                <h1 class="post-title">${post.title}</h1>
                <div class="post-meta">
                    <div class="post-category"><i class="fas fa-tag"></i> ${post.category}</div>
                    <div class="post-date"><i class="far fa-calendar"></i> ${postDate}</div>
                    <div class="post-views"><i class="far fa-eye"></i> ${post.views} views</div>
                </div>
                <div class="post-author-info">
                    <div class="post-author-avatar">
                        <img src="${post.author.avatar}" alt="${post.author.username}">
                    </div>
                    <div>
                        <div class="post-author-name">By ${post.author.username}</div>
                    </div>
                </div>
            </div>
            <div class="post-featured-image">
                <img src="${post.imageUrl}" alt="${post.title}">
            </div>
            <div class="post-content">
                ${formatPostContent(post.content)}
            </div>
            <div class="post-actions">
                <button class="like-post-btn" data-post-id="${post.id}">
                    <i class="far fa-heart"></i> Like (${post.likes})
                </button>
                <button class="share-post-btn" data-post-id="${post.id}">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        `;
        
        // Display comments
        displayComments(post);
        
        // Add event listeners to buttons
        const likeButton = postDetailContent.querySelector('.like-post-btn');
        const shareButton = postDetailContent.querySelector('.share-post-btn');
        
        likeButton.addEventListener('click', () => {
            if (!auth.isLoggedIn()) {
                alert('Please log in to like posts');
                return;
            }
            
            post.likes++;
            likeButton.innerHTML = `<i class="fas fa-heart"></i> Like (${post.likes})`;
            likeButton.classList.add('liked');
            savePosts();
        });
        
        shareButton.addEventListener('click', () => {
            // In a real app, you would implement social sharing functionality
            alert('Share functionality would be implemented here');
        });
    };
    
    // Format post content with proper paragraphs
    const formatPostContent = (content) => {
        return content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
    };
    
    // Display comments for a post
    const displayComments = (post) => {
        if (!commentsList || !commentFormContainer) return;
        
        // Show comment form if user is logged in
        if (auth.isLoggedIn()) {
            const currentUser = auth.getCurrentUser();
            commentFormContainer.innerHTML = `
                <form id="comment-form">
                    <div class="comment-input-container">
                        <img src="${currentUser.avatar || 'assets/default-avatar.png'}" alt="${currentUser.username}" class="comment-avatar">
                        <textarea id="comment-text" placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Post Comment</button>
                </form>
            `;
            
            // Add event listener to comment form
            const commentForm = document.getElementById('comment-form');
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const commentText = document.getElementById('comment-text').value;
                addComment(post.id, commentText);
                commentForm.reset();
            });
        } else {
            commentFormContainer.innerHTML = `
                <p>Please <a href="#" id="login-to-comment">log in</a> to leave a comment.</p>
            `;
            
            // Add event listener to login link
            const loginLink = document.getElementById('login-to-comment');
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('login-btn').click();
            });
        }
        
        // Display existing comments
        if (post.comments.length === 0) {
            commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            return;
        }
        
        let html = '';
        
        // Sort comments by date (newest first)
        const sortedComments = [...post.comments].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        sortedComments.forEach(comment => {
            const commentDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            html += `
                <div class="comment" data-comment-id="${comment.id}">
                    <div class="comment-avatar">
                        <img src="${comment.author.avatar}" alt="${comment.author.username}">
                    </div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <div class="comment-author">${comment.author.username}</div>
                            <div class="comment-date">${commentDate}</div>
                        </div>
                        <div class="comment-text">${comment.content}</div>
                        <div class="comment-actions">
                            <button class="like-comment-btn" data-comment-id="${comment.id}">
                                <i class="far fa-heart"></i> Like (${comment.likes})
                            </button>
                            <button class="reply-comment-btn" data-comment-id="${comment.id}">
                                <i class="far fa-comment"></i> Reply
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        commentsList.innerHTML = html;
        
        // Add event listeners to comment buttons
        const likeButtons = commentsList.querySelectorAll('.like-comment-btn');
        const replyButtons = commentsList.querySelectorAll('.reply-comment-btn');
        
        likeButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!auth.isLoggedIn()) {
                    alert('Please log in to like comments');
                    return;
                }
                
                const commentId = button.dataset.commentId;
                const comment = post.comments.find(c => c.id === commentId);
                
                if (comment) {
                    comment.likes++;
                    button.innerHTML = `<i class="fas fa-heart"></i> Like (${comment.likes})`;
                    button.classList.add('liked');
                    savePosts();
                }
            });
        });
        
        replyButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!auth.isLoggedIn()) {
                    alert('Please log in to reply to comments');
                    return;
                }
                
                // In a real app, you would implement a reply interface here
                alert('Reply functionality would be implemented here');
            });
        });
    };
    
    // Add a new comment to a post
    const addComment = (postId, content) => {
        const post = posts.find(p => p.id === postId);
        if (!post) return;
        
        const currentUser = auth.getCurrentUser();
        
        const newComment = {
            id: 'c' + Date.now(),
            author: {
                id: currentUser.id,
                username: currentUser.username,
                avatar: currentUser.avatar || 'assets/default-avatar.png'
            },
            content: content,
            createdAt: new Date().toISOString(),
            likes: 0
        };
        
        post.comments.push(newComment);
        savePosts();
        
        // Refresh comments display
        displayComments(post);
    };
    
    // Handle creating a new post
    const handleCreatePost = (e) => {
        e.preventDefault();
        
        if (!auth.isLoggedIn()) {
            alert('Please log in to create a post');
            return;
        }
        
        const title = document.getElementById('post-title').value;
        const category = document.getElementById('post-category').value;
        const content = document.getElementById('post-content').value;
        const imageUrl = document.getElementById('post-image').value || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643';
        
        // Create excerpt from content (first 150 characters)
        const excerpt = content.length > 150 ? content.substring(0, 150) + '...' : content;
        
        const currentUser = auth.getCurrentUser();
        
        const newPost = {
            id: Date.now().toString(),
            title: title,
            content: content,
            excerpt: excerpt,
            category: category,
            author: {
                id: currentUser.id,
                username: currentUser.username,
                avatar: currentUser.avatar || 'assets/default-avatar.png'
            },
            createdAt: new Date().toISOString(),
            updatedAt: null,
            imageUrl: imageUrl,
            comments: [],
            likes: 0,
            views: 0,
            featured: false
        };
        
        // Add post to posts array
        posts.unshift(newPost);
        savePosts();
        
        // Close modal and reset form
        createPostModal.style.display = 'none';
        createPostForm.reset();
        
        // Refresh posts displays
        displayFeaturedPosts();
        displayRecentPosts();
        
        // Show post detail
        showPostDetail(newPost.id);
    };
    
    // Edit an existing post
    const editPost = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (!post) return;
        
        // Fill the create post form with existing post data
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-category').value = post.category;
        document.getElementById('post-content').value = post.content;
        document.getElementById('post-image').value = post.imageUrl;
        
        // Change form submit button text
        const submitButton = createPostForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Update Post';
        
        // Add data attribute to form to indicate editing
        createPostForm.dataset.editing = 'true';
        createPostForm.dataset.editingId = postId;
        
        // Show create post modal
        createPostModal.style.display = 'flex';
        
        // Override form submit handler temporarily
        const originalHandler = createPostForm.onsubmit;
        createPostForm.onsubmit = (e) => {
            e.preventDefault();
            
            // Update post with new values
            post.title = document.getElementById('post-title').value;
            post.category = document.getElementById('post-category').value;
            post.content = document.getElementById('post-content').value;
            post.imageUrl = document.getElementById('post-image').value || post.imageUrl;
            post.excerpt = post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content;
            post.updatedAt = new Date().toISOString();
            
            savePosts();
            
            // Close modal and reset form
            createPostModal.style.display = 'none';
            createPostForm.reset();
            
            // Restore original submit handler
            createPostForm.onsubmit = originalHandler;
            
            // Restore button text
            submitButton.textContent = 'Publish Post';
            
            // Remove data attributes
            delete createPostForm.dataset.editing;
            delete createPostForm.dataset.editingId;
            
            // Refresh posts displays
            displayFeaturedPosts();
            displayRecentPosts();
            showMyPosts();
        };
    };
    
    // Delete a post
    const deletePost = (postId) => {
        // Remove post from posts array
        posts = posts.filter(p => p.id !== postId);
        savePosts();
        
        // Refresh displays
        displayFeaturedPosts();
        displayRecentPosts();
        showMyPosts();
    };
    
    // Hide post detail and show home
    const hidePostDetail = () => {
        postDetailSection.style.display = 'none';
        homeSection.style.display = 'block';
        featuredPostsSection.style.display = 'block';
        recentPostsSection.style.display = 'block';
    };
    
    // Save posts to localStorage
    const savePosts = () => {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    };
    
    // Public API
    return {
        init,
        showPostDetail,
        hidePostDetail,
        showMyPosts
    };
})();

// Initialize posts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    postsModule.init();
});