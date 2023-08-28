import React from 'react'
import { gql, useQuery } from "@apollo/client";
import CardQRcode from '../components/CardQRcodeStation';


const GET_QRCODE = gql`
query BicycleQrcode {
  getStationQrCode {
    qrCode
    name
    bicycleQrcode {
      qrCode
      name
    }
  }
}
`
function QRcode() {
    const { data, loading: isLoading, error } = useQuery(GET_QRCODE);
    if (error) return `Error! ${error.message}`;
    if(isLoading){
        return <div>
            <h1>Loading...</h1>
        </div>
    }
    console.log(data.getStationQrCode);
  return (
    <div>
        <h1>QRcode</h1>
{
    data.getStationQrCode.map(e => {
        return <CardQRcode data={e} key={e.id} />
    })
}
    </div>
  )
}

export default QRcode