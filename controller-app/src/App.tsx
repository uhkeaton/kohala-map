import { useEffect } from "react";
import "./App.css";
import { getLayers } from "./api";
import { useQuery } from "@tanstack/react-query";

export function App() {
  const query = useQuery({ queryKey: ["layers"], queryFn: getLayers });

  useEffect(() => {
    console.log(query.data);
  }, [query.data]);

  return <div>Controller App</div>;
}

