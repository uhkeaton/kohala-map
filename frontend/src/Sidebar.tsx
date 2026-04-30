import cx from "classnames";
import { useGlobal } from "./useGlobal";
import { FeatureEditSidebar } from "./FeatureEditSidebar";

function Sidebar() {
  return (
    <div className={"bg-[#3d3d3d] w-full h-full"}>
      <FeatureEditSidebar />
    </div>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { isEditingRow } = useGlobal();
  const isOpen = isEditingRow
  return (
    <div className={cx("w-screen h-screen flex")}>
      <div className={cx("flex-1")}>{children}</div>
      <div
        className={cx("w-96 h-dvh border", {
          hidden: !isOpen,
          block: isOpen,
        })}
      >
        <Sidebar />
      </div>
    </div>
  );
}
