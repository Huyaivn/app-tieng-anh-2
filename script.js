// ===== HOME PAGE SCRIPT =====

// DOM Elements
const startBtn = document.getElementById('startBtn');
const topicModal = document.getElementById('topicModal');
const closeTopicModal = document.getElementById('closeTopicModal');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Start button - open topic modal
    startBtn.addEventListener('click', () => {
        topicModal.classList.add('active');
    });

    // Close topic modal
    closeTopicModal.addEventListener('click', () => {
        topicModal.classList.remove('active');
    });

    // Close modal when clicking outside
    topicModal.addEventListener('click', (e) => {
        if (e.target === topicModal) {
            topicModal.classList.remove('active');
        }
    });
}

console.log('Home Page Initialized! 🎉');
