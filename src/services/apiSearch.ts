const apiKey: string = "zIjMaHAA3Z-TPw4-cndPHdXEXrAPmDwvA8y8v_2SsCk";

interface Result {
  alt_description: string;
  alternative_slugs: AlternativeSlugs;
  asset_type: string;
  blur_hash: string;
  color: string;
  created_at: string;
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: Links;
  promoted_at: string | null;
  slug: string;
  sponsorship: string | null;
  tags: Tag[];
  updated_at: string;
  urls: Urls;
  user: User;
  width: number;
}

interface AlternativeSlugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  [key: string]: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Tag {
  title: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  [key: string]: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
}

// Define ApiResponse with required properties
interface ApiResponse {
  total: number;
  total_pages: number;
  results: Result[];
}

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
