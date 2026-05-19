// ==========================================
// LÓGICA DO RASTRO DE CORAÇÕES EXTERNO
// ==========================================
let alvoX = window.innerWidth / 2;
let alvoY = window.innerHeight / 2;
let atualX = alvoX;
let atualY = alvoY;
const suavizacao = 0.15;
let ultimoTempoRastro = 0;

window.addEventListener('mousemove', (e) => {
    alvoX = e.clientX;
    alvoY = e.clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    const toque = e.touches[0];
    alvoX = toque.clientX;
    alvoY = toque.clientY;
}, { passive: true });

function animar() {
    atualX += (alvoX - atualX) * suavizacao;
    atualY += (alvoY - atualY) * suavizacao;
    const agora = performance.now();
    
    // Verifica a distância e tempo para criar um rastro suave
    if (agora - ultimoTempoRastro > 70 && (Math.hypot(alvoX - atualX, alvoY - atualY) > 6)) {
        ultimoTempoRastro = agora;
        const rastro = document.createElement('div');
        rastro.className = 'rastro';
        rastro.textContent = '💖';
        
        // Alinha perfeitamente com a ponta do cursor
        rastro.style.left = (atualX - 10) + 'px';
        rastro.style.top = (atualY - 10) + 'px';
        
        document.body.appendChild(rastro);
        
        // Remove de forma limpa após o fim da animação CSS
        setTimeout(() => rastro.remove(), 650);
    }
    requestAnimationFrame(animar);
}

// Inicializa a animação cíclica
requestAnimationFrame(animar);