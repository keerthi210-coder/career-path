// Report Page JavaScript - With PDF Download

const API_BASE_URL = 'http://localhost:8000/api';

// Get personality data from URL or sessionStorage
const urlParams = new URLSearchParams(window.location.search);
let personalityType = urlParams.get('type'); // Make it mutable so we can recalculate
const sessionId = urlParams.get('session') || sessionStorage.getItem('sessionId');

let reportData = null;
let assessmentScores = null;

// Function to calculate personality type from scores
function calculatePersonalityTypeFromScores(scores) {
    if (!scores) return null;
    
    console.log('Calculating personality type from scores:', scores);
    
    // Determine each dimension based on which score is higher
    const dimension1 = scores.e > scores.i ? 'E' : 'I';
    const dimension2 = scores.s > scores.n ? 'S' : 'N';
    const dimension3 = scores.t > scores.f ? 'T' : 'F';
    const dimension4 = scores.j > scores.p ? 'J' : 'P';
    
    const calculatedType = dimension1 + dimension2 + dimension3 + dimension4;
    console.log('Calculated personality type:', calculatedType);
    
    return calculatedType;
}

// Function to update ALL personality type badges and references in the HTML
function updateAllPersonalityReferences(type) {
    console.log('=== UPDATING ALL PERSONALITY REFERENCES TO:', type, '===');
    
    // Update all badge elements by ID
    const badgeIds = [
        'page2-personality-type', 'page3-personality-type', 'page4-personality-type', 
        'page5-personality-type', 'page6-personality-type', 'page7-personality-type', 
        'page8-personality-type', 'page9-personality-type', 'page10-personality-type',
        'page11-personality-type', 'page12-personality-type', 'page13-personality-type',
        'page14-personality-type', 'page15-personality-type', 'page16-personality-type',
        'page17-personality-type'
    ];
    
    let updatedCount = 0;
    badgeIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = type;
            updatedCount++;
            console.log(`✓ Updated ${id} to ${type}`);
        } else {
            console.warn(`✗ Element ${id} not found`);
        }
    });
    
    console.log(`Updated ${updatedCount} out of ${badgeIds.length} badges`);
    
    // Also update by class name as backup
    const badgeElements = document.querySelectorAll('.personality-badge-header');
    badgeElements.forEach(element => {
        element.textContent = type;
    });
    
    console.log(`Also updated ${badgeElements.length} elements by class name`);
}

// Career mappings for each personality type
const careerMappings = {
    'INTJ': [
        { title: 'Software Architect', match: 95, growth: 'High', desc: 'Design complex software systems' },
        { title: 'Data Scientist', match: 92, growth: 'High', desc: 'Analyze and interpret complex data' },
        { title: 'Strategic Consultant', match: 90, growth: 'High', desc: 'Develop business strategies' },
        { title: 'Research Scientist', match: 88, growth: 'Medium', desc: 'Conduct advanced research' },
        { title: 'Systems Engineer', match: 85, growth: 'High', desc: 'Design integrated systems' }
    ],
    'ENTJ': [
        { title: 'CEO/Executive', match: 95, growth: 'High', desc: 'Lead organizations to success' },
        { title: 'Management Consultant', match: 92, growth: 'High', desc: 'Advise on business strategy' },
        { title: 'Entrepreneur', match: 90, growth: 'High', desc: 'Build and scale businesses' },
        { title: 'Corporate Lawyer', match: 87, growth: 'Medium', desc: 'Handle complex legal matters' },
        { title: 'Investment Banker', match: 85, growth: 'High', desc: 'Manage financial deals' }
    ],
    'INTP': [
        { title: 'Software Developer', match: 94, growth: 'High', desc: 'Create innovative solutions' },
        { title: 'Mathematician', match: 91, growth: 'Medium', desc: 'Solve complex problems' },
        { title: 'Physicist', match: 89, growth: 'Medium', desc: 'Research fundamental principles' },
        { title: 'Systems Analyst', match: 87, growth: 'High', desc: 'Optimize technical systems' },
        { title: 'Game Developer', match: 84, growth: 'High', desc: 'Design game mechanics' }
    ],
    'ENTP': [
        { title: 'Innovation Manager', match: 93, growth: 'High', desc: 'Drive creative solutions' },
        { title: 'Marketing Director', match: 90, growth: 'High', desc: 'Develop marketing strategies' },
        { title: 'Product Manager', match: 88, growth: 'High', desc: 'Lead product development' },
        { title: 'Business Analyst', match: 86, growth: 'Medium', desc: 'Analyze business needs' },
        { title: 'UX Designer', match: 83, growth: 'High', desc: 'Design user experiences' }
    ],
    'INFJ': [
        { title: 'Counselor', match: 94, growth: 'High', desc: 'Guide personal development' },
        { title: 'Psychologist', match: 91, growth: 'High', desc: 'Understand human behavior' },
        { title: 'Writer/Author', match: 88, growth: 'Medium', desc: 'Create meaningful content' },
        { title: 'HR Director', match: 86, growth: 'High', desc: 'Develop people strategies' },
        { title: 'Social Worker', match: 84, growth: 'Medium', desc: 'Help communities thrive' }
    ],
    'ENFJ': [
        { title: 'Teacher/Professor', match: 95, growth: 'High', desc: 'Educate and inspire' },
        { title: 'HR Manager', match: 92, growth: 'High', desc: 'Develop talent' },
        { title: 'Public Relations', match: 89, growth: 'High', desc: 'Manage communications' },
        { title: 'Life Coach', match: 87, growth: 'Medium', desc: 'Guide personal growth' },
        { title: 'Event Coordinator', match: 84, growth: 'Medium', desc: 'Organize experiences' }
    ],
    'INFP': [
        { title: 'Creative Writer', match: 93, growth: 'Medium', desc: 'Express through words' },
        { title: 'Graphic Designer', match: 90, growth: 'High', desc: 'Create visual art' },
        { title: 'Therapist', match: 88, growth: 'High', desc: 'Support mental health' },
        { title: 'Social Media Manager', match: 85, growth: 'High', desc: 'Build online communities' },
        { title: 'Librarian', match: 82, growth: 'Low', desc: 'Curate knowledge' }
    ],
    'ENFP': [
        { title: 'Brand Manager', match: 94, growth: 'High', desc: 'Build brand identity' },
        { title: 'Journalist', match: 91, growth: 'Medium', desc: 'Tell compelling stories' },
        { title: 'Recruiter', match: 88, growth: 'High', desc: 'Connect talent with opportunity' },
        { title: 'Sales Manager', match: 86, growth: 'High', desc: 'Drive revenue growth' },
        { title: 'Photographer', match: 83, growth: 'Medium', desc: 'Capture moments' }
    ],
    'ISTJ': [
        { title: 'Accountant', match: 95, growth: 'Medium', desc: 'Manage financial records' },
        { title: 'Project Manager', match: 92, growth: 'High', desc: 'Deliver projects on time' },
        { title: 'Auditor', match: 90, growth: 'Medium', desc: 'Ensure compliance' },
        { title: 'Operations Manager', match: 87, growth: 'High', desc: 'Optimize processes' },
        { title: 'Database Administrator', match: 85, growth: 'High', desc: 'Maintain data systems' }
    ],
    'ESTJ': [
        { title: 'Operations Director', match: 94, growth: 'High', desc: 'Lead operations' },
        { title: 'Military Officer', match: 91, growth: 'Medium', desc: 'Command and organize' },
        { title: 'Financial Manager', match: 89, growth: 'High', desc: 'Manage finances' },
        { title: 'Real Estate Agent', match: 86, growth: 'High', desc: 'Close deals' },
        { title: 'Supply Chain Manager', match: 84, growth: 'High', desc: 'Optimize logistics' }
    ],
    'ISFJ': [
        { title: 'Nurse', match: 95, growth: 'High', desc: 'Care for patients' },
        { title: 'Elementary Teacher', match: 92, growth: 'Medium', desc: 'Educate young minds' },
        { title: 'Office Manager', match: 89, growth: 'Medium', desc: 'Keep things running' },
        { title: 'Librarian', match: 86, growth: 'Low', desc: 'Organize information' },
        { title: 'Customer Service Manager', match: 84, growth: 'Medium', desc: 'Support customers' }
    ],
    'ESFJ': [
        { title: 'Event Planner', match: 94, growth: 'High', desc: 'Create memorable events' },
        { title: 'Healthcare Administrator', match: 91, growth: 'High', desc: 'Manage healthcare services' },
        { title: 'Sales Representative', match: 88, growth: 'High', desc: 'Build client relationships' },
        { title: 'Restaurant Manager', match: 86, growth: 'Medium', desc: 'Deliver great experiences' },
        { title: 'Flight Attendant', match: 83, growth: 'Low', desc: 'Serve passengers' }
    ],
    'ISTP': [
        { title: 'Mechanical Engineer', match: 94, growth: 'High', desc: 'Design mechanical systems' },
        { title: 'Pilot', match: 91, growth: 'Medium', desc: 'Fly aircraft' },
        { title: 'Forensic Scientist', match: 88, growth: 'Medium', desc: 'Analyze evidence' },
        { title: 'Software Tester', match: 86, growth: 'High', desc: 'Find and fix bugs' },
        { title: 'Carpenter', match: 83, growth: 'Low', desc: 'Build with precision' }
    ],
    'ESTP': [
        { title: 'Entrepreneur', match: 95, growth: 'High', desc: 'Start and grow businesses' },
        { title: 'Sales Executive', match: 92, growth: 'High', desc: 'Close major deals' },
        { title: 'Paramedic', match: 89, growth: 'Medium', desc: 'Respond to emergencies' },
        { title: 'Marketing Manager', match: 87, growth: 'High', desc: 'Drive campaigns' },
        { title: 'Stock Trader', match: 84, growth: 'High', desc: 'Trade securities' }
    ],
    'ISFP': [
        { title: 'Artist', match: 94, growth: 'Medium', desc: 'Create visual art' },
        { title: 'Chef', match: 91, growth: 'Medium', desc: 'Craft culinary experiences' },
        { title: 'Interior Designer', match: 88, growth: 'High', desc: 'Design beautiful spaces' },
        { title: 'Veterinarian', match: 86, growth: 'High', desc: 'Care for animals' },
        { title: 'Musician', match: 83, growth: 'Low', desc: 'Perform and compose' }
    ],
    'ESFP': [
        { title: 'Entertainer', match: 95, growth: 'Medium', desc: 'Perform and engage' },
        { title: 'Tour Guide', match: 91, growth: 'Low', desc: 'Share experiences' },
        { title: 'Personal Trainer', match: 88, growth: 'Medium', desc: 'Motivate fitness' },
        { title: 'Retail Manager', match: 86, growth: 'Medium', desc: 'Lead store operations' },
        { title: 'Childcare Worker', match: 83, growth: 'Low', desc: 'Care for children' }
    ]
};

// Dimension descriptions
const dimensionDescriptions = {
    'E': 'You gain energy from social interaction and external activities',
    'I': 'You gain energy from solitude and internal reflection',
    'S': 'You focus on concrete facts and present realities',
    'N': 'You focus on patterns, possibilities, and future potential',
    'T': 'You make decisions based on logic and objective analysis',
    'F': 'You make decisions based on values and personal considerations',
    'J': 'You prefer structure, planning, and organization',
    'P': 'You prefer flexibility, spontaneity, and adaptability'
};

// Load report immediately on page load
window.addEventListener('DOMContentLoaded', async () => {
    console.log('=== REPORT LOADING ===');
    console.log('Initial Personality Type from URL:', personalityType);
    console.log('Session ID:', sessionId);
    
    // Show report container immediately
    const reportContainer = document.getElementById('report-container');
    if (reportContainer) {
        reportContainer.style.display = 'block';
        console.log('Report container displayed');
    } else {
        console.error('Report container not found!');
    }
    
    // Load report data (this will calculate personality type from scores if available)
    console.log('Loading report data...');
    await loadReportData();
    console.log('Report data loaded with personality type:', personalityType);
    
    // Check premium status
    checkPremiumStatus();
    
    // Check if download parameter is present AND not already downloaded
    const shouldDownload = urlParams.get('download');
    const hasDownloaded = sessionStorage.getItem('reportDownloaded');
    
    if (shouldDownload === 'true' && !hasDownloaded) {
        // Mark as downloaded to prevent re-download on refresh
        sessionStorage.setItem('reportDownloaded', 'true');
        
        // Wait for content to fully render, then download
        setTimeout(() => {
            downloadReportAsPDF();
            
            // Remove download parameter from URL after download
            const newUrl = window.location.pathname + `?type=${personalityType}` + (sessionId ? `&session=${sessionId}` : '');
            window.history.replaceState({}, '', newUrl);
        }, 2000);
    }
    
    console.log('=== REPORT LOADED SUCCESSFULLY ===');
});

// Load Report Data
async function loadReportData() {
    try {
        // First, try to get assessment scores if we have a session
        if (sessionId) {
            const resultResponse = await fetch(`${API_BASE_URL}/result/${sessionId}/`);
            if (resultResponse.ok) {
                const result = await resultResponse.json();
                console.log('=== ASSESSMENT RESULT FROM SERVER ===');
                console.log('Server personality type:', result.personality_type);
                console.log('Server scores:', {
                    E: result.e_score,
                    I: result.i_score,
                    S: result.s_score,
                    N: result.n_score,
                    T: result.t_score,
                    F: result.f_score,
                    J: result.j_score,
                    P: result.p_score
                });
                
                assessmentScores = {
                    e: result.e_score || 0,
                    i: result.i_score || 0,
                    s: result.s_score || 0,
                    n: result.n_score || 0,
                    t: result.t_score || 0,
                    f: result.f_score || 0,
                    j: result.j_score || 0,
                    p: result.p_score || 0
                };
                
                // USE THE SERVER'S PERSONALITY TYPE - DON'T RECALCULATE
                personalityType = result.personality_type;
                console.log('✓ Using SERVER personality type:', personalityType);
                
                // IMMEDIATELY update all badges with the server's type
                updateAllPersonalityReferences(personalityType);
            }
        }
        
        // If no personality type yet, use default or URL parameter
        if (!personalityType) {
            personalityType = urlParams.get('type') || 'INFP';
            console.log('Using personality type from URL or default:', personalityType);
            
            // Update all badges
            updateAllPersonalityReferences(personalityType);
        }
        
        // Now fetch personality data
        const response = await fetch(`${API_BASE_URL}/personality/${personalityType}/`);
        if (!response.ok) throw new Error('Failed to fetch personality data');
        
        const data = await response.json();
        reportData = data.description;
        
        populateReport(reportData, assessmentScores);
        
    } catch (error) {
        console.error('Error loading report data:', error);
        populateReport({
            name: getPersonalityName(personalityType),
            description: 'A unique personality type with distinct characteristics.',
            strengths: ['Strategic thinking', 'Problem solving', 'Creativity', 'Leadership'],
            careers: ['Professional', 'Specialist', 'Manager', 'Consultant']
        }, null);
    }
}

// Calculate overall score from dimension scores
function calculateOverallScore(scores) {
    if (!scores) return 75;
    
    const dominantScores = [
        Math.max(scores.e, scores.i),
        Math.max(scores.s, scores.n),
        Math.max(scores.t, scores.f),
        Math.max(scores.j, scores.p)
    ];
    
    const sum = dominantScores.reduce((a, b) => a + b, 0);
    return Math.round((sum / dominantScores.length) * 12.5);
}

// Calculate percentile from overall score
function calculatePercentile(overallScore) {
    return Math.min(Math.round(overallScore * 0.95), 99);
}

// Populate Report with Data
function populateReport(data, scores) {
    // Populate cover page
    document.getElementById('cover-personality-name').textContent = data.name;
    document.getElementById('cover-personality-type').textContent = `${personalityType} - ${getCategoryName(personalityType)}`;
    
    // Populate second page personality badge
    document.getElementById('page2-personality-type').textContent = personalityType;
    
    // Get user name from localStorage or default
    const userName = localStorage.getItem('userName') || 'You';
    document.getElementById('user-name').textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
    
    // Populate Quick Snapshot
    const overallScore = calculateOverallScore(scores);
    document.getElementById('overall-score').textContent = overallScore;
    
    const percentile = calculatePercentile(overallScore);
    document.getElementById('percentile-text').textContent = `Top ${100 - percentile}%`;
    
    setTimeout(() => {
        const percentileFill = document.getElementById('percentile-fill');
        percentileFill.style.width = percentile + '%';
    }, 300);
    
    // Populate career role bars
    populateCareerRoleBars();
    
    // Populate dimension scores
    if (scores) {
        populateDimensionScore('ei', scores.e, scores.i, 'E', 'I');
        populateDimensionScore('sn', scores.s, scores.n, 'S', 'N');
        populateDimensionScore('tf', scores.t, scores.f, 'T', 'F');
        populateDimensionScore('jp', scores.j, scores.p, 'J', 'P');
    } else {
        const defaultScores = getDefaultScores(personalityType);
        populateDimensionScore('ei', defaultScores.e, defaultScores.i, 'E', 'I');
        populateDimensionScore('sn', defaultScores.s, defaultScores.n, 'S', 'N');
        populateDimensionScore('tf', defaultScores.t, defaultScores.f, 'T', 'F');
        populateDimensionScore('jp', defaultScores.j, defaultScores.p, 'J', 'P');
    }
    
    // Populate career roles
    populateCareerRoles();
    
    // Populate new pages (3-17) with personality badges and content
    populateNewPages();
}

// Get category name for personality type
function getCategoryName(type) {
    const categories = {
        'INTJ': 'Analysts', 'INTP': 'Analysts', 'ENTJ': 'Analysts', 'ENTP': 'Analysts',
        'INFJ': 'Diplomats', 'INFP': 'Diplomats', 'ENFJ': 'Diplomats', 'ENFP': 'Diplomats',
        'ISTJ': 'Sentinels', 'ISFJ': 'Sentinels', 'ESTJ': 'Sentinels', 'ESFJ': 'Sentinels',
        'ISTP': 'Explorers', 'ISFP': 'Explorers', 'ESTP': 'Explorers', 'ESFP': 'Explorers'
    };
    return categories[type] || 'Personality';
}

// Populate career role suitability bars in Quick Snapshot
function populateCareerRoleBars() {
    const careers = careerMappings[personalityType] || careerMappings['INTJ'];
    const topCareers = careers.slice(0, 5);
    
    const roleBarsContainer = document.getElementById('role-bars');
    roleBarsContainer.innerHTML = '';
    
    topCareers.forEach((career, index) => {
        const roleBar = document.createElement('div');
        roleBar.className = 'role-bar';
        roleBar.innerHTML = `
            <div class="role-info">
                <span class="role-name">${career.title}</span>
                <span class="role-percentage">${career.match}%</span>
            </div>
            <div class="role-bar-bg">
                <div class="role-bar-fill" style="width: 0%; transition-delay: ${index * 0.1}s;"></div>
            </div>
        `;
        roleBarsContainer.appendChild(roleBar);
        
        setTimeout(() => {
            const fill = roleBar.querySelector('.role-bar-fill');
            fill.style.width = career.match + '%';
        }, 400 + (index * 100));
    });
}

