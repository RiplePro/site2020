import React from "react";
import injectSheet from "react-jss";
import PageStyles from "../styles";
import SupportStyles from "./styles";
import { db } from "../../../firebase";

const SupportPage = ({ classes }) => {
  const [email, setEmail] = React.useState("");
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0 || content.length === 0) {
      setStatus("Error: Invalid Input!");
    } else {
      db.collection("reports")
        .doc()
        .set({ email, content })
        .then(() => setStatus("Report Submitted! :D"))
        .catch((error) => setStatus(`Error: ${error.message}`));

      setEmail("");
      setContent("");
    }
  };

  return (
    <div className={classes.page}>
      <h1 className={classes.h1}>Support Page</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Need Help?"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {status.length > 0 && (
        <h2
          className={
            status.includes("Error:") ? classes.error : classes.success
          }
        >
          {status}
        </h2>
      )}
    </div>
  );
};

export default injectSheet({ ...PageStyles, ...SupportStyles })(SupportPage);
