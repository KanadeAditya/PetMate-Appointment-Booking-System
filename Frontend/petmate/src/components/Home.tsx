// import AOS from "aos";
// import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
import style from "../styles/Home.module.css";
// import homeImage from "../images/home-inage-petmate.png";
// import dogs from "../images/home-inage-petmate.png"
// AOS.init();
 
  

function Home() {
 

  return (
    <>
    <div id={style.cont}>
      <div className={style.zoomIn}>
        <img className={style.image} src="/images/home-inage-petmate.png" alt="dogs" />
        <h1>Welcome to Weterian hospital</h1>
      </div>
    </div>
    <div id={style.cont} >

    </div>
    </>
  );
}

export default Home;
