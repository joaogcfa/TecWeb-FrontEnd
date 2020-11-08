import React, { useState, useEffect } from "react";
import "../css/Match.css";
import { ReactComponent as ReactLogo } from "../assets/icons/football.svg";
import { ReactComponent as ReactLogo1 } from "../assets/icons/soccer-field.svg";
import { ReactComponent as ReactLogo2 } from "../assets/icons/prancheta.svg";
import { useLocation } from "react-router-dom";
import { TailSpin } from "@agney/react-loading";
import history from "../history";

export default function Match(props) {
  var [awayTeam, setAwayTeam] = useState();
  var [homeTeam, setHomeTeam] = useState();
  var [score, setScore] = useState();
  var [date, setDate] = useState("");
  var [id, setId] = useState();
  var [away_id, setAwayId] = useState();
  var [home_id, setHomeId] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setId(props.location.state.id);
    setAwayTeam(props.location.state.awayTeam);
    setHomeTeam(props.location.state.homeTeam);
    setScore(props.location.state.score);
    setDate(props.location.state.date);
    setAwayId(props.location.state.awayId);
    setHomeId(props.location.state.homeId);
  }, [location]);

  useEffect(() => {
    if (date !== "") {
      setLoading(false);
    }
  }, [date]);

  //   useEffect(() => {
  //     axios.get("").then((resp) => {
  //       if (Math.floor(resp.status / 100 === 2)) {
  //         console.log(resp.data.data.match);
  //         setData(resp.data.data.match);
  //         setLoading(false);
  //       }
  //     });
  //   }, []);

  return (
    <div className="container">
      <div className="menu">
        <ReactLogo className="icone" />
        <div>|</div>
        <ReactLogo1
          className="icone1"
          onClick={() =>
            history.push({
              pathname: "/lineup",
              state: {
                id: id,
                awayTeam: awayTeam,
                date: date,
                homeTeam: homeTeam,
                score: score,
                homeId: home_id,
                awayId: away_id,
              },
            })
          }
        />
        <div>|</div>
        <ReactLogo2 className="icone" />
      </div>
      <h1 className="data">
        {loading ? (
          <TailSpin className="title" width="80" />
        ) : date.length < 5 ? (
          <div>{date}</div>
        ) : (
          <div>
            {date.substring(8, 10)}/{date.substring(5, 7)}/
            {date.substring(0, 4)}
          </div>
        )}
      </h1>
      <div className="Placar">
        <div className="times">
          <h1>
            {score === undefined ? (
              <div>-</div>
            ) : (
              <div>{score.substring(0, 1)}</div>
            )}
          </h1>
          <h2>{homeTeam}</h2>
        </div>
        <h1>X</h1>
        <div className="times">
          <h1>
            {score === undefined ? (
              <div>-</div>
            ) : (
              <div>{score.substring(4, 5)}</div>
            )}
          </h1>
          <h2>{awayTeam}</h2>
        </div>
      </div>
      <div className="center">
        <button
          onClick={() =>
            history.push({
              pathname: "/screens/historic",
              state: { homeId: home_id, awayId: away_id },
            })
          }
        >
          Últimas partidas de cada clube
        </button>
      </div>
    </div>
  );
}
