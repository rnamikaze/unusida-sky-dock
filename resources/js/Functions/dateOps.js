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
