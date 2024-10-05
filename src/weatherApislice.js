import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchWeather = createAsyncThunk("weatherApi/fetch" , async() => {
    // let cancelAxios = null;
       const response = await  axios.get("https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.5&appid=5a3c2ee4bf1731ea7e03d8931f589fe0");
  
        //   {
        //     // cancelToken: new axios.CancelToken((cal) => {
        //     //   cancelAxios = cal;
        //     // }),
        //   }
        

          console.log(response.data)
          const min = Math.round( response.data.main.temp_min    - 272.19);
          const max = Math.round( response.data.main.temp_max    - 272.19);
          const temp = Math.round(response.data.main.temp    - 272.19) ; 
          const description = response.data.weather[0].description 
          const icon = response.data.weather[0].icon 
          console.log(response)
  
        //   setrespone({...response, min, max, temp, description , icon });
     
        return {min , temp , max , description , icon }

});
const weatherApislice = createSlice({
    name : "weatherApi",
    initialState:{
        result: "empty",
        weather: {},
        isLoading: false,
    },
    reducers: {
        setResult(state, action){
            state.result = "Cnange";
        }
    },
 
    extraReducers(builder){
        builder.addCase( fetchWeather.pending, (state , action)=>{

            state.isLoading = true;
            console.log(state , " ++++++")
            console.log(action  , " ++++++")
        }).addCase(fetchWeather.fulfilled , (state , action)=>{
            state.isLoading = false;
            console.log(state , " ++++++")
            console.log(action  , " ++++++")
            state.weather = action.payload;
        })
    }
})

export const { setResult } = weatherApislice.actions;

export default weatherApislice.reducer;