document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    const apiUrl = `https://foodride.viziddecors.com/vieworder/${orderId}`;

    axios.get(apiUrl)
        .then(response => {
            const orders = response.data.Orders;
            const orderDetails = document.getElementById('orderDetails');
            console.log(orders);

            orders.forEach(order => {
                const foodDetails = order.food_details;
                const profile = order.profile;

                const orderItem = document.createElement('div');
                orderItem.classList.add('order-item');

                orderItem.innerHTML = `
                    <p><strong>Food:</strong> ${foodDetails.name}</p>
                    <p><strong>Quantity:</strong> ${order.quantity}</p>
                    <p><strong>Address:</strong> ${profile.address}</p>
                    <p><strong>Phone:</strong> ${profile.phone}</p>
                    <p><strong>Phone2:</strong> ${profile.phone1 || 'N/A'}</p>
                    <p><strong>Restaurant:</strong> ${foodDetails.restaurant.name}</p>
                    <img src="https://foodride.viziddecors.com${foodDetails.image}" alt="${foodDetails.name}" style="max-width: 100%; height: auto;">
                `;

                orderDetails.appendChild(orderItem);
            });
        })
        .catch(error => console.error('Error fetching order details:', error));
});
