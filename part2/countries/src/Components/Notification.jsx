import Country from './Country';
import SingleCountry from './singleCountry';

const Notification = ({ countries, buttonHandler }) => {
    if (countries.length < 10 && countries.length > 1) {
        return (
            <div>
                <ul>
                    {countries.map(country => 
                        <Country country={country} buttonHandler={buttonHandler} key={country.cca3} />
                    )}
                </ul>
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                <SingleCountry country={countries[0]} />
            </div>
        )
    } else if (countries.length < 1) {
        return(
            <div>
                No matches
            </div>
            )
    }
    else if (countries.length > 10){
        return(
        <div>
            Too many matches, specify another filter
        </div>
        )
    }
}

export default Notification