document.addEventListener('DOMContentLoaded', () => {
    const stickers = document.querySelectorAll('.sticker');
    let isDragging = false;
    let currentSticker = null;
    let shiftX, shiftY;

    // Show stickers with the faster popping effect one by one
    function showStickersSequentially(index = 0) {
        if (index >= stickers.length) return;

        const sticker = stickers[index];
        const maxLeft = window.innerWidth - sticker.clientWidth;
        const maxTop = window.innerHeight - sticker.clientHeight;

        // Set random positions within the screen
        sticker.style.left = `${Math.random() * maxLeft}px`;
        sticker.style.top = `${Math.random() * maxTop}px`;

        setTimeout(() => {
            sticker.style.opacity = '1';
            sticker.style.transform = 'scale(1)';

            setTimeout(() => {
                showStickersSequentially(index + 1);
            }, 400); // Adjusted delay for popping animation
        }, 100);
    }

    // Handle peeling and dragging
    stickers.forEach(sticker => {
        const link = sticker.querySelector('a');

        // Make the "stick", "peel", and "&" stickers draggable from anywhere
        if (sticker.id === 'stick' || sticker.id === 'peel' || sticker.id === 'and') {
            sticker.addEventListener('mousedown', (event) => {
                event.preventDefault(); // Prevent default behavior
                currentSticker = sticker;
                isDragging = true;
                currentSticker.classList.add('dragging');

                // Disable link click during dragging
                if (link) link.style.pointerEvents = 'none';

                // Calculate offset
                shiftX = event.clientX - sticker.getBoundingClientRect().left;
                shiftY = event.clientY - sticker.getBoundingClientRect().top;
            });
        } else {
            // Other stickers will have the peel effect before dragging
            sticker.addEventListener('mousemove', (event) => {
                const rect = sticker.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                // Check if mouse is near the top-right corner
                if (mouseX > rect.width - 60 && mouseY < 60) {
                    sticker.classList.add('peeling');
                } else {
                    sticker.classList.remove('peeling');
                }
            });

            // Start dragging on mousedown (for stickers with peeling)
            sticker.addEventListener('mousedown', (event) => {
                if (!sticker.classList.contains('peeling')) return; // Only drag if peeled

                event.preventDefault();
                currentSticker = sticker;
                isDragging = true;
                currentSticker.classList.add('dragging');

                // Disable link click during dragging
                if (link) link.style.pointerEvents = 'none';

                // Calculate offset
                shiftX = event.clientX - sticker.getBoundingClientRect().left;
                shiftY = event.clientY - sticker.getBoundingClientRect().top;
            });
        }

        // Dragging
        document.addEventListener('mousemove', (event) => {
            if (!isDragging || !currentSticker) return;

            let newLeft = event.clientX - shiftX;
            let newTop = event.clientY - shiftY;

            // Keep within window bounds
            const maxLeft = window.innerWidth - currentSticker.clientWidth;
            const maxTop = window.innerHeight - currentSticker.clientHeight;

            newLeft = Math.max(0, Math.min(newLeft, maxLeft));
            newTop = Math.max(0, Math.min(newTop, maxTop));

            currentSticker.style.left = `${newLeft}px`;
            currentSticker.style.top = `${newTop}px`;
        });

        // Stop dragging on mouseup
        document.addEventListener('mouseup', () => {
            if (currentSticker) {
                currentSticker.classList.remove('dragging');

                // Re-enable link click
                const link = currentSticker.querySelector('a');
                if (link) link.style.pointerEvents = 'auto';
            }
            isDragging = false;
            currentSticker = null;
        });
    });

    // Show stickers sequentially
    showStickersSequentially();
});