// Populate dimension scores with animated bars
function populateDimensionScore(dimension, score1, score2, letter1, letter2) {
    const total = score1 + score2;
    const percentage1 = total > 0 ? (score1 / total) * 100 : 50;
    const percentage2 = total > 0 ? (score2 / total) * 100 : 50;
    
    const dominant = percentage1 > percentage2 ? letter1 : letter2;
    const dominantPercentage = Math.max(percentage1, percentage2);
    
    const bar1 = document.getElementById(`${letter1.toLowerCase()}-bar`);
    const bar2 = document.getElementById(`${letter2.toLowerCase()}-bar`);
    const result = document.getElementById(`${dimension}-result`);
    const desc = document.getElementById(`${dimension}-desc`);
    
    if (bar1 && bar2) {
        setTimeout(() => {
            bar1.style.width = percentage1 + '%';
            bar2.style.width = percentage2 + '%';
        }, 500);
    }
    
    if (result) {
        result.textContent = `${dominant} (${Math.round(dominantPercentage)}%)`;
    }
    
    if (desc) {
        desc.textContent = dimensionDescriptions[dominant] || '';
    }
}

// Populate career roles section
function populateCareerRoles() {
    const careers = careerMappings[personalityType] || careerMappings['INTJ'];
    const freeCareers = careers.slice(0, 3);
    
    const careersList = document.getElementById('careers-list');
    careersList.innerHTML = '';
    
    freeCareers.forEach((career, index) => {
        const careerCard = document.createElement('div');
        careerCard.className = 'career-role-card';
        careerCard.innerHTML = `
            <div class="career-role-header">
                <h4>${career.title}</h4>
                <span class="match-badge">${career.match}% Match</span>
            </div>
            <p class="career-role-desc">${career.desc}</p>
            <div class="career-role-footer">
                <span class="growth-indicator">Growth: ${career.growth}</span>
            </div>
        `;
        careersList.appendChild(careerCard);
    });
}

// Get default scores based on personality type
function getDefaultScores(type) {
    const scores = { e: 4, i: 4, s: 4, n: 4, t: 4, f: 4, j: 4, p: 4 };
    
    if (type[0] === 'E') scores.e = 6;
    else scores.i = 6;
    
    if (type[1] === 'S') scores.s = 6;
    else scores.n = 6;
    
    if (type[2] === 'T') scores.t = 6;
    else scores.f = 6;
    
    if (type[3] === 'J') scores.j = 6;
    else scores.p = 6;
    
    return scores;
}

// Get personality name
function getPersonalityName(type) {
    const names = {
        'INTJ': 'The Architect',
        'ENTJ': 'The Commander',
        'INTP': 'The Logician',
        'ENTP': 'The Debater',
        'INFJ': 'The Advocate',
        'ENFJ': 'The Protagonist',
        'INFP': 'The Mediator',
        'ENFP': 'The Campaigner',
        'ISTJ': 'The Logistician',
        'ESTJ': 'The Executive',
        'ISFJ': 'The Defender',
        'ESFJ': 'The Consul',
        'ISTP': 'The Virtuoso',
        'ESTP': 'The Entrepreneur',
        'ISFP': 'The Adventurer',
        'ESFP': 'The Entertainer'
    };
    return names[type] || 'The Analyst';
}

// Check premium status and unlock sections
async function checkPremiumStatus() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        return false;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/check-premium/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.is_premium) {
                unlockPremiumSections();
                return true;
            }
        }
    } catch (error) {
        console.error('Error checking premium status:', error);
    }
    
    return false;
}

// Unlock premium sections
function unlockPremiumSections() {
    const lockedSections = document.querySelectorAll('.locked-section');
    lockedSections.forEach(section => {
        const overlay = section.querySelector('.premium-overlay');
        const blurred = section.querySelector('.blurred');
        
        if (overlay) overlay.remove();
        if (blurred) blurred.classList.remove('blurred');
    });
    
    const header = document.querySelector('.report-header');
    const premiumBadge = document.createElement('div');
    premiumBadge.style.cssText = 'background: #FFD84D; color: #111; padding: 10px 20px; border-radius: 20px; display: inline-block; margin-top: 10px; font-weight: 600;';
    premiumBadge.textContent = '⭐ Premium Member';
    header.querySelector('.container').appendChild(premiumBadge);
}

// Update upgrade buttons to redirect to login/register
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-upgrade').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const token = localStorage.getItem('authToken');
            
            if (!token) {
                window.location.href = `login.html?redirect=report.html?type=${personalityType}&session=${sessionId}`;
            } else {
                window.location.href = 'premium.html';
            }
        });
    });
});

// Download PDF function
function downloadReportAsPDF() {
    console.log('downloadReportAsPDF called - generating PDF');
    
    // Show loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.id = 'pdf-loading';
    loadingMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.9); color: white; padding: 30px 50px; border-radius: 15px; z-index: 10000; font-size: 20px; font-weight: 600;';
    loadingMsg.innerHTML = '📄 Generating PDF...<br><small style="font-size: 14px; font-weight: 400;">Please wait...</small>';
    document.body.appendChild(loadingMsg);
    
    setTimeout(async () => {
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });
            
            // Get all sections
            const sections = document.querySelectorAll('.report-container section');
            console.log('Found sections:', sections.length);
            
            if (sections.length === 0) {
                alert('No report sections found');
                document.body.removeChild(loadingMsg);
                return;
            }
            
            let isFirstPage = true;
            
            // Process each section with optimized settings
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                
                // Update loading message
                loadingMsg.innerHTML = `📄 Generating PDF...<br><small style="font-size: 14px; font-weight: 400;">Page ${i + 1} of ${sections.length}</small>`;
                
                // Temporarily set fixed dimensions for capture
                const originalHeight = section.style.height;
                const originalOverflow = section.style.overflow;
                section.style.height = '297mm';
                section.style.overflow = 'hidden';
                
                // Capture section as canvas with optimized settings
                const canvas = await html2canvas(section, {
                    scale: 1.5,  // Reduced from 2 for faster processing
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: window.getComputedStyle(section).backgroundColor || '#f5f5dc',
                    logging: false,
                    width: 794,
                    height: 1123,
                    windowWidth: 794,
                    windowHeight: 1123,
                    imageTimeout: 0,  // Don't wait for images
                    removeContainer: true  // Clean up faster
                });
                
                // Restore original styles
                section.style.height = originalHeight;
                section.style.overflow = originalOverflow;
                
                // Use lower quality JPEG for faster processing
                const imgData = canvas.toDataURL('image/jpeg', 0.85);
                
                // Add new page if not first
                if (!isFirstPage) {
                    pdf.addPage();
                }
                isFirstPage = false;
                
                // Add image to fill entire A4 page
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                
                // Small delay to prevent browser freezing
                if (i % 5 === 0 && i > 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            
            // Download the PDF
            pdf.save(`PersonalityReport_${personalityType}_${new Date().toISOString().split('T')[0]}.pdf`);
            
            console.log('PDF generated successfully');
            document.body.removeChild(loadingMsg);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF: ' + error.message);
            if (document.body.contains(loadingMsg)) {
                document.body.removeChild(loadingMsg);
            }
        }
    }, 500);
}

// Make download function available globally
window.downloadReportAsPDF = downloadReportAsPDF;


// Interest data for each personality type
const interestData = {
    'INTJ': [
        { name: 'Technology', score: 85 },
        { name: 'Research & Analysis', score: 80 },
        { name: 'Strategic Planning', score: 75 },
        { name: 'Problem Solving', score: 70 },
        { name: 'Innovation', score: 65 },
        { name: 'Systems Design', score: 60 }
    ],
    'ENTJ': [
        { name: 'Leadership', score: 85 },
        { name: 'Entrepreneurship', score: 80 },
        { name: 'Business Strategy', score: 75 },
        { name: 'Management', score: 70 },
        { name: 'Finance', score: 65 },
        { name: 'Negotiation', score: 60 }
    ],
    'INTP': [
        { name: 'Technology', score: 85 },
        { name: 'Mathematics', score: 80 },
        { name: 'Research', score: 75 },
        { name: 'Problem Solving', score: 70 },
        { name: 'Innovation', score: 65 },
        { name: 'Analysis', score: 60 }
    ],
    'ENTP': [
        { name: 'Innovation', score: 85 },
        { name: 'Entrepreneurship', score: 80 },
        { name: 'Marketing', score: 75 },
        { name: 'Technology', score: 70 },
        { name: 'Business Development', score: 65 },
        { name: 'Creative Problem Solving', score: 60 }
    ],
    'INFJ': [
        { name: 'Counseling', score: 85 },
        { name: 'Writing', score: 80 },
        { name: 'Psychology', score: 75 },
        { name: 'Education', score: 70 },
        { name: 'Social Work', score: 65 },
        { name: 'Human Resources', score: 60 }
    ],
    'ENFJ': [
        { name: 'Teaching', score: 85 },
        { name: 'Public Relations', score: 80 },
        { name: 'Human Resources', score: 75 },
        { name: 'Counseling', score: 70 },
        { name: 'Event Planning', score: 65 },
        { name: 'Communication', score: 60 }
    ],
    'INFP': [
        { name: 'Creative Writing', score: 85 },
        { name: 'Art & Design', score: 80 },
        { name: 'Counseling', score: 75 },
        { name: 'Social Media', score: 70 },
        { name: 'Psychology', score: 65 },
        { name: 'Education', score: 60 }
    ],
    'ENFP': [
        { name: 'Sales', score: 60 },
        { name: 'Entrepreneurship', score: 60 },
        { name: 'Advertising & Marketing', score: 60 },
        { name: 'Media & Communication', score: 60 },
        { name: 'Technology', score: 60 },
        { name: 'Helping Professions', score: 60 }
    ],
    'ISTJ': [
        { name: 'Accounting', score: 85 },
        { name: 'Project Management', score: 80 },
        { name: 'Operations', score: 75 },
        { name: 'Administration', score: 70 },
        { name: 'Quality Control', score: 65 },
        { name: 'Data Management', score: 60 }
    ],
    'ESTJ': [
        { name: 'Management', score: 85 },
        { name: 'Operations', score: 80 },
        { name: 'Finance', score: 75 },
        { name: 'Real Estate', score: 70 },
        { name: 'Supply Chain', score: 65 },
        { name: 'Administration', score: 60 }
    ],
    'ISFJ': [
        { name: 'Healthcare', score: 85 },
        { name: 'Education', score: 80 },
        { name: 'Administration', score: 75 },
        { name: 'Customer Service', score: 70 },
        { name: 'Social Work', score: 65 },
        { name: 'Library Science', score: 60 }
    ],
    'ESFJ': [
        { name: 'Event Planning', score: 85 },
        { name: 'Healthcare Administration', score: 80 },
        { name: 'Sales', score: 75 },
        { name: 'Customer Service', score: 70 },
        { name: 'Hospitality', score: 65 },
        { name: 'Education', score: 60 }
    ],
    'ISTP': [
        { name: 'Engineering', score: 85 },
        { name: 'Technology', score: 80 },
        { name: 'Mechanics', score: 75 },
        { name: 'Forensics', score: 70 },
        { name: 'Aviation', score: 65 },
        { name: 'Construction', score: 60 }
    ],
    'ESTP': [
        { name: 'Sales', score: 85 },
        { name: 'Entrepreneurship', score: 80 },
        { name: 'Marketing', score: 75 },
        { name: 'Emergency Services', score: 70 },
        { name: 'Finance', score: 65 },
        { name: 'Sports', score: 60 }
    ],
    'ISFP': [
        { name: 'Art', score: 85 },
        { name: 'Culinary Arts', score: 80 },
        { name: 'Design', score: 75 },
        { name: 'Veterinary', score: 70 },
        { name: 'Music', score: 65 },
        { name: 'Photography', score: 60 }
    ],
    'ESFP': [
        { name: 'Entertainment', score: 85 },
        { name: 'Hospitality', score: 80 },
        { name: 'Fitness', score: 75 },
        { name: 'Retail', score: 70 },
        { name: 'Childcare', score: 65 },
        { name: 'Event Planning', score: 60 }
    ]
};

// Curiosities for each personality type
const curiositiesData = {
    'INTJ': [
        'INTJs are often called "The Masterminds" because they excel at strategic planning.',
        'They make up only 2% of the population, making them one of the rarest types.',
        'Famous INTJs include Elon Musk and Isaac Newton.',
        'They are natural systems thinkers who see patterns others miss.'
    ],
    'ENTJ': [
        'ENTJs are natural-born leaders who thrive in executive positions.',
        'They make up about 3% of the population.',
        'Famous ENTJs include Steve Jobs and Margaret Thatcher.',
        'They are decisive and excel at organizing people and resources.'
    ],
    'INTP': [
        'INTPs are often called "The Architects" of ideas and systems.',
        'They make up about 3% of the population.',
        'Famous INTPs include Albert Einstein and Bill Gates.',
        'They love theoretical discussions and abstract concepts.'
    ],
    'ENTP': [
        'ENTPs are innovative debaters who love intellectual challenges.',
        'They make up about 3% of the population.',
        'Famous ENTPs include Mark Twain and Thomas Edison.',
        'They excel at seeing possibilities and generating creative solutions.'
    ],
    'INFJ': [
        'INFJs are the rarest personality type, making up only 1-2% of the population.',
        'They are deeply empathetic and often pursue careers in counseling.',
        'Famous INFJs include Martin Luther King Jr. and Mother Teresa.',
        'They have strong intuition about people and situations.'
    ],
    'ENFJ': [
        'ENFJs are natural teachers and mentors who inspire others.',
        'They make up about 2-3% of the population.',
        'Famous ENFJs include Oprah Winfrey and Barack Obama.',
        'They excel at understanding and motivating people.'
    ],
    'INFP': [
        'INFPs are idealistic dreamers with strong personal values.',
        'They make up about 4% of the population.',
        'Famous INFPs include William Shakespeare and J.R.R. Tolkien.',
        'They are deeply creative and often pursue artistic careers.'
    ],
    'ENFP': [
        'ENFPs are often called "The Campaigners" because they love understanding how things work.',
        'They are the type most likely to survive a zombie apocalypse due to their practical skills.',
        'Bear Grylls and Clint Eastwood are famous ENFPs.',
        'They are cool under pressure and often excel in extreme sports.'
    ],
    'ISTJ': [
        'ISTJs are reliable and detail-oriented, often called "The Inspectors".',
        'They make up about 11-14% of the population.',
        'Famous ISTJs include George Washington and Warren Buffett.',
        'They value tradition and are excellent at maintaining systems.'
    ],
    'ESTJ': [
        'ESTJs are efficient organizers who excel at management.',
        'They make up about 8-12% of the population.',
        'Famous ESTJs include Judge Judy and John D. Rockefeller.',
        'They are practical and results-oriented leaders.'
    ],
    'ISFJ': [
        'ISFJs are caring protectors who value harmony and tradition.',
        'They make up about 9-14% of the population.',
        'Famous ISFJs include Mother Teresa and Kate Middleton.',
        'They are loyal and dedicated to helping others.'
    ],
    'ESFJ': [
        'ESFJs are warm and sociable, often called "The Caregivers".',
        'They make up about 9-13% of the population.',
        'Famous ESFJs include Taylor Swift and Bill Clinton.',
        'They excel at creating harmony in social situations.'
    ],
    'ISTP': [
        'ISTPs are often called "The Mechanics" because they love understanding how things work.',
        'They are the type most likely to survive a zombie apocalypse due to their practical skills.',
        'Bear Grylls and Clint Eastwood are famous ISTPs.',
        'They are cool under pressure and often excel in extreme sports.'
    ],
    'ESTP': [
        'ESTPs are energetic risk-takers who live in the moment.',
        'They make up about 4-5% of the population.',
        'Famous ESTPs include Ernest Hemingway and Madonna.',
        'They are natural entrepreneurs and thrive on excitement.'
    ],
    'ISFP': [
        'ISFPs are gentle artists with a strong aesthetic sense.',
        'They make up about 5-9% of the population.',
        'Famous ISFPs include Michael Jackson and Marilyn Monroe.',
        'They live in the present and appreciate beauty in all forms.'
    ],
    'ESFP': [
        'ESFPs are spontaneous entertainers who love being the center of attention.',
        'They make up about 4-9% of the population.',
        'Famous ESFPs include Elvis Presley and Marilyn Monroe.',
        'They are natural performers who bring energy to any situation.'
    ]
};

// Metaphors for each personality type
const metaphorData = {
    'INTJ': { name: 'Strategic Architect', desc: 'Like an architect designing a masterpiece, you plan every detail before building.', traits: ['Visionary 🔭', 'Systematic 📐', 'Independent 🏔️'] },
    'ENTJ': { name: 'Commanding General', desc: 'Like a general leading troops, you organize and direct with confidence.', traits: ['Decisive ⚡', 'Strategic 🎯', 'Ambitious 🚀'] },
    'INTP': { name: 'Curious Scientist', desc: 'Like a scientist in a lab, you explore ideas and test theories.', traits: ['Analytical 🔬', 'Innovative 💡', 'Logical 🧮'] },
    'ENTP': { name: 'Inventive Explorer', desc: 'Like an explorer discovering new lands, you seek novel possibilities.', traits: ['Creative 🎨', 'Adaptable 🌿', 'Energetic ⚡'] },
    'INFJ': { name: 'Insightful Counselor', desc: 'Like a wise counselor, you understand people deeply and guide them.', traits: ['Empathetic 💗', 'Visionary 🔮', 'Principled 📜'] },
    'ENFJ': { name: 'Inspiring Teacher', desc: 'Like a passionate teacher, you motivate and develop others.', traits: ['Charismatic ✨', 'Supportive 🤝', 'Organized 📋'] },
    'INFP': { name: 'Idealistic Poet', desc: 'Like a poet crafting verses, you express deep values through creativity.', traits: ['Authentic 🌟', 'Compassionate 💚', 'Creative 🎭'] },
    'ENFP': { name: 'Enthusiastic Champion', desc: 'Like a champion rallying support, you inspire with passion and possibility.', traits: ['Enthusiastic 🎉', 'Creative 🌈', 'Empathetic 💖'] },
    'ISTJ': { name: 'Reliable Guardian', desc: 'Like a guardian protecting traditions, you maintain order and stability.', traits: ['Dependable 🛡️', 'Practical 🔧', 'Organized 📊'] },
    'ESTJ': { name: 'Efficient Executive', desc: 'Like an executive running operations, you ensure everything runs smoothly.', traits: ['Organized 📋', 'Direct 🎯', 'Responsible 👔'] },
    'ISFJ': { name: 'Devoted Protector', desc: 'Like a protector caring for loved ones, you nurture and support.', traits: ['Caring 💝', 'Loyal 🤝', 'Practical 🏠'] },
    'ESFJ': { name: 'Harmonious Host', desc: 'Like a gracious host, you create warmth and bring people together.', traits: ['Sociable 🎊', 'Helpful 🤗', 'Traditional 🏛️'] },
    'ISTP': { name: 'Strategic Navigator', desc: 'Like a navigator who studies the map before sailing, you prefer clarity before action.', traits: ['Plans Ahead 🗺️', 'Calm Under Pressure 🌊', 'Purpose Driven 🎯'] },
    'ESTP': { name: 'Bold Adventurer', desc: 'Like an adventurer seeking thrills, you dive into action fearlessly.', traits: ['Energetic ⚡', 'Practical 🛠️', 'Spontaneous 🎲'] },
    'ISFP': { name: 'Gentle Artist', desc: 'Like an artist creating beauty, you express yourself through aesthetics.', traits: ['Artistic 🎨', 'Sensitive 🌸', 'Flexible 🌊'] },
    'ESFP': { name: 'Lively Performer', desc: 'Like a performer on stage, you bring joy and entertainment to others.', traits: ['Playful 🎭', 'Spontaneous 🎉', 'Friendly 😊'] }
};

