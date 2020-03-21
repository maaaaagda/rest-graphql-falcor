import Router from "falcor-router";
import { routes } from "./routes";

const BaseRouter = Router.createClass(routes);

const CustomisedRouter = function(token: string) {
    BaseRouter.call(this);
    this.token = token;
};

CustomisedRouter.prototype = Object.create(BaseRouter.prototype);

export default CustomisedRouter;
