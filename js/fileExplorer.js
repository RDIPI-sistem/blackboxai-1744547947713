// File Explorer functionality for Windows 12 Web OS
class FileExplorer {
    constructor(windowElement) {
        this.windowElement = windowElement;
        this.files = [
            { name: 'Document1.txt', type: 'file' },
            { name: 'Image1.png', type: 'file' },
            { name: 'Folder1', type: 'folder' },
            { name: 'Folder2', type: 'folder' }
        ];
        this.init();
    }

    init() {
        console.log('File Explorer Initialized');
        this.renderFileList();
        this.setupToolbar();
    }

    renderFileList() {
        const fileList = this.windowElement.querySelector('.file-list');
        fileList.innerHTML = ''; // Clear previous content
        this.files.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'file-item';
            fileElement.textContent = file.name;
            fileElement.addEventListener('click', () => this.openFile(file));
            fileList.appendChild(fileElement);
        });
    }

    setupToolbar() {
        const newFolderButton = this.windowElement.querySelector('.new-folder');
        const newFileButton = this.windowElement.querySelector('.new-file');
        const searchInput = this.windowElement.querySelector('.search');

        newFolderButton.addEventListener('click', () => this.createNewFolder());
        newFileButton.addEventListener('click', () => this.createNewFile());
        searchInput.addEventListener('input', () => this.searchFiles(searchInput.value));
    }

    openFile(file) {
        if (file.type === 'file') {
            console.log(`Opening file: ${file.name}`);
            // Logic to open the file in a new window
        } else if (file.type === 'folder') {
            console.log(`Opening folder: ${file.name}`);
            // Logic to navigate into the folder
        }
    }

    createNewFolder() {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            this.files.push({ name: folderName, type: 'folder' });
            this.renderFileList();
        }
    }

    createNewFile() {
        const fileName = prompt('Enter file name:');
        if (fileName) {
            this.files.push({ name: fileName, type: 'file' });
            this.renderFileList();
        }
    }

    searchFiles(query) {
        const filteredFiles = this.files.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
        this.renderFilteredFileList(filteredFiles);
    }

    renderFilteredFileList(filteredFiles) {
        const fileList = this.windowElement.querySelector('.file-list');
        fileList.innerHTML = ''; // Clear previous content
        filteredFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'file-item';
            fileElement.textContent = file.name;
            fileElement.addEventListener('click', () => this.openFile(file));
            fileList.appendChild(fileElement);
        });
    }
}

// Initialize File Explorer
const fileExplorer = new FileExplorer(document.querySelector('.file-explorer'));
