document.querySelector('.search-bar').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const query = event.target.query.value.trim().toLowerCase();

    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    // Define sections and their pages
    const sectionsToSearch = [
        { section: 'movies', selector: '.movies .carousel img', page: 'movies.html' },
        { section: 'series', selector: '.series .carousel img', page: 'series.html' },
        { section: 'coming soon', selector: '.coming-soon .carousel img', page: 'coming-soon.html' }
    ];

    let found = false;

    for (const section of sectionsToSearch) {
        const elements = document.querySelectorAll(section.selector);

        elements.forEach((item) => {
            const itemTitle = item.alt.trim().toLowerCase(); // Normalize case and whitespace

            if (itemTitle.includes(query)) {
                found = true;

                if (!location.pathname.includes(section.page)) {
                    // Redirect to target page
                    localStorage.setItem('searchQuery', query);
                    localStorage.setItem('targetPage', section.page);
                    window.location.href = section.page;
                } else {
                    // Scroll to matched item
                    const itemPosition = item.offsetLeft;
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    item.style.border = '2px solid red';
                    setTimeout(() => {
                        item.style.border = '';
                    }, 2000);
                }
            }
        });

        if (found) break;
    }

    if (!found) {
        alert('No results found.');
    }
});

// Handle query after redirection
window.addEventListener('load', () => {
    const searchQuery = localStorage.getItem('searchQuery');
    const targetPage = localStorage.getItem('targetPage');

    if (searchQuery && location.pathname.includes(targetPage)) {
        localStorage.removeItem('searchQuery');
        localStorage.removeItem('targetPage');

        const elements = document.querySelectorAll(".movies .carousel img, .series .carousel img, .coming-soon .carousel img");

        elements.forEach((item) => {
            const itemTitle = item.alt.trim().toLowerCase();

            if (itemTitle.includes(searchQuery)) {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                item.style.border = '2px solid red';
                setTimeout(() => {
                    item.style.border = '';
                }, 2000);
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("background-video");

    // Ensure the video stays muted
    video.muted = true;

    // Observe any changes and reset if necessary
    video.addEventListener("volumechange", () => {
        if (!video.muted) {
            video.muted = true; // Force mute if it gets unmuted
        }
    });
});
// Function to open the video modal
function openVideoPlayer() {
    const modal = document.getElementById("video-modal");
    if (modal) {
        modal.style.display = "block"; // Show the modal
    }
}

// Function to close the video modal
function closeVideoPlayer() {
    const modal = document.getElementById("video-modal");
    if (modal) {
        modal.style.display = "none"; // Hide the modal
        const video = document.getElementById("streaming-video");
        if (video) {
            video.pause(); // Pause the video when closing
            video.currentTime = 0; // Reset video to the beginning
        }
    }
}
function closeVideoPlayer() {
    const modal = document.getElementById("video-modal");
    if (modal) {
        modal.style.display = "none"; // Hide the modal
        const video = document.getElementById("streaming-video");
        if (video) {
            video.pause(); // Pause the video
            video.currentTime = 0; // Reset video to the beginning
        }
    }
}
function openVideoPlayer(videoFile) {
    // Dynamically create a video player modal
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = `
        <div style="position: relative; background-color: #fff; padding: 20px; border-radius: 10px; width: 80%; max-width: 800px;">
            <button onclick="closeVideoPlayer()" style="position: absolute; top: 10px; right: 10px; background-color: red; color: #fff; border: none; border-radius: 50%; font-size: 20px; width: 30px; height: 30px; cursor: pointer;">&times;</button>
            <video controls autoplay style="width: 100%;">
                <source src="assets/videos/${videoFile}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    modal.innerHTML = modalContent;

    // Append modal to the body
    document.body.appendChild(modal);
}

function closeVideoPlayer() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.remove();
    }
}



//****************** */
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Get all "Watch Now" buttons
    const watchNowButtons = document.querySelectorAll(".btn-watch-now");

    // Add click event listener to each button
    watchNowButtons.forEach(button => {
        button.addEventListener("click", () => {
            const videoFile = button.getAttribute("data-video"); // Get the video file
            if (videoFile && videoFile.trim() !== "") {
                openVideoPlayer(`assets/videos/${videoFile}`); // Open modal with video
            } else {
                alert("Video not available for this movie.");
            }
        });
    });
});

// Function to open the video player modal
function openVideoPlayer(videoPath) {
    // Create the modal container
    const modal = document.createElement("div");
    modal.id = "video-modal";
    modal.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // Add modal content including the video tag
    modal.innerHTML = `
        <div style="position: relative; background: #fff; border-radius: 8px; padding: 20px; width: 80%; max-width: 800px;">
            <!-- Close Button -->
            <button onclick="closeVideoPlayer()" 
                style="position: absolute; top: 10px; right: 10px; 
                       background-color: red; color: white; border: none; 
                       border-radius: 50%; font-size: 20px; width: 30px; 
                       height: 30px; cursor: pointer;">&times;</button>
            <!-- Video Tag -->
            <video controls autoplay style="width: 100%; border-radius: 8px;">
                <source src="${videoPath}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);
}

// Function to close the video player modal
function closeVideoPlayer() {
    const modal = document.getElementById("video-modal");
    if (modal) {
        modal.remove();
    }
}
