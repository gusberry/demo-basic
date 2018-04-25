export class Router {
  constructor(routerNode, routes) {
    this.routerNode = routerNode;
    this.routes = routes.sort((r1, r2) => r2.url.length - r1.url.length);
    this.routeParam = undefined;
    this.currentRouteContent = undefined;
  }

  async init() {
    await this.renderRoute();

    window.onpopstate = () => this.renderRoute();
  }

  async renderRoute() {
    const nextRoute = this.getSuitableRoute();

    try {
      if (nextRoute) {
        this.currentRouteContent && this.currentRouteContent.detach();
        this.currentRouteContent = await nextRoute.component.getNode(
          this.routeParam
        );
        this.routerNode.append(this.currentRouteContent);
      }
    } catch (e) {
      console.error(e);
    }
  }

  getSuitableRoute() {
    const location = this.getNormalizedLocation();
    let suitableRoute;

    this.routes.some((routeObj, idx) => {
      const routeUrlRgExp = new RegExp(`#${routeObj.url}(\/([^\/]+))?`);
      const res = location.match(routeUrlRgExp);

      if (res) {
        this.routeParam = res[2];
        return (suitableRoute = routeObj);
      }
    });

    return suitableRoute;
  }

  getNormalizedLocation() {
    if (!window.location.hash) {
      return '#/';
    }

    return window.location.hash;
  }
}
