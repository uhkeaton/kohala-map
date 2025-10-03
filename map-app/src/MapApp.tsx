import { useNavigate } from "react-router";
import { EsriMap } from "./EsriMap";
import { CloseButton } from "./ui/CloseButton";

export function MapApp() {
  const navigate = useNavigate();
  return (
    <div className="h-screen relative">
      <EsriMap />
      <div className="absolute top-0 left-0 z-10">
        <CloseButton
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}
