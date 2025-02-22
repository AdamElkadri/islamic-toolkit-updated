document.addEventListener("DOMContentLoaded", function() {
    fetch("data/names.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("floating-names-container");
            data.forEach(item => {
                let button = document.createElement("button");
                button.classList.add("floating-name");
                button.innerHTML = `<strong>${item.name}</strong><br><span class='meaning'>${item.meaning}</span>`;
                button.style.left = Math.random() * 90 + "vw";
                button.style.top = Math.random() * 90 + "vh";
                button.style.animationDuration = (Math.random() * 5 + 5) + "s";
                button.onclick = () => playAudio(item.audio);
                container.appendChild(button);
            });
        });
});



function playAudio(audioFile) {
    let audio = new Audio(audioFile);
    audio.play();
}

document.addEventListener("DOMContentLoaded", function () {
    const hadithText = document.getElementById("hadith-text");
    const hadithSource = document.getElementById("hadith-source");
    const getHadithBtn = document.getElementById("get-hadith");
    const shareHadithBtn = document.getElementById("share-hadith");

    let hadiths = [];

    // Fetch Hadiths from JSON
    fetch("data/hadiths.json")
        .then(response => response.json())
        .then(data => {
            hadiths = data;
        })
        .catch(error => console.error("Error loading Hadiths:", error));

    // Function to get a random Hadith
    function getRandomHadith() {
        if (hadiths.length === 0) return;
        const randomIndex = Math.floor(Math.random() * hadiths.length);
        const hadith = hadiths[randomIndex];

        hadithText.innerText = `"${hadith.hadith}"`;
        hadithSource.innerText = `— ${hadith.book}`;
    }

    // Function to share Hadith
    function shareHadith() {
        const text = `${hadithText.innerText} ${hadithSource.innerText}`;
        const shareURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(shareURL, "_blank");
    }

    // Event Listeners
    getHadithBtn.addEventListener("click", getRandomHadith);
    shareHadithBtn.addEventListener("click", shareHadith);
});

function filterNames() {
    let input = document.getElementById("search").value.toLowerCase();
    let container = document.getElementById("floating-names-container");

    if (!container) {
        console.error("Error: floating-names-container not found");
        return;
    }

    let cards = container.getElementsByClassName("floating-name");

    console.log("Filtering Names... Input:", input);
    console.log("Total Names Found:", cards.length);

    Array.from(cards).forEach(card => {
        let name = card.querySelector("h3")?.textContent.toLowerCase().trim() || "";
        let meaning = card.querySelector("p")?.textContent.toLowerCase().trim() || "";

        console.log("Checking:", name, "| Meaning:", meaning);

        if (name.includes(input) || meaning.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("data/names.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("floating-names-container");

            function createFloatingNames() {
                container.innerHTML = ""; // Clear previous names

                let shuffledNames = data.sort(() => 0.5 - Math.random()); // Shuffle names
                let selectedNames = shuffledNames.slice(0, 50); // Display 50 names at a time

                selectedNames.forEach(item => {
                    let div = document.createElement("div");
                    div.classList.add("floating-name");

                    // Ensure names start below search bar
                    let maxHeight = window.innerHeight * 0.7; // Stay in lower 70% of screen
                    div.style.top = (Math.random() * maxHeight + 100) + "px"; // Start below 100px
                    div.style.left = Math.random() * 80 + "vw";
                    div.style.animationDuration = (Math.random() * 5 + 5) + "s";

                    div.innerHTML = `<h3>${item.name}</h3><p>${item.meaning}</p>`;
                    container.appendChild(div);
                });

                console.log("✅ Floating names loaded successfully.");
            }

            createFloatingNames();
        });
});






