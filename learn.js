// ===== GLOBAL VARIABLES =====
let currentTopic = 'fruits';
let currentWords = [];
let currentIndex = 0;
let score = 0;

// ===== TOPICS CONFIGURATION =====
const topics = {
    fruits: {
        name: 'Trái cây - Fruits',
        icon: 'fa-apple-alt',
        dataPath: 'topics/fruits/data.json'
    },
    house: {
        name: 'Nhà cửa & Đồ dùng - House & Furniture',
        icon: 'fa-home',
        dataPath: 'topics/house/data.json'
    },
    clothing: {
        name: 'Quần áo & Thời trang - Clothing & Fashion',
        icon: 'fa-tshirt',
        dataPath: 'topics/clothing/data.json'
    }
    // Thêm chủ đề mới ở đây
};

// ===== DOM ELEMENTS =====
const menuBtn = document.getElementById('menuBtn');
const practiceBtn = document.getElementById('practiceBtn');
const topicMenu = document.getElementById('topicMenu');
const closeMenu = document.getElementById('closeMenu');
const learningScreen = document.getElementById('learningScreen');
const practiceScreen = document.getElementById('practiceScreen');
const closePractice = document.getElementById('closePractice');

// Learning screen elements
const currentTopicName = document.getElementById('currentTopicName');
const wordImage = document.getElementById('wordImage');
const englishWord = document.getElementById('englishWord');
const vietnameseWord = document.getElementById('vietnameseWord');
const pronunciation = document.getElementById('pronunciation');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentIndexSpan = document.getElementById('currentIndex');
const totalWordsSpan = document.getElementById('totalWords');

// Practice screen elements
const practiceImage = document.getElementById('practiceImage');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const scoreSpan = document.getElementById('score');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Get topic from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const topicParam = urlParams.get('topic');
    
    if (topicParam && topics[topicParam]) {
        currentTopic = topicParam;
    }
    
    loadTopic(currentTopic);
    setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Menu
    menuBtn.addEventListener('click', () => {
        topicMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        topicMenu.classList.remove('active');
    });

    // Close modal when clicking outside
    topicMenu.addEventListener('click', (e) => {
        if (e.target === topicMenu) {
            topicMenu.classList.remove('active');
        }
    });

    // Topic selection
    const topicItems = document.querySelectorAll('.topic-item');
    topicItems.forEach(item => {
        item.addEventListener('click', () => {
            const topic = item.dataset.topic;
            if (topics[topic]) {
                topicItems.forEach(t => t.classList.remove('active'));
                item.classList.add('active');
                loadTopic(topic);
                topicMenu.classList.remove('active');
            }
        });
    });

    // Navigation
    prevBtn.addEventListener('click', showPreviousWord);
    nextBtn.addEventListener('click', showNextWord);

    // Screen switching
    practiceBtn.addEventListener('click', () => {
        learningScreen.classList.remove('active');
        practiceScreen.classList.add('active');
        startPractice();
    });

    closePractice.addEventListener('click', () => {
        practiceScreen.classList.remove('active');
        learningScreen.classList.add('active');
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (learningScreen.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showPreviousWord();
            if (e.key === 'ArrowRight') showNextWord();
        }
    });
}

