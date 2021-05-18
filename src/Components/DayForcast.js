import React from "react";

export const DayForcast = ({ reading }) => {
	const imgURL = `https://openweathermap.org/img/w/${reading.weather[0].icon}.png`;

	return (
		<div className="col-sm-10">
			<div className="card bg-light text-dark">
				<div>{reading.dt_txt}</div>

				<div style={{ width: "100%" }}>
					<img
						style={{ width: "100px", height: "100px", alignItems: "center" }}
						src={imgURL}
					/>
				</div>

				<h2>{Math.round(reading.main.temp)} °C</h2>
				<div className="card-body">
					<p className="card-text">{reading.weather[0].description}</p>
				</div>
			</div>
		</div>
	);
};
