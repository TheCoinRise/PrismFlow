// PrismFlow Web - Main Game Logic

const Game = (function() {
    // ==================== STATE ====================
    let state = {
        currentScreen: 'menu',
        currentWorld: null,
        currentLevel: null,
        moveCount: 0,
        selectedPiece: null,
        inventory: [],
        placedPieces: {},
        lightBeams: [],
        targetStates: {},
        progress: {},
        gems: 0,
        longPressTimer: null,
        settings: {
            soundEnabled: true,
            vibrationEnabled: true,
            username: ''
        },
        currentTheme: 'default',
        unlockedThemes: ['default'],
        leaderboardData: [],
        leaderboardTab: 'levels',
        pendingThemePurchase: null
    };

    const STORAGE_KEY = 'prismflow_save';
    const LONG_PRESS_DURATION = 500;
    const COLOR_TOLERANCE = 30;

    // Leaderboard API endpoint - set this to your hosted PHP file URL
    const LEADERBOARD_API = 'leaderboard.php';

    // ==================== THEMES ====================
    const THEMES = [
        {
            id: 'default',
            name: 'Default',
            cost: 0,
            colors: {
                primary: '#00d4ff',
                secondary: '#7c3aed',
                accent: '#ff00ff'
            }
        },
        {
            id: 'sunset',
            name: 'Sunset',
            cost: 50,
            colors: {
                primary: '#ff6b35',
                secondary: '#f7c59f',
                accent: '#efa3b5'
            }
        },
        {
            id: 'forest',
            name: 'Forest',
            cost: 75,
            colors: {
                primary: '#2d6a4f',
                secondary: '#40916c',
                accent: '#95d5b2'
            }
        },
        {
            id: 'ocean',
            name: 'Ocean',
            cost: 75,
            colors: {
                primary: '#0077b6',
                secondary: '#00b4d8',
                accent: '#90e0ef'
            }
        },
        {
            id: 'lavender',
            name: 'Lavender',
            cost: 100,
            colors: {
                primary: '#7b2cbf',
                secondary: '#9d4edd',
                accent: '#c77dff'
            }
        },
        {
            id: 'cherry',
            name: 'Cherry',
            cost: 100,
            colors: {
                primary: '#d00000',
                secondary: '#dc2f02',
                accent: '#ffba08'
            }
        },
        {
            id: 'midnight',
            name: 'Midnight',
            cost: 125,
            colors: {
                primary: '#1a1a2e',
                secondary: '#16213e',
                accent: '#0f3460'
            }
        },
        {
            id: 'golden',
            name: 'Golden',
            cost: 150,
            colors: {
                primary: '#ffd700',
                secondary: '#ffb700',
                accent: '#ff8c00'
            }
        },
        {
            id: 'neon',
            name: 'Neon',
            cost: 200,
            colors: {
                primary: '#39ff14',
                secondary: '#ff073a',
                accent: '#00fff7'
            }
        },
        {
            id: 'aurora',
            name: 'Aurora',
            cost: 250,
            colors: {
                primary: '#00ff87',
                secondary: '#60efff',
                accent: '#ff00e4'
            }
        }
    ];

    // ==================== COLOR MIXER ====================
    const ColorMixer = {
        add: function(color1, color2) {
            return {
                r: Math.min(255, color1.r + color2.r),
                g: Math.min(255, color1.g + color2.g),
                b: Math.min(255, color1.b + color2.b)
            };
        },

        filter: function(color, filterType) {
            switch (filterType) {
                case PIECE_TYPES.FILTER_RED:
                    return { r: color.r, g: 0, b: 0 };
                case PIECE_TYPES.FILTER_GREEN:
                    return { r: 0, g: color.g, b: 0 };
                case PIECE_TYPES.FILTER_BLUE:
                    return { r: 0, g: 0, b: color.b };
                default:
                    return color;
            }
        },

        split: function(color) {
            // Split into RGB components
            const intensity = (color.r + color.g + color.b) / 3 / 255;
            return {
                red: { r: Math.round(color.r * intensity), g: 0, b: 0 },
                green: { r: 0, g: Math.round(color.g * intensity), b: 0 },
                blue: { r: 0, g: 0, b: Math.round(color.b * intensity) }
            };
        },

        matches: function(color1, color2, tolerance = COLOR_TOLERANCE) {
            return Math.abs(color1.r - color2.r) <= tolerance &&
                   Math.abs(color1.g - color2.g) <= tolerance &&
                   Math.abs(color1.b - color2.b) <= tolerance;
        },

        isBlack: function(color) {
            return color.r === 0 && color.g === 0 && color.b === 0;
        },

        toCSS: function(color) {
            return `rgb(${color.r}, ${color.g}, ${color.b})`;
        },

        toHex: function(color) {
            const r = color.r.toString(16).padStart(2, '0');
            const g = color.g.toString(16).padStart(2, '0');
            const b = color.b.toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        }
    };

    // ==================== LIGHT ENGINE ====================
    const LightEngine = {
        calculate: function(level, placedPieces) {
            const beams = [];
            const targetColors = {};
            const combinerInputs = {}; // Track colors entering each combiner
            const teleporterPairs = this.findTeleporterPairs(level, placedPieces);
            const MAX_SEGMENTS = 200;
            const MAX_ITERATIONS = 3;

            // Initialize target colors
            level.targets.forEach(t => {
                targetColors[t.id] = { r: 0, g: 0, b: 0 };
            });

            // Run multiple iterations for combiners to accumulate colors
            for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
                // Clear beams and targets on non-final iterations
                if (iteration < MAX_ITERATIONS - 1) {
                    beams.length = 0;
                    level.targets.forEach(t => {
                        targetColors[t.id] = { r: 0, g: 0, b: 0 };
                    });
                }

            // Process each source
            level.sources.forEach(source => {
                const visited = new Set();
                const queue = [{
                    x: source.position.x,
                    y: source.position.y,
                    direction: source.direction,
                    color: { ...source.color },
                    startX: source.position.x,
                    startY: source.position.y
                }];

                let segments = 0;

                while (queue.length > 0 && segments < MAX_SEGMENTS) {
                    const current = queue.shift();
                    segments++;

                    // Get next position
                    const next = this.getNextPosition(current.x, current.y, current.direction);

                    // Check bounds
                    if (next.x < 0 || next.x >= level.gridSize.width ||
                        next.y < 0 || next.y >= level.gridSize.height) {
                        beams.push({
                            x1: current.startX,
                            y1: current.startY,
                            x2: current.x + this.getDirectionOffset(current.direction).x * 0.5,
                            y2: current.y + this.getDirectionOffset(current.direction).y * 0.5,
                            color: current.color
                        });
                        continue;
                    }

                    // Check for target at next position
                    const target = level.targets.find(t =>
                        t.position.x === next.x && t.position.y === next.y);
                    if (target) {
                        beams.push({
                            x1: current.startX,
                            y1: current.startY,
                            x2: next.x,
                            y2: next.y,
                            color: current.color
                        });
                        targetColors[target.id] = ColorMixer.add(
                            targetColors[target.id],
                            current.color
                        );
                        continue;
                    }

                    // Check for piece at next position
                    const pieceKey = `${next.x},${next.y}`;
                    const piece = placedPieces[pieceKey];

                    // Check for locked cell
                    const isLocked = level.lockedCells.some(c =>
                        c.x === next.x && c.y === next.y);

                    if (piece) {
                        // Draw beam to piece
                        beams.push({
                            x1: current.startX,
                            y1: current.startY,
                            x2: next.x,
                            y2: next.y,
                            color: current.color
                        });

                        // Process piece interaction
                        const outputs = this.processPiece(piece, current.direction, current.color, pieceKey, teleporterPairs, placedPieces);
                        outputs.forEach(output => {
                            let outputColor = output.color;

                            // Handle combiner - accumulate and use combined color
                            if (output.isCombiner) {
                                const combinerKey = `${next.x},${next.y}`;
                                if (!combinerInputs[combinerKey]) {
                                    combinerInputs[combinerKey] = { r: 0, g: 0, b: 0 };
                                }
                                // Add this beam's color to the combiner
                                combinerInputs[combinerKey] = ColorMixer.add(
                                    combinerInputs[combinerKey],
                                    current.color
                                );
                                // Output the accumulated combined color
                                outputColor = { ...combinerInputs[combinerKey] };
                            }

                            if (!ColorMixer.isBlack(outputColor)) {
                                // For teleporter outputs, use the exit position
                                const outX = output.exitX !== undefined ? output.exitX : next.x;
                                const outY = output.exitY !== undefined ? output.exitY : next.y;

                                const visitKey = `${outX},${outY},${output.direction},${ColorMixer.toHex(outputColor)}`;
                                if (!visited.has(visitKey)) {
                                    visited.add(visitKey);
                                    queue.push({
                                        x: outX,
                                        y: outY,
                                        direction: output.direction,
                                        color: outputColor,
                                        startX: outX,
                                        startY: outY
                                    });
                                }
                            }
                        });
                    } else if (!isLocked) {
                        // Continue through empty cell
                        const visitKey = `${next.x},${next.y},${current.direction},${ColorMixer.toHex(current.color)}`;
                        if (!visited.has(visitKey)) {
                            visited.add(visitKey);
                            queue.push({
                                x: next.x,
                                y: next.y,
                                direction: current.direction,
                                color: current.color,
                                startX: current.startX,
                                startY: current.startY
                            });
                        }
                    } else {
                        // Hit locked cell - end beam
                        beams.push({
                            x1: current.startX,
                            y1: current.startY,
                            x2: next.x,
                            y2: next.y,
                            color: current.color
                        });
                    }
                }
            });
            } // End iteration loop

            // Calculate target satisfaction
            const targetStates = {};
            level.targets.forEach(target => {
                targetStates[target.id] = {
                    receivedColor: targetColors[target.id],
                    satisfied: ColorMixer.matches(targetColors[target.id], target.requiredColor)
                };
            });

            return { beams, targetStates };
        },

        findTeleporterPairs: function(level, placedPieces) {
            // Find all teleporters and pair them
            const teleporters = [];

            // Check placed pieces
            Object.entries(placedPieces).forEach(([key, piece]) => {
                if (piece.type === PIECE_TYPES.TELEPORTER) {
                    const [x, y] = key.split(',').map(Number);
                    teleporters.push({ x, y, key });
                }
            });

            // Check preplaced pieces
            if (level.preplacedPieces) {
                level.preplacedPieces.forEach(pp => {
                    if (pp.piece.type === PIECE_TYPES.TELEPORTER) {
                        const key = `${pp.position.x},${pp.position.y}`;
                        if (!teleporters.find(t => t.key === key)) {
                            teleporters.push({ x: pp.position.x, y: pp.position.y, key });
                        }
                    }
                });
            }

            // Create pairs (teleporter 0 connects to 1, 1 to 0, 2 to 3, etc.)
            const pairs = {};
            for (let i = 0; i < teleporters.length; i += 2) {
                if (i + 1 < teleporters.length) {
                    pairs[teleporters[i].key] = teleporters[i + 1];
                    pairs[teleporters[i + 1].key] = teleporters[i];
                }
            }

            return pairs;
        },

        getNextPosition: function(x, y, direction) {
            const offset = this.getDirectionOffset(direction);
            return { x: x + offset.x, y: y + offset.y };
        },

        getDirectionOffset: function(direction) {
            switch (direction) {
                case 'up': return { x: 0, y: -1 };
                case 'down': return { x: 0, y: 1 };
                case 'left': return { x: -1, y: 0 };
                case 'right': return { x: 1, y: 0 };
                default: return { x: 0, y: 0 };
            }
        },

        processPiece: function(piece, inDirection, inColor, pieceKey, teleporterPairs, placedPieces) {
            const outputs = [];

            switch (piece.type) {
                case PIECE_TYPES.MIRROR_FORWARD: // /
                    outputs.push({
                        direction: this.reflectForward(inDirection),
                        color: inColor
                    });
                    break;

                case PIECE_TYPES.MIRROR_BACKWARD: // \
                    outputs.push({
                        direction: this.reflectBackward(inDirection),
                        color: inColor
                    });
                    break;

                case PIECE_TYPES.PRISM:
                    const split = ColorMixer.split(inColor);
                    const prismOutputs = this.getPrismOutputs(inDirection);
                    if (!ColorMixer.isBlack(split.red)) {
                        outputs.push({ direction: prismOutputs.left, color: split.red });
                    }
                    if (!ColorMixer.isBlack(split.green)) {
                        outputs.push({ direction: prismOutputs.straight, color: split.green });
                    }
                    if (!ColorMixer.isBlack(split.blue)) {
                        outputs.push({ direction: prismOutputs.right, color: split.blue });
                    }
                    break;

                case PIECE_TYPES.COMBINER:
                    // Combiner accumulates colors from all beams and outputs combined color
                    outputs.push({ direction: inDirection, color: inColor, isCombiner: true });
                    break;

                case PIECE_TYPES.FILTER_RED:
                case PIECE_TYPES.FILTER_GREEN:
                case PIECE_TYPES.FILTER_BLUE:
                    const filtered = ColorMixer.filter(inColor, piece.type);
                    if (!ColorMixer.isBlack(filtered)) {
                        outputs.push({ direction: inDirection, color: filtered });
                    }
                    break;

                case PIECE_TYPES.SPLITTER:
                    const perpendicular = this.getPerpendicularDirections(inDirection);
                    const halfColor = {
                        r: Math.floor(inColor.r / 2),
                        g: Math.floor(inColor.g / 2),
                        b: Math.floor(inColor.b / 2)
                    };
                    outputs.push({ direction: perpendicular.left, color: halfColor });
                    outputs.push({ direction: perpendicular.right, color: halfColor });
                    break;

                case PIECE_TYPES.TELEPORTER:
                    // Find paired teleporter and output from there
                    const pairedTeleporter = teleporterPairs[pieceKey];
                    if (pairedTeleporter) {
                        outputs.push({
                            direction: inDirection,
                            color: inColor,
                            exitX: pairedTeleporter.x,
                            exitY: pairedTeleporter.y
                        });
                    }
                    break;
            }

            return outputs;
        },

        reflectForward: function(direction) {
            // / mirror
            switch (direction) {
                case 'up': return 'right';
                case 'down': return 'left';
                case 'left': return 'down';
                case 'right': return 'up';
                default: return direction;
            }
        },

        reflectBackward: function(direction) {
            // \ mirror
            switch (direction) {
                case 'up': return 'left';
                case 'down': return 'right';
                case 'left': return 'up';
                case 'right': return 'down';
                default: return direction;
            }
        },

        getPrismOutputs: function(inDirection) {
            switch (inDirection) {
                case 'down':
                    return { left: 'left', straight: 'down', right: 'right' };
                case 'up':
                    return { left: 'right', straight: 'up', right: 'left' };
                case 'right':
                    return { left: 'up', straight: 'right', right: 'down' };
                case 'left':
                    return { left: 'down', straight: 'left', right: 'up' };
                default:
                    return { left: 'left', straight: 'down', right: 'right' };
            }
        },

        getPerpendicularDirections: function(direction) {
            switch (direction) {
                case 'up':
                case 'down':
                    return { left: 'left', right: 'right' };
                case 'left':
                case 'right':
                    return { left: 'up', right: 'down' };
                default:
                    return { left: 'left', right: 'right' };
            }
        }
    };

    // ==================== PERSISTENCE ====================
    function saveProgress() {
        const data = {
            progress: state.progress,
            gems: state.gems,
            settings: state.settings,
            currentTheme: state.currentTheme,
            unlockedThemes: state.unlockedThemes
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadProgress() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                state.progress = parsed.progress || {};
                state.gems = parsed.gems || 0;
                state.settings = parsed.settings || { soundEnabled: true, vibrationEnabled: true, username: '' };
                state.currentTheme = parsed.currentTheme || 'default';
                state.unlockedThemes = parsed.unlockedThemes || ['default'];

                // Ensure username exists in settings
                if (state.settings.username === undefined) {
                    state.settings.username = '';
                }
            }
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
    }

    function getStats() {
        const totalLevels = typeof getTotalLevels === 'function' ? getTotalLevels() : 80;
        const totalPossibleStars = typeof getTotalPossibleStars === 'function' ? getTotalPossibleStars() : 240;
        let completedLevels = 0;
        let totalStars = 0;

        Object.values(state.progress).forEach(p => {
            if (p.completed) completedLevels++;
            totalStars += p.stars || 0;
        });

        return {
            gems: state.gems,
            completedLevels,
            totalLevels,
            totalStars,
            totalPossibleStars
        };
    }

    function getLevelProgress(levelId) {
        return state.progress[levelId] || { completed: false, stars: 0 };
    }

    function saveLevelProgress(levelId, stars) {
        const existing = getLevelProgress(levelId);
        const isNewCompletion = !existing.completed;
        const isBetterScore = stars > existing.stars;

        if (isNewCompletion || isBetterScore) {
            const gemsEarned = stars * 5;
            state.gems += gemsEarned;
            state.progress[levelId] = {
                completed: true,
                stars: Math.max(stars, existing.stars)
            };
            saveProgress();

            // Submit to leaderboard if username is set
            if (state.settings.username) {
                submitToLeaderboard();
            }

            return gemsEarned;
        }
        return 0;
    }

    // ==================== THEME MANAGEMENT ====================
    function applyTheme(themeId) {
        const theme = THEMES.find(t => t.id === themeId);
        if (!theme) return;

        document.documentElement.style.setProperty('--primary', theme.colors.primary);
        document.documentElement.style.setProperty('--secondary', theme.colors.secondary);
        document.documentElement.style.setProperty('--accent', theme.colors.accent);

        state.currentTheme = themeId;
        saveProgress();
    }

    function purchaseTheme(themeId) {
        const theme = THEMES.find(t => t.id === themeId);
        if (!theme) return false;

        if (state.gems >= theme.cost) {
            state.gems -= theme.cost;
            state.unlockedThemes.push(themeId);
            saveProgress();
            return true;
        }
        return false;
    }

    function isThemeUnlocked(themeId) {
        return state.unlockedThemes.includes(themeId);
    }

    // ==================== LEADERBOARD ====================
    async function fetchLeaderboard() {
        try {
            const response = await fetch(`${LEADERBOARD_API}?action=get`);
            if (response.ok) {
                const data = await response.json();
                state.leaderboardData = data.leaderboard || [];
            }
        } catch (e) {
            console.error('Failed to fetch leaderboard:', e);
            state.leaderboardData = [];
        }
    }

    async function submitToLeaderboard() {
        if (!state.settings.username) return;

        const stats = getStats();

        try {
            await fetch(LEADERBOARD_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'submit',
                    username: state.settings.username,
                    levels: stats.completedLevels,
                    stars: stats.totalStars,
                    gems: stats.gems
                })
            });
        } catch (e) {
            console.error('Failed to submit to leaderboard:', e);
        }
    }

    function renderLeaderboard() {
        const container = document.getElementById('leaderboard-list');
        const selfContainer = document.getElementById('leaderboard-self');

        // Sort based on current tab
        const sortedData = [...state.leaderboardData].sort((a, b) => {
            if (state.leaderboardTab === 'levels') {
                return b.levels - a.levels || b.stars - a.stars;
            } else {
                return b.stars - a.stars || b.levels - a.levels;
            }
        });

        // Top 10
        const top10 = sortedData.slice(0, 10);

        if (top10.length === 0) {
            container.innerHTML = '<div class="leaderboard-empty">No players yet. Be the first!</div>';
        } else {
            container.innerHTML = top10.map((entry, index) => {
                const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
                const value = state.leaderboardTab === 'levels' ? entry.levels : entry.stars;
                const label = state.leaderboardTab === 'levels' ? 'levels' : 'stars';

                return `
                    <div class="leaderboard-item ${entry.username === state.settings.username ? 'self' : ''}">
                        <span class="leaderboard-rank ${rankClass}">#${index + 1}</span>
                        <span class="leaderboard-name">${escapeHtml(entry.username)}</span>
                        <span class="leaderboard-score">${value} ${label}</span>
                    </div>
                `;
            }).join('');
        }

        // Find and show user's rank
        if (state.settings.username) {
            const userIndex = sortedData.findIndex(e => e.username === state.settings.username);
            const stats = getStats();
            const value = state.leaderboardTab === 'levels' ? stats.completedLevels : stats.totalStars;
            const label = state.leaderboardTab === 'levels' ? 'levels' : 'stars';

            if (userIndex >= 0 && userIndex < 10) {
                selfContainer.innerHTML = '';
            } else {
                selfContainer.innerHTML = `
                    <div class="leaderboard-item self">
                        <span class="leaderboard-rank">#${userIndex >= 0 ? userIndex + 1 : '-'}</span>
                        <span class="leaderboard-name">${escapeHtml(state.settings.username)}</span>
                        <span class="leaderboard-score">${value} ${label}</span>
                    </div>
                `;
            }
        } else {
            selfContainer.innerHTML = '<div class="leaderboard-no-username">Set a username in Settings to appear on the leaderboard!</div>';
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==================== SHOP ====================
    function renderShop() {
        const container = document.getElementById('theme-grid');
        document.getElementById('shop-gems').textContent = state.gems;

        container.innerHTML = THEMES.map(theme => {
            const unlocked = isThemeUnlocked(theme.id);
            const isActive = state.currentTheme === theme.id;
            const canAfford = state.gems >= theme.cost;

            return `
                <div class="theme-card ${unlocked ? 'unlocked' : ''} ${isActive ? 'active' : ''}"
                     onclick="Game.handleThemeClick('${theme.id}')">
                    <div class="theme-preview-colors">
                        <span style="background: ${theme.colors.primary}"></span>
                        <span style="background: ${theme.colors.secondary}"></span>
                        <span style="background: ${theme.colors.accent}"></span>
                    </div>
                    <div class="theme-name">${theme.name}</div>
                    ${unlocked ?
                        (isActive ? '<div class="theme-status">Active</div>' : '<div class="theme-status">Owned</div>') :
                        `<div class="theme-cost ${canAfford ? '' : 'cant-afford'}">${theme.cost} 💎</div>`
                    }
                </div>
            `;
        }).join('');
    }

    // ==================== UI HELPERS ====================
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        state.currentScreen = screenId;
    }

    function showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    function hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    function getPieceIcon(type) {
        switch (type) {
            case PIECE_TYPES.MIRROR_FORWARD: return '/';
            case PIECE_TYPES.MIRROR_BACKWARD: return '\\';
            case PIECE_TYPES.PRISM: return '△';
            case PIECE_TYPES.COMBINER: return '◇';
            case PIECE_TYPES.FILTER_RED: return 'R';
            case PIECE_TYPES.FILTER_GREEN: return 'G';
            case PIECE_TYPES.FILTER_BLUE: return 'B';
            case PIECE_TYPES.SPLITTER: return '┼';
            case PIECE_TYPES.TELEPORTER: return '⊙';
            default: return '?';
        }
    }

    function getPieceClass(type) {
        switch (type) {
            case PIECE_TYPES.MIRROR_FORWARD:
            case PIECE_TYPES.MIRROR_BACKWARD:
                return 'mirror';
            case PIECE_TYPES.PRISM: return 'prism';
            case PIECE_TYPES.COMBINER: return 'combiner';
            case PIECE_TYPES.FILTER_RED: return 'filter-red';
            case PIECE_TYPES.FILTER_GREEN: return 'filter-green';
            case PIECE_TYPES.FILTER_BLUE: return 'filter-blue';
            case PIECE_TYPES.SPLITTER: return 'splitter';
            case PIECE_TYPES.TELEPORTER: return 'teleporter';
            default: return '';
        }
    }

    // ==================== RENDERING ====================
    function renderWorldSelect() {
        const container = document.getElementById('world-list');
        container.innerHTML = '';

        WORLDS.forEach(world => {
            const levels = getLevelsForWorld(world.id);
            const completedCount = levels.filter(l => getLevelProgress(l.id).completed).length;
            const totalStars = levels.reduce((sum, l) => sum + getLevelProgress(l.id).stars, 0);
            const maxStars = levels.length * 3;
            const progress = (completedCount / levels.length) * 100;

            const card = document.createElement('div');
            card.className = `world-card${world.locked ? ' locked' : ''}`;
            card.innerHTML = `
                <div class="world-header">
                    <span class="world-icon">${world.icon}</span>
                    <div class="world-info">
                        <div class="world-name">${world.name}</div>
                        <div class="world-subtitle">${world.subtitle}</div>
                    </div>
                </div>
                <div class="world-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">${completedCount}/${levels.length}</span>
                </div>
                <div class="world-stars">★ ${totalStars}/${maxStars}</div>
            `;

            if (!world.locked) {
                card.onclick = () => showLevelSelect(world.id);
            }

            container.appendChild(card);
        });

        document.getElementById('total-gems').textContent = state.gems;
    }

    function renderLevelSelect(worldId) {
        const world = WORLDS.find(w => w.id === worldId);
        const levels = getLevelsForWorld(worldId);
        const container = document.getElementById('level-grid');

        document.getElementById('level-screen-title').textContent = world.name;
        container.innerHTML = '';

        levels.forEach((level, index) => {
            const progress = getLevelProgress(level.id);
            const prevLevel = index > 0 ? levels[index - 1] : null;
            const isLocked = index > 0 && !getLevelProgress(prevLevel.id).completed;

            const cell = document.createElement('div');
            cell.className = `level-cell${progress.completed ? ' completed' : ''}${isLocked ? ' locked' : ''}`;

            if (isLocked) {
                cell.innerHTML = `<span class="lock-icon">🔒</span>`;
            } else {
                const stars = progress.stars;
                const starsHTML = [1, 2, 3].map(i =>
                    `<span class="${i <= stars ? '' : 'star-empty'}">★</span>`
                ).join('');

                cell.innerHTML = `
                    <span class="level-number">${level.levelNumber}</span>
                    <span class="level-stars">${starsHTML}</span>
                `;
                cell.onclick = () => startLevel(level.id);
            }

            container.appendChild(cell);
        });
    }

    function renderGame() {
        const level = state.currentLevel;
        if (!level) return;

        const grid = document.getElementById('puzzle-grid');
        const { width, height } = level.gridSize;

        grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        grid.innerHTML = '';

        // Create cells
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.x = x;
                cell.dataset.y = y;

                // Check if locked
                const isLocked = level.lockedCells.some(c => c.x === x && c.y === y);
                if (isLocked) {
                    cell.classList.add('locked');
                }

                // Check for source
                const source = level.sources.find(s => s.position.x === x && s.position.y === y);
                if (source) {
                    cell.innerHTML = `
                        <div class="source" style="background: ${ColorMixer.toCSS(source.color)}">
                            <span class="source-arrow ${source.direction}">▶</span>
                        </div>
                    `;
                    cell.classList.add('locked');
                }

                // Check for target
                const target = level.targets.find(t => t.position.x === x && t.position.y === y);
                if (target) {
                    const targetState = state.targetStates[target.id];
                    const satisfied = targetState?.satisfied;
                    const receivedColor = targetState?.receivedColor || { r: 0, g: 0, b: 0 };

                    cell.innerHTML = `
                        <div class="target${satisfied ? ' satisfied' : ''}"
                             style="border-color: ${ColorMixer.toCSS(target.requiredColor)};
                                    background: ${satisfied ? ColorMixer.toCSS(receivedColor) : 'transparent'}">
                            ${satisfied ? '<span class="target-check">✓</span>' : ''}
                        </div>
                    `;
                    cell.classList.add('locked');
                }

                // Check for placed piece
                const pieceKey = `${x},${y}`;
                const piece = state.placedPieces[pieceKey];
                if (piece && !source && !target) {
                    cell.innerHTML = `
                        <span class="piece ${getPieceClass(piece.type)}">${getPieceIcon(piece.type)}</span>
                    `;
                }

                // Add event listeners
                if (!isLocked && !source && !target) {
                    cell.addEventListener('click', () => handleCellClick(x, y));
                    cell.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        removePiece(x, y);
                    });
                    cell.addEventListener('touchstart', (e) => handleCellTouchStart(e, x, y));
                    cell.addEventListener('touchend', handleCellTouchEnd);
                    cell.addEventListener('touchmove', handleCellTouchEnd);
                }

                grid.appendChild(cell);
            }
        }

        renderLightBeams();
        renderInventory();
        updateMoveCount();
        checkWinCondition();
    }

    function renderLightBeams() {
        const svg = document.getElementById('light-beams');
        const grid = document.getElementById('puzzle-grid');
        const level = state.currentLevel;
        if (!level) return;

        const rect = grid.getBoundingClientRect();
        const cellWidth = rect.width / level.gridSize.width;
        const cellHeight = rect.height / level.gridSize.height;

        svg.innerHTML = '';

        state.lightBeams.forEach(beam => {
            // Glow layer
            const glow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            glow.setAttribute('x1', (beam.x1 + 0.5) * cellWidth);
            glow.setAttribute('y1', (beam.y1 + 0.5) * cellHeight);
            glow.setAttribute('x2', (beam.x2 + 0.5) * cellWidth);
            glow.setAttribute('y2', (beam.y2 + 0.5) * cellHeight);
            glow.setAttribute('stroke', ColorMixer.toCSS(beam.color));
            glow.setAttribute('class', 'light-beam glow');
            svg.appendChild(glow);

            // Main beam
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', (beam.x1 + 0.5) * cellWidth);
            line.setAttribute('y1', (beam.y1 + 0.5) * cellHeight);
            line.setAttribute('x2', (beam.x2 + 0.5) * cellWidth);
            line.setAttribute('y2', (beam.y2 + 0.5) * cellHeight);
            line.setAttribute('stroke', ColorMixer.toCSS(beam.color));
            line.setAttribute('class', 'light-beam');
            svg.appendChild(line);
        });
    }

    function renderInventory() {
        const container = document.getElementById('inventory-bar');
        container.innerHTML = '';

        state.inventory.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = `inventory-item${item.count === 0 ? ' empty' : ''}${state.selectedPiece === index ? ' selected' : ''}`;
            div.innerHTML = `
                <span class="inventory-piece ${getPieceClass(item.type)}">${getPieceIcon(item.type)}</span>
                <span class="inventory-count">×${item.count}</span>
            `;

            if (item.count > 0) {
                div.onclick = () => selectPiece(index);
            }

            container.appendChild(div);
        });
    }

    function updateMoveCount() {
        document.getElementById('move-count').textContent = state.moveCount;
    }

    // ==================== GAME LOGIC ====================
    function startLevel(levelId) {
        const level = getLevel(levelId);
        if (!level) return;

        state.currentLevel = level;
        state.moveCount = 0;
        state.selectedPiece = null;
        state.placedPieces = {};
        state.lightBeams = [];
        state.targetStates = {};

        // Copy inventory
        state.inventory = level.availablePieces.map(p => ({ ...p }));

        // Place preplaced pieces
        level.preplacedPieces.forEach(pp => {
            const key = `${pp.position.x},${pp.position.y}`;
            state.placedPieces[key] = { ...pp.piece };
        });

        // Select first available piece
        const firstAvailable = state.inventory.findIndex(i => i.count > 0);
        if (firstAvailable >= 0) {
            state.selectedPiece = firstAvailable;
        }

        document.getElementById('level-name').textContent = `${level.levelNumber}. ${level.name}`;

        // Calculate initial light
        calculateLight();

        showScreen('game-screen');
        renderGame();
    }

    function calculateLight() {
        const result = LightEngine.calculate(state.currentLevel, state.placedPieces);
        state.lightBeams = result.beams;
        state.targetStates = result.targetStates;
    }

    function selectPiece(index) {
        if (state.inventory[index].count > 0) {
            state.selectedPiece = index;
            renderInventory();
        }
    }

    function handleCellClick(x, y) {
        const key = `${x},${y}`;
        const existingPiece = state.placedPieces[key];

        if (existingPiece) {
            // Rotate existing piece (only mirrors are rotatable visually, but functionally all stay same)
            // For now, rotating mirrors swaps them
            if (existingPiece.type === PIECE_TYPES.MIRROR_FORWARD) {
                existingPiece.type = PIECE_TYPES.MIRROR_BACKWARD;
                state.moveCount++;
            } else if (existingPiece.type === PIECE_TYPES.MIRROR_BACKWARD) {
                existingPiece.type = PIECE_TYPES.MIRROR_FORWARD;
                state.moveCount++;
            }
            // Other pieces don't rotate meaningfully in this simplified version
        } else if (state.selectedPiece !== null && state.inventory[state.selectedPiece].count > 0) {
            // Place new piece
            const pieceType = state.inventory[state.selectedPiece].type;
            state.placedPieces[key] = { type: pieceType };
            state.inventory[state.selectedPiece].count--;
            state.moveCount++;

            // Auto-select next available piece if current is exhausted
            if (state.inventory[state.selectedPiece].count === 0) {
                const nextAvailable = state.inventory.findIndex(i => i.count > 0);
                state.selectedPiece = nextAvailable >= 0 ? nextAvailable : null;
            }
        }

        calculateLight();
        renderGame();
    }

    function handleCellTouchStart(e, x, y) {
        const key = `${x},${y}`;
        if (state.placedPieces[key]) {
            state.longPressTimer = setTimeout(() => {
                removePiece(x, y);
            }, LONG_PRESS_DURATION);
        }
    }

    function handleCellTouchEnd() {
        if (state.longPressTimer) {
            clearTimeout(state.longPressTimer);
            state.longPressTimer = null;
        }
    }

    function removePiece(x, y) {
        const key = `${x},${y}`;
        const piece = state.placedPieces[key];

        if (piece) {
            // Check if it's a preplaced piece (can't remove)
            const isPreplaced = state.currentLevel.preplacedPieces.some(
                pp => pp.position.x === x && pp.position.y === y
            );

            if (!isPreplaced) {
                // Return to inventory
                const invItem = state.inventory.find(i => i.type === piece.type);
                if (invItem) {
                    invItem.count++;
                }
                delete state.placedPieces[key];

                calculateLight();
                renderGame();
            }
        }
    }

    function checkWinCondition() {
        if (!state.currentLevel || state.moveCount === 0) return;

        const allSatisfied = state.currentLevel.targets.every(
            t => state.targetStates[t.id]?.satisfied
        );

        if (allSatisfied) {
            setTimeout(() => showWinScreen(), 300);
        }
    }

    function showWinScreen() {
        const level = state.currentLevel;
        const moves = state.moveCount;
        const par = level.parMoves;

        let stars = 1;
        if (moves <= par) stars = 3;
        else if (moves <= par + 2) stars = 2;

        const gemsEarned = saveLevelProgress(level.id, stars);

        // Update stars display
        const starsDisplay = document.getElementById('stars-display');
        const starElements = starsDisplay.querySelectorAll('.star');
        starElements.forEach((el, i) => {
            el.classList.remove('earned');
            if (i < stars) {
                setTimeout(() => el.classList.add('earned'), i * 200);
            }
        });

        // Update message
        const messages = [
            'Keep practicing!',
            'Good job!',
            'Great work!',
            'Perfect!'
        ];
        document.getElementById('complete-message').textContent = messages[stars];
        document.getElementById('gems-earned').textContent = gemsEarned;

        showModal('complete-modal');
    }

    function calculateStars(moves, par) {
        if (moves <= par) return 3;
        if (moves <= par + 2) return 2;
        return 1;
    }

    // ==================== PUBLIC API ====================
    // Internal helper
    function showLevelSelect(worldId) {
        state.currentWorld = worldId;
        renderLevelSelect(worldId);
        showScreen('level-screen');
    }

    return {
        init: function() {
            loadProgress();
            applyTheme(state.currentTheme);

            // Load username into input
            const usernameInput = document.getElementById('username-input');
            if (usernameInput) {
                usernameInput.value = state.settings.username || '';
            }

            // Show splash screen, then transition to menu
            showScreen('splash-screen');
            setTimeout(() => {
                showScreen('menu-screen');
            }, 1800); // Match the splash loader animation duration
        },

        showMenu: function() {
            showScreen('menu-screen');
        },

        showHowToPlay: function() {
            showScreen('howto-screen');
        },

        showSettings: function() {
            // Update stats display
            const stats = getStats();
            document.getElementById('settings-gems').textContent = `${stats.gems} 💎`;
            document.getElementById('settings-levels').textContent = `${stats.completedLevels} / ${stats.totalLevels}`;
            document.getElementById('settings-stars').textContent = `${stats.totalStars} / ${stats.totalPossibleStars} ★`;

            // Update toggles
            document.getElementById('sound-toggle').checked = state.settings.soundEnabled;
            document.getElementById('vibration-toggle').checked = state.settings.vibrationEnabled;

            // Update username
            const usernameInput = document.getElementById('username-input');
            if (usernameInput) {
                usernameInput.value = state.settings.username || '';
            }

            showScreen('settings-screen');
        },

        saveUsername: function() {
            const usernameInput = document.getElementById('username-input');
            if (usernameInput) {
                state.settings.username = usernameInput.value.trim();
                saveProgress();

                // Submit to leaderboard if there's progress
                const stats = getStats();
                if (state.settings.username && stats.completedLevels > 0) {
                    submitToLeaderboard();
                }
            }
        },

        toggleSound: function() {
            state.settings.soundEnabled = document.getElementById('sound-toggle').checked;
            saveProgress();
        },

        toggleVibration: function() {
            state.settings.vibrationEnabled = document.getElementById('vibration-toggle').checked;
            saveProgress();
        },

        confirmReset: function() {
            showModal('reset-modal');
        },

        closeResetModal: function() {
            hideModal('reset-modal');
        },

        resetProgress: function() {
            state.progress = {};
            state.gems = 0;
            state.currentTheme = 'default';
            state.unlockedThemes = ['default'];
            state.settings = { soundEnabled: true, vibrationEnabled: true, username: '' };
            saveProgress();
            applyTheme('default');
            hideModal('reset-modal');
            this.showSettings(); // Refresh stats display
        },

        showWorldSelect: function() {
            state.currentWorld = null;
            renderWorldSelect();
            showScreen('world-screen');
        },

        // Shop
        showShop: function() {
            renderShop();
            showScreen('shop-screen');
        },

        handleThemeClick: function(themeId) {
            if (isThemeUnlocked(themeId)) {
                // Apply the theme
                applyTheme(themeId);
                renderShop();
            } else {
                // Show purchase modal
                const theme = THEMES.find(t => t.id === themeId);
                if (!theme) return;

                state.pendingThemePurchase = themeId;

                document.getElementById('theme-modal-title').textContent = `Unlock ${theme.name}?`;
                document.getElementById('theme-modal-cost').textContent = `Cost: ${theme.cost} 💎`;

                // Preview colors
                document.getElementById('preview-color-1').style.background = theme.colors.primary;
                document.getElementById('preview-color-2').style.background = theme.colors.secondary;
                document.getElementById('preview-color-3').style.background = theme.colors.accent;

                // Update buy button
                const buyBtn = document.getElementById('theme-buy-btn');
                if (state.gems >= theme.cost) {
                    buyBtn.disabled = false;
                    buyBtn.textContent = 'Buy';
                } else {
                    buyBtn.disabled = true;
                    buyBtn.textContent = `Need ${theme.cost - state.gems} more 💎`;
                }

                showModal('theme-modal');
            }
        },

        closeThemeModal: function() {
            state.pendingThemePurchase = null;
            hideModal('theme-modal');
        },

        confirmThemePurchase: function() {
            if (state.pendingThemePurchase) {
                if (purchaseTheme(state.pendingThemePurchase)) {
                    applyTheme(state.pendingThemePurchase);
                    hideModal('theme-modal');
                    renderShop();
                }
            }
        },

        // Leaderboard
        showLeaderboard: async function() {
            showScreen('leaderboard-screen');
            document.getElementById('leaderboard-list').innerHTML = '<div class="leaderboard-loading">Loading...</div>';
            await fetchLeaderboard();
            renderLeaderboard();
        },

        refreshLeaderboard: async function() {
            document.getElementById('leaderboard-list').innerHTML = '<div class="leaderboard-loading">Loading...</div>';
            await fetchLeaderboard();
            renderLeaderboard();
        },

        switchLeaderboardTab: function(tab) {
            state.leaderboardTab = tab;
            document.getElementById('tab-levels').classList.toggle('active', tab === 'levels');
            document.getElementById('tab-stars').classList.toggle('active', tab === 'stars');
            renderLeaderboard();
        },

        backToLevels: function() {
            hideModal('complete-modal');
            showLevelSelect(state.currentLevel.worldId);
        },

        nextLevel: function() {
            hideModal('complete-modal');
            const currentLevel = state.currentLevel;
            const levels = getLevelsForWorld(currentLevel.worldId);
            const currentIndex = levels.findIndex(l => l.id === currentLevel.id);

            if (currentIndex < levels.length - 1) {
                startLevel(levels[currentIndex + 1].id);
            } else {
                // Check if there's a next world
                const nextWorld = WORLDS.find(w => w.id === currentLevel.worldId + 1);
                if (nextWorld && !nextWorld.locked) {
                    showLevelSelect(nextWorld.id);
                } else {
                    showLevelSelect(currentLevel.worldId);
                }
            }
        },

        resetLevel: function() {
            if (state.currentLevel) {
                startLevel(state.currentLevel.id);
            }
        },

        confirmExit: function() {
            if (state.moveCount > 0) {
                showModal('exit-modal');
            } else {
                this.exitLevel();
            }
        },

        closeExitModal: function() {
            hideModal('exit-modal');
        },

        exitLevel: function() {
            hideModal('exit-modal');
            showLevelSelect(state.currentLevel.worldId);
        }
    };
})();

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
