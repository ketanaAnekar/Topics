document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.floating-image');

    // Randomize the initial positions and sizes of the images
    images.forEach(image => {
        let randomSize = Math.random() * (20 - 10) + 10; // Random size between 10rem and 15rem
        image.style.width = `${randomSize}rem`;

        // Set initial positions
        image.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        image.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

        // Add drag event listeners to the images
        image.addEventListener('mousedown', (event) => {
            event.preventDefault();

            let shiftX = event.clientX - image.getBoundingClientRect().left;
            let shiftY = event.clientY - image.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                image.style.left = pageX - shiftX + 'px';
                image.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // Attach the mousemove event to the document
            document.addEventListener('mousemove', onMouseMove);

            // Remove listeners on mouseup
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });

        image.ondragstart = () => false; // Prevent default drag behavior
    });

    // Sidebar toggle and change button text
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menu-btn');

    menuBtn.addEventListener('click', () => {
        if (sidebar.style.right === '0px') {
            sidebar.style.right = '-300px'; // Completely hide the sidebar
            menuBtn.textContent = 'MORE?'; // Change text back to "EXPLORE?" when closing
        } else {
            sidebar.style.right = '0px'; // Show the sidebar
            menuBtn.textContent = 'X'; // Change text to "X" when opening
        }
    });
});
