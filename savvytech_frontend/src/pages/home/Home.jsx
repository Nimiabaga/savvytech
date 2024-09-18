import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Footer from "../../components/footer/footer";
import Homepage from "../../components/homepage/homepage";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Homepage />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
