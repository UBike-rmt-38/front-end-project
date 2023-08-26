// import InstagramIcon from "../assets/icons8-instagram.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-right p-4 bottom-0 justify-self-end whitespace-pre">
      <div className=" flex justify-end items-center gap-1">
        <a
          href="https://www.instagram.com/bayusuryowibowo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <img
            src={InstagramIcon}
            alt="Instagram Icon"
            className="h-10 w-10 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          /> */}
        </a>
        Built by:{""}
        <a
          href="#"
          className=" no-underline hover:underline underline-offset-4 decoration-sky-500 decoration-2"
        >
          Bayu Suryo Wibowo
        </a>
        .
      </div>
    </footer>
  );
}
