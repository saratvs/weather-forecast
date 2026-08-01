export function createNavbar() {
  let nav = document.createElement("nav");

  nav.innerHTML = `
    <ul class="bg-amber-100 p-4 flex flex-row gap-x-2">
    <li>Home</li>
    <li>Contact</li>
    <li>Home</li>
    </ul>
`;
  return nav;
}
