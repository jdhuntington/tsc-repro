import * as React from "react";
import {
  FocusZoneDirection,
  FocusZoneTabbableElements,
  IFocusZone,
  IFocusZoneProps
} from "./FocusZone.types";
import {
  BaseComponent,
  EventGroup,
  KeyCodes,
  css,
  htmlElementProperties,
  elementContains,
  getDocument,
  getElementIndexPath,
  getFocusableByIndexPath,
  getId,
  getNextElement,
  getNativeProps,
  getParent,
  getPreviousElement,
  getRTL,
  isElementFocusZone,
  isElementFocusSubZone,
  isElementTabbable,
  shouldWrapFocus
} from "../../Utilities";

export class FocusZone extends BaseComponent<IFocusZoneProps, {}>
  implements IFocusZone {
  public static defaultProps: IFocusZoneProps = {
    isCircularNavigation: false,
    direction: FocusZoneDirection.bidirectional
  };


  public render() {
    const {
      rootProps,
      ariaDescribedBy,
      ariaLabelledBy,
      className
    } = this.props;
    const divProps = getNativeProps(this.props, htmlElementProperties);

    const Tag = this.props.elementType || "div";

    // Note, right before rendering/reconciling proceeds, we need to record if focus
    // was in the zone before the update. This helper will track this and, if focus
    // was actually in the zone, what the index path to the element is at this time.
    // Then, later in componentDidUpdate, we can evaluate if we need to restore it in
    // the case the element was removed.
    this._evaluateFocusBeforeRender();

    return (
      <Tag
        role="presentation"
        {...divProps}
        {
          // root props has been deprecated and should get removed.
          // it needs to be marked as "any" since root props expects a div element, but really Tag can
          // be any native element so typescript rightly flags this as a problem.
          ...rootProps as any
        }
        className={css("ms-FocusZone", className)}
        ref={this._root}
        data-focuszone-id={this._id}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        onKeyDown={this._onKeyDown}
        onFocus={this._onFocus}
        onMouseDownCapture={this._onMouseDown}
      >
        {this.props.children}
      </Tag>
    );
  }

}
