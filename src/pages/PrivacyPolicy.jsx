import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <section className="pt-32 pb-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-red/10 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-brand-red/10 rounded-full mb-6 border border-brand-red/20">
                <Shield className="text-brand-red" size={32} />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">PRIVACY <span className="text-brand-red">POLICY</span></h1>
            <p className="text-gray-400 text-lg">Last Updated: October 24, 2024</p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed font-light">
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
                <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-brand-red"></span> 1. INTRODUCTION
                </h2>
                <p className="mb-4">
                    Welcome to RBX ESPORTS ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at legal@rbxesports.com.
                </p>
                <p>
                    When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
                <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-brand-red"></span> 2. INFORMATION WE COLLECT
                </h2>
                <p className="mb-4">We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website (such as by posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                    <li><strong className="text-white">Personal Data:</strong> Name, email address, postal address, phone number, and other similar contact data.</li>
                    <li><strong className="text-white">Credentials:</strong> Passwords, password hints, and similar security information used for authentication and account access.</li>
                    <li><strong className="text-white">Payment Data:</strong> Data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument.</li>
                </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
                <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-brand-red"></span> 3. HOW WE USE YOUR INFORMATION
                </h2>
                <p className="mb-4">We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-black/40 p-6 border border-white/5">
                        <Lock className="text-brand-red mb-3" />
                        <h3 className="text-white font-bold uppercase mb-2">Account Management</h3>
                        <p className="text-sm">To facilitate account creation and logon process and manage user accounts.</p>
                    </div>
                    <div className="bg-black/40 p-6 border border-white/5">
                        <Eye className="text-brand-red mb-3" />
                        <h3 className="text-white font-bold uppercase mb-2">Improve Experience</h3>
                        <p className="text-sm">To send you administrative information and improve your user experience.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
                <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-brand-red"></span> 4. CONTACT US
                </h2>
                <p>If you have questions or comments about this policy, you may email us at support@rbxesports.com or by post to:</p>
                <address className="mt-4 not-italic text-gray-400 border-l-2 border-brand-red pl-4">
                    RBX ESPORTS HQ<br />
                    123 Gaming Blvd, Suite 101<br />
                    Los Angeles, CA 90015<br />
                    United States
                </address>
            </div>
        </div>
      </div>
    </section>
  );
};