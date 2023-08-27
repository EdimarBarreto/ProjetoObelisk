const axios = require('axios');

async function testZabbixAPI(apiUrl, apiUser, apiPassword) {
    const requestData = {
        jsonrpc: '2.0',
        method: 'apiinfo.version', // Método de exemplo para verificar a comunicação
        id: 1,
        auth: null
    };

    try {
        const response = await axios.post(apiUrl, requestData, {
            auth: {
                username: apiUser,
                password: apiPassword
            }
        });

        if (response.data && response.data.result) {
            console.log('Comunicação com a API do Zabbix bem-sucedida.');
            console.log('Versão do Zabbix:', response.data.result);
        } else {
            console.log('Não foi possível obter uma resposta válida da API do Zabbix.');
        }
    } catch (error) {
        console.error('Erro ao comunicar com a API do Zabbix:', error.message);
    }
}

// Substitua com suas próprias configurações da API do Zabbix
const zabbixApiUrl = 'http://18.231.177.76:8080/zabbix.php/api_jsonrpc.php';
const zabbixApiUser = 'Admin';
const zabbixApiPassword = 'zabbix';

testZabbixAPI(zabbixApiUrl, zabbixApiUser, zabbixApiPassword);