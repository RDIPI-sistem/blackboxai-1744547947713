// Core Windows 12 Web OS functionality
class WindowsOS {
    constructor() {
        this.windows = [];
        this.init();
    }

    init() {
        console.log('Windows 12 Web OS Initializing...');
        this.setupDesktop();
        this.setupTaskbar();
        this.setupEventListeners();
    }

    setupDesktop() {
        this.desktop = document.getElementById('desktop');
        // Create desktop icons using Font Awesome
        this.createDesktopIcon('File Explorer', 'far fa-folder', () => openWindow('file-explorer'));
        this.createDesktopIcon('Notepad', 'far fa-file-alt', () => openWindow('notepad'));
        this.createDesktopIcon('Calculator', 'fas fa-calculator', () => openWindow('calculator'));
    }

    setupTaskbar() {
        // Taskbar is already set up in HTML
        // Just need to initialize clock
        this.updateClock();
        setInterval(() => this.updateClock(), 60000);
    }

    createDesktopIcon(name, iconClass, clickHandler) {
        const iconElement = document.createElement('div');
        iconElement.className = 'desktop-icon';
        iconElement.innerHTML = `
            <i class="${iconClass}"></i>
            <span>${name}</span>
        `;
        iconElement.addEventListener('click', clickHandler);
        this.desktop.appendChild(iconElement);
    }

    updateClock() {
        const now = new Date();
        const clockElement = document.querySelector('.clock');
        if (clockElement) {
            clockElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }

    setupEventListeners() {
        // Global event listeners will go here
    }
}

// Initialize the OS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.windowsOS = new WindowsOS();
});
