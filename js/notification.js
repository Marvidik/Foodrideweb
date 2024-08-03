const apiUrl = 'https://foodride.viziddecors.com/userswithorders/'; // API endpoint to check for orders
let lastOrderId = null; // Variable to keep track of the last order ID

function checkForNewOrders() {
    axios.get(apiUrl)
        .then(response => {
            const orders = response.data.Orders;
            if (orders.length > 0) {
                const latestOrder = orders[0]; // Assuming the latest order is the first in the array
                
                if (latestOrder.id !== lastOrderId) {
                    lastOrderId = latestOrder.id; // Update the last order ID
                    showNotification(latestOrder);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

function showNotification(order) {
    const notificationTitle = 'New Order Received';
    const notificationOptions = {
        body: `Food: ${order.food_details.name}\nQuantity: ${order.quantity}\nAddress: ${order.profile.address}\nPhone: ${order.profile.phone}`,
        icon: 'path/to/icon.png'
    };

    if (Notification.permission === 'granted') {
        new Notification(notificationTitle, notificationOptions);
    } else {
        console.log('Notification permission not granted.');
    }
}

// Poll the API every 30 seconds
setInterval(checkForNewOrders, 30000);

// Request notification permission
if ('Notification' in window) {
    Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    });
}
