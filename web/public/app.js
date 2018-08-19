
const devices = JSON.parse(localStorage.getItem('devices')) || [];
const API_URL = 'http://localhost:5000/api';

$.get(`${API_URL}/devices`, body)
.then(response => {
    location.href = "/"
})
.catch(error => {
    console.log(`Error: ${error}`);
});


devices.forEach(function(device) {
    $('#devices tbody').append(`
    <tr>
    <td>${device.user}</td>
    <td>${device.name}</td>
    </tr>`
    );
   });

   $('#add-device').on('click', function() {
    const user = $('#user').val();
    const name = $('#name').val();
    
    devices.push({ user, name });
    localStorage.setItem('devices', JSON.stringify(devices));
    location.href = '/'; 
   });

   $.post(`${API_URL}/devices`, body)
   .then(response => {
       location.href = "/"
   })
   .catch(error => {
       console.log(`Error: ${error}`);
   });
   

   $('#send-command').on('click', function() {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
   });
   
  $('#navbar').load('navbar.html');
   
