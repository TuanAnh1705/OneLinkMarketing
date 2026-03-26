// Bạn có thể đặt file này tại /app/privacy-policy/page.tsx
import React from "react"

export default function PrivacyPolicyPage() {
  return (
    // MỚI: Thêm 'generalsans-regular' làm font chữ cơ sở cho cả trang
    <main className="bg-white py-16 sm:py-24 generalsans-regular mb-40 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === TIÊU ĐỀ TRANG === */}
        <div className="text-center mb-12 md:mb-16">
          {/* MỚI: Thêm 'archivo-expanded' cho tiêu đề chính */}
          <h1 className="text-4xl sm:text-5xl font-bold text-black archivo-expanded">
            Privacy Policy
          </h1>
          {/* MỚI: Thêm 'generalsans-regular' cho tiêu đề phụ */}
          <p className="mt-4 text-base font-semibold uppercase text-black tracking-wider generalsans-regular">
            CUSTOMER INFORMATION PRIVACY POLICY
          </p>
        </div>

        {/* === NỘI DUNG CHÍNH SÁCH === */}
        {/* MỚI: Thêm các lớp 'prose-headings:archivo-expanded' và 
          'prose-p:generalsans-regular' để tùy chỉnh font của typography.
          Chúng ta cũng thêm 'prose-li:generalsans-regular' cho các mục danh sách
          và 'prose-strong:font-semibold' để chữ in đậm nổi bật hơn.
        */}
        <article className="
          prose prose-lg lg:prose-xl 
          max-w-7xl 
          prose-headings:archivo-expanded
          prose-p:generalsans-regular
          prose-li:generalsans-regular
          prose-h2:font-semibold 
          prose-h2:text-2xl 
          prose-h2:mb-4 
          prose-h2:mt-10 
          prose-ul:list-disc 
          prose-ul:ml-6 
          prose-li:my-2
          prose-strong:font-semibold
          prose-strong:text-gray-800
        ">
          
          {/* Giới thiệu */}
          <p>
            OneLink Marketing is committed to protecting the personal information
            of our clients and anyone who visits our website. We understand that
            information security is an important responsibility, and we will only
            use your information in the ways outlined in this policy.
          </p>

          {/* 1. Mục đích */}
          <h2>1. Purpose of Personal Information Collection</h2>
          <p>
            OneLink Marketing collects personal information from clients and
            website users for the following purposes:
          </p>
          <ul>
            <li>
              <strong>To Provide Services:</strong> Processing consultation
              requests, price quotes, and service contracts (SEO, Advertising,
              Website Design, etc.).
            </li>
            <li>
              <strong>To Support Clients:</strong> Answering inquiries, handling
              complaints, and providing technical support during the service
              period.
            </li>
            <li>
              <strong>To Personalize Experience:</strong> Improving our website
              and content to better suit user needs.
            </li>
            <li>
              <strong>To Send Marketing Information:</strong> Sending
              newsletters, new educational articles, and information about
              promotions or new services from OneLink Marketing (only with your
              consent).
            </li>
            <li>
              <strong>For Analysis and Improvement:</strong> Using data (like
              cookies, IP addresses) to analyze website traffic, thereby
              improving our service quality.
            </li>
          </ul>

          {/* 2. Phạm vi Thu thập */}
          <h2>2. Scope of Information Collection</h2>
          <p>
            The personal information OneLink Marketing may collect includes:
          </p>
          <ul>
            <li>
              <strong>Identifying Information:</strong> Full name, Company name,
              Tax ID code.
            </li>
            <li>
              <strong>Contact Information:</strong> Phone number, Email, Address.
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, browser type,
              cookie information (when you visit our website).
            </li>
            <li>
              <strong>Project Information:</strong> Information you provide when
              filling out contact forms or consultation request forms (e.g.,
              current website, marketing goals).
            </li>
          </ul>
          <p>We collect this information through:</p>
          <ul>
            <li>
              Contact forms, consultation request forms, and quote forms on the
              website.
            </li>
            <li>
              Direct communication via email, phone, or in-person meetings.
            </li>
            <li>Website analytics tools (such as Google Analytics).</li>
          </ul>

          {/* 3. Phạm vi Sử dụng */}
          <h2>3. Scope of Information Use</h2>
          <p>
            OneLink Marketing is committed to using client information
            transparently and reasonably:
          </p>
          <ul>
            <li>
              Your information is used only internally within OneLink Marketing
              to serve the purposes stated in Section 1.
            </li>
            <li>
              <strong>
                We do not sell, share, or trade your personal information
              </strong>{" "}
              with any third party for commercial purposes, unless required by
              law or requested by a competent state authority.
            </li>
            <li>
              In cases where it is necessary to share information with partners
              (e.g., domain or hosting providers), we will notify you and only
              proceed with your explicit consent.
            </li>
          </ul>

          {/* 4. Thời gian Lưu trữ */}
          <h2>4. Information Storage Duration</h2>
          <p>Client personal information will be stored until:</p>
          <ul>
            <li>The purpose of collection is fulfilled.</li>
            <li>
              The client requests to cancel or delete their account (if
              applicable).
            </li>
            <li>
              The service contract between OneLink Marketing and the client ends
              and all related obligations are completed.
            </li>
            <li>
              Anonymous website analysis data will be stored according to the
              policies of the analytics tools (e.g., Google Analytics).
            </li>
          </ul>

          {/* 5. Cam kết Bảo mật */}
          <h2>5. Commitment to Information Security</h2>
          <p>
            OneLink Marketing is committed to protecting your information
            through strict technical and organizational measures:
          </p>
          <ul>
            <li>
              Your data is stored on secure, firewall-protected servers.
            </li>
            <li>
              We apply encryption measures (such as SSL) for our website to
              protect data transmission.
            </li>
            <li>
              Only authorized OneLink Marketing employees directly involved in
              the project or client support are permitted to access personal
              information.
            </li>
            <li>
              We regularly review and update our security procedures to ensure
              maximum safety.
            </li>
          </ul>

          {/* 6. Quyền của Khách hàng */}
          <h2>6. Client&apos;s Rights Regarding Personal Information</h2>
          <p>You have full control over your personal information. You may:</p>
          <ul>
            <li>
              Request OneLink Marketing to provide a copy of the personal
              information we are storing.
            </li>
            <li>
              Request correction or updates to your information if errors are
              found.
            </li>
            <li>
              Request the deletion of your personal information from our system.
            </li>
            <li>
              Opt out of receiving marketing communications at any time by
              clicking the &quot;unsubscribe&quot; link in each email.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            below.
          </p>

          {/* 7. Thông tin Liên hệ */}
          <h2>7. Contact Information</h2>
          <p>
            For any questions, contributions, or requests related to this
            privacy policy, please contact:
            <br />
            <strong>OneLink Marketing (OLM)</strong>
          </p>
          <p>
            <strong>Address:</strong> 771 Ngo Quyen, Da Nang, Vietnam
            <br />
            <strong>Phone:</strong> (+84) 905621565
            <br />
            <strong>Email:</strong>{" "}
            {/* MỚI: Thêm các lớp CSS cho link */}
            <a 
              href="mailto:neil@onelinkmarketing.com" 
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              neil@onelinkmarketing.com
            </a>
          </p>

          {/* 8. Thay đổi Chính sách */}
          <h2>8. Changes to the Policy</h2>
          <p>
            This privacy policy may be updated in the future to comply with
            legal changes or changes in our services. All changes will be
            posted publicly on this website and will take effect immediately
            upon posting.
          </p>
          {/* MỚI: Thêm font-semibold để làm nổi bật ngày */}
          <p className="font-semibold">
            This policy was last updated on [28/10/2025].
          </p>
          
        </article>
      </div>
    </main>
  )
}