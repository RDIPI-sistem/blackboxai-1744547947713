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
                content: `
                    <div class="file-explorer">
                        <div class="toolbar">
                            <button class="new-folder"><i class="fas fa-folder-plus"></i> New Folder</button>
                            <button class="new-file"><i class="fas fa-file-alt"></i> New File</button>
                            <input type="text" class="search" placeholder="Search files...">
                        </div>
                        <div class="file-list"></div>
                        <div class="status-bar">
                            <span class="item-count">0 items</span>
                            <span class="selected-count">0 selected</span>
                        </div>
                    </div>
                `,
                onLoad: (windowElement) => {
                    new FileExplorer(windowElement);
                }
            },
            'notepad': {
                title: 'Notepad',
                width: 600,
                height: 500,
                icon: 'far fa-file-alt',
                content: '<textarea class="notepad-content" style="width:100%;height:calc(100% - 40px);margin-top:40px;"></textarea>',
                onLoad: (windowElement) => {
                    windowElement.classList.add('notepad-window');
                    new Notepad(windowElement);
                }
            },
            'calculator': {
                title: 'Calculator',
                width: 350,
                height: 500,
                icon: 'fas fa-calculator',
                content: '<div class="calculator-content"></div>',
                onLoad: (windowElement) => {
                    windowElement.classList.add('calculator-window');
                    new Calculator(windowElement);
                }
            },
            'media-player': {
                title: 'Media Player',
                width: 600,
                height: 500,
                icon: 'fas fa-play-circle',
                content: '<div class="media-player-content"></div>',
                onLoad: (windowElement) => {
                    windowElement.classList.add('media-player-window');
                    new MediaPlayer(windowElement);
                }
            },
            'paint': {
                title: 'Paint',
                width: 800,
                height: 600,
                icon: 'fas fa-paint-brush',
                content: '<div class="paint-content"></div>',
                onLoad: (windowElement) => {
                    windowElement.classList.add('paint-window');
                    new Paint(windowElement);
                }
            },
            'settings': {
                title: 'Settings',
                width: 600,
                height: 500,
                icon: 'fas fa-cog',
                content: '<div class="settings">Settings Panel</div>'
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

        if (template.onLoad) {
            template.onLoad(windowElement);
        }

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
            windowElement.style.height = '100%';
            windowElement.style.left = '0';
            windowElement.style.top = '0';
        }
    }
}

// Initialize window manager
const windowManager = new WindowManager();

// Global functions for window management
function openWindow(appId, options) {
    return windowManager.createWindow(appId, options);
}

function closeWindow(windowObj) {
    return windowManager.closeWindow(windowObj);
}
