import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { PageTransition } from '@/components/ui/PageTransition';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-label' });

export const metadata: Metadata = {
  title: 'Meet Upadhyay | Senior Software Engineer',
  description: 'Senior Software Engineer specializing in Generative AI, LangGraph, RAG Pipelines, and scalable backend systems. Building production-grade AI platforms at scale.',
  keywords: ['Meet Upadhyay', 'Senior Software Engineer', 'AI Engineer', 'LangGraph', 'RAG', 'FastAPI', 'Python', 'Generative AI'],
  authors: [{ name: 'Meet Upadhyay', url: 'https://github.com/meet-m-upadhyay' }],
  openGraph: {
    type: 'website',
    title: 'Meet Upadhyay | Senior Software Engineer',
    description: 'Building production-grade Generative AI platforms, multi-agent orchestration systems, and scalable backend architectures.',
    siteName: 'Meet Upadhyay Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Upadhyay | Senior Software Engineer',
    description: 'Building production-grade Generative AI platforms, multi-agent orchestration systems, and scalable backend architectures.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable} scroll-smooth`}>
      <body className="font-body bg-background text-on-surface antialiased pt-0 md:pt-20 pb-24 md:pb-0 overflow-x-hidden">
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
        <div id="modal-root" />
      </body>
    </html>
  );
}
