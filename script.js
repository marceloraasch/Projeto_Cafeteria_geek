// 1. Seleciona o botão de alternar o tema
const themeToggle = document.getElementById('theme-toggle');

// 2. Escuta o clique no botão
themeToggle.addEventListener('click', () => {
    // Adiciona ou remove a classe 'light-mode' do <body>
    document.body.classList.toggle('light-mode');
    
    // Altera o texto e o emoji do botão dependendo do modo ativo
    if (document.body.classList.contains('light-mode')) {
        themeToggle.textContent = '🌙 Modo Escuro';
    } else {
        themeToggle.textContent = '☀️ Modo Claro';
    }
});

// FUNCIONALIDADE 2: SISTEMA DE SENHA SECRETA (EASTER EGG)


let sequenciaTeclas = '';
const codigoSecreto = 'coffee'; // A palavra secreta que o usuário deve digitar

// 1. Criando os elementos visuais do Easter Egg dinamicamente via JS
const fundoEscuro = document.createElement('div');
fundoEscuro.className = 'easter-egg-overlay';

const terminalModal = document.createElement('div');
terminalModal.className = 'easter-egg-modal';
terminalModal.innerHTML = `
    <div class="terminal-header">
        <span>●</span><span>●</span><span>●</span> bash - core_protocol.sh
    </div>
    <div class="terminal-body">
        <p class="text-success"> ACESSO CONCEDIDO... 🔓</p>
        <p>> compilando_cafeina.exe...</p>
        <p>> Otimizando foco do desenvolvedor...</p>
        <p class="text-white mt-3"><strong>Parabéns, Dev! Você descobriu o segredo do servidor. ☕💻</strong></p>
        <p class="text-warning">Use o cupom <span class="badge bg-success text-white">SUDOCOFFEE</span> para garantir 15% de desconto na sua primeira Cabine de Foco!</p>
        <button id="fechar-terminal" class="btn btn-outline-danger btn-sm mt-3 w-100">Encerrar Sessão (Exit)</button>
    </div>
`;

// Adiciona os elementos criados dentro do body do site
document.body.appendChild(fundoEscuro);
document.body.appendChild(terminalModal);

// 2. Ouvindo o teclado do usuário para detectar a palavra
window.addEventListener('keydown', (evento) => {
    // Adiciona a tecla digitada à nossa sequência (convertendo para minúsculo)
    sequenciaTeclas += evento.key.toLowerCase();
    
    // Mantém a string apenas com o tamanho máximo do código secreto (6 letras)
    if (sequenciaTeclas.length > codigoSecreto.length) {
        sequenciaTeclas = sequenciaTeclas.slice(-codigoSecreto.length);
    }

    // Se o que ele digitou for exatamente "coffee", ativa o Easter Egg
    if (sequenciaTeclas === codigoSecreto) {
        fundoEscuro.classList.add('active');
        terminalModal.classList.add('active');
        sequenciaTeclas = ''; // Reseta a sequência para poder usar de novo
    }
});

// 3. Funções para fechar o terminal secreto
document.getElementById('fechar-terminal').addEventListener('click', fecharModalEgg);
fundoEscuro.addEventListener('click', fecharModalEgg);

function fecharModalEgg() {
    fundoEscuro.classList.remove('active');
    terminalModal.classList.remove('active');
}

// FUNCIONALIDADE 3: VALIDAÇÃO DE FORMULÁRIO E MENSAGEM DINÂMICA

// 1. Seleciona o formulário dentro da seção de contato
const formularioContato = document.querySelector('#contato form');

