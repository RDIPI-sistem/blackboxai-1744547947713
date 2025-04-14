// Basic file system implementation
class FileSystem {
    constructor() {
        this.files = {};
    }

    createFile(path, content) {
        this.files[path] = content;
    }

    readFile(path) {
        return this.files[path] || null;
    }

    deleteFile(path) {
        delete this.files[path];
    }
}

// Initialize file system
const fileSystem = new FileSystem();
