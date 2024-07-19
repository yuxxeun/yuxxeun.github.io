import ReactLenis from "@studio-freight/react-lenis";

function SmoothScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactLenis root>{children}</ReactLenis>;
}

export default SmoothScroll;
