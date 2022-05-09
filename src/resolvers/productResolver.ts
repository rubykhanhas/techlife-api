import {Product, ProductModel} from "@/entities/product";
import {parseQueryString} from "@/utils/query";
import {Arg, Query, Resolver} from "type-graphql";

@Resolver()
export class ProductResolver {
  @Query((_) => [Product])
  async products(
    @Arg("query", {
      description:
        "brand=lenovo&category=laptop&ratingStar=gte$2.5&remain=gte$100,lte$150&sort=ratingStar$asc,remain$desc&limit=20&skip=1",
    })
    queryString: string
  ) {
    const {filter, sort, limit, skip} = parseQueryString(queryString);
    return await ProductModel.find(filter).sort(sort).skip(skip).limit(limit);
  }

  @Query((_) => Product)
  async product(@Arg("productID") productID: string) {
    return await ProductModel.findOne({productID});
  }

  @Query((_) => [Product])
  async relatedProducts(@Arg("productID") productID: string) {
    const {relatedProductIDList} = await ProductModel.findOne({productID});
    let result: Product[] = [];
    for (let index = 0; index < relatedProductIDList.length; index++) {
      const product = await ProductModel.findOne({productID: relatedProductIDList[index]});
      if (product) await result.push(product);
    }
    await console.log(result);
    return result;
  }

  @Query((_) => [String])
  async distinctFieldValues(@Arg("field") field: string) {
    return await ProductModel.distinct(field);
  }
}