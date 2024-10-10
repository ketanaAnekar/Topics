const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-300px'; // Close the sidebar
        menuBtn.textContent = 'PEELING AWAY?'; // Change button text back to "EXPLORE?"
    } else {
        sidebar.style.right = '0px'; // Open the sidebar
        menuBtn.textContent = 'X'; // Change button text to "X" to indicate closing
    }
});


