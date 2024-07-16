import { useState } from "react";

function CreditForm() {
  const [ data, setData ] = useState({
    name: '',
    amount: '',
    term: '',
    interest_rate: '',
    monthly_income: ''
  })
  const [ response, setResponse ] = useState(null)
  const [ error, setError ] = useState(null)

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await fetch('http://localhost:4000/api/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(!res.ok) {
        throw new Error('Error en el procesamiento de datos', { message: error })
      }

      const dataForm = await res.json()
      setResponse(dataForm)
      setError(null)
    } catch(error) {
      setError(error.message || 'Error al enviar datos')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Solicitar un crédito</h2>
      <div className="form-container">
        <label htmlFor="name">
          Nombre del solicitante:
          <input type="text" name="name" value={data.name} onChange={handleChange}/>
        </label>
        <label htmlFor="amount">
          Monto del crédito:
          <input type="number" name="amount" value={data.amoount} onChange={handleChange}/>
        </label>
        <label htmlFor="term">
          Termino en meses:
          <input type="number" name="term" value={data.term} onChange={handleChange}/>
        </label>
        <label htmlFor="interest_rate">
          Tasa de interés:
          <input type="number" name="interest_rate" value={data.interest_rate} onChange={handleChange}/>
        </label>
        <label htmlFor="monthly_income">
          Ingresos mensuales:
          <input type="number" name="monthly_income" value={data.monthly_income} onChange={handleChange}/>
        </label>
        <input type="submit" />
        { response && <div> Solicitud realizada con éxito </div> }
        { error && <div> {error} </div> }
      </div>
    </form>
  );
}

export default CreditForm;
