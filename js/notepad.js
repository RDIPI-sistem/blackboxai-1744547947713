// Enhanced Notepad for Windows 12 Web OS
class Notepad {
    constructor(windowElement) {
        this.windowElement = windowElement;
        this.currentFile = null;
        this.unsavedChanges = false;
        this.init();
    }

    init() {
        this.setupUI();
        this.setupEventListeners();
        this.updateTitle();
    }

    setupUI() {
        this.editor = this.windowElement.querySelector('.notepad-content');
        this.toolbar = document.createElement('div');
        this.toolbar.className = 'notepad-toolbar';
        this.toolbar.innerHTML = `
            <button class="file-new"><i class="fas fa-file"></i> New</button>
            <button class="file-open"><i class="fas fa-folder-open"></i> Open</button>
            <button class="file-save"><i class="fas fa-save"></i> Save</button>
            <select class="font-family">
                <option value="Arial">Arial</option>
                <option value="Courier New">Courier New</option>
                <option value="Times New Roman">Times New Roman</option>
            </select>
            <select class="font-size">
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
            </select>
        `;
        this.windowElement.querySelector('.window-content').prepend(this.toolbar);
    }

    setupEventListeners() {
        this.toolbar.querySelector('.file-new').addEventListener('click', () => this.newFile());
        this.toolbar.querySelector('.file-open').addEventListener('click', () => this.openFile());
        this.toolbar.querySelector('.file-save').addEventListener('click', () => this.saveFile());
        this.toolbar.querySelector('.font-family').addEventListener('change', (e) => {
            this.editor.style.fontFamily = e.target.value;
        });
        this.toolbar.querySelector('.font-size').addEventListener('change', (e) => {
            this.editor.style.fontSize = e.target.value;
        });
        this.editor.addEventListener('input', () => {
            this.unsavedChanges = true;
            this.updateTitle();
        });
    }

    newFile() {
        if (this.unsavedChanges && !confirm('Discard unsaved changes?')) return;
        this.editor.value = '';
        this.currentFile = null;
        this.unsavedChanges = false;
        this.updateTitle();
    }

    openFile() {
        // Simulate file open dialog
        const fileName = prompt('Enter file name to open:');
        if (fileName) {
            // In a real implementation, this would load the file content
            this.editor.value = `Content of ${fileName}`;
            this.currentFile = fileName;
            this.unsavedChanges = false;
            this.updateTitle();
        }
    }

    saveFile() {
        if (this.currentFile) {
            // Simulate file save
            console.log(`Saving to ${this.currentFile}`);
            this.unsavedChanges = false;
        } else {
            const fileName = prompt('Enter file name to save:');
            if (fileName) {
                this.currentFile = fileName;
                console.log(`Saving to ${fileName}`);
                this.unsavedChanges = false;
            }
        }
        this.updateTitle();
    }

    updateTitle() {
        const titleElement = this.windowElement.querySelector('.window-title');
        let title = 'Notepad';
        if (this.currentFile) title += ` - ${this.currentFile}`;
        if (this.unsavedChanges) title += ' *';
        titleElement.textContent = title;
    }
}

// Initialize Notepad
const notepad = new Notepad(document.querySelector('.notepad-window'));
