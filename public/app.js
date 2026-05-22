// Estado da aplicação (State)
let appState = {
    destinos: [],
    destinoSelecionado: null,
    horarioSelecionado: null,
    classeSelecionada: null,
    assentoSelecionado: null
};

// Configuração da API do servidor python
const API_URL = `http://${window.location.hostname}:5000/api/destinos`;

// Elementos da DOM (View Elements)
const telaDestinos = document.getElementById('tela-destinos');
const telaReserva = document.getElementById('tela-reserva');
const containerDestinos = document.getElementById('container-destinos');
const btnVoltar = document.getElementById('btn-voltar');
const btnFinalizar = document.getElementById('btn-finalizar');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarDestinos();
    configurarEventos();
    registrarServiceWorker();
});

// Busca os dados do Model através da API Python
async function carregarDestinos() {
    try {
        const response = await fetch(API_URL);
        appState.destinos = await response.json();
        renderizarDestinos();
    } catch (error) {
        console.error("Erro ao conectar na API Python, usando dados locais de backup.", error);
        // Backup atualizado usando a imagem local
        appState.destinos = [
            {id: 1, local: "Rio de Janeiro (Modo Local)", imagem: "rio.jpg", horarios: ["09:00"], preco_economica: 400, preco_executiva: 800}
        ];
        renderizarDestinos();
    }
}

function renderizarDestinos() {
    containerDestinos.innerHTML = '';
    appState.destinos.forEach(destino => {
        const card = document.createElement('div');
        card.className = 'card-destino';
        card.innerHTML = `
            <img src="${destino.imagem}" alt="${destino.local}">
            <h3>${destino.local}</h3>
        `;
        card.addEventListener('click', () => abrirReserva(destino));
        containerDestinos.appendChild(card);
    });
}

function abrirReserva(destino) {
    appState.destinoSelecionado = destino;
    document.getElementById('nome-destino-selecionado').innerText = destino.local;
    
    // Renderiza horários
    const containerHorarios = document.getElementById('container-horarios');
    containerHorarios.innerHTML = '';
    destino.horarios.forEach(horario => {
        const btn = document.createElement('button');
        btn.className = 'btn-opcao';
        btn.innerText = horario;
        btn.addEventListener('click', (e) => selecionarEstrategia(e, 'horarioSelecionado', horario));
        containerHorarios.appendChild(btn);
    });

    // Atualiza preços nos botões de classe
    document.getElementById('preco-eco').innerText = `Econômica: R$ ${destino.preco_economica}`;
    document.getElementById('preco-exe').innerText = `Executiva: R$ ${destino.preco_executiva}`;

    // Limpa seleções anteriores
    limparSelecoesFormulario();

    telaDestinos.classList.remove('ativa');
    telaReserva.classList.add('ativa');
}

function selecionarEstrategia(evento, chaveEstado, valor) {
    // Remove classe selecionado dos irmãos
    const parent = evento.target.parentElement;
    Array.from(parent.children).forEach(child => child.classList.remove('selecionado'));
    
    // Adiciona ao elemento clicado
    evento.target.classList.add('selecionado');
    
    // Salva no estado
    appState[chaveEstado] = valor;
    verificarValidacaoFormulario();
}

function configurarEventos() {
    btnVoltar.addEventListener('click', () => {
        telaReserva.classList.remove('ativa');
        telaDestinos.classList.add('ativa');
    });

    // Mapeia cliques nas classes
    document.querySelectorAll('.classe-voo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selecionarEstrategia(e, 'classeSelecionada', btn.dataset.classe);
        });
    });

    // Mapeia cliques nos assentos
    document.querySelectorAll('.assento').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selecionarEstrategia(e, 'assentoSelecionado', btn.dataset.assento);
        });
    });

    // Finalizar compra
    btnFinalizar.addEventListener('click', () => {
        alert(`🎉 Compra bem-sucedida!\n\nVoo para: ${appState.destinoSelecionado.local}\nHorário: ${appState.horarioSelecionado}\nAssento: ${appState.assentoSelecionado}\n\nObrigado por voar com a FlyDream!`);
        
        // Reseta e volta ao início
        telaReserva.classList.remove('ativa');
        telaDestinos.classList.add('ativa');
    });
}

function verificarValidacaoFormulario() {
    if (appState.horarioSelecionado && appState.classeSelecionada && appState.assentoSelecionado) {
        btnFinalizar.removeAttribute('disabled');
    } else {
        btnFinalizar.setAttribute('disabled', 'true');
    }
}

function limparSelecoesFormulario() {
    appState.horarioSelecionado = null;
    appState.classeSelecionada = null;
    appState.assentoSelecionado = null;
    btnFinalizar.setAttribute('disabled', 'true');
    document.querySelectorAll('.btn-opcao, .assento').forEach(el => el.classList.remove('selecionado'));
}

// Configuração PWA para Rodar Mobile nativamente
function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => console.log(err));
    }
}