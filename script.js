// Test Questions
const questions = [
    {
        id: 1,
        question: "This time tomorrow, I ______ on the beach.",
        options: ["will lie", "will be lying", "will have lain", "am lying"],
        correct: 1
    },
    {
        id: 2,
        question: "At 8 PM tonight, she ______ her favorite TV show.",
        options: ["will watch", "watches", "will be watching", "is watching"],
        correct: 2
    },
    {
        id: 3,
        question: "Don't call between 7 and 8 PM; we ______ dinner.",
        options: ["will eat", "will be eating", "eat", "are eating"],
        correct: 1
    },
    {
        id: 4,
        question: "They ______ for London at this time next Friday.",
        options: ["will leave", "will have left", "will be leaving", "are leaving"],
        correct: 2
    },
    {
        id: 5,
        question: "This time next year, I ______ at university.",
        options: ["will study", "will have studied", "will be studying", "am studying"],
        correct: 2
    },
    {
        id: 6,
        question: "He can't come at 6; he ______ still ______.",
        options: ["will / work", "will / be working", "is / working", "does / work"],
        correct: 1
    },
    {
        id: 7,
        question: "We ______ for you at the station when you arrive.",
        options: ["will wait", "wait", "will be waiting", "are waiting"],
        correct: 2
    },
    {
        id: 8,
        question: "At midnight tonight, I ______ soundly.",
        options: ["will sleep", "will be sleeping", "sleep", "am sleeping"],
        correct: 1
    },
    {
        id: 9,
        question: "They ______ the new project all day tomorrow.",
        options: ["will discuss", "will be discussing", "discuss", "are discussing"],
        correct: 1
    },
    {
        id: 10,
        question: "I ______ my grandparents this weekend.",
        options: ["will visit", "visit", "will be visiting", "am visiting"],
        correct: 2
    },
    {
        id: 11,
        question: "What ______ you ______ this time tomorrow?",
        options: ["will / do", "are / doing", "will / be doing", "do / do"],
        correct: 2
    },
    {
        id: 12,
        question: "She ______ for her exam all evening.",
        options: ["will study", "will be studying", "studies", "is studying"],
        correct: 1
    },
    {
        id: 13,
        question: "We ______ to music while we work.",
        options: ["will listen", "listen", "will be listening", "are listening"],
        correct: 2
    },
    {
        id: 14,
        question: "They ______ football when we arrive.",
        options: ["will play", "play", "will be playing", "are playing"],
        correct: 2
    },
    {
        id: 15,
        question: "He ______ a conference call at 3 PM tomorrow.",
        options: ["will have", "has", "will be having", "is having"],
        correct: 2
    },
    {
        id: 16,
        question: "At this time next week, I ______ to Paris.",
        options: ["will fly", "will be flying", "will have flown", "am flying"],
        correct: 1
    },
    {
        id: 17,
        question: "They ______ on Saturday; they have the day off.",
        options: ["will not work", "will not be working", "are not working", "do not work"],
        correct: 1
    },
    {
        id: 18,
        question: "______ you ______ for me at the café?",
        options: ["Will / wait", "Are / waiting", "Will / be waiting", "Do / wait"],
        correct: 2
    },
    {
        id: 19,
        question: "She ______ to work at 8 AM tomorrow.",
        options: ["will drive", "drives", "will be driving", "is driving"],
        correct: 2
    },
    {
        id: 20,
        question: "We ______ our anniversary this time next month.",
        options: ["will celebrate", "celebrate", "will be celebrating", "are celebrating"],
        correct: 2
    },
    {
        id: 21,
        question: "The sun ______ by the time we get up.",
        options: ["will shine", "will be shining", "shines", "is shining"],
        correct: 1
    },
    {
        id: 22,
        question: "They ______ the new software at this time tomorrow.",
        options: ["will install", "will be installing", "are installing", "install"],
        correct: 1
    },
    {
        id: 23,
        question: "I ______ for my flight during your meeting.",
        options: ["will check", "will be checking", "check", "am checking"],
        correct: 1
    },
    {
        id: 24,
        question: "What ______ your brother ______ next year at college?",
        options: ["will / study", "is / studying", "will / be studying", "does / study"],
        correct: 2
    },
    {
        id: 25,
        question: "The team ______ on the new design all next week.",
        options: ["will work", "works", "will be working", "is working"],
        correct: 2
    }
];

