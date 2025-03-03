function openPage(pageName) {
    window.open(pageName, "_self");
}

function downloadResume() {
    window.open('Files/DanielParkerResume.pdf');
}

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text);
}

let popupTimeout; // Define a variable to hold the timeout ID for the popup

function showPopup(message) {
    const existingPopup = document.querySelector('.popup');
    
    // If there's an existing popup, remove it
    if (existingPopup) {
        document.body.removeChild(existingPopup);
        clearTimeout(popupTimeout); // Clear the timeout associated with the existing popup
    }

    const popup = document.createElement('div');
    popup.textContent = message;
    popup.classList.add('popup');
    document.body.appendChild(popup);

    // Trigger reflow to ensure transition is applied
    void popup.offsetWidth;

    // Fade in the popup
    popup.style.opacity = 1;

    // After 2 seconds, fade out and remove the popup
    popupTimeout = setTimeout(() => {
        popup.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 500); // Wait for the fade-out transition to complete
    }, 1000);
}



// Function to handle copying of text and showing popup
function handleCopyClick(event) {
    const textToCopy = event.target.dataset.text;
    copyTextToClipboard(textToCopy);
    let copiedMessage = ""; // Initialize the variable outside the conditional blocks

    // Determine the appropriate message based on the copied text
    if (textToCopy === 'daniel.k.parker17@gmail.com') {
        copiedMessage = "Email Address Copied to Clipboard";
    } else if (textToCopy === "(281) 536-1817") {
        copiedMessage = "Mobile Number Copied to Clipboard";
    }
    
    // Show the popup with the appropriate message
    showPopup(copiedMessage);
}

// Add click event listeners to all elements with the 'copyable' class
document.querySelectorAll('.copyable').forEach(element => {
    element.addEventListener('click', handleCopyClick);
});

// Adjust footer position when buttons move to one column
window.addEventListener('resize', adjustFooterPosition);

function adjustFooterPosition() {
    const buttonContainer = document.querySelector('.button-container');
    const footer = document.querySelector('.footer');
    const buttonContainerRect = buttonContainer.getBoundingClientRect();
    const footerHeight = footer.offsetHeight;

    const spaceBelowButtons = window.innerHeight - buttonContainerRect.bottom;

    if (spaceBelowButtons < footerHeight) {
        footer.style.bottom = `-${footerHeight - spaceBelowButtons}px`;
    } else {
        footer.style.bottom = '0';
    }
}

// Call adjustFooterPosition initially
adjustFooterPosition();
