import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';

builder.init('562681def2724eb49b12ab3b02e054d2'); 
export default function BuilderWrapper() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    builder
      .get('page', { url: window.location.pathname })
      .toPromise()
      .then(setContent);
  }, []);

  return content ? (
    <BuilderComponent model="page" content={content} />
  ) : (
    <div>Loading Builder Content...</div>
  );
}
