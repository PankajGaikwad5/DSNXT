import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function SiteLayout({ children }) {
  return (
    <div className="grain">
      <Nav />
      <main>{children}</main>
      <Footer />
      <Cursor />
    </div>
  );
}
