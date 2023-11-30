document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("gameBoard");
    const rows = 20;
    const columns = 10;
    let currentPosition = 4 + columns; // Adjusted starting position

    // Create the game grid
    for (let i = 0; i < rows * columns; i++) {
        let cell = document.createElement("div");
        board.appendChild(cell);
    }

    // Add the block
    let block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);

    // Move the block down
    function moveDown() {
        if (currentPosition + columns < rows * columns) {
            currentPosition += columns;
            updateBlockPosition();
        } else {
            // Block has landed
            block.style.backgroundColor = 'green'; // Indicate landing
            clearInterval(falling); // Stop the block from falling
        }
    }

    // Move the block left
    function moveLeft() {
        if (currentPosition % columns !== 0) {
            currentPosition -= 1;
            updateBlockPosition();
        }
    }

    // Move the block right
    function moveRight() {
        if ((currentPosition + 1) % columns !== 0) {
            currentPosition += 1;
            updateBlockPosition();
        }
    }

    // Update block position
    function updateBlockPosition() {
        block.style.top = `${Math.floor(currentPosition / columns) * 20}px`;
        block.style.left = `${(currentPosition % columns) * 20}px`;
    }

    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        switch(e.keyCode) {
            case 37: // Left arrow key
                moveLeft();
                break;
            case 39: // Right arrow key
                moveRight();
                break;
        }
    });

    // Start moving the block down
    let falling = setInterval(moveDown, 1000);
    updateBlockPosition();
});