// ===== LOAD TOPIC DATA =====
async function loadTopic(topicKey) {
    try {
        const topic = topics[topicKey];
        if (!topic) {
            console.error('Topic not found:', topicKey);
            return;
        }

        const response = await fetch(topic.dataPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        currentWords = await response.json();
        currentTopic = topicKey;
        currentIndex = 0;
        
        // Update topic name
        currentTopicName.innerHTML = `<i class="fas ${topic.icon}"></i> ${topic.name}`;
        
        // Update sentences link with current topic
        const sentencesLink = document.getElementById('sentencesLink');
        if (sentencesLink) {
            sentencesLink.href = `sentences.html?topic=${topicKey}`;
        }
        
        // Show first word
        showWord(currentIndex);
        updateNavigationButtons();
        
        console.log(`Loaded ${currentWords.length} words for topic: ${topic.name}`);
    } catch (error) {
        console.error('Error loading topic:', error);
        alert('Không thể tải dữ liệu chủ đề. Vui lòng kiểm tra lại!');
    }
}

// ===== SHOW WORD =====
function showWord(index) {
    if (!currentWords || currentWords.length === 0) return;
    
    const word = currentWords[index];
    
    // Update image
    wordImage.src = word.image;
    wordImage.alt = word.english;
    
    // Update text
    englishWord.textContent = word.english;
    vietnameseWord.textContent = word.vietnamese;
    pronunciation.textContent = `(${word.pronunciation})`;
    
    // Update progress
    currentIndexSpan.textContent = index + 1;
    totalWordsSpan.textContent = currentWords.length;
}

// ===== NAVIGATION =====
function showPreviousWord() {
    if (currentIndex > 0) {
        currentIndex--;
        showWord(currentIndex);
        updateNavigationButtons();
    }
}

function showNextWord() {
    if (currentIndex < currentWords.length - 1) {
        currentIndex++;
        showWord(currentIndex);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === currentWords.length - 1;
}

// ===== PRACTICE MODE =====
let currentPracticeWord = null;
let practiceOptions = [];

function startPractice() {
    score = 0;
    scoreSpan.textContent = score;
    generatePracticeQuestion();
}

function generatePracticeQuestion() {
    if (!currentWords || currentWords.length < 2) {
        alert('Cần ít nhất 2 từ để thực hành!');
        return;
    }

    // Clear previous feedback
    feedback.textContent = '';
    feedback.className = 'feedback';

    // Select random word
    const randomIndex = Math.floor(Math.random() * currentWords.length);
    currentPracticeWord = currentWords[randomIndex];

    // Update image
    practiceImage.src = currentPracticeWord.image;
    practiceImage.alt = '?';

    // Generate options (1 correct + 3 wrong)
    practiceOptions = [currentPracticeWord];
    
    // Get wrong options
    const otherWords = currentWords.filter((w, i) => i !== randomIndex);
    const shuffled = otherWords.sort(() => 0.5 - Math.random());
    const wrongOptions = shuffled.slice(0, Math.min(3, otherWords.length));
    
    practiceOptions = [...practiceOptions, ...wrongOptions];
    
    // Shuffle all options
    practiceOptions.sort(() => 0.5 - Math.random());

    // Display options
    displayOptions();
}

function displayOptions() {
    optionsContainer.innerHTML = '';
    
    practiceOptions.forEach(word => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = word.english;
        button.addEventListener('click', () => checkAnswer(word, button));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedWord, button) {
    // Disable all buttons
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedWord.english === currentPracticeWord.english) {
        // Correct answer
        button.classList.add('correct');
        feedback.className = 'feedback correct';
        feedback.innerHTML = '<i class="fas fa-check-circle"></i> Chính xác! Tuyệt vời!';
        score++;
        scoreSpan.textContent = score;

        // Next question after delay
        setTimeout(() => {
            generatePracticeQuestion();
        }, 1500);
    } else {
        // Wrong answer
        button.classList.add('wrong');
        feedback.className = 'feedback wrong';
        feedback.innerHTML = `<i class="fas fa-times-circle"></i> Sai rồi! Đáp án đúng là: ${currentPracticeWord.english}`;

        // Highlight correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === currentPracticeWord.english) {
                btn.classList.add('correct');
            }
        });

        // Next question after delay
        setTimeout(() => {
            generatePracticeQuestion();
        }, 2500);
    }
}

// ===== UTILITY FUNCTIONS =====
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ===== EXPORT FOR FUTURE USE =====
window.EnglishLearningApp = {
    loadTopic,
    currentWords: () => currentWords,
    currentTopic: () => currentTopic,
    topics
};

console.log('English Learning App Initialized! 🎉');
console.log('Available topics:', Object.keys(topics));
