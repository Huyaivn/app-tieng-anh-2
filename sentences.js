// ===== GLOBAL VARIABLES =====
let currentTopic = 'fruits';
let currentSentences = [];
let currentIndex = 0;
let score = 0;

// Current practice sentence
let currentPracticeSentence = null;
let selectedWords = [];
let shuffledWords = [];

// ===== TOPICS CONFIGURATION =====
const topics = {
    fruits: {
        name: 'Fruits',
        dataPath: 'topics/fruits/sentences.json'
    }
};

// ===== DOM ELEMENTS =====
const practiceBtn = document.getElementById('practiceBtn');
const learningScreen = document.getElementById('learningScreen');
const practiceScreen = document.getElementById('practiceScreen');
const closePractice = document.getElementById('closePractice');

// Learning screen elements
const sentenceImage = document.getElementById('sentenceImage');
const englishSentence = document.getElementById('englishSentence');
const vietnameseSentence = document.getElementById('vietnameseSentence');
const pronunciation = document.getElementById('pronunciation');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentIndexSpan = document.getElementById('currentIndex');
const totalSentencesSpan = document.getElementById('totalSentences');

// Practice screen elements
const practiceImage = document.getElementById('practiceImage');
const vietnameseQuestion = document.getElementById('vietnameseQuestion');
const selectedWordsContainer = document.getElementById('selectedWords');
const shuffledWordsContainer = document.getElementById('shuffledWords');
const clearBtn = document.getElementById('clearBtn');
const checkBtn = document.getElementById('checkBtn');
const feedback = document.getElementById('feedback');
const scoreSpan = document.getElementById('score');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadSentences(currentTopic);
    setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    prevBtn.addEventListener('click', showPreviousSentence);
    nextBtn.addEventListener('click', showNextSentence);

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

    // Practice controls
    clearBtn.addEventListener('click', clearSelectedWords);
    checkBtn.addEventListener('click', checkAnswer);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (learningScreen.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showPreviousSentence();
            if (e.key === 'ArrowRight') showNextSentence();
        }
    });
}

// ===== LOAD SENTENCES DATA =====
async function loadSentences(topicKey) {
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

        currentSentences = await response.json();
        currentTopic = topicKey;
        currentIndex = 0;
        
        // Show first sentence
        showSentence(currentIndex);
        updateNavigationButtons();
        
        console.log(`Loaded ${currentSentences.length} sentences for topic: ${topic.name}`);
    } catch (error) {
        console.error('Error loading sentences:', error);
        alert('Không thể tải dữ liệu câu. Vui lòng kiểm tra lại!');
    }
}

// ===== SHOW SENTENCE =====
function showSentence(index) {
    if (!currentSentences || currentSentences.length === 0) return;
    
    const sentence = currentSentences[index];
    
    // Update image
    sentenceImage.src = sentence.image;
    sentenceImage.alt = sentence.english;
    
    // Update text
    englishSentence.textContent = sentence.english;
    vietnameseSentence.textContent = sentence.vietnamese;
    pronunciation.textContent = `(${sentence.pronunciation})`;
    
    // Update progress
    currentIndexSpan.textContent = index + 1;
    totalSentencesSpan.textContent = currentSentences.length;
}

// ===== NAVIGATION =====
function showPreviousSentence() {
    if (currentIndex > 0) {
        currentIndex--;
        showSentence(currentIndex);
        updateNavigationButtons();
    }
}

