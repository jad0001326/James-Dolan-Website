import Image from "next/image";

export function LogoMark({ src, width, height }: { src: string; width: number; height: number }) {
  return (
    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5">
      <Image src={src} alt="" width={width} height={height} className="max-h-12 w-auto object-contain" />
    </span>
  );
}
