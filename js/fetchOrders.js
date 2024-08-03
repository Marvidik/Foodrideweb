document.addEventListener('DOMContentLoaded', function() {
    const corsProxy = 'https://cors.bridged.cc/';
    const apiUrl = 'https://foodride.viziddecors.com/userswithorders/';

    axios.get(apiUrl)
        .then(response => {
            const data = response.data;
            const tableBody = document.getElementById('orderTableBody');
            console.log(data);
            data.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="p-4">
                        <div class="media align-items-center">
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="d-block ui-w-40 ui-bordered mr-4" alt="">
                            <div class="media-body">
                                <a href="ordersdetail.html?id=${user.secondid}" class="d-block text-dark">${user.username}</a>
                            </div>
                        </div>
                    </td>
                    <td class="text-right font-weight-semibold align-middle p-4">${user.no_of_foods}</td>
                    <td class="align-middle p-4">${user.address}</td>
                    <td class="text-right font-weight-semibold align-middle p-4">${user.phone}</td>
                    <td class="text-center align-middle px-0">
                        <a href="#" class="shop-tooltip close float-none text-danger" title="Remove">×</a>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
