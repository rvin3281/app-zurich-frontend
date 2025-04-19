import Image from "next/image";

interface ImageElementProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  parentClassName?: string;
}

export default function ImageElement({
  src,
  alt,
  width,
  height,
  parentClassName,
}: ImageElementProps) {
  return (
    <Image
      src={src}
      className={`${parentClassName}`}
      alt={`${alt}`}
      width={width}
      height={height}
    />
  );
}
