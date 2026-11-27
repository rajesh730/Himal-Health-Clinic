import { trustPoints } from "@/lib/site";

export function TrustPoints() {
  return (
    <ul className="trust-list">
      {trustPoints.map(({ icon: Icon, title, text }) => (
        <li className="trust-item" key={title}>
          <Icon size={18} aria-hidden="true" />
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
