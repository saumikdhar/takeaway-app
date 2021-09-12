import './Footer.css';

const Footer = () => {
  return (
    <div class="footer">
      <div class="footer-links">
        <div class="wrapper">
          <div>
            <ul class="links group">
              <li>
                <span>© 2018-2021 Exotic Shaad</span>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/sitemap.php">SiteMap</a>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/contact-us">Contact Us</a>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/accessibility">Accessibility</a>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/insurance/your-policy/conditions-of-use.php">
                  Conditions of Use
                </a>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/your-privacy-and-security">
                  Privacy & Security
                </a>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/press-office">Press Office</a>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/cookie-policy">Cookie Policy</a>
              </li>
            </ul>
          </div>
          <div class="address">
            <p itemprop="location" itemtype="http://schema.org/PostalAddress" itemscope="itemscope">
              <span itemprop="name">Exotic Shaad</span>,
              <span itemprop="streetAddress">Tŷ Exotic Shaad, Nolton Street</span>,
              <span itemprop="addressLocality">Bridgend</span>,
              <span itemprop="postalCode">CF31 3BP</span>,
              <span itemprop="addressCountry">United Kingdom</span>
            </p>
          </div>
          <div class="registered">
            <p>
              Nolton Tandoori T/A Exotic Shaad plc is registered in Wales at Tŷ Exotic Shaad, Nolton
              Street, Bridgend. CF31 2BP (Reg No: Business Reg no here). Nolton Tandoori Limited
              (Reg No: ) is a subsidiary of Exotic Shaad Group plc and is authorised. These details
              can be confirmed by visiting the companies house,
              <a href="http://www.fca.org.uk/register" rel="nofollow">
                www.fca.org.uk/register
              </a>
              . EUI Limited acts for, and on behalf of, other regulated insurance companies. Further
              details may be provided on request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
