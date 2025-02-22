document.addEventListener("DOMContentLoaded", function () {
    const hadithText = document.getElementById("hadith-text");
    const hadithSource = document.getElementById("hadith-source");
    const getHadithBtn = document.getElementById("get-hadith");

    function loadNewHadith() {
        fetch("data/hadiths.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Hadith file not found.");
                }
                return response.json();
            })
            .then(data => {
                let randomHadith = data[Math.floor(Math.random() * data.length)];
                let fullHadith = `"${randomHadith.hadith}"`;
                let bookSource = `(${randomHadith.book})`;

                // Display new Hadith
                hadithText.innerHTML = fullHadith;
                hadithSource.innerHTML = `<strong>${bookSource}</strong>`;

                // Update Share Links
                updateShareLinks(fullHadith, bookSource);
            })
            .catch(error => {
                hadithText.innerText = "⚠️ Error loading hadith.";
                console.error(error);
            });
    }

    function updateShareLinks(hadith, source) {
        let shareMessage = `${hadith} - ${source}`;

        document.getElementById("whatsapp-share").href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
        document.getElementById("email-share").href = `mailto:?subject=Beautiful Hadith&body=${encodeURIComponent(shareMessage)}`;
        document.getElementById("instagram-share").href = "https://www.instagram.com"; // Instagram does not allow direct text sharing
        document.getElementById("twitter-share").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    }

    // Load first Hadith when page loads
    loadNewHadith();

    // Add event listener for "Get a Random Hadith" button
    getHadithBtn.addEventListener("click", function () {
        loadNewHadith();
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

document.addEventListener("DOMContentLoaded", function () {
    const namesContainer = document.getElementById("floating-names-container");
    const modal = document.getElementById("name-modal");
    const modalName = document.getElementById("modal-name");
    const modalArabic = document.getElementById("modal-arabic");
    const modalMeaning = document.getElementById("modal-meaning");
    const closeModal = document.querySelector(".close-btn");

    fetch("data/names.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(nameObj => {
                let button = document.createElement("button");
                button.classList.add("floating-name");
                button.innerHTML = `<strong>${nameObj.name}</strong><br>${nameObj.meaning}`;
                
                button.style.left = Math.random() * 90 + "vw";  
                button.style.animationDuration = (Math.random() * 3 + 3) + "s";  
                
                // 📌 Add click event to open modal
                button.addEventListener("click", function () {
                    modal.style.display = "flex";
                    modalName.innerText = nameObj.name;
                    modalArabic.innerText = nameObj.arabic;
                    modalMeaning.innerText = nameObj.meaning;
                });

                namesContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error("Error loading names:", error);
            namesContainer.innerHTML = "<p style='color:red;'>⚠️ Failed to load names. Check JSON file.</p>";
        });

    // 📌 Close Modal when clicking the "×" button
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // 📌 Close Modal when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


function filterNames() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let nameButtons = document.querySelectorAll(".floating-name");

    nameButtons.forEach(button => {
        let nameText = button.innerText.toLowerCase();  // Get button text
        if (nameText.includes(input)) {
            button.style.display = "block";  // Show if match found
        } else {
            button.style.display = "none";   // Hide if not matching
        }
    });
}

