import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  FiArrowLeft, 
  FiCamera, 
  FiCompass, 
  FiShield, 
  FiZap, 
  FiWifi, 
  FiLock, 
  FiMail, 
  FiCheckCircle, 
  FiExternalLink,
  FiAlertCircle
} from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Privacy Policy - OmniLevel: AR Laser Level',
  description:
    'Privacy Policy for OmniLevel: AR Laser Level (Android mobile app). Learn how device permissions such as camera and sensors are handled purely on-device with zero personal data collection.',
  alternates: {
    canonical: 'https://www.khaledbinaziz.com/omnilevel/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OmniLevelPrivacyPolicy() {
  const lastUpdated = 'October 24, 2026';

  return (
    <div className="min-h-screen bg-[#08090d] text-[#f1f3f7] antialiased selection:bg-[#a78bfa]/30 selection:text-white">
      {/* Background ambient gradient glow */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#7dd3fc]/10 blur-3xl" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#a78bfa]/10 blur-3xl" />
      </div>

      <header className="relative border-b border-white/[0.06] bg-[#0d0f15]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#9499ad] hover:text-white transition-colors"
          >
            <FiArrowLeft className="text-base" />
            <span>Khaled Bin Aziz Portfolio</span>
          </Link>
          <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-[#5eead4]/30 bg-[#5eead4]/10 text-[#5eead4]">
            Android App Policy
          </span>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Title & Meta Header */}
        <div className="mb-10 pb-8 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-mono text-[#a78bfa] uppercase tracking-wider px-2.5 py-1 rounded bg-[#a78bfa]/10 border border-[#a78bfa]/20">
              OmniLevel: AR Laser Level
            </span>
            <span className="text-xs font-mono text-[#9499ad] px-2.5 py-1 rounded bg-white/[0.04]">
              Package: com.omnilevel.precision.app
            </span>
            <span className="text-xs font-mono text-[#9499ad] px-2.5 py-1 rounded bg-white/[0.04]">
              Version: 1.0.0
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[#9499ad]">
            Last updated &amp; effective date: <span className="text-white font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Executive Summary Card */}
        <section className="mb-12 p-6 sm:p-8 rounded-2xl bg-[#11131c] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#7dd3fc] via-[#5eead4] to-[#a78bfa]" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#5eead4]/10 text-[#5eead4] shrink-0 mt-1">
              <FiShield className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Privacy-First Architecture
              </h2>
              <p className="text-[#9499ad] text-sm sm:text-base leading-relaxed">
                <strong className="text-white">OmniLevel: AR Laser Level</strong> (&quot;OmniLevel&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), developed by <strong className="text-white">Khaled Bin Aziz</strong>, is built from the ground up as a standalone mobile utility tool. 
                We do <strong className="text-white">not</strong> require account registration, do <strong className="text-white">not</strong> collect personal information (such as your name, email, phone number, contacts, or photos), and do <strong className="text-white">not</strong> store or sell user data.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Body */}
        <div className="space-y-12 text-[#f1f3f7] leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-sm font-mono text-[#7dd3fc]">01.</span>
              <span>Information We Do Not Collect</span>
            </h2>
            <p className="text-[#9499ad] mb-4">
              Unlike many apps, OmniLevel does not operate user accounts, social log-ins, or remote user profiles. We never collect or request:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                'No Names, Email addresses or Phone numbers',
                'No User accounts or Passwords',
                'No Contacts or Address books',
                'No Stored Photos, Videos or Audio recordings',
                'No Precise GPS or Physical Location coordinates',
                'No Financial or Payment card information',
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-sm text-[#9499ad]"
                >
                  <FiCheckCircle className="text-[#5eead4] shrink-0 text-base" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-sm font-mono text-[#7dd3fc]">02.</span>
              <span>Device Hardware Permissions &amp; Data Handling</span>
            </h2>
            <p className="text-[#9499ad] mb-6">
              To function as an augmented reality laser level and surface inclination tool, OmniLevel requests specific device hardware permissions. Below is a detailed, transparent explanation of each permission:
            </p>

            <div className="space-y-4">
              {/* Camera */}
              <div className="p-5 rounded-xl bg-[#11131c] border border-white/[0.06]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#a78bfa]/10 text-[#a78bfa]">
                      <FiCamera className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Camera Access</h3>
                      <p className="text-xs font-mono text-[#9499ad]">android.permission.CAMERA</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#5eead4] bg-[#5eead4]/10 border border-[#5eead4]/20 px-2 py-0.5 rounded">
                    Real-Time Only
                  </span>
                </div>
                <p className="text-sm text-[#9499ad] leading-relaxed">
                  <strong className="text-white">Purpose:</strong> Used solely to display a live camera preview within the app, allowing the user to project virtual AR laser leveling lines, crosshairs, and angular grids onto real-world objects and walls.
                </p>
                <p className="text-sm text-[#9499ad] leading-relaxed mt-2">
                  <strong className="text-white">Data Protection:</strong> Camera frames are processed strictly in volatile device memory (RAM) in real-time. OmniLevel <strong className="text-white">never</strong> saves images or video, does <strong className="text-white">not</strong> perform facial recognition or biometric analysis, and <strong className="text-white">never transmits</strong> any camera feed over the Internet.
                </p>
              </div>

              {/* Motion Sensors */}
              <div className="p-5 rounded-xl bg-[#11131c] border border-white/[0.06]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#7dd3fc]/10 text-[#7dd3fc]">
                      <FiCompass className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Motion Sensors (Accelerometer &amp; Gyroscope)</h3>
                      <p className="text-xs font-mono text-[#9499ad]">Device Motion &amp; Orientation Telemetry</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#5eead4] bg-[#5eead4]/10 border border-[#5eead4]/20 px-2 py-0.5 rounded">
                    On-Device Processing
                  </span>
                </div>
                <p className="text-sm text-[#9499ad] leading-relaxed">
                  <strong className="text-white">Purpose:</strong> Used to compute the physical angle, pitch, roll, and surface alignment of your phone in real time.
                </p>
                <p className="text-sm text-[#9499ad] leading-relaxed mt-2">
                  <strong className="text-white">Data Protection:</strong> All sensor readings are evaluated entirely on your phone. Motion sensor data is never recorded, logged, or sent to external servers.
                </p>
              </div>

              {/* Haptics & Vibration */}
              <div className="p-5 rounded-xl bg-[#11131c] border border-white/[0.06]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#5eead4]/10 text-[#5eead4]">
                      <FiZap className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Vibration / Haptic Feedback</h3>
                      <p className="text-xs font-mono text-[#9499ad]">android.permission.VIBRATE</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#9499ad] bg-white/[0.05] px-2 py-0.5 rounded">
                    Tactile UX
                  </span>
                </div>
                <p className="text-sm text-[#9499ad] leading-relaxed">
                  <strong className="text-white">Purpose:</strong> Provides brief haptic feedback pulses when the phone reaches level (0° / 90°) or hits a targeted angle. No user data is gathered.
                </p>
              </div>

              {/* Flashlight */}
              <div className="p-5 rounded-xl bg-[#11131c] border border-white/[0.06]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#fcd34d]/10 text-[#fcd34d]">
                      <FiLock className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Flashlight / Torch</h3>
                      <p className="text-xs font-mono text-[#9499ad]">android.permission.FLASHLIGHT</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#9499ad] bg-white/[0.05] px-2 py-0.5 rounded">
                    Hardware Control
                  </span>
                </div>
                <p className="text-sm text-[#9499ad] leading-relaxed">
                  <strong className="text-white">Purpose:</strong> Allows you to toggle the rear camera LED torch to illuminate low-light work surfaces while measuring.
                </p>
              </div>

              {/* Internet & Network */}
              <div className="p-5 rounded-xl bg-[#11131c] border border-white/[0.06]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#fda4af]/10 text-[#fda4af]">
                      <FiWifi className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Internet &amp; Network State</h3>
                      <p className="text-xs font-mono text-[#9499ad]">android.permission.INTERNET &amp; ACCESS_NETWORK_STATE</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#9499ad] bg-white/[0.05] px-2 py-0.5 rounded">
                    Advertising &amp; Analytics
                  </span>
                </div>
                <p className="text-sm text-[#9499ad] leading-relaxed">
                  <strong className="text-white">Purpose:</strong> Required to verify network connectivity and load digital advertisements provided by third-party ad networks (Google AdMob).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-sm font-mono text-[#7dd3fc]">03.</span>
              <span>Third-Party Services &amp; Advertising</span>
            </h2>
            <p className="text-[#9499ad] mb-4">
              To keep the core features of OmniLevel free for users, we integrate Google AdMob to deliver advertisements. 
              These third-party services may collect certain device-level information in accordance with their respective privacy policies:
            </p>

            <div className="p-5 rounded-xl bg-[#11131c] border border-white/[0.06] space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Google Mobile Ads (AdMob) &amp; Google Play Services</h3>
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#7dd3fc] hover:underline"
                >
                  <span>Google Privacy Policy</span>
                  <FiExternalLink className="text-xs" />
                </a>
              </div>
              <p className="text-sm text-[#9499ad] leading-relaxed">
                AdMob may process advertising identifiers (such as the Google Advertising ID / AAID), IP addresses, device make and model, operating system version, and general non-personally identifiable diagnostic or performance logs to deliver and personalize ads, prevent fraud, and measure ad performance.
              </p>
              <p className="text-sm text-[#9499ad] leading-relaxed">
                You can manage or reset your advertising preferences at any time on your Android device by going to: 
                <code className="text-xs bg-white/[0.06] text-white px-2 py-0.5 rounded ml-1 font-mono">
                  Settings &gt; Google &gt; Ads &gt; Delete advertising ID / Reset advertising ID
                </code>.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-sm font-mono text-[#7dd3fc]">04.</span>
              <span>Data Retention &amp; Security</span>
            </h2>
            <p className="text-[#9499ad] mb-3 leading-relaxed">
              Because OmniLevel does not transmit personal data, account credentials, or camera media to any developer-operated servers or databases, we do not store, retain, or maintain databases containing your private information.
            </p>
            <p className="text-[#9499ad] leading-relaxed">
              We apply industry-standard security practices across the application code to ensure local calculations are isolated, secure, and contained within the device&apos;s sandboxed operating system environment.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-sm font-mono text-[#7dd3fc]">05.</span>
              <span>Children&apos;s Privacy (COPPA Compliance)</span>
            </h2>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
              <FiAlertCircle className="text-[#fcd34d] text-xl shrink-0 mt-0.5" />
              <p className="text-sm text-[#9499ad] leading-relaxed">
                OmniLevel is a general-purpose DIY and measurement utility. It is not directed at or designed for children under the age of 13. We do not knowingly collect or solicit any personally identifiable information from children. If you believe a child has provided us with personal information, please contact us immediately, and we will promptly take appropriate action.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-sm font-mono text-[#7dd3fc]">06.</span>
              <span>Changes to This Policy</span>
            </h2>
            <p className="text-[#9499ad] leading-relaxed">
              We may periodically update this Privacy Policy to reflect changes in our practices, new app updates, or legal compliance requirements. 
              Any revisions will be posted directly to this URL (<Link href="/omnilevel/privacy" className="text-[#7dd3fc] hover:underline">https://www.khaledbinaziz.com/omnilevel/privacy</Link>) with a revised &quot;Last updated&quot; timestamp. We encourage you to review this page periodically.
            </p>
          </section>

          {/* Section 7 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#0d0f15] border border-white/[0.08]">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-sm font-mono text-[#7dd3fc]">07.</span>
              <span>Contact Us</span>
            </h2>
            <p className="text-[#9499ad] mb-6 leading-relaxed">
              If you have any questions, feedback, or inquiries regarding this Privacy Policy or the data practices of OmniLevel, please contact the developer directly:
            </p>

            <div className="space-y-2 text-sm text-[#9499ad]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Developer:</span>
                <span>Khaled Bin Aziz</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Email:</span>
                <a 
                  href="mailto:khaleedbinaziz@gmail.com" 
                  className="text-[#7dd3fc] hover:underline flex items-center gap-1.5"
                >
                  <FiMail className="text-sm" />
                  <span>khaleedbinaziz@gmail.com</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Official Website:</span>
                <a 
                  href="https://www.khaledbinaziz.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7dd3fc] hover:underline flex items-center gap-1.5"
                >
                  <FiExternalLink className="text-sm" />
                  <span>https://www.khaledbinaziz.com</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Application ID:</span>
                <span className="font-mono text-xs bg-white/[0.05] text-[#f1f3f7] px-2 py-0.5 rounded">
                  com.omnilevel.precision.app
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#9499ad] hover:text-white transition-colors"
          >
            <FiArrowLeft className="text-base" />
            <span>Return to Portfolio</span>
          </Link>
          <p className="text-xs text-[#595e72] font-mono">
            &copy; {new Date().getFullYear()} Khaled Bin Aziz. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
