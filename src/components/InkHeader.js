import InkField from "./InkField";

/** Paper page header with live ink drifting on the right. */
export default function InkHeader({ children, className = "pb-20 pt-40 md:pb-28 md:pt-52" }) {
  return (
    <section data-snap className="relative overflow-hidden bg-paper text-ink">
      <InkField intensity="calm" zone={[0.62, 0.95, 0.4, 0.95]} />
      <div className={`wrap pointer-events-none relative [&_a]:pointer-events-auto ${className}`}>{children}</div>
    </section>
  );
}
