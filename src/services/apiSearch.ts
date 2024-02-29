const apiKey: string = "lcQUI8QknAh1VyBH8-19ZH8kC4IzOhSggQBv2eEBXJQ";

export async function getSearchedData(
  pageIndex: number,
  searchWord: string
): Promise<object> {
  if (!searchWord) return;

  try {
    console.log("fetching");
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&query=${searchWord}&client_id=${apiKey}`
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
