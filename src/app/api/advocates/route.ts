import { ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const offset = (page - 1) * limit;
  let data;

  try {
    const searchValue = `%${query}%`;
    const whereClause = query
      ? or(
          ilike(advocates.firstName, searchValue),
          ilike(advocates.lastName, searchValue),
          ilike(advocates.city, searchValue),
          ilike(advocates.degree, searchValue),
          ilike(advocates.phoneNumber, searchValue),
          sql`(${advocates.yearsOfExperience})::text ILIKE ${searchValue}`,
          sql`(${advocates.specialties})::text ILIKE ${searchValue}`
        )
      : undefined;

    data = await db
      .select()
      .from(advocates)
      .where(whereClause)
      .limit(Number(limit))
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(advocates)
      .where(whereClause);

    const totalPages = Math.ceil(Number(count) / Number(limit));

    return Response.json({
      data,
      meta: {
        pagination: {
          page,
          limit,
          count,
          offset,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: page < totalPages ? page + 1 : null,
          total: Number(count),
          totalPages,
        },
      },
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
