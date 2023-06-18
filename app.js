// 카이카스 지갑 연결
async function connectWallet() {
  if (window.klaytn) {
    try {
      const caver = new Caver(window.klaytn);
      await caver.klay.sendTransaction({
        type: 'ACCOUNT_UPDATE',
        from: '0x0000000000000000000000000000000000000000',
      });
      alert('Wallet connected!');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  } else {
    alert('Please install Klaytn wallet extension.');
  }
}

// Klay 전송
async function sendKlay() {
  if (window.klaytn) {
    try {
      const caver = new Caver(window.klaytn);
      const fromAddress = await caver.klay.getAccounts()[0];
      const toAddress = '0x1a179E7A37E6A39dfFA5a77e7B6467E693945881';
      const value = '100000000000000000000'; // 100 Klay (wei 단위)

      const transactionObject = {
        type: 'VALUE_TRANSFER',
        from: fromAddress,
        to: toAddress,
        value: value,
      };

      const receipt = await caver.klay.sendTransaction(transactionObject);
      alert('Transaction sent! TxHash: ' + receipt.transactionHash);
    } catch (error) {
      console.error('Failed to send transaction:', error);
    }
  } else {
    alert('Please connect Klaytn wallet.');
  }
}

// 버튼 클릭 이벤트 핸들러 등록
$(document).ready(function () {
  $('#connectButton').click(connectWallet);
  $('#sendButton').click(sendKlay);
});
