//==============Functions==============
function getUserData() {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "backend/get/getUserData.php", true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              try {
                  const response = JSON.parse(xhr.responseText);
                  document.getElementById('name').innerHTML += response.name;
                  document.getElementById('username').innerHTML += response.username;
                  document.getElementById('email').innerHTML += response.email;
                  originalName = nameSpan.innerText;
                  originalUsername = usernameSpan.innerText;
                  originalEmail = emailSpan.innerText;
                  has_picture = response.has_picture === "true";
                  var profilePicture = `media/users/profilePictures/default.png`;
                  if(response.has_picture == "true"){
                      profilePicture = `media/users/profilePictures/${response.username}.png`;
                  }
                  document.getElementById('bigProfilePicture').src = profilePicture;
                  resolve(response);
              } catch (error) {
                  reject(error);
              }
          }
      };
      xhr.send();
  });
}

function editProfilePicture() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.addEventListener('change', (event) => {
    profilePictureFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        if (image.width < 500 || image.height < 500) {
          alert('A imagem não atende aos requisitos. Por favor, selecione uma imagem com pelo menos 500x500 pixels.');
          profilePictureFile = null;
        } else {
          changedPicture = true;
          const bigProfilePicture = document.getElementById('bigProfilePicture');
          bigProfilePicture.src = event.target.result;
          const profilePicture = document.getElementById('profilePicture');
          profilePicture.src = event.target.result;
          const applyButton = document.getElementById('apply');
          applyButton.classList.remove('hidden');
        }
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(profilePictureFile);
  });

  fileInput.click();
}

// Função para converter dataURL para blob
function dataURLToBlob(dataURL) {
  const bytes = dataURL.split(',')[1];
  const mime = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const binary = atob(bytes);
  const arrayBuffer = new ArrayBuffer(binary.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binary.length; i++) {
    uint8Array[i] = binary.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mime });
}

getUserData();

//==============Variables==============
//Edit Buttons
const editName = document.getElementById('edit-name');
const editUsername = document.getElementById('edit-username');
const editEmail = document.getElementById('edit-email');
//Spans
const nameSpan = document.getElementById('name');
const usernameSpan = document.getElementById('username');
const emailSpan = document.getElementById('email');
//Inputs
const nameInput = document.getElementById('input-name');
const usernameInput = document.getElementById('input-username');
const emailInput = document.getElementById('input-email');
//Apply Button
const applyButton = document.getElementById('apply');
//Check Input Value
let changedName = false;
let changedUsername = false;
let changedEmail = false;
let changedPicture = false;
var originalName;
var originalUsername;
var originalEmail;

//==============Events==============
//Check if the edit button is clicked
editName.addEventListener('click', () => {
  nameInput.classList.toggle('hidden');
  nameInput.value = nameSpan.innerText;
  nameSpan.classList.toggle('hidden');
  usernameSpan.classList.remove('hidden');
  changedUsername = false;
  usernameInput.classList.add('hidden');
  emailSpan.classList.remove('hidden');
  changedEmail = false;
  emailInput.classList.add('hidden');
});
editUsername.addEventListener('click', () => {
  usernameInput.classList.toggle('hidden');
  usernameInput.value = usernameSpan.innerText;
  usernameSpan.classList.toggle('hidden');
  nameSpan.classList.remove('hidden');
  changedName = false;
  nameInput.classList.add('hidden');
  emailSpan.classList.remove('hidden');
  changedEmail = false;
  emailInput.classList.add('hidden');
});
editEmail.addEventListener('click', () => {
  emailInput.classList.toggle('hidden');
  emailInput.value = emailSpan.innerText;
  emailSpan.classList.toggle('hidden');
  usernameSpan.classList.remove('hidden');
  changedUsername = false;
  usernameInput.classList.add('hidden');
  nameSpan.classList.remove('hidden');
  changedName = false;
  nameInput.classList.add('hidden');
});

//Check if input value is different from the span
nameInput.addEventListener('input', () => {
  if(nameInput.value != nameSpan.innerText){
    applyButton.classList.remove('hidden');
  }else{
    applyButton.classList.add('hidden');
  }
});
usernameInput.addEventListener('input', () => {
  if(usernameInput.value != usernameSpan.innerText){
    applyButton.classList.remove('hidden');
  }else{
    applyButton.classList.add('hidden');
  }
});
emailInput.addEventListener('input', () => {
  if(emailInput.value != emailSpan.innerText){
    applyButton.classList.remove('hidden');
  }else{
    applyButton.classList.add('hidden');
  }
});

//Apply button event
applyButton.addEventListener('click', async () => {
  if(changedName == true){
    nameSpan.classList.remove('hidden');
    nameSpan.innerText = nameInput.value;
    nameInput.classList.add('hidden');
  }
  if(changedUsername == true){
    usernameSpan.classList.remove('hidden');
    usernameSpan.innerText = usernameInput.value;
    usernameInput.classList.add('hidden');
  }
  if(changedEmail == true){
    emailSpan.classList.remove('hidden');
    emailSpan.innerText = emailInput.value;
    emailInput.classList.add('hidden');
  }
  if(changedPicture == true && profilePictureFile) {
    const formData = new FormData();
    formData.append('profilePicture', profilePictureFile);
    
    try {
      const response = await fetch('backend/edit/updateProfilePicture.php', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      console.log('Response:', data);
      console.log('Session variables:', data.session);
      
      if (response.ok && data.success) {
        changedPicture = false;
      } else {
        alert('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile picture');
    }
  }

  applyButton.classList.add('hidden');
  nameInput.classList.add('hidden');
  usernameInput.classList.add('hidden');
  emailInput.classList.add('hidden');
  //Send to applyUserProfile.php as json
  const newName = nameSpan.innerText;
  const newUsername = usernameSpan.innerText;
  const newEmail = emailSpan.innerText;

  const data = {
    originalUsername: originalUsername,
    originalEmail: originalEmail,
    newName: newName,
    newUsername: newUsername,
    newEmail: newEmail
  };

  fetch('backend/edit/applyUserProfile.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    //alert(data.message);
    //Refresh page
    window.location.reload(true);
  })
  .catch(error => console.error(error));
});

nameInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    applyButton.click();
  }
});

usernameInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    applyButton.click();
  }
});

emailInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    applyButton.click();
  }
});