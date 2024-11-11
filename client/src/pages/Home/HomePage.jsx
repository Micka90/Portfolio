import "./HomePage.css";
import Avatar from "../../assets/avatar.png";

function HomePage() {
  return (
    <div id="homepage">
      <img className="imagehome" src={Avatar} alt="User avatar" />
      <section className=" containerhome">
        <h1>Mickael Beaugrand</h1>
        <h2>Développeur Junior</h2>
        <p className="homedescription ">
          Lorem ipsum dolor sit amet. Et assumenda eligendi eos placeat dolor
          est harum necessitatibus? Id laboriosam velit cum officia recusandae
          sed corrupti nostrum ut voluptas similique. Et perspiciatis placeat
          qui voluptas alias ut mollitia fuga est magni galisum est laborum
          corporis ad voluptatem perspiciatis. Rem quidem officia 33 unde
          consequatur id corporis quisquam non nostrum placeat? Eum quibusdam
          optio sit illo dolores hic dolor nemo in sunt dignissimos quo esse
          omnis et nostrum autem. Et error molestiae et earum veniam aut eius
          asperiores. Sit voluptate nihil quo galisum necessitatibus rem iure
          molestias ut delectus reprehenderit et praesentium minus? Qui tempore
          praesentium et obcaecati suscipit ad enim fugiat et magni voluptatibus
          est deserunt aperiam. Et distinctio blanditiis non aperiam illum a
          fugiat expedita qui consequuntur autem vel temporibus ullam.
        </p>
      </section>
    </div>
  );
}

export default HomePage;
