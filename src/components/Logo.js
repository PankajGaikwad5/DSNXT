import Image from "next/image";
import { LOGO } from "@/data/site";

/** The Design Next logo. `tone` is the logo colour: "white" for dark backgrounds. Size it with a height class. */
export default function Logo({ tone = "white", className = "h-6 w-auto", priority = false }) {
  return (
    <Image
      src={LOGO[tone]}
      alt="Design Next"
      width={678}
      height={126}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
