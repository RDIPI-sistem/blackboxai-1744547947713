// OS Core functionality
class OperatingSystem {
    constructor() {
        this.apps = [
            // Productivity
            { id: 'file-explorer', name: 'File Explorer', icon: 'far fa-folder', category: 'productivity' },
            { id: 'notepad', name: 'Notepad', icon: 'far fa-file-alt', category: 'productivity' },
            { id: 'calculator', name: 'Calculator', icon: 'fas fa-calculator', category: 'productivity' },
            { id: 'terminal', name: 'Terminal', icon: 'fas fa-terminal', category: 'productivity' },
            { id: 'calendar', name: 'Calendar', icon: 'fas fa-calendar-alt', category: 'productivity' },
            { id: 'email', name: 'Email', icon: 'fas fa-envelope', category: 'productivity' },
            
            // Multimedia
            { id: 'media-player', name: 'Media Player', icon: 'fas fa-play-circle', category: 'multimedia' },
            { id: 'music', name: 'Music Player', icon: 'fas fa-music', category: 'multimedia' },
            { id: 'photos', name: 'Photo Viewer', icon: 'fas fa-images', category: 'multimedia' },
            { id: 'paint', name: 'Paint', icon: 'fas fa-paint-brush', category: 'multimedia' },
            
            // Internet
            { id: 'browser', name: 'Web Browser', icon: 'fas fa-globe', category: 'internet' },
            { id: 'weather', name: 'Weather', icon: 'fas fa-cloud-sun', category: 'internet' },
            
            // System
            { id: 'settings', name: 'Settings', icon: 'fas fa-cog', category: 'system' }
        ];
        this.recentApps = [];
        this.init();
    }

    init() {
        console.log('Windows 12 Web OS Initialized');
        this.setupStartMenu();
        this.setupTaskbar();
    }

    setupStartMenu() {
        const startMenu = document.createElement('div');
        startMenu.className = 'start-menu';
        startMenu.innerHTML = `
            <div class="start-menu-header">
                <input type="text" class="search" placeholder="Search apps...">
            </div>
            <div class="app-categories">
                ${['productivity', 'multimedia', 'internet', 'system'].map(category => `
                    <div class="category" data-category="${category}">
                        <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                        <div class="app-list">
                            ${this.apps.filter(app => app.category === category).map(app => `
                                <div class="app-item" data-app="${app.id}">
                                    <i class="${app.icon}"></i>
                                    <span>${app.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="recent-apps">
                <h4>Recent</h4>
                <div class="recent-list"></div>
            </div>
        `;
        document.body.appendChild(startMenu);

        // Add event listeners
        document.querySelectorAll('.app-item').forEach(item => {
            item.addEventListener('click', () => {
                const appId = item.dataset.app;
                this.launchApp(appId);
                this.addToRecent(appId);
            });
        });

        document.querySelector('.start-menu .search').addEventListener('input', (e) => {
            this.searchApps(e.target.value);
        });
    }

    setupTaskbar() {
        const taskbar = document.createElement('div');
        taskbar.className = 'taskbar';
        taskbar.innerHTML = `
            <button class="start-button"><i class="fab fa-windows"></i></button>
            <div class="taskbar-items"></div>
            <div class="system-tray">
                <div class="time">${new Date().toLocaleTimeString()}</div>
                <div class="power-options">
                    <button class="power-button"><i class="fas fa-power-off"></i></button>
                    <div class="power-menu">
                        <button class="power-option" data-action="sleep"><i class="fas fa-moon"></i> Sleep</button>
                        <button class="power-option" data-action="restart"><i class="fas fa-redo"></i> Restart</button>
                        <button class="power-option" data-action="shutdown"><i class="fas fa-power-off"></i> Shut down</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(taskbar);

        // Toggle start menu
        document.querySelector('.start-button').addEventListener('click', () => {
            const startMenu = document.querySelector('.start-menu');
            startMenu.style.display = startMenu.style.display === 'none' ? 'flex' : 'none';
        });
    }

    launchApp(appId) {
        windowManager.createWindow(appId);
    }

    addToRecent(appId) {
        const app = this.apps.find(a => a.id === appId);
        if (!app) return;

        // Remove if already in recent
        this.recentApps = this.recentApps.filter(a => a.id !== appId);
        
        // Add to beginning
        this.recentApps.unshift(app);
        
        // Keep only last 5
        this.recentApps = this.recentApps.slice(0, 5);
        
        this.updateRecentApps();
    }

    updateRecentApps() {
        const recentList = document.querySelector('.recent-list');
        recentList.innerHTML = this.recentApps.map(app => `
            <div class="app-item" data-app="${app.id}">
                <i class="${app.icon}"></i>
                <span>${app.name}</span>
            </div>
        `).join('');

        document.querySelectorAll('.recent-list .app-item').forEach(item => {
            item.addEventListener('click', () => {
                this.launchApp(item.dataset.app);
            });
        });
    }

    searchApps(query) {
        const appList = document.querySelectorAll('.app-list');
        
        appList.forEach(appList => {
            const apps = appList.querySelectorAll('.app-item');
            apps.forEach(app => {
                const appName = app.querySelector('span').textContent.toLowerCase();
                if (appName.includes(query.toLowerCase())) {
                    app.style.display = 'flex';
                } else {
                    app.style.display = 'none';
                }
            });
        });
    }
}

// Initialize OS
const os = new OperatingSystem();
