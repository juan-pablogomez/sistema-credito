import { RowDataPacket } from "mysql2";

export interface Credits extends RowDataPacket {
  id?: number
  name?: string
  amount: number
  term: number
  interest_rate: number
  monthly_income: number
  status?: "approved" | "rejected"
  user_id?: number
}