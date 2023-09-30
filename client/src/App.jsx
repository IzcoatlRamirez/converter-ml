import { useState } from 'react'
import CalculateIcon from '@mui/icons-material/Calculate';
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from '@mui/material/Paper';
import MessageIA from './components/MessageIA';

import {
  Box,
  Card,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import './App.css'


function App() {
  const [radian, setRadian] = useState("")
  const [loading, setLoading] = useState(false);
  const [conversionResult,setConversionResult] = useState("0")


  const getDegrees = async (e)=>{
    try{
      e.preventDefault()
      setLoading(true);

      const radianNumeric = parseFloat(radian)

      const response = await axios.post("http://127.0.0.1:5000/api/predict", {
        radians: radianNumeric,
      });

      const data=response.data; 
      setLoading(false);
      console.log(data.prediction[0])
      setConversionResult(data.prediction[0].toFixed(2))
    }
    catch(e){
      console.log(e.error)
    }
    finally{
      setLoading(false)
    }

  };

  return (
    <div className="css-body">

      <Container>
          <Card sx={{ maxWidth: 500, margin: "auto", padding:5,borderRadius:5}}>

          <Box display="flex" alignItems={"center"} marginBottom={5}>
            <IconButton color="primary">
                <CalculateIcon></CalculateIcon>
            </IconButton>
            <Typography variant="h3" component="h1" fontSize={35}>
            Radians to Degrees Converter
            </Typography>
          </Box>

          <Box
            display="flex" flexDirection={'column'}
            component={"form"}
            autoComplete="off"
            gap={2}
            onSubmit={getDegrees}
          >
            <TextField
            id="radianValue"
            label="write radians"
            size="small"
            variant="outlined"
            required
            fullWidth
            onChange={(e) => setRadian(e.target.value)}>
            </TextField>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingIndicator="Loading..."
              variant="contained"
              sx={{backgroundColor: "#ffd166",maxWidth:50,margin:'auto'}}
            >
            =
            </LoadingButton>

            <Paper elevation={1}>
              <Typography  sx={{textAlign:'center'}}
              variant="h2" component="h4">{conversionResult}°</Typography>
            </Paper>

          </Box>
          </Card>
      </Container>

      <MessageIA></MessageIA>

  
      
    </div>
   
  )
}

export default App
