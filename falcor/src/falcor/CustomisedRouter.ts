import Router from "falcor-router";
import { routes } from "./routes";

const BaseRouter = Router.createClass(routes);

const CustomisedRouter = function(token: string) {
    BaseRouter.call(this);
    this.token = token;
    this.maxPaths = Number.MAX_SAFE_INTEGER;
};

CustomisedRouter.prototype = Object.create(BaseRouter.prototype);

export default CustomisedRouter;
