import { Switch } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useTheme as useNextTheme } from "next-themes";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  return (
    <Switch
      color="primary"
      size="sm"
      isSelected={resolvedTheme === "dark" ? true : false}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
      startContent={<Sun />}
      endContent={<Moon />}
    />
  );
};
