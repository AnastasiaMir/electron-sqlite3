
const usersTable = document.querySelector('.table');

const createRow = (user) => {
  const tr = document.createElement('tr');
  Object.values(user).forEach((data) => {
    const td = document.createElement('td');
    td.textContent = data;
    tr.appendChild(td);
  })
  usersTable.appendChild(tr);
  return tr;
}

const renderTable = async (table) => {
  try {
    const fragment = document.createDocumentFragment(); 
    const data = await window.myAPI.getDataFromDB();
    data.forEach((user) => {
      fragment.appendChild(createRow(user));
    })
    table.appendChild(fragment);
  } catch (error) {
    console.log(error.message)
  }
  
}

renderTable(usersTable);

const createUserButton = document.querySelector('.createUser')
createUserButton.addEventListener('click', async () => {
  await window.myAPI.openForm()
})
