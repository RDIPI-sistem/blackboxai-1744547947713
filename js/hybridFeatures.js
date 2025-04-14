// Hybrid OS Features combining Windows and Ubuntu functionality

class HybridFeatures {
    constructor() {
        this.initWorkspaces();
        this.initHotCorners();
        this.initActionCenter();
        this.initAppGrid();
        this.initSnapAssist();
    }

    initWorkspaces() {
        // Ubuntu-style workspace switcher
        const workspaces = document.querySelectorAll('.workspace-indicator');
        workspaces.forEach((ws, index) => {
            ws.addEventListener('click', () => this.switchWorkspace(index));
        });
    }

    switchWorkspace(index) {
        // Highlight active workspace
        document.querySelectorAll('.workspace-indicator').forEach((ws, i) => {
            ws.classList.toggle('bg-opacity-30', i === index);
            ws.classList.toggle('bg-opacity-10', i !== index);
        });
        
        // In a real implementation, we'd move windows between workspaces
        console.log(`Switched to workspace ${index + 1}`);
    }

    initHotCorners() {
        // Ubuntu-style hot corners
        document.getElementById('top-left').addEventListener('mouseenter', () => {
            this.showAppGrid();
        });
        
        document.getElementById('top-right').addEventListener('mouseenter', () => {
            this.showWorkspaces();
        });
    }

    initActionCenter() {
        // Windows-style action center
        document.getElementById('action-center-toggle').addEventListener('click', () => {
            const ac = document.getElementById('action-center');
            ac.classList.toggle('hidden');
        });
    }

    initAppGrid() {
        // Ubuntu-style app grid
        document.getElementById('app-grid-button').addEventListener('click', () => {
            this.showAppGrid();
        });
    }

    showAppGrid() {
        const grid = document.getElementById('app-grid');
        grid.classList.remove('hidden');
        grid.innerHTML = '';
        
        // Populate with apps
        os.apps.forEach(app => {
            const appEl = document.createElement('div');
            appEl.className = 'app-grid-item flex flex-col items-center text-white';
            appEl.innerHTML = `
                <i class="${app.icon} text-4xl mb-2"></i>
                <span>${app.name}</span>
            `;
            appEl.addEventListener('click', () => {
                os.launchApp(app.id);
                grid.classList.add('hidden');
            });
            grid.appendChild(appEl);
        });
    }

    showWorkspaces() {
        // Show workspace overview
        console.log('Workspaces overview triggered');
    }

    initSnapAssist() {
        // Windows-style snap assist
        let isDragging = false;
        
        document.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-header')) {
                isDragging = true;
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const guides = document.getElementById('snap-guides');
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                // Show guides when near edges
                if (clientX < 100 || clientX > innerWidth - 100 || 
                    clientY < 100 || clientY > innerHeight - 100) {
                    guides.classList.remove('hidden');
                } else {
                    guides.classList.add('hidden');
                }
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.getElementById('snap-guides').classList.add('hidden');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HybridFeatures();
});
