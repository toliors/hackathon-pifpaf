var form = document.getElementById('form');
var campo = document.getElementById('senha');

form.addEventListener('submit', function(e) {
    alert(campo.value);
    e.preventDefault();
});
