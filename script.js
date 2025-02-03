// Video data using YouTube links
const videos = [
    { title: "Uncrowned", googleDriveId: "1eCtOChw4tnQ1EndmnGiay4WzajpYHoOK", thumbnail: "thumbnail/Uncrowned_tb.png", genre: "personal" },
    { title: "TechTeach", googleDriveId: "1xny_0K9qX83SBx9OELvQ9JVTr_UKJXUm", thumbnail: "thumbnail/Techteach_tb.png", genre: "school" },
    { title: "Liwanag", youtubeId: "wwXe-TARYI4", thumbnail: "thumbnail/Liwanag_tb.png", genre: "personal" },
    { title: "Guardian", youtubeId: "tu5RhVanESY", thumbnail: "thumbnail/Guardian_tb.png", genre: "personal" },
    { title: "Frosh Day", googleDriveId: "1kJLGo3PA0JJ8ZNU_WmFezfVVWKQfqtu5", thumbnail: "thumbnail/PromotionalCpE_tb.png", genre: "school" },
    { title: "Pikoys Pares", youtubeId: "MQ_EOCKe1CM", thumbnail: "thumbnail/Pikoys_pares_tb.png", genre: "business" },
    { title: "Blanco's Icon", googleDriveId: "1T3P6TeTVoCxYS4DwzddQpUXj1eUO_P2V", thumbnail: "thumbnail/StephFormal.png", genre: "business" },
    { title: "CpE Day", googleDriveId: "188kZND37XM-O98XaUX6i4V3lGo0EPILH", thumbnail: "thumbnail/Banger.png", genre: "school" },
    { title: "CPE Clothing", youtubeId: "XM2zXWjxMhw", thumbnail: "thumbnail/CpE_Clothing_tb.png", genre: "school" },
    { title: "Drum Competition", googleDriveId: "1SHuA8bCpBvYIdxQrQYZq9qHh0tpuHOhk", thumbnail: "thumbnail/DrumRoll.png", genre: "business" },
    { title: "Mayor Campaign", googleDriveId: "1jOjJofMBlO4flif0x0x_nqz68yCr-D8M", thumbnail: "thumbnail/Campaign.png", genre: "business" },
    { title: "Filing", googleDriveId: "1kEOX-qfriRoG-AvujYzyAIPCo8gSENbf", thumbnail: "thumbnail/Filing.png", genre: "business" }
    
];

const videoContainer = document.getElementById('videoContainer');
const filterContainer = document.querySelector('.filter-container');
const filterToggle = document.getElementById('filter-toggle');
const filterOptions = document.getElementById('filter-options');
let currentVideo = null;

// Function to create video elements
function createVideoElement(video) {
    const videoElement = document.createElement('div');
    videoElement.className = 'video';
    videoElement.dataset.genre = video.genre;
    
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = video.thumbnail;
    thumbnailImg.alt = video.title;
    videoElement.appendChild(thumbnailImg);
    
    const titleElement = document.createElement('div');
    titleElement.className = 'video-title';
    titleElement.textContent = video.title;
    videoElement.appendChild(titleElement);
    
    videoElement.addEventListener('click', () => {
        playVideo(video);
    });
    return videoElement;
}

// Function to play video
function playVideo(video) {
    if (currentVideo) {
        currentVideo.remove();
    }

    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const iframe = document.createElement('iframe');
    if (video.youtubeId) {
        iframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&vq=hd1080`;
    } else if (video.googleDriveId) {
        iframe.src = `https://drive.google.com/file/d/${video.googleDriveId}/preview`;
    }
    iframe.style.width = '100%';
    iframe.style.maxWidth = '960px';
    iframe.style.height = '540px';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    modal.appendChild(iframe);

    document.body.appendChild(modal);
    currentVideo = modal;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            currentVideo = null;
        }
    });
}

// Function to render videos
function renderVideos(filteredVideos = videos) {
    videoContainer.innerHTML = '';
    filteredVideos.forEach(video => {
        const videoElement = createVideoElement(video);
        videoElement.style.opacity = '0';
        videoContainer.appendChild(videoElement);
    });
    fadeInVideos();
}

// Fade-in effect for videos
function fadeInVideos() {
    const videoElements = document.querySelectorAll('.video');
    videoElements.forEach((video, index) => {
        setTimeout(() => {
            video.style.transition = 'opacity 0.5s ease-in-out';
            video.style.opacity = '1';
        }, index * 100);
    });
}

// Initial render
renderVideos();

// Header button functionality
const headerButtons = document.querySelectorAll('.header-btn');
const contentSections = document.querySelectorAll('.content-section');

headerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const contentId = button.getAttribute('data-content');
        
        headerButtons.forEach(btn => btn.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(contentId).classList.add('active');

        if (contentId === 'projects') {
            filterContainer.style.display = 'block';
        } else {
            filterContainer.style.display = 'none';
        }
    });
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

function setInitialTheme() {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

setInitialTheme();

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const headerCard = document.querySelector('.header-card');

    menuToggle.innerHTML = '☰';

    menuToggle.addEventListener('click', () => {
        headerCard.classList.toggle('active');
        menuToggle.innerHTML = headerCard.classList.contains('active') ? '×' : '☰';
    });

    const headerBtns = document.querySelectorAll('.header-btn');
    headerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            headerCard.classList.remove('active');
            menuToggle.innerHTML = '☰';
        });
    });

    document.addEventListener('click', (event) => {
        if (!headerCard.contains(event.target) && 
            !menuToggle.contains(event.target) && 
            headerCard.classList.contains('active')) {
            headerCard.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
});

// Filter functionality
filterToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    filterOptions.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!filterToggle.contains(e.target) && !filterOptions.contains(e.target)) {
        filterOptions.classList.remove('active');
    }
});

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Fixed missing parenthesis here
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filteredVideos = filter === 'all' ? videos : videos.filter(video => video.genre === filter);
        renderVideos(filteredVideos);
        
        filterOptions.classList.remove('active');
    });
});

// Initial render with fade-in effect
renderVideos();