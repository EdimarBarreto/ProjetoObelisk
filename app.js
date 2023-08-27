const axios = require('axios');

// Configurações da API do Zabbix
const zabbixUrl = 'http://18.231.177.76:8080/zabbix.php/api_jsonrpc.php';
const zabbixUser = 'Admin';
const zabbixPassword = 'zabbix';


// Funcao para login
async function performLogin(username, password) {
    // Simulação simples de login, você deve implementar uma lógica de autenticação segura
    if (username === 'usuario' && password === 'senha') {
        // Redirecionar para a página principal após o login
        window.location.href = 'dashboard.html'; // Substitua com a página principal real
    } else {
        alert('Credenciais inválidas. Tente novamente.');
    }
}

// Manipular o envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    performLogin(username, password);
});

// Função para fazer uma solicitação à API do Zabbix
async function callZabbixApi(method, params) {
    const response = await axios.post(zabbixUrl, {
        jsonrpc: '2.0',
        method: method,
        params: params,
        auth: null,
        id: 1
    });

    return response.data.result;
}

// Função para exibir a lista de hosts
async function displayHosts() {
    const hostList = await getAllHosts();

    const hostListElement = document.getElementById('hostList');
    hostListElement.innerHTML = '';

    hostList.forEach(host => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = host.name;
        li.addEventListener('click', () => displayHostInfo(host.hostid));
        hostListElement.appendChild(li);
    });
}

// Função para exibir as informações de um host específico
async function displayHostInfo(hostId) {
    const hostInfo = await getHostInfo(hostId);

    const hostDetailsElement = document.getElementById('hostDetails');
    hostDetailsElement.innerHTML = `
        <h3>${hostInfo.name}</h3>
        <p>IP: ${hostInfo.interfaces[0].ip}</p>
    `;
}

// Exemplo: Obter todos os hosts
async function getAllHosts() {
    const method = 'host.get';
    const params = {
        output: ['hostid', 'name'],
        selectInterfaces: ['ip']
    };

    try {
        const result = await callZabbixApi(method, params);
        return result;
    } catch (error) {
        console.error('Erro ao obter hosts:', error);
        return [];
    }
}

// Exemplo: Obter informações de um host específico
async function getHostInfo(hostId) {
    const method = 'host.get';
    const params = {
        hostids: hostId,
        output: 'extend',
        selectInterfaces: ['ip']
    };

    try {
        const result = await callZabbixApi(method, params);
        return result[0];
    } catch (error) {
        console.error('Erro ao obter informações do host:', error);
        return {};
    }
}

// Inicialização da página
displayHosts();