const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Eagles Mere Park Association
        </p>
      </div>
    </footer>
  );
};

export default Footer;
