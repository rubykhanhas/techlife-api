import {IFilterQuery, IQueryStringProducts} from "@/@types/query";
import qs from "query-string";

/**
 * @param {string} query query string
 * @returns {IQueryString} mongoose query object
 * @example
 * const query = "brand=lenovo&category=laptop&ratingStar=gte$2.5&remain=gte$100,lte$150&				sort=ratingStar$asc,remain$desc&limit=20&skip=1"
 *	return  {
      "sort": {
        "ratingStar": "asc",
        "remain": "desc"
      },
      "filter": {
        "brand": RegExp,
        "category": RegExp,
        "ratingstar": {
          "$gte": 2.5
        },
        "remain": {
          "$gte": 100,
          "$lte": 150
        }
      },
      "limit": 20,
      "skip": 1
    }
 * */
export function parseQueryString(query: string): IQueryStringProducts {
  const parsed = qs.parse(query, {arrayFormat: "comma"});
  let result: IQueryStringProducts;
  let filterRes: IFilterQuery;
  for (const [key, value] of Object.entries(parsed)) {
    const paginate = paginateQuery(key.toLowerCase(), value.toString().toLowerCase());
    const sort = sortQuery(key.toLowerCase(), value);
    const filter = filterQuery(key.toLowerCase(), value);

    filterRes = {
      ...filterRes,
      ...filter,
    };

    result = {
      ...result,
      ...paginate,
      sort,
      filter: filterRes,
    };
  }

  function paginateQuery(extractKey: string, extractValue: string) {
    /* limit, skip */
    if (!extractKey.match(RegExp(/^(limit|skip)/gim))) return;
    return {[extractKey]: Number(extractValue)};
  }
  function sortQuery(extractKey: string, extractValue: string | string[]) {
    if (!extractKey.match(RegExp(/^sort/gim))) return;
    const extractValues = Array.isArray(extractValue) ? extractValue : extractValue.split("\\");
    let elements: {[field: string]: string};
    extractValues.forEach((element) => {
      const [field, direction] = element.split("$");
      elements = {...elements, [field]: direction};
    });
    return elements;
  }
  function filterQuery(extractKey: string, extractValue: string | string[]) {
    if (extractKey.match(RegExp(/^(sort|skip|limit)/gim))) return;

    const extractValues = Array.isArray(extractValue) ? extractValue : extractValue.split("\\");
    /* query text */
    if (extractValues.length == 1 && !extractValues[0].includes("$"))
      return {[extractKey]: new RegExp(extractValues[0], "img")} as IFilterQuery;
    /* query with operator */
    let res = {
      [extractKey]: {},
    };
    extractValues.forEach((element) => {
      const [operator, value] = element.split("$");
      res[extractKey] = {
        ...res[extractKey],
        ["$" + operator]: Number(value),
      };
    });
    return res as IFilterQuery;
  }
  return result;
}
