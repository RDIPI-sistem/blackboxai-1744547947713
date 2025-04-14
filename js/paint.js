// Paint App for Windows 12 Web OS
class Paint {
    constructor(windowElement) {
        this.windowElement = windowElement;
        this.isDrawing = false;
        this.currentColor = '#000000';
        this.brushSize = 5;
        this.init();
    }

    init() {
        this.setupUI();
        this.setupEventListeners();
    }

    setupUI() {
        this.windowElement.querySelector('.window-content').innerHTML = `
            <div class="paint-toolbar">
                <div class="color-picker">
                    <input type="color" value="${this.currentColor}">
                </div>
                <div class="brush-sizes">
                    <button data-size="2">Small</button>
                    <button data-size="5" class="active">Medium</button>
                    <button data-size="10">Large</button>
                </div>
                <div class="tools">
                    <button data-tool="brush" class="active"><i class="fas fa-paint-brush"></i></button>
                    <button data-tool="eraser"><i class="fas fa-eraser"></i></button>
                    <button data-tool="clear"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <canvas class="paint-canvas"></canvas>
        `;

        this.canvas = this.windowElement.querySelector('.paint-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Color picker
        this.windowElement.querySelector('.color-picker input').addEventListener('input', (e) => {
            this.currentColor = e.target.value;
        });

        // Brush sizes
        this.windowElement.querySelectorAll('.brush-sizes button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.windowElement.querySelector('.brush-sizes .active').classList.remove('active');
                btn.classList.add('active');
                this.brushSize = parseInt(btn.dataset.size);
            });
        });

        // Tools
        this.windowElement.querySelectorAll('.tools button').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.tool === 'clear') {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                } else {
                    this.windowElement.querySelector('.tools .active').classList.remove('active');
                    btn.classList.add('active');
                    this.currentTool = btn.dataset.tool;
                }
            });
        });
    }

    resizeCanvas() {
        const container = this.windowElement.querySelector('.window-content');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight - 50; // Account for toolbar
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.draw(e);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        
        if (this.currentTool === 'eraser') {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.strokeStyle = 'rgba(0,0,0,1)';
        } else {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.strokeStyle = this.currentColor;
        }

        this.ctx.lineWidth = this.brushSize;
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX || x, this.lastY || y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing() {
        this.isDrawing = false;
        this.lastX = null;
        this.lastY = null;
    }
}

// Initialize Paint
const paint = new Paint(document.querySelector('.paint-window'));
