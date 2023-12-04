import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <div className="bg-neutral-200 ">
      <Meta />
      <div className="min-h-screen  text-neutral-600">
        <Alert preview={preview} />
        <main className="">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
