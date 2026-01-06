// Main Application Module
const app = (() => {
    // DOM Elements
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const discoverLink = document.getElementById('discover-link');
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    const homeSection = document.getElementById('home-section');
    const featuredPostsSection = document.getElementById('featured-posts');
    const recentPostsSection = document.getElementById('recent-posts');
    const postDetailSection = document.getElementById('post-detail-section');
    const myPostsSection = document.getElementById('my-posts-section');
    const heroGetStarted = document.getElementById('hero-get-started');
    const newsletterForm = document.getElementById('newsletter-form');
    
    // Initialize application
    const init = () => {
        bindEvents();
    };
    
    // Bind event listeners
    const bindEvents = () => {
        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // Navigation links
        /*if (discoverLink) {
            discoverLink.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real app, this would show a discover/search page
                alert('Discover page would be implemented here');
            });
        }*/
        
        if (aboutLink) {
            aboutLink.addEventListener('click', (e) => {
                e.preventDefault();
                showAboutSection();
            });
        }
        
        // Hero get started button
        if (heroGetStarted) {
            heroGetStarted.addEventListener('click', () => {
                if (auth.isLoggedIn()) {
                    // If logged in, show create post modal
                    document.getElementById('create-post-link').click();
                } else {
                    // If not logged in, show signup modal
                    document.getElementById('signup-btn').click();
                }
            });
        }
        
        // Newsletter form
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                newsletterForm.reset();
            });
        }
    };
    
    // Show About section
    const showAboutSection = () => {
        // Hide other sections
        homeSection.style.display = 'none';
        featuredPostsSection.style.display = 'none';
        recentPostsSection.style.display = 'none';
        postDetailSection.style.display = 'none';
        myPostsSection.style.display = 'none';
        
        // Show about section
        aboutSection.style.display = 'block';
    };
    
    // Show Home section
    const showHomeSection = () => {
        // Hide other sections
        aboutSection.style.display = 'none';
        postDetailSection.style.display = 'none';
        myPostsSection.style.display = 'none';
        
        // Show home sections
        homeSection.style.display = 'block';
        featuredPostsSection.style.display = 'block';
        recentPostsSection.style.display = 'block';
    };
    
    // Public API
    return {
        init,
        showHomeSection,
        showAboutSection
    };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
// Discover page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const discoverLink = document.getElementById('discover-link');
    const discoverSection = document.getElementById('discover-section');
    const homeSection = document.getElementById('home-section');
    const featuredPosts = document.getElementById('featured-posts');
    const recentPosts = document.getElementById('recent-posts');
    const aboutSection = document.getElementById('about-section');
    const postDetailSection = document.getElementById('post-detail-section');
    const myPostsSection = document.getElementById('my-posts-section');
    
    // Navigation for discover page
    discoverLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide other sections
        homeSection.style.display = 'none';
        featuredPosts.style.display = 'none';
        recentPosts.style.display = 'none';
        aboutSection.style.display = 'none';
        postDetailSection.style.display = 'none';
        myPostsSection.style.display = 'none';
        
        // Show discover section
        discoverSection.style.display = 'block';
        
        // Set active navigation link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        discoverLink.classList.add('active');
        
        // Load discover posts
        loadDiscoverPosts();
    });
    
    // Filter and sort functionality
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const searchPosts = document.getElementById('search-posts');
    const searchButton = document.getElementById('search-button');
    
    // Apply filters when changed
    categoryFilter.addEventListener('change', loadDiscoverPosts);
    sortBy.addEventListener('change', loadDiscoverPosts);
    
    // Search functionality
    searchButton.addEventListener('click', loadDiscoverPosts);
    searchPosts.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadDiscoverPosts();
        }
    });
    
    // Pagination
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    let currentPage = 1;
    
    prevPage.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            loadDiscoverPosts();
        }
    });
    
    nextPage.addEventListener('click', function() {
        currentPage++;
        loadDiscoverPosts();
    });
    
    // Function to load posts based on filters, sorting, and pagination
    function loadDiscoverPosts() {
        const discoverPostsGrid = document.getElementById('discover-posts-grid');
        const currentPageElement = document.querySelector('.current-page');
        const totalPagesElement = document.getElementById('total-pages');
        
        // Get filter values
        const category = categoryFilter.value;
        const sort = sortBy.value;
        const searchQuery = searchPosts.value.trim();
        
        // Show loading state
        discoverPostsGrid.innerHTML = '<div class="post-placeholder"><p>Loading posts...</p></div>';
        
        // Update pagination display
        currentPageElement.textContent = currentPage.toString();
        
        // Simulate API call to get posts (replace this with actual API call in production)
        setTimeout(() => {
            // In a real application, you would fetch data from your backend here
            // For now, we'll simulate some posts
            
            // Generate sample posts (in real app, this would come from API)
            const samplePosts = generateSamplePosts(12);
            
            // Clear loading placeholder
            discoverPostsGrid.innerHTML = '';
            
            // Display posts
            samplePosts.forEach(post => {
                discoverPostsGrid.appendChild(createPostCard(post));
            });
            
            // Update total pages (would normally come from API)
            totalPagesElement.textContent = '5';
            
            // Enable/disable pagination buttons
            prevPage.disabled = currentPage === 1;
            nextPage.disabled = currentPage === 5;
        }, 500);
    }
    
    // Function to create a post card element
    function createPostCard(post) {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        postCard.innerHTML = `
            <div class="post-card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-card-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-card-title">${post.title}</h3>
                <p class="post-card-excerpt">${post.excerpt}</p>
                <div class="post-card-meta">
                    <div class="post-author">
                        <img src="${post.author.avatar}" alt="${post.author.name}">
                        <span>${post.author.name}</span>
                    </div>
                    <div class="post-stats">
                        <div class="post-views">
                            <i class="far fa-eye"></i>
                            <span>${post.views}</span>
                        </div>
                        <div class="post-comments-count">
                            <i class="far fa-comment"></i>
                            <span>${post.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add click event to show post details
        postCard.addEventListener('click', () => {
            showPostDetail(post);
        });
        
        return postCard;
    }
    
    // Function to generate sample posts (remove in production)
    function generateSamplePosts(count) {
        const categories = ['technology', 'travel', 'food', 'lifestyle', 'health', 'other'];
        const posts = [];
        
        for (let i = 1; i <= count; i++) {
            const categoryIndex = Math.floor(Math.random() * categories.length);
            posts.push({
                id: i,
                title: `Sample Post ${i}: A Guide to ${categories[categoryIndex].charAt(0).toUpperCase() + categories[categoryIndex].slice(1)}`,
                excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                image: `https://source.unsplash.com/random/300x200?${categories[categoryIndex]}&sig=${i}`,
                category: categories[categoryIndex],
                author: {
                    name: 'John Doe',
                    avatar: 'assets/default-avatar.png'
                },
                date: '2025-04-01',
                views: Math.floor(Math.random() * 1000),
                comments: Math.floor(Math.random() * 50)
            });
        }
        
        return posts;
    }
    
    // Function to show post detail (you'll need to connect this to your existing post detail functionality)
    function showPostDetail(post) {
        // This function would navigate to the post detail page/section
        // For now, we'll just log the post
        console.log('Showing post:', post);
        
        // In a real application, you would:
        // 1. Hide the discover section
        // 2. Show the post detail section
        // 3. Populate the post detail with the post data
    }
});