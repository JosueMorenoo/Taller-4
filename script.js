const users = [
    {
        nombre: "Juan",
        apellido: "Pérez",
        telefono: "3001234567",
        correo: "juan@hotmail.com",
        contraseña: "123456",
        aceptaNotificaciones: true,
        rol: "Usuario",
        activo: true
    },
    {
        nombre: "Ana",
        apellido: "García",
        telefono: "3009876543",
        correo: "ana@hotmail.com",
        contraseña: "abcdef",
        aceptaNotificaciones: false,
        rol: "Usuario",
        activo: true
    },
    {
        nombre: "Josue",
        apellido: "Moreno",
        telefono: "3104567890",
        correo: "Josue@hotmail.com",
        contraseña: "password",
        aceptaNotificaciones: true,
        rol: "Usuario",
        activo: true
    },
    {
        nombre: "Luis",
        apellido: "Martínez",
        telefono: "3156543210",
        correo: "luis@hotmail.com",
        contraseña: "qwerty",
        aceptaNotificaciones: false,
        rol: "Usuario",
        activo: true
    },
    {
        nombre: "Admin",
        apellido: "Supremo",
        telefono: "3001122334",
        correo: "admin@hotmail.com",
        contraseña: "admin123",
        aceptaNotificaciones: true,
        rol: "Administrador",
        activo: true
    }
];

let authenticatedUser = null;

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.correo === username && u.contraseña === password);

    if (user) {
        if (user.activo) {
            authenticatedUser = user;
            mostrarPaginaPrincipal();
        } else {
            document.getElementById("errorMessage").innerText = "Usuario desactivado";
        }
    } else {
        document.getElementById("errorMessage").innerText = "Usuario no encontrado";
    }
});

function mostrarPaginaPrincipal() {
    document.querySelector(".login-container").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");
    
    document.getElementById("userFullName").innerText = `${authenticatedUser.nombre} ${authenticatedUser.apellido}`;
    document.getElementById("userEmail").innerText = authenticatedUser.correo;
    document.getElementById("userPhone").innerText = authenticatedUser.telefono;

    if (authenticatedUser.rol === "Administrador") {
        mostrarPanelAdministrador();
    }
}

function mostrarPanelAdministrador() {
    const adminPanel = document.createElement("div");
    adminPanel.innerHTML = "<h3>Panel de Administración</h3>";

    const userList = document.createElement("ul");

    users.forEach((user, index) => {
        const userItem = document.createElement("li");

       
        const userText = document.createElement("span");
        userText.innerText = `${user.nombre} ${user.apellido} - ${user.activo ? 'Activo' : 'Inactivo'}`;

        
        const toggleButton = document.createElement("button");
        toggleButton.innerText = user.activo ? "Desactivar" : "Activar";
        
        
        toggleButton.addEventListener("click", () => {
            if (user.rol === "Administrador") {
                alert("Ey amiguito que intentas hacer? Eres el administrador!! No es posible desactivar al administrador por que despues quien te habilita?");
            } else {
                user.activo = !user.activo;
                toggleButton.innerText = user.activo ? "Desactivar" : "Activar";
                userText.innerText = `${user.nombre} ${user.apellido} - ${user.activo ? 'Activo' : 'Inactivo'}`;
            }
        });

        userItem.appendChild(userText);
        userItem.appendChild(toggleButton);
        userList.appendChild(userItem);
    });

    adminPanel.appendChild(userList);
    document.getElementById("mainPage").appendChild(adminPanel);
}


document.getElementById("logoutButton").addEventListener("click", function() {
    authenticatedUser = null;
    document.getElementById("mainPage").classList.add("hidden");
    document.querySelector(".login-container").classList.remove("hidden");
    document.getElementById("loginForm").reset();
    document.getElementById("errorMessage").innerText = "";
    const adminPanel = document.querySelector('#mainPage div');
    if (adminPanel) {
        adminPanel.remove();
    }
});
