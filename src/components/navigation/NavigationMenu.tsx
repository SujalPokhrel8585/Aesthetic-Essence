import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuPositioner } from "./NavigationMenuPositioner";

function NavigationMenu({
  align = "start",
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.Root>
  );
}

export { NavigationMenu };
export { NavigationMenuList } from "./NavigationMenuList";
export { NavigationMenuItem } from "./NavigationMenuItem";
export {
  NavigationMenuTrigger,
  // eslint-disable-next-line react-refresh/only-export-components
  navigationMenuTriggerStyle,
} from "./NavigationMenuTrigger";
export { NavigationMenuContent } from "./NavigationMenuContent";
export { NavigationMenuPositioner } from "./NavigationMenuPositioner";
export { NavigationMenuLink } from "./NavigationMenuLink";
export { NavigationMenuIndicator } from "./NavigationMenuIndicator";
