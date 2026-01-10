   function setCameraGoal(btn, val) {
    document.querySelectorAll('.cam-btn').forEach(b => {
        // État non sélectionné : Gris clair avec texte foncé
        b.style.backgroundColor = "#f8f9fa";
        b.style.color = "#003a70"; 
        b.style.borderColor = "#e2e8f0";
    });
    
    // État sélectionné : Fond violet et texte blanc
    btn.style.backgroundColor = "#9b2d86"; 
    btn.style.color = "white";
    btn.style.borderColor = "#9b2d86";
    
    selectedCameraGoal = val;
}

function setChart(type) {
    document.querySelectorAll('.chart-opt').forEach(b => {
        b.style.backgroundColor = "#f8f9fa";
        b.style.color = "#003a70";
        b.style.borderColor = "#e2e8f0";
    });
    
    const target = document.getElementById('chart-' + type);
    if(target) {
        target.style.backgroundColor = "#9b2d86";
        target.style.color = "white";
        target.style.borderColor = "#9b2d86";
    }
    selectedChart = type;
}
    
    
    // Variables globales pour stocker les choix des missions
let selectedCameraGoal = null;
let selectedChart = null;

// --- NAVIGATION ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen-' + id);
    if(target) {
        target.classList.add('active');
        window.scrollTo(0,0);
    }
}

// --- DRAG & DROP GÉNÉRIQUE ---
function allow(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const card = document.getElementById(data);
    // On cherche la zone de drop la plus proche
    const target = ev.target.classList.contains('drop-zone') ? ev.target : ev.target.closest('.drop-zone');
    
    if(target && card) {
        // On retire les styles de correction quand on déplace à nouveau une carte
        card.classList.remove('correct-card', 'wrong-card');
        target.appendChild(card);
    }
}

// --- MISSION 1 : CHAOS REPORT ---
function checkM1() {
    let correct = 0;
    const totalCards = 8;
    const zones = ['besoins', 'comm', 'tech', 'org'];
    
    document.querySelectorAll('#screen-m1 .card-item').forEach(card => card.classList.remove('correct-card', 'wrong-card'));

    zones.forEach(zId => {
        const zone = document.getElementById(zId);
        if(zone) {
            const items = zone.querySelectorAll('.card-item');
            items.forEach(item => {
                if (item.getAttribute('data-cat') === zId) {
                    item.classList.add('correct-card');
                    correct++;
                } else {
                    item.classList.add('wrong-card');
                }
            });
        }
    });

    const score = (correct / totalCards) * 100;
    if(score >= 75) {
        alert(`Félicitations Mission réussie ! Score : ${score}% (${correct}/${totalCards})`);
        setTimeout(() => showScreen('hub'), 2500);
    } else {
        alert(`Score insuffisant : ${score}%. Analyse tes erreurs en rouge.`);
    }
}

// --- MISSION 2 : ITÉRATIF VS INCRÉMENTAL ---
function checkM2() {
    let correct = 0;
    const totalCards = 9;
    const zones = ['iter', 'incr', 'both'];
    
    document.querySelectorAll('#screen-m2 .card-item').forEach(card => card.classList.remove('correct-card', 'wrong-card'));

    zones.forEach(zId => {
        const zone = document.getElementById(zId);
        if(zone) {
            const items = zone.querySelectorAll('.card-item');
            items.forEach(item => {
                if (item.getAttribute('data-cat') === zId) {
                    item.classList.add('correct-card');
                    correct++;
                } else {
                    item.classList.add('wrong-card');
                }
            });
        }
    });

    const score = (correct / totalCards) * 100;
    if(score >= 75) {
        alert(`Bravo ! Mission validée : ${score.toFixed(0)}%`);
        setTimeout(() => showScreen('hub'), 2500);
    } else {
        alert(`Score : ${score.toFixed(0)}%. Révise les concepts en rouge.`);
    }
}

// --- MISSION 3 : MYTHES & ARTEFACTS ---
function toggleStatement(btn, isCorrect) {
    // On retire les anciens styles
    btn.classList.remove('correct-card', 'wrong-card');
    // On applique le style de sélection MMI (Purple/Magenta)
    btn.classList.toggle('border-purple-500');
    btn.classList.toggle('bg-purple-500/20');
    // On stocke l'état
    btn.dataset.selected = (btn.dataset.selected === "true") ? "false" : "true";
    btn.dataset.isCorrect = isCorrect;
}

function checkM3() {
    let score = 0;
    const totalPoints = 5; 
    
    document.querySelectorAll('#myths-grid button').forEach(btn => {
        const isSelected = btn.dataset.selected === "true";
        const isCorrect = btn.dataset.isCorrect === "true";
        // On nettoie la sélection avant de mettre la correction
        btn.classList.remove('border-purple-500', 'bg-purple-500/20');
        if (isSelected) {
            if (isCorrect) { btn.classList.add('correct-card'); score++; }
            else { btn.classList.add('wrong-card'); }
        }
    });

    document.querySelectorAll('#artefacts .card-item').forEach(item => { 
        if (item.getAttribute('data-cat') === 'artefact') { item.classList.add('correct-card'); score++; }
        else { item.classList.add('wrong-card'); }
    });

    const finalPercent = (score / totalPoints) * 100;
    if (finalPercent >= 75) {
        alert(`Mission 3 validée ! Univers Scrum maîtrisé : ${finalPercent.toFixed(0)}%`);
        setTimeout(() => showScreen('hub'), 2500);
    } else {
        alert(`Score : ${finalPercent.toFixed(0)}%. Attention aux préjugés sur l'Agilité !`);
    }
}

