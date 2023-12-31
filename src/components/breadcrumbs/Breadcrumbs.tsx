import { MapBreadcrumbs } from "@/components/breadcrumbs/mapBreadcrumbs";
import { breadcrumbItem } from "@/types/types";


function Breadcrumbs(
    props: {
        path: string | undefined
    }
) {
    const {path} = props;
    if(path === undefined) return null;
    const breadcrumbs: breadcrumbItem[] = MapBreadcrumbs(path);
  return (
      <div className={"text-sm breadcrumbs text-gray-400 hidden pb-4 lg:block"}>
          <ul>
                { breadcrumbs.length > 1 &&
                    breadcrumbs.map((breadcrumb, index) => {
                        return (
                            <li key={breadcrumb.name}>
                                {index !== breadcrumbs.length - 1 ? (
                                    <a href={breadcrumb.href} className="hover:text-gray-200">
                                        {breadcrumb.name}
                                    </a>
                                ) : (
                                    <span aria-current="page" className="text-gray-200">
                                        {breadcrumb.name}
                                    </span>
                                )}
                            </li>
                        );
                    })
                }
          </ul>
      </div>
  );
}

export default Breadcrumbs;