const apiURL = "https://randomuser.me/api/?";
let userList = [];

const displayElm = document.querySelector("#list");
const countElm = document.querySelector("#count");
const searchElm = document.querySelector("#searrch-input");
const selectElm = document.querySelector("#select");

const fetchUsers = (params = "results=10") => {
  fetch(apiURL + params)
    .then((response) => response.json())
    .then((data) => {
      display(data.results);
      userList = data.results;
    });
};

const display = (users) => {
  let str = "";

  users.map((user) => {
    str += `
    
        
          
            <div class="card m-2" style="width: 20rem">
            <img src="${user.picture.large}" class="card-img-top" alt="user-img" />
            <div class = "card-body">
            <h5 class="card-title">
            ${user.name.title} ${user.name.first} ${user.name.last}
            </h5>
            <p class = "card-texts">
            <ul class="list-unstyled">
            <li><i class="fa-solid fa-phone"></i> ${user.phone}</li>
            <li><i class="fa-solid fa-envelope"></i> ${user.email}</li>
            
            <li><i class="fa-solid fa-calender"></i> ${user.dob.date}</li>
            <li><i class="fa-solid fa-house"></i> ${user.location.street.name} ${user.location.postcode} ${user.location.state}</li>
            </ul>
            </p>
            </div>
            </div>
            
        
        `;
  });
  displayElm.innerHTML = str;
  countElm.innerText = users.length;
};

fetchUsers();
searchElm.addEventListener("keydown", (e) => {
  console.log(e.target.value);
  let filteredUsers;
  let searchTerm = e.target.value;

  filteredUsers = userList.filter((user) => {
    const fullName = user.name.first + " " + user.name.last;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  display(filteredUsers);
});

selectElm.addEventListener("change", (e) => {
  let filteredUsers;

  filteredUsers = userList.filter((user) => user.gender === e.target.value);
  display(filteredUsers);
});
