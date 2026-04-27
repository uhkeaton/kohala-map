import { Button } from "@mui/material";
import { IconHome } from "./icons";
import { useGlobal } from "./useGlobal";

export function ButtonHome() {
  const { goTo, setDisplaySettings } = useGlobal();

  return (
    <div className="flex w-full mb-6">
      <Button
        className="flex gap-2"
        fullWidth
        variant="outlined"
        onClick={() => {
          setDisplaySettings((s) => ({ ...s, showMainDrawer: false }));
          goTo("welcome");
        }}
      >
        <IconHome className="w-8" />
        Home
      </Button>
    </div>
  );
}
