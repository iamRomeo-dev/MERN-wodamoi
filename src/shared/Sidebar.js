/** @jsxImportSource @emotion/react */
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import tw from "twin.macro";
import { MenuAlt2OutlineIcon, XOutlineIcon } from "./Icons";
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
    <header tw="flex-shrink-0 flex items-center px-4">
      <svg tw="h-8 w-auto" fill="none" viewBox="0 0 143 32" xmlns="http://www.w3.org/2000/svg">
        <title>Workflow</title>
        <path
          tw="fill-current text-primary-600"
          d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z"
        />
        <path
          tw="fill-current text-primary-600"
          d="M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
        />
        <path
          tw="fill-current text-gray-800"
          d="M58.664 11.136l-2.04 7.392-2.184-7.392h-2.928l-2.184 7.368-2.04-7.368H44l3.816 12h2.952l2.208-7.272 2.208 7.272h2.952l3.816-12h-3.288zM68.864 23.472c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312zM80.498 13.2v-2.064h-3.096v12h3.096V17.4c0-2.52 2.04-3.24 3.648-3.048v-3.456c-1.512 0-3.024.672-3.648 2.304zM97.02 23.136l-4.967-6.072 4.824-5.928H93.18l-4.128 5.28V6.336h-3.096v16.8h3.096v-5.448l4.368 5.448h3.6zM105.022 6c-3.816 0-5.64 1.704-5.64 5.016v.12h-1.728v2.976h1.728v9.024h3.096v-9.024h1.992v-2.976h-1.992v-.12c0-1.632.936-2.304 2.544-2.304.312 0 .648 0 .984.024v14.4h3.096V6.504c-1.32-.264-2.568-.504-4.08-.504zM117.637 23.472c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312zM139.219 11.136l-2.04 7.392-2.184-7.392h-2.928l-2.184 7.368-2.04-7.368h-3.288l3.816 12h2.952l2.208-7.272 2.208 7.272h2.952l3.816-12h-3.288z"
        />
      </svg>
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
