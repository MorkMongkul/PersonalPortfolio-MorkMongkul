import { contactInfo } from "@/lib/constants";
import { trackExternalLink, trackContactInteraction } from "@/lib/analytics";

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      data-scroll-section
      className="relative w-full bg-[#E8E9F3] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left: Intro + contact info */}
          <div data-scroll data-scroll-speed="0.6" className="space-y-6">
            <p className="text-sm font-semibold tracking-[0.25em] text-primary uppercase">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Let&apos;s build something together.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl">
              Whether you have a project in mind, a question about my work, or just want to say hi,
              feel free to drop a message. I&apos;ll get back to you as soon as I can.
            </p>

            <div className="space-y-3 text-gray-700">
              <p className="font-medium">Email</p>
              <a
                href={`mailto:${contactInfo.email}`}
                onClick={() => trackContactInteraction('email_click')}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <span>{contactInfo.email}</span>
              </a>
            </div>

            <div className="space-y-3 text-gray-700">
              <p className="font-medium">Connect</p>
              <div className="flex gap-4">
                <a
                  href={contactInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink(contactInfo.telegram, 'Telegram')}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all shadow-md"
                  aria-label="Telegram"
                >
                  <i className="fa-brands fa-telegram text-xl"></i>
                </a>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink(contactInfo.linkedin, 'LinkedIn')}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all shadow-md"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in text-xl"></i>
                </a>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink(contactInfo.github, 'GitHub')}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-[#333] hover:text-white transition-all shadow-md"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
