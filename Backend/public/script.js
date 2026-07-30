const API = "/users";

const form = document.getElementById("userForm");
const table = document.getElementById("userTable");

const idInput = document.getElementById("userId");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");

async function loadUsers(){

    const response = await fetch(API);

    const users = await response.json();

    table.innerHTML="";

    users.forEach(user=>{

        table.innerHTML+=`
        <tr>

            <td>${user.id}</td>

            <td>${user.firstName}</td>

            <td>${user.lastName}</td>

            <td>${user.email}</td>

            <td>

                <button class="edit"
                onclick="editUser(${user.id})">

                Edit

                </button>

                <button class="delete"
                onclick="deleteUser(${user.id})">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

}

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const user={

        firstName:firstName.value,

        lastName:lastName.value,

        email:email.value,

        password:password.value

    };

    if(idInput.value===""){

        await fetch(API,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(user)

        });

    }

    else{

        await fetch(`${API}/${idInput.value}`,{

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(user)

        });

    }

    form.reset();

    idInput.value="";

    loadUsers();

});

async function editUser(id){

    const response=await fetch(`${API}/${id}`);

    const user=await response.json();

    idInput.value=user.id;

    firstName.value=user.firstName;

    lastName.value=user.lastName;

    email.value=user.email;

    password.value=user.password;

}

async function deleteUser(id){

    await fetch(`${API}/${id}`,{

        method:"DELETE"

    });

    loadUsers();

}

loadUsers();