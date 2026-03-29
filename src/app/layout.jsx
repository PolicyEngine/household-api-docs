import './globals.css';

export const metadata = {
  title: 'PolicyEngine household API documentation',
  description: 'Documentation for the PolicyEngine household API.',
  icons: {
    icon: 'https://www.policyengine.org/favicon.ico',
    apple: 'https://www.policyengine.org/assets/logos/policyengine/policyengine.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2YHG89FY0N"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2YHG89FY0N');
            `,
          }}
        />
        <script defer src="/_vercel/insights/script.js" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
