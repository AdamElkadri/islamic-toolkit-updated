function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');

    document.getElementById(tabId).style.display = 'block';
}

fetch("data/names.json")
  .then(response => response.json())
  .then(data => {
      const list = document.getElementById("names-list");
      data.forEach(item => {
          let li = document.createElement("li");
          li.innerHTML = `<strong>${item.name}</strong> - ${item.meaning} 
                          <button onclick="playAudio('${item.audio}')">🔊</button>`;
          list.appendChild(li);
      });
  });

function playAudio(audioFile) {
    let audio = new Audio(audioFile);
    audio.play();
}

