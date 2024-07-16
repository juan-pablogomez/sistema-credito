import { useEffect, useState } from "react";

function CreditsList() {
  const [creditsList, setCreditsList] = useState([]);
  const [filteredCredits, setFilteredCredits] = useState(creditsList);

  useEffect(() => {
    fetch("http://localhost:4000/api/credits")
      .then((res) => res.json())
      .then((res) => {
        setCreditsList(res);
        setFilteredCredits(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFilter = (filter) => {
    console.log(filter);
    if (!filter) {
      setFilteredCredits(creditsList);
    } else {
      setFilteredCredits(
        creditsList.filter((credit) => credit.status == filter)
      );
    }
  };

  return (
    <div className="creditList-container">
      <h2>Lista de Creditos</h2>
      <div className="buttons">
        <button onClick={() => handleFilter("")}>Todos los Créditos</button>
        <button onClick={() => handleFilter("approved")}>Aprobados</button>
        <button onClick={() => handleFilter("rejected")}>Rechazados</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto del crédito</th>
            <th>Plazo del crédito</th>
            <th>Estado del crédito</th>
          </tr>
        </thead>
        <tbody>
          {filteredCredits.map((credit, index) => (
            <tr key={index}>
              <td>{credit.name}</td>
              <td>{credit.amount}</td>
              <td>{credit.term} meses</td>
              <td>{credit.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreditsList;