// Orientation mapping
const orientationData = {
    'INTJ': 'Analytical', 'ENTJ': 'Leadership', 'INTP': 'Analytical', 'ENTP': 'Creative',
    'INFJ': 'Empathetic', 'ENFJ': 'Social', 'INFP': 'Creative', 'ENFP': 'Creative',
    'ISTJ': 'Practical', 'ESTJ': 'Leadership', 'ISFJ': 'Supportive', 'ESFJ': 'Social',
    'ISTP': 'Practical', 'ESTP': 'Action-Oriented', 'ISFP': 'Creative', 'ESFP': 'Social'
};

// Operational Style data for each type
const operationalStyleData = {
    'INTJ': ['Prefers autonomy in execution', 'Needs clear, logical objectives', 'Thrives on intellectual challenge'],
    'ENTJ': ['Takes charge of situations', 'Focuses on efficiency and results', 'Delegates effectively'],
    'INTP': ['Works independently on complex problems', 'Requires intellectual freedom', 'Explores multiple solutions'],
    'ENTP': ['Generates innovative ideas rapidly', 'Challenges conventional thinking', 'Adapts quickly to change'],
    'INFJ': ['Works with purpose and meaning', 'Prefers deep, authentic connections', 'Plans with long-term vision'],
    'ENFJ': ['Leads through inspiration', 'Builds strong team relationships', 'Focuses on people development'],
    'INFP': ['Follows personal values', 'Works best with creative freedom', 'Seeks meaningful impact'],
    'ENFP': ['Explores multiple possibilities', 'Energized by new projects', 'Connects ideas creatively'],
    'ISTJ': ['Follows established procedures', 'Values accuracy and detail', 'Maintains consistent standards'],
    'ESTJ': ['Organizes people and resources', 'Implements practical solutions', 'Enforces rules and structure'],
    'ISFJ': ['Supports team harmony', 'Attends to practical details', 'Maintains traditions'],
    'ESFJ': ['Creates positive social environment', 'Coordinates group activities', 'Ensures everyone\'s needs are met'],
    'ISTP': ['Prefers hands-on problem solving', 'Works efficiently with tools', 'Responds well to crises'],
    'ESTP': ['Takes immediate action', 'Thrives in dynamic environments', 'Negotiates and persuades effectively'],
    'ISFP': ['Expresses through creative work', 'Values personal freedom', 'Responds to immediate needs'],
    'ESFP': ['Brings energy and enthusiasm', 'Engages people actively', 'Makes work enjoyable']
};

// Decision Framework data for each type
const decisionFrameworkData = {
    'INTJ': ['Analyzes long-term impact first', 'Validates data before acting', 'Values competence over hierarchy'],
    'ENTJ': ['Makes quick, decisive choices', 'Focuses on strategic outcomes', 'Prioritizes efficiency'],
    'INTP': ['Evaluates logical consistency', 'Questions assumptions thoroughly', 'Seeks elegant solutions'],
    'ENTP': ['Explores multiple perspectives', 'Debates to test ideas', 'Pivots based on new information'],
    'INFJ': ['Considers impact on people', 'Trusts intuitive insights', 'Aligns with core values'],
    'ENFJ': ['Weighs effect on relationships', 'Seeks consensus when possible', 'Considers ethical implications'],
    'INFP': ['Filters through personal values', 'Seeks authentic choices', 'Considers individual impact'],
    'ENFP': ['Follows enthusiasm and passion', 'Considers human potential', 'Keeps options open'],
    'ISTJ': ['Reviews past precedents', 'Follows proven methods', 'Ensures compliance'],
    'ESTJ': ['Applies practical logic', 'Makes timely decisions', 'Follows established guidelines'],
    'ISFJ': ['Considers others\' needs first', 'Maintains stability', 'Honors commitments'],
    'ESFJ': ['Seeks group harmony', 'Follows social norms', 'Considers tradition'],
    'ISTP': ['Analyzes immediate situation', 'Tests practical solutions', 'Stays flexible'],
    'ESTP': ['Acts on current opportunities', 'Takes calculated risks', 'Adapts to circumstances'],
    'ISFP': ['Follows personal aesthetics', 'Stays true to values', 'Responds to feelings'],
    'ESFP': ['Goes with the flow', 'Considers immediate enjoyment', 'Responds to group energy']
};

// Full personality descriptions for each type
const personalityDescriptions = {
    'INTJ': 'As an Architect (INTJ), you are a strategic mastermind with a natural ability to see the big picture and devise long-term plans. You approach problems with logic and analysis, preferring to work independently on complex challenges. Your mind is constantly seeking patterns and improvements in systems. You value competence and knowledge above all else, and you have little patience for inefficiency or illogical thinking. While you may appear reserved, you possess strong convictions and will defend your ideas with well-reasoned arguments. You excel in fields requiring strategic thinking, innovation, and systematic problem-solving.',
    
    'ENTJ': 'As a Commander (ENTJ), you are a natural-born leader with an exceptional ability to organize people and resources toward a common goal. You think strategically, make decisions quickly, and execute plans with confidence and determination. Your direct communication style and focus on efficiency make you an effective executive. You thrive in challenging environments where you can take charge and drive results. While your assertiveness is a strength, learning to consider others\' feelings and perspectives will enhance your leadership effectiveness. You excel in management, entrepreneurship, and any role requiring strategic vision and decisive action.',
    
    'INTP': 'As a Logician (INTP), you are an innovative thinker with an insatiable curiosity about how things work. You excel at analyzing complex systems, identifying patterns, and developing elegant theoretical solutions. Your mind is constantly exploring ideas, questioning assumptions, and seeking logical consistency. You value intellectual independence and need freedom to pursue your interests deeply. While you may appear detached, you are passionate about ideas and enjoy engaging in thoughtful debates. You may struggle with practical implementation and social conventions. You excel in fields requiring analytical thinking, innovation, and theoretical problem-solving.',
    
    'ENTP': 'As a Debater (ENTP), you are a quick-witted innovator who loves intellectual challenges and generating creative solutions. You see possibilities everywhere and enjoy exploring unconventional ideas. Your ability to think on your feet and argue multiple perspectives makes you an engaging conversationalist and effective problem-solver. You thrive on change and variety, often juggling multiple projects simultaneously. While your enthusiasm for new ideas is infectious, you may struggle with follow-through and routine tasks. Learning to focus your energy and consider others\' feelings will enhance your effectiveness. You excel in entrepreneurship, innovation, and roles requiring creative problem-solving.',
    
    'INFJ': 'As an Advocate (INFJ), you are a deeply insightful individual with a strong sense of idealism and integrity. You possess an exceptional ability to understand people and see beneath the surface. Your intuition guides you toward meaningful work that aligns with your values. You are driven by a desire to help others and make a positive impact on the world. While you are empathetic and caring, you also need time alone to recharge and reflect. You may struggle with perfectionism and taking on too much responsibility for others. You excel in counseling, writing, education, and any role where you can guide and inspire others toward personal growth.',
    
    'ENFJ': 'As a Protagonist (ENFJ), you are a charismatic leader with a natural ability to inspire and motivate others. You are deeply attuned to people\'s emotions and needs, and you excel at bringing out the best in everyone around you. Your warmth, enthusiasm, and organizational skills make you an effective teacher, mentor, and team leader. You are driven by a desire to help others reach their potential and create positive change. While your focus on others is admirable, remember to attend to your own needs as well. You excel in teaching, human resources, public relations, and any role involving people development and leadership.',
    
    'INFP': 'As a Mediator (INFP), you are an idealistic dreamer guided by strong personal values and a desire for authenticity. You possess a rich inner world and express yourself through creative pursuits. You are deeply empathetic and seek to understand others on a profound level. Your work must align with your values and contribute to something meaningful. While you are adaptable and open-minded, you stand firm on matters of principle. You may struggle with practical details and asserting yourself. Learning to balance idealism with pragmatism will help you achieve your goals. You excel in creative writing, counseling, design, and roles allowing authentic self-expression.',
    
    'ENFP': 'As a Campaigner (ENFP), you are an enthusiastic free spirit with boundless energy and creativity. You see life as full of possibilities and approach each day with curiosity and passion. Your ability to connect with people and generate innovative ideas makes you an inspiring presence. You thrive on variety and new experiences, often pursuing multiple interests simultaneously. While your enthusiasm is contagious, you may struggle with focus and follow-through. Learning to channel your energy and complete projects will enhance your effectiveness. You excel in marketing, journalism, counseling, and any role requiring creativity, communication, and people skills.',
    
    'ISTJ': 'As a Logistician (ISTJ), you are a reliable and practical individual who values tradition, order, and responsibility. You approach tasks methodically, paying careful attention to details and following established procedures. Your strong sense of duty and commitment makes you dependable in any role. You prefer clear expectations and proven methods over experimentation. While your consistency is a strength, being open to new approaches can enhance your effectiveness. You may appear reserved but possess deep loyalty to those you care about. You excel in accounting, project management, administration, and any role requiring accuracy, organization, and dependability.',
    
    'ESTJ': 'As an Executive (ESTJ), you are an efficient organizer with a talent for managing people and processes. You value structure, rules, and clear hierarchies. Your direct communication style and focus on results make you an effective leader and administrator. You believe in hard work, responsibility, and following established procedures. While your decisiveness is valuable, learning to be flexible and consider others\' perspectives will enhance your leadership. You may struggle with change and unconventional approaches. You excel in management, operations, finance, and any role requiring organization, efficiency, and practical problem-solving.',
    
    'ISFJ': 'As a Defender (ISFJ), you are a caring and dedicated individual who finds fulfillment in supporting and helping others. You are attentive to details and remember what matters to people. Your loyalty, reliability, and practical nature make you an invaluable team member. You prefer stable environments and value tradition and harmony. While your selflessness is admirable, remember to advocate for your own needs as well. You may struggle with change and conflict. Learning to embrace new possibilities and express your feelings will enhance your well-being. You excel in healthcare, education, administration, and any role involving service and support.',
    
    'ESFJ': 'As a Consul (ESFJ), you are a warm and sociable individual who thrives on creating harmony and helping others. You are highly attuned to social dynamics and excel at bringing people together. Your organizational skills and attention to others\' needs make you an excellent host, coordinator, and caregiver. You value tradition, cooperation, and maintaining positive relationships. While your focus on others is a strength, ensure you don\'t neglect your own needs. You may struggle with criticism and conflict. You excel in event planning, healthcare administration, sales, customer service, and any role involving people coordination and support.',
    
    'ISTP': 'As a Virtuoso (ISTP), you are a bold and practical experimenter with a natural mechanical curiosity. You love understanding how things work and excel at hands-on problem-solving. You are independent, adaptable, and calm under pressure, often reacting quickly to crises. You value freedom and need space to pursue your interests. Your logical and rational approach is balanced by a spontaneous streak. While you are action-oriented, you may struggle with long-term planning and emotional expression. Learning to communicate your feelings and consider future consequences will strengthen your relationships. You excel in engineering, technology, mechanics, and any role requiring practical problem-solving.',
    
    'ESTP': 'As an Entrepreneur (ESTP), you are an energetic risk-taker who lives in the moment and thrives on action. You are perceptive, adaptable, and excel at reading situations and people. Your ability to think on your feet and take immediate action makes you effective in dynamic environments. You are pragmatic and results-oriented, preferring to learn by doing. While your spontaneity is exciting, you may struggle with long-term planning and routine tasks. Learning to consider consequences and follow through on commitments will enhance your success. You excel in sales, entrepreneurship, emergency services, and any role requiring quick thinking and action.',
    
    'ISFP': 'As an Adventurer (ISFP), you are a gentle and artistic soul with a strong aesthetic sense and appreciation for beauty. You live in the present moment and express yourself through creative pursuits. You are deeply in tune with your senses and emotions, and you value personal freedom and authenticity. Your adaptability and open-mindedness make you easy to be around. While you are caring and empathetic, you may struggle with conflict and long-term planning. Learning to assert yourself and plan ahead will help you achieve your goals. You excel in art, design, culinary arts, veterinary care, and any role allowing creative expression.',
    
    'ESFP': 'As an Entertainer (ESFP), you are a spontaneous and enthusiastic individual who brings joy and energy wherever you go. You love being around people and making experiences fun and memorable. You are observant, practical, and excel at reading social situations. Your ability to live in the moment and adapt quickly makes you engaging and entertaining. While your spontaneity is a gift, you may struggle with planning ahead and dealing with criticism. Learning to consider long-term consequences and develop discipline will enhance your success. You excel in entertainment, hospitality, fitness training, retail, and any role involving people engagement and performance.'
};

// Did you know facts for each type
const didYouKnowData = {
    'INTJ': 'Your personality type is often found in leadership roles during times of crisis because of your ability to remain calm and strategic.',
    'ENTJ': 'ENTJs make up only 3% of the population but hold a disproportionate number of CEO positions.',
    'INTP': 'Many groundbreaking scientific theories were developed by INTPs who questioned conventional wisdom.',
    'ENTP': 'Your personality type is known for starting multiple businesses and pioneering new industries.',
    'INFJ': 'Despite being rare, INFJs have influenced history through counseling, writing, and social reform.',
    'ENFJ': 'Your personality type is naturally gifted at public speaking and often becomes influential teachers.',
    'INFP': 'Many of the world\'s greatest literary works were written by INFPs expressing their inner worlds.',
    'ENFP': 'Your personality type is often found in creative industries and is known for innovative thinking.',
    'ISTJ': 'ISTJs form the backbone of many organizations through their reliability and attention to detail.',
    'ESTJ': 'Your personality type excels at turning chaos into order and is often found in management roles.',
    'ISFJ': 'ISFJs are the most common personality type and are known for their dedication to helping others.',
    'ESFJ': 'Your personality type is naturally skilled at creating community and bringing people together.',
    'ISTP': 'ISTPs are often called "The Mechanics" and excel in hands-on problem-solving situations.',
    'ESTP': 'Your personality type is known for thriving in high-pressure situations and making quick decisions.',
    'ISFP': 'Many famous artists and musicians are ISFPs who express their inner world through their craft.',
    'ESFP': 'Your personality type brings joy to others and is often found in entertainment and hospitality roles.'
};

// Populate new pages
function populateNewPages() {
    console.log('=== POPULATE NEW PAGES CALLED ===');
    console.log('Current personalityType:', personalityType);
    console.log('Assessment scores:', assessmentScores);
    
    // If we have scores but no personality type, calculate it
    if (assessmentScores && !personalityType) {
        personalityType = calculatePersonalityTypeFromScores(assessmentScores);
        console.log('Calculated personality type from scores:', personalityType);
    }
    
    // Ensure we have a personality type
    if (!personalityType) {
        personalityType = 'INFP'; // Default fallback
        console.warn('No personality type found, using default:', personalityType);
    }
    
    // Update ALL personality badges
    updateAllPersonalityReferences(personalityType);
    
    // Update personality badges on all pages (legacy code, kept for compatibility)
    const badgeIds = [
        'page3-personality-type', 'page4-personality-type', 'page5-personality-type',
        'page6-personality-type', 'page7-personality-type', 'page8-personality-type',
        'page9-personality-type', 'page10-personality-type', 'page11-personality-type',
        'page12-personality-type', 'page13-personality-type', 'page14-personality-type',
        'page15-personality-type', 'page16-personality-type', 'page17-personality-type'
    ];
    
    badgeIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = personalityType;
            console.log(`Updated ${id} to ${personalityType}`);
        } else {
            console.warn(`Element ${id} not found`);
        }
    });
    
    // Page 3: Interest Report
    populateInterestBars();
    
    // Page 4: Profile Strategy
    populateProfileStrategy();
    
    // Page 5: Curiosities
    populateCuriosities();
    
    // Page 6: Personality Description
    populatePersonalityDescription();
}

function populateInterestBars() {
    const interests = interestData[personalityType] || interestData['ENFP'];
    const container = document.getElementById('interest-bars');
    container.innerHTML = '';
    
    interests.forEach((interest, index) => {
        const bar = document.createElement('div');
        bar.className = 'interest-bar';
        bar.innerHTML = `
            <div class="interest-info">
                <span class="interest-name">${interest.name}</span>
                <span class="interest-percentage">${interest.score}%</span>
            </div>
            <div class="interest-bar-bg">
                <div class="interest-bar-fill" style="width: 0%; transition-delay: ${index * 0.1}s;"></div>
            </div>
        `;
        container.appendChild(bar);
        
        setTimeout(() => {
            const fill = bar.querySelector('.interest-bar-fill');
            fill.style.width = interest.score + '%';
        }, 400 + (index * 100));
    });
}

