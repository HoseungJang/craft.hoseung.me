export function scrollLock() {
  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0px";
  document.body.style.right = "0px";
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("left");
    document.body.style.removeProperty("right");
    document.body.style.removeProperty("overflow");
    window.scrollTo({ top: scrollY });
  };
}
