/** @jsxImportSource @emotion/react */
import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "@headlessui/react";
import { useId } from "@reach/auto-id";
import "@reach/skip-nav/styles.css";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import { Transition } from "../shared/Transition";
import { BellOutlineIcon, HomeOutlineIcon, SearchSolidIcon } from "./Icons";
import { OpenSidebarButton, Sidebar, SidebarHeader, SidebarNavLink } from "./Sidebar";

const SearchBar = () => {
  const { t } = useTranslation();
  const id = useId();
  return (
    <form tw="w-full flex md:ml-0" action="#" method="GET">
      <label htmlFor={id} tw="sr-only">
        {t("Layout.search")}
      </label>
      <div tw="relative w-full text-gray-400 focus-within:text-gray-600">
        <div tw="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <SearchSolidIcon tw="h-5 w-5" />
        </div>
        <input
          id={id}
          tw="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:(outline-none placeholder-gray-400 ring-0 border-transparent) sm:(text-sm)"
          placeholder={t("Layout.search")}
          type="search"
        />
      </div>
    </form>
  );
};

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
            <Menu.Button tw="max-w-xs bg-white flex items-center text-sm rounded-full focus:(outline-none ring-2 ring-offset-2 ring-indigo-500)">
              <span tw="sr-only">
                {open ? t("Layout.closeProfileMenu") : t("Layout.openProfileMenu")}
              </span>
              <img
                tw="h-8 w-8 rounded-full"
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
                tw="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:(outline-none)"
              >
                {isAuthenticated && (
                  <header tw="px-4 py-3">
                    <p tw="text-sm">{t("Layout.signedInAs")}</p>
                    <p tw="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  </header>
                )}

                <section tw="py-1">
                  <ProfileDropdownItem
                    as="button"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Se déconnecté
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

const NotificationButton = () => {
  const { t } = useTranslation();
  return (
    <button tw="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:(outline-none ring-2 ring-offset-2 ring-indigo-500)">
      <span tw="sr-only">{t("Layout.notifications")}</span>
      <BellOutlineIcon tw="h-6 w-6" />
    </button>
  );
};

const Navbar = ({ start, center, end }) => {
  return (
    <header tw="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      {start}
      <nav tw="flex-1 px-4 flex justify-between">
        <div tw="flex-1 flex">{center}</div>
        <div tw="ml-4 flex items-center md:ml-6 space-x-3">{end}</div>
      </nav>
    </header>
  );
};

export const Layout = ({ children }) => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <>
      <div tw="h-screen flex overflow-hidden bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} onDismiss={closeSidebar} header={<SidebarHeader />}>
          <SidebarNavLink to="/" exact="true">
            <HomeOutlineIcon />
            {t("Layout.dashboard")}
          </SidebarNavLink>
        </Sidebar>

        {/* Navbar & content */}
        <div tw="flex flex-col w-0 flex-1 overflow-hidden bg-gray-800">
          <Navbar
            start={<OpenSidebarButton onClick={openSidebar} />}
            center={<SearchBar />}
            end={
              <>
                <NotificationButton />
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
