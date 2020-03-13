import { IProduct } from "./../model/Product";
import { ProductController } from "../controller/ProductController";

const productController = new ProductController();

export const productRoutes: any = [
  {
    route: "products.search",
    call: async (callPath, args, pathSet, paths) => {
        const products: IProduct[] = (await productController.getProducts(args[0].name)).slice(0, pathSet[0][0].to);
        const pathsToReturn: object[] = [];
        products.forEach((product, i) => {
            pathSet[1].forEach((key) => {
                pathsToReturn.push({ path: ["products", i, key], value: product[key]});
            });
        });
        return pathsToReturn;
        }
  }, {
    route: "product.add",
    call: async (callPath, args, pathSet, paths) => {
      const product: IProduct = await productController.addProduct(args);
      return pathSet.map((key) => {
            return { path: ["product", key], value: product[key]};
        });
      }
  }
];
