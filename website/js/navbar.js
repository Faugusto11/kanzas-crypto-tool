//=============Functions=================

function toggleMobileNav(){
    const navigationMobile = document.getElementsByClassName('navigationMobile')[0];
    if(navigationMobile.style.height == '100%'){
        navigationMobile.style.height = '0';
    }else{
        navigationMobile.style.height = '100%';
    }
}

function verifySession() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "backend/get/verifySession.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response;
            try {
                response = JSON.parse(xhr.responseText);
                if (response && response.logged) {
                    const username = response.username;
                    var profilePictureUrl = 'media/users/profilePictures/default.png';
                    if(response.has_picture == "true"){
                        profilePictureUrl = `media/users/profilePictures/${username}.png`;
                    }
                    const userProfile = document.getElementById('userProfileDiv');
                    const userProfileMobile = document.getElementById('userProfileDivMobile');
                    userProfile.innerHTML = `<img src="${profilePictureUrl}" class="profile-picture" id="profilePicture"> <span>Profile</span>`;
                    userProfileMobile.innerHTML = `<img src="${profilePictureUrl}" class="profile-picture" id="profilePicture"> <span>Profile</span>`;
                    userProfile.onclick = function() {
                        window.location.href = "profile.html";
                    };
                    userProfileMobile.onclick = function() {
                        window.location.href = "profile.html";
                    };
                    
                }else{
                    const userProfile = document.getElementById('userProfileDiv');
                    const userProfileMobile = document.getElementById('userProfileDivMobile');
                    const settingsDiv = document.getElementById('settingsDiv');
                    const settingsDivMobile = document.getElementById('settingsDivMobile');
                    userProfile.innerHTML = `<i class='bx bx-user-circle' id='userProfile' ></i> <span>Sign in</span>`;
                    userProfileMobile.innerHTML = `<i class='bx bx-user-circle' id='userProfile' ></i> <span>Sign in</span>`;
                    settingsDiv.onclick = function() {
                        window.location.href = "userAuth.html";
                    };
                    settingsDivMobile.onclick = function() {
                        window.location.href = "userAuth.html";
                    };
                }
            } catch (error) {
                console.error("Invalid JSON response:", error);
            }
        }
    };
    xhr.send();
}

//=============Main=================

const activated = document.getElementsByClassName('active')[0];

verifySession();