function populateProfileStrategy() {
    console.log('=== POPULATING PROFILE STRATEGY ===');
    console.log('Personality Type:', personalityType);
    
    const orientation = orientationData[personalityType] || 'Creative';
    const opStyle = operationalStyleData[personalityType] || operationalStyleData['ENFP'];
    const decFramework = decisionFrameworkData[personalityType] || decisionFrameworkData['ENFP'];
    
    console.log('Orientation:', orientation);
    console.log('Operational Style:', opStyle);
    console.log('Decision Framework:', decFramework);
    
    const dominantOrientationEl = document.getElementById('dominant-orientation');
    const archetypeTypeEl = document.getElementById('archetype-type');
    const coreAdvantageEl = document.getElementById('core-advantage-text');
    
    if (dominantOrientationEl) {
        dominantOrientationEl.textContent = orientation;
        console.log('✓ Updated dominant-orientation to:', orientation);
    } else {
        console.error('✗ Element dominant-orientation not found!');
    }
    
    if (archetypeTypeEl) {
        archetypeTypeEl.textContent = personalityType;
        console.log('✓ Updated archetype-type to:', personalityType);
    } else {
        console.error('✗ Element archetype-type not found!');
    }
    
    const coreAdvantage = `By combining your ${personalityType} capabilities with a ${orientation} orientation, you possess a unique ability to excel in your field while staying true to your natural strengths and interests.`;
    
    if (coreAdvantageEl) {
        coreAdvantageEl.textContent = coreAdvantage;
        console.log('✓ Updated core-advantage-text');
    } else {
        console.error('✗ Element core-advantage-text not found!');
    }
    
    // Populate operational style
    const opStyleContainer = document.getElementById('operational-style');
    if (opStyleContainer) {
        opStyleContainer.innerHTML = opStyle.map(item => `<li>${item}</li>`).join('');
        console.log('✓ Updated operational-style with', opStyle.length, 'items');
    } else {
        console.error('✗ Element operational-style not found!');
    }
    
    // Populate decision framework
    const decFrameworkContainer = document.getElementById('decision-framework');
    if (decFrameworkContainer) {
        decFrameworkContainer.innerHTML = decFramework.map(item => `<li>${item}</li>`).join('');
        console.log('✓ Updated decision-framework with', decFramework.length, 'items');
    } else {
        console.error('✗ Element decision-framework not found!');
    }
    
    console.log('=== PROFILE STRATEGY POPULATION COMPLETE ===');
}

function populateCuriosities() {
    const curiosities = curiositiesData[personalityType] || curiositiesData['ENFP'];
    const container = document.getElementById('curiosity-cards');
    const subtitle = document.getElementById('curiosities-subtitle');
    const didYouKnow = document.getElementById('did-you-know-text');
    
    subtitle.textContent = `Interesting insights about the ${personalityType} personality type.`;
    
    container.innerHTML = '';
    curiosities.slice(0, 3).forEach(fact => {
        const card = document.createElement('div');
        card.className = 'curiosity-card';
        card.innerHTML = `
            <div class="curiosity-icon">🤔</div>
            <div class="curiosity-text">${fact}</div>
        `;
        container.appendChild(card);
    });
    
    didYouKnow.textContent = didYouKnowData[personalityType] || didYouKnowData['ENFP'];
}

function populatePersonalityDescription() {
    console.log('=== POPULATING PERSONALITY DESCRIPTION ===');
    console.log('Personality Type:', personalityType);
    
    const name = getPersonalityName(personalityType);
    const category = getCategoryName(personalityType);
    const metaphor = metaphorData[personalityType] || metaphorData['ISTP'];
    const fullDesc = personalityDescriptions[personalityType] || personalityDescriptions['ENFP'];
    
    console.log('Name:', name);
    console.log('Category:', category);
    console.log('Metaphor:', metaphor);
    
    // Determine emoji based on category
    const categoryEmojis = {
        'Analysts': '🧠',
        'Diplomats': '🤝',
        'Sentinels': '🛡️',
        'Explorers': '🔧'
    };
    const emoji = categoryEmojis[category] || '🔧';
    
    const nameHeroEl = document.getElementById('personality-name-hero');
    if (nameHeroEl) {
        nameHeroEl.textContent = name + ' ' + emoji;
        console.log('✓ Updated personality-name-hero');
    }
    
    const categoryEl = document.getElementById('personality-category');
    if (categoryEl) {
        categoryEl.textContent = category;
        console.log('✓ Updated personality-category');
    }
    
    const codeBadgeEl = document.getElementById('personality-code-badge');
    if (codeBadgeEl) {
        codeBadgeEl.textContent = personalityType;
        console.log('✓ Updated personality-code-badge');
    }
    
    // Use comprehensive description
    const fullDescEl = document.getElementById('personality-full-description');
    if (fullDescEl) {
        fullDescEl.innerHTML = `<p>${fullDesc}</p>`;
        console.log('✓ Updated personality-full-description');
    }
    
    // Populate traits
    const traitsContainer = document.getElementById('personality-traits');
    if (traitsContainer) {
        traitsContainer.innerHTML = metaphor.traits.map(trait => `<span>${trait}</span>`).join('');
        console.log('✓ Updated personality-traits');
    }
    
    // Populate metaphor
    const metaphorNameEl = document.getElementById('metaphor-name');
    if (metaphorNameEl) {
        metaphorNameEl.textContent = metaphor.name;
        console.log('✓ Updated metaphor-name');
    }
    
    const metaphorDescEl = document.getElementById('metaphor-description');
    if (metaphorDescEl) {
        metaphorDescEl.textContent = metaphor.desc;
        console.log('✓ Updated metaphor-description');
    }
    
    // Extract trait labels without emojis for metaphor traits
    const trait1 = metaphor.traits[0].replace(/[^\w\s]/g, '').trim();
    const trait2 = metaphor.traits[1].replace(/[^\w\s]/g, '').trim();
    const trait3 = metaphor.traits[2].replace(/[^\w\s]/g, '').trim();
    
    const trait1El = document.getElementById('metaphor-trait-1');
    if (trait1El) {
        trait1El.textContent = trait1;
        console.log('✓ Updated metaphor-trait-1');
    }
    
    const trait2El = document.getElementById('metaphor-trait-2');
    if (trait2El) {
        trait2El.textContent = trait2;
        console.log('✓ Updated metaphor-trait-2');
    }
    
    const trait3El = document.getElementById('metaphor-trait-3');
    if (trait3El) {
        trait3El.textContent = trait3;
        console.log('✓ Updated metaphor-trait-3');
    }
    
    console.log('=== PERSONALITY DESCRIPTION POPULATION COMPLETE ===');
}


// Working Orientation data for each type
const workingOrientationData = {
    'INTJ': [
        { name: 'Creative', level: 'High', score: 75 },
        { name: 'Informative', level: 'High', score: 80 },
        { name: 'People', level: 'Low', score: 35 },
        { name: 'Administrative', level: 'Medium', score: 60 }
    ],
    'ENTJ': [
        { name: 'Creative', level: 'Medium', score: 60 },
        { name: 'Informative', level: 'High', score: 75 },
        { name: 'People', level: 'High', score: 80 },
        { name: 'Administrative', level: 'High', score: 85 }
    ],
    'INTP': [
        { name: 'Creative', level: 'High', score: 80 },
        { name: 'Informative', level: 'High', score: 85 },
        { name: 'People', level: 'Low', score: 30 },
        { name: 'Administrative', level: 'Low', score: 40 }
    ],
    'ENTP': [
        { name: 'Creative', level: 'High', score: 85 },
        { name: 'Informative', level: 'High', score: 75 },
        { name: 'People', level: 'Medium', score: 65 },
        { name: 'Administrative', level: 'Low', score: 45 }
    ],
    'INFJ': [
        { name: 'Creative', level: 'High', score: 70 },
        { name: 'Informative', level: 'Medium', score: 60 },
        { name: 'People', level: 'High', score: 85 },
        { name: 'Administrative', level: 'Medium', score: 55 }
    ],
    'ENFJ': [
        { name: 'Creative', level: 'Medium', score: 65 },
        { name: 'Informative', level: 'Medium', score: 60 },
        { name: 'People', level: 'High', score: 90 },
        { name: 'Administrative', level: 'High', score: 70 }
    ],
    'INFP': [
        { name: 'Creative', level: 'High', score: 85 },
        { name: 'Informative', level: 'Medium', score: 55 },
        { name: 'People', level: 'High', score: 75 },
        { name: 'Administrative', level: 'Low', score: 40 }
    ],
    'ENFP': [
        { name: 'Creative', level: 'Medium', score: 67 },
        { name: 'Informative', level: 'Medium', score: 66 },
        { name: 'People', level: 'Medium', score: 63 },
        { name: 'Administrative', level: 'Medium', score: 63 }
    ],
    'ISTJ': [
        { name: 'Creative', level: 'Low', score: 40 },
        { name: 'Informative', level: 'High', score: 75 },
        { name: 'People', level: 'Medium', score: 50 },
        { name: 'Administrative', level: 'High', score: 90 }
    ],
    'ESTJ': [
        { name: 'Creative', level: 'Low', score: 45 },
        { name: 'Informative', level: 'Medium', score: 65 },
        { name: 'People', level: 'High', score: 70 },
        { name: 'Administrative', level: 'High', score: 85 }
    ],
    'ISFJ': [
        { name: 'Creative', level: 'Medium', score: 50 },
        { name: 'Informative', level: 'Medium', score: 60 },
        { name: 'People', level: 'High', score: 80 },
        { name: 'Administrative', level: 'High', score: 75 }
    ],
    'ESFJ': [
        { name: 'Creative', level: 'Medium', score: 55 },
        { name: 'Informative', level: 'Medium', score: 60 },
        { name: 'People', level: 'High', score: 85 },
        { name: 'Administrative', level: 'High', score: 75 }
    ],
    'ISTP': [
        { name: 'Creative', level: 'High', score: 70 },
        { name: 'Informative', level: 'High', score: 75 },
        { name: 'People', level: 'Low', score: 40 },
        { name: 'Administrative', level: 'Medium', score: 55 }
    ],
    'ESTP': [
        { name: 'Creative', level: 'Medium', score: 65 },
        { name: 'Informative', level: 'Medium', score: 60 },
        { name: 'People', level: 'High', score: 75 },
        { name: 'Administrative', level: 'Medium', score: 55 }
    ],
    'ISFP': [
        { name: 'Creative', level: 'High', score: 85 },
        { name: 'Informative', level: 'Low', score: 45 },
        { name: 'People', level: 'Medium', score: 65 },
        { name: 'Administrative', level: 'Low', score: 40 }
    ],
    'ESFP': [
        { name: 'Creative', level: 'High', score: 75 },
        { name: 'Informative', level: 'Medium', score: 50 },
        { name: 'People', level: 'High', score: 85 },
        { name: 'Administrative', level: 'Low', score: 45 }
    ]
};

// Strengths and Growth Areas for each type
const strengthsGrowthData = {
    'INTJ': {
        strengths: ['Strategic thinking and planning', 'Independent problem-solving', 'High standards and competence', 'Long-term vision'],
        growth: ['May seem aloof or arrogant', 'Can be overly critical', 'Struggles with emotional expression', 'May dismiss others\' input']
    },
    'ENTJ': {
        strengths: ['Natural leadership abilities', 'Decisive and efficient', 'Strategic and organized', 'Confident in execution'],
        growth: ['Can be overly dominant', 'May overlook people\'s feelings', 'Impatient with inefficiency', 'Can be too blunt']
    },
    'INTP': {
        strengths: ['Analytical and logical thinking', 'Creative problem-solving', 'Open-minded and curious', 'Independent and objective'],
        growth: ['May procrastinate on practical tasks', 'Can be socially awkward', 'Struggles with emotional expression', 'May overthink decisions']
    },
    'ENTP': {
        strengths: ['Innovative and creative', 'Quick-witted and adaptable', 'Excellent debater', 'Sees possibilities everywhere'],
        growth: ['May lack follow-through', 'Can be argumentative', 'Struggles with routine', 'May overlook details']
    },
    'INFJ': {
        strengths: ['Deep insight into people', 'Strong values and integrity', 'Creative and visionary', 'Dedicated to helping others'],
        growth: ['Can be perfectionistic', 'May take on too much', 'Struggles with criticism', 'Can be overly idealistic']
    },
    'ENFJ': {
        strengths: ['Charismatic and inspiring', 'Excellent communicator', 'Organized and responsible', 'Empathetic and supportive'],
        growth: ['May be overly idealistic', 'Can neglect own needs', 'Struggles with conflict', 'May be too controlling']
    },
    'INFP': {
        strengths: ['Deeply empathetic and caring', 'Creative and imaginative', 'Authentic and genuine', 'Flexible and open-minded'],
        growth: ['Can be overly idealistic', 'May avoid conflict', 'Struggles with practical details', 'Can be too self-critical']
    },
    'ENFP': {
        strengths: ['Enthusiastic and energetic', 'Creative and innovative', 'Excellent people skills', 'Adaptable and spontaneous'],
        growth: ['May lack focus and follow-through', 'Can be overly emotional', 'Struggles with routine tasks', 'May overcommit']
    },
    'ISTJ': {
        strengths: ['Reliable and responsible', 'Detail-oriented and thorough', 'Practical and logical', 'Strong work ethic'],
        growth: ['Can be inflexible', 'May resist change', 'Struggles with abstract concepts', 'Can be too serious']
    },
    'ESTJ': {
        strengths: ['Organized and efficient', 'Strong leadership skills', 'Practical and realistic', 'Decisive and direct'],
        growth: ['Can be too rigid', 'May be insensitive', 'Struggles with emotions', 'Can be overly controlling']
    },
    'ISFJ': {
        strengths: ['Caring and supportive', 'Reliable and loyal', 'Detail-oriented', 'Practical and organized'],
        growth: ['May neglect own needs', 'Can be too selfless', 'Struggles with change', 'May avoid conflict']
    },
    'ESFJ': {
        strengths: ['Warm and caring', 'Organized and responsible', 'Strong social skills', 'Loyal and supportive'],
        growth: ['Can be too concerned with others\' opinions', 'May be overly sensitive', 'Struggles with criticism', 'Can be inflexible']
    },
    'ISTP': {
        strengths: ['Calm in crisis situations', 'Skilled at troubleshooting and fixing things', 'Adaptable and spontaneous', 'Independent and self-reliant'],
        growth: ['May seem emotionally distant', 'Can get bored with long explanations or theory', 'Struggles with long-term planning and commitments', 'May take unnecessary physical or practical risks']
    },
    'ESTP': {
        strengths: ['Action-oriented and energetic', 'Adaptable and resourceful', 'Excellent in crisis situations', 'Practical and realistic'],
        growth: ['May be impulsive', 'Can be insensitive', 'Struggles with long-term planning', 'May take unnecessary risks']
    },
    'ISFP': {
        strengths: ['Artistic and creative', 'Gentle and caring', 'Flexible and spontaneous', 'Appreciates beauty'],
        growth: ['May avoid conflict', 'Can be overly sensitive', 'Struggles with planning', 'May be too reserved']
    },
    'ESFP': {
        strengths: ['Enthusiastic and fun-loving', 'Excellent people skills', 'Spontaneous and adaptable', 'Practical and realistic'],
        growth: ['May lack long-term focus', 'Can be easily distracted', 'Struggles with criticism', 'May avoid serious topics']
    }
};

// Communication Style data for each type
const communicationStyleData = {
    'INTJ': {
        traits: ['Direct and to the point', 'Prefers written communication', 'Focuses on logic and strategy'],
        dos: ['Be clear and concise', 'Focus on the big picture', 'Provide logical reasoning'],
        donts: ['Don\'t waste time on small talk', 'Don\'t be overly emotional', 'Don\'t ignore their expertise']
    },
    'ENTJ': {
        traits: ['Direct and assertive', 'Goal-oriented communication', 'Prefers efficiency'],
        dos: ['Be direct and clear', 'Focus on results', 'Come prepared'],
        donts: ['Don\'t waste their time', 'Don\'t be overly sensitive', 'Don\'t lack structure']
    },
    'INTP': {
        traits: ['Analytical and precise', 'Enjoys intellectual debates', 'May seem detached'],
        dos: ['Be logical and accurate', 'Allow time for analysis', 'Respect their need for space'],
        donts: ['Don\'t be illogical', 'Don\'t rush decisions', 'Don\'t take debates personally']
    },
    'ENTP': {
        traits: ['Witty and engaging', 'Enjoys debate and discussion', 'Challenges ideas'],
        dos: ['Be open to new ideas', 'Engage in discussion', 'Keep it interesting'],
        donts: ['Don\'t be rigid', 'Don\'t take debates personally', 'Don\'t be boring']
    },
    'INFJ': {
        traits: ['Thoughtful and deep', 'Prefers meaningful conversations', 'Reads between the lines'],
        dos: ['Be genuine and authentic', 'Listen actively', 'Respect their insights'],
        donts: ['Don\'t be superficial', 'Don\'t dismiss their intuition', 'Don\'t be dishonest']
    },
    'ENFJ': {
        traits: ['Warm and expressive', 'Focuses on people and relationships', 'Encouraging and supportive'],
        dos: ['Be open and honest', 'Show appreciation', 'Engage emotionally'],
        donts: ['Don\'t be cold or distant', 'Don\'t criticize harshly', 'Don\'t ignore feelings']
    },
    'INFP': {
        traits: ['Gentle and thoughtful', 'Values authenticity', 'May be reserved initially'],
        dos: ['Be genuine and kind', 'Respect their values', 'Give them time to open up'],
        donts: ['Don\'t be fake or manipulative', 'Don\'t criticize their ideals', 'Don\'t rush them']
    },
    'ENFP': {
        traits: ['Enthusiastic and expressive', 'Enjoys brainstorming', 'Connects ideas creatively'],
        dos: ['Be open and enthusiastic', 'Explore possibilities', 'Show genuine interest'],
        donts: ['Don\'t be rigid or controlling', 'Don\'t dismiss their ideas', 'Don\'t be overly critical']
    },
    'ISTJ': {
        traits: ['Clear and factual', 'Prefers structured communication', 'Values accuracy'],
        dos: ['Be clear and organized', 'Provide details', 'Follow through'],
        donts: ['Don\'t be vague', 'Don\'t ignore procedures', 'Don\'t be unreliable']
    },
    'ESTJ': {
        traits: ['Direct and practical', 'Focuses on facts and results', 'Prefers clear structure'],
        dos: ['Be direct and efficient', 'Stick to facts', 'Be organized'],
        donts: ['Don\'t be disorganized', 'Don\'t waste time', 'Don\'t ignore rules']
    },
    'ISFJ': {
        traits: ['Warm and considerate', 'Attentive to details', 'Prefers harmony'],
        dos: ['Be respectful and kind', 'Show appreciation', 'Be reliable'],
        donts: ['Don\'t be rude or abrupt', 'Don\'t ignore their efforts', 'Don\'t create conflict']
    },
    'ESFJ': {
        traits: ['Friendly and sociable', 'Focuses on people and harmony', 'Expressive and warm'],
        dos: ['Be friendly and warm', 'Show appreciation', 'Maintain harmony'],
        donts: ['Don\'t be cold or critical', 'Don\'t ignore social norms', 'Don\'t create discord']
    },
    'ISTP': {
        traits: ['Brief, practical, and to the point', 'Prefers action over long discussions', 'May avoid abstract or speculative conversations'],
        dos: ['Be direct and clear', 'Focus on the big picture'],
        donts: ['Don\'t get lost in excessive details', 'Don\'t take feedback personally']
    },
    'ESTP': {
        traits: ['Direct and energetic', 'Prefers action-oriented talk', 'Enjoys humor and banter'],
        dos: ['Be direct and engaging', 'Keep it practical', 'Use humor'],
        donts: ['Don\'t be overly theoretical', 'Don\'t be too serious', 'Don\'t waste time']
    },
    'ISFP': {
        traits: ['Gentle and reserved', 'Expresses through actions', 'Values authenticity'],
        dos: ['Be kind and genuine', 'Respect their space', 'Show through actions'],
        donts: ['Don\'t be pushy', 'Don\'t criticize harshly', 'Don\'t be fake']
    },
    'ESFP': {
        traits: ['Enthusiastic and friendly', 'Enjoys social interaction', 'Expressive and animated'],
        dos: ['Be fun and engaging', 'Show enthusiasm', 'Be spontaneous'],
        donts: ['Don\'t be boring', 'Don\'t be overly serious', 'Don\'t criticize publicly']
    }
};

