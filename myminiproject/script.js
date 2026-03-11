let peer = new Peer();
let myStream;
let audioCtx, analyser, heartFilter;

// Initialize Peer for Patient
peer.on('open', (id) => {
    document.getElementById('my-id').innerText = id;
});

// Switch Tabs
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName + '-tab').classList.add('active');
}

// DOCTOR: Connect to Patient
document.getElementById('connect-btn').addEventListener('click', () => {
    const remoteId = document.getElementById('peer-id-input').value;
    document.getElementById('conn-status').innerText = "Connecting...";
    
    // In a real telemedicine app, the doctor calls the patient
    const call = peer.call(remoteId, new MediaStream()); // Dummy stream to initiate
    
    // Patient will send back their audio
    peer.on('call', (incomingCall) => {
        incomingCall.answer(); 
        incomingCall.on('stream', (stream) => {
            setupAudioProcessing(stream);
        });
    });
});

// PATIENT: Auto-answer when doctor calls and send Mic
peer.on('call', async (call) => {
    myStream = await navigator.mediaDevices.getUserMedia({ 
        audio: { echoCancellation: false, noiseSuppression: false } 
    });
    call.answer(myStream);
    document.getElementById('my-id').innerText = "CONNECTED";
});

function setupAudioProcessing(stream) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    
    analyser = audioCtx.createAnalyser();
    heartFilter = audioCtx.createBiquadFilter();

    // 150Hz Low Pass Filter to remove background noise
    heartFilter.type = "lowpass";
    heartFilter.frequency.setValueAtTime(150, audioCtx.currentTime);

    source.connect(heartFilter);
    heartFilter.connect(analyser);
    heartFilter.connect(audioCtx.destination); // Doctor hears the sound

    document.getElementById('conn-status').innerText = "LIVE FEED ACTIVE";
    startAnalysis();
}

let lastBeatTime = 0;
function startAnalysis() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const timeData = new Uint8Array(analyser.fftSize);
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');

    function loop() {
        requestAnimationFrame(loop);
        
        // Frequency & BPM Logic
        analyser.getByteFrequencyData(dataArray);
        analyser.getByteTimeDomainData(timeData);

        let maxVol = 0;
        for(let i=0; i<timeData.length; i++) {
            let v = Math.abs(timeData[i] - 128);
            if(v > maxVol) maxVol = v;
        }

        // Beat Detection (Threshold 40)
        const now = Date.now();
        if (maxVol > 40 && (now - lastBeatTime) > 450) {
            const bpm = Math.round(60000 / (now - lastBeatTime));
            if (bpm > 40 && bpm < 160) {
                document.getElementById('bpm-display').innerText = bpm;
                updateHealthText(bpm);
            }
            lastBeatTime = now;
        }

        // Draw Graph
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#00ffcc';
        ctx.beginPath();
        let x = 0;
        let slice = canvas.width / analyser.fftSize;
        for(let i=0; i<analyser.fftSize; i++) {
            let y = (timeData[i]/128.0) * canvas.height/2;
            if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
            x += slice;
        }
        ctx.stroke();
    }
    loop();
}

function updateHealthText(bpm) {
    const status = document.getElementById('health-status');
    if(bpm >= 60 && bpm <= 100) {
        status.innerText = "NORMAL RATE"; status.style.color = "green";
    } else {
        status.innerText = "CHECK REQUIRED"; status.style.color = "red";
    }
}