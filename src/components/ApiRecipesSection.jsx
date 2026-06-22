'use client';

import CodeBlock from './CodeBlock';
import { getApiRecipeExamples } from '@/utils/countryDocs';

export default function ApiRecipesSection({ country }) {
  const recipes = getApiRecipeExamples(country);

  if (recipes.length === 0) {
    return null;
  }

  return (
    <section id="calculation-recipes" className="border-b border-border-light bg-white py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-4 text-3xl font-bold text-text-primary">
          Checked calculation recipes
        </h2>
        <p className="mb-8 text-lg text-text-secondary">
          These request bodies and response excerpts are generated against the current household API model version.
        </p>

        <div className="space-y-8">
          {recipes.map((recipe) => (
            <article
              key={recipe.id}
              className="rounded-lg border border-border-light bg-bg-secondary p-5"
            >
              <h3 className="text-xl font-semibold text-text-primary">{recipe.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{recipe.body}</p>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <CodeBlock
                  code={recipe.requestCode}
                  language="json"
                  title="Request body"
                />
                <CodeBlock
                  code={recipe.responseCode}
                  language="json"
                  title="Response excerpt"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