// Populate pages 7-11
function populateAdditionalPages() {
    console.log('populateAdditionalPages called');
    
    // Update personality badges (already done in populateNewPages, but ensuring)
    const additionalBadgeIds = [
        'page7-personality-type', 'page8-personality-type', 'page9-personality-type',
        'page10-personality-type', 'page11-personality-type'
    ];
    
    additionalBadgeIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = personalityType;
        }
    });
    
    // Page 7: Working Orientation
    populateWorkingOrientation();
    
    // Page 9: Trait Breakdown & Strengths
    populateTraitBreakdown();
    populateStrengthsGrowth();
    
    // Page 11: Communication Style
    populateCommunicationStyle();
}

function populateWorkingOrientation() {
    const orientations = workingOrientationData[personalityType] || workingOrientationData['ENFP'];
    const container = document.getElementById('orientation-bars');
    container.innerHTML = '';
    
    const icons = { 'Creative': '🎨', 'Informative': '📚', 'People': '👥', 'Administrative': '📋' };
    
    orientations.forEach((item, index) => {
        const bar = document.createElement('div');
        bar.className = 'orientation-bar-item';
        bar.innerHTML = `
            <div class="orientation-header">
                <span class="orientation-icon">${icons[item.name]}</span>
                <span class="orientation-name">${item.name}</span>
                <span class="orientation-level">${item.level}</span>
            </div>
            <div class="orientation-bar-bg">
                <div class="orientation-bar-fill" style="width: 0%; transition-delay: ${index * 0.1}s;">
                    <span class="orientation-percentage">${item.score}%</span>
                </div>
            </div>
        `;
        container.appendChild(bar);
        
        setTimeout(() => {
            const fill = bar.querySelector('.orientation-bar-fill');
            fill.style.width = item.score + '%';
        }, 400 + (index * 100));
    });
}

function populateTraitBreakdown() {
    const scores = assessmentScores || getDefaultScores(personalityType);
    const container = document.getElementById('trait-bars-grid');
    container.innerHTML = '';
    
    const traits = [
        { letter: 'I', score: scores.i, total: scores.i + scores.e },
        { letter: 'E', score: scores.e, total: scores.i + scores.e },
        { letter: 'S', score: scores.s, total: scores.s + scores.n },
        { letter: 'N', score: scores.n, total: scores.s + scores.n },
        { letter: 'T', score: scores.t, total: scores.t + scores.f },
        { letter: 'F', score: scores.f, total: scores.t + scores.f },
        { letter: 'J', score: scores.j, total: scores.j + scores.p },
        { letter: 'P', score: scores.p, total: scores.j + scores.p }
    ];
    
    traits.forEach((trait, index) => {
        const percentage = Math.round((trait.score / trait.total) * 100);
        const bar = document.createElement('div');
        bar.className = 'trait-bar-item';
        bar.innerHTML = `
            <span class="trait-letter">${trait.letter}</span>
            <div class="trait-bar-container">
                <div class="trait-bar-fill-inner" style="width: 0%; transition-delay: ${index * 0.05}s;"></div>
            </div>
            <span class="trait-percentage">${percentage}%</span>
        `;
        container.appendChild(bar);
        
        setTimeout(() => {
            const fill = bar.querySelector('.trait-bar-fill-inner');
            fill.style.width = percentage + '%';
        }, 300 + (index * 50));
    });
}

function populateStrengthsGrowth() {
    const data = strengthsGrowthData[personalityType] || strengthsGrowthData['ENFP'];
    
    const strengthsList = document.getElementById('strengths-list');
    strengthsList.innerHTML = data.strengths.map(item => `<li>${item}</li>`).join('');
    
    const growthList = document.getElementById('growth-areas-list');
    growthList.innerHTML = data.growth.map(item => `<li>${item}</li>`).join('');
}

function populateCommunicationStyle() {
    const data = communicationStyleData[personalityType] || communicationStyleData['ISTP'];
    
    const traitsList = document.getElementById('communication-traits-list');
    traitsList.innerHTML = data.traits.map(item => `<li>${item}</li>`).join('');
    
    const dosList = document.getElementById('communication-dos-list');
    dosList.innerHTML = data.dos.map(item => `<li>${item}</li>`).join('');
    
    const dontsList = document.getElementById('communication-donts-list');
    dontsList.innerHTML = data.donts.map(item => `<li>${item}</li>`).join('');
}

// Update the main load function to include additional pages
const originalPopulateNewPages = populateNewPages;
populateNewPages = function() {
    originalPopulateNewPages();
    populateAdditionalPages();
};


// Relationships & Work data for each type
const relationshipsWorkData = {
    'INTJ': {
        romantic: ['Values intellectual connection', 'Shows love through problem-solving', 'Needs independence in relationships', 'May struggle with emotional expression'],
        friendships: ['Prefers few deep friendships', 'Values intellectual discussions', 'Loyal but selective', 'May seem distant initially'],
        colleague: ['Focuses on competence and results', 'Prefers autonomy in work', 'Challenges inefficiency', 'Values expertise'],
        manager: ['Sets high standards', 'Delegates strategically', 'Focuses on long-term vision', 'May seem demanding']
    },
    'ENTJ': {
        romantic: ['Direct and honest in relationships', 'Takes charge naturally', 'Values ambition in partners', 'May prioritize career'],
        friendships: ['Enjoys goal-oriented activities', 'Appreciates intellectual equals', 'Can be competitive', 'Loyal to close friends'],
        colleague: ['Drives projects forward', 'Expects high performance', 'Communicates directly', 'Takes initiative'],
        manager: ['Leads decisively', 'Focuses on efficiency', 'Develops talent strategically', 'Sets clear expectations']
    },
    'INTP': {
        romantic: ['Values intellectual compatibility', 'Needs personal space', 'Shows love through ideas', 'May seem emotionally detached'],
        friendships: ['Enjoys deep conversations', 'Prefers small groups', 'Loyal but independent', 'Shares interests selectively'],
        colleague: ['Solves complex problems', 'Questions assumptions', 'Works independently', 'Values logical thinking'],
        manager: ['Gives autonomy to team', 'Focuses on innovation', 'May avoid micromanaging', 'Appreciates competence']
    },
    'ENTP': {
        romantic: ['Keeps relationships exciting', 'Enjoys intellectual sparring', 'Needs variety and stimulation', 'May avoid routine'],
        friendships: ['Enjoys debating ideas', 'Brings energy to groups', 'Challenges friends intellectually', 'Keeps things interesting'],
        colleague: ['Generates innovative ideas', 'Challenges status quo', 'Adapts quickly', 'May jump between projects'],
        manager: ['Encourages creativity', 'Gives freedom to innovate', 'May lack follow-through', 'Inspires with vision']
    },
    'INFJ': {
        romantic: ['Deeply committed and loyal', 'Seeks meaningful connection', 'Intuitive about partner\'s needs', 'May idealize relationships'],
        friendships: ['Forms deep, lasting bonds', 'Listens empathetically', 'Selective about friendships', 'Offers wise counsel'],
        colleague: ['Works with purpose', 'Supports team harmony', 'Contributes creative insights', 'Values meaningful work'],
        manager: ['Develops people holistically', 'Creates supportive environment', 'Leads with vision', 'May avoid conflict']
    },
    'ENFJ': {
        romantic: ['Warm and expressive', 'Attentive to partner\'s needs', 'Creates harmony', 'May neglect own needs'],
        friendships: ['Brings people together', 'Supportive and encouraging', 'Maintains many connections', 'Remembers important details'],
        colleague: ['Facilitates collaboration', 'Motivates team members', 'Communicates effectively', 'Builds strong relationships'],
        manager: ['Inspires and develops team', 'Creates positive culture', 'Provides mentorship', 'May take on too much']
    },
    'INFP': {
        romantic: ['Deeply romantic and idealistic', 'Values authenticity', 'Loyal and committed', 'May avoid conflict'],
        friendships: ['Forms deep connections', 'Accepts friends as they are', 'Offers emotional support', 'Needs alone time'],
        colleague: ['Works with personal values', 'Contributes creative ideas', 'Supports team harmony', 'Needs meaningful work'],
        manager: ['Leads with empathy', 'Encourages individual growth', 'Creates supportive environment', 'May avoid tough decisions']
    },
    'ENFP': {
        romantic: ['Enthusiastic and affectionate', 'Keeps relationships exciting', 'Values deep connection', 'May idealize partners'],
        friendships: ['Makes friends easily', 'Brings energy and fun', 'Supports friends\' dreams', 'Maintains many connections'],
        colleague: ['Generates creative ideas', 'Energizes team', 'Builds relationships', 'May struggle with routine'],
        manager: ['Inspires with enthusiasm', 'Encourages innovation', 'Supports team development', 'May lack structure']
    },
    'ISTJ': {
        romantic: ['Reliable and committed', 'Shows love through actions', 'Values tradition', 'May struggle with spontaneity'],
        friendships: ['Loyal and dependable', 'Prefers established friendships', 'Practical and helpful', 'May seem reserved'],
        colleague: ['Thorough and reliable', 'Follows procedures', 'Meets deadlines consistently', 'Values accuracy'],
        manager: ['Establishes clear processes', 'Ensures accountability', 'Leads by example', 'Maintains standards']
    },
    'ESTJ': {
        romantic: ['Traditional and committed', 'Takes relationships seriously', 'Provides stability', 'May be inflexible'],
        friendships: ['Organizes social activities', 'Loyal to long-term friends', 'Practical and helpful', 'Values tradition'],
        colleague: ['Organizes work efficiently', 'Ensures tasks are completed', 'Follows established procedures', 'Takes charge'],
        manager: ['Implements structure', 'Enforces standards', 'Makes quick decisions', 'Focuses on results']
    },
    'ISFJ': {
        romantic: ['Devoted and caring', 'Remembers important details', 'Creates stable home life', 'May be overly selfless'],
        friendships: ['Loyal and supportive', 'Remembers special occasions', 'Helps friends practically', 'Maintains long friendships'],
        colleague: ['Supports team needs', 'Attends to details', 'Works reliably', 'Maintains harmony'],
        manager: ['Supports team members', 'Creates stable environment', 'Leads by serving', 'May avoid conflict']
    },
    'ESFJ': {
        romantic: ['Warm and affectionate', 'Creates harmonious home', 'Attentive to partner\'s needs', 'Values commitment'],
        friendships: ['Maintains many friendships', 'Organizes gatherings', 'Remembers details', 'Provides emotional support'],
        colleague: ['Facilitates team cooperation', 'Maintains positive atmosphere', 'Helps colleagues', 'Values harmony'],
        manager: ['Creates supportive culture', 'Recognizes contributions', 'Maintains team morale', 'May avoid tough decisions']
    },
    'ISTP': {
        romantic: ['Shows love through practical help and shared activities', 'Values freedom and personal space in relationships', 'May find emotional discussions uncomfortable or confusing'],
        friendships: ['Enjoys friends who share hobbies or adventures', 'Prefers "doing things together" rather than long emotional talks', 'Can disappear for a while and then return as if no time has passed'],
        colleague: ['Good at dealing with urgent, practical problems', 'Prefers flexibility over rigid schedules', 'May dislike excessive meetings or bureaucracy'],
        manager: ['Leads by example and competence', 'Gives team members a lot of autonomy', 'May overlook emotional or interpersonal tensions']
    },
    'ESTP': {
        romantic: ['Fun and spontaneous', 'Keeps relationships exciting', 'Shows love through experiences', 'May avoid serious talks'],
        friendships: ['Life of the party', 'Enjoys active adventures', 'Makes friends easily', 'Keeps things light'],
        colleague: ['Takes immediate action', 'Handles crises well', 'Negotiates effectively', 'May resist planning'],
        manager: ['Leads through action', 'Makes quick decisions', 'Adapts to situations', 'May lack long-term planning']
    },
    'ISFP': {
        romantic: ['Gentle and caring', 'Expresses love through actions', 'Values harmony', 'Needs personal space'],
        friendships: ['Loyal and accepting', 'Enjoys shared activities', 'Avoids conflict', 'Appreciates authenticity'],
        colleague: ['Works harmoniously', 'Contributes creatively', 'Adapts to needs', 'Prefers flexibility'],
        manager: ['Leads gently', 'Respects individual styles', 'Creates peaceful environment', 'May avoid confrontation']
    },
    'ESFP': {
        romantic: ['Affectionate and fun-loving', 'Creates joyful experiences', 'Lives in the moment', 'May avoid serious planning'],
        friendships: ['Makes everyone feel included', 'Brings energy and fun', 'Remembers to celebrate', 'Maintains many friendships'],
        colleague: ['Energizes workplace', 'Builds team spirit', 'Handles people well', 'May struggle with routine'],
        manager: ['Creates fun environment', 'Motivates through enthusiasm', 'Recognizes contributions', 'May lack structure']
    }
};

// Career detail data for top match
const careerDetailData = {
    'INTJ': {
        title: 'Software Architect',
        compatibility: 95,
        overview: 'Designs complex software systems and technical solutions.',
        whyFits: 'Matches strategic thinkers who excel at system design and long-term planning.',
        environment: 'Tech companies, startups, remote work.',
        growthPath: 'Developer → Senior Architect → CTO',
        skills: ['System Design', 'Strategic Planning', 'Technical Leadership', 'Problem Solving']
    },
    'ENTJ': {
        title: 'CEO / Executive',
        compatibility: 95,
        overview: 'Leads organizations and drives strategic business growth.',
        whyFits: 'Perfect for natural leaders who excel at organizing and directing teams.',
        environment: 'Corporations, startups, consulting firms.',
        growthPath: 'Manager → Director → VP → CEO',
        skills: ['Leadership', 'Strategic Planning', 'Decision Making', 'Business Development']
    },
    'INTP': {
        title: 'Software Developer',
        compatibility: 94,
        overview: 'Creates innovative software solutions and applications.',
        whyFits: 'Ideal for analytical thinkers who enjoy solving complex problems.',
        environment: 'Tech companies, research labs, remote work.',
        growthPath: 'Junior Dev → Senior Dev → Tech Lead',
        skills: ['Programming', 'Problem Solving', 'System Analysis', 'Innovation']
    },
    'ENTP': {
        title: 'Innovation Manager',
        compatibility: 93,
        overview: 'Drives creative solutions and new product development.',
        whyFits: 'Perfect for creative thinkers who challenge conventional approaches.',
        environment: 'Startups, innovation labs, consulting.',
        growthPath: 'Analyst → Innovation Lead → Chief Innovation Officer',
        skills: ['Creative Thinking', 'Strategy', 'Communication', 'Change Management']
    },
    'INFJ': {
        title: 'Counselor / Therapist',
        compatibility: 94,
        overview: 'Guides individuals through personal growth and challenges.',
        whyFits: 'Ideal for empathetic individuals with deep insight into people.',
        environment: 'Private practice, clinics, schools.',
        growthPath: 'Intern → Licensed Counselor → Practice Owner',
        skills: ['Empathy', 'Active Listening', 'Insight', 'Communication']
    },
    'ENFJ': {
        title: 'Teacher / Professor',
        compatibility: 95,
        overview: 'Educates and inspires students to reach their potential.',
        whyFits: 'Perfect for natural mentors who excel at developing others.',
        environment: 'Schools, universities, training centers.',
        growthPath: 'Teacher → Department Head → Principal',
        skills: ['Teaching', 'Communication', 'Mentorship', 'Organization']
    },
    'INFP': {
        title: 'Creative Writer',
        compatibility: 93,
        overview: 'Creates meaningful content through various writing forms.',
        whyFits: 'Ideal for authentic individuals who express through creativity.',
        environment: 'Freelance, publishing, remote work.',
        growthPath: 'Writer → Published Author → Editor',
        skills: ['Writing', 'Creativity', 'Storytelling', 'Editing']
    },
    'ENFP': {
        title: 'Brand Manager',
        compatibility: 94,
        overview: 'Builds and manages brand identity and marketing strategies.',
        whyFits: 'Perfect for creative communicators who connect with people.',
        environment: 'Marketing agencies, corporations, startups.',
        growthPath: 'Coordinator → Brand Manager → Marketing Director',
        skills: ['Creativity', 'Communication', 'Strategy', 'People Skills']
    },
    'ISTJ': {
        title: 'Accountant',
        compatibility: 95,
        overview: 'Manages financial records and ensures accuracy.',
        whyFits: 'Ideal for detail-oriented individuals who value precision.',
        environment: 'Accounting firms, corporations, government.',
        growthPath: 'Staff Accountant → Senior Accountant → CFO',
        skills: ['Attention to Detail', 'Analysis', 'Organization', 'Compliance']
    },
    'ESTJ': {
        title: 'Operations Director',
        compatibility: 94,
        overview: 'Manages business operations and ensures efficiency.',
        whyFits: 'Perfect for organized leaders who excel at implementation.',
        environment: 'Corporations, manufacturing, logistics.',
        growthPath: 'Manager → Operations Director → COO',
        skills: ['Management', 'Organization', 'Efficiency', 'Leadership']
    },
    'ISFJ': {
        title: 'Nurse',
        compatibility: 95,
        overview: 'Provides compassionate patient care and support.',
        whyFits: 'Ideal for caring individuals who help others practically.',
        environment: 'Hospitals, clinics, home healthcare.',
        growthPath: 'RN → Charge Nurse → Nurse Manager',
        skills: ['Caregiving', 'Attention to Detail', 'Empathy', 'Reliability']
    },
    'ESFJ': {
        title: 'Event Planner',
        compatibility: 94,
        overview: 'Organizes and coordinates memorable events.',
        whyFits: 'Perfect for social organizers who bring people together.',
        environment: 'Event companies, hotels, freelance.',
        growthPath: 'Coordinator → Event Manager → Director',
        skills: ['Organization', 'Communication', 'Coordination', 'People Skills']
    },
    'ISTP': {
        title: 'Technical Entrepreneur',
        compatibility: 83,
        overview: 'Builds and manages technology-driven businesses or products.',
        whyFits: 'This role matches your profile due to the following factors observed during the assessment: Fits independent thinkers who enjoy building solutions from scratch.',
        environment: 'Startups, innovation hubs, remote environments.',
        growthPath: 'Founder → Scale-up Leader → Serial Entrepreneur',
        skills: ['Innovation', 'Technical expertise', 'Business strategy', 'Risk management']
    },
    'ESTP': {
        title: 'Entrepreneur',
        compatibility: 95,
        overview: 'Starts and grows businesses through action and opportunity.',
        whyFits: 'Perfect for risk-takers who thrive on action and results.',
        environment: 'Startups, sales, real estate.',
        growthPath: 'Founder → Business Owner → Serial Entrepreneur',
        skills: ['Risk Taking', 'Negotiation', 'Sales', 'Adaptability']
    },
    'ISFP': {
        title: 'Artist / Designer',
        compatibility: 94,
        overview: 'Creates visual art and aesthetic experiences.',
        whyFits: 'Ideal for creative individuals with strong aesthetic sense.',
        environment: 'Studios, freelance, galleries.',
        growthPath: 'Artist → Established Artist → Gallery Owner',
        skills: ['Creativity', 'Artistic Skill', 'Aesthetics', 'Expression']
    },
    'ESFP': {
        title: 'Entertainer / Performer',
        compatibility: 95,
        overview: 'Performs and engages audiences through entertainment.',
        whyFits: 'Perfect for spontaneous individuals who love the spotlight.',
        environment: 'Entertainment industry, events, media.',
        growthPath: 'Performer → Featured Artist → Producer',
        skills: ['Performance', 'Charisma', 'Spontaneity', 'Energy']
    }
};

