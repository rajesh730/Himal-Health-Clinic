import { site } from "@/lib/site";

export function PageSchema({ title, description, path, label }: {
  title: string;
  description: string;
  path: string;
  label: string;
}) {
  const url = `${site.url}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en-NP",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#clinic` },
        breadcrumb: { "@id": `${url}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: label, item: url },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
