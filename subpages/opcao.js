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
    
    if (agora - ultimoTempoRastro > 10 && (Math.hypot(alvoX - atualX, alvoY - atualY) > 6)) {
        ultimoTempoRastro = agora;
        const rastro = document.createElement('div');
        rastro.className = 'rastro';
        rastro.textContent = '💖';
        
        rastro.style.left = (atualX - 10) + 'px';
        rastro.style.top = (atualY - 10) + 'px';
        
        document.body.appendChild(rastro);
        
        setTimeout(() => rastro.remove(), 650);
    }
    requestAnimationFrame(animar);
}

requestAnimationFrame(animar);