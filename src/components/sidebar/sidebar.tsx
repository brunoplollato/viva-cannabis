import { ChartNoAxesGantt, Newspaper } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { useSidebarContext } from "../layout/layout-context";
import HeroIcon from "../website/heroIcon";
import { CompaniesDropdown } from "./companies-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/dashboard"
            />
            <SidebarMenu title="Menu Principal">
              {(user && user.role === 'ADMIN') && (
                <SidebarItem
                  isActive={pathname === "/dashboard/users"}
                  title="Usuários"
                  icon={<AccountsIcon />}
                  href="/dashboard/users"
                />
              )}
              <SidebarItem
                isActive={pathname === "/dashboard/partners"}
                title="Parceiros"
                icon={<CustomersIcon />}
                href="/dashboard/partners"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/products"}
                title="Produtos"
                icon={<ProductsIcon />}
                href="/dashboard/products"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/services"}
                title="Serviços"
                icon={<HeroIcon name="WrenchScrewdriverIcon" type="solid" className="text-[#969696] !w-6 !h-6" />}
                href="/dashboard/services"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/about"}
                title="Sobre"
                icon={<ReportsIcon />}
                href="/dashboard/about"
              />
            </SidebarMenu>

            <SidebarMenu title="Blog">
              <SidebarItem
                isActive={pathname.startsWith("/dashboard/posts")}
                title="Posts"
                icon={<Newspaper className="text-[#969696] !w-6 !h-6" />}
                href="/dashboard/posts"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/categories"}
                title="Categorias"
                icon={<ChartNoAxesGantt className="text-[#969696] !w-6 !h-6" />}
                href="/dashboard/categories"
              />
            </SidebarMenu>

            <SidebarMenu title="Geral">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Desenvolvedores"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Configurações"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
