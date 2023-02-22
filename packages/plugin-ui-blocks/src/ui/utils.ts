import { lodash, winPath } from '@umijs/utils';
import { isAbsolute, join } from 'path';

const resolveComponent = (component: string, paths): string => {
  const routeComponent = route.component
    ?.replace('@@', paths.absTmpPath)
    ?.replace('@', paths.absSrcPath);
  if (isAbsolute(routeComponent)) {
    return routeComponent;
  } else if (!routeComponent.includes('/')) {
    // short path, eg. "component: 'index'"
    return join(paths.absPagesPath, routeComponent);
  } else {
    return join(paths.cwd, routeComponent);
  }
}

export const getRouteComponents = ({ componentRoutes, paths, cwd }): string[] => {
  const getComponents = routes =>
    routes.reduce((memo, route) => {
      if (
        typeof route.component === 'string' &&
        !route.component.startsWith('(') &&
        !route.component?.includes('node_modules')
      ) {
        memo.push(winPath(resolveComponent(route.component, paths)));
      }
      if (route.routes) {
        memo = memo.concat(getComponents(route.routes));
      }
      return memo;
    }, []);

  return lodash.uniq(getComponents(componentRoutes));
};
