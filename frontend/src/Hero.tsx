import cx from "classnames";

export function Hero({
  children,
  imageSrc,
  backdropClass,
}: {
  children: React.ReactNode;
  imageSrc: string;
  backdropClass?: string;
}) {
  return (
    <>
      <div className="hero" style={{ backgroundImage: `url(${imageSrc})` }} />
      <div className={cx("backdrop", backdropClass)} />
      <div className="absolute inset-0">
        <div className="relative w-full h-full">{children}</div>
      </div>
    </>
  );
}
