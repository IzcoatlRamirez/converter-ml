import React, { useState, useEffect } from 'react'
import { Container, Typography } from '@mui/material'
import '../App.css'

function MessageIA() {

    const [text,setText] = useState('')

    useEffect(() => {
        const textoOriginal = "Using a Linear Regression Model from Sklearn"; 
        let i = 0;
    
        const intervalo = setInterval(() => {
          if (i < textoOriginal.length) {
            setText((prevText) => prevText + textoOriginal.charAt(i));
            i++;
          } else {
            clearInterval(intervalo);
          }
        }, 75);
    
        return () => {
          clearInterval(intervalo); 
        };
      }, []);
  

    return (
        <>
            <Container>
            <Typography variant='h2'>
            This converter works 
            <p className="lmr">{text}</p>
            </Typography>
            </Container>
        </>
    )
}

export default MessageIA