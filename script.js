// Get API base URL (for local dev and deployed versions)
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : window.location.origin.replace(/\/$/, '');

// DOM Elements
const artistForm = document.getElementById('artistForm');
const resultsSection = document.getElementById('resultsSection');
const loadingSection = document.getElementById('loadingSection');
const errorSection = document.getElementById('errorSection');
const inputSection = document.querySelector('.input-section');

// Form submission handler
artistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const artistName = document.getElementById('artistName').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const followers = document.getElementById('followers').value;
    const captions = document.getElementById('captions').value.trim();
    const musicLink = document.getElementById('musicLink').value.trim();

    // Validate inputs
    if (!artistName || !bio || !followers || !captions) {
        showError('Please fill in all required fields');
        return;
    }

    // Show loading, hide others
    inputSection.style.display = 'none';
    resultsSection.style.display = 'none';
    errorSection.style.display = 'none';
    loadingSection.style.display = 'block';

    try {
        // Send data to backend
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                artistName,
                bio,
                followers: parseInt(followers),
                captions,
                musicLink: musicLink || null
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to analyze artist');
        }

        const result = await response.json();

        // Display results
        displayResults(result);
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Failed to connect to server. Make sure backend is running on http://localhost:3000');
    }
});

// Display results function
function displayResults(data) {
    loadingSection.style.display = 'none';
    inputSection.style.display = 'none';
    errorSection.style.display = 'none';
    resultsSection.style.display = 'block';

    // Populate report
    document.getElementById('reportArtistName').textContent = data.artistName;
    document.getElementById('fitScore').textContent = data.score;
    document.getElementById('stageValue').textContent = data.stage;
    document.getElementById('genreValue').textContent = data.genre;

    // Populate strengths
    const strengthsList = document.getElementById('strengthsList');
    strengthsList.innerHTML = '';
    data.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
    });

    // Populate weaknesses
    const weaknessesList = document.getElementById('weaknessesList');
    weaknessesList.innerHTML = '';
    data.weaknesses.forEach(weakness => {
        const li = document.createElement('li');
        li.textContent = weakness;
        weaknessesList.appendChild(li);
    });

    // Populate outreach
    document.getElementById('outreachValue').textContent = data.outreach;

    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Show error function
function showError(message) {
    loadingSection.style.display = 'none';
    inputSection.style.display = 'none';
    resultsSection.style.display = 'none';
    errorSection.style.display = 'block';
    document.getElementById('errorMessage').textContent = message;
}

// Reset form function
function resetForm() {
    artistForm.reset();
    resultsSection.style.display = 'none';
    errorSection.style.display = 'none';
    loadingSection.style.display = 'none';
    inputSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
