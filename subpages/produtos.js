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

const tabelaProdutos = document.querySelector('.tabelaProdutos');
const botoesSeta = document.querySelectorAll('.botaoSeta');

botoesSeta[0].addEventListener('click', () => {
    const card = document.querySelector('.cardProduto');
    if (card) {
        const larguraDeslocamento = card.offsetWidth + 24; 
        
        if (tabelaProdutos.scrollLeft <= 0) {
            tabelaProdutos.scroll({
                left: tabelaProdutos.scrollWidth,
                behavior: 'smooth'
            });
        } else {
            tabelaProdutos.scrollBy({
                left: -larguraDeslocamento,
                behavior: 'smooth'
            });
        }
    }
});

botoesSeta[1].addEventListener('click', () => {
    const card = document.querySelector('.cardProduto');
    if (card) {
        const larguraDeslocamento = card.offsetWidth + 24;
        const fimAlcancado = tabelaProdutos.scrollLeft + tabelaProdutos.clientWidth >= tabelaProdutos.scrollWidth - 5;
        
        if (fimAlcancado) {
            tabelaProdutos.scroll({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            tabelaProdutos.scrollBy({
                left: larguraDeslocamento,
                behavior: 'smooth'
            });
        }
    }
});

const intercalarSelecaoPresente = () => {
    tabelaProdutos.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('botaoEscolher')) {
            const botaoAtual = e.target;
            const cardPai = botaoAtual.closest('.cardProduto');
            
            if (cardPai) {
                cardPai.classList.add('concluido');
                
                const divConcluido = document.createElement('div');
                divConcluido.className = 'botaoConcluido';
                divConcluido.textContent = '✓ Já escolhido';
                
                botaoAtual.parentNode.replaceChild(divConcluido, botaoAtual);
                
                const textoProgresso = cardPai.querySelector('.textoProgresso');
                const barraPreenchimento = cardPai.querySelector('.barraPreenchimento');
                if (textoProgresso && barraPreenchimento) {
                    const partesTexto = textoProgresso.textContent.split('de');
                    if (partesTexto.length > 1) {
                        const totalCotas = partesTexto[1].trim();
                        textoProgresso.textContent = `Recebido: ${totalCotas} de ${totalCotas}`;
                    }
                    barraPreenchimento.style.width = '100%';
                }
            }
        }
    });
};


intercalarSelecaoPresente();