// Assessment functionality with Django backend integration

const API_BASE_URL = 'http://localhost:8000/api';
let questions = [];
let currentQuestion = 0;
let answers = [];
let sessionId = generateSessionId();

// Generate unique session ID
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Fetch questions from Django backend
async function loadQuestions() {
    try {
        const response = await fetch(`${API_BASE_URL}/questions/`);
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        questions = await response.json();
        displayQuestion();
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Failed to load questions. Please make sure the Django server is running on port 8000.');
    }
}

// Display current question
function displayQuestion() {
    if (currentQuestion >= questions.length) {
        submitAssessment();
        return;
    }

    const question = questions[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    const progressBar = document.getElementById('progress-bar');
    const questionNumber = document.getElementById('question-number');

    // Update progress
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

    // Display question
    questionContainer.innerHTML = `
        <div class="question-card">
            <h2>${question.text}</h2>
            <div class="choices">
                ${question.choices.map((choice, index) => `
                    <button class="choice-btn" onclick="selectAnswer(${question.id}, ${choice.id}, '${choice.score_letter}')">
                        <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="choice-text">${choice.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Select an answer
function selectAnswer(questionId, choiceId, scoreLetter) {
    answers.push({
        question_id: questionId,
        choice_id: choiceId,
        score_letter: scoreLetter
    });

    currentQuestion++;
    displayQuestion();
}

// Submit assessment to Django backend
async function submitAssessment() {
    // Show loading page
    window.location.href = 'loading.html';

    try {
        const response = await fetch(`${API_BASE_URL}/submit-assessment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_id: sessionId,
                answers: answers
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit assessment');
        }

        const result = await response.json();
        
        // Store result in sessionStorage
        sessionStorage.setItem('assessmentResult', JSON.stringify(result));
        sessionStorage.setItem('sessionId', sessionId);

        // Redirect to results page after loading animation
        setTimeout(() => {
            window.location.href = `profile.html?type=${result.personality_type}&session=${sessionId}`;
        }, 4000);

    } catch (error) {
        console.error('Error submitting assessment:', error);
        alert('Failed to submit assessment. Please try again.');
    }
}

// Load personality type description
async function loadPersonalityDescription(personalityType) {
    try {
        const response = await fetch(`${API_BASE_URL}/personality/${personalityType}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch personality description');
        }
        const data = await response.json();
        return data.description;
    } catch (error) {
        console.error('Error loading personality description:', error);
        return null;
    }
}

// Initialize assessment when page loads
if (document.getElementById('question-container')) {
    loadQuestions();
}

// Display results on profile page
if (window.location.pathname.includes('profile.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const personalityType = urlParams.get('type');
    const sessionId = urlParams.get('session');

    if (personalityType) {
        // Display personality type
        document.getElementById('personality-type').textContent = personalityType;
        
        // Load and display description
        loadPersonalityDescription(personalityType).then(description => {
            if (description) {
                document.getElementById('personality-name').textContent = description.name;
                document.getElementById('personality-description').textContent = description.description;
                
                // Display strengths
                const strengthsList = document.getElementById('strengths-list');
                strengthsList.innerHTML = description.strengths.map(strength => 
                    `<li>${strength}</li>`
                ).join('');
                
                // Display careers
                const careersList = document.getElementById('careers-list');
                careersList.innerHTML = description.careers.map(career => 
                    `<li>${career}</li>`
                ).join('');
            }
        });
    }
}
