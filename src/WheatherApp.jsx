import { useState } from "react";

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'; // Cambié a 2.5
    const API_KEY = '8e857320f6b9c546bd2b5cebee2836ff';
    const difKelvin = 273.15

    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null);

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value); // Esto hace que ciudad cambie de valor
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(ciudad.length > 0) fetchClima(); // Esto hace que si NO ponemos nada en el buscador de ciudad, no se haga la peticion
    };

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}&lang=es`); // aqui esta llamando a la api y estamos esperando una respuesta a la peticion que hicimos // por otro lado, agruegue units=metric&lang=es para cambiar el idioma de la descrpcion de clima( de ingles a español)
            const data = await response.json(); // la respuesta que nos dio, la convertimos en formato json para que se lea bien
            setDataClima(data);
        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error); // Corregí el bloque de error
        }
    };

    return (
        <div className="container">
            <h1>Aplicación del Clima</h1>

            <form onSubmit={handleSubmit}> {/* Agregué el onSubmit al formulario */}
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad} // Esto hace cambiar el valor de ciudad
                />
                <button type="submit">Buscar</button>
            </form>

            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                        <p>Condición meteorológica: {dataClima.weather[0].description.charAt(0).toUpperCase() + dataClima.weather[0].description.slice(1)}</p> 

                        <img src= {`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                    </div> 
                )
            }
        </div>
    );
}