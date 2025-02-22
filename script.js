document.addEventListener("DOMContentLoaded", function () {
    const hadithText = document.getElementById("hadith-text");
    const hadithSource = document.getElementById("hadith-source");
    const getHadithBtn = document.getElementById("get-hadith");
    const shareHadithBtn = document.getElementById("share-hadith");

    let hadiths = [];
    fetch("hadiths.json")
        .then(response => response.json())
        .then(data => {
            hadiths = data;
        })
        .catch(error => console.error("Error loading Hadiths:", error));

    function getRandomHadith() {
        if (hadiths.length > 0) {
            let randomIndex = Math.floor(Math.random() * hadiths.length);
            hadithText.innerText = hadiths[randomIndex].hadith;
            hadithSource.innerText = `(${hadiths[randomIndex].book})`;
        } else {
            hadithText.innerText = "Hadiths are still loading, please try again...";
        }
    }

    getHadithBtn.addEventListener("click", getRandomHadith);

    shareHadithBtn.addEventListener("click", function () {
        let message = hadithText.innerText + " " + hadithSource.innerText;
        let whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let count = 0;
    let target = 100; // Default target

    const counterDisplay = document.getElementById("counter-display");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const targetInput = document.getElementById("target-input");

    // Function to update progress bar
    function updateProgress() {
        let progress = (count / target) * 100;
        progressBar.style.width = progress > 100 ? "100%" : progress + "%";
        progressText.innerText = Math.min(progress.toFixed(1), 100) + "%";
    }

    // Add event listeners to all Tasbeeh buttons
    document.querySelectorAll(".dhikr-btn").forEach(button => {
        button.addEventListener("click", function () {
            if (count < target) {
                count++;
                counterDisplay.innerText = count;
                updateProgress();

                if (count >= target) {
                    alert("🎉 Target of " + target + " Reached! 🎉");
                }
            }
        });
    });

    // Reset button
    document.getElementById("reset-btn").addEventListener("click", function () {
        let interval = setInterval(() => {
            if (count > 0) {
                count--;
                counterDisplay.innerText = count;
                updateProgress();
            } else {
                clearInterval(interval);
            }
        }, 50);
    });

    // Save button (Stores count in localStorage)
    document.getElementById("save-btn").addEventListener("click", function () {
        localStorage.setItem("tasbeehCount", count);
        alert("✅ Count Saved!");
    });

    // Set custom target
    targetInput.addEventListener("change", function () {
        target = parseInt(targetInput.value) || 100; // Default to 100 if empty
        updateProgress();
    });
});
