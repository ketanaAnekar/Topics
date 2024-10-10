document.addEventListener('DOMContentLoaded', () => {
    // Function to handle each game
    function setupGame(coverId, messageId, correctOptionId, optionsClass) {
        const options = document.querySelectorAll(`.${optionsClass}`);
        const cover = document.getElementById(coverId);
        const messageDiv = document.getElementById(messageId);
        let draggedSticker = null;
        let initialPositions = {};

        // Store the initial positions of the stickers
        options.forEach(option => {
            const rect = option.getBoundingClientRect();
            initialPositions[option.id] = {
                left: rect.left,
                top: rect.top
            };
        });

        // Dragging starts
        options.forEach(option => {
            option.addEventListener('dragstart', (e) => {
                draggedSticker = e.target;
                setTimeout(() => (e.target.style.visibility = 'hidden'), 0);
            });

            option.addEventListener('dragend', (e) => {
                setTimeout(() => (e.target.style.visibility = 'visible'), 0);
            });
        });

        // Allow dropping on the cover
        cover.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        cover.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedSticker) {
                if (draggedSticker.id === correctOptionId) {
                    // Display correct message
                    messageDiv.textContent = 'Correct!';
                    messageDiv.classList.add('correct');
                    messageDiv.classList.remove('incorrect');

                    // Remove the sticker cover
                    cover.style.display = 'none';

                    // Return the correct sticker back to its original position
                    const initialPosition = initialPositions[draggedSticker.id];
                    draggedSticker.style.position = 'absolute';
                    draggedSticker.style.left = `${initialPosition.left}px`;
                    draggedSticker.style.top = `${initialPosition.top}px`;
                    draggedSticker.style.visibility = 'visible';
                } else {
                    // Display incorrect message
                    messageDiv.textContent = 'Try Again!';
                    messageDiv.classList.add('incorrect');
                    messageDiv.classList.remove('correct');
                    
                    // Reset the sticker to its original position
                    const initialPosition = initialPositions[draggedSticker.id];
                    draggedSticker.style.position = 'absolute';
                    draggedSticker.style.left = `${initialPosition.left}px`;
                    draggedSticker.style.top = `${initialPosition.top}px`;
                    draggedSticker.style.visibility = 'visible';
                }
            }
        });
    }

    // Setup for the three games
    setupGame('cover1', 'message1', 'option1-1', 'sticker-option');
    setupGame('cover2', 'message2', 'option2-2', 'sticker-option');
    setupGame('cover3', 'message3', 'option3-1', 'sticker-option');
});
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-300px'; // Close the sidebar
        menuBtn.textContent = 'STUCK?'; // Change button text back to "EXPLORE?"
    } else {
        sidebar.style.right = '0px'; // Open the sidebar
        menuBtn.textContent = 'X'; // Change button text to "X" to indicate closing
    }
});