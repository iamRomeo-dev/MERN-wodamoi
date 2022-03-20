/**
 * @typedef {(":id" | keyof T)} SortParam
 * @template T
 */
/**
 * @typedef {{ limit?: number, skip?: number, sort?: SortParam<T> } & object} SearchParams
 * @template T
 */

/**
 * @typedef {{ totalCount: number, list: T[] }} Page
 * @template T
 */

export const Sort = {
  /**
   * @type {<T>(sort: string | null, table: import("dexie").Table<T>) => import("dexie").Collection<T>}
   */
  from: (sort, table) => {
    if (sort === null) {
      return table.toCollection();
    }
    if (sort.startsWith("-")) {
      const sortProperty = sort.substring(1);
      return table.orderBy(sortProperty).reverse();
    }
    return table.orderBy(sort);
  },
};

/** Escape a string and allow it to be used as a regexp */
const escapeRegExp = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const Filter = {
  /**
   * Combine given expressions in a single mingo filter.
   * Falsy expressions will be removed.
   * @example
   * Filter.from(
   *   { foo: "bar" },
   *   search && { baz: search }
   * )
   * // If search === "some search terms", will result in:
   * { foo: "bar", baz: "some search terms" }
   * // If search === "", will result in:
   * { foo: "bar" }
   * @type {(...any) => object}
   */
  from: (...expressions) => {
    const filter = Object.assign({}, ...expressions.filter(Boolean));
    if (Object.keys(filter).length === 0) {
      // If there are no keys in the filter, return undefined.
      // This will skip filtering in the queries and avoid creating a mingo query
      return undefined;
    }
    return filter;
  },
  /**
   * Create a mongi $regex expression and escape the given value.
   * This is a shorcut that can be used instead of `{ $regex: escapeRegExp(value), $options: "gi" }`
   */
  regex: (value, options = "gi") => {
    return { $regex: escapeRegExp(value), $options: options };
  },
  and: (...args) => {
    return { $and: args.filter(Boolean) };
  },
  or: (...args) => {
    return { $or: args.filter(Boolean) };
  },
};
