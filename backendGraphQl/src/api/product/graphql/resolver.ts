import { IResolver } from "../../../core/graphql/IResolver";
import { ProductController } from "../controller/ProductController";
const productController = new ProductController();

export const ProductResolvers: IResolver = {
  Query: {
    products: productController.getProducts
  },
  Mutation: {
    addProduct: productController.addProduct,
    updateProduct: productController.updateProduct
  }
};
