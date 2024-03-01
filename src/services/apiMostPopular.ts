const apiKey: string = "tKI85mb8gV-en1QDQO172EhtleiayfqzBDDgeGhMfJ8";

export async function getMostPopular() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=1&per_page=20&order_by=popular&client_id=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
