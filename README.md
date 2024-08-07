# road-geometry : A real-world road curve calculator for [Cities:Skylines](https://www.citiesskylines.com/)

_A command-line based tool to calculate/derive road curve parameters to model real-world road engineering and traffic safety guidelines._

## Installation

- `npm i` or `yarn` to install the prerequisites

## Usage

This program uses the standard equation (`e + f = v^2 / 127r`) used throughout the United States road engineering manuals that creates a relation between a road curve's radius (`r`) and the design speed limit (`v`) through the curve, given the road exhibits no [cant (i.e. superelevation)](https://en.wikipedia.org/wiki/Cant_(road/rail)).

Given this equation, this program may be used in multiple ways depending on your intention:

1. **Specify a radius** (in meters), to calculate the proper speed limit (in km/h) for the curve.
2. **Specify a velocity** (in km/h), to calculate the minimum radius (in meters) for the curve.

As this program is tailored to users of the [Cities:Skylines](https://www.citiesskylines.com/) computer game, the output of this program displays the radius value in meters and in game-units (u, where `1u === 8 meters`).

## Input parameters

- Radius: 	`--radius` (or `--r`)
- Velocity:	`--velocity` (or `--v`)

## How to run

`node index.js [parameter=value]`

## Release info

The latest version is 1.1.0, and was released on 16 June 2024.
## Copyright and License

This program is **Copyright &copy; 2022 Alden Gillespy**, and provided under the [Creative Commons Attribution-NoCommercial-NoDerivatives International 4.0 (CC-BY-NC-ND 4.0) License](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode).

_In summary: You are free to download and use this program **in accordance with the terms** outlaid in that license and applicable law._
