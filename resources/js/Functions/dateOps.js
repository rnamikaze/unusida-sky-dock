export function getFormattedDate() {
    const date = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    // Example: "September 10, 2025"
    let formatted = date.toLocaleDateString("en-US", options);
    // Remove the comma after the day
    return formatted.replace(",", "");
}

export function getDayName() {
    const date = new Date();
    return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function formatTimestamp(timestamp) {
    if (!timestamp) return "N/A";

    const date = new Date(timestamp);

    // Extract time parts
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format date
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds}, ${day} ${month} ${year}`;
}
