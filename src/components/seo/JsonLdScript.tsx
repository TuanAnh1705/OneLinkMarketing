interface JsonLdScriptProps {
  /** The `seoSchemaJsonld` JSON field coming from a Strapi page. */
  data: Record<string, unknown> | null | undefined;
}

/**
 * Renders a page's structured data (Strapi `seoSchemaJsonld`) as a
 * <script type="application/ld+json">. Renders nothing when empty, so it's safe
 * to drop on every page even before the field is filled in Strapi.
 */
export default function JsonLdScript({ data }: JsonLdScriptProps) {
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
