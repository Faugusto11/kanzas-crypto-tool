const signInContainer = document.getElementById('signInContainer');
const signUpContainer = document.getElementById('signUpContainer');
const signUpLink = document.getElementById('signUpLink');
const signInLink = document.getElementById('signInLink');

// Event listener for sign-up link
signUpLink.addEventListener('click', () => {
    signInContainer.classList.add('hidden');
    signUpContainer.classList.remove('hidden');

    console.log("Clicou");
});
// Event listener for sign-in link
signInLink.addEventListener('click', () => {
    signInContainer.classList.remove('hidden');
    signUpContainer.classList.add('hidden');
});

// Verify if user is logged in
document.addEventListener("DOMContentLoaded", function() {

    function verifySession() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "backend/get/verifySession.php", true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response;
                try {
                    response = JSON.parse(xhr.responseText);
                    console.log("Response:", response);
                    if (response && response.logged) {
                        console.log("Redirecting to index.html...");
                        window.location.href = "index.html";
                    } else {
                        console.log("Not redirecting. logged is:", response.logged);
                    }
                } catch (error) {
                    console.error("Invalid JSON response:", error);
                }
            }
        };

        xhr.send();
    }

    verifySession();
});