// --- MISSION 4 : RÔLES SCRUM ---
function checkM4() {
    let correct = 0;
    const totalItems = 6;
    const roles = ['po', 'sm', 'dev'];

    document.querySelectorAll('#screen-m4 .card-item').forEach(card => card.classList.remove('correct-card', 'wrong-card'));

    roles.forEach(roleId => {
        const zone = document.getElementById(roleId);
        if(zone) {
            const items = zone.querySelectorAll('.card-item');
            items.forEach(item => {
                if (item.getAttribute('data-cat') === roleId) { item.classList.add('correct-card'); correct++; }
                else { item.classList.add('wrong-card'); }
            });
        }
    });

    const score = (correct / totalItems) * 100;
    if (score >= 75) {
        alert(`Équipe opérationnelle ! Score : ${score.toFixed(0)}%`);
        setTimeout(() => showScreen('hub'), 2500);
    } else {
        alert(`Score : ${score.toFixed(0)}%. Relisez bien les rôles de chacun.`);
    }
}

// --- MISSION 5 : TIMELINE DU SPRINT ---
function checkM5() {
    let correctTimeline = 0;
    document.querySelectorAll('#screen-m5 .card-item').forEach(card => card.classList.remove('correct-card', 'wrong-card'));

    for(let i = 1; i <= 4; i++) {
        const zone = document.getElementById('t' + i);
        if(zone) {
            const item = zone.querySelector('.card-item');
            if(item) {
                if(item.getAttribute('data-order') == i) { 
                    item.classList.add('correct-card'); 
                    correctTimeline++; 
                } else { 
                    item.classList.add('wrong-card'); 
                }
            }
        }
    }

    const finalScore = (correctTimeline / 4) * 100; 

    if (finalScore >= 75) {
        alert(`Sprint validé ! La chronologie est respectée : ${finalScore}%`);
        setTimeout(() => showScreen('hub'), 2500);
    } else {
        alert(`Score : ${finalScore}%. Rappel : Planning -> Daily -> Review -> Retro.`);
    }
}

// --- MISSION 6 : MANAGEMENT VISUEL ---
function setCameraGoal(btn, val) {
    document.querySelectorAll('.cam-btn').forEach(b => {
        // Remplacement du Cyan par le Magenta/Purple MMI
        b.classList.remove('bg-magenta-600', 'border-magenta-400', 'correct-card', 'wrong-card');
    });
    btn.classList.add('bg-magenta-600', 'border-magenta-400');
    selectedCameraGoal = val;
}

function setChart(type) {
    document.querySelectorAll('.chart-opt').forEach(b => {
        // Remplacement de l'Indigo par le Purple MMI
        b.classList.remove('border-purple-500', 'bg-purple-500/20', 'correct-card', 'wrong-card');
    });
    const target = document.getElementById('chart-' + type);
    if(target) {
        target.classList.add('border-purple-500', 'bg-purple-500/20');
    }
    selectedChart = type;
}

function checkM6() {
    let score = 0;
    const totalPoints = 4;

    // 1. Rôle (Secrétaire)
    const roleSelect = document.getElementById('role-select');
    if (roleSelect.value === 'sec') {
        roleSelect.classList.add('correct-card');
        score++;
    } else {
        roleSelect.classList.add('wrong-card');
    }

    // 2. CAMERA (Action)
    const selectedCamBtn = document.querySelector('.cam-btn.bg-magenta-600');
    if (selectedCamBtn) {
        if (selectedCameraGoal === 'A') {
            selectedCamBtn.classList.add('correct-card');
            score++;
        } else {
            selectedCamBtn.classList.add('wrong-card');
        }
    }

    // 3. Graphique (Courbe/Line)
    const selectedChartOpt = document.querySelector('.chart-opt.border-purple-500');
    if (selectedChartOpt) {
        if (selectedChart === 'line') {
            selectedChartOpt.classList.add('correct-card');
            score++;
        } else {
            selectedChartOpt.classList.add('wrong-card');
        }
    }

    // 4. Capitalisation
    const capitInput = document.getElementById('capit-input');
    const capitValue = capitInput.value.toLowerCase().trim();
    if (capitValue === "capitalisation") {
        capitInput.classList.add('correct-card');
        score++;
    } else {
        capitInput.classList.add('wrong-card');
    }

    const finalPercent = (score / totalPoints) * 100;

    if (finalPercent >= 75) {
        alert(`Excellent pilotage ! Score : ${finalPercent}% (${score}/${totalPoints})`);
        setTimeout(() => { showScreen('hub'); }, 3000);
    } else {
        alert(`Score : ${finalPercent}%. Regarde les indicateurs rouges pour t'améliorer.`);
    }
}