// 图表选项
const chartOptions = {
    chart: {
        type: 'area',
        width: 370,
        height: 300,
    },
    colors: ['#3498db'], // 设置图表颜色
    series: [{ name: 'Views', data: [18, 50, 42, 94, 41, 65, 30, 70, 45, 60, 55, 75, 62, 85, 40, 72, 58, 64, 80, 53, 69, 76, 81, 91, 88, 77, 84, 92, 95, 100] }], 
    dataLabels: { enabled: false }, // 隐藏数据标签
    stroke: { width: 3, curve: 'smooth' }, // 设置图表线条属性
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0,
            stops: [0, 90, 100] // 设置填充渐变停止点
        }
    },
    xaxis: {
        categories: [], // 初始为空的X轴类别
        axisBorder: { show: false }, // 隐藏X轴边框
        labels: { style: { colors: '#a7a7a7', fontFamily: 'Poppins' } } // 设置X轴标签样式
    },
    yaxis: { show: false }, // 隐藏Y轴
    grid: {
        borderColor: 'rgba(0, 0, 0, 0)', // 设置网格边框颜色
        padding: { top: -30, bottom: -8, left: 12, right: 12 } // 设置网格内边距
    },
    tooltip: {
        enabled: true, // 启用工具提示
        y: { formatter: value => `${value}K` }, // 设置Y轴工具提示标签格式化
        style: { fontFamily: 'Poppins' } // 设置工具提示字体样式
    },
    markers: { show: false } // 隐藏图表标记
};

// 创建图表实例
const chart = new ApexCharts(document.querySelector('.chart-area'), chartOptions);
chart.render();

// 更新图表数据
function updateChartData(sourceCurrency, targetCurrency) {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // 获取前30天的日期
    let endDate = new Date(); // 结束日期为今天

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: new Headers({ "apikey": "59xJt3cWsHVuXKtJAgO9a2RgMDVC6Gwy" }) // 请确保安全地处理你的API密钥
    };

    fetch(`https://api.apilayer.com/currency_data/timeframe?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}&currencies=${targetCurrency}&source=${sourceCurrency}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let rates = Object.values(data.quotes).map(quote => {
                    let rate = quote[`${sourceCurrency}${targetCurrency}`];
                    return Math.round(rate * 1000) / 1000; // 四舍五入到小数点后三位
                });
                let dates = Object.keys(data.quotes);
                chart.updateOptions({
                    series: [{ name: 'Exchange Rate', data: rates }],
                    xaxis: { categories: dates }
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// 绑定按钮点击事件
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateChartData(fromCur.value, toCur.value);
});
