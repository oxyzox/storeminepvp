function updateServerStatus() {
    fetch('https://api.mcstatus.io/v2/status/java/play.minepvp.fun')
        .then(response => response.json())
        .then(data => {
            const statusIndicator = document.getElementById('status-indicator');
            const playerCount = document.getElementById('playerCount');
            const serverVersion = document.getElementById('server-version');

            if (data.online) {
                statusIndicator.className = 'status-indicator status-online';
                playerCount.textContent = `${data.players.online} / ${data.players.max} Players`;
                serverVersion.textContent = `Version: ${data.version.name_clean}`;
            } else {
                statusIndicator.className = 'status-indicator status-offline';
                playerCount.textContent = 'Server Offline';
                serverVersion.textContent = '';
            }
        })
        .catch(error => {
            console.error('Error fetching server status:', error);
            const statusIndicator = document.getElementById('status-indicator');
            const playerCount = document.getElementById('playerCount');
            const serverVersion = document.getElementById('server-version');
            
            statusIndicator.className = 'status-indicator status-offline';
            playerCount.textContent = 'Checking status...';
            serverVersion.textContent = '';
        });
}


updateServerStatus();
setInterval(updateServerStatus, 3000);

function copyIP() {
    navigator.clipboard.writeText('play.minepvp.fun');
    const ipElement = document.querySelector('.ip-address');
    ipElement.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
        ipElement.style.backgroundColor = '';
    }, 500);
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}


const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature, .store-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});