export function isScrolledToBottom(): boolean {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  return scrollTop + windowHeight >= documentHeight;
}