// Application State
let studentData = {
    name: '',
    group: '',
    answers: new Array(questions.length).fill(null),
    startTime: null,
    endTime: null,
    pageChanges: 0,
    timeLeft: 15 * 60 // 15 minutes in seconds
};

let timerInterval = null;
let isTestActive = false;

// DOM Elements
const screens = {
    login: document.getElementById('loginScreen'),
    test: document.getElementById('testScreen'),
    results: document.getElementById('resultsScreen')
};

const loginElements = {
    nameInput: document.getElementById('studentName'),
    groupSelect: document.getElementById('studentGroup'),
    termsCheckbox: document.getElementById('agreeTerms'),
    startButton: document.getElementById('startTestBtn')
};

const testElements = {
    displayName: document.getElementById('displayName'),
    displayGroup: document.getElementById('displayGroup'),
    timer: document.getElementById('timer'),
    changeCount: document.getElementById('changeCount'),
    warningDisplay: document.getElementById('warningDisplay'),
    answeredCount: document.getElementById('answeredCount'),
    questionsList: document.getElementById('questionsList'),
    submitButton: document.getElementById('submitTestBtn')
};

const resultsElements = {
    name: document.getElementById('resultName'),
    group: document.getElementById('resultGroup'),
    time: document.getElementById('resultTime'),
    answered: document.getElementById('resultAnswered')
};

// Initialize Application
function init() {
    // Load saved progress if exists
    loadProgress();
    
    // Setup event listeners
    setupEventListeners();
    
    // Generate questions
    renderQuestions();
}

// Load saved progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('testProgress');
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            if (progress.name && progress.group) {
                studentData = { ...studentData, ...progress };
                loginElements.nameInput.value = progress.name;
                loginElements.groupSelect.value = progress.group;
                showWarning('Found saved progress. Continue where you left off?');
            }
        } catch (e) {
            console.log('No valid saved progress found');
        }
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('testProgress', JSON.stringify({
        ...studentData,
        timeLeft: studentData.timeLeft
    }));
}

// Setup all event listeners
function setupEventListeners() {
    // Start test button
    loginElements.startButton.addEventListener('click', startTest);
    
    // Submit test button
    testElements.submitButton.addEventListener('click', submitTest);
    
    // Page visibility change (tab switching detection)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Prevent accidental page leave
    window.addEventListener('beforeunload', handleBeforeUnload);
}

// Handle tab switching
function handleVisibilityChange() {
    if (document.hidden && isTestActive) {
        studentData.pageChanges++;
        updateWarningDisplay();
        
        if (studentData.pageChanges >= 3) {
            showWarning('You have exceeded the tab switching limit. Test will be submitted automatically.');
            setTimeout(submitTest, 1000);
        } else if (studentData.pageChanges > 0) {
            showWarning(`Warning: Tab switch detected (${studentData.pageChanges}/3)`);
        }
        
        saveProgress();
    }
}

// Handle before unload (page close/refresh)
function handleBeforeUnload(e) {
    if (isTestActive) {
        e.preventDefault();
        e.returnValue = 'Your test is in progress. Are you sure you want to leave?';
        return e.returnValue;
    }
}

// Show warning message
function showWarning(message) {
    const warning = document.createElement('div');
    warning.className = 'warning-toast';
    warning.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    warning.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ffeff3;
        color: #f72585;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(warning);
    
    setTimeout(() => {
        warning.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => warning.remove(), 300);
    }, 3000);
}

// Start the test
function startTest() {
    // Validate inputs
    const name = loginElements.nameInput.value.trim();
    const group = loginElements.groupSelect.value;
    
    if (!name) {
        showWarning('Please enter your name');
        return;
    }
    
    if (!group) {
        showWarning('Please select your group');
        return;
    }
    
    if (!loginElements.termsCheckbox.checked) {
        showWarning('Please agree to the test rules');
        return;
    }
    
    // Save student data
    studentData.name = name;
    studentData.group = group;
    studentData.startTime = Date.now();
    
    // Update display
    testElements.displayName.textContent = name;
    testElements.displayGroup.textContent = loginElements.groupSelect.options[loginElements.groupSelect.selectedIndex].text;
    
    // Switch screens
    screens.login.classList.remove('active');
    screens.test.classList.add('active');
    
    // Start timer
    startTimer();
    isTestActive = true;
    
    // Save progress
    saveProgress();
    
    // Update answered count
    updateAnsweredCount();
}

