class Settings {
    constructor(windowElement) {
        this.windowElement = windowElement;
        this.currentBg = 'https://source.unsplash.com/random/1920x1080/?nature';
        this.init();
    }

    init() {
        this.setupUI();
        this.setupEventListeners();
    }

    setupUI() {
        this.windowElement.querySelector('.window-content').innerHTML = `
            <div class="settings-container">
                <div class="settings-sidebar">
                    <div class="settings-category active" data-category="personalization">
                        <i class="fas fa-palette"></i> Personalization
                    </div>
                    <div class="settings-category" data-category="system">
                        <i class="fas fa-cog"></i> System
                    </div>
                </div>
                <div class="settings-content">
                    <div class="settings-page active" data-page="personalization">
                        <h2>Personalization</h2>
                        <div class="setting-group">
                            <h3>Background</h3>
                            <div class="background-options">
                                <div class="background-option" style="background-image: url('https://source.unsplash.com/random/1920x1080/?nature')" data-bg="nature"></div>
                                <div class="background-option" style="background-image: url('https://source.unsplash.com/random/1920x1080/?city')" data-bg="city"></div>
                                <div class="background-option" style="background-image: url('https://source.unsplash.com/random/1920x1080/?space')" data-bg="space"></div>
                            </div>
                        </div>
                    </div>
                    <div class="settings-page" data-page="system">
                        <h2>System</h2>
                        <div class="setting-group">
                            <h3>Power Options</h3>
                            <div class="power-settings">
                                <button class="power-setting" data-action="sleep"><i class="fas fa-moon"></i> Sleep</button>
                                <button class="power-setting" data-action="restart"><i class="fas fa-redo"></i> Restart</button>
                                <button class="power-setting" data-action="shutdown"><i class="fas fa-power-off"></i> Shut down</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Category switching
        document.querySelectorAll('.settings-category').forEach(cat => {
            cat.addEventListener('click', () => {
                document.querySelector('.settings-category.active').classList.remove('active');
                cat.classList.add('active');
                document.querySelector('.settings-page.active').classList.remove('active');
                document.querySelector(`.settings-page[data-page="${cat.dataset.category}"]`).classList.add('active');
            });
        });

        // Background selection
        document.querySelectorAll('.background-option').forEach(option => {
            option.addEventListener('click', () => {
                document.body.style.backgroundImage = `url('${option.style.backgroundImage.slice(4, -1).replace(/"/g, "")}')`;
            });
        });

        // Power options
        document.querySelectorAll('.power-setting').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handlePowerAction(btn.dataset.action);
            });
        });
    }

    handlePowerAction(action) {
        const powerMenu = {
            sleep: () => alert('System going to sleep...'),
            restart: () => alert('Restarting system...'),
            shutdown: () => alert('Shutting down...')
        };
        powerMenu[action]();
    }
}
