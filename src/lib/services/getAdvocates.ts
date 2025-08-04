import { Advocate } from "@/db/schema";
import buildQueryString from "../helpers/buildQueryString";
import { BASE_URL } from "../constants/baseUrl";

export interface Pagination {
  page: number;
  limit: number;
  count: number;
  offset: number;
  total: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}

export interface SearchParams {
  q?: string;
  page?: string;
  limit?: string;
}

export interface GetAdvocatesResponse {
  data: Advocate[] | undefined;
  meta: {
    pagination: Pagination;
  };
}

export default async function getAdvocates(
  queryParams?: SearchParams
): Promise<{
  data: GetAdvocatesResponse | undefined;
  error: string | undefined;
}> {
  try {
    const response = await fetch(
      buildQueryString(`${BASE_URL}/api/advocates`, {
        ...(queryParams || {}),
      }),
      {
        cache: "no-cache",
      }
    );
    if (response.ok) {
      const jsonRes = await response.json();
      return { data: jsonRes, error: undefined };
    }
    return { data: undefined, error: "Failed to fetch advocates" };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `${error.name}\n${error.message}`
        : "Failed to fetch advocates";
    return {
      data: undefined,
      error: `${errorMessage}\nPlease make sure you are running on ${BASE_URL} 👍🏼`,
    };
  }
}
