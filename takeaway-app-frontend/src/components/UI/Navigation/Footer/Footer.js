import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <div className="wrapper">
          <div>
            <ul className="links group">
              <li>
                <span>© 2018-2021 Exotic Shaad</span>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/contact-us">Contact Us</a>
              </li>

              <li>
                <a href="https://www.exoticshaad.com/insurance/your-policy/conditions-of-use.php">
                  Conditions of Use
                </a>
              </li>
              <li>
                <a href="https://www.exoticshaad.com/your-privacy-and-security">Privacy Security</a>
              </li>
            </ul>
          </div>
          <div className="address">
            <p itemProp="location" itemType="http://schema.org/PostalAddress" itemScope="itemScope">
              <span itemProp="name">Exotic Shaad</span>,
              <span itemProp="streetAddress">Tŷ Exotic Shaad, Nolton Street</span>,
              <span itemProp="addressLocality">Bridgend</span>,
              <span itemProp="postalCode">CF31 3BP</span>,
              <span itemProp="addressCountry">United Kingdom</span>
            </p>
          </div>
          <div className="registered">
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
