function Footer() {
    //TODO: zcustomizować footer żeby było w nim coś sensownego idk
  return (
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <h1 className="font-bold text-xl flex">
            Portal ligowy tworzony z myślą o fanach sportu by
            <a href={"#"} className={"hover:text-blue-500"}>Patryk Knapek, </a>
            <a href={"#"} className={"hover:text-blue-500"}>Piotr Karaś, </a>
            <a href={"#"} className={"hover:text-blue-500"}>Przemysław Maresz </a>
        </h1>
      </footer>
  );
}

export default Footer;