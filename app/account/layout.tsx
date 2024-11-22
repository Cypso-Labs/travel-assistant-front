import Image from "next/image";
import sideImage from "../../public/images/sun-rise.png";

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div>
        <Image src={sideImage} alt="sun rise image" />
      </div>

      <div className="flex-grow">{children}</div>
    </div>
  );
}
