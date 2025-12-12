// Test Data
const questions = [
    {
        id: 1,
        question: "This time tomorrow, I ______ on the beach.",
        options: [
            "will lie",
            "will be lying",
            "will have lain",
            "am lying"
        ],
        correct: 1
    },
    {
        id: 2,
        question: "At 8 PM tonight, she ______ her favorite TV show.",
        options: [
            "will watch",
            "watches",
            "will be watching",
            "is watching"
        ],
        correct: 2
    },
    {
        id: 3,
        question: "Don't call between 7 and 8 PM; we ______ dinner.",
        options: [
            "will eat",
            "will be eating",
            "eat",
            "are eating"
        ],
        correct: 1
    },
    {
        id: 4,
        question: "They ______ for London at this time next Friday.",
        options: [
            "will leave",
            "will have left",
            "will be leaving",
            "are leaving"
        ],
        correct: 2
    },
    {
        id: 5,
        question: "This time next year, I ______ at university.",
        options: [
            "will study",
            "will have studied",
            "will be studying",
            "am studying"
        ],
        correct: 2
    },
    {
        id: 6,
        question: "He can't come at 6; he ______ still ______.",
        options: [
            "will / work",
            "will / be working",
            "is / working",
            "does / work"
        ],
        correct: 1
    },
    {
        id: 7,
        question: "We ______ for you at the station when you arrive.",
        options: [
            "will wait",
            "wait",
            "will be waiting",
            "are waiting"
        ],
        correct: 2
    },
    {
        id: 8,
        question: "At midnight tonight, I ______ soundly.",
        options: [
            "will sleep",
            "will be sleeping",
            "sleep",
            "am sleeping"
        ],
        correct: 1
    },
    {
        id: 9,
        question: "They ______ the new project all day tomorrow.",
        options: [
            "will discuss",
            "will be discussing",
            "discuss",
            "are discussing"
        ],
        correct: 1
    },
    {
        id: 10,
        question: "I ______ my grandparents this weekend.",
        options: [
            "will visit",
            "visit",
            "will be visiting",
            "am visiting"
        ],
        correct: 2
    },
    {
        id: 11,
        question: "What ______ you ______ this time tomorrow?",
        options: [
            "will / do",
            "are / doing",
            "will / be doing",
            "do / do"
        ],
        correct: 2
    },
    {
        id: 12,
        question: "She ______ for her exam all evening.",
        options: [
            "will study",
            "will be studying",
            "studies",
            "is studying"
        ],
        correct: 1
    },
    {
        id: 13,
        question: "We ______ to music while we work.",
        options: [
            "will listen",
            "listen",
            "will be listening",
            "are listening"
        ],
        correct: 2
    },
    {
        id: 14,
        question: "They ______ football when we arrive.",
        options: [
            "will play",
            "play",
            "will be playing",
            "are playing"
        ],
        correct: 2
    },
    {
        id: 15,
        question: "He ______ a conference call at 3 PM tomorrow.",
        options: [
            "will have",
            "has",
            "will be having",
            "is having"
        ],
        correct: 2
    },
    {
        id: 16,
        question: "At this time next week, I ______ to Paris.",
        options: [
            "will fly",
            "will be flying",
            "will have flown",
            "am flying"
        ],
        correct: 1
    },
    {
        id: 17,
        question: "They ______ on Saturday; they have the day off.",
        options: [
            "will not work",
            "will not be working",
            "are not working",
            "do not work"
        ],
        correct: 1
    },
    {
        id: 18,
        question: "______ you ______ for me at the café?",
        options: [
            "Will / wait",
            "Are / waiting",
            "Will / be waiting",
            "Do / wait"
        ],
        correct: 2
    },
    {
        id: 19,
        question: "She ______ to work at 8 AM tomorrow.",
        options: [
            "will drive",
            "drives",
            "will be driving",
            "is driving"
        ],
        correct: 2
    },
    {
        id: 20,
        question: "We ______ our anniversary this time next month.",
        options: [
            "will celebrate",
            "celebrate",
            "will be celebrating",
            "are celebrating"
        ],
        correct: 2
    },
    {
        id: 21,
        question: "The sun ______ by the time we get up.",
        options: [
            "will shine",
            "will be shining",
            "shines",
            "is shining"
        ],
        correct: 1
    },
    {
        id: 22,
        question: "They ______ the new software at this time tomorrow.",
        options: [
            "will install",
            "will be installing",
            "are installing",
            "install"
        ],
        correct: 1
    },
    {
        id: 23,
        question: "I ______ for my flight during your meeting.",
        options: [
            "will check",
            "will be checking",
            "check",
            "am checking"
        ],
        correct: 1
    },
    {
        id: 24,
        question: "What ______ your brother ______ next year at college?",
        options: [
            "will / study",
            "is / studying",
            "will / be studying",
            "does / study"
        ],
        correct: 2
    },
    {
        id: 25,
        question: "The team ______ on the new design all next week.",
        options: [
            "will work",
            "works",
            "will be working",
            "is working"
        ],
        correct: 2
    }
];

