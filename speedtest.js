(function(){
  const NetworkSpeed = require('network-speed'); 
  const testNetworkSpeed = new NetworkSpeed();
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: 'dataSpeedTest.csv',
    header: [
        {id: 'velocidade', title: 'VELOCIDADE'},
        {id: 'data', title: 'DATA'},
        {id: 'hora', title: 'HORA'},
    ]
});

  async function getNetworkDownloadSpeed() {
    const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
    const fileSizeInBytes = 500000;
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
    const {mbps} = speed 
    const date = new Date()
    const formattedDate = ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear();
    const hours = ((date.getHours() )) + ":" + ((date.getMinutes() + 1))
    const records = [
      {velocidade: mbps, data: formattedDate, hora: hours}
    ];
    csvWriter.writeRecords(records);
  }
  setInterval(() => {
    getNetworkDownloadSpeed();
  }, 2000);
})();