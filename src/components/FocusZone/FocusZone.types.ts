import * as React from "react";
import { FocusZone } from "./FocusZone";
import { IRefObject } from "../../Utilities";

/**
 * FocusZone component props.
 */
export interface IFocusZoneProps
  extends React.HTMLAttributes<HTMLElement | FocusZone> {
  elementType?: keyof React.ReactHTML;
}
