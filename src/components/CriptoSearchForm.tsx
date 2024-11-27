import { useState, ChangeEvent, FormEvent } from "react"
import { useCriptoStore } from "../store"
import { currencies } from "../data"
import { Pair } from "../types"
import Alert from "./Alert"

export default function CriptoSearchForm() {

    const cryptocurrencies = useCriptoStore(state => state.cryptocurrencies)
    const fetchData = useCriptoStore(state => state.fetchData)

    const [ pair, setPair ] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    })

    const [ alert, setAlert ] = useState('')

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        if(Object.values(pair).includes('')) {
            setAlert('Todos los campos son obligatorios')
            setTimeout(() => {
                setAlert('')
            }, 3000);
            return
        }

        // Consultar API
        fetchData(pair)
    }

  return (
    <form onSubmit={handleSubmit} className='form'>

        {alert && <Alert>{alert}</Alert>}

        <div className="field">
            <label htmlFor="currency">Moneda:</label>
            <select 
                name="currency" 
                id="currency"
                onChange={handleChange}
                value={pair.currency}
            >
                <option value="">-- Seleccione --</option>
                {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.name}</option>
                ))}
            </select>
        </div>

        <div className="field">
            <label htmlFor="cryptocurrency">Criptomoneda:</label>
            <select 
                name="cryptocurrency" 
                id="cryptocurrency"
                onChange={handleChange}
                value={pair.cryptocurrency}
            >
                <option value="">-- Seleccione --</option>
                {cryptocurrencies.map(crypto => (
                    <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
                        {crypto.CoinInfo.FullName}
                    </option>
                ))}
            </select>
        </div>

        <input type="submit" value="Cotizar" />
    </form>
  )
}
