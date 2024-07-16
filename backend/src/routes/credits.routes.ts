import { Request, Response, Router } from "express";
import mysqlConnection from "../db/mysql";
import { Credits } from "../models/creditsSchema";
import { getCreditByIdQuery, getCreditsQuery, postCreditQuery } from '.././db/querys'


class Creditos {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  async createCredit(req: Request, res: Response) {
    try {
      const { name, amount, term, interest_rate, monthly_income, user_id } = req.body

      // Se calcula  la lógica básica para la aprobación del crédito =>
        // Se calcula la tasa de interes de acuerdo al valor ingresado con la formula => (monto * termino * (tasadeInteres / 100)) <-> Ya que no se pide el numero de la tasa de interes en porcentaje sino como entero
        // Se aprueba si el ingreso mensual es mayor a el (montoSolicitado + tasaDeInteres / meses)
      const status = monthly_income > ((amount + (amount * term * (interest_rate / 100))) / term) ? 'approved' : 'rejected'

      if (!name || !amount || !term || !interest_rate || !monthly_income ) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }
      
      const values = [ name, amount, term, interest_rate, monthly_income, status, user_id ]
      const [ result ] = await mysqlConnection.query<Credits[]>(postCreditQuery.toString(), values)
      res.status(201).json({ message: 'Creado correctamente', result: result })
    } catch(error) {
      return res.status(500).json(error)
    }
  } 

  async getCredit(req: Request, res: Response) {
    try {
      const { creditId } = req.params
      const [ result ] = await mysqlConnection.query<Credits[]>(getCreditByIdQuery(creditId))
      if(result.length === 0) {
        return res.status(404).json({ message: "Info not found" })
      }
      res.json(result)
    } catch(error) {
      return res.status(500).json(error)
    }
  }

  async getCredits(req: Request, res: Response) {
    try {
      const [ result ] = await mysqlConnection.query<Credits[]>(getCreditsQuery)
      res.json(result)
    } catch (error) {
      return res.status(500).json(error)
    }
    
  }

  routes() {
    this.router.get('/', this.getCredits)
    this.router.get('/:creditId', this.getCredit)
    this.router.post('/', this.createCredit)
  }
}

const creditsRoutes = new Creditos()
export default creditsRoutes.router
