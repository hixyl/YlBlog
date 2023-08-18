import Link from "next/link";
import css from "./tags.module.css";

export default function Tags({
  label,
  tags,
  href,
}: {
  label: string;
  tags: string[];
  href?: string;
}) {
  return (
    <div className={css.tags}>
      {tags && tags.length > 0 && <p className={css.label}>{label}</p>}
      {href &&
        tags.map((tag, index) => (
          <Link href={href + tag + '/1'} key={index}>
            <p className={`${css.tag} ${href ? css.tagLink : ""}`} key={index}>
              {tag}
            </p>
          </Link>
        ))}
      {!href &&
        tags.map((tag, index) => (
          <p className={`${css.tag} ${href ? css.tagLink : ""}`} key={index}>
            {tag}
          </p>
        ))}
    </div>
  );
}
