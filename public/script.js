document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const messageArea = document.getElementById('messageArea');
    const usersList = document.getElementById('usersList');

    loadUsers();

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(registrationForm);
        const userData = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            referralCode: formData.get('referralCode').trim()
        };

        registerUser(userData);
    });

    async function registerUser(userData) {
        try {
            showMessage('Registering user...', 'info');
            
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(`Success! User registered. Your referral code is: ${result.user.referralCode}`, 'success');
                registrationForm.reset();
                loadUsers(); // Refresh the users list
            } else {
                showMessage(`Error: ${result.error}`, 'error');
            }
        } catch (error) {
            showMessage('Network error. Please try again.', 'error');
            console.error('Registration error:', error);
        }
    }

    async function loadUsers() {
        try {
            usersList.innerHTML = '<div class="loading">Loading users...</div>';
            
            const response = await fetch('/api/users');
            const users = await response.json();

            if (response.ok) {
                displayUsers(users);
            } else {
                usersList.innerHTML = '<div class="error">Failed to load users</div>';
            }
        } catch (error) {
            usersList.innerHTML = '<div class="error">Network error loading users</div>';
            console.error('Load users error:', error);
        }
    }

    function displayUsers(users) {
        if (users.length === 0) {
            usersList.innerHTML = '<div class="loading">No users found</div>';
            return;
        }

        usersList.innerHTML = users.map(user => `
            <div class="user-card">
                <div class="user-name">${escapeHtml(user.name)}</div>
                <div class="user-email">${escapeHtml(user.email)}</div>
                <div class="user-details">
                    <div class="referral-code">
                        <span class="code-text">${escapeHtml(user.referralCode)}</span>
                        <button class="copy-btn" onclick="copyToClipboard('${user.referralCode}')">Copy</button>
                    </div>
                    <div class="points">${user.points} points</div>
                </div>
            </div>
        `).join('');
    }

    function showMessage(message, type) {
        messageArea.textContent = message;
        messageArea.className = `message-area ${type} show`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }
    }

    function hideMessage() {
        messageArea.classList.remove('show');
    }

    // Make functions globally available
    window.copyToClipboard = async function(text) {
        try {
            await navigator.clipboard.writeText(text);
            showMessage('Referral code copied to clipboard!', 'success');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showMessage('Referral code copied to clipboard!', 'success');
            } catch (fallbackError) {
                showMessage('Could not copy to clipboard', 'error');
            }
            document.body.removeChild(textArea);
        }
    };

    // Utility function to escape HTML
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Auto-refresh users list every 30 seconds
    setInterval(loadUsers, 30000);
});