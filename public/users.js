document.addEventListener("DOMContentLoaded", async() => {
    await fetchPeriodically();
});

const fetchPeriodically = async () => {
    await fetchUsers();

    setInterval(() => {
        fetchUsers();
    }, 1000);
};

const fetchUsers = async () => {
    try {
        const response = await axios.get('/actions/');
        console.log(response);
        const users = response.data;

        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.birthday}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};
