import { useEffect } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getLayers } from "./api";

export function App() {
  const query = useQuery({ queryKey: ["layers"], queryFn: getLayers });

  useEffect(() => {
    console.log(query.data);
  }, [query.data]);

  return <div>Map App</div>;
}
