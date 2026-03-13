const DATOCMS_API_URL = 'https://graphql.datocms.com/';

interface DatoCMSRequestOptions {
  query: string;
  variables?: Record<string, unknown>;
  includeDrafts?: boolean;
}

export async function datocmsRequest<T = unknown>({
  query,
  variables = {},
  includeDrafts = false,
}: DatoCMSRequestOptions): Promise<T> {
  const token =
    process.env.DATOCMS_API_TOKEN || 'df33316b1e272f5a8a25cab6746eec';

  if (!token) {
    throw new Error('DATOCMS_API_TOKEN is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }

  const response = await fetch(DATOCMS_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(
      `DatoCMS request failed: ${response.status} ${response.statusText}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`DatoCMS GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}