// Application State
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let startTime = null;
let timerInterval = null;
let timeLeft = 15 * 60; // 15 minutes in seconds
let pageChangeCount = 0;
let isSubmitting = false;
let studentName = '';
let studentGroup = '';

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const testScreen = document.getElementById('testScreen');
const submitScreen = document.getElementById('submitScreen');
const startTestBtn = document.getElementById('startTestBtn');
const studentNameInput = document.getElementById('studentName');
const studentGroupSelect = document.getElementById('studentGroup');
const displayName = document.getElementById('displayName');
const displayGroup = document.getElementById('displayGroup');
const timer = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');
const currentQuestionDisplay = document.getElementById('currentQuestion');
const questionsContainer = document.getElementById('questionsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const changeCount = document.getElementById('changeCount');
const warningIndicator = document.getElementById('warningIndicator');
const finalName = document.getElementById('finalName');
const finalGroup = document.getElementById('finalGroup');
const timeTaken = document.getElementById('timeTaken');
const answeredCount = document.getElementById('answeredCount');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load saved progress if exists
    const savedProgress = localStorage.getItem('testProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        if (progress && progress.studentName && progress.studentGroup) {
            showWarning('You have an unfinished test. Continuing will overwrite it.');
            studentNameInput.value = progress.studentName;
            studentGroupSelect.value = progress.studentGroup;
        }
    }

    // Setup event listeners
    startTestBtn.addEventListener('click', startTest);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', submitTest);
    
    // Setup visibility change detection
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Prevent accidental page leave
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Generate questions
    renderQuestions();
});

function showWarning(message) {
    alert(`⚠️ Warning: ${message}`);
}

function handleVisibilityChange() {
    if (document.hidden && testScreen.classList.contains('active')) {
        pageChangeCount++;
        changeCount.textContent = pageChangeCount;
        
        if (pageChangeCount === 3) {
            warningIndicator.classList.add('warning');
            showWarning('This is your last warning! One more page change will submit your test automatically.');
        } else if (pageChangeCount > 3) {
            submitTest();
            return;
        }
        
        // Show warning
        if (pageChangeCount > 0) {
            warningIndicator.classList.add('warning');
        }
    }
}

function handleBeforeUnload(e) {
    if (testScreen.classList.contains('active') && !isSubmitting) {
        e.preventDefault();
        e.returnValue = 'Your test is in progress. Are you sure you want to leave?';
        return e.returnValue;
    }
}

