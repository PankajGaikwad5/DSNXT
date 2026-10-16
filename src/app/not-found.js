import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-svh flex-col justify-center">
      <p className="t-label mb-8 text-mute">Error 404</p>
      <h1 className="t-mega">
        Lost<span className="serif text-signal">?</span>
      </h1>
      <p className="t-lead mt-8 max-w-md text-mute">This page doesn&apos;t exist, but your new website could.</p>
      <Link href="/" className="mt-12 w-fit rounded-full bg-paper px-7 py-4 text-ink hover:bg-signal hover:text-white">
        Back to home
      </Link>
    </main>
  );
}
