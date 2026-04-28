import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, FileText, Smartphone, MapPin, BrainCircuit, UserMinus, Clock, Baby, Bell, Mail } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#131313] text-white p-6 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="space-y-12">
          <header className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mb-2">
              <Shield size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            <p className="text-gray-500">Effective as of 2026-04-25</p>
          </header>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 space-y-12">
            <div className="prose prose-invert max-w-none space-y-12 text-gray-400 leading-relaxed">
              <p>
                This privacy policy is applicable to the Traflinq app (hereinafter referred to as "Application") for mobile devices, which was developed by <span className="text-white font-semibold">Cort Technologies</span> (hereinafter referred to as "Service Provider") as a Free service. This service is provided "AS IS".
              </p>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <FileText className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">What information does the Application obtain and how is it used?</h2>
                </div>
                <p>
                  The Application acquires the information you supply when you download and register the Application. Registration with the Service Provider is not mandatory. However, bear in mind that you might not be able to utilize some of the features offered by the Application unless you register with them.
                </p>
                <p>
                  The Service Provider may also use the information you provided them to contact you from time to time to provide you with important information, required notices and marketing promotions.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Smartphone className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">What information does the Application collect automatically?</h2>
                </div>
                <p>
                  In addition, the Application may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile devices unique device ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Application.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <MapPin className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">Does the Application collect precise real time location information of the device?</h2>
                </div>
                <p>
                  This Application collects your device's location, which helps the Service Provider determine your approximate geographical location and make use of in below ways:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Geolocation Services:</strong> The Service Provider utilizes location data to provide features such as personalized content, relevant recommendations, and location-based services.</li>
                  <li><strong className="text-white">Analytics and Improvements:</strong> Aggregated and anonymized location data helps the Service Provider to analyze user behavior, identify trends, and improve the overall performance and functionality of the Application.</li>
                  <li><strong className="text-white">Third-Party Services:</strong> Periodically, the Service Provider may transmit anonymized location data to external services. These services assist them in enhancing the Application and optimizing their offerings.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <BrainCircuit className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">Does the Application use Artificial Intelligence (AI) technologies?</h2>
                </div>
                <p>
                  The Application does not use Artificial Intelligence (AI) technologies to process your data or provide features.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Eye className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">Do third parties see and/or have access to information obtained by the Application?</h2>
                </div>
                <p>
                  Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
                </p>
                <p>
                  Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><a href="https://www.google.com/policies/privacy/" className="text-primary hover:underline">Google Play Services</a></li>
                  <li><a href="https://expo.io/privacy" className="text-primary hover:underline">Expo</a></li>
                </ul>
                <p>The Service Provider may disclose User Provided and Automatically Collected Information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
                  <li>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
                  <li>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <UserMinus className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">What are my opt-out rights?</h2>
                </div>
                <p>
                  You can halt all collection of information by the Application easily by uninstalling the Application. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Clock className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">What is the data retention policy and how can you manage your information?</h2>
                </div>
                <p>
                  The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. The Service Provider will retain Automatically Collected information for up to 24 months and thereafter may store it in aggregate. If you'd like the Service Provider to delete User Provided Data that you have provided via the Application, please contact them at <a href="mailto:corttechnologies562@gmail.com" className="text-primary hover:underline">corttechnologies562@gmail.com</a> and we will respond in a reasonable time.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Baby className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">How does the Application address children's privacy?</h2>
                </div>
                <p>
                  The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13. The Application does not address anyone under the age of 13. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (<a href="mailto:contact@traflinq.com" className="text-primary hover:underline">contact@traflinq.com</a>) so that they will be able to take the necessary actions.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Lock className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">How is your information kept secure?</h2>
                </div>
                <p>
                  The Service Provider are concerned about safeguarding the confidentiality of your information. The Service Provider provide physical, electronic, and procedural safeguards to protect information we process and maintain. For example, we limit access to this information to authorized employees and contractors who need to know that information in order to operate, develop or improve their Application.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Bell className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">How will you be informed of changes to this Privacy Policy?</h2>
                </div>
                <p>
                  This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
                </p>
              </section>

              <section className="bg-primary/5 border border-primary/20 p-8 rounded-3xl space-y-4">
                <h2 className="text-2xl font-bold text-white m-0">How do you give your consent?</h2>
                <p className="m-0">
                  By using the Application, you are giving your consent to the Service Provider processing of your information as set forth in this Privacy Policy now and as amended by us. "Processing,” means using cookies on a computer/hand held device or using or touching information in any way, including, but not limited to, collecting, storing, deleting, using, combining and disclosing information.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Mail className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold m-0">How can you contact us?</h2>
                </div>
                <p>
                  If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at <a href="mailto:contact@traflinq.com" className="text-primary hover:underline">contact@traflinq.com</a>
                </p>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
