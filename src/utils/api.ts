import { ApiEndpoints } from "@/types";

const apiUrl = "https://dummyjson.com";

export const apiEndpoints: ApiEndpoints = {
  users: "users",
};

export const createUrl = (endPoint: string, searchQuery?: string) => {
  // console.log(`Передал ${searchQuery} и ${endPoint}`);
  const searchQueryParam = searchQuery
    ? `search?q=${searchQuery}`
    : searchQuery;

  return [apiUrl, endPoint, searchQueryParam].filter(Boolean).join("/");
};
