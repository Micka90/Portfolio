




import "./admin.css";

function Admin() {
  return (
    <section>
      <form className="addproject" action="submit">
        <input className="projectadd" type="text" placeholder=" title" />
        <textarea
          className="description"
          name="description"
          rows="4"
          cols="50"
          placeholder="Entrez votre description ici..."
        />

        <input className="projectadd" type="file" />
        <button type="submit">Add Project </button>
      </form>
    </section>
  );
}

export default Admin;
