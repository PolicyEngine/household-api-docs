'use client';

import { colors, typography, spacing } from '@policyengine/design-system/tokens';

export default function ModelLink() {
  return (
    <section style={{ padding: `${spacing['5xl']} 0` }}>
      <div
        style={{
          maxWidth: '896px',
          margin: '0 auto',
          padding: `0 ${spacing['2xl']}`,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.bold,
            fontFamily: typography.fontFamily.primary,
            color: colors.text.primary,
            marginBottom: spacing.lg,
          }}
        >
          Variables and parameters
        </h2>
        <p
          style={{
            fontSize: typography.fontSize.lg,
            fontFamily: typography.fontFamily.primary,
            color: colors.text.secondary,
            marginBottom: spacing['3xl'],
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          Use variable names as keys in your household object, and parameter
          names to explore the policy rules that drive the simulation. Browse the
          full list in the model explorer.
        </p>
        <a
          href="https://policyengine.org/us/model"
          style={{
            display: 'inline-block',
            padding: `${spacing.md} ${spacing['3xl']}`,
            backgroundColor: colors.primary[600],
            color: colors.text.inverse,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.primary,
            borderRadius: spacing.radius.lg,
            textDecoration: 'none',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary[700];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary[600];
          }}
        >
          Explore variables and parameters →
        </a>
      </div>
    </section>
  );
}
