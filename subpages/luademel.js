
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

let valorArrecadadoBase = 6200.00; 
const valorMetaConstante = 20000.00;

const elementoArrecadado = document.getElementById('valorArrecadado');
const elementoBarra = document.getElementById('barraPreenchimento');
const elementoPorcentagem = document.getElementById('textoPorcentagem');


function atualizarProgressoVisual(novoValor) {
    let porcentagem = (novoValor / valorMetaConstante) * 100;
    if (porcentagem > 100) porcentagem = 100;


    elementoArrecadado.textContent = novoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    elementoBarra.style.width = `${porcentagem.toFixed(0)}%`;
    elementoPorcentagem.textContent = `${porcentagem.toFixed(0)}%`;
}


const inputValor = document.getElementById('inputValor');
const botoesValores = document.querySelectorAll('.botaoValor');

botoesValores.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesValores.forEach(b => b.classList.remove('selecionado'));
        botao.classList.add('selecionado');
        

        inputValor.value = botao.getAttribute('data-valor');
        

        const valorAdicionado = parseFloat(inputValor.value.replace('.', '').replace(',', '.'));
        atualizarProgressoVisual(valorArrecadadoBase + valorAdicionado);
    });
});

inputValor.addEventListener('input', () => {
    botoesValores.forEach(b => b.classList.remove('selecionado'));
    

    let valorLimpo = inputValor.value.replace(/[^\d,]/g, '');
    inputValor.value = valorLimpo;
});

const botaoConfirmar = document.getElementById('botaoConfirmar');

botaoConfirmar.addEventListener('click', () => {

    let stringValor = inputValor.value.trim();
    
    if (!stringValor) {
        alert("Por favor, digite ou selecione um valor para contribuir!");
        return;
    }


    let valorNumero = parseFloat(stringValor.replace(/\./g, '').replace(',', '.'));

    if (isNaN(valorNumero) || valorNumero < 100) {
        alert("O valor mínimo para contribuição é de R$ 100,00.");
        return;
    }
    localStorage.setItem('valorContribuicaoLivre', stringValor);


    if (valorNumero === 100) {
        window.location.href = "pagepix/pix100.html";
    } else if (valorNumero === 250) {
        window.location.href = "pagepix/pix250.html";
    } else if (valorNumero === 500) {
        window.location.href = "pagepix/pix500.html";
    } else if (valorNumero === 1000) {
        window.location.href = "pagepix/pix1000.html";
    } else {
        window.location.href = "pagepix/pix_valor_livre.html"; 
    }
});