import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { doctors, site } from "@/lib/site";

/**
 * The home hero visual: the clinic's doctor schedule, drawn like the printed
 * board at the front desk. Built from `doctors` so it never drifts from the
 * doctors page.
 */
export function ScheduleBoard({ limit = 6 }: { limit?: number }) {
  return (
    <aside className="board" aria-labelledby="board-title">
      <div className="board__head">
        <div className="board__title">
          <span className="logo-mark" aria-hidden="true" />
          <div>
            <h2 id="board-title">Doctor schedule</h2>
            <p>Usual consultation times</p>
          </div>
        </div>
        <p className="board__open">
          Clinic hours
          <span className="time">{site.hours}</span>
        </p>
      </div>
      <ul className="board__rows">
        {doctors.slice(0, limit).map((doctor) => (
          <li key={doctor.registration}>
            <span className="board__who">
              <strong>{doctor.name}</strong>
              <span>{doctor.specialty}</span>
            </span>
            <span className="board__time time">{doctor.schedule}</span>
          </li>
        ))}
      </ul>
      <div className="board__foot">
        <span>Times can change. Call to confirm before you travel</span>
        <Link className="text-link" href="/doctors">
          All {doctors.length} doctors <ArrowUpRight size={16} />
        </Link>
      </div>
    </aside>
  );
}
