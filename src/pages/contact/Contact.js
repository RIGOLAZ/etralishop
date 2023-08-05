import { useRef } from "react";
import Card from "../../components/card/Card";
import styles from "./Contact.module.css";
import { FaPhoneAlt, FaEnvelope, FaYoutube } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        "shop-etralis-ID",
        "shop-etralis-temp",
        form.current,
        "4rizBieDSk6pG-TEV"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
          console.log("message envoyé");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p><a style={{color:"white"}} href="tel:237677077030">237 677077030</a></p>
                </span>
                <span>
                  <FaEnvelope />
                  <p><a style={{color:"white"}} href="mailto: support@etralis.com">support@etralis.com</a></p>
                </span>
                <span>
                  <GoLocation />
                  <p>Bonapriso, Douala, Cameroun</p>
                </span>
                <span>
                  <FaYoutube />
                  <p>@etralis</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;