function startTest() {
    studentName = studentNameInput.value.trim();
    studentGroup = studentGroupSelect.value;
    
    if (!studentName || !studentGroup) {
        showWarning('Please enter your name and select your group.');
        return;
    }
    
    if (!document.getElementById('agreeTerms').checked) {
        showWarning('Please agree to the test conditions.');
        return;
    }
    
    // Save student info
    displayName.textContent = studentName;
    displayGroup.textContent = studentGroupSelect.options[studentGroupSelect.selectedIndex].text;
    
    // Switch to test screen
    loginScreen.classList.remove('active');
    testScreen.classList.add('active');
    
    // Start timer
    startTime = Date.now();
    startTimer();
    
    // Save initial progress
    saveProgress();
    
    // Show first question
    showQuestion(currentQuestion);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
        } else if (timeLeft <= 60) {
            timer.classList.add('warning');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function renderQuestions() {
    questionsContainer.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = `question-card ${index === 0 ? 'active' : ''}`;
        questionElement.id = `question-${index}`;
        
        const optionsHtml = q.options.map((option, optIndex) => {
            const letter = String.fromCharCode(65 + optIndex);
            return `
                <div class="option ${answers[index] === optIndex ? 'selected' : ''}" 
                     onclick="selectOption(${index}, ${optIndex})">
                    <input type="radio" id="q${index}_opt${optIndex}" 
                           name="question_${index}" value="${optIndex}"
                           ${answers[index] === optIndex ? 'checked' : ''}>
                    <label class="option-label" for="q${index}_opt${optIndex}">
                        <span class="option-letter">${letter}</span>
                        <span class="option-text">${option}</span>
                    </label>
                </div>
            `;
        }).join('');
        
        questionElement.innerHTML = `
            <span class="question-number">Question ${q.id}</span>
            <p class="question-text">${q.question}</p>
            <div class="options-container">
                ${optionsHtml}
            </div>
        `;
        
        questionsContainer.appendChild(questionElement);
    });
}

function selectOption(questionIndex, optionIndex) {
    answers[questionIndex] = optionIndex;
    
    // Update UI
    const questionCard = document.getElementById(`question-${questionIndex}`);
    const options = questionCard.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
    
    // Update radio button
    const radio = document.getElementById(`q${questionIndex}_opt${optionIndex}`);
    radio.checked = true;
    
    // Save progress
    saveProgress();
    updateProgressBar();
}

function showQuestion(index) {
    // Hide current question
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Show new question
    const questionCard = document.getElementById(`question-${index}`);
    questionCard.classList.add('active');
    
    // Update UI
    currentQuestionDisplay.textContent = index + 1;
    updateProgressBar();
    
    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === questions.length - 1 ? 'Review' : 'Next';
}

function showPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function updateProgressBar() {
    const answered = answers.filter(a => a !== null).length;
    const progress = (answered / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function saveProgress() {
    const progress = {
        studentName,
        studentGroup,
        answers,
        currentQuestion,
        startTime,
        timeLeft,
        pageChangeCount
    };
    localStorage.setItem('testProgress', JSON.stringify(progress));
}

async function submitTest() {
    if (isSubmitting) return;
    
    isSubmitting = true;
    clearInterval(timerInterval);
    
    // Calculate time taken
    const endTime = Date.now();
    const timeTakenSeconds = Math.floor((endTime - startTime) / 1000);
    const timeTakenMinutes = Math.floor(timeTakenSeconds / 60);
    const timeTakenSecondsRemainder = timeTakenSeconds % 60;
    
    // Calculate score
    let correct = 0;
    questions.forEach((q, index) => {
        if (answers[index] === q.correct) {
            correct++;
        }
    });
    
    const score = Math.round((correct / questions.length) * 100);
    const answered = answers.filter(a => a !== null).length;
    
    // Prepare submission data
    const submissionData = {
        studentName,
        studentGroup,
        score,
        correct,
        total: questions.length,
        answered,
        timeTaken: `${timeTakenMinutes}:${timeTakenSecondsRemainder.toString().padStart(2, '0')}`,
        pageChanges: pageChangeCount,
        answers: answers.map((answer, index) => ({
            question: questions[index].question,
            selected: answer !== null ? questions[index].options[answer] : 'Not answered',
            correct: questions[index].options[questions[index].correct],
            isCorrect: answer === questions[index].correct
        })),
        timestamp: new Date().toISOString()
    };
    
    try {
        // Send data to API
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit test');
        }
        
        // Clear local storage
        localStorage.removeItem('testProgress');
        
        // Show submission screen
        testScreen.classList.remove('active');
        submitScreen.classList.add('active');
        
        // Update submission details
        finalName.textContent = studentName;
        finalGroup.textContent = studentGroupSelect.options[studentGroupSelect.selectedIndex].text;
        timeTaken.textContent = `${timeTakenMinutes} min ${timeTakenSecondsRemainder} sec`;
        answeredCount.textContent = `${answered}/${questions.length}`;
        
    } catch (error) {
        console.error('Submission error:', error);
        showWarning('Failed to submit test. Please try again.');
        isSubmitting = false;
    }
}

// Make functions available globally
window.selectOption = selectOption;
