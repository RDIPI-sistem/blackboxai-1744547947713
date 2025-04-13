// Window Manager for Windows 12 Web OS
class WindowManager {
    constructor() {
        this.windows = [];
        this.zIndex = 100;
        this.activeWindow = null;
        this.setupWindowTemplates();
    }

    setupWindowTemplates() {
        this.templates = {
            'file-explorer': {
                title: 'File Explorer',
                width: 600,
                height: 400,
                icon: 'far fa-folder',
                content: '<div class="file-explorer">File Explorer Content</div>'
            },
            'notepad': {
                title: 'Notepad',
                width: 500,
                height: 400,
                icon: 'far fa-file-alt',
                content: '<textarea class="notepad-content" style="width:100%;height:100%;"></textarea>'
            },
            'calculator': {
                title: 'Calculator',
                width: 300,
                height: 400,
                icon: 'fas fa-calculator',
                content: '<div class="calculator">Calculator UI will go here</div>'
            },
            'settings': {
                title: 'Settings',
                width: 600,
                height: 500,
                icon: 'fas fa-cog',
                content: '<div class="settings">Settings Panel</div>'
            },
            'infini-browcer': {
                title: 'InfiBrowcer',
                width: 800,
                height: 600,
                icon: 'fas fa-globe',
                content: `
                    <div class="browser-container">
                        <div class="browser-toolbar">
                            <button class="back-btn"><i class="fas fa-arrow-left"></i></button>
                            <button class="forward-btn"><i class="fas fa-arrow-right"></i></button>
                            <button class="refresh-btn"><i class="fas fa-sync-alt"></i></button>
                            <input type="text" class="address-bar" placeholder="Enter URL or search...">
                            <button class="go-btn"><i class="fas fa-search"></i></button>
                        </div>
                        <iframe class="browser-view" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
                    </div>
                `
            },
            'search': {
                title: 'Search',
                width: 500,
                height: 300,
                icon: 'fas fa-search',
                content: `
                    <div class="search-app">
                        <input type="text" class="search-input" placeholder="Search files and apps...">
                        <div class="search-results"></div>
                    </div>
                `
            },
            'terminal': {
                title: 'Terminal',
                width: 600,
                height: 400,
                icon: 'fas fa-terminal',
                content: '<div class="terminal-app" contenteditable="true"></div>'
            }
        };
    }

    createWindow(appId, options = {}) {
        const template = this.templates[appId];
        if (!template) return null;

        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.style.width = `${options.width || template.width}px`;
        windowElement.style.height = `${options.height || template.height}px`;
        windowElement.style.zIndex = this.zIndex++;
        
        windowElement.innerHTML = `
            <div class="window-header">
                <i class="${template.icon} window-icon"></i>
                <div class="window-title">${options.title || template.title}</div>
                <div class="window-controls">
                    <button class="minimize"><i class="far fa-window-minimize"></i></button>
                    <button class="maximize"><i class="far fa-window-maximize"></i></button>
                    <button class="close"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="window-content">
                ${template.content}
            </div>
            <div class="window-resize-handle"></div>
        `;

        // Center window by default
        windowElement.style.left = `calc(50% - ${(options.width || template.width)/2}px)`;
        windowElement.style.top = `calc(50% - ${(options.height || template.height)/2}px)`;

        document.body.appendChild(windowElement);
        
        const windowObj = {
            id: `window-${Date.now()}`,
            element: windowElement,
            appId,
            title: options.title || template.title,
            content: template.content
        };

        this.windows.push(windowObj);
        this.setupWindowEvents(windowElement, windowObj);
        this.focusWindow(windowObj);
        return windowObj;
    }

    setupWindowEvents(windowElement, windowObj) {
        const header = windowElement.querySelector('.window-header');
        const closeBtn = windowElement.querySelector('.close');
        const minimizeBtn = windowElement.querySelector('.minimize');
        const maximizeBtn = windowElement.querySelector('.maximize');
        const resizeHandle = windowElement.querySelector('.window-resize-handle');

        // Make window draggable
        header.addEventListener('mousedown', (e) => {
            if (e.target !== header && !e.target.classList.contains('window-title')) return;
            
            this.focusWindow(windowObj);
            
            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = parseInt(windowElement.style.left) || 0;
            const startTop = parseInt(windowElement.style.top) || 0;

            const moveHandler = (e) => {
                windowElement.style.left = `${startLeft + e.clientX - startX}px`;
                windowElement.style.top = `${startTop + e.clientY - startY}px`;
            };

            const upHandler = () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
            };

            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        });

        // Window controls
        closeBtn.addEventListener('click', () => this.closeWindow(windowObj));
        minimizeBtn.addEventListener('click', () => this.minimizeWindow(windowObj));
        maximizeBtn.addEventListener('click', () => this.toggleMaximize(windowObj));

        // Make window resizable
        if (resizeHandle) {
            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.focusWindow(windowObj);
                
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = parseInt(windowElement.style.width);
                const startHeight = parseInt(windowElement.style.height);

                const moveHandler = (e) => {
                    const newWidth = Math.max(300, startWidth + e.clientX - startX);
                    const newHeight = Math.max(200, startHeight + e.clientY - startY);
                    windowElement.style.width = `${newWidth}px`;
                    windowElement.style.height = `${newHeight}px`;
                };

                const upHandler = () => {
                    document.removeEventListener('mousemove', moveHandler);
                    document.removeEventListener('mouseup', upHandler);
                };

                document.addEventListener('mousemove', moveHandler);
                document.addEventListener('mouseup', upHandler);
            });
        }
    }

    focusWindow(windowObj) {
        if (this.activeWindow) {
            this.activeWindow.element.style.zIndex = 99;
        }
        windowObj.element.style.zIndex = this.zIndex++;
        this.activeWindow = windowObj;
    }

    closeWindow(windowObj) {
        const index = this.windows.findIndex(w => w.id === windowObj.id);
        if (index > -1) {
            this.windows.splice(index, 1);
        }
        windowObj.element.remove();
        if (this.activeWindow?.id === windowObj.id) {
            this.activeWindow = null;
        }
    }

    minimizeWindow(windowObj) {
        windowObj.element.style.display = 'none';
        // TODO: Add to taskbar
    }

    toggleMaximize(windowObj) {
        const windowElement = windowObj.element;
        if (windowElement.classList.contains('maximized')) {
            windowElement.classList.remove('maximized');
            windowElement.style.width = windowElement.dataset.prevWidth;
            windowElement.style.height = windowElement.dataset.prevHeight;
            windowElement.style.left = windowElement.dataset.prevLeft;
            windowElement.style.top = windowElement.dataset.prevTop;
        } else {
            windowElement.dataset.prevWidth = windowElement.style.width;
            windowElement.dataset.prevHeight = windowElement.style.height;
            windowElement.dataset.prevLeft = windowElement.style.left;
            windowElement.dataset.prevTop = windowElement.style.top;
            
            windowElement.classList.add('maximized');
            windowElement.style.width = '100%';
            windowElement.style.height = 'calc(100% - 32px)';
            windowElement.style.left = '0';
            windowElement.style.top = '0';
        }
    }
}

// Initialize window manager
const windowManager = new WindowManager();

// Export functions for OS to use
function openWindow(appId, options) {
    return windowManager.createWindow(appId, options);
}

function closeWindow(windowObj) {
    return windowManager.closeWindow(windowObj);
}
