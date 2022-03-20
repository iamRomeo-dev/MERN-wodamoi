/** @jsxImportSource @emotion/react */
import { ClassNames } from "@emotion/react";
import { Transition as HeadlessTransition } from "@headlessui/react";

export const Transition = ({ enter, enterFrom, enterTo, leave, leaveFrom, leaveTo, ...props }) => {
  return (
    <ClassNames>
      {({ css }) => (
        <HeadlessTransition
          enter={enter && css(enter)}
          enterFrom={enterFrom && css(enterFrom)}
          enterTo={enterTo && css(enterTo)}
          leave={leave && css(leave)}
          leaveFrom={leaveFrom && css(leaveFrom)}
          leaveTo={leaveTo && css(leaveTo)}
          {...props}
        />
      )}
    </ClassNames>
  );
};

Transition.Child = ({ enter, enterFrom, enterTo, leave, leaveFrom, leaveTo, ...props }) => {
  return (
    <ClassNames>
      {({ css }) => (
        <HeadlessTransition.Child
          enter={enter && css(enter)}
          enterFrom={enterFrom && css(enterFrom)}
          enterTo={enterTo && css(enterTo)}
          leave={leave && css(leave)}
          leaveFrom={leaveFrom && css(leaveFrom)}
          leaveTo={leaveTo && css(leaveTo)}
          {...props}
        />
      )}
    </ClassNames>
  );
};
