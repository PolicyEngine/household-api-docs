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
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${spacing.lg} ${spacing.xl}`,
            minHeight: '48px',
            height: 'auto',
            backgroundColor: colors.primary[500],
            color: colors.white,
            border: `2px solid ${colors.primary[500]}`,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.primary,
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'all 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary[600];
            e.currentTarget.style.borderColor = colors.primary[600];
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary[500];
            e.currentTarget.style.borderColor = colors.primary[500];
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Explore variables and parameters →
        </a>
      </div>
    </section>
  );
}
