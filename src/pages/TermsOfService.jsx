import React from "react";
import { FileText, AlertTriangle, CheckCircle } from "lucide-react";

export const TermsOfService = () => {
  return (
    <section className="pt-32 pb-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-brand-red/10 rounded-full mb-6 border border-brand-red/20">
            <FileText className="text-brand-red" size={32} />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
            TERMS OF <span className="text-brand-red">SERVICE</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Effective Date: October 24, 2024
          </p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed font-light">
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-brand-red"></span> 1. AGREEMENT TO
              TERMS
            </h2>
            <p>
              These Terms of Service constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity ("you")
              and RBX ESPORTS ("we," "us" or "our"), concerning your access to
              and use of the RBX ESPORTS website as well as any other media
              form, media channel, mobile website or mobile application related,
              linked, or otherwise connected thereto (collectively, the "Site").
            </p>
            <p className="mt-4 p-4 bg-brand-red/10 border border-brand-red/20 text-brand-red/90 text-sm font-bold uppercase tracking-wide flex items-start gap-2">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              By accessing the Site, you agree that you have read, understood,
              and agreed to be bound by all of these Terms of Service.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-brand-red"></span> 2. INTELLECTUAL
              PROPERTY RIGHTS
            </h2>
            <p className="mb-4">
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics on the Site
              (collectively, the "Content") and the trademarks, service marks,
              and logos contained therein (the "Marks") are owned or controlled
              by us or licensed to us, and are protected by copyright and
              trademark laws.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <CheckCircle size={16} className="text-brand-red" />
                <span>
                  You are granted a limited license to access and use the Site.
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <CheckCircle size={16} className="text-brand-red" />
                <span>
                  No part of the Site may be copied, reproduced, or republished
                  without express written consent.
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-brand-red"></span> 3. USER
              REPRESENTATIONS
            </h2>
            <p className="mb-4">
              By using the Site, you represent and warrant that:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-400">
              <li>
                All registration information you submit will be true, accurate,
                current, and complete.
              </li>
              <li>
                You will maintain the accuracy of such information and promptly
                update such registration information as necessary.
              </li>
              <li>
                You have the legal capacity and you agree to comply with these
                Terms of Service.
              </li>
              <li>
                You are not a minor in the jurisdiction in which you reside, or
                if a minor, you have received parental permission to use the
                Site.
              </li>
            </ol>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-brand-red"></span> 4. GOVERNING LAW
            </h2>
            <p>
              These Terms shall be governed by and defined following the laws of
              the United States. RBX ESPORTS and yourself irrevocably consent
              that the courts of California shall have exclusive jurisdiction to
              resolve any dispute which may arise in connection with these
              terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
