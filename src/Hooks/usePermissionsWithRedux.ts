/* eslint-disable no-restricted-syntax */
import { useState } from "react";
import { useSelector } from "react-redux";
import { SelectorCallbackType } from "../types";

function usePermissionsWithRedux(selector: SelectorCallbackType) {
  const permissions = useSelector(selector);
  const [state] = useState(permissions);

  function hasAll(permissionsKey: string | string[]): boolean {
    const arrayPermissions = Array.isArray(permissionsKey)
      ? permissionsKey
      : permissionsKey.split("|");
    const includedPermissions: string[] = [];
    if (state && state.length > 0) {
      for (const permission of arrayPermissions) {
        if (state.includes(permission)) {
          includedPermissions.push(permission);
        }
      }
    }
    return includedPermissions.length === arrayPermissions.length;
  }

  function hasAny(permissionsKey: string | string[]): boolean {
    const arrayPermissions = Array.isArray(permissionsKey)
      ? permissionsKey
      : permissionsKey.split("|");
    if (state && state.length > 0) {
      for (const permission of arrayPermissions) {
        if (state.includes(permission)) {
          return true;
        }
      }
    }
    return false;
  }

  function doesNotHaveAll(permissionsKey: string | string[]): boolean {
    const arrayPermissions = Array.isArray(permissionsKey)
      ? permissionsKey
      : permissionsKey.split("|");
    const includedPermissions: string[] = [];
    if (state && state.length > 0) {
      for (const permission of arrayPermissions) {
        if (!state.includes(permission)) {
          includedPermissions.push(permission);
        }
      }
    }
    return includedPermissions.length === arrayPermissions.length;
  }

  function doesNotHaveAny(permissionsKey: string | string[]): boolean {
    const arrayPermissions = Array.isArray(permissionsKey)
      ? permissionsKey
      : permissionsKey.split("|");
    if (state && state.length > 0) {
      for (const permission of arrayPermissions) {
        if (!state.includes(permission)) {
          return true;
        }
      }
    }
    return false;
  }

  return { hasAny, hasAll, doesNotHaveAny, doesNotHaveAll };
}

export default usePermissionsWithRedux;
