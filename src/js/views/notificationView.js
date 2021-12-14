import React from "react";
import Toast from 'react-bootstrap/Toast'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NotificationView(props) {
    return (console.log("hej"),
        <div className="notification">
            <Toast show={props.inWatchlist} bg="warning">
                <Toast.Header>
                    <strong className="me-auto">MovieBoxDB</strong>
                    <button type="button" onClick={() => props.close() } className="close" data-dismiss="toast" aria-label="Close"><FontAwesomeIcon icon={faTimes}/></button>
                </Toast.Header>
                <Toast.Body>This movie already exists in your watchlist!</Toast.Body>
            </Toast>
        </div>
    );
}

export default NotificationView;
