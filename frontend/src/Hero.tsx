export function Hero({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hero"></div>
      <div className="backdrop"></div>
      {children}
    </>
  );
}
