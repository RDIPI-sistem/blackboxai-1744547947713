// Media Player for Windows 12 Web OS
class MediaPlayer {
    constructor(windowElement) {
        this.windowElement = windowElement;
        this.playlist = [
            { title: 'Sample Audio', url: 'audio/sample.mp3', type: 'audio' },
            { title: 'Sample Video', url: 'video/sample.mp4', type: 'video' }
        ];
        this.currentTrack = 0;
        this.init();
    }

    init() {
        this.setupUI();
        this.setupEventListeners();
        this.loadTrack(this.currentTrack);
    }

    setupUI() {
        this.windowElement.querySelector('.window-content').innerHTML = `
            <div class="media-container">
                <video id="media-element" controls style="display:none"></video>
                <audio id="audio-element" controls style="display:none"></audio>
                <div class="media-controls">
                    <button class="play-pause"><i class="fas fa-play"></i></button>
                    <button class="stop"><i class="fas fa-stop"></i></button>
                    <button class="prev"><i class="fas fa-step-backward"></i></button>
                    <button class="next"><i class="fas fa-step-forward"></i></button>
                    <input type="range" class="volume" min="0" max="1" step="0.1" value="0.7">
                    <span class="time-display">0:00 / 0:00</span>
                </div>
                <div class="playlist">
                    <h3>Playlist</h3>
                    <ul class="track-list"></ul>
                </div>
            </div>
        `;
        this.updatePlaylist();
    }

    setupEventListeners() {
        this.mediaElement = this.windowElement.querySelector('#media-element') || 
                           this.windowElement.querySelector('#audio-element');
        
        this.windowElement.querySelector('.play-pause').addEventListener('click', () => this.togglePlay());
        this.windowElement.querySelector('.stop').addEventListener('click', () => this.stop());
        this.windowElement.querySelector('.prev').addEventListener('click', () => this.prevTrack());
        this.windowElement.querySelector('.next').addEventListener('click', () => this.nextTrack());
        this.windowElement.querySelector('.volume').addEventListener('input', (e) => {
            this.mediaElement.volume = e.target.value;
        });

        this.mediaElement.addEventListener('timeupdate', () => this.updateTimeDisplay());
        this.mediaElement.addEventListener('ended', () => this.nextTrack());
    }

    loadTrack(index) {
        if (index < 0 || index >= this.playlist.length) return;
        
        this.currentTrack = index;
        const track = this.playlist[index];
        
        // Clear existing media element
        const oldMedia = this.mediaElement;
        if (oldMedia) oldMedia.remove();
        
        // Create new media element based on track type
        this.mediaElement = document.createElement(track.type);
        this.mediaElement.id = `${track.type}-element`;
        this.mediaElement.controls = true;
        this.mediaElement.src = track.url;
        this.mediaElement.style.width = '100%';
        
        if (track.type === 'video') {
            this.mediaElement.style.height = 'calc(100% - 100px)';
        }
        
        this.windowElement.querySelector('.media-container').prepend(this.mediaElement);
        this.setupEventListeners();
    }

    togglePlay() {
        if (this.mediaElement.paused) {
            this.mediaElement.play();
            this.windowElement.querySelector('.play-pause i').className = 'fas fa-pause';
        } else {
            this.mediaElement.pause();
            this.windowElement.querySelector('.play-pause i').className = 'fas fa-play';
        }
    }

    stop() {
        this.mediaElement.pause();
        this.mediaElement.currentTime = 0;
        this.windowElement.querySelector('.play-pause i').className = 'fas fa-play';
    }

    prevTrack() {
        this.loadTrack((this.currentTrack - 1 + this.playlist.length) % this.playlist.length);
        this.togglePlay();
    }

    nextTrack() {
        this.loadTrack((this.currentTrack + 1) % this.playlist.length);
        this.togglePlay();
    }

    updateTimeDisplay() {
        const timeDisplay = this.windowElement.querySelector('.time-display');
        const currentTime = this.formatTime(this.mediaElement.currentTime);
        const duration = this.formatTime(this.mediaElement.duration || 0);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    updatePlaylist() {
        const trackList = this.windowElement.querySelector('.track-list');
        trackList.innerHTML = '';
        
        this.playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = track.title;
            li.className = index === this.currentTrack ? 'active' : '';
            li.addEventListener('click', () => {
                this.loadTrack(index);
                this.togglePlay();
            });
            trackList.appendChild(li);
        });
    }
}

// Initialize Media Player
const mediaPlayer = new MediaPlayer(document.querySelector('.media-player-window'));
