// Dados de exemplo (substitua por dados reais do Zabbix)
const cpuData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    datasets: [{
        label: 'Uso da CPU (%)',
        data: [80, 70, 20, 60, 75],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

const memoryData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    datasets: [{
        label: 'Uso de Memória (%)',
        data: [50, 45, 60, 40, 55],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

// Configurações dos gráficos
const chartOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Renderizar gráficos
const cpuChart = new Chart(document.getElementById('cpuChart').getContext('2d'), {
    type: 'line',
    data: cpuData,
    options: chartOptions
});

const memoryChart = new Chart(document.getElementById('memoryChart').getContext('2d'), {
    type: 'bar',
    data: memoryData,
    options: chartOptions
});