const botToken = "8015877701:AAHUoHAETIEzfelSphdzhV4Dh5xCvpoJMXw";
const chatId = "-1002384147528";

let userIp = "Unknown";
let country = "Unknown";
let city = "Unknown";
let headerTitleContent = "Not found";

// datetime format function
function formatDateTime() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

let currentDateTime = formatDateTime();

// Function to get user IP and geo data
async function getUserIpAndGeo() {
    try {
        // Get user IP
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipResponse.json();
        userIp = ipData.ip;

        // Get geo info
        const geoResponse = await fetch(`https://ipinfo.io/${userIp}/json`);
        const geoData = await geoResponse.json();
        country = geoData.country || "Unknown";
        city = geoData.city || "Unknown";

        // Get user agent
        userAgent = navigator.userAgent || 'Unknown';

        // Get header title content
        //const headerTitle = document.querySelector(".header-title");
        //headerTitleContent = headerTitle ? headerTitle.textContent : "Not found";
        headerTitleContent = "Inframe landing";
    } catch (error) {
        await sendErrorToTelegram(error);
    }
}

// Function to send user data to Telegram
async function sendToTelegram() {
    try {
        const message = `Landing: *${headerTitleContent}*\nIP: *${userIp}*\nLocation: *${country}, ${city}* \nUser agent: *${userAgent}* \nDate: *${currentDateTime}*`;
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

        await fetch(telegramUrl);
    } catch (error) {
        await sendErrorToTelegram(error);
    }
}

// Function to send error messages to Telegram
async function sendErrorToTelegram(error) {
    try {
        const errorMessage = `Error: ${error.message}\nStack: ${error.stack}`;
        const errorTelegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(errorMessage)}`;
        await fetch(errorTelegramUrl);
    } catch (telegramError) {
        console.error("Failed to send error to Telegram:", telegramError);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await getUserIpAndGeo();

    // Click event handler for call buttons
    document.querySelectorAll(".answer-button").forEach((button) => {
        button.addEventListener("click", sendToTelegram);
    });

    // Click event handler for call buttons
    document.querySelectorAll(".header-button").forEach((button) => {
        button.addEventListener("click", sendToTelegram);
    });

    // Click event handler for call buttons
    document.querySelectorAll(".participate-button").forEach((button) => {
        button.addEventListener("click", sendToTelegram);
    });
});
