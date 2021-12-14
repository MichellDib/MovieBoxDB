import React from "react";
import '../../css/profile.css';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faInfo, faEye, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { filterTextLength } from "../model";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ProfileView(props) {
    return (console.log(props.user[3]),
        <div className="profile-container">
            <div className="profile-about">
                <div className="profile-about-header">
                    <h1>Profile</h1>
                </div>
                <div className="profile-image">
                    {props.user[3] === "" ? <img src="images/noProfileImage.jpg" alt="profile" /> : <img src={props.user[3]} alt="profile" />}
                </div>
                <div className="profile-about-name">
                    <h2>{props.user[0]}</h2>
                </div>
                <div className="profile-about-bio">
                    <p>{props.user[1]}</p>
                </div>
            </div>
            <div className="profile-movies">
                <div className="profile-favorite">
                    <div className="profile-favorite-header">
                        <h1>Favorite Movies</h1>
                    </div>
                    <div className="profile-favorite-body">
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {props.favoriteMovies.map(movie => (
                                <Card
                                    itemId={movie.id}
                                    title={movie.title}
                                    image={movie.poster_path}
                                    props={props}
                                />
                            ))}
                        </ScrollMenu>
                    </div>
                </div>
                <div className="profile-watchlist">
                    <div className="profile-watchlist-header">
                        <h1>Watchlist</h1>
                    </div>
                    <div className="profile-watchlist-body">
                        {props.watchlistMovies.map(movie => {
                            return (
                                <div className="profile-watchlist-movie" key={movie.id}>
                                    <div className="profile-watchlist-movie-image">
                                        <img
                                            onClick={() => props.movieDetails(movie.id)}
                                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </div>
                                    <div className="profile-watchlist-movie-info">
                                        <h3>{movie.title}</h3>
                                        <h4>{movie.release_date}</h4>
                                        <p>{filterTextLength(movie.overview, 125)}</p>
                                        <div className="profile-watchlist-buttons">
                                        <OverlayTrigger
                                            placement={'top'}
                                            overlay={<Tooltip><h6>Description</h6></Tooltip>}
                                        >
                                            <button onClick={() => props.movieDetails(movie.id)}>
                                                <p><FontAwesomeIcon icon={faInfo}/></p>
                                            </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement={'top'}
                                            overlay={<Tooltip><h6>Watched?</h6></Tooltip>}
                                        >
                                            <button onClick={() => props.removeFromWatchlist(movie.id)}>
                                                <p><FontAwesomeIcon icon={faEye}/></p>
                                            </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement={'top'}
                                            overlay={<Tooltip><h6>Add to Favorite</h6></Tooltip>}
                                        >
                                            <button onClick={() => props.addToFavorite(movie)}>
                                                <p><FontAwesomeIcon icon={faHeart}/></p>
                                            </button>
                                        </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
  
    return (
        <button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    );
}
  
function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  
    return (
        <button disabled={isLastItemVisible} onClick={() => scrollNext()}>
            <FontAwesomeIcon icon={faAngleRight} />
        </button>
    );
}

function Card({ itemId, title, image, props }) {
    return (
        <div className="profile-favorite-movie">
            <img
                src={`https://image.tmdb.org/t/p/original/${image}`}
                alt={title}
                onClick={() => props.movieDetails(itemId)}
            />
            <OverlayTrigger
                placement={'top'}
                overlay={<Tooltip><h6>Remove From Favorite</h6></Tooltip>}
            >
                <div className="profile-favorite-remove">
                    <button onClick={() => props.removeFromFavorite(itemId)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            </OverlayTrigger>
            <div className="profile-favorite-info">
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default ProfileView;
