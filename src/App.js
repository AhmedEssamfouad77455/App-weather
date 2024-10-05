import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import * as React from "react";
import { createTheme, ThemeProvider, styled, Button } from "@mui/material";
import Test from "./Test";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
import moment from "moment";
import "moment/min/locales"
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import { useDispatch , useSelector } from "react-redux";
import {fetchWeather} from "./weatherApislice"
import CircularProgress from '@mui/material/CircularProgress';
moment.locale("ar");    
const theme = createTheme({
  typography: {
    fontFamily: ["IBm"],
    fontWeight: "300",
  },
});
function App() {
  const dispatch = useDispatch();
  const result = useSelector((status)=>{
    return status.weather.result
  })
  console.log("good redux" , result)
  const isLoading = useSelector( (status) => {
    return status.weather.isLoading
  })
  console.log(isLoading ,"+++++++/////");
  const weather = useSelector((state)=>{
    return state.weather.weather
  })
  console.log(weather)
  
  let cancelAxios = null;
  
  const {t , i18n } = useTranslation("");
  const [ dataAndtime  ,setdataAndtime ] = useState("")
  const [response, setrespone] = useState({
    number:null,
    description:"",
    min: null , 
  max: null,
  icon : null
});
  useEffect(() => {
    // i18n.changeLanguage("ar")
    setdataAndtime(moment().format("MMM Do YY") );
    console.log("disfetchWeather in website")
    dispatch(fetchWeather())
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.5&appid=5a3c2ee4bf1731ea7e03d8931f589fe0",

        {
          cancelToken: new axios.CancelToken((cal) => {
            cancelAxios = cal;
          }),
        }
      )
      .then((response) => {
        console.log(response)
        console.log(response.data)
        const min = Math.round( response.data.main.temp_min    - 272.19);
        const max = Math.round( response.data.main.temp_max    - 272.19);
        const temp = Math.round(response.data.main.temp    - 272.19) ; 
        const description = response.data.weather[0].description 
        const icon = response.data.weather[0].icon 

        setrespone({...response, min, max, temp, description , icon });
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("تم إلغاء الطلب:", error.message);
        } else {
          console.error("خطأ في جلب بيانات الطقس:", error);
        }
      });
  

    return () => {

      cancelAxios();
    };
  }, []);

  function handltransle(){
    i18n.changeLanguage(

  
      
      i18n.language === "ar"  ? "en" && moment.locale("en") : "ar" && moment.locale("ar") 
    );
    setdataAndtime(moment().format("MMM Do YY") );
  }


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* Start contentcontainer  */}
          <div className="contentContainer">
            {/* start  Card */}
            <div className="card">
              {/* content */}
              <div className="content">
                {/* start  City and time */}
                <div className="info" dir={ i18n.language === "ar" ? "rtl" : "ltr"   }>
                  <Typography variant="h2" gutterBottom>
                {t("Rayide")}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                  {dataAndtime}
                  </Typography>
                </div>
                {/* end City and time */}
                <hr />
                {/* start  Degree and describtion */}
                <div className="describtion" dir={ i18n.language === "ar" ? "rtl" : "ltr"   }>
                  {/* Start  Temp */}
                  <div >
                    <div className="temp">
                       <span>

                       {isLoading && <CircularProgress style={{color:"white"}}/>}
                       </span> 
                      <Typography variant="h1" className="degree" gutterBottom>
                        {weather.temp}°C 
                        
                      </Typography>
                      {/* todo : temp imgae */}
                    </div>
                    {/* End  Temp */}
                    <Typography variant="h6" gutterBottom>
                    {t(weather.description)}

                    </Typography>
                    {/* Min & max */}
                    <div className="minmax">
                      <h5>{t("min") } : {weather.max}</h5>
                      <h5>|</h5>
                       <h5> {t("max") }:  {weather.min}</h5>
                    </div>
                  </div>
                  {/* end Min & max */}

                  <CloudIcon className="iconcloud" />
                </div>

                {/* end Degree and describtion */}
              </div>
            </div>
            {/* end  Card */}
            {/* start transaltion container */}
            <div className="translation">
              <Button variant="text"  onClick={handltransle}>{
                i18n.language === "ar"? "انجليزي" : "arabic"
              }</Button>
            </div>
           
            {/* end transaltion container */}
          </div>
          {/* End contentcontainer  */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
