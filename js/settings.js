//==========Functions==========
function getUserSettings() {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "backend/get/getUserSettings.php", true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              try {
                  const response = JSON.parse(xhr.responseText);
                  document.getElementById('accessToken').innerText += response.access_token;
                  document.getElementById('secretToken').innerText += response.secret_token;
                  originalAccessToken = document.getElementById('accessToken').innerText;
                  originalSecretToken = document.getElementById('secretToken').innerText;
                  resolve(response);
              } catch (error) {
                  reject(error);
              }
          }
      };
      xhr.send();
  });
}

function saveSettings() {
    var accessToken = document.getElementById('accessToken').innerText == "No API Key" ? "" : document.getElementById('accessToken').innerText;
    var secretToken = document.getElementById('secretToken').innerText == "No API Secret" ? "" : document.getElementById('secretToken').innerText;
    if(changedApiKey) {
        accessToken = apiKeyInput.value;
    }
    if(changedSecretKey) {
        secretToken = secretKeyInput.value;
    }
    fetch('backend/edit/updateUserSettings.php', {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ access_token: accessToken, secret_token: secretToken })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.reload(true);
        } else {
            alert('Error saving settings');
            window.location.reload(true);
        }
    })
    .catch(error => console.error('Erro:', error));
}

function endSession() {
  fetch('backend/post/sessionStop.php', {
      method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          window.location.href = "userAuth.html";
      } else {
          alert('Error ending session');
      }
  })
  .catch(error => console.error('Erro:', error));
}

function show(elementID){
    document.getElementById("show-"+elementID).classList.toggle('bxs-hide');
    document.getElementById("show-"+elementID).classList.toggle('bxs-show');
    document.getElementById("hidden-"+elementID).classList.toggle('hidden');
    document.getElementById(elementID+"-data").classList.toggle('hidden');
    document.getElementById(elementID).classList.toggle('hidden');
}
//==========Consts==========
const editApiKeyButton = document.getElementById('edit-api-key');
const editSecretKeyButton = document.getElementById('edit-secret-key');
const applyButton = document.getElementById('apply');

const apiKeySpan = document.getElementById('accessToken');
const secretKeySpan = document.getElementById('secretToken');

const apiKeyInput = document.getElementById('input-api-key');
const secretKeyInput = document.getElementById('input-secret-key');

var changedApiKey = false;
var changedSecretKey = false;

//==========Event Listeners==========
editApiKeyButton.addEventListener('click', () => {
  apiKeyInput.classList.toggle('hidden');
  if(apiKeySpan.innerText != "No API Key") {
    apiKeyInput.value = apiKeySpan.innerText;
  }
  apiKeySpan.classList.toggle('hidden');
  secretKeySpan.classList.remove('hidden');
  secretKeyInput.classList.add('hidden');
  if(apiKeyInput.classList.contains('hidden')) {
    changedApiKey = false;
  }
});

editSecretKeyButton.addEventListener('click', () => {
  secretKeyInput.classList.toggle('hidden');
  if(secretKeySpan.innerText != "No API Secret") {
    secretKeyInput.value = secretKeySpan.innerText;
  }
  secretKeySpan.classList.toggle('hidden');
  apiKeySpan.classList.remove('hidden');
  apiKeyInput.classList.add('hidden');
  if(secretKeyInput.classList.contains('hidden')) {
    changedSecretKey = false;
  }
});

apiKeyInput.addEventListener('input', () => {
    if(originalAccessToken != "No API Key") {
        if(apiKeyInput.value != originalAccessToken){
            applyButton.classList.remove('hidden');
            changedApiKey = true;
        }else{
            applyButton.classList.add('hidden');
            changedApiKey = false;
        }
    }else{
        if(apiKeyInput.value != ""){
            applyButton.classList.remove('hidden');
            changedApiKey = true;
        }else{
            applyButton.classList.add('hidden');
            changedApiKey = false;
        }
    }
});

secretKeyInput.addEventListener('input', () => {
    if(originalSecretToken != "No API Secret") {
        if(secretKeyInput.value != originalSecretToken){
            applyButton.classList.remove('hidden');
            changedSecretKey = true;
        }else{
            applyButton.classList.add('hidden');
            changedSecretKey = false;
        }
    }else{
        if(secretKeyInput.value != ""){
            applyButton.classList.remove('hidden');
            changedSecretKey = true;
        }else{
            applyButton.classList.add('hidden');
            changedSecretKey = false;
        }
    }
});

applyButton.addEventListener('click', () => {
  saveSettings();
});



//==========Main==========
getUserSettings();
originalAccessToken = document.getElementById('accessToken').innerText;
originalSecretToken = document.getElementById('secretToken').innerText;