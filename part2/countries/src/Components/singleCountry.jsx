import Language from './Language';
import Weather from './Weather'

const SingleCountry = ({ country }) =>{
    return(
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <div>capital: {country.capital}</div>
                <div>area: {country.area}</div>
            </div>
            <div>
                <h2>languages</h2>
                <div>
                    <ul>
                        {Object.values(country.languages).map(lang => 
                            <Language language={lang} key={lang}/>
                        )}
                    </ul>
                </div>
            </div>
            <div>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
                <Weather country={country} />
        </div>
    )
}

export default SingleCountry