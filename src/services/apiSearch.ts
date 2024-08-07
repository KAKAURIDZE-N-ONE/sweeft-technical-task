const apiKey: string = "zIjMaHAA3Z-TPw4-cndPHdXEXrAPmDwvA8y8v_2SsCk";
import { ApiResponse } from "../features/gallerySlice";
export async function getSearchedData(
  pageIndex: number,
  searchWord: string
): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=15&query=${searchWord}&client_id=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