// Populate final pages
function populateFinalPages() {
    console.log('populateFinalPages called');
    
    // Update personality badges
    const finalBadgeIds = [
        'page12-personality-type', 'page13-personality-type', 'page14-personality-type',
        'page15-personality-type', 'page16-personality-type', 'page17-personality-type'
    ];
    
    finalBadgeIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = personalityType;
        }
    });
    
    // Page 12: Relationships & Work
    populateRelationshipsWork();
    
    // Page 13: Career Matches
    populateCareerMatches();
    
    // Page 14: Career Detail
    populateCareerDetail();
    
    // Page 15: Locked Career
    populateLockedCareer();
}

function populateRelationshipsWork() {
    console.log('populateRelationshipsWork called for:', personalityType);
    const data = relationshipsWorkData[personalityType] || relationshipsWorkData['ENFP'];
    
    console.log('Relationships data:', data);
    
    const romanticList = document.getElementById('romantic-style-list');
    const friendshipsList = document.getElementById('friendships-list');
    const colleagueList = document.getElementById('colleague-list');
    const managerList = document.getElementById('manager-list');
    
    if (romanticList) {
        romanticList.innerHTML = data.romantic.map(item => `<li>${item}</li>`).join('');
        console.log('Romantic style populated');
    } else {
        console.error('romantic-style-list element not found!');
    }
    
    if (friendshipsList) {
        friendshipsList.innerHTML = data.friendships.map(item => `<li>${item}</li>`).join('');
        console.log('Friendships populated');
    } else {
        console.error('friendships-list element not found!');
    }
    
    if (colleagueList) {
        colleagueList.innerHTML = data.colleague.map(item => `<li>${item}</li>`).join('');
        console.log('Colleague populated');
    } else {
        console.error('colleague-list element not found!');
    }
    
    if (managerList) {
        managerList.innerHTML = data.manager.map(item => `<li>${item}</li>`).join('');
        console.log('Manager populated');
    } else {
        console.error('manager-list element not found!');
    }
    
    // Update summary based on type
    const summaries = {
        'INTJ': 'Your relationship style remains consistent — strategic, independent, and competence-focused — across personal and professional life.',
        'ENTJ': 'Your relationship style remains consistent — direct, goal-oriented, and leadership-focused — across personal and professional life.',
        'INTP': 'Your relationship style remains consistent — analytical, independent, and intellectually-focused — across personal and professional life.',
        'ENTP': 'Your relationship style remains consistent — innovative, challenging, and intellectually-stimulating — across personal and professional life.',
        'INFJ': 'Your relationship style remains consistent — insightful, meaningful, and purpose-driven — across personal and professional life.',
        'ENFJ': 'Your relationship style remains consistent — warm, supportive, and people-focused — across personal and professional life.',
        'INFP': 'Your relationship style remains consistent — authentic, empathetic, and values-driven — across personal and professional life.',
        'ENFP': 'Your relationship style remains consistent — enthusiastic, creative, and connection-focused — across personal and professional life.',
        'ISTJ': 'Your relationship style remains consistent — reliable, traditional, and duty-focused — across personal and professional life.',
        'ESTJ': 'Your relationship style remains consistent — organized, practical, and results-focused — across personal and professional life.',
        'ISFJ': 'Your relationship style remains consistent — caring, supportive, and service-oriented — across personal and professional life.',
        'ESFJ': 'Your relationship style remains consistent — warm, harmonious, and people-focused — across personal and professional life.',
        'ISTP': 'Your relationship style remains consistent — practical, independent, and action-oriented — across personal and professional life.',
        'ESTP': 'Your relationship style remains consistent — energetic, spontaneous, and action-focused — across personal and professional life.',
        'ISFP': 'Your relationship style remains consistent — gentle, authentic, and harmony-seeking — across personal and professional life.',
        'ESFP': 'Your relationship style remains consistent — fun-loving, spontaneous, and people-focused — across personal and professional life.'
    };
    
    const summaryElement = document.getElementById('relationship-summary');
    if (summaryElement) {
        summaryElement.textContent = summaries[personalityType] || summaries['ENFP'];
        console.log('Relationship summary populated');
    } else {
        console.error('relationship-summary element not found!');
    }
}

function populateCareerMatches() {
    const careers = careerMappings[personalityType] || careerMappings['ENFP'];
    const topCareers = careers.slice(0, 5);
    const container = document.getElementById('career-match-bars');
    container.innerHTML = '';
    
    topCareers.forEach((career, index) => {
        const item = document.createElement('div');
        item.className = 'career-match-item';
        item.innerHTML = `
            <div class="career-match-header">
                <span class="career-match-title">${career.title}</span>
                <span class="career-match-percentage">${career.match}% Compatibility</span>
            </div>
            <div class="career-match-bar-bg">
                <div class="career-match-bar-fill" style="width: 0%; transition-delay: ${index * 0.1}s;"></div>
            </div>
        `;
        container.appendChild(item);
        
        setTimeout(() => {
            const fill = item.querySelector('.career-match-bar-fill');
            fill.style.width = career.match + '%';
        }, 400 + (index * 100));
    });
}

function populateCareerDetail() {
    const detail = careerDetailData[personalityType] || careerDetailData['ISTP'];
    
    document.getElementById('career-detail-title').textContent = detail.title;
    document.getElementById('career-confidence-label').textContent = `${detail.compatibility}% Compatibility Match`;
    document.getElementById('career-confidence-percentage').textContent = `${detail.compatibility}%`;
    
    setTimeout(() => {
        document.getElementById('career-confidence-fill').style.width = detail.compatibility + '%';
    }, 500);
    
    document.getElementById('career-overview').textContent = detail.overview;
    document.getElementById('career-why-fits').textContent = detail.whyFits;
    document.getElementById('career-environment').textContent = detail.environment;
    document.getElementById('career-growth-path').textContent = detail.growthPath;
    
    const skillsContainer = document.getElementById('career-skills-tags');
    skillsContainer.innerHTML = detail.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
}

function populateLockedCareer() {
    const careers = careerMappings[personalityType] || careerMappings['ENFP'];
    const secondCareer = careers[1];
    
    document.getElementById('career-locked-title').textContent = secondCareer.title;
    document.getElementById('career-locked-subtitle').textContent = `${secondCareer.match}% Compatibility`;
    document.getElementById('career-locked-message').textContent = `Upgrade to view full analysis for ${secondCareer.title}`;
}

// Update main populate function
const originalPopulateAdditionalPages = populateAdditionalPages;
populateAdditionalPages = function() {
    originalPopulateAdditionalPages();
    populateFinalPages();
};


// ============================================
// IMMEDIATE EXECUTION - FORCE UPDATE ON LOAD
// ============================================
console.log('=== IMMEDIATE EXECUTION STARTED ===');

