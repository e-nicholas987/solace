<!-- Frontend -->

1. `<th>` wasn’t wrapped in a `<tr>`, which caused hydration errors  
   Wrapping `<th>` in `<tr>` fixes React hydration errors.

2. Added a key to each mapped table item  
   Helps with efficient list rendering.

3. Switched from using `document.getElementById("search-term").innerHTML` to React state management  
   Direct DOM manipulation can lead to unpredictable UI issues.

4. Removed console logs

5. Added debounced search with proper cleanup  
   Improves performance and user experience by cutting down on unnecessary API calls and avoiding memory leaks.

6. Updated table header and badges to match Solace brand colors  
   Keeps the look and feel consistent with Solace branding.

7. Added basic pagination  
   Makes handling large datasets smoother and more user-friendly.

8. Converted components to server components  
   Takes advantage of Next.js server component features for better scalability.

9. Improved responsiveness for screens < 768px  
   Ensures the app layout adapts to different screen sizes, providing a seamless user experience across devices.

<!-- Backend -->

1. Added the `Satisfies` type to `drizzle.config.ts`  
   Improves type safety and TypeScript support for the Drizzle config.

2. Renamed the `payload` column to `specialties` in the advocates table  
   Makes the schema clearer and more consistent.

3. Changed the `phoneNumber` field to type `text` and made it unique  
   Allows for flexible phone number formats and ensures no duplicates.

4. Updated the database setup to throw an error if `DATABASE_URL` is missing, instead of returning mock data  
   Ensures type safety and lets API routes use Drizzle methods without TypeScript errors.

5. Changed the `specialties` column from `jsonb` to a `text[]` array  
   We only need an array of strings, and `text[]` is natively supported by both Drizzle and Postgres.
