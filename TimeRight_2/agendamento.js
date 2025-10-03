// --- Simulação de Banco de Dados com LocalStorage ---
// Se não houver dados no LocalStorage, cria a agenda inicial
if (!localStorage.getItem('agenda')) {
    const agendaInicial = [
        { data: '2025-10-04', horario: '10:00', servico: 'Corte de Cabelo', funcionario: 'João', status: 'Livre' },
        { data: '2025-10-04', horario: '11:00', servico: 'Manicure', funcionario: 'Maria', status: 'Livre' },
        { data: '2025-10-04', horario: '12:00', servico: 'Massagem', funcionario: 'Pedro', status: 'Livre' },
        { data: '2025-10-04', horario: '14:00', servico: 'Corte de Cabelo', funcionario: 'João', status: 'Livre' },
        { data: '2025-10-04', horario: '15:00', servico: 'Manicure', funcionario: 'Maria', status: 'Livre' }
    ];
    localStorage.setItem('agenda', JSON.stringify(agendaInicial));
}
 
let agenda = JSON.parse(localStorage.getItem('agenda'));
let servicos = [
    { nome: 'Corte de Cabelo', preco: 50 },
    { nome: 'Manicure', preco: 30 },
    { nome: 'Massagem', preco: 100 }
];
 
 
// Lógica para preencher o campo de serviços
const servicoSelect = document.getElementById('servicoSelect');
servicos.forEach(serv => {
    const option = document.createElement('option');
    option.value = serv.nome;
    option.textContent = serv.nome;
    servicoSelect.appendChild(option);
});
 
// Lógica para preencher os horários disponíveis com base na data selecionada
const dataInput = document.getElementById('dataAgendamento');
const horarioSelect = document.getElementById('horarioAgendamento');
 
dataInput.addEventListener('change', () => {
    const dataSelecionada = dataInput.value;
    const horariosLivres = agenda.filter(item =>
        item.data === dataSelecionada && item.status === 'Livre'
    );
 
    horarioSelect.innerHTML = ''; // Limpa os horários anteriores
    if (horariosLivres.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'Nenhum horário disponível';
        option.disabled = true;
        horarioSelect.appendChild(option);
    } else {
        horariosLivres.forEach(item => {
            const option = document.createElement('option');
            option.value = item.horario;
            option.textContent = item.horario;
            horarioSelect.appendChild(option);
        });
    }
});
 
// Lógica para o envio do formulário de agendamento
const formAgendamento = document.getElementById('formAgendamento');
formAgendamento.addEventListener('submit', (evento) => {
    evento.preventDefault();
 
    const data = dataInput.value;
    const horario = horarioSelect.value;
    const nome = document.getElementById('nomeCliente').value;
    const servico = servicoSelect.value;
 
    const agendamento = {
        data: data,
        horario: horario,
        servico: servico,
        cliente: nome,
        status: 'Marcado'
    };
 
    // Encontra e atualiza o item na agenda
    const itemAgenda = agenda.find(item => item.data === data && item.horario === horario);
    if (itemAgenda) {
        itemAgenda.status = 'Marcado';
        itemAgenda.cliente = nome;
        alert(`Agendamento confirmado para ${nome} no dia ${data} às ${horario}.`);
        window.location.href = "index.html"; // Redireciona para a home
    } else {
        alert('Erro ao agendar. Tente novamente.');
    }
});
formAgendamento.addEventListener('submit', (evento) => {
    // ... código de agendamento
    if (itemAgenda) {
        // ...
        localStorage.setItem('agenda', JSON.stringify(agenda)); // Salva a agenda atualizada
        alert(`Agendamento confirmado para ${nome} no dia ${data} às ${horario}.`);
        window.location.href = "index.html";
    } else {
        alert('Erro ao agendar. Tente novamente.');
    }
});