// Function to force update all content immediately
function forceUpdateAllContent() {
    console.log('🔥 FORCE UPDATE ALL CONTENT 🔥');
    console.log('Current personality type:', personalityType);
    console.log('Session ID:', sessionId);
    
    // If we have a session, fetch scores and recalculate
    if (sessionId) {
        fetch(`${API_BASE_URL}/result/${sessionId}/`)
            .then(response => response.json())
            .then(result => {
                console.log('Fetched assessment result:', result);
                
                const scores = {
                    e: result.e_score || 0,
                    i: result.i_score || 0,
                    s: result.s_score || 0,
                    n: result.n_score || 0,
                    t: result.t_score || 0,
                    f: result.f_score || 0,
                    j: result.j_score || 0,
                    p: result.p_score || 0
                };
                
                console.log('Scores:', scores);
                
                // Calculate personality type
                const calculatedType = calculatePersonalityTypeFromScores(scores);
                console.log('🎯 CALCULATED TYPE:', calculatedType);
                
                if (calculatedType) {
                    personalityType = calculatedType;
                    
                    // FORCE UPDATE EVERYTHING
                    console.log('🔄 FORCING UPDATES WITH TYPE:', personalityType);
                    
                    // Update all badges
                    updateAllPersonalityReferences(personalityType);
                    
                    // Update Page 4 content
                    const orientation = orientationData[personalityType] || 'Creative';
                    const opStyle = operationalStyleData[personalityType] || [];
                    const decFramework = decisionFrameworkData[personalityType] || [];
                    
                    console.log('Setting orientation to:', orientation);
                    console.log('Setting operational style:', opStyle);
                    
                    // Force update DOM elements
                    setTimeout(() => {
                        const domEl = document.getElementById('dominant-orientation');
                        const archEl = document.getElementById('archetype-type');
                        const coreEl = document.getElementById('core-advantage-text');
                        const opStyleEl = document.getElementById('operational-style');
                        const decFrameworkEl = document.getElementById('decision-framework');
                        
                        if (domEl) {
                            domEl.textContent = orientation;
                            domEl.style.color = 'red'; // Make it obvious it changed
                            domEl.style.fontWeight = 'bold';
                            console.log('✅ UPDATED dominant-orientation to:', orientation);
                        } else {
                            console.error('❌ dominant-orientation element NOT FOUND');
                        }
                        
                        if (archEl) {
                            archEl.textContent = personalityType;
                            archEl.style.color = 'red';
                            archEl.style.fontWeight = 'bold';
                            console.log('✅ UPDATED archetype-type to:', personalityType);
                        } else {
                            console.error('❌ archetype-type element NOT FOUND');
                        }
                        
                        if (coreEl) {
                            coreEl.textContent = `By combining your ${personalityType} capabilities with a ${orientation} orientation, you possess a unique ability to excel in your field.`;
                            console.log('✅ UPDATED core-advantage-text');
                        }
                        
                        if (opStyleEl) {
                            opStyleEl.innerHTML = opStyle.map(item => `<li>${item}</li>`).join('');
                            console.log('✅ UPDATED operational-style');
                        }
                        
                        if (decFrameworkEl) {
                            decFrameworkEl.innerHTML = decFramework.map(item => `<li>${item}</li>`).join('');
                            console.log('✅ UPDATED decision-framework');
                        }
                        
                        // ===== PAGE 3: INTEREST REPORT =====
                        console.log('🔄 Updating Page 3: Interest Report');
                        const interests = interestData[personalityType] || interestData['ENFP'];
                        const interestContainer = document.getElementById('interest-bars');
                        
                        if (interestContainer) {
                            interestContainer.innerHTML = '';
                            interests.forEach((interest, index) => {
                                const bar = document.createElement('div');
                                bar.className = 'interest-bar';
                                bar.innerHTML = `
                                    <div class="interest-info">
                                        <span class="interest-name" style="font-weight: bold; color: #111;">${interest.name}</span>
                                        <span class="interest-percentage" style="font-weight: bold; color: #666;">${interest.score}%</span>
                                    </div>
                                    <div class="interest-bar-bg">
                                        <div class="interest-bar-fill" style="width: ${interest.score}%;"></div>
                                    </div>
                                `;
                                interestContainer.appendChild(bar);
                            });
                            console.log('✅ UPDATED interest-bars with', interests.length, 'items for', personalityType);
                            console.log('Interest areas:', interests.map(i => i.name).join(', '));
                        } else {
                            console.error('❌ interest-bars element NOT FOUND');
                        }
                        
                        // ===== PAGE 5: CURIOSITIES & FACTS =====
                        console.log('🔄 Updating Page 5: Curiosities & Facts');
                        const curiosities = curiositiesData[personalityType] || curiositiesData['ENFP'];
                        const curiosityContainer = document.getElementById('curiosity-cards');
                        const curiositySubtitle = document.getElementById('curiosities-subtitle');
                        const didYouKnowEl = document.getElementById('did-you-know-text');
                        
                        if (curiositySubtitle) {
                            curiositySubtitle.textContent = `Interesting insights about the ${personalityType} personality type.`;
                            curiositySubtitle.style.color = 'red';
                            console.log('✅ UPDATED curiosities-subtitle');
                        }
                        
                        if (curiosityContainer) {
                            curiosityContainer.innerHTML = '';
                            curiosities.forEach((curiosity, index) => {
                                const card = document.createElement('div');
                                card.className = 'curiosity-card';
                                card.innerHTML = `
                                    <div class="curiosity-icon">${['💡', '🎯', '🌟', '✨'][index]}</div>
                                    <div class="curiosity-text">${curiosity}</div>
                                `;
                                curiosityContainer.appendChild(card);
                            });
                            console.log('✅ UPDATED curiosity-cards with', curiosities.length, 'items');
                        }
                        
                        if (didYouKnowEl) {
                            const didYouKnow = didYouKnowData[personalityType] || didYouKnowData['ENFP'];
                            didYouKnowEl.textContent = didYouKnow;
                            didYouKnowEl.style.color = '#FFD84D';
                            console.log('✅ UPDATED did-you-know-text');
                        }
                        
                        // ===== PAGE 6: PERSONALITY DESCRIPTION =====
                        console.log('🔄 Updating Page 6: Personality Description');
                        const name = getPersonalityName(personalityType);
                        const category = getCategoryName(personalityType);
                        const metaphor = metaphorData[personalityType] || metaphorData['ISTP'];
                        const fullDesc = personalityDescriptions[personalityType] || personalityDescriptions['ENFP'];
                        
                        const categoryEmojis = {
                            'Analysts': '🧠',
                            'Diplomats': '🤝',
                            'Sentinels': '🛡️',
                            'Explorers': '🔧'
                        };
                        const emoji = categoryEmojis[category] || '🔧';
                        
                        const nameHeroEl = document.getElementById('personality-name-hero');
                        if (nameHeroEl) {
                            nameHeroEl.textContent = name + ' ' + emoji;
                            nameHeroEl.style.color = 'red';
                            console.log('✅ UPDATED personality-name-hero to:', name);
                        }
                        
                        const categoryEl = document.getElementById('personality-category');
                        if (categoryEl) {
                            categoryEl.textContent = category;
                            categoryEl.style.color = 'red';
                            console.log('✅ UPDATED personality-category to:', category);
                        }
                        
                        const codeBadgeEl = document.getElementById('personality-code-badge');
                        if (codeBadgeEl) {
                            codeBadgeEl.textContent = personalityType;
                            console.log('✅ UPDATED personality-code-badge');
                        }
                        
                        const fullDescEl = document.getElementById('personality-full-description');
                        if (fullDescEl) {
                            fullDescEl.innerHTML = `<p style="color: #333;">${fullDesc}</p>`;
                            console.log('✅ UPDATED personality-full-description');
                        }
                        
                        const traitsContainer = document.getElementById('personality-traits');
                        if (traitsContainer) {
                            traitsContainer.innerHTML = metaphor.traits.map(trait => `<span>${trait}</span>`).join('');
                            console.log('✅ UPDATED personality-traits');
                        }
                        
                        const metaphorNameEl = document.getElementById('metaphor-name');
                        if (metaphorNameEl) {
                            metaphorNameEl.textContent = metaphor.name;
                            metaphorNameEl.style.color = 'red';
                            console.log('✅ UPDATED metaphor-name to:', metaphor.name);
                        }
                        
                        const metaphorDescEl = document.getElementById('metaphor-description');
                        if (metaphorDescEl) {
                            metaphorDescEl.textContent = metaphor.desc;
                            console.log('✅ UPDATED metaphor-description');
                        }
                        
                        const trait1 = metaphor.traits[0].replace(/[^\w\s]/g, '').trim();
                        const trait2 = metaphor.traits[1].replace(/[^\w\s]/g, '').trim();
                        const trait3 = metaphor.traits[2].replace(/[^\w\s]/g, '').trim();
                        
                        const trait1El = document.getElementById('metaphor-trait-1');
                        if (trait1El) {
                            trait1El.textContent = trait1;
                            console.log('✅ UPDATED metaphor-trait-1');
                        }
                        
                        const trait2El = document.getElementById('metaphor-trait-2');
                        if (trait2El) {
                            trait2El.textContent = trait2;
                            console.log('✅ UPDATED metaphor-trait-2');
                        }
                        
                        const trait3El = document.getElementById('metaphor-trait-3');
                        if (trait3El) {
                            trait3El.textContent = trait3;
                            console.log('✅ UPDATED metaphor-trait-3');
                        }
                        
                        // ===== PAGE 7: WORKING ORIENTATION PROFILE =====
                        console.log('🔄 Updating Page 7: Working Orientation Profile');
                        const workingOrientations = workingOrientationData[personalityType] || workingOrientationData['ENFP'];
                        const orientationContainer = document.getElementById('orientation-bars');
                        
                        if (orientationContainer) {
                            orientationContainer.innerHTML = '';
                            workingOrientations.forEach((orientation, index) => {
                                const bar = document.createElement('div');
                                bar.className = 'orientation-bar-item';
                                
                                // Determine icon based on orientation name
                                const icons = {
                                    'Creative': '🎨',
                                    'Informative': '📚',
                                    'People': '👥',
                                    'Administrative': '📋',
                                    'Analytical': '🔬',
                                    'Leadership': '👔',
                                    'Practical': '🔧',
                                    'Social': '🤝'
                                };
                                const icon = icons[orientation.name] || '⚡';
                                
                                bar.innerHTML = `
                                    <div class="orientation-header">
                                        <span class="orientation-icon">${icon}</span>
                                        <span class="orientation-name" style="font-weight: bold; color: #111;">${orientation.name}</span>
                                        <span class="orientation-level" style="color: #666;">${orientation.level}</span>
                                    </div>
                                    <div class="orientation-bar-bg">
                                        <div class="orientation-bar-fill" style="width: ${orientation.score}%;">
                                            <span class="orientation-percentage">${orientation.score}%</span>
                                        </div>
                                    </div>
                                `;
                                orientationContainer.appendChild(bar);
                            });
                            console.log('✅ UPDATED orientation-bars with', workingOrientations.length, 'items for', personalityType);
                            console.log('Orientations:', workingOrientations.map(o => `${o.name} (${o.score}%)`).join(', '));
                        } else {
                            console.error('❌ orientation-bars element NOT FOUND');
                        }
                        
                        // ===== PAGE 9: TRAIT BREAKDOWN & STRENGTHS =====
                        console.log('🔄 Updating Page 9: Trait Breakdown & Strengths');
                        
                        // Update trait bars based on actual scores
                        const traitBarsContainer = document.getElementById('trait-bars-grid');
                        if (traitBarsContainer && scores) {
                            traitBarsContainer.innerHTML = '';
                            
                            const traits = [
                                { letter: 'E', score: scores.e, total: scores.e + scores.i },
                                { letter: 'I', score: scores.i, total: scores.e + scores.i },
                                { letter: 'S', score: scores.s, total: scores.s + scores.n },
                                { letter: 'N', score: scores.n, total: scores.s + scores.n },
                                { letter: 'T', score: scores.t, total: scores.t + scores.f },
                                { letter: 'F', score: scores.f, total: scores.t + scores.f },
                                { letter: 'J', score: scores.j, total: scores.j + scores.p },
                                { letter: 'P', score: scores.p, total: scores.j + scores.p }
                            ];
                            
                            traits.forEach(trait => {
                                const percentage = Math.round((trait.score / trait.total) * 100);
                                const bar = document.createElement('div');
                                bar.className = 'trait-bar-item';
                                bar.innerHTML = `
                                    <span class="trait-letter" style="font-weight: bold; color: #111;">${trait.letter}</span>
                                    <div class="trait-bar-container">
                                        <div class="trait-bar-fill-inner" style="width: ${percentage}%;"></div>
                                    </div>
                                    <span class="trait-percentage" style="font-weight: bold; color: #111;">${percentage}%</span>
                                `;
                                traitBarsContainer.appendChild(bar);
                            });
                            console.log('✅ UPDATED trait-bars-grid with actual scores');
                        }
                        
                        // Strengths and growth areas data for each type
                        const strengthsData = {
                            'INTJ': {
                                strengths: ['Strategic thinking and long-term planning', 'Independent and self-motivated', 'Logical and analytical problem-solving', 'High standards and competence'],
                                growth: ['May appear cold or insensitive', 'Can be overly critical', 'Difficulty expressing emotions', 'May dismiss others\' feelings']
                            },
                            'ENTJ': {
                                strengths: ['Natural leadership and decisiveness', 'Efficient and results-oriented', 'Strategic vision', 'Confident and assertive'],
                                growth: ['Can be domineering', 'May overlook people\'s feelings', 'Impatient with inefficiency', 'Can be too blunt']
                            },
                            'INTP': {
                                strengths: ['Innovative and creative thinking', 'Logical and analytical', 'Independent and objective', 'Love of learning'],
                                growth: ['May struggle with practical implementation', 'Can be socially awkward', 'Difficulty with routine tasks', 'May appear detached']
                            },
                            'ENTP': {
                                strengths: ['Quick-witted and innovative', 'Excellent debater', 'Adaptable and resourceful', 'Enthusiastic and energetic'],
                                growth: ['May struggle with follow-through', 'Can be argumentative', 'Difficulty with routine', 'May overlook details']
                            },
                            'INFJ': {
                                strengths: ['Deep insight into people', 'Idealistic and principled', 'Creative and visionary', 'Dedicated to helping others'],
                                growth: ['Can be perfectionistic', 'May take on too much responsibility', 'Difficulty setting boundaries', 'Can be overly sensitive']
                            },
                            'ENFJ': {
                                strengths: ['Charismatic and inspiring', 'Excellent communicator', 'Empathetic and caring', 'Natural teacher and mentor'],
                                growth: ['May neglect own needs', 'Can be overly idealistic', 'Difficulty with criticism', 'May be too trusting']
                            },
                            'INFP': {
                                strengths: ['Deeply empathetic and caring', 'Creative and imaginative', 'Authentic and genuine', 'Idealistic and values-driven'],
                                growth: ['May struggle with practical matters', 'Can be overly idealistic', 'Difficulty with criticism', 'May avoid conflict']
                            },
                            'ENFP': {
                                strengths: ['Energetic, enthusiastic, and inspiring', 'Highly creative and imaginative', 'Empathetic and good at reading emotions', 'Adaptable and open-minded'],
                                growth: ['May struggle with long-term follow-through', 'Can become scattered across too many interests', 'Takes criticism to heart', 'May avoid routine and structure even when needed']
                            },
                            'ISTJ': {
                                strengths: ['Reliable and responsible', 'Detail-oriented and thorough', 'Practical and logical', 'Strong sense of duty'],
                                growth: ['Can be inflexible', 'May resist change', 'Difficulty expressing emotions', 'Can be too focused on rules']
                            },
                            'ESTJ': {
                                strengths: ['Organized and efficient', 'Direct and honest', 'Strong work ethic', 'Natural administrator'],
                                growth: ['Can be rigid and inflexible', 'May be insensitive to feelings', 'Difficulty with change', 'Can be too controlling']
                            },
                            'ISFJ': {
                                strengths: ['Caring and supportive', 'Reliable and loyal', 'Detail-oriented', 'Practical and grounded'],
                                growth: ['May neglect own needs', 'Can be too selfless', 'Difficulty with change', 'May avoid conflict']
                            },
                            'ESFJ': {
                                strengths: ['Warm and caring', 'Organized and responsible', 'Strong social skills', 'Loyal and dedicated'],
                                growth: ['May be too concerned with others\' opinions', 'Can be inflexible', 'Difficulty with criticism', 'May be too controlling']
                            },
                            'ISTP': {
                                strengths: ['Practical and hands-on', 'Calm under pressure', 'Logical and analytical', 'Adaptable and flexible'],
                                growth: ['May appear detached', 'Difficulty with long-term planning', 'Can be insensitive', 'May avoid emotional expression']
                            },
                            'ESTP': {
                                strengths: ['Action-oriented and energetic', 'Adaptable and resourceful', 'Practical problem-solver', 'Charismatic and persuasive'],
                                growth: ['May be impulsive', 'Difficulty with long-term planning', 'Can be insensitive', 'May take unnecessary risks']
                            },
                            'ISFP': {
                                strengths: ['Creative and artistic', 'Gentle and caring', 'Flexible and spontaneous', 'Strong aesthetic sense'],
                                growth: ['May avoid conflict', 'Difficulty with long-term planning', 'Can be overly sensitive', 'May struggle with criticism']
                            },
                            'ESFP': {
                                strengths: ['Enthusiastic and fun-loving', 'Practical and observant', 'Warm and caring', 'Spontaneous and flexible'],
                                growth: ['May avoid serious issues', 'Difficulty with long-term planning', 'Can be impulsive', 'May seek too much attention']
                            }
                        };
                        
                        const typeStrengths = strengthsData[personalityType] || strengthsData['ENFP'];
                        
                        const strengthsList = document.getElementById('strengths-list');
                        if (strengthsList) {
                            strengthsList.innerHTML = typeStrengths.strengths.map(s => `<li>${s}</li>`).join('');
                            console.log('✅ UPDATED strengths-list');
                        }
                        
                        const growthList = document.getElementById('growth-areas-list');
                        if (growthList) {
                            growthList.innerHTML = typeStrengths.growth.map(g => `<li>${g}</li>`).join('');
                            console.log('✅ UPDATED growth-areas-list');
                        }
                        
                        // ===== PAGE 11: COMMUNICATION STYLE =====
                        console.log('🔄 Updating Page 11: Communication Style');
                        
                        const communicationData = {
                            'INTJ': {
                                traits: ['Direct and concise', 'Prefers written communication', 'Focuses on logic and efficiency'],
                                dos: ['Be clear and logical', 'Respect their need for independence'],
                                donts: ['Don\'t waste their time with small talk', 'Don\'t be overly emotional']
                            },
                            'ENTJ': {
                                traits: ['Direct and assertive', 'Goal-oriented communication', 'Confident and commanding'],
                                dos: ['Be efficient and organized', 'Present clear action plans'],
                                donts: ['Don\'t be vague or indecisive', 'Don\'t take too long to get to the point']
                            },
                            'INTP': {
                                traits: ['Analytical and precise', 'Enjoys intellectual debates', 'May seem detached'],
                                dos: ['Engage in logical discussions', 'Give them time to think'],
                                donts: ['Don\'t appeal to emotions over logic', 'Don\'t rush their thinking process']
                            },
                            'ENTP': {
                                traits: ['Witty and engaging', 'Loves debating ideas', 'Quick-thinking and spontaneous'],
                                dos: ['Engage in intellectual banter', 'Be open to new ideas'],
                                donts: ['Don\'t be rigid or closed-minded', 'Don\'t take debates personally']
                            },
                            'INFJ': {
                                traits: ['Deep and meaningful', 'Empathetic listener', 'Values authenticity'],
                                dos: ['Be genuine and sincere', 'Listen actively'],
                                donts: ['Don\'t be superficial', 'Don\'t dismiss their insights']
                            },
                            'ENFJ': {
                                traits: ['Warm and encouraging', 'Excellent listener', 'Inspiring and motivational'],
                                dos: ['Be open and honest', 'Show appreciation'],
                                donts: ['Don\'t be cold or dismissive', 'Don\'t criticize harshly']
                            },
                            'INFP': {
                                traits: ['Thoughtful and authentic', 'Values deep connections', 'Gentle and considerate'],
                                dos: ['Be genuine and kind', 'Respect their values'],
                                donts: ['Don\'t be harsh or critical', 'Don\'t dismiss their feelings']
                            },
                            'ENFP': {
                                traits: ['Expressive, enthusiastic, and story-driven', 'Enjoys exploring many angles of a topic at once', 'Uses humor and empathy to connect with others'],
                                dos: ['Be direct and clear', 'Focus on the big picture'],
                                donts: ['Don\'t get lost in excessive details', 'Don\'t take feedback personally']
                            },
                            'ISTJ': {
                                traits: ['Clear and factual', 'Prefers structured communication', 'Reliable and consistent'],
                                dos: ['Be organized and prepared', 'Stick to facts'],
                                donts: ['Don\'t be vague or disorganized', 'Don\'t change plans suddenly']
                            },
                            'ESTJ': {
                                traits: ['Direct and practical', 'Efficient communicator', 'Values clarity and order'],
                                dos: ['Be clear and concise', 'Follow through on commitments'],
                                donts: ['Don\'t be disorganized', 'Don\'t challenge authority without reason']
                            },
                            'ISFJ': {
                                traits: ['Warm and supportive', 'Attentive listener', 'Prefers harmony'],
                                dos: ['Be considerate and respectful', 'Show appreciation'],
                                donts: ['Don\'t be confrontational', 'Don\'t dismiss traditions']
                            },
                            'ESFJ': {
                                traits: ['Friendly and sociable', 'Values harmony', 'Attentive to others\' needs'],
                                dos: ['Be warm and appreciative', 'Maintain social harmony'],
                                donts: ['Don\'t be cold or critical', 'Don\'t ignore social norms']
                            },
                            'ISTP': {
                                traits: ['Brief and to the point', 'Action-oriented', 'Prefers practical communication'],
                                dos: ['Be direct and practical', 'Give them space'],
                                donts: ['Don\'t be overly emotional', 'Don\'t micromanage']
                            },
                            'ESTP': {
                                traits: ['Energetic and engaging', 'Direct and straightforward', 'Prefers action over words'],
                                dos: ['Be direct and energetic', 'Keep it practical'],
                                donts: ['Don\'t be overly theoretical', 'Don\'t waste time']
                            },
                            'ISFP': {
                                traits: ['Gentle and considerate', 'Expresses through actions', 'Values authenticity'],
                                dos: ['Be kind and respectful', 'Give them space'],
                                donts: ['Don\'t be pushy or aggressive', 'Don\'t criticize harshly']
                            },
                            'ESFP': {
                                traits: ['Enthusiastic and fun', 'Engaging storyteller', 'Warm and friendly'],
                                dos: ['Be positive and energetic', 'Keep it light and fun'],
                                donts: ['Don\'t be too serious', 'Don\'t criticize publicly']
                            }
                        };
                        
                        const commStyle = communicationData[personalityType] || communicationData['ENFP'];
                        
                        const commTraitsList = document.getElementById('communication-traits-list');
                        if (commTraitsList) {
                            commTraitsList.innerHTML = commStyle.traits.map(t => `<li>${t}</li>`).join('');
                            console.log('✅ UPDATED communication-traits-list');
                        }
                        
                        const commDosList = document.getElementById('communication-dos-list');
                        if (commDosList) {
                            commDosList.innerHTML = commStyle.dos.map(d => `<li>${d}</li>`).join('');
                            console.log('✅ UPDATED communication-dos-list');
                        }
                        
                        const commDontsList = document.getElementById('communication-donts-list');
                        if (commDontsList) {
                            commDontsList.innerHTML = commStyle.donts.map(d => `<li>${d}</li>`).join('');
                            console.log('✅ UPDATED communication-donts-list');
                        }
                        
                        // ===== PAGE 12: RELATIONSHIPS & WORK =====
                        console.log('🔄 Updating Page 12: Relationships & Work');
                        
                        const relationshipsData = {
                            'INTJ': {
                                romantic: ['Values intellectual connection', 'Loyal and committed', 'May struggle with emotional expression'],
                                friendships: ['Prefers few deep friendships', 'Values intellectual discussions', 'Selective about social time'],
                                colleague: ['Independent and self-directed', 'Focuses on competence', 'May seem aloof or distant'],
                                manager: ['Sets high standards', 'Delegates effectively', 'Focuses on long-term strategy'],
                                summary: 'strategic, independent, and competence-focused'
                            },
                            'ENTJ': {
                                romantic: ['Direct and honest', 'Takes relationships seriously', 'May prioritize career over romance'],
                                friendships: ['Values ambitious friends', 'Enjoys intellectual debates', 'Takes leadership role'],
                                colleague: ['Efficient and results-driven', 'Takes charge naturally', 'May be seen as domineering'],
                                manager: ['Decisive and strategic', 'Expects high performance', 'Provides clear direction'],
                                summary: 'decisive, ambitious, and leadership-oriented'
                            },
                            'INTP': {
                                romantic: ['Values intellectual compatibility', 'Needs independence', 'May be emotionally reserved'],
                                friendships: ['Enjoys deep philosophical talks', 'Prefers small groups', 'Values authenticity'],
                                colleague: ['Innovative problem-solver', 'Works best independently', 'May challenge conventional methods'],
                                manager: ['Flexible and open-minded', 'Encourages innovation', 'May struggle with routine management'],
                                summary: 'analytical, independent, and innovation-focused'
                            },
                            'ENTP': {
                                romantic: ['Playful and spontaneous', 'Enjoys intellectual sparring', 'May avoid emotional depth'],
                                friendships: ['Wide social circle', 'Enjoys debating ideas', 'Brings energy and humor'],
                                colleague: ['Generates creative solutions', 'Challenges status quo', 'May lose interest in routine'],
                                manager: ['Inspires innovation', 'Flexible and adaptable', 'May lack follow-through'],
                                summary: 'innovative, energetic, and debate-loving'
                            },
                            'INFJ': {
                                romantic: ['Deeply committed and loyal', 'Seeks meaningful connection', 'May idealize partners'],
                                friendships: ['Few but deep friendships', 'Excellent listener', 'Needs alone time to recharge'],
                                colleague: ['Insightful and empathetic', 'Works well in teams', 'May take on too much'],
                                manager: ['Inspires through vision', 'Develops people', 'May avoid conflict'],
                                summary: 'insightful, empathetic, and vision-driven'
                            },
                            'ENFJ': {
                                romantic: ['Warm and supportive', 'Highly attentive to partner', 'May neglect own needs'],
                                friendships: ['Large social network', 'Natural counselor', 'Brings people together'],
                                colleague: ['Collaborative and supportive', 'Builds strong teams', 'Mediates conflicts'],
                                manager: ['Develops team potential', 'Creates positive culture', 'May avoid tough decisions'],
                                summary: 'warm, supportive, and people-focused'
                            },
                            'INFP': {
                                romantic: ['Deeply romantic and idealistic', 'Values authenticity', 'May have unrealistic expectations'],
                                friendships: ['Few close friendships', 'Loyal and supportive', 'Needs understanding and acceptance'],
                                colleague: ['Creative and flexible', 'Values harmony', 'May avoid conflict'],
                                manager: ['Supportive and encouraging', 'Values individual growth', 'May struggle with tough decisions'],
                                summary: 'thoughtful, values-driven, and purposeful'
                            },
                            'ENFP': {
                                romantic: ['Brings excitement, playfulness, and emotional warmth', 'Seeks a partner who supports exploration and personal growth', 'Can feel trapped in overly rigid or predictable relationships'],
                                friendships: ['Often the fun, uplifting friend everyone enjoys being around', 'Enjoys deep late-night talks about life and purpose', 'Needs understanding when they withdraw to recharge or refocus'],
                                colleague: ['Adds energy, creativity, and new perspectives', 'Enjoys brainstorming and collaborative work', 'May lose interest in highly repetitive tasks'],
                                manager: ['Motivates team members through encouragement and vision', 'Supports personal development and autonomy', 'May need systems to track details and deadlines'],
                                summary: 'enthusiastic, creative, and people-oriented'
                            },
                            'ISTJ': {
                                romantic: ['Reliable and committed', 'Shows love through actions', 'May struggle with spontaneity'],
                                friendships: ['Loyal and dependable', 'Prefers established friendships', 'Values tradition'],
                                colleague: ['Thorough and reliable', 'Follows procedures', 'Maintains high standards'],
                                manager: ['Clear and organized', 'Enforces rules fairly', 'Values consistency'],
                                summary: 'reliable, practical, and duty-focused'
                            },
                            'ESTJ': {
                                romantic: ['Traditional and committed', 'Takes responsibility seriously', 'May be inflexible'],
                                friendships: ['Loyal to established friends', 'Enjoys social activities', 'Values shared traditions'],
                                colleague: ['Efficient and organized', 'Takes charge of projects', 'Expects accountability'],
                                manager: ['Direct and decisive', 'Implements clear systems', 'Holds team accountable'],
                                summary: 'organized, direct, and responsibility-driven'
                            },
                            'ISFJ': {
                                romantic: ['Devoted and caring', 'Remembers important details', 'May be overly selfless'],
                                friendships: ['Loyal and supportive', 'Remembers special occasions', 'Prefers close-knit groups'],
                                colleague: ['Reliable and helpful', 'Maintains harmony', 'Attends to details'],
                                manager: ['Supportive and caring', 'Creates stable environment', 'May avoid confrontation'],
                                summary: 'caring, loyal, and service-oriented'
                            },
                            'ESFJ': {
                                romantic: ['Warm and attentive', 'Values commitment', 'May be overly concerned with approval'],
                                friendships: ['Large social circle', 'Organizes gatherings', 'Maintains connections'],
                                colleague: ['Cooperative and helpful', 'Builds team cohesion', 'Values harmony'],
                                manager: ['Creates positive atmosphere', 'Attentive to team needs', 'May avoid conflict'],
                                summary: 'warm, organized, and harmony-focused'
                            },
                            'ISTP': {
                                romantic: ['Independent and private', 'Shows love through actions', 'Needs personal space'],
                                friendships: ['Enjoys shared activities', 'Loyal but independent', 'Prefers action over talk'],
                                colleague: ['Practical problem-solver', 'Works independently', 'Calm in crises'],
                                manager: ['Hands-off approach', 'Focuses on results', 'May lack emotional connection'],
                                summary: 'practical, independent, and action-oriented'
                            },
                            'ESTP': {
                                romantic: ['Fun and spontaneous', 'Lives in the moment', 'May avoid commitment'],
                                friendships: ['Wide social circle', 'Life of the party', 'Enjoys adventures'],
                                colleague: ['Energetic and adaptable', 'Thrives under pressure', 'May take risks'],
                                manager: ['Dynamic and flexible', 'Leads by example', 'May lack long-term planning'],
                                summary: 'energetic, spontaneous, and action-focused'
                            },
                            'ISFP': {
                                romantic: ['Gentle and caring', 'Expresses love through actions', 'Values harmony'],
                                friendships: ['Loyal and supportive', 'Enjoys shared experiences', 'Needs acceptance'],
                                colleague: ['Flexible and cooperative', 'Creative contributor', 'Avoids conflict'],
                                manager: ['Supportive and flexible', 'Encourages creativity', 'May avoid confrontation'],
                                summary: 'gentle, creative, and harmony-seeking'
                            },
                            'ESFP': {
                                romantic: ['Fun and affectionate', 'Lives in the moment', 'Brings joy and excitement'],
                                friendships: ['Large social network', 'Brings energy and fun', 'Always ready for adventure'],
                                colleague: ['Energetic and engaging', 'Builds team morale', 'Makes work enjoyable'],
                                manager: ['Creates fun atmosphere', 'Motivates through enthusiasm', 'May lack structure'],
                                summary: 'fun-loving, spontaneous, and people-focused'
                            }
                        };
                        
                        const relData = relationshipsData[personalityType] || relationshipsData['ENFP'];
                        
                        const romanticList = document.getElementById('romantic-style-list');
                        if (romanticList) {
                            romanticList.innerHTML = relData.romantic.map(r => `<li>${r}</li>`).join('');
                            console.log('✅ UPDATED romantic-style-list');
                        }
                        
                        const friendshipsList = document.getElementById('friendships-list');
                        if (friendshipsList) {
                            friendshipsList.innerHTML = relData.friendships.map(f => `<li>${f}</li>`).join('');
                            console.log('✅ UPDATED friendships-list');
                        }
                        
                        const colleagueList = document.getElementById('colleague-list');
                        if (colleagueList) {
                            colleagueList.innerHTML = relData.colleague.map(c => `<li>${c}</li>`).join('');
                            console.log('✅ UPDATED colleague-list');
                        }
                        
                        const managerList = document.getElementById('manager-list');
                        if (managerList) {
                            managerList.innerHTML = relData.manager.map(m => `<li>${m}</li>`).join('');
                            console.log('✅ UPDATED manager-list');
                        }
                        
                        const relationshipSummary = document.getElementById('relationship-summary');
                        if (relationshipSummary) {
                            relationshipSummary.textContent = `Your relationship style remains consistent — ${relData.summary} — across personal and professional life.`;
                            console.log('✅ UPDATED relationship-summary');
                        }
                        
                        // ===== PAGE 13: YOUR TOP CAREER MATCHES =====
                        console.log('🔄 Updating Page 13: Your Top Career Matches');
                        
                        const careers = careerMappings[personalityType] || careerMappings['ENFP'];
                        const careerMatchContainer = document.getElementById('career-match-bars');
                        
                        if (careerMatchContainer) {
                            careerMatchContainer.innerHTML = '';
                            careers.forEach((career, index) => {
                                const matchItem = document.createElement('div');
                                matchItem.className = 'career-match-item';
                                matchItem.innerHTML = `
                                    <div class="career-match-header">
                                        <span class="career-match-title" style="font-weight: bold; color: #111;">${career.title}</span>
                                        <span class="career-match-percentage" style="font-weight: bold; color: #666;">${career.match}% Compatibility</span>
                                    </div>
                                    <div class="career-match-bar-bg">
                                        <div class="career-match-bar-fill" style="width: ${career.match}%;"></div>
                                    </div>
                                `;
                                careerMatchContainer.appendChild(matchItem);
                            });
                            console.log('✅ UPDATED career-match-bars with', careers.length, 'careers for', personalityType);
                            console.log('Top career:', careers[0].title, 'at', careers[0].match + '%');
                        } else {
                            console.error('❌ career-match-bars element NOT FOUND');
                        }
                        
                        // ===== PAGE 14: CAREER DETAIL (TOP MATCH) =====
                        console.log('🔄 Updating Page 14: Career Detail');
                        
                        const topCareer = careers[0]; // Get the #1 career match
                        
                        const careerDetailTitle = document.getElementById('career-detail-title');
                        if (careerDetailTitle) {
                            careerDetailTitle.textContent = topCareer.title;
                            careerDetailTitle.style.color = '#111';
                            careerDetailTitle.style.fontWeight = 'bold';
                            console.log('✅ UPDATED career-detail-title to:', topCareer.title);
                        }
                        
                        const careerConfidenceFill = document.getElementById('career-confidence-fill');
                        const careerConfidencePercentage = document.getElementById('career-confidence-percentage');
                        const careerConfidenceLabel = document.getElementById('career-confidence-label');
                        
                        if (careerConfidenceFill) {
                            careerConfidenceFill.style.width = topCareer.match + '%';
                            console.log('✅ UPDATED career-confidence-fill to:', topCareer.match + '%');
                        }
                        
                        if (careerConfidencePercentage) {
                            careerConfidencePercentage.textContent = topCareer.match + '%';
                        }
                        
                        if (careerConfidenceLabel) {
                            careerConfidenceLabel.textContent = `${topCareer.match}% Compatibility Match`;
                        }
                        
                        const careerOverview = document.getElementById('career-overview');
                        if (careerOverview) {
                            careerOverview.textContent = topCareer.desc;
                            console.log('✅ UPDATED career-overview');
                        }
                        
                        const careerWhyFits = document.getElementById('career-why-fits');
                        if (careerWhyFits) {
                            careerWhyFits.textContent = `This role matches your profile due to the following factors observed during the assessment: Fits ${personalityType} types who ${topCareer.desc.toLowerCase()}`;
                            console.log('✅ UPDATED career-why-fits');
                        }
                        
                        // Career environment and growth path data
                        const careerDetailsData = {
                            'Software Architect': { env: 'Tech companies, startups, remote', growth: 'Developer → Senior Developer → Architect → CTO' },
                            'Data Scientist': { env: 'Tech companies, research labs, consulting', growth: 'Analyst → Data Scientist → Senior DS → Chief Data Officer' },
                            'Strategic Consultant': { env: 'Consulting firms, corporate strategy', growth: 'Analyst → Consultant → Senior Consultant → Partner' },
                            'CEO/Executive': { env: 'Corporations, startups, enterprises', growth: 'Manager → Director → VP → CEO' },
                            'Management Consultant': { env: 'Consulting firms, advisory', growth: 'Analyst → Consultant → Manager → Partner' },
                            'Entrepreneur': { env: 'Startups, innovation hubs, remote', growth: 'Founder → Scale-up Leader → Serial Entrepreneur' },
                            'Software Developer': { env: 'Tech companies, startups, remote', growth: 'Junior Dev → Developer → Senior Dev → Tech Lead' },
                            'Innovation Manager': { env: 'Corporations, R&D departments', growth: 'Specialist → Manager → Director → VP Innovation' },
                            'Marketing Director': { env: 'Agencies, corporations, startups', growth: 'Coordinator → Manager → Director → CMO' },
                            'Counselor': { env: 'Private practice, clinics, schools', growth: 'Counselor → Senior Counselor → Practice Owner' },
                            'Psychologist': { env: 'Clinics, hospitals, private practice', growth: 'Psychologist → Senior Psychologist → Director' },
                            'Writer/Author': { env: 'Freelance, publishing, media', growth: 'Writer → Published Author → Bestselling Author' },
                            'Teacher/Professor': { env: 'Schools, universities, online', growth: 'Teacher → Senior Teacher → Professor → Dean' },
                            'Creative Writer': { env: 'Freelance, publishing, media', growth: 'Writer → Published Author → Bestselling Author' },
                            'Graphic Designer': { env: 'Agencies, freelance, in-house', growth: 'Designer → Senior Designer → Creative Director' },
                            'Therapist': { env: 'Private practice, clinics, hospitals', growth: 'Therapist → Senior Therapist → Practice Owner' },
                            'Brand Manager': { env: 'Corporations, agencies, startups', growth: 'Coordinator → Manager → Senior Manager → Director' },
                            'Journalist': { env: 'Media companies, freelance, digital', growth: 'Reporter → Journalist → Senior Journalist → Editor' },
                            'Recruiter': { env: 'Agencies, corporations, freelance', growth: 'Recruiter → Senior Recruiter → Talent Director' },
                            'Accountant': { env: 'Firms, corporations, freelance', growth: 'Accountant → Senior Accountant → Controller → CFO' },
                            'Project Manager': { env: 'Various industries, consulting', growth: 'Coordinator → PM → Senior PM → Program Director' },
                            'Operations Director': { env: 'Corporations, manufacturing', growth: 'Manager → Senior Manager → Director → COO' },
                            'Nurse': { env: 'Hospitals, clinics, home care', growth: 'Nurse → Senior Nurse → Nurse Manager → Director' },
                            'Event Planner': { env: 'Agencies, hotels, freelance', growth: 'Coordinator → Planner → Senior Planner → Director' },
                            'Mechanical Engineer': { env: 'Manufacturing, automotive, aerospace', growth: 'Engineer → Senior Engineer → Lead Engineer → Director' },
                            'Sales Executive': { env: 'Various industries, B2B, B2C', growth: 'Rep → Executive → Senior Executive → VP Sales' },
                            'Artist': { env: 'Studios, galleries, freelance', growth: 'Artist → Established Artist → Gallery Owner' },
                            'Entertainer': { env: 'Entertainment industry, events', growth: 'Performer → Featured Artist → Producer' }
                        };
                        
                        const careerDetail = careerDetailsData[topCareer.title] || { 
                            env: 'Various professional environments', 
                            growth: 'Entry Level → Mid Level → Senior Level → Leadership' 
                        };
                        
                        const careerEnvironment = document.getElementById('career-environment');
                        if (careerEnvironment) {
                            careerEnvironment.textContent = careerDetail.env;
                            console.log('✅ UPDATED career-environment');
                        }
                        
                        const careerGrowthPath = document.getElementById('career-growth-path');
                        if (careerGrowthPath) {
                            careerGrowthPath.textContent = careerDetail.growth;
                            console.log('✅ UPDATED career-growth-path');
                        }
                        
                        // Key skills based on career
                        const skillsData = {
                            'Software Architect': ['System Design', 'Architecture Patterns', 'Technical Leadership', 'Cloud Computing'],
                            'Data Scientist': ['Python/R', 'Machine Learning', 'Statistics', 'Data Visualization'],
                            'Strategic Consultant': ['Strategic Thinking', 'Business Analysis', 'Presentation', 'Problem Solving'],
                            'CEO/Executive': ['Leadership', 'Strategic Vision', 'Decision Making', 'Business Acumen'],
                            'Entrepreneur': ['Innovation', 'Risk Management', 'Business Development', 'Networking'],
                            'Brand Manager': ['Brand Strategy', 'Marketing', 'Creative Thinking', 'Analytics'],
                            'Counselor': ['Active Listening', 'Empathy', 'Psychology', 'Communication'],
                            'Creative Writer': ['Writing', 'Creativity', 'Storytelling', 'Research'],
                            'Accountant': ['Accounting', 'Attention to Detail', 'Excel', 'Financial Analysis'],
                            'Project Manager': ['Planning', 'Organization', 'Communication', 'Risk Management'],
                            'Nurse': ['Patient Care', 'Medical Knowledge', 'Compassion', 'Attention to Detail'],
                            'Mechanical Engineer': ['CAD', 'Problem Solving', 'Physics', 'Project Management']
                        };
                        
                        const skills = skillsData[topCareer.title] || ['Leadership', 'Communication', 'Problem Solving', 'Adaptability'];
                        
                        const careerSkillsTags = document.getElementById('career-skills-tags');
                        if (careerSkillsTags) {
                            careerSkillsTags.innerHTML = skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
                            console.log('✅ UPDATED career-skills-tags with', skills.length, 'skills');
                        }
                        
                        // ===== PAGE 15: CAREER DETAIL LOCKED (2ND MATCH) =====
                        console.log('🔄 Updating Page 15: Career Detail Locked (2nd Match)');
                        
                        const secondCareer = careers[1]; // Get the #2 career match
                        
                        const careerLockedTitle = document.getElementById('career-locked-title');
                        if (careerLockedTitle) {
                            careerLockedTitle.textContent = secondCareer.title;
                            console.log('✅ UPDATED career-locked-title to:', secondCareer.title);
                        }
                        
                        const careerLockedSubtitle = document.getElementById('career-locked-subtitle');
                        if (careerLockedSubtitle) {
                            careerLockedSubtitle.textContent = `${secondCareer.match}% Compatibility`;
                            console.log('✅ UPDATED career-locked-subtitle to:', secondCareer.match + '%');
                        }
                        
                        const careerLockedMessage = document.getElementById('career-locked-message');
                        if (careerLockedMessage) {
                            careerLockedMessage.textContent = `Upgrade to view full analysis for ${secondCareer.title}`;
                            console.log('✅ UPDATED career-locked-message');
                        }
                        
                        // ===== PAGE 15B: CAREER DETAIL LOCKED (3RD MATCH) =====
                        console.log('🔄 Updating Page 15B: Career Detail Locked (3rd Match)');
                        const thirdCareer = careers[2];
                        
                        document.getElementById('page15b-personality-type').textContent = personalityType;
                        
                        const careerLockedTitle3 = document.getElementById('career-locked-title-3');
                        if (careerLockedTitle3) {
                            careerLockedTitle3.textContent = thirdCareer.title;
                            console.log('✅ UPDATED career-locked-title-3 to:', thirdCareer.title);
                        }
                        
                        const careerLockedSubtitle3 = document.getElementById('career-locked-subtitle-3');
                        if (careerLockedSubtitle3) {
                            careerLockedSubtitle3.textContent = `${thirdCareer.match}% Compatibility`;
                        }
                        
                        const careerLockedMessage3 = document.getElementById('career-locked-message-3');
                        if (careerLockedMessage3) {
                            careerLockedMessage3.textContent = `Upgrade to view full analysis for ${thirdCareer.title}`;
                        }
                        
                        // ===== PAGE 15C: CAREER DETAIL LOCKED (4TH MATCH) =====
                        console.log('🔄 Updating Page 15C: Career Detail Locked (4th Match)');
                        const fourthCareer = careers[3];
                        
                        document.getElementById('page15c-personality-type').textContent = personalityType;
                        
                        const careerLockedTitle4 = document.getElementById('career-locked-title-4');
                        if (careerLockedTitle4) {
                            careerLockedTitle4.textContent = fourthCareer.title;
                            console.log('✅ UPDATED career-locked-title-4 to:', fourthCareer.title);
                        }
                        
                        const careerLockedSubtitle4 = document.getElementById('career-locked-subtitle-4');
                        if (careerLockedSubtitle4) {
                            careerLockedSubtitle4.textContent = `${fourthCareer.match}% Compatibility`;
                        }
                        
                        const careerLockedMessage4 = document.getElementById('career-locked-message-4');
                        if (careerLockedMessage4) {
                            careerLockedMessage4.textContent = `Upgrade to view full analysis for ${fourthCareer.title}`;
                        }
                        
                        // ===== PAGE 15D: CAREER DETAIL LOCKED (5TH MATCH) =====
                        console.log('🔄 Updating Page 15D: Career Detail Locked (5th Match)');
                        const fifthCareer = careers[4];
                        
                        document.getElementById('page15d-personality-type').textContent = personalityType;
                        
                        const careerLockedTitle5 = document.getElementById('career-locked-title-5');
                        if (careerLockedTitle5) {
                            careerLockedTitle5.textContent = fifthCareer.title;
                            console.log('✅ UPDATED career-locked-title-5 to:', fifthCareer.title);
                        }
                        
                        const careerLockedSubtitle5 = document.getElementById('career-locked-subtitle-5');
                        if (careerLockedSubtitle5) {
                            careerLockedSubtitle5.textContent = `${fifthCareer.match}% Compatibility`;
                        }
                        
                        const careerLockedMessage5 = document.getElementById('career-locked-message-5');
                        if (careerLockedMessage5) {
                            careerLockedMessage5.textContent = `Upgrade to view full analysis for ${fifthCareer.title}`;
                        }
                        
                        console.log('🎉 FORCE UPDATE COMPLETE!');
                    }, 1000);
                }
            })
            .catch(error => {
                console.error('Error in force update:', error);
            });
    } else {
        console.warn('No session ID found, using URL parameter');
        if (personalityType) {
            setTimeout(() => {
                const orientation = orientationData[personalityType] || 'Creative';
                document.getElementById('dominant-orientation').textContent = orientation;
                document.getElementById('archetype-type').textContent = personalityType;
                console.log('Updated with URL personality type:', personalityType);
            }, 1000);
        }
    }
}

// Execute immediately when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceUpdateAllContent);
} else {
    // DOM is already ready
    forceUpdateAllContent();
}

console.log('=== IMMEDIATE EXECUTION SETUP COMPLETE ===');
