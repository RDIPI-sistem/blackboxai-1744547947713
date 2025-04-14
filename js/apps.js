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
            },
            {
                id: 'infini-browcer',
                name: 'InfiBrowcer',
                icon: 'fas fa-globe',
                handler: this.openBrowser
            },
            {
                id: 'search',
                name: 'Search',
                icon: 'fas fa-search',
                handler: this.openSearch
            },
            {
                id: 'terminal',
                name: 'Terminal',
                icon: 'fas fa-terminal',
                handler: this.openTerminal
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

}

// Initialize app manager
const appManager = new AppManager();
