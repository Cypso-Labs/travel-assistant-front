import Image from "next/image";
import sideImage from "../../public/images/sun-rise.png";

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-lg:items-center max-lg:justify-center">
      <div>
        <Image src={sideImage} alt="sun rise image" />
      </div>

      <div className="flex-grow max-lg:absolute w-full">{children}</div>
    </div>
  );
}