if (formularioContato) {
    formularioContato.addEventListener('submit', function(evento) {
        // Impede o comportamento padrão do formulário (recarregar a página)
        evento.preventDefault();

        // 2. Captura os campos internos do formulário usando seletores genéricos
        const campoNome = formularioContato.querySelector('input[type="text"]');
        const campoEmail = formularioContato.querySelector('input[type="email"]');
        const campoMensagem = formularioContato.querySelector('textarea');

        // 3. Validação extra via JavaScript (Regra de negócio)
        // Garante que o nome tenha pelo menos 3 caracteres tirando os espaços vazios
        if (campoNome.value.trim().length < 3) {
            alert('Por favor, insira um nome válido com pelo menos 3 caracteres.');
            campoNome.focus();
            return; // Interrompe a execução aqui caso esteja inválido
        }

        // 4. Criação dinâmica do Alerta de Sucesso usando componentes do Bootstrap
        const alertaSucesso = document.createElement('div');
        // Adiciona as classes de alerta, fechamento (dismissible) e margem do Bootstrap
        alertaSucesso.className = 'alert alert-success alert-dismissible fade show mt-3';
        alertaSucesso.setAttribute('role', 'alert');
        alertaSucesso.innerHTML = `
            <strong>Reserva Solicitada!</strong> Olá, ${campoNome.value.trim()}! Recebemos o seu pedido. 
            Enviaremos todos os detalhes e o link de confirmação para o e-mail <u>${campoEmail.value.trim()}</u> em breve. ☕✨
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // 5. Injeta o alerta dentro da seção de contato
        const secaoContato = document.getElementById('contato');
        
        // Verifica se já existe um alerta na tela para não ficar acumulando vários cliques
        const alertaAntigo = secaoContato.querySelector('.alert');
        if (alertaAntigo) {
            alertaAntigo.remove();
        }

        // Adiciona o novo alerta logo abaixo do formulário
        secaoContato.appendChild(alertaSucesso);

        // 6. Limpa todos os campos do formulário para o usuário poder interagir novamente
        formularioContato.reset();
    });
}

// FUNCIONALIDADE 4: CALCULADORA DE ORÇAMENTO DINÂMICA (COM LIMITES)


// 1. Mapeia os elementos do simulador
const tipoEspaco = document.getElementById('tipo-espaco');
const quantidadeTempo = document.getElementById('quantidade-tempo');
const labelTempo = document.getElementById('label-tempo');
const resultadoOrcamento = document.getElementById('resultado-orcamento');

// Definição dos limites máximos (Regras de Negócio)
const LIMITE_HORAS = 12; // Máximo de 12 horas por reserva
const LIMITE_DIAS = 30;  // Máximo de 30 dias para o Day Pass

if (tipoEspaco && quantidadeTempo && resultadoOrcamento) {
    
    // Define o limite máximo inicial no HTML (como o padrão é hora, começa com 12)
    quantidadeTempo.max = LIMITE_HORAS;

    // Função responsável por multiplicar o valor pela quantidade
    function calcularOrcamento() {
        let quantidade = parseInt(quantidadeTempo.value) || 0;
        const valorPlano = parseFloat(tipoEspaco.value);
        
        // Descobre qual é o limite atual com base no plano selecionado
        const limiteAtual = tipoEspaco.value === "160" ? LIMITE_DIAS : LIMITE_HORAS;

        // VALIDAÇÃO DE LIMITE: Se o utilizador digitar um valor acima do permitido
        if (quantidade > limiteAtual) {
            quantidade = limiteAtual; // Força o cálculo a usar o limite máximo
            quantidadeTempo.value = limiteAtual; // Corrige visualmente o número no campo
            alert(`Aviso: O limite máximo permitido para este plano é de ${limiteAtual} ${tipoEspaco.value === "160" ? 'dias' : 'horas'}.`);
        }

        // Se o utilizador ainda não escolheu um plano ou colocou valor inválido, zera o total
        if (!valorPlano || quantidade <= 0) {
            resultadoOrcamento.textContent = 'R$ 0,00';
            return;
        }

        // Realiza o cálculo básico
        const total = valorPlano * quantidade;

        // Formata dinamicamente o número para o padrão de moeda Real (R$ XX,XX)
        resultadoOrcamento.textContent = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    // 2. Evento para mudar o texto e os limites máximos ao alterar o espaço
    tipoEspaco.addEventListener('change', () => {
        if (tipoEspaco.value === "160") {
            labelTempo.textContent = 'Quantidade de Dias (Day Pass):';
            quantidadeTempo.max = LIMITE_DIAS; // Atualiza o atributo max do HTML para 30
        } else {
            labelTempo.textContent = 'Quantidade de Horas:';
            quantidadeTempo.max = LIMITE_HORAS; // Atualiza o atributo max do HTML para 12
        }
        
        // Se o utilizador já tiver digitado ex: 15 horas, e mudar para um plano de 12h max, reseta para 1
        if (parseInt(quantidadeTempo.value) > quantidadeTempo.max) {
            quantidadeTempo.value = 1;
        }

        // Recalcula o valor assim que muda o tipo de espaço
        calcularOrcamento();
    });

    // 3. Evento de escuta em tempo real (input) para recalcular a cada número digitado
    quantidadeTempo.addEventListener('input', calcularOrcamento);
}