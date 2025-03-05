import React, { Component } from 'react';
import { Typography } from "@mui/material";
import "./styles.scss"

class NotFound extends Component {
    render() {
        return (
            <div className='page-not-found-img-container'>
                <Typography variant="h3" component="div" className="page-not-found-title" align="center">
                    Page not found ฅ⁽͑ ˚̀ ˙̭ ˚ ⁾̉ฅ
                </Typography>

            </div>
        );
    }
}

export default NotFound;
