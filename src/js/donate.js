const imageRoot = document.body.dataset.donateRoot;
const qrcode = document.getElementById('qrcode');
const icon = document.getElementById('icon');
const userAgent = navigator.userAgent;

if (userAgent.includes('AlipayClient')) {
  window.location.href = 'https://qr.alipay.com/fkx16715khfgwiumouxj4d4';
} else if (userAgent.includes('MicroMessenger')) {
  icon.src = `${imageRoot}WeChatPayLogo.jpg`;
  document.title = '微信支付';
  document.body.className = 'wepay';
  qrcode.src = `${imageRoot}qrcode/wechat.png`;
} else if (userAgent.includes('QQ')) {
  icon.src = `${imageRoot}QQPayLogo.jpg`;
  document.title = 'QQ 钱包支付';
  document.body.className = 'qq';
  qrcode.src = `${imageRoot}qrcode/qq.png`;
}
