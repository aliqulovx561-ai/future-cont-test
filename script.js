// Test Questions Data
const TEST_QUESTIONS = [
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
class TestApp {
    constructor() {
        this.studentData = {
            name: '',
            group: '',
            answers: new Array(TEST_QUESTIONS.length).fill(null),
            startTime: null,
            endTime: null,
            pageChanges: 0,
            timeLeft: 15 * 60, // 15 minutes in seconds
            isSubmitted: false
        };
        
        this.timerInterval = null;
        this.isTestActive = false;
        
        // DOM Elements
        this.screens = {
            login: document.getElementById('loginScreen'),
            test: document.getElementById('testScreen'),
            review: document.getElementById('reviewScreen'),
            results: document.getElementById('resultsScreen')
        };
        
        this.elements = {
            // Login
            nameInput: document.getElementById('studentName'),
            groupSelect: document.getElementById('studentGroup'),
            termsCheckbox: document.getElementById('agreeTerms'),
            startButton: document.getElementById('startTestBtn'),
            
            // Test
            displayName: document.getElementById('displayName'),
            displayGroup: document.getElementById('displayGroup'),
            timer: document.getElementById('timer'),
            changeCount: document.getElementById('changeCount'),
            warningDisplay: document.getElementById('warningDisplay'),
            answeredCount: document.getElementById('answeredCount'),
            questionsList: document.getElementById('questionsList'),
            submitButton: document.getElementById('submitTestBtn'),
            
            // Review
            reviewName: document.getElementById('reviewName'),
            reviewGroup: document.getElementById('reviewGroup'),
            reviewTime: document.getElementById('reviewTime'),
            reviewAnswered: document.getElementById('reviewAnswered'),
            answersList: document.getElementById('answersList'),
            editButton: document.getElementById('editTestBtn'),
            finalSubmitButton: document.getElementById('finalSubmitBtn'),
            
            // Results
            resultName: document.getElementById('resultName'),
            resultGroup: document.getElementById('resultGroup'),
            resultTime: document.getElementById('resultTime'),
            resultAnswered: document.getElementById('resultAnswered')
        };
        
        this.init();
    }
    
    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.renderQuestions();
    }
    
    loadProgress() {
        const saved = localStorage.getItem('testProgress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                if (progress.name && progress.group && !progress.isSubmitted) {
                    this.studentData = { ...this.studentData, ...progress };
                    this.elements.nameInput.value = progress.name;
                    this.elements.groupSelect.value = progress.group;
                    this.showToast('Found saved progress. Continue where you left off.', 'warning');
                }
            } catch (e) {
                console.log('No valid saved progress found');
            }
        }
    }
    
    saveProgress() {
        localStorage.setItem('testProgress', JSON.stringify({
            ...this.studentData,
            timeLeft: this.studentData.timeLeft
        }));
    }
    
    setupEventListeners() {
        // Login
        this.elements.startButton.addEventListener('click', () => this.startTest());
        
        // Test
        this.elements.submitButton.addEventListener('click', () => this.showReviewScreen());
        
        // Review
        this.elements.editButton.addEventListener('click', () => this.goBackToTest());
        this.elements.finalSubmitButton.addEventListener('click', () => this.finalSubmit());
        
        // Tab switching detection
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Prevent accidental page leave
        window.addEventListener('beforeunload', (e) => this.handleBeforeUnload(e));
    }
    
    handleVisibilityChange() {
        if (document.hidden && this.isTestActive) {
            this.studentData.pageChanges++;
            this.updateWarningDisplay();
            
            if (this.studentData.pageChanges >= 3) {
                this.showToast('You have exceeded the tab switching limit. Test will be submitted.', 'error');
                setTimeout(() => this.showReviewScreen(), 1000);
            } else if (this.studentData.pageChanges > 0) {
                this.showToast(`Warning: Tab switch detected (${this.studentData.pageChanges}/3)`, 'warning');
            }
            
            this.saveProgress();
        }
    }
    
    handleBeforeUnload(e) {
        if (this.isTestActive && !this.studentData.isSubmitted) {
            e.preventDefault();
            e.returnValue = 'Your test is in progress. Are you sure you want to leave?';
            return e.returnValue;
        }
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    startTest() {
        const name = this.elements.nameInput.value.trim();
        const group = this.elements.groupSelect.value;
        
        if (!name) {
            this.showToast('Please enter your name', 'error');
            return;
        }
        
        if (!group) {
            this.showToast('Please select your group', 'error');
            return;
        }
        
        if (!this.elements.termsCheckbox.checked) {
            this.showToast('Please agree to the test rules', 'error');
            return;
        }
        
        // Save student data
        this.studentData.name = name;
        this.studentData.group = group;
        this.studentData.startTime = Date.now();
        
        // Update display
        this.elements.displayName.textContent = name;
        this.elements.displayGroup.textContent = this.elements.groupSelect.options[this.elements.groupSelect.selectedIndex].text;
        
        // Switch screens
        this.switchScreen('test');
        
        // Start timer
        this.startTimer();
        this.isTestActive = true;
        
        // Save progress
        this.saveProgress();
        
        // Update answered count
        this.updateAnsweredCount();
    }
    
    switchScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenName].classList.add('active');
    }
    
    startTimer() {
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            this.studentData.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.studentData.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.showToast('Time is up! Test will be submitted.', 'warning');
                this.showReviewScreen();
            } else if (this.studentData.timeLeft <= 60) {
                this.elements.timer.classList.add('warning');
            }
            
            this.saveProgress();
        }, 1000);
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.studentData.timeLeft / 60);
        const seconds = this.studentData.timeLeft % 60;
        this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateWarningDisplay() {
        this.elements.changeCount.textContent = this.studentData.pageChanges;
        
        if (this.studentData.pageChanges > 0) {
            this.elements.warningDisplay.classList.add('warning');
        }
    }
    
    updateAnsweredCount() {
        const answered = this.studentData.answers.filter(answer => answer !== null).length;
        this.elements.answeredCount.textContent = answered;
        return answered;
    }
    
    renderQuestions() {
        this.elements.questionsList.innerHTML = '';
        
        TEST_QUESTIONS.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-item';
            
            const optionsHtml = question.options.map((option, optionIndex) => {
                const letter = String.fromCharCode(65 + optionIndex);
                const isSelected = this.studentData.answers[index] === optionIndex;
                return `
                    <button class="option-button ${isSelected ? 'selected' : ''}" 
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
            
            this.elements.questionsList.appendChild(questionElement);
        });
        
        // Add event listeners to option buttons
        this.elements.questionsList.addEventListener('click', (e) => {
            const optionButton = e.target.closest('.option-button');
            if (optionButton) {
                const questionIndex = parseInt(optionButton.dataset.question);
                const optionIndex = parseInt(optionButton.dataset.option);
                this.selectAnswer(questionIndex, optionIndex);
            }
        });
    }
    
    selectAnswer(questionIndex, optionIndex) {
        this.studentData.answers[questionIndex] = optionIndex;
        
        // Update UI
        const questionElement = document.querySelector(`.question-item:nth-child(${questionIndex + 1})`);
        questionElement.querySelectorAll('.option-button').forEach((button, index) => {
            button.classList.toggle('selected', index === optionIndex);
        });
        
        // Update answered count
        this.updateAnsweredCount();
        
        // Save progress
        this.saveProgress();
    }
    
    showReviewScreen() {
        if (!this.isTestActive) return;
        
        // Calculate time taken
        const timeTaken = Math.floor((Date.now() - this.studentData.startTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        const timeTakenStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update review screen
        this.elements.reviewName.textContent = this.studentData.name;
        this.elements.reviewGroup.textContent = this.elements.groupSelect.options[this.elements.groupSelect.selectedIndex].text;
        this.elements.reviewTime.textContent = timeTakenStr;
        this.elements.reviewAnswered.textContent = `${this.updateAnsweredCount()}/${TEST_QUESTIONS.length}`;
        
        // Render answers for review
        this.renderAnswersForReview();
        
        // Switch to review screen
        this.switchScreen('review');
    }
    
    renderAnswersForReview() {
        this.elements.answersList.innerHTML = '';
        
        TEST_QUESTIONS.forEach((question, index) => {
            const answer = this.studentData.answers[index];
            const isCorrect = answer === question.correct;
            const isAnswered = answer !== null;
            
            let status = 'unanswered';
            let statusText = 'Not Answered';
            
            if (isAnswered) {
                status = isCorrect ? 'correct' : 'incorrect';
                statusText = isCorrect ? 'Correct' : 'Incorrect';
            }
            
            const answerElement = document.createElement('div');
            answerElement.className = `answer-item ${status}`;
            
            let answerDetails = '';
            if (isAnswered) {
                answerDetails = `
                    <div class="answer-details">
                        <div class="answer-detail selected">
                            <div class="answer-detail-label">Your Answer</div>
                            <div class="answer-detail-value">${question.options[answer]}</div>
                        </div>
                        <div class="answer-detail correct">
                            <div class="answer-detail-label">Correct Answer</div>
                            <div class="answer-detail-value">${question.options[question.correct]}</div>
                        </div>
                    </div>
                `;
            } else {
                answerDetails = `
                    <div class="answer-details">
                        <div class="answer-detail">
                            <div class="answer-detail-label">Correct Answer</div>
                            <div class="answer-detail-value">${question.options[question.correct]}</div>
                        </div>
                    </div>
                `;
            }
            
            answerElement.innerHTML = `
                <div class="answer-header">
                    <div class="answer-question">${question.id}. ${question.question}</div>
                    <div class="answer-status ${status}">${statusText}</div>
                </div>
                ${answerDetails}
            `;
            
            this.elements.answersList.appendChild(answerElement);
        });
    }
    
    goBackToTest() {
        this.switchScreen('test');
    }
    
    async finalSubmit() {
        if (this.studentData.isSubmitted) return;
        
        this.studentData.isSubmitted = true;
        this.studentData.endTime = Date.now();
        clearInterval(this.timerInterval);
        
        // Calculate final time
        const timeTaken = Math.floor((this.studentData.endTime - this.studentData.startTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        const timeTakenStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Calculate score
        let correct = 0;
        TEST_QUESTIONS.forEach((question, index) => {
            if (this.studentData.answers[index] === question.correct) {
                correct++;
            }
        });
        
        const answered = this.studentData.answers.filter(answer => answer !== null).length;
        const score = Math.round((correct / TEST_QUESTIONS.length) * 100);
        
        // Prepare submission data
        const submissionData = {
            studentName: this.studentData.name,
            studentGroup: this.studentData.group,
            score: score,
            correctAnswers: correct,
            totalQuestions: TEST_QUESTIONS.length,
            answeredQuestions: answered,
            timeTaken: timeTakenStr,
            pageChanges: this.studentData.pageChanges,
            timestamp: new Date().toISOString(),
            answers: this.studentData.answers.map((answer, index) => ({
                questionId: TEST_QUESTIONS[index].id,
                question: TEST_QUESTIONS[index].question,
                selected: answer !== null ? TEST_QUESTIONS[index].options[answer] : 'Not answered',
                correct: TEST_QUESTIONS[index].options[TEST_QUESTIONS[index].correct],
                isCorrect: answer === TEST_QUESTIONS[index].correct
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Submission failed');
            }
            
            // Clear saved progress
            localStorage.removeItem('testProgress');
            
            // Show success results
            this.showResults(timeTakenStr, answered);
            
        } catch (error) {
            console.error('Submission error:', error);
            this.showToast('Failed to submit test. Please try again.', 'error');
            
            // Still show results but indicate the issue
            this.showResults(timeTakenStr, answered);
            this.showToast('Test saved locally but failed to send to teacher.', 'warning');
        }
    }
    
    showResults(timeTaken, answered) {
        // Update results display
        this.elements.resultName.textContent = this.studentData.name;
        this.elements.resultGroup.textContent = this.elements.groupSelect.options[this.elements.groupSelect.selectedIndex].text;
        this.elements.resultTime.textContent = timeTaken;
        this.elements.resultAnswered.textContent = `${answered}/${TEST_QUESTIONS.length}`;
        
        // Switch to results screen
        this.switchScreen('results');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.testApp = new TestApp();
});
