/** @jsxImportSource @emotion/react */
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import tw from "twin.macro";
import { MenuAlt2OutlineIcon, WodamoiIcon, XOutlineIcon } from "./Icons";
import { Transition } from "./Transition";

export const CloseSidebarButton = (props) => {
  const { t } = useTranslation();
  return (
    <button
      tw="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:(outline-none ring-2 ring-inset ring-white)"
      {...props}
    >
      <span tw="sr-only">{t("Layout.closeSidebar")}</span>
      <XOutlineIcon tw="h-6 w-6 text-white" />
    </button>
  );
};

export const OpenSidebarButton = (props) => {
  const { t } = useTranslation();
  return (
    <button
      tw="px-4 border-r border-gray-200 text-gray-500 focus:(outline-none ring-2 ring-inset ring-indigo-500) md:hidden"
      {...props}
    >
      <span tw="sr-only">{t("Layout.openSidebar")}</span>
      <MenuAlt2OutlineIcon tw="h-6 w-6" />
    </button>
  );
};

export const SidebarHeader = () => {
  return (
    <header tw="flex-shrink-0 flex items-center justify-center px-4">
      <Link to="/" tw="flex flex-col">
        <WodamoiIcon tw="w-28 h-auto" />
      </Link>
    </header>
  );
};

export const SidebarNavLink = (props) => {
  return (
    <NavLink
      className="group"
      css={[
        tw`flex items-center px-2 py-2 text-base md:text-sm font-medium rounded-md svg:(mr-4 md:mr-3 h-6 w-6)`,
        tw`text-gray-600 hover:(bg-gray-50 text-gray-900) svg:(text-gray-400 group-hover:text-gray-500)`,
        { "&.active": tw`bg-gray-100 text-gray-900 hover:(bg-gray-100) svg:(text-gray-500)` },
      ]}
      {...props}
    />
  );
};

export const OffCanvasSidebar = ({ isOpen, onDismiss, header, children, ...props }) => {
  const { t } = useTranslation();

  return (
    <Transition show={isOpen} {...props}>
      <DialogOverlay tw="fixed inset-0 flex z-40 bg-transparent" onDismiss={onDismiss}>
        {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
        <Transition.Child
          tw="fixed inset-0"
          enter={tw`transition-opacity ease-linear duration-300`}
          enterFrom={tw`opacity-0`}
          enterTo={tw`opacity-100`}
          leave={tw`transition-opacity ease-linear duration-300`}
          leaveFrom={tw`opacity-100`}
          leaveTo={tw`opacity-0`}
          aria-hidden="true"
        >
          <div tw="absolute inset-0 bg-gray-600 opacity-75" />
        </Transition.Child>

        {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
        <Transition.Child
          as={DialogContent}
          tw="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white m-0 px-0"
          enter={tw`transition ease-in-out duration-300 transform`}
          enterFrom={tw`-translate-x-full`}
          enterTo={tw`translate-x-0`}
          leave={tw`transition ease-in-out duration-300 transform`}
          leaveFrom={tw`translate-x-0`}
          leaveTo={tw`-translate-x-full`}
          aria-label={t("Layout.sidebar")}
        >
          <Transition.Child
            tw="absolute top-0 right-0 -mr-12 pt-2"
            enter={tw`transition-opacity ease-in-out duration-300`}
            enterFrom={tw`opacity-0`}
            enterTo={tw`opacity-100`}
            leave={tw`transition-opacity ease-in-out duration-300`}
            leaveFrom={tw`opacity-100`}
            leaveTo={tw`opacity-0`}
          >
            <CloseSidebarButton onClick={onDismiss} />
          </Transition.Child>
          {header}
          <div tw="mt-5 flex-1 h-0 overflow-y-auto">
            {/* Hide sidenav when a menu item is clicked */}
            <nav tw="px-2 space-y-1" onClick={onDismiss}>
              {children}
            </nav>
          </div>
        </Transition.Child>
        <div tw="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </DialogOverlay>
    </Transition>
  );
};

export const Sidebar = ({ isOpen, onDismiss, header, children }) => {
  return (
    <>
      {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
      <OffCanvasSidebar isOpen={isOpen} onDismiss={onDismiss} header={header} tw="md:hidden">
        {children}
      </OffCanvasSidebar>

      {/* Static sidebar for desktop */}
      <div tw="hidden md:flex md:flex-shrink-0">
        <div tw="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div tw="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
            {header}
            <div tw="mt-5 flex-grow flex flex-col">
              <nav tw="flex-1 px-2 bg-white space-y-1">{children}</nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
