import React from "react";
import headphone from "../images/headphones.svg";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
  const openLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
    console.log("click");
  };

  return (
    <nav>
      <h1>Musicfy</h1>
      <button className={libraryStatus ? "library-active" : ""} onClick={openLibraryHandler}>
        Library &nbsp;
        <img src={headphone} alt="rubbish" />
      </button>
    </nav>
  );
};

export default Nav;
