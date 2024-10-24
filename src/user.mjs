
const form = document.querySelector('form');


const createUser = async (e) => {
  e.preventDefault();
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const newUser = {name, email};
  console.log(newUser)
  await window.myAPI.addUser(newUser);
  await window.myAPI.closeForm();

  
}
window.addEventListener('beforeunload', async () => {
  await window.myAPI.sendMessageToMainWindow('formClosed', newUser);
})

form.addEventListener('submit', createUser);