import Book from "./Book.svelte";
import NotFound from "./NotFound.svelte";

// Export the route definition object
export default {
  "/book": Book,
  // Catch-all, must be last
  "*": NotFound
};
