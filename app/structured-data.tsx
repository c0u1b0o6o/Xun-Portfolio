export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://xun-portfolio.vercel.app';
  
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Xun',
    url: baseUrl,
    sameAs: [
      'https://github.com/c0u1b0o6o', // 添加你的 GitHub 鏈接
      "https://instagram.com/mengshin.06",
    ],
    jobTitle: 'Frontend Developer & Computer Science Student',
    worksFor: {
      '@type': 'CollegeOrUniversity',
      name: 'National Taiwan University Science and Technology',
      address: 'Taiwan',
    },
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'English',
      },
      {
        '@type': 'Language',
        name: 'Chinese',
      },
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Frontend Development',
      'Web Development',
      'Python',
    ],
    description: 'Frontend developer and Computer Science student at National Taiwan University, specializing in Next.js, Tailwind CSS, and TypeScript.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Xun's Portfolio",
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