function showNextSentence() {
    if (currentIndex < currentSentences.length - 1) {
        currentIndex++;
        showSentence(currentIndex);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === currentSentences.length - 1;
}

// ===== PRACTICE MODE =====
function startPractice() {
    score = 0;
    scoreSpan.textContent = score;
    generatePracticeQuestion();
}

function generatePracticeQuestion() {
    if (!currentSentences || currentSentences.length === 0) {
        alert('Cần dữ liệu câu để thực hành!');
        return;
    }

    // Clear previous state
    selectedWords = [];
    feedback.textContent = '';
    feedback.className = 'feedback';

    // Select random sentence
    const randomIndex = Math.floor(Math.random() * currentSentences.length);
    currentPracticeSentence = currentSentences[randomIndex];

    // Update image and question
    practiceImage.src = currentPracticeSentence.image;
    practiceImage.alt = '?';
    vietnameseQuestion.textContent = `Dịch: "${currentPracticeSentence.vietnamese}"`;

    // Split sentence into words and shuffle
    const words = currentPracticeSentence.english.split(' ');
    shuffledWords = shuffleArray([...words]);

    // Display shuffled words
    displayShuffledWords();
    displaySelectedWords();
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function displayShuffledWords() {
    shuffledWordsContainer.innerHTML = '';
    
    shuffledWords.forEach((word, index) => {
        const button = document.createElement('button');
        button.className = 'word-btn';
        button.textContent = word;
        button.dataset.index = index;
        button.addEventListener('click', () => selectWord(word, index));
        shuffledWordsContainer.appendChild(button);
    });
}

function selectWord(word, index) {
    // Add word to selected words
    selectedWords.push({ word, originalIndex: index });
    
    // Remove from shuffled words display
    const wordBtn = shuffledWordsContainer.querySelector(`[data-index="${index}"]`);
    if (wordBtn) {
        wordBtn.style.display = 'none';
    }
    
    // Update selected words display
    displaySelectedWords();
}

function displaySelectedWords() {
    selectedWordsContainer.innerHTML = '';
    
    if (selectedWords.length === 0) {
        selectedWordsContainer.innerHTML = '<p class="placeholder">Chọn các từ để tạo câu...</p>';
        return;
    }
    
    selectedWords.forEach((item, index) => {
        const span = document.createElement('span');
        span.className = 'selected-word';
        span.textContent = item.word;
        span.addEventListener('click', () => removeWord(index));
        selectedWordsContainer.appendChild(span);
    });
}

function removeWord(index) {
    const removedWord = selectedWords[index];
    
    // Remove from selected words
    selectedWords.splice(index, 1);
    
    // Show back in shuffled words
    const wordBtn = shuffledWordsContainer.querySelector(`[data-index="${removedWord.originalIndex}"]`);
    if (wordBtn) {
        wordBtn.style.display = 'inline-block';
    }
    
    // Update display
    displaySelectedWords();
}

function clearSelectedWords() {
    selectedWords = [];
    displayShuffledWords();
    displaySelectedWords();
    feedback.textContent = '';
    feedback.className = 'feedback';
}

function checkAnswer() {
    if (selectedWords.length === 0) {
        alert('Vui lòng chọn các từ để tạo câu!');
        return;
    }

    // Build sentence from selected words
    const userSentence = selectedWords.map(item => item.word).join(' ');
    const correctSentence = currentPracticeSentence.english;

    // Check if correct
    if (userSentence === correctSentence) {
        // Correct answer
        feedback.className = 'feedback correct';
        feedback.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Chính xác! Tuyệt vời!</strong><br>
                <span class="correct-answer">"${correctSentence}"</span>
            </div>
        `;
        score++;
        scoreSpan.textContent = score;

        // Disable all word buttons
        disableAllWordButtons();

        // Next question after delay
        setTimeout(() => {
            generatePracticeQuestion();
        }, 2500);
    } else {
        // Wrong answer
        feedback.className = 'feedback wrong';
        feedback.innerHTML = `
            <i class="fas fa-times-circle"></i>
            <div>
                <strong>Chưa đúng!</strong><br>
                Câu của bạn: <span class="user-answer">"${userSentence}"</span><br>
                Câu đúng: <span class="correct-answer">"${correctSentence}"</span>
            </div>
        `;
    }
}

function disableAllWordButtons() {
    const allButtons = shuffledWordsContainer.querySelectorAll('.word-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    });
}

// ===== EXPORT FOR FUTURE USE =====
window.SentenceLearningApp = {
    loadSentences,
    currentSentences: () => currentSentences,
    currentTopic: () => currentTopic,
    topics
};

console.log('Sentence Learning App Initialized! 🎉');
console.log('Available topics:', Object.keys(topics));
