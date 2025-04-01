// Helper function to get cookies by name  
function getCookie(name) {  
    const cookies = document.cookie.split('; ');  
    for (const cookie of cookies) {  
        const [cookieName, cookieValue] = cookie.split('=');  
        if (cookieName === name) {  
            return decodeURIComponent(cookieValue);  
        }  
    }  
    return null;  
}  

// Helper function to set cookies with an expiration date  
function setCookie(name, value, days) {  
    const date = new Date();  
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);  
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/;`;  
}  

// Load employee form cookies  
function loadEmp() {  
    const empCookie = getCookie('employee');  
    return empCookie ? JSON.parse(empCookie) : [];  
}  

// Save employee to cookie  
function saveEmp() {  
    setCookie('employee', JSON.stringify(employee), 30); // store for 30 days  
}  

// Initialize variable  
const form = document.getElementById('employee-form');
const IDinput = document.getElementById('employee-ID');  
const nameInput = document.getElementById('employee-name'); 
const genderinput = document.getElementById('employee-gender'); 
const positionInput = document.getElementById('employee-position');  
const hiredateInput = document.getElementById('employee-hiredate');  
const employeeList = document.getElementById('employee-list');  
const editingIndexInput = document.getElementById('editingIndex');  
const submitBtn = document.getElementById('submit-btn');  

let employee = loadEmp();  

// Function to render employees  
function renderEmp() {  
    employeeList.innerHTML = '';  
    employee.forEach((emp, index) => {  
        employeeList.innerHTML += `  
        <tr>  
            <td>${emp.id}</td>  
            <td>${emp.name}</td>
            <td>${emp.gender}</td>
            <td>${emp.position}</td>  
            <td>${emp.hiredate}</td>  
            <td>  
                <button class="btn btn-warning btn-sm" onclick="editEmp(${index})">Edit</button>  
                <button class="btn btn-danger btn-sm" onclick="deleteEmp(${index})">Delete</button>  
            </td>  
        </tr>`;  
    });  
}  

// Add or update an employee  
form.addEventListener('submit', (e) => {  
    e.preventDefault();  
    const id = IDinput.value.trim();
    const name = nameInput.value.trim();  
    const gender = genderinput.value.charAt(0).toUpperCase() + genderinput.value.slice(1);
    const position = positionInput.value.trim();  
    const hiredate = hiredateInput.value.trim();  
    const editingIndex = editingIndexInput.value;  

    if (id && name && gender && position && hiredate) {  
        const newEmp = { id, name, gender, position, hiredate };  

        if (editingIndex) {  
            // Update employee  
            employee[editingIndex] = newEmp;  
            submitBtn.textContent = 'ADD EMP';  
            editingIndexInput.value = '';
            alert('Data has been updated!');  
        } else {  
            // Add new employee  
            employee.push(newEmp);
            alert('Data has been saved!'); 
            
        }  
        // Clear form
        IDinput.value ='';  
        nameInput.value = '';
        genderinput.value = "";
        positionInput.value = '';  
        hiredateInput.value = '';  

        saveEmp();  
        renderEmp();
          
    }  
});  

// Delete employee  
window.deleteEmp = (index) => {  
    if (confirm('Are you sure you want to delete?')) {  
        employee.splice(index, 1);  
        saveEmp();  
        renderEmp();
        alert('Data has been Deleted!');
        
    }  
};  

// Edit employee  
window.editEmp = (index) => {  
    const emp = employee[index];

    IDinput.value = emp.id; 
    nameInput.value = emp.name;
    genderinput.value = "";
    
    // Set the gender selection properly
    for (let i = 0; i < genderinput.options.length; i++) {
        if (genderinput.options[i].value.toLowerCase() === emp.gender.toLowerCase()) {
            genderinput.options[i].selected = true;
            break;
        }
    }

    positionInput.value = emp.position;  
    hiredateInput.value = emp.hiredate;  
    editingIndexInput.value = index;  
    submitBtn.textContent = 'UPDATE';

};



// Initial render  
renderEmp();   

document.getElementById('search-btn').addEventListener('click', function() {
    // Get the search query from the input field
    let query = document.getElementById('search-box').value.toLowerCase();
    
    // Get all rows in the employee list table
    let rows = document.querySelectorAll('#employee-list tr');
    let noMatchFound = true;
    
    // Loop through all the rows and hide those where neither ID nor Name matches the search query
    rows.forEach(function(row) {
        // Get the ID column (first column in each row, index 0) and Name column (second column in each row, index 1)
        let idCell = row.cells[0]; // 0 is the index of the ID column
        let nameCell = row.cells[1]; // 1 is the index of the Name column
        
        if (idCell && nameCell) {
            let id = idCell.textContent.toLowerCase();
            let name = nameCell.textContent.toLowerCase();
            
            // If either the ID or Name contains the search query, show the row, otherwise hide it
            if (id.includes(query) || name.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
                
            }
        }
    });
    if(noMatchFound){
        alert('Data deos not');
    }
});
