/** @jsxImportSource @emotion/react */
import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "@headlessui/react";
import "@reach/skip-nav/styles.css";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import { Transition } from "../shared/Transition";
import { HomeOutlineIcon } from "./Icons";
import { OpenSidebarButton, Sidebar, SidebarHeader, SidebarNavLink } from "./Sidebar";
import MinusSmIcon from "@heroicons/react/outline/MinusSmIcon";

const ProfileDropdownItem = ({ disabled, as: Component = Link, ...props }) => {
  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <Component
          tw="flex justify-between w-full px-4 py-2 text-sm text-left"
          css={[
            active ? tw`bg-gray-100 text-gray-900` : tw`text-gray-700`,
            disabled && tw`cursor-not-allowed opacity-50`,
          ]}
          {...props}
        />
      )}
    </Menu.Item>
  );
};

const ProfileDropdown = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const { t } = useTranslation();
  return (
    <div tw="relative">
      <Menu>
        {({ open }) => (
          <>
            {/* Profile button */}
            <Menu.Button tw="max-w-xs bg-white flex items-center text-sm rounded-full focus:(outline-none ring-2 ring-offset-2 ring-white)">
              <span tw="sr-only">
                {open ? t("Layout.closeProfileMenu") : t("Layout.openProfileMenu")}
              </span>
              <img
                tw="h-8 w-8 rounded-full bg-red-200"
                src={user?.picture}
                alt={user?.name}
                width={256}
                height={256}
              />
            </Menu.Button>

            {/* Profile dropdown panel, show/hide based on dropdown state. */}
            <Transition
              show={open}
              enter={tw`transition ease-out duration-100`}
              enterFrom={tw`transform opacity-0 scale-95`}
              enterTo={tw`transform opacity-100 scale-100`}
              leave={tw`transition ease-in duration-75`}
              leaveFrom={tw`transform opacity-100 scale-100`}
              leaveTo={tw`transform opacity-0 scale-95`}
            >
              <Menu.Items
                static
                tw="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-red-100 focus:(outline-none)"
              >
                {isAuthenticated && (
                  <header tw="px-4 py-3">
                    <p tw="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  </header>
                )}

                <section tw="py-1">
                  <ProfileDropdownItem
                    as="button"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Se déconnecter
                  </ProfileDropdownItem>
                </section>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

const Navbar = ({ start, center, end }) => {
  return (
    <header tw="relative z-10 flex-shrink-0 flex h-16 bg-gray-800 shadow">
      {start}
      <nav tw="flex-1 px-4 flex justify-between">
        <div tw="flex-1 flex">{center}</div>
        <div tw="ml-4 flex items-center md:ml-6 space-x-3">{end}</div>
      </nav>
    </header>
  );
};

export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <>
      <div tw="flex overflow-hidden bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} onDismiss={closeSidebar} header={<SidebarHeader />}>
          <SidebarNavLink to="/" exact="true">
            <HomeOutlineIcon />
            Accueil
          </SidebarNavLink>
          <SidebarNavLink to="/seance-complete" exact="true">
            <MinusSmIcon />
            Seance complete
          </SidebarNavLink>
          <SidebarNavLink to="/wod-creator" exact="true">
            <MinusSmIcon />
            Wod creator
          </SidebarNavLink>
          <SidebarNavLink to="/rm-tracker" exact="true">
            <MinusSmIcon />
            Rm tracker
          </SidebarNavLink>
        </Sidebar>

        {/* Navbar & content */}
        <div tw="flex flex-col w-0 flex-1 overflow-hidden bg-gray-800">
          <Navbar
            start={<OpenSidebarButton onClick={openSidebar} />}
            center={<></>}
            end={
              <>
                <ProfileDropdown />
              </>
            }
          />
          {children}
        </div>
      </div>
    </>
  );
};
