// Define o usuário e a senha corretos para o login
const USUARIO_CORRETO = 'admin';
const SENHA_CORRETA = 'senha123';
 
// Seleciona o formulário de login e a área protegida
const formularioLogin = document.getElementById('formularioLogin');
const areaAdmin = document.getElementById('areaAdmin');
 
formularioLogin.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Impede o envio padrão do formulário
 
    const usuarioInput = document.getElementById('usuario').value;
    const senhaInput = document.getElementById('senha').value;
 
    if (usuarioInput === USUARIO_CORRETO && senhaInput === SENHA_CORRETA) {
        // Se o login for correto
        alert('Login bem-sucedido! Acesso concedido.');
        // Esconde o formulário e mostra o conteúdo do admin
        document.getElementById('formularioLogin').style.display = 'none';
        areaAdmin.style.display = 'block';
 
    } else {
        // Se o login for incorreto
        alert('Usuário ou senha incorretos. Tente novamente.');
        formularioLogin.reset(); // Limpa os campos
    }
});

// Lógica para o botão "Sair" da área do administrador
const botaoSair = document.getElementById('botaoSair');
 
botaoSair.addEventListener('click', () => {
    // Esconde a área de administração e mostra o formulário de login novamente
    areaAdmin.style.display = 'none';
    formularioLogin.style.display = 'block';
});