import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { FcSearch } from "react-icons/fc";
import { css } from "@emotion/core";
import { DayForcast } from "./DayForcast";
import ClockLoader from "react-spinners/ClockLoader";

import "../App.css";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const Title = styled.h1`
	font-size: 1.5em;
	color: #fff;
	margin: 0;
`;
const MainTitle = styled.h1`
	font-size: 2rem;
	color: #fff;
	margin: 0;
`;
const Input = styled.input`
	font-size: 1.2rem;
	font-weight: bold;
	text-align: center;

	color: #000;
`;
const SubTitle = styled.h3`
	font-size: 20px;
	text-align: center;
	color: #fff;
	margin: 0 10px;
`;

export default class Wheather extends Component {
	state = {
		cityName: "",
		location: [],
		wheather: [],
		fiveday: { data: [] },
		condition: "",
		icon: "",
		isLoading: true,
		isSearching: false,
		fulldata: [],
		dailyData: [],
	};

	handleInputChange = (event) => {
		this.setState({ cityName: event.target.value });
	};

	loadFiveDays = () => {
		const url = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=b76931bb32910a956b02a3cb2dd0c84d`;
		//api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=b76931bb32910a956b02a3cb2dd0c84d
		http: fetch(url)
			.then((res) => res.json())
			.then((data) => {
				const dailyData = data.list.filter((reading) =>
					reading.dt_txt.includes("18:00:00")
				);
				this.setState(
					{
						fullData: data.list,
						dailyData: dailyData,
					},
					() => console.log(this.state)
				);
			});
	};

	search = async () => {
		if (this.state.cityName === "") {
			alert("City name cannot be empty");
		}
		this.setState({
			isLoading: true,
			isSearching: true,
		});
		const url = `http://api.weatherapi.com/v1/current.json?key=f9fb9199a73042c096f24816211705&q=${this.state.cityName}`;

		axios.get(url).then((response) => {
			this.setState({
				location: response.data.location,
				wheather: response.data.current,
				condition: response.data.current.condition.text,
				icon: response.data.current.condition.icon,
				isLoading: false,
			});

			this.loadFiveDays();
		});
	};

	formatDayCards = () => {
		return (
			<div className="displayLocation">
				{this.state.dailyData.map((reading, index) => (
					<div>
						<DayForcast reading={reading} index={index} />
						{console.log(reading)}
					</div>
				))}
			</div>
		);
	};

	render() {
		return (
			<div className="App">
				<Title style={{ marginBottom: "0px" }}>Wheather App</Title>
				<br />

				<Input
					className="inputSearch"
					value={this.state.cityName}
					onChange={this.handleInputChange}
					style={{ marginTop: "0px" }}
				/>
				{/* <button onClick={this.search}>Search</button> */}
				<FcSearch onClick={this.search} />

				{!this.state.isLoading ? (
					<div>
						<Title>{this.state.location.name}</Title>
						<div className="displayLocation">
							<SubTitle>{this.state.location.region}</SubTitle>
							<SubTitle>{this.state.location.country}</SubTitle>
						</div>
						<SubTitle>{this.state.location.localtime}</SubTitle>
						<Title style={{ fontSize: "2rem" }}>
							{this.state.wheather.temp_c}°C
						</Title>
						<Title>{this.state.wheather.wind_kph} km/hr</Title>
						<Title>{this.state.condition}</Title>
						<img src={this.state.icon} />
						<Title>Five Day Forecast</Title>
						{this.formatDayCards()}
					</div>
				) : (
					<div>
						<br />
						<ClockLoader
							color="#000"
							loading="true"
							css={override}
							size={100}
						/>
						{this.state.isSearching ? (
							<div>Loading...</div>
						) : (
							<div>Enter city name</div>
						)}
					</div>
				)}
			</div>
		);
	}
}
