let selectedMood = '';

function setMood(mood) {
    selectedMood = mood;
    document.querySelector('#selected-mood-display span').innerText = mood;
}

function saveEntry() {
    if (!selectedMood) return alert("Please select a mood!");
    
    const entry = {
        mood: selectedMood,
        note: document.getElementById('note').value,
        date: new Date().toLocaleString()
    };

    let history = JSON.parse(localStorage.getItem('moodHistory')) || [];
    history.unshift(entry);
    localStorage.setItem('moodHistory', JSON.stringify(history));

    document.getElementById('note').value = '';
    setMood('None');
    displayHistory();
}

function displayHistory() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('moodHistory')) || [];
    historyList.innerHTML = history.map(item => `
        <div class="history-item">
            <strong>${item.mood}</strong> - <small>${item.date}</small>
            <p>${item.note}</p>
        </div>
    `).join('');
}

function clearHistory() {
    if (confirm("Delete all history?")) {
        localStorage.removeItem('moodHistory');
        displayHistory();
    }
}

// Load history on startup
displayHistory();
