import Fuse from "fuse.js";
import { useState } from "react";

const options = {
  keys: ["data.title", "data.description", "data.slug"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.3,
  isCaseSensitive: false,
};

function Search({ searchList }) {
  // User's input
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, options);

  // Set a limit to the posts: 5
  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  return (
    <div>
      <label
        htmlFor="search"
        className="sr-only mb-2 text-sm font-medium text-zinc-900 dark:text-white">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleOnSearch}
          className="block w-full rounded-lg bg-zinc-200/60 p-4 text-sm text-zinc-900 shadow-sm focus:outline-none dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="Search for blog posts..."
        />
      </div>
      {query.length > 1 && (
        <div className="my-4">
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for "
          {query}"
        </div>
      )}
      <ul className="mt-6 grid grid-cols-1 gap-6">
        {posts.map((data) => (
          <li class="border-spacing-y-2 border-b border-zinc-300 pb-4 dark:border-zinc-800 lg:flex-row lg:items-baseline lg:justify-between">
            <a
              href={`/blog/${data.slug}/`}
              class="group relative flex flex-col gap-0.5 sm:flex-row"
            >
              <div class="flex flex-col">
                <p class="dark:group-hover:text-green mb-1 font-semibold text-zinc-950 transition-colors group-hover:text-zinc-400 dark:text-zinc-300">
                  {data.data.title}
                </p>

                <p class="max-w-prose leading-relaxed">
                  {data.data.description}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