// Start the countdown timer
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        studentData.timeLeft--;
        updateTimerDisplay();
        
        if (studentData.timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
        } else if (studentData.timeLeft <= 60) {
            testElements.timer.classList.add('warning');
        }
        
        saveProgress();
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(studentData.timeLeft / 60);
    const seconds = studentData.timeLeft % 60;
    testElements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update warning display
function updateWarningDisplay() {
    testElements.changeCount.textContent = studentData.pageChanges;
    
    if (studentData.pageChanges > 0) {
        testElements.warningDisplay.classList.add('warning');
    }
}

// Update answered questions count
function updateAnsweredCount() {
    const answered = studentData.answers.filter(answer => answer !== null).length;
    testElements.answeredCount.textContent = answered;
}

// Render all questions
function renderQuestions() {
    testElements.questionsList.innerHTML = '';
    
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question-item';
        
        const optionsHtml = question.options.map((option, optionIndex) => {
            const letter = String.fromCharCode(65 + optionIndex);
            return `
                <button class="option-button ${studentData.answers[index] === optionIndex ? 'selected' : ''}" 
                        data-question="${index}" 
                        data-option="${optionIndex}">
                    <span class="option-letter">${letter}</span>
                    <span class="option-text">${option}</span>
                </button>
            `;
        }).join('');
        
        questionElement.innerHTML = `
            <div class="question-header">
                <div class="question-number">${question.id}</div>
                <div class="question-text">${question.question}</div>
            </div>
            <div class="options-grid">
                ${optionsHtml}
            </div>
        `;
        
        testElements.questionsList.appendChild(questionElement);
    });
    
    // Add event listeners to option buttons
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', function() {
            const questionIndex = parseInt(this.dataset.question);
            const optionIndex = parseInt(this.dataset.option);
            
            selectAnswer(questionIndex, optionIndex);
        });
    });
}

// Select an answer
function selectAnswer(questionIndex, optionIndex) {
    studentData.answers[questionIndex] = optionIndex;
    
    // Update UI
    const questionElement = document.querySelector(`.question-item:nth-child(${questionIndex + 1})`);
    questionElement.querySelectorAll('.option-button').forEach((button, index) => {
        if (index === optionIndex) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
    
    // Update answered count
    updateAnsweredCount();
    
    // Save progress
    saveProgress();
}

// Submit the test
async function submitTest() {
    if (!isTestActive) return;
    
    isTestActive = false;
    clearInterval(timerInterval);
    
    // Calculate time taken
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - studentData.startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const timeTakenStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Calculate score
    let correct = 0;
    questions.forEach((question, index) => {
        if (studentData.answers[index] === question.correct) {
            correct++;
        }
    });
    
    const answered = studentData.answers.filter(answer => answer !== null).length;
    const score = Math.round((correct / questions.length) * 100);
    
    // Prepare submission data
    const submissionData = {
        studentName: studentData.name,
        studentGroup: studentData.group,
        score: score,
        correctAnswers: correct,
        totalQuestions: questions.length,
        answeredQuestions: answered,
        timeTaken: timeTakenStr,
        pageChanges: studentData.pageChanges,
        timestamp: new Date().toISOString(),
        answers: studentData.answers.map((answer, index) => ({
            questionId: questions[index].id,
            question: questions[index].question,
            selected: answer !== null ? questions[index].options[answer] : 'Not answered',
            correct: questions[index].options[questions[index].correct],
            isCorrect: answer === questions[index].correct
        }))
    };
    
    try {
        // Send to API
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
        
        // Clear saved progress
        localStorage.removeItem('testProgress');
        
        // Show results screen
        showResults(timeTakenStr, answered);
        
    } catch (error) {
        console.error('Submission error:', error);
        showWarning('Failed to submit test. Please try again.');
        
        // Still show results but without API confirmation
        showResults(timeTakenStr, answered);
    }
}

// Show results screen
function showResults(timeTaken, answered) {
    // Update results display
    resultsElements.name.textContent = studentData.name;
    resultsElements.group.textContent = loginElements.groupSelect.options[loginElements.groupSelect.selectedIndex].text;
    resultsElements.time.textContent = timeTaken;
    resultsElements.answered.textContent = `${answered}/${questions.length}`;
    
    // Switch screens
    screens.test.classList.remove('active');
    screens.results.classList.add('active');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
