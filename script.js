let selectedMood = '';

function setMood(mood) {
    selectedMood = mood;
    const display = document.querySelector('#selected-mood-display span');
    if (display) display.innerText = mood;
}

function saveEntry() {
    if (!selectedMood) return alert("Please select a mood!");
    
    const entry = {
        id: Date.now(), // Unique ID for finding entries later
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

// NEW: Function to comment on/edit previous moods
function updateComment(id) {
    let history = JSON.parse(localStorage.getItem('moodHistory')) || [];
    const entryIndex = history.findIndex(item => item.id === id);
    
    if (entryIndex !== -1) {
        const newNote = prompt("Update your comment:", history[entryIndex].note);
        if (newNote !== null) {
            history[entryIndex].note = newNote;
            localStorage.setItem('moodHistory', JSON.stringify(history));
            displayHistory();
        }
    }
}

function displayHistory() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('moodHistory')) || [];
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="text-align:center; color: #6e7781;">No history yet.</p>';
        return;
    }

    historyList.innerHTML = history.map(item => `
        <div class="history-item">
            <div class="history-header">
                <strong>${item.mood}</strong> 
                <small>${item.date}</small>
            </div>
            <p class="note-text">${item.note || '<em>No comment added.</em>'}</p>
            <button class="edit-btn" onclick="updateComment(${item.id})">Edit Comment</button>
        </div>
    `).join('');
}

function clearHistory() {
    if (confirm("Delete all history?")) {
        localStorage.removeItem('moodHistory');
        displayHistory();
    }
}

displayHistory();
