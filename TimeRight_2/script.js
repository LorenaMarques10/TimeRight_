// --- Lógica de Login e Logout ---
const USUARIO_CORRETO = 'admin';
const SENHA_CORRETA = 'senha123';
const formularioLogin = document.getElementById('formularioLogin');
const areaAdmin = document.getElementById('areaAdmin');
const botaoSair = document.getElementById('botaoSair');
 
formularioLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const usuarioInput = document.getElementById('usuario').value;
    const senhaInput = document.getElementById('senha').value;
 
    if (usuarioInput === USUARIO_CORRETO && senhaInput === SENHA_CORRETA) {
        alert('Login bem-sucedido! Acesso concedido.');
        formularioLogin.style.display = 'none';
        areaAdmin.style.display = 'block';
        atualizarExibicaoDados(); // Chama a função para exibir os dados ao fazer login
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
        formularioLogin.reset();
    }
});
 
botaoSair.addEventListener('click', () => {
    areaAdmin.style.display = 'none';
    formularioLogin.style.display = 'block';
});
 
 
// --- Simulação de Banco de Dados com JavaScript ---
let funcionarios = [];
let servicos = [];
// Pega a agenda do LocalStorage. Se não existir, usa a agenda padrão.
let agenda = JSON.parse(localStorage.getItem('agenda')) || [
    { data: '2025-10-09', horario: '10:00', servico: 'Corte de Cabelo', funcionario: 'João', status: 'Livre' },
    { data: '2025-10-09', horario: '11:00', servico: 'Manicure', funcionario: 'Maria', status: 'Livre' },
    { data: '2025-10-09', horario: '12:00', servico: 'Massagem', funcionario: 'Pedro', status: 'Livre' }
];
 
// --- Funções para Gerenciar Dados e Interface ---
 
function atualizarExibicaoDados() {
    exibirFuncionarios();
    exibirServicos();
    exibirAgenda();
    calcularEstatisticas();
}
 
// Lógica de Cadastro de Funcionários
const formFuncionario = document.getElementById('formFuncionario');
formFuncionario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeFuncionario').value;
    if (nome) {
        funcionarios.push({ nome: nome });
        exibirFuncionarios();
        formFuncionario.reset();
    }
});
 
function exibirFuncionarios() {
    const lista = document.getElementById('listaFuncionarios');
    lista.innerHTML = ''; // Limpa a lista antes de adicionar os itens
    funcionarios.forEach(func => {
        const item = document.createElement('li');
        item.textContent = func.nome;
        lista.appendChild(item);
    });
}
 
// Lógica de Cadastro de Serviços
const formServico = document.getElementById('formServico');
formServico.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeServico').value;
    const preco = document.getElementById('precoServico').value;
    if (nome && preco) {
        servicos.push({ nome: nome, preco: preco });
        exibirServicos();
        formServico.reset();
    }
});
 
function exibirServicos() {
    const lista = document.getElementById('listaServicos');
    lista.innerHTML = '';
    servicos.forEach(serv => {
        const item = document.createElement('li');
        item.textContent = `${serv.nome} - R$ ${serv.preco}`;
        lista.appendChild(item);
    });
}
 
function exibirAgenda() {
    const lista = document.getElementById('listaAgenda');
    lista.innerHTML = '';
    agenda.forEach(evento => {
        const item = document.createElement('li');
        item.innerHTML = `
            <strong>Data:</strong> ${evento.data} |
            <strong>Horário:</strong> ${evento.horario} |
            <strong>Serviço:</strong> ${evento.servico} |
            <strong>Status:</strong> ${evento.status}
            ${evento.cliente ? ` | <strong>Cliente:</strong> ${evento.cliente}` : ''}
        `;
        lista.appendChild(item);
    });
}
 
// Lógica para Calcular e Exibir Estatísticas
function calcularEstatisticas() {
    const hoje = new Date().toISOString().slice(0, 10);
    const esteMes = hoje.slice(0, 7);
    const esteAno = hoje.slice(0, 4);
 
    const agendaHoje = agenda.filter(e => e.data === hoje);
    const agendamentosDia = agendaHoje.filter(e => e.status === 'Marcado').length;
    const totalDia = agendaHoje.length;
 
    const agendamentosMes = agenda.filter(e => e.data.startsWith(esteMes) && e.status === 'Marcado').length;
    const totalMes = agenda.filter(e => e.data.startsWith(esteMes)).length;
 
    const agendamentosAno = agenda.filter(e => e.data.startsWith(esteAno) && e.status === 'Marcado').length;
    const totalAno = agenda.filter(e => e.data.startsWith(esteAno)).length;
 
    const percentualDia = totalDia > 0 ? (agendamentosDia / totalDia * 100).toFixed(0) : 0;
    const percentualMes = totalMes > 0 ? (agendamentosMes / totalMes * 100).toFixed(0) : 0;
    const percentualAno = totalAno > 0 ? (agendamentosAno / totalAno * 100).toFixed(0) : 0;
 
    document.getElementById('percentualDia').textContent = `${percentualDia}%`;
    document.getElementById('percentualMes').textContent = `${percentualMes}%`;
    document.getElementById('percentualAno').textContent = `${percentualAno}%`;
}