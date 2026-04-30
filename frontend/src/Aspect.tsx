export function Aspect({
  children,
  ratioX,
  ratioY,
}: {
  children: React.ReactNode;
  ratioX: number;
  ratioY: number;
}) {
  return (
    <div
      className="relative w-full before:block before:content-[''] before:pt-[var(--aspect-pt)]"
      style={
        { "--aspect-pt": `${(ratioY / ratioX) * 100}%` } as React.CSSProperties
      }
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
