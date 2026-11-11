const WebSocket = require('ws');
const crypto = require('crypto');

function getSecMsGec() {
  const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EA654074B167604F6977359E';
  const unixSeconds = Date.now() / 1000;
  let windowsFileTime = Math.floor((unixSeconds + 11644473600) * 10000000);
  windowsFileTime -= (windowsFileTime % 3000000000);
  const strToHash = `${windowsFileTime}${TRUSTED_CLIENT_TOKEN}`;
  return crypto.createHash('sha256').update(strToHash, 'ascii').digest('hex').toUpperCase();
}

function synthesize(text, voice = 'ur-PK-AsadNeural') {
  return new Promise((resolve, reject) => {
    const connectionId = crypto.randomUUID().replace(/-/g, '');
    const secMsGec = getSecMsGec();
    const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readahead/edge/v1?TrustedClientToken=6A5AA1D4EA654074B167604F6977359E&Sec-MS-GEC=${secMsGec}&Sec-MS-GEC-Version=1-130.0.2849.68&ConnectionId=${connectionId}`;
    
    const ws = new WebSocket(url, {
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
        'Origin': 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
        'Sec-MS-GEC': secMsGec,
        'Sec-MS-GEC-Version': '1-130.0.2849.68'
      }
    });

    const audioChunks = [];
    const timeout = setTimeout(() => {
      ws.terminate();
      reject(new Error('Edge-TTS timeout after 12s'));
    }, 12000);

    ws.on('open', () => {
      const timestamp = new Date().toISOString();
      const configMsg = `Path:speech.config\r\nX-Timestamp:${timestamp}\r\nContent-Type:application/json;charset=utf-8\r\n\r\n{"context":{"system":{"name":"SpeechSDK","version":"1.14.1-39609809","build":"JavaScript","lang":"JavaScript"}}}`;
      ws.send(configMsg);

      const requestId = crypto.randomUUID().replace(/-/g, '');
      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ur-PK"><voice name="${voice}"><prosody rate="0%" pitch="0Hz">${text}</prosody></voice></speak>`;
      const ssmlMsg = `Path:ssml\r\nX-RequestId:${requestId}\r\nX-Timestamp:${timestamp}\r\nContent-Type:application/ssml+xml\r\n\r\n${ssml}`;
      ws.send(ssmlMsg);
    });

    ws.on('message', (data, isBinary) => {
      if (isBinary) {
        const headerLength = data.readUInt16BE(0);
        const chunk = data.subarray(headerLength + 2);
        if (chunk.length > 0) {
          audioChunks.push(chunk);
        }
      } else {
        const str = data.toString();
        if (str.includes('Path:turn.end')) {
          clearTimeout(timeout);
          ws.close();
          const fullAudio = Buffer.concat(audioChunks);
          resolve(fullAudio);
        }
      }
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

(async () => {
  try {
    console.log('Testing Edge-TTS with Sec-MS-GEC for ur-PK-AsadNeural...');
    const buf = await synthesize('السلام علیکم! ایگزیکٹو پیکس میں خوش آمدید۔', 'ur-PK-AsadNeural');
    console.log('SUCCESS! Synthesized Urdu audio bytes:', buf.length);
  } catch (e) {
    console.error('FAILED:', e);
  }
})();
