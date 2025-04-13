// Application Manager for Windows 12 Web OS
class AppManager {
    constructor() {
        this.apps = [
            {
                id: 'file-explorer',
                name: 'File Explorer',
                icon: 'far fa-folder',
                handler: this.openFileExplorer
            },
            {
                id: 'notepad',
                name: 'Notepad',
                icon: 'far fa-file-alt',
                handler: this.openNotepad
            },
            {
                id: 'calculator',
                name: 'Calculator',
                icon: 'fas fa-calculator',
                handler: this.openCalculator
            },
            {
                id: 'settings',
                name: 'Settings',
                icon: 'fas fa-cog',
                handler: this.openSettings
            }
        ];
    }

    openFileExplorer() {
        console.log('Opening File Explorer');
        return openWindow('file-explorer');
    }

    openNotepad() {
        console.log('Opening Notepad');
        return openWindow('notepad');
    }

    openCalculator() {
        console.log('Opening Calculator');
        return openWindow('calculator');
    }

    openSettings() {
        console.log('Opening Settings');
        return openWindow('settings');
    }

    getAppById(id) {
        return this.apps.find(app => app.id === id);
    }

    getAllApps() {
        return this.apps;
    }

    populateStartMenu() {
        const startMenu = document.getElementById('start-menu-apps');
        if (!startMenu) return;

        startMenu.innerHTML = '';
        this.apps.forEach(app => {
            const tile = document.createElement('div');
            tile.className = 'app-tile';
            tile.innerHTML = `
                <i class="${app.icon}"></i>
                <span>${app.name}</span>
            `;
            tile.addEventListener('click', () => app.handler());
            startMenu.appendChild(tile);
        });
    }
}

// Initialize app manager
const appManager = new AppManager();

// Export functions for OS to use
function populateStartMenu() {
    appManager.populateStartMenu();
}

function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('visible');
    if (startMenu.classList.contains('visible')) {
        populateStartMenu();
    }
}

// Initialize start menu button
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', toggleStartMenu);
    }
});
