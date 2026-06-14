export async function fetchFishData() {
    const response = await fetch("data/pacific-fish.json");

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}