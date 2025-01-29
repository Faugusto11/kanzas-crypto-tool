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
  const accessToken = document.getElementById('accessToken').innerText;
  const secretToken = document.getElementById('secretToken').innerText;
  fetch('backend/post/saveSettings.php', {
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
//==========Consts==========


//==========Event Listeners==========


//==========Main==========
getUserSettings();