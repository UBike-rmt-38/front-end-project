import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'; 


export default function Auth(){

    const [isSignedIn, setIsSignedIn] = useState(false);  
    useEffect(() => {
        const getIsSignedIn = async () => {
          try {
            const accessToken = await SecureStore.getItemAsync("accessToken");
            if (accessToken) {
              setIsSignedIn(true);
            } 
            else {
              setIsSignedIn(false);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        getIsSignedIn();
      }, [isSignedIn]);

      return (
        isSignedIn, setIsSignedIn
      )

}    
