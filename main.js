const usersBlock = document.querySelector(".users .swiper-wrapper");
const searchInput = document.querySelector(".search");
const loading = document.querySelector(".loading");
const updateBtn = document.querySelector(".update");
const sortSelect = document.querySelector(".sort-users");
const error = document.querySelector(".error");
const errorMessage = document.querySelector(".error-message");
const mainBlock = document.querySelector(".main-block");

const searchBy = ["name", "email", "phone"];
const getUserCard = (name, email, phone) =>
  `<div class="user-card swiper-slide">
    <img src="images/common/ava.svg" alt="ava" class="ava" />
    <div class="user-card__field user-name">${name}</div>
    <div class="user-card__field">${email}</div>
    <div class="user-card__field">${phone}</div>
  </div>`;

let users = [];
let customedUsers = [];

const filterUsers = (value) => {
  customedUsers = users.filter((user) => {
    let isFound = false;
    searchBy.forEach((searchValue) => {
      if (user[searchValue].toLowerCase().includes(value.toLowerCase()))
        isFound = true;
    });

    return isFound;
  });
};

const setUsers = () => {
  usersBlock.innerHTML = "";
  filterUsers(searchInput.value);
  customedUsers.forEach(
    (user) =>
      (usersBlock.innerHTML += getUserCard(user.name, user.email, user.phone))
  );
};

const getUsers = async () => {
  console.log("ed");
  loading.classList.remove("hidden");
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    mainBlock.classList.add("hidden");
    error.classList.remove("hidden");
    errorMessage.innerText += " " + response.status;
  }
  const data = await response.json();
  loading.classList.add("hidden");

  users = [...data];
  customedUsers = [...users];
  setUsers();
};

getUsers();
updateBtn.addEventListener("click", getUsers);

searchInput.addEventListener("input", (event) => {
  const { value } = event.target;
  filterUsers(value);
  setUsers();
});

sortSelect.addEventListener("change", (event) => {
  const { value } = event.target;
  console.log(event.target.value);
  customedUsers = users.sort((a, b) => (a[value] > b[value] ? 1 : -1));
  console.log(customedUsers);

  setUsers();
});

console.log(customedUsers);

let usersSwiper = new Swiper(".users-swiper", {
  slidesPerView: "auto",
  spaceBetween: 24,
  grabCursor: true,
  navigation: {
    nextEl: ".users-swiper-button-next",
    prevEl: ".users-swiper-button-prev",
  },
});
