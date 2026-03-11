let recording = false;

function openDoctor() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("doctorUI").classList.remove("hidden");
}

function openPatient() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("patientUI").classList.remove("hidden");
}

function goHome() {
  document.getElementById("doctorUI").classList.add("hidden");
  document.getElementById("patientUI").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

function toggleRecording() {
  const btn = document.getElementById("recordBtn");
  const status = document.getElementById("recordStatus");

  recording = !recording;

  if (recording) {
    btn.innerText = "⏹ Stop Recording";
    status.innerText = "Recording... Please stay still";
  } else {
    btn.innerText = "▶ Start Recording";
    status.innerText = "Recording stopped";
  }
}