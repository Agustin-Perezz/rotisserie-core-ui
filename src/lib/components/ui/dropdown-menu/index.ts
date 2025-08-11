import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import Content from './dropdown-menu-content.svelte';
import Group from './dropdown-menu-group.svelte';
import Item from './dropdown-menu-item.svelte';
import Label from './dropdown-menu-label.svelte';
import Separator from './dropdown-menu-separator.svelte';
import Trigger from './dropdown-menu-trigger.svelte';
const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;

export {
  Content,
  Root as DropdownMenu,
  Group as DropdownMenuGroup,
  Separator as DropdownMenuSeparator,
  Trigger as DropdownMenuTrigger,
  Group,
  Item,
  Label,
  Root,
  Separator,
  Sub,
  Trigger
};
