
/* =========================
CONFIGURAÇÕES DO JOGO
========================= */

// Gera um número aleatório entre 1 e 100.
let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Define a quantidade máxima de tentativas.
const maxTentativas = 10;

// Inicializa o contador.
let tentativasRestantes = maxTentativas;

// Controla se o jogo terminou.
let jogoFinalizado = false;

/* =========================
ELEMENTOS DO HTML
========================= */

const formulario = document.getElementById("formulario-jogo");
const campoPalpite = document.getElementById("palpite");
const mensagem = document.getElementById("mensagem");
const tentativas = document.getElementById("tentativas");
const botaoChutar = document.getElementById("botao-chutar");
const botaoReiniciar = document.getElementById("botao-reiniciar");

/* =========================
FUNÇÃO PARA ATUALIZAR
AS TENTATIVAS
========================= */

function atualizarTentativas() {
tentativas.textContent =
`Tentativas restantes: ${tentativasRestantes}`;
}

/* =========================
FUNÇÃO PRINCIPAL DO JOGO
========================= */

formulario.addEventListener("submit", function(event) {


// Impede que a página seja recarregada.
event.preventDefault();

// Impede novas jogadas após o encerramento.
if (jogoFinalizado) {
    return;
}

// Captura o número digitado.
const palpite = Number(campoPalpite.value);

// Valida o número informado.
if (
    campoPalpite.value.trim() === "" ||
    !Number.isInteger(palpite) ||
    palpite < 1 ||
    palpite > 100
) {
    mensagem.textContent =
        "Digite um número inteiro entre 1 e 100.";

    return;
}

// Desconta uma tentativa válida.
tentativasRestantes--;

// Compara o palpite com o número secreto.
if (palpite === numeroSecreto) {

    mensagem.textContent =
        `Parabéns! Você acertou o número ${numeroSecreto}!`;

    encerrarJogo();

} else if (palpite > numeroSecreto) {

    mensagem.textContent =
        "Seu palpite é maior que o número secreto. Tente novamente!";

} else {

    mensagem.textContent =
        "Seu palpite é menor que o número secreto. Tente novamente!";

}

// Atualiza a quantidade de tentativas.
atualizarTentativas();

// Verifica se as tentativas acabaram.
if (tentativasRestantes === 0 && !jogoFinalizado) {

    mensagem.textContent =
        `Suas tentativas acabaram! O número secreto era ${numeroSecreto}.`;

    encerrarJogo();
}

// Limpa o campo para o próximo palpite.
campoPalpite.value = "";

// Devolve o foco ao campo de entrada.
if (!jogoFinalizado) {
    campoPalpite.focus();
}


});

/* =========================
FUNÇÃO PARA ENCERRAR
O JOGO
========================= */

function encerrarJogo() {


jogoFinalizado = true;

botaoChutar.disabled = true;
campoPalpite.disabled = true;

botaoReiniciar.hidden = false;


}

/* =========================
FUNÇÃO PARA REINICIAR
O JOGO
========================= */

botaoReiniciar.addEventListener("click", function() {


// Gera um novo número secreto.
numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Restaura as tentativas.
tentativasRestantes = maxTentativas;

// Libera uma nova partida.
jogoFinalizado = false;

// Limpa o campo e restaura os controles.
campoPalpite.value = "";
campoPalpite.disabled = false;
botaoChutar.disabled = false;

// Atualiza as mensagens.
mensagem.textContent = "Nova partida! Faça seu primeiro palpite.";

atualizarTentativas();

// Esconde o botão de reiniciar.
botaoReiniciar.hidden = true;

// Coloca o cursor no campo de entrada.
campoPalpite.focus();


